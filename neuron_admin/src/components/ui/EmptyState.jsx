export default function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center px-5 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-accent">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-4 text-base font-bold">{title}</p>
      <p className="muted mt-1 max-w-sm text-sm leading-relaxed">{description}</p>
      {children}
    </div>
  );
}
