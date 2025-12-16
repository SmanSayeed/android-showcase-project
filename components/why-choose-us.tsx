"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

export default function WhyChooseUs() {
  const features = [
    "Professional Team",
    "Fast Delivery",
    "Real Delivery",
    "Pixel-perfect UI",
    "High-performance Code",
    "Maintenance & Support",
    "Affordable Pricing",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  }

  return (
    <section id="why-choose" className="relative py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience excellence with our trusted development team
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary transition-all duration-300 hover:bg-muted group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-r from-[#c084fc] to-[#ec4899] group-hover:scale-110 transition-transform">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="text-foreground font-medium">{feature}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Team Section */}
        <motion.div
          className="mt-20 relative rounded-2xl overflow-hidden bg-card border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row h-auto md:h-[300px]">
            {/* Left: Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-full">
              {/* Unsplash Image: Professional Team Meeting/Office */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-background to-secondary/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Meet the Experts Behind Your Success</h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Our diverse team of engineers, designers, and strategists is dedicated to delivering excellence in every line of code and pixel of design.
              </p>
              <div>
                <Link href="/team" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors group">
                  View Our Team
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
