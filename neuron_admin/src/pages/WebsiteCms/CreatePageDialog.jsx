import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Dialog from "../../components/ui/Dialog";
import { Input, Select, TextArea } from "../../components/site/controls";
import { slugify } from "../../utils/cms";
import { siteUrl } from "../../config/site";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft (not visible yet)" },
  { value: "published", label: "Published" },
];

const blank = () => ({ title: "", slug: "", description: "", category: "general", status: "draft" });

export default function CreatePageDialog({ open, categories, reserved, existing, creating, onCreate, onClose }) {
  const [form, setForm] = useState(blank);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(blank());
      setSlugTouched(false);
    }
  }, [open]);

  const set = (changes) => setForm((previous) => ({ ...previous, ...changes }));
  const slug = slugTouched ? form.slug : slugify(form.title);
  const problem = !form.title.trim()
    ? "Enter a page title."
    : !slug
      ? "Enter a page address."
      : reserved.includes(slug)
        ? `"/${slug}" is already used by the website.`
        : existing.includes(slug)
          ? `A page at "/${slug}" already exists.`
          : "";

  const submit = (event) => {
    event.preventDefault();
    if (problem || creating) return;
    onCreate({ ...form, slug });
  };

  return (
    <Dialog
      open={open}
      title="Create a Page"
      description="The page starts with an introduction section. Add more sections in the editor."
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary focus-ring h-10 px-4">
            Cancel
          </button>
          <button type="submit" form="create-page-form" disabled={Boolean(problem) || creating} className="btn btn-primary focus-ring h-10 px-5">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {creating ? "Creating…" : "Create Page"}
          </button>
        </>
      }
    >
      <form id="create-page-form" onSubmit={submit} className="grid gap-4">
        <Input label="Page Title" value={form.title} maxLength={80} autoFocus onChange={(title) => set({ title })} />
        <Input
          label="Page Address"
          value={slug}
          maxLength={60}
          spellCheck={false}
          hint={siteUrl(`/${slug || "page-address"}`)}
          onChange={(value) => {
            setSlugTouched(true);
            set({ slug: value.toLowerCase().replace(/[^a-z0-9-]/g, "-") });
          }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Category" value={form.category} options={categories.filter((entry) => entry.value !== "core")} onChange={(category) => set({ category })} />
          <Select label="Status" value={form.status} options={STATUS_OPTIONS} onChange={(status) => set({ status })} />
        </div>
        <TextArea label="Short Description" value={form.description} maxLength={240} rows={2} onChange={(description) => set({ description })} />
        {form.title && problem ? <p className="text-xs font-semibold text-red-600 dark:text-red-400">{problem}</p> : null}
      </form>
    </Dialog>
  );
}
