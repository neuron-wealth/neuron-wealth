export function Skeleton({ className = "" }) {
  return <div className={`skeleton animate-pulse rounded-lg ${className}`} aria-hidden="true" />;
}

export function DashboardSkeleton() {
  return (
    <div>
      <p className="sr-only">Loading dashboard</p>
      <Skeleton className="h-40 rounded-3xl" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Skeleton className="h-72 rounded-2xl xl:col-span-2" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <p className="sr-only">Loading records</p>
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  );
}
