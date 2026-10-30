import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Eye, Pencil, Plus, RefreshCw, Search, SearchX, Trash2, X } from "lucide-react";
import { bulkRecords, createRecord, deleteRecord, fetchRecords, updateRecord } from "../../services/recordService";
import { useToast } from "../../context/ToastContext";
import EmptyState from "../ui/EmptyState";
import { TableSkeleton } from "../ui/Skeleton";
import Dialog from "../ui/Dialog";
import Alert from "../ui/Alert";
import RecordDetails from "./RecordDetails";
import RecordForm, { emptyRecord, recordValues } from "./RecordForm";
import { exportRecordsCsv } from "./exportCsv";
import { formatDate, initialOf, plural } from "../../utils/format";

const PER_PAGE = 20;
const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "name", label: "Name A–Z" },
];

function StatusSelect({ item, statuses, label, onChange }) {
  return (
    <>
      <label className="sr-only" htmlFor={`status-${item.id}`}>
        Status for {label}
      </label>
      <select
        id={`status-${item.id}`}
        value={item.status}
        onChange={(event) => onChange(item, event.target.value)}
        className="field focus-ring !h-9 w-auto cursor-pointer !rounded-lg pl-2.5 pr-8 text-xs font-semibold"
      >
        {statuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>
    </>
  );
}

function Checkbox({ checked, indeterminate = false, onChange, label }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      ref={(node) => {
        if (node) node.indeterminate = indeterminate;
      }}
      onChange={onChange}
      aria-label={label}
      className="focus-ring h-4 w-4 cursor-pointer rounded border-line accent-[var(--accent)]"
    />
  );
}

function RowActions({ label, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button type="button" onClick={onView} className="icon-btn focus-ring h-9 w-9" title="View" aria-label={`View ${label}`}>
        <Eye className="h-4 w-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={onEdit} className="icon-btn focus-ring h-9 w-9" title="Edit" aria-label={`Edit ${label}`}>
        <Pencil className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="icon-btn focus-ring h-9 w-9 text-red-600 hover:bg-red-500/10 dark:text-red-400"
        title="Delete"
        aria-label={`Delete ${label}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function RecordList({ page }) {
  const { key, label, icon: Icon, tone, emptyTitle, emptyText } = page;
  const { push } = useToast();
  const [items, setItems] = useState([]);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [pageNumber, setPageNumber] = useState(1);
  const [selected, setSelected] = useState(() => new Set());
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [bulkStatus, setBulkStatus] = useState("");

  const load = useCallback(
    async (quiet = false) => {
      if (!quiet) setLoading(true);
      try {
        const data = await fetchRecords(key);
        setItems(data.items || []);
        setType({ ...data.type, key });
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [key]
  );

  useEffect(() => {
    setItems([]);
    setType(null);
    setSelected(new Set());
    setDialog(null);
    setFilter("All");
    setQuery("");
    load();
  }, [load]);

  const statuses = type?.statuses || [];
  const columns = type?.columns || { primary: "name", secondary: "email", topic: "" };
  const nameOf = (item) => item[columns.primary] || item.email || item.name || "Untitled record";

  const counts = useMemo(() => {
    const result = { All: items.length };
    statuses.forEach((status) => {
      result[status] = items.filter((item) => item.status === status).length;
    });
    return result;
  }, [items, statuses]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const searchable = type ? [...type.fields.map((field) => field.key), "notes", "sourcePage"] : [];
    const list = items.filter((item) => {
      if (filter !== "All" && item.status !== filter) return false;
      if (!needle) return true;
      return searchable.some((field) => String(item[field] || "").toLowerCase().includes(needle));
    });
    const sorters = {
      newest: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      oldest: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      name: (a, b) => String(a[columns.primary] || "").localeCompare(String(b[columns.primary] || "")),
    };
    return list.sort(sorters[sort]);
  }, [items, filter, query, sort, type, columns.primary]);

  useEffect(() => setPageNumber(1), [filter, query, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(pageNumber, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const selectedIds = items.filter((item) => selected.has(item.id)).map((item) => item.id);
  const allVisibleSelected = visible.length > 0 && visible.every((item) => selected.has(item.id));
  const someVisibleSelected = visible.some((item) => selected.has(item.id));

  const toggleOne = (id) =>
    setSelected((currentSet) => {
      const next = new Set(currentSet);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleVisible = () =>
    setSelected((currentSet) => {
      const next = new Set(currentSet);
      visible.forEach((item) => (allVisibleSelected ? next.delete(item.id) : next.add(item.id)));
      return next;
    });

  const replaceItem = (item) => setItems((list) => list.map((entry) => (entry.id === item.id ? item : entry)));

  const changeStatus = async (item, status) => {
    replaceItem({ ...item, status });
    try {
      const { item: saved } = await updateRecord(key, item.id, { status });
      replaceItem(saved);
      push(`Status changed to ${status}.`, "success");
    } catch (err) {
      replaceItem(item);
      push(err.message, "error");
    }
  };

  const open = (mode, item = null) => {
    setFormError("");
    setDialog({ mode, item });
  };
  const close = () => {
    if (!busy) setDialog(null);
  };

  const save = async (values) => {
    setBusy(true);
    setFormError("");
    try {
      if (dialog.mode === "create") {
        const { item } = await createRecord(key, values);
        setItems((list) => [item, ...list]);
        push(`${type.label} added.`, "success");
      } else {
        const { item } = await updateRecord(key, dialog.item.id, values);
        replaceItem(item);
        push("Changes saved.", "success");
      }
      setDialog(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      if (dialog.mode === "bulk-delete") {
        const { count } = await bulkRecords(key, selectedIds, "delete");
        const gone = new Set(selectedIds);
        setItems((list) => list.filter((item) => !gone.has(item.id)));
        setSelected(new Set());
        push(`${plural(count, "record")} deleted.`, "success");
      } else {
        await deleteRecord(key, dialog.item.id);
        setItems((list) => list.filter((item) => item.id !== dialog.item.id));
        setSelected((currentSet) => {
          const next = new Set(currentSet);
          next.delete(dialog.item.id);
          return next;
        });
        push(`${type.label} deleted.`, "success");
      }
      setDialog(null);
    } catch (err) {
      push(err.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const applyBulkStatus = async () => {
    if (!bulkStatus || !selectedIds.length) return;
    setBusy(true);
    try {
      const { count } = await bulkRecords(key, selectedIds, "status", bulkStatus);
      const chosen = new Set(selectedIds);
      setItems((list) => list.map((item) => (chosen.has(item.id) ? { ...item, status: bulkStatus } : item)));
      push(`${plural(count, "record")} marked ${bulkStatus}.`, "success");
      setBulkStatus("");
      setSelected(new Set());
    } catch (err) {
      push(err.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const exportCsv = () => {
    const rows = selectedIds.length ? filtered.filter((item) => selected.has(item.id)) : filtered;
    if (!rows.length) {
      push("There are no records to export.", "error");
      return;
    }
    exportRecordsCsv(type, rows);
    push(`Exported ${plural(rows.length, "record")}.`, "success");
  };

  const topicOf = (item) => (columns.topic ? item[columns.topic] : "");
  const formId = `record-form-${key}`;
  const deleting = dialog?.mode === "delete" || dialog?.mode === "bulk-delete";
  const editing = dialog?.mode === "edit" || dialog?.mode === "create";

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3.5">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${tone}`}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">{label}</h1>
            <p className="muted mt-1 text-xs leading-relaxed sm:text-sm">
              {type?.description || "Website form submissions."} {!loading ? `${plural(items.length, "record")} in total.` : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => load(true)} className="btn btn-secondary focus-ring h-10 px-3.5 text-sm" title="Refresh">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Refresh</span>
          </button>
          <button type="button" onClick={exportCsv} disabled={!type || !items.length} className="btn btn-secondary focus-ring h-10 px-3.5 text-sm">
            <Download className="h-4 w-4" aria-hidden="true" />
            {selectedIds.length ? `Export ${selectedIds.length} Selected` : "Export CSV"}
          </button>
          <button type="button" onClick={() => open("create")} disabled={!type} className="btn btn-primary focus-ring h-10 px-4 text-sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Record
          </button>
        </div>
      </div>

      {error ? (
        <Alert tone="error">
          {error}{" "}
          <button type="button" onClick={() => load()} className="font-bold underline">
            Try again
          </button>
        </Alert>
      ) : null}

      <div className="panel overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-3 border-b border-line p-3 sm:p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-subtle p-1" role="group" aria-label="Filter by status">
            {["All", ...statuses].map((status) => (
              <button
                key={status}
                type="button"
                aria-pressed={filter === status}
                onClick={() => setFilter(status)}
                className={`focus-ring inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-colors ${
                  filter === status ? "bg-surface text-ink shadow-sm" : "text-soft hover:text-ink"
                }`}
              >
                {status}
                <span className={`rounded-md px-1.5 text-xs ${filter === status ? "bg-[var(--accent-soft)] text-accent" : "bg-line"}`}>
                  {counts[status] || 0}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" aria-hidden="true" />
              <label htmlFor={`${key}-search`} className="sr-only">
                Search {label.toLowerCase()}
              </label>
              <input
                id={`${key}-search`}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search any field or note"
                className="field h-10 pl-10 pr-3.5 text-sm"
              />
            </div>
            <label htmlFor={`${key}-sort`} className="sr-only">
              Sort
            </label>
            <select id={`${key}-sort`} value={sort} onChange={(event) => setSort(event.target.value)} className="field h-10 cursor-pointer px-3 text-sm sm:w-40">
              {SORTS.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedIds.length ? (
          <div className="flex flex-col gap-2 border-b border-line bg-[var(--accent-soft)] px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold">{plural(selectedIds.length, "record")} selected</p>
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor={`${key}-bulk-status`} className="sr-only">
                New status for selected records
              </label>
              <select
                id={`${key}-bulk-status`}
                value={bulkStatus}
                onChange={(event) => setBulkStatus(event.target.value)}
                className="field !h-9 w-auto cursor-pointer !rounded-lg px-2.5 text-xs font-semibold"
              >
                <option value="">Change status to…</option>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <button type="button" onClick={applyBulkStatus} disabled={!bulkStatus || busy} className="btn btn-primary focus-ring h-9 px-3 text-xs">
                Apply
              </button>
              <button
                type="button"
                onClick={() => open("bulk-delete")}
                disabled={busy}
                className="btn focus-ring h-9 bg-red-600 px-3 text-xs text-white hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Delete
              </button>
              <button type="button" onClick={() => setSelected(new Set())} className="icon-btn focus-ring h-9 w-9" aria-label="Clear selection" title="Clear selection">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        {loading ? <TableSkeleton /> : null}
        {!loading && !error && items.length === 0 ? (
          <EmptyState icon={Icon} title={emptyTitle} description={emptyText}>
            <button type="button" onClick={() => open("create")} disabled={!type} className="btn btn-secondary focus-ring mt-5 h-10 px-4 text-sm">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add Record
            </button>
          </EmptyState>
        ) : null}
        {!loading && items.length > 0 && filtered.length === 0 ? (
          <EmptyState icon={SearchX} title="No matching records" description="Try a different search or status filter." />
        ) : null}

        {!loading && visible.length > 0 ? (
          <>
            <ul className="divide-y divide-line md:hidden">
              {visible.map((item) => {
                const name = nameOf(item);
                return (
                  <li key={item.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="pt-2.5">
                        <Checkbox checked={selected.has(item.id)} onChange={() => toggleOne(item.id)} label={`Select ${name}`} />
                      </div>
                      <button type="button" onClick={() => open("view", item)} className="focus-ring flex min-w-0 flex-1 items-start gap-3 rounded-lg text-left">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-sm font-bold text-accent">
                          {initialOf(name)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-bold">{name}</span>
                          {item[columns.secondary] ? <span className="muted block truncate text-xs">{item[columns.secondary]}</span> : null}
                          {topicOf(item) ? <span className="muted block truncate text-xs">{topicOf(item)}</span> : null}
                          <span className="muted mt-0.5 block text-xs">{formatDate(item.createdAt)}</span>
                        </span>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 pl-7">
                      <StatusSelect item={item} statuses={statuses} label={name} onChange={changeStatus} />
                      <RowActions label={name} onView={() => open("view", item)} onEdit={() => open("edit", item)} onDelete={() => open("delete", item)} />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-subtle text-xs font-semibold text-soft">
                  <tr>
                    <th scope="col" className="w-10 py-3 pl-5 pr-2">
                      <Checkbox
                        checked={allVisibleSelected}
                        indeterminate={!allVisibleSelected && someVisibleSelected}
                        onChange={toggleVisible}
                        label="Select all records on this page"
                      />
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Contact
                    </th>
                    {columns.topic ? (
                      <th scope="col" className="px-4 py-3">
                        {columns.topicLabel}
                      </th>
                    ) : null}
                    <th scope="col" className="px-4 py-3">
                      Received
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((item) => {
                    const name = nameOf(item);
                    const checked = selected.has(item.id);
                    return (
                      <tr key={item.id} className={`border-t border-line transition-colors hover:bg-subtle ${checked ? "bg-subtle" : ""}`}>
                        <td className="py-3.5 pl-5 pr-2">
                          <Checkbox checked={checked} onChange={() => toggleOne(item.id)} label={`Select ${name}`} />
                        </td>
                        <td className="px-3 py-3.5">
                          <button type="button" onClick={() => open("view", item)} className="focus-ring flex items-center gap-3 rounded-lg text-left">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-sm font-bold text-accent">
                              {initialOf(name)}
                            </span>
                            <span className="min-w-0">
                              <span className="block max-w-[16rem] truncate font-bold hover:text-accent">{name}</span>
                              {item[columns.secondary] ? <span className="muted block max-w-[16rem] truncate text-xs">{item[columns.secondary]}</span> : null}
                            </span>
                          </button>
                        </td>
                        {columns.topic ? (
                          <td className="max-w-xs px-4 py-3.5">
                            <p className="truncate font-medium">{topicOf(item) || "—"}</p>
                            {item.organization ? <p className="muted truncate text-xs">{item.organization}</p> : null}
                          </td>
                        ) : null}
                        <td className="muted whitespace-nowrap px-4 py-3.5 text-xs">{formatDate(item.createdAt)}</td>
                        <td className="px-4 py-3.5">
                          <StatusSelect item={item} statuses={statuses} label={name} onChange={changeStatus} />
                        </td>
                        <td className="px-5 py-3.5">
                          <RowActions label={name} onView={() => open("view", item)} onEdit={() => open("edit", item)} onDelete={() => open("delete", item)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm sm:flex-row">
              <p className="muted text-xs">
                Showing {(current - 1) * PER_PAGE + 1}–{Math.min(current * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setPageNumber(current - 1)} disabled={current <= 1} className="icon-btn focus-ring h-9 w-9 disabled:opacity-40" aria-label="Previous page">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="px-2 text-xs font-semibold">
                  Page {current} of {pages}
                </span>
                <button type="button" onClick={() => setPageNumber(current + 1)} disabled={current >= pages} className="icon-btn focus-ring h-9 w-9 disabled:opacity-40" aria-label="Next page">
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {type && dialog?.mode === "view" ? (
        <Dialog
          open
          size="lg"
          title={nameOf(dialog.item)}
          description={type.label}
          onClose={close}
          footer={
            <>
              <button type="button" onClick={() => open("delete", dialog.item)} className="btn focus-ring mr-auto h-10 px-4 text-red-600 hover:bg-red-500/10 dark:text-red-400">
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Delete
              </button>
              <button type="button" onClick={close} className="btn btn-secondary focus-ring h-10 px-4">
                Close
              </button>
              <button type="button" onClick={() => open("edit", dialog.item)} className="btn btn-primary focus-ring h-10 px-4">
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit
              </button>
            </>
          }
        >
          <RecordDetails item={items.find((entry) => entry.id === dialog.item.id) || dialog.item} type={type} />
        </Dialog>
      ) : null}

      {type && editing ? (
        <Dialog
          open
          size="lg"
          title={dialog.mode === "create" ? `Add ${type.label}` : `Edit ${type.label}`}
          description={dialog.mode === "create" ? "Add a record received outside the website, for example by phone or email." : nameOf(dialog.item)}
          onClose={close}
          footer={
            <>
              <button type="button" onClick={close} disabled={busy} className="btn btn-secondary focus-ring h-10 px-4">
                Cancel
              </button>
              <button type="submit" form={formId} disabled={busy} className="btn btn-primary focus-ring h-10 px-4">
                {busy ? "Saving…" : dialog.mode === "create" ? "Add Record" : "Save Changes"}
              </button>
            </>
          }
        >
          <RecordForm
            key={dialog.item?.id || "new"}
            formId={formId}
            type={type}
            initial={dialog.item ? recordValues(type, dialog.item) : emptyRecord(type)}
            error={formError}
            onSubmit={save}
          />
        </Dialog>
      ) : null}

      {type && deleting ? (
        <Dialog
          open
          title={dialog.mode === "bulk-delete" ? `Delete ${plural(selectedIds.length, "record")}?` : `Delete this ${type.label.toLowerCase()}?`}
          description="The record is removed from the admin and the database. This cannot be undone."
          onClose={close}
          footer={
            <>
              <button type="button" onClick={close} disabled={busy} className="btn btn-secondary focus-ring h-10 px-4">
                Cancel
              </button>
              <button type="button" onClick={remove} disabled={busy} className="btn focus-ring h-10 bg-red-600 px-4 text-white hover:bg-red-700">
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {busy ? "Deleting…" : "Delete"}
              </button>
            </>
          }
        >
          {dialog.mode === "delete" ? (
            <div className="flex items-center gap-3 rounded-xl border border-line p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-sm font-bold text-accent">
                {initialOf(nameOf(dialog.item))}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold">{nameOf(dialog.item)}</p>
                <p className="muted truncate text-xs">
                  {[dialog.item[columns.secondary], formatDate(dialog.item.createdAt)].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm">Every selected {type.label.toLowerCase()} will be deleted permanently.</p>
          )}
        </Dialog>
      ) : null}
    </div>
  );
}
