import { Metadata } from "next"
import ServicesSection from "@/components/services-section"

import { createServerSideClient } from "@/lib/supabase-server"

export const metadata: Metadata = {
  title: "Services - Aptic Studio",
  description: "Comprehensive solutions for mobile and game development, UI/UX design, and more.",
}

export default async function ServicesPage() {
  const supabase = await createServerSideClient()

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_index")

  return (
    <div className="pt-20">
      <ServicesSection services={services || []} />
    </div>
  )
}
