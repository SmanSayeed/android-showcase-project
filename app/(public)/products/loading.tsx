import { ProductsSkeleton } from "@/components/products-skeleton"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Skeleton className="h-10 w-64 mb-4" />
                            <Skeleton className="h-6 w-96" />
                        </div>

                        {/* Search Skeleton */}
                        <div className="relative w-full md:w-80">
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    </div>

                    <ProductsSkeleton />

                </div>
            </main>

            <Footer />
        </div>
    )
}
