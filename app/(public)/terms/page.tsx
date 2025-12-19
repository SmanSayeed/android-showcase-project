import { createServerSideClient } from "@/lib/supabase-server"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions - Aptic Studio",
  description: "Terms and conditions for using Aptic Studio's services and website.",
}

export default async function TermsPage() {
  const supabase = await createServerSideClient()
  const { data } = await supabase
    .from('terms_page')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  const title = data?.title || "Terms & Conditions"
  const description = data?.description || "Please read these terms carefully before using our services."
  const content = data?.content || "No content available."

  const lastUpdated = data?.updated_at ? new Date(data.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString()

  return (
    <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
           {/* Simple Header */}
           <div className="mb-12 border-b border-border pb-8">
              <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">ApticStudio</span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
              <div className="mt-6 text-sm text-muted-foreground/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                Last Updated: {lastUpdated}
              </div>
           </div>
           
           {/* Content */}
           <article className="prose prose-gray dark:prose-invert max-w-none hover:prose-a:text-primary transition-colors">
                {content ? (
                    <div className="whitespace-pre-wrap font-sans leading-relaxed text-foreground/90">
                        {content}
                    </div>
                ) : (
                    <div className="py-12 text-center text-muted-foreground italic">
                        No terms content has been published yet.
                    </div>
                )}
           </article>
        </div>
    </div>
  )
}
