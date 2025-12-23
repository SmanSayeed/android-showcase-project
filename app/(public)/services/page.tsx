import { Metadata } from "next"
import ServicesSection from "@/components/services-section"

export const metadata: Metadata = {
  title: "Services - Aptic Studio",
  description: "Comprehensive solutions for mobile and game development, UI/UX design, and more.",
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <ServicesSection />
    </div>
  )
}
