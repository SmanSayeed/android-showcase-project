import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5 flex flex-col flex-grow gap-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/3 mt-auto" />
                    </div>
                </div>
            ))}
        </div>
    )
}
