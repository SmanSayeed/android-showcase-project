import Link from "next/link"
import { ArrowLeft, Tag } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center text-muted-foreground mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Products
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column - Image Skeleton */}
                        <div>
                            <div className="relative aspect-video lg:aspect-square w-full rounded-3xl overflow-hidden border border-border bg-muted shadow-2xl">
                                <Skeleton className="w-full h-full" />
                            </div>
                        </div>

                        {/* Right Column - Details Skeleton */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <Skeleton className="h-6 w-32 rounded-full mb-4" />
                                <Skeleton className="h-12 w-3/4 mb-4" />
                                <Skeleton className="h-20 w-full" />
                            </div>

                            <div className="border-t border-border my-8 pt-8">
                                <div className="flex items-baseline mb-8">
                                    <Skeleton className="h-12 w-32" />
                                    <Skeleton className="h-6 w-12 ml-2" />
                                </div>

                                <div className="grid gap-4 mb-8">
                                    <Skeleton className="h-14 w-full rounded-xl" />
                                    <Skeleton className="h-4 w-48 mx-auto" />
                                </div>
                            </div>

                            {/* Features List Skeleton */}
                            <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
                                <Skeleton className="h-6 w-40 mb-4" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-5 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
