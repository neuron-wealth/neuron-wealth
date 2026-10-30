import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Trash2 } from "lucide-react";

const BUTTON = "icon-btn focus-ring h-8 w-8 disabled:opacity-30";

export default function RowActions({ index, count, visible, label, onMove, onToggle, onDuplicate, onRemove, duplicateDisabled }) {
  return (
    <div className="flex shrink-0 items-center gap-0.5" onClick={(event) => event.stopPropagation()}>
      <button type="button" className={BUTTON} disabled={index === 0} onClick={() => onMove(-1)} aria-label={`Move ${label} up`} title="Move up">
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>
      <button type="button" className={BUTTON} disabled={index === count - 1} onClick={() => onMove(1)} aria-label={`Move ${label} down`} title="Move down">
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {onToggle ? (
        <button
          type="button"
          className={BUTTON}
          onClick={onToggle}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          aria-pressed={!visible}
          title={visible ? "Visible on website (click to hide)" : "Hidden from website (click to show)"}
        >
          {visible ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4 text-amber-600 dark:text-amber-300" aria-hidden="true" />}
        </button>
      ) : null}
      {onDuplicate ? (
        <button type="button" className={BUTTON} onClick={onDuplicate} disabled={duplicateDisabled} aria-label={`Duplicate ${label}`} title="Duplicate">
          <Copy className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
      <button
        type="button"
        className={`${BUTTON} text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40`}
        onClick={onRemove}
        aria-label={`Delete ${label}`}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
