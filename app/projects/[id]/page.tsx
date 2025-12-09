
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Check, ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === Number(id))

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.fullDescription}</p>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-foreground mb-4">Key Features</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 flex gap-4">
              <button className="px-6 py-3 rounded-lg font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2">
                Live Demo
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 rounded-lg font-bold border border-border bg-card hover:bg-muted transition-colors">
                Case Study
              </button>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
            {/* Using a placeholder since actual images might not exist, but src points to what data says */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
              <span className="text-lg">Project Image Placeholder</span>
            </div>
            {/* Uncomment when real images are available */}
            {/* <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover"
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
