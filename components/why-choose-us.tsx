"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

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
      transition: { duration: 0.5, ease: "easeOut" },
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
      </div>
    </section>
  )
}
