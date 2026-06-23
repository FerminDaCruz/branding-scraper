import { Skeleton } from "@/components/ui/skeleton";

export function BriefSkeleton() {
  return (
    <div className="space-y-6">
      {/* profile header */}
      <div className="flex items-center gap-4 p-5 rounded-md border border-border bg-card">
        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      {/* 2-col sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-5 rounded-md border border-border bg-card space-y-3">
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>

      {/* full-width sections */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="p-5 rounded-md border border-border bg-card space-y-3">
          <Skeleton className="h-2.5 w-28" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}

      {/* tags */}
      <div className="p-5 rounded-md border border-border bg-card space-y-3">
        <Skeleton className="h-2.5 w-32" />
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-24 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
