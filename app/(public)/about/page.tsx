import { createClient } from "@supabase/supabase-js"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  Smartphone, 
  ScanLine, 
  Code2, 
  Car, 
  Target, 
  Lightbulb, 
  Users, 
  Globe,
  Mail,
  MapPin,
  Download,
  CheckCircle2,
  LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"


// Force dynamic rendering and disable caching for this page
export const revalidate = 0
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "About Us - Aptic Studio",
  description: "Learn more about Aptic Studio, our mission, vision, and the team behind our success.",
}

// Icon mapping
const ICON_MAP: Record<string, LucideIcon> = {
  ScanLine, Code2, Car, Target, Lightbulb, Users, Globe, Smartphone, MapPin, Download, CheckCircle2
}

// Color themes mapping
const THEME_MAP: Record<string, { text: string, bg: string, btn: string, btnHover: string }> = {
  green: { text: "text-green-500", bg: "bg-green-500/10", btn: "bg-green-600", btnHover: "hover:bg-green-700" },
  blue: { text: "text-blue-500", bg: "bg-blue-500/10", btn: "bg-blue-600", btnHover: "hover:bg-blue-700" },
  orange: { text: "text-orange-500", bg: "bg-orange-500/10", btn: "bg-orange-600", btnHover: "hover:bg-orange-700" },
  purple: { text: "text-purple-500", bg: "bg-purple-500/10", btn: "bg-purple-600", btnHover: "hover:bg-purple-700" },
  teal: { text: "text-teal-500", bg: "bg-teal-500/10", btn: "bg-teal-600", btnHover: "hover:bg-teal-700" },
  primary: { text: "text-primary", bg: "bg-primary/10", btn: "bg-primary", btnHover: "hover:bg-primary/90" },
}

async function getAboutData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const settingsRes = await supabase
    .from("about_page_settings")
    .select("*")
    .single()

  const statsRes = await supabase
    .from("about_stats")
    .select("*")
    .order("order_index")

  const productsRes = await supabase
    .from("about_products")
    .select("*")
    .order("order_index")

  if (settingsRes.error) console.error("❌ Error fetching settings:", settingsRes.error)
  if (statsRes.error) console.error("❌ Error fetching stats:", statsRes.error)
  if (productsRes.error) console.error("❌ Error fetching products:", productsRes.error)

  return {
    settings: settingsRes.data,
    stats: statsRes.data || [],
    products: productsRes.data || [],
  }
}
export default async function AboutPage() {
  const { settings, stats, products } = await getAboutData()
  
  if (settings) {
    console.log("✅ [About Page] Successfully fetched data from Supabase:", { 
      badge: settings.hero_badge_text,
      statsCount: stats.length, 
      productsCount: products.length 
    })
  } else {
    console.log("⚠️ [About Page] No data returned from Supabase, using fallback content.")
  }

  // Fallbacks if DB is empty
  const s = settings || {
    hero_badge_text: "ApticStudio",
    hero_title_part1: "Building Apps That",
    hero_title_highlight: "Solve Real Problems",
    hero_subtitle: "We are a creative mobile development company creating innovative solutions for real-world challenges — from AI-powered tools to smart business applications.",
    value_1_title: "Mission Driven",
    value_1_desc: "Creating technology solutions that address real challenges faced by our communities.",
    value_2_title: "Innovation First",
    value_2_desc: "Leveraging cutting-edge AI and mobile technologies to build smart, intuitive applications.",
    value_3_title: "User Focused",
    value_3_desc: "Designing experiences that are accessible, easy to use, and truly helpful for everyday users.",
    value_4_title: "Global Impact",
    value_4_desc: "Proud to build solutions that serve and empower our local and global communities.",
    main_content_text_1: "Aptic Studio is a forward-thinking mobile development company dedicated to solving local challenges through innovative technology. We believe in creating apps that make everyday tasks easier and more efficient for our community.",
    main_content_text_2: "From our flagship AI Scanner that transforms document management to our upcoming platforms, we're committed to building practical solutions that truly matter.",
  }

  const values = [
    { title: s.value_1_title, desc: s.value_1_desc, icon: Target, color: "teal" },
    { title: s.value_2_title, desc: s.value_2_desc, icon: Lightbulb, color: "purple" },
    { title: s.value_3_title, desc: s.value_3_desc, icon: Users, color: "blue" },
    { title: s.value_4_title, desc: s.value_4_desc, icon: Globe, color: "primary" },
  ]
  
  const displayStats = stats.length > 0 ? stats : [
    { value: "20+", label: "Apps Published" },
    { value: "AI", label: "Powered Solutions" },
    { value: "100%", label: "Client Satisfaction" }
  ]

  const displayProducts = products.length > 0 ? products : [
    { 
       title: "Aptic AI Scanner", 
       category: "QR, OCR & PDF", 
       description: "Transform your phone into a powerful document scanner with AI-powered OCR, QR code scanning, and instant PDF creation.",
       icon_name: "ScanLine",
       color_theme: "green",
       primary_button_text: "Get on Play Store",
       is_featured: true,
       is_coming_soon: false,
       features: ["Smart OCR Recognition", "PDF Export & Sharing"]
    },
    { 
       title: "Aptic Code Studio", 
       category: "AI-Powered IDE",
       description: "Your intelligent coding companion. Write, debug, and deploy code directly from your mobile device with AI assistance.",
       icon_name: "Code2",
       color_theme: "blue",
       primary_button_text: "Visit App Site",
       is_featured: false,
       is_coming_soon: false,
       features: ["Multi-Language Support", "Built-in Terminal"]
    },
    { 
       title: "Tripzy", 
       category: "Ride Sharing",
       description: "A revolutionary ride-hailing app designed specifically for local transportation ecosystems. Fair pricing for everyone.",
       icon_name: "Car",
       color_theme: "orange",
       primary_button_text: "Notify Me",
       is_featured: false,
       is_coming_soon: true,
       features: ["Easy Booking", "Real-time Tracking"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-12 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {s.hero_badge_text}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              {s.hero_title_part1} <br />
              <span className="bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {s.hero_title_highlight}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0">
              {s.hero_subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full px-8 text-base">
                Explore Our Apps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4 border-t border-border/50">
              {displayStats.map((stat: any, i: number) => (
                <div key={i} className="flex gap-8 items-center">
                  <div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                  {i < displayStats.length - 1 && <div className="hidden sm:block w-px h-10 bg-border/50" />}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto lg:ml-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] aspect-9/18 animate-in fade-in slide-in-from-right-10 duration-1000 delay-200 mt-8 lg:mt-0">
            {/* Phone Mockup Representation */}
            <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-gray-800 overflow-hidden">
               {/* Phone Screen Content */}
               <div className="h-full w-full bg-background relative flex flex-col">
                  {/* Status Bar Mock */}
                   <div className="h-6 bg-black/5 w-full flex justify-between px-6 items-center text-[10px] font-bold opacity-50">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-current"></div>
                        <div className="w-3 h-3 rounded-full bg-current"></div>
                      </div>
                   </div>
                   
                   {/* App UI Mock */}
                   <div className="flex-1 p-6 space-y-6 bg-linear-to-b from-primary/5 to-background">
                      <div className="flex justify-between items-center">
                         <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                         <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                      </div>
                      
                      <div className="space-y-2">
                         <div className="h-8 w-3/4 bg-foreground/10 rounded-lg"></div>
                         <div className="h-4 w-1/2 bg-foreground/10 rounded-lg"></div>
                      </div>

                      <div className="aspect-square w-full bg-white dark:bg-black/20 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden group">
                         <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
                         <ScanLine className="w-16 h-16 text-primary animate-pulse" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-24 rounded-2xl bg-white dark:bg-black/20 shadow-xs"></div>
                         <div className="h-24 rounded-2xl bg-white dark:bg-black/20 shadow-xs"></div>
                      </div>
                   </div>

                   {/* Floating Label */}
                   <div className="hidden md:flex absolute bottom-24 -left-12 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl items-center gap-4 animate-bounce duration-3000">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                         <Smartphone size={20} />
                      </div>
                      <div>
                         <div className="font-bold text-sm">Mobile First</div>
                         <div className="text-xs text-muted-foreground">Android & iOS Apps</div>
                      </div>
                   </div>
                   
                   <div className="hidden md:flex absolute top-32 -right-12 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl items-center gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <div className="font-bold text-sm">Local Focus</div>
                         <div className="text-xs text-muted-foreground">Global Standards</div>
                      </div>
                   </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {/* Products Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Code2 size={16} /> Our Products
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Apps That Make a <span className="text-primary">Difference</span>
            </h2>
            <p className="text-muted-foreground">
              Innovative mobile applications designed to solve everyday challenges. Experience the power of technology in your hands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {displayProducts.map((p: any, idx: number) => {
              const theme = THEME_MAP[p.color_theme] || THEME_MAP.blue
              const Icon = ICON_MAP[p.icon_name] || Code2
              
              return (
                <div key={idx} className={`bg-background rounded-3xl p-6 md:p-8 border border-border shadow-xs hover:shadow-xl transition-all duration-300 ${p.is_coming_soon ? 'opacity-80 hover:opacity-100' : 'hover:-translate-y-1'} group relative overflow-hidden`}>
                  {p.is_featured && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                       Featured
                    </div>
                  )}
                  {p.is_coming_soon && (
                    <div className="w-fit px-3 py-1 bg-muted rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">Coming Soon</div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl ${theme.bg} ${theme.text} flex items-center justify-center mb-6 group-hover:bg-current group-hover:text-white transition-colors`}>
                     <Icon size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className={`text-sm ${theme.text} font-medium mb-4`}>{p.category}</p>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                     {p.description}
                  </p>
                  
                  {p.features && (
                    <div className="space-y-2 mb-8">
                       {p.features.map((f: string, i: number) => (
                         <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 size={14} className={theme.text.split(' ')[0]} /> {f}
                         </div>
                       ))}
                    </div>
                  )}
                  
                  <Button 
                    className={`w-full rounded-xl ${p.is_coming_soon ? '' : `${theme.btn} ${theme.btnHover} text-white group-hover:shadow-lg transition-all`}`}
                    disabled={p.is_coming_soon}
                    variant={p.is_coming_soon ? "outline" : "default"}
                  >
                     {p.primary_button_text}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* About Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
               About Us
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" dangerouslySetInnerHTML={{ __html: s.main_content_title || "" }} />
             
             <p className="text-lg text-muted-foreground leading-relaxed">
               {s.main_content_text_1}
             </p>
             <p className="text-muted-foreground leading-relaxed">
               {s.main_content_text_2}
             </p>
             <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center font-bold text-xs text-gray-500">
                        U{i}
                     </div>
                   ))}
                </div>
                <div className="text-sm font-medium">
                   <div className="text-foreground">The Aptic Team</div>
                   <div className="text-muted-foreground">Building the future</div>
                </div>
             </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
             {values.map((v, i) => {
               const theme = THEME_MAP[v.color] || THEME_MAP.primary
               return (
                 <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-xs hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center mb-4`}>
                       <v.icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                 </div>
               )
             })}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Mail size={16} /> Get In Touch
             </div>
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something <span className="text-primary">Together</span></h2>
             <p className="text-muted-foreground">Have a project idea or want to collaborate? We'd love to hear from you.</p>
          </div>

          <div className="bg-background rounded-[2.5rem] p-6 md:p-12 border border-border shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
             <div className="flex-1 space-y-8 w-full">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail size={24} />
                   </div>
                   <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:hello@apticstudio.com" className="text-muted-foreground hover:text-primary transition-colors">hello@apticstudio.com</a>
                   </div>
                </div>
                
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <div className="font-semibold mb-1">Location</div>
                      <div className="text-muted-foreground">New York, USA</div>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Download size={24} />
                   </div>
                   <div>
                      <div className="font-semibold mb-1">Play Store</div>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">View Our Apps</a>
                   </div>
                </div>
             </div>

             <div className="flex-1 w-full bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center gap-6 border border-border/50">
                <div className="w-24 h-24 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary/30">
                   AS
                </div>
                <div>
                   <h3 className="text-2xl font-bold tracking-tight">APTIC STUDIO</h3>
                   <p className="text-sm text-muted-foreground">Innovative Software Solutions</p>
                </div>
                <Button className="w-full max-w-xs rounded-xl" size="lg">
                   Visit Play Store
                </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
