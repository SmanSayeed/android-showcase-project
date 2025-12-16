"use client"

import { toast } from "sonner"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import ProjectCard from "./project-card"
import { createClient } from "@/lib/supabase"
import ProjectsSkeleton from "./skeletons/projects-skeleton"

const PAGE_SIZE = 6

export default function ProjectsGrid() {
  const supabase = createClient()

  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchProjects = async (offset: number) => {
    try {
      const from = offset
      const to = offset + PAGE_SIZE - 1

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(from, to)

      if (error) throw error

      console.log(`Fetched ${data.length} projects. From: ${from}, To: ${to}`)

      setProjects((prev) => {
        // Just append, trust the offset
        return [...prev, ...data]
      })

      // if (data.length < PAGE_SIZE) {
      //   setHasMore(false)
      // }
    } catch (error) {
      console.log(error)
      toast.error("Failed to load projects")
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchProjects(0).finally(() => setLoading(false))
  }, [])

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    await fetchProjects(projects.length)
    setLoadingMore(false)
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my recent work
          </p>
        </motion.div>

        {/* Projects */}
        {loading ? (
          <ProjectsSkeleton />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Link href={`/projects/${project.id}`}>
                    <ProjectCard project={project} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
