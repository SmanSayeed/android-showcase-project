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

        {/* View Team Button */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/team" className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative px-8 py-4 bg-background text-foreground font-bold rounded-lg leading-none flex items-center divide-x divide-gray-600 border border-gray-600/30">
              <span className="pr-6 text-lg group-hover:text-primary transition duration-200">View Team</span>
              <span className="pl-6 text-muted-foreground group-hover:text-gray-100 transition duration-200">Meet the Experts &rarr;</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
