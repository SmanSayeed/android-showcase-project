"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import MobileDrawer from "./mobile-drawer"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border backdrop-blur-lg bg-background/80">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              PH
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground">ProgrammingHero</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#c084fc] to-[#ec4899] text-white hover:shadow-lg hover:shadow-[#ec4899]/50 transition-all"
            >
              Contact Me
            </a>
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu size={24} className="text-foreground" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  )
}
