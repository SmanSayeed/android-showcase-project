"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  Monitor, 
  Smartphone, 
  Palette, 
  Folder, 
  Star, 
  Home, 
  Users, 
  Mail,
  ChevronDown 
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname()

  const getLink = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`
    }
    return href
  }

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 z-90 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-[85vw] max-w-[320px] bg-background z-100 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl border-l border-border",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="h-40 min-h-[160px] p-6 flex items-end bg-linear-to-br from-[#c084fc]/20 via-background to-[#ec4899]/20 border-b border-border/50">
          <div className="flex flex-col gap-1">
             <h1 className="text-2xl font-bold bg-linear-to-r from-[#c084fc] to-[#ec4899] bg-clip-text text-transparent tracking-tight">ApticStudio</h1>
             <p className="text-sm text-foreground/60 font-medium">Digital Solutions</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="flex flex-col">
            {/* Home */}
            <Link
              href={getLink("#home")}
              className="flex items-center gap-4 px-6 py-4 text-foreground/80 hover:bg-muted/50 hover:text-primary transition-colors"
              onClick={onClose}
            >
              <Home size={24} strokeWidth={1.5} />
              <span className="font-medium text-base">Home</span>
            </Link>

            {/* Services Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="w-full flex items-center gap-4 px-6 py-4 text-foreground/80 hover:bg-muted/50 hover:text-primary transition-colors hover:no-underline data-[state=open]:text-primary group">
                  <div className="flex items-center gap-4">
                     <Monitor size={24} strokeWidth={1.5} className="group-data-[state=open]:text-primary" />
                     <span className="font-medium text-base">Services</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pt-0">
                  <div className="flex flex-col">
                    <Link 
                      href={getLink("#services")} 
                      onClick={onClose} 
                      className="flex items-center gap-4 pl-18 pr-6 py-3 text-sm text-muted-foreground hover:bg-muted/30 transition-colors group/item"
                    >
                      <Monitor size={16} className="text-blue-500 group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium group-hover/item:text-foreground transition-colors">Web Development</span>
                    </Link>
                    <Link 
                      href={getLink("#services")} 
                      onClick={onClose} 
                      className="flex items-center gap-4 pl-18 pr-6 py-3 text-sm text-muted-foreground hover:bg-muted/30 transition-colors group/item"
                    >
                      <Smartphone size={16} className="text-purple-500 group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium group-hover/item:text-foreground transition-colors">App Development</span>
                    </Link>
                    <Link 
                      href={getLink("#services")} 
                      onClick={onClose} 
                      className="flex items-center gap-4 pl-18 pr-6 py-3 text-sm text-muted-foreground hover:bg-muted/30 transition-colors group/item"
                    >
                      <Palette size={16} className="text-pink-500 group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium group-hover/item:text-foreground transition-colors">UI/UX Design</span>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Projects Accordion */}
              <AccordionItem value="projects" className="border-none">
                <AccordionTrigger className="w-full flex items-center gap-4 px-6 py-4 text-foreground/80 hover:bg-muted/50 hover:text-primary transition-colors hover:no-underline data-[state=open]:text-primary group">
                  <div className="flex items-center gap-4">
                     <Folder size={24} strokeWidth={1.5} className="group-data-[state=open]:text-primary" />
                     <span className="font-medium text-base">Projects</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pt-0">
                  <div className="flex flex-col">
                    <Link 
                      href={getLink("#projects")} 
                      onClick={onClose} 
                      className="flex items-center gap-4 pl-18 pr-6 py-3 text-sm text-muted-foreground hover:bg-muted/30 transition-colors group/item"
                    >
                      <Folder size={16} className="text-orange-500 group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium group-hover/item:text-foreground transition-colors">All Projects</span>
                    </Link>
                    <Link 
                      href={getLink("#projects")} 
                      onClick={onClose} 
                      className="flex items-center gap-4 pl-18 pr-6 py-3 text-sm text-muted-foreground hover:bg-muted/30 transition-colors group/item"
                    >
                      <Star size={16} className="text-green-500 group-hover/item:scale-110 transition-transform" />
                      <span className="font-medium group-hover/item:text-foreground transition-colors">Featured</span>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            {/* Team */}
            <Link
              href="/team"
              className="flex items-center gap-4 px-6 py-4 text-foreground/80 hover:bg-muted/50 hover:text-primary transition-colors"
              onClick={onClose}
            >
              <Users size={24} strokeWidth={1.5} />
              <span className="font-medium text-base">Team</span>
            </Link>

            {/* Contact */}
            <Link
              href={getLink("#contact")}
              className="flex items-center gap-4 px-6 py-4 text-foreground/80 hover:bg-muted/50 hover:text-primary transition-colors"
              onClick={onClose}
            >
              <Mail size={24} strokeWidth={1.5} />
              <span className="font-medium text-base">Contact Me</span>
            </Link>
          </nav>
        </div>
        
        {/* Footer Area (Optional version/copyright) */}
        <div className="p-6 border-t border-border/50 text-xs text-muted-foreground text-center">
          © 2025 ApticStudio
        </div>
      </div>
    </>
  )
}
