"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Facebook, Instagram, Youtube, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase"
import Image from "next/image"

// Icon mapping helper
const getIcon = (platform: string) => {
  const p = platform.toLowerCase()
  if (p.includes("github")) return Github
  if (p.includes("linkedin")) return Linkedin
  if (p.includes("twitter")) return Twitter
  if (p.includes("x")) return Twitter
  if (p.includes("facebook")) return Facebook
  if (p.includes("instagram")) return Instagram
  if (p.includes("youtube")) return Youtube
  if (p.includes("email")) return Mail
  return Globe
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [socials, setSocials] = useState<any[]>([])
  const [siteName, setSiteName] = useState("Aptic Studio")
  const [logoUrl, setLogoUrl] = useState("/my-logo.jpeg")
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: socialData } = await supabase.from("social_links").select("*").eq("is_active", true)
      if (socialData) setSocials(socialData)

      const { data: settings } = await supabase.from("site_settings").select("site_name, logo_url").single()
      if (settings) {
        if (settings.site_name) setSiteName(settings.site_name)
        if (settings.logo_url) setLogoUrl(settings.logo_url)
      }
    }
    fetchData()
  }, [])

  return (
    <footer className="bg-secondary border-t border-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src={logoUrl}
              alt={`${siteName} Logo`}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <p className="font-bold text-foreground">{siteName}</p>
            <p className="text-muted-foreground text-sm">
              Building beautiful and functional digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#home"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="#projects"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="#services"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <nav className="flex flex-col gap-2">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                iOS Development
              </a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                Android Development
              </a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                Game Development
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {socials.map((link) => {
                const Icon = getIcon(link.platform)
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-background hover:bg-primary text-foreground hover:text-white flex items-center justify-center transition-all"
                    title={link.platform}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
              {socials.length === 0 && (
                <span className="text-sm text-muted-foreground">No links available</span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">&copy; {currentYear} {siteName}. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
