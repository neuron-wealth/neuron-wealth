import { FolderOpen } from "lucide-react";
import MediaBrowser from "../../components/media/MediaBrowser";

export default function MediaLibrary() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-deep text-white shadow-sm">
          <FolderOpen className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">Media Library</h1>
          <p className="muted mt-1 max-w-2xl text-xs leading-relaxed sm:text-sm">
            Upload images and documents, organise them in folders, and use them anywhere on the website. Copy a file’s link, or pick it with “Choose from Library” in any page editor image or link field.
          </p>
        </div>
      </div>
      <section className="panel p-4 sm:p-6">
        <MediaBrowser />
      </section>
    </div>
  );
}
