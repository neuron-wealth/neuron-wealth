import { ArrowDown, ArrowUp, Columns3, Plus, Rows3, X } from "lucide-react";
import { moveItem, removeAt } from "../../../utils/list";
import { useCmsMeta } from "../CmsMetaContext";

export default function TableField({ field, value, onChange }) {
  const meta = useCmsMeta();
  const maxColumns = meta?.limits?.tableColumns || 10;
  const maxRows = meta?.limits?.tableRows || 50;
  const columns = Array.isArray(value?.columns) ? value.columns : [];
  const rows = (Array.isArray(value?.rows) ? value.rows : []).map((row) => columns.map((_, index) => (Array.isArray(row) ? row[index] ?? "" : "")));
  const set = (next) => onChange({ columns, rows, ...next });

  const setColumn = (index, label) => set({ columns: columns.map((entry, position) => (position === index ? label : entry)) });
  const addColumn = () => set({ columns: [...columns, `Column ${columns.length + 1}`], rows: rows.map((row) => [...row, ""]) });
  const removeColumn = (index) => {
    if (!window.confirm(`Delete the column "${columns[index] || index + 1}" and its values?`)) return;
    set({ columns: removeAt(columns, index), rows: rows.map((row) => removeAt(row, index)) });
  };
  const setCell = (rowIndex, columnIndex, cell) =>
    set({ rows: rows.map((row, position) => (position === rowIndex ? row.map((entry, index) => (index === columnIndex ? cell : entry)) : row)) });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="field-label">{field.label}</span>
        <div className="flex gap-1.5">
          <button type="button" onClick={addColumn} disabled={columns.length >= maxColumns} className="btn btn-secondary focus-ring h-8 px-3 text-xs">
            <Columns3 className="h-3.5 w-3.5" aria-hidden="true" />
            Add Column
          </button>
          <button
            type="button"
            onClick={() => set({ rows: [...rows, columns.map(() => "")] })}
            disabled={rows.length >= maxRows || !columns.length}
            className="btn btn-secondary focus-ring h-8 px-3 text-xs"
          >
            <Rows3 className="h-3.5 w-3.5" aria-hidden="true" />
            Add Row
          </button>
        </div>
      </div>

      {columns.length ? (
        <div className="mt-2 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-max border-collapse text-sm">
            <thead>
              <tr className="bg-subtle">
                <th className="w-10 px-2 py-2 text-[0.6875rem] font-bold text-soft" scope="col">
                  #
                </th>
                {columns.map((column, index) => (
                  <th key={index} scope="col" className="min-w-[10rem] border-l border-line p-1.5">
                    <div className="flex items-center gap-1">
                      <input
                        className="field h-9 px-2.5 text-xs font-bold"
                        value={column}
                        maxLength={120}
                        aria-label={`Column ${index + 1} heading`}
                        onChange={(event) => setColumn(index, event.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeColumn(index)}
                        className="icon-btn focus-ring h-8 w-8 shrink-0 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                        aria-label={`Delete column ${index + 1}`}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="w-28 border-l border-line px-2 text-[0.6875rem] font-bold text-soft" scope="col">
                  Row
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-line">
                  <td className="px-2 text-center text-[0.6875rem] font-bold text-soft">{rowIndex + 1}</td>
                  {row.map((cell, columnIndex) => (
                    <td key={columnIndex} className="border-l border-line p-1.5">
                      <input
                        className="field h-9 px-2.5 text-xs"
                        value={cell}
                        maxLength={200}
                        aria-label={`Row ${rowIndex + 1}, ${columns[columnIndex] || `column ${columnIndex + 1}`}`}
                        onChange={(event) => setCell(rowIndex, columnIndex, event.target.value)}
                      />
                    </td>
                  ))}
                  <td className="border-l border-line px-1">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="icon-btn focus-ring h-8 w-7 disabled:opacity-30"
                        disabled={rowIndex === 0}
                        onClick={() => set({ rows: moveItem(rows, rowIndex, -1) })}
                        aria-label={`Move row ${rowIndex + 1} up`}
                      >
                        <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn focus-ring h-8 w-7 disabled:opacity-30"
                        disabled={rowIndex === rows.length - 1}
                        onClick={() => set({ rows: moveItem(rows, rowIndex, 1) })}
                        aria-label={`Move row ${rowIndex + 1} down`}
                      >
                        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="icon-btn focus-ring h-8 w-7 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                        onClick={() => set({ rows: removeAt(rows, rowIndex) })}
                        aria-label={`Delete row ${rowIndex + 1}`}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <button
          type="button"
          onClick={addColumn}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line p-5 text-sm font-semibold text-soft hover:border-accent hover:text-accent"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Start the table with a column
        </button>
      )}
      <p className="muted mt-1.5 text-xs">
        {columns.length}/{maxColumns} columns · {rows.length}/{maxRows} rows. Wide tables scroll sideways on phones.
      </p>
    </div>
  );
}
