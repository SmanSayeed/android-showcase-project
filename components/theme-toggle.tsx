"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const theme = localStorage.getItem("theme") || "dark"
    setIsDark(theme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)

    // Update CSS variables
    if (newTheme === "dark") {
      document.documentElement.style.colorScheme = "dark"
    } else {
      document.documentElement.style.colorScheme = "light"
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-(--color-bg-secondary) transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} className="text-(--color-text)" /> : <Moon size={20} className="text-(--color-text)" />}
    </button>
  )
}
