import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import WhyChooseUs from "@/components/why-choose-us"
import ProjectsGrid from "@/components/projects-grid"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsGrid 
        limit={3} 
        viewAllHref="/projects" 
      />

      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
