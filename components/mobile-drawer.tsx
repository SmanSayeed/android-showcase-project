"use client"

import Link from "next/link"
import { X } from "lucide-react"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
  ]

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-(--color-bg) border-r border-(--color-border) z-50 transform transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col gap-6">
          {/* Close Button */}
          <button onClick={onClose} className="self-end p-2 hover:bg-(--color-bg-secondary) rounded-lg">
            <X size={24} className="text-(--color-text)" />
          </button>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-lg font-semibold text-(--color-text) hover:text-(--color-primary) transition-colors px-4 py-2 rounded-lg hover:bg-(--color-bg-secondary)"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
            <Link href="#contact" className="button-primary mt-4 text-center" onClick={onClose}>
              Contact Me
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
