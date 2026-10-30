// Spreadsheet apps run cells that start with these characters as formulas.
const FORMULA_START = /^[=+\-@\t\r]/;

function cell(value) {
  let text = String(value ?? "");
  if (FORMULA_START.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function stamp(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
}

/** Downloads the given records as a CSV file that opens cleanly in Excel and Google Sheets. */
export function exportRecordsCsv(type, items) {
  const columns = [
    { label: "Received", value: (item) => stamp(item.createdAt) },
    { label: "Status", value: (item) => item.status },
    ...type.fields.map((field) => ({ label: field.label, value: (item) => item[field.key] })),
    { label: "Internal Notes", value: (item) => item.notes },
    { label: "Sent From Page", value: (item) => item.sourcePage },
  ];
  const rows = [columns.map((column) => cell(column.label)), ...items.map((item) => columns.map((column) => cell(column.value(item))))];
  const blob = new Blob([`\uFEFF${rows.map((row) => row.join(",")).join("\r\n")}`], { type: "text/csv;charset=utf-8" });

  const today = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${type.key}-${today}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
