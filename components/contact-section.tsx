"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2, Monitor, Smartphone, Palette, HelpCircle, Gamepad2, Layout, Code, Box, Layers } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ICON_MAP: Record<string, any> = {
  Smartphone,
  Gamepad2,
  Layout,
  Code,
  Monitor,
  Box,
  Layers,
  Palette
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "web-development",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const [contactSettings, setContactSettings] = useState({
    email: "hello@portfolio.com",
    whatsapp: "",
  })
  const supabase = createClient()

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from("site_settings").select("*").single()
      if (data) {
        setContactSettings({
          email: data.contact_email || "hello@portfolio.com",
          whatsapp: data.whatsapp_number || "",
        })
      }

      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .order("order_index")
      
      if (servicesData) {
        setServices(servicesData)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error, status } = await supabase.from("contact_messages").insert({
        name: formData.name,
        email: formData.email,
        message: `${formData.message}\n\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}`,
      })

      if (error) throw error

      // Check for success status (201 Created or 204 No Content)
      if (status !== 201 && status !== 204) {
        throw new Error("Failed to send message")
      }

      toast.success("Message sent successfully! I'll get back to you soon.")
      setFormData({ name: "", email: "", phone: "", projectType: "web-development", message: "" })
    } catch (error: any) {
      console.error("Submission error:", error)
      toast.error(error.message || "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's connect and create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex flex-col gap-6"
          >
            {[
              { icon: Mail, title: "Email", value: contactSettings.email },
              { icon: Phone, title: "WhatsApp", value: contactSettings.whatsapp || "Not configured" },
              { icon: MapPin, title: "Location", value: "Remote / Worldwide" },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{item.title}</p>
                  <p className="text-foreground font-semibold break-all">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white dark:bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white dark:bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg bg-white dark:bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={loading}
              />
              <Select
                value={formData.projectType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                disabled={loading}
              >
                <SelectTrigger className="w-full px-4 py-3 rounded-lg bg-white dark:bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-left h-auto">
                    <span className={!formData.projectType ? "text-muted-foreground" : ""}>
                      {formData.projectType 
                        ? (services.find(s => s.id === formData.projectType)?.title || (formData.projectType === 'other' ? "Other" : formData.projectType))
                        : "Select Project Type"
                      }
                    </span>
                </SelectTrigger>
                <SelectContent
                  sideOffset={8}
                  className="
                    w-[calc(100vw-2rem)] sm:w-(--radix-select-trigger-width)
                    max-h-[60vh]
                    overflow-y-auto
                    p-1.5
                    mt-2
                    rounded-xl
                    border border-border/50
                    bg-background/95
                    dark:bg-background/95
                    text-foreground
                    shadow-xl
                    backdrop-blur-md
                  "
                >
                  {services.map((service) => {
                    const Icon = ICON_MAP[service.icon_name] || Smartphone
                    return (
                        <SelectItem 
                            key={service.id} 
                            value={service.id}
                            className="curso-pointer rounded-lg px-3 py-2.5 mb-1 transition-all hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary"
                        >
                            <div className="flex items-start gap-3 py-1">
                                <div className={`p-2 rounded-md ${service.color_theme?.includes('blue') ? 'bg-blue-500/10 text-blue-500' : service.color_theme?.includes('purple') ? 'bg-purple-500/10 text-purple-500' : 'bg-primary/10 text-primary'} mt-0.5`}>
                                    <Icon size={18} />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-foreground">{service.title}</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
                                </div>
                            </div>
                        </SelectItem>
                    )
                  })}

                  <SelectItem value="other" className="cursor-pointer rounded-lg px-3 py-2.5 mb-1 transition-all hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary">
                    <div className="flex items-start gap-3 py-1">
                      <div className="p-2 bg-gray-500/10 rounded-md text-gray-500 mt-0.5">
                        <HelpCircle size={18} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Other</div>
                        <p className="text-xs text-muted-foreground mt-0.5">General inquiries or other projects</p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full button-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
