
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions - Aptic Studio",
  description: "Terms and conditions for using Aptic Studio's services and website.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* Hero Section / Card Aesthetic */}
      {/* Hero Section / Card Aesthetic */}
      <section className="container mx-auto px-4 py-8 md:py-24">
        <div className="rounded-[2.5rem] bg-[#110C2A] overflow-hidden relative shadow-2xl">
          {/* Background Elements to mimic the depth */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-600/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center p-6 md:p-16 relative z-10">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Terms & <br className="hidden md:block"/> Conditions
              </h1>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Please read these terms carefully before using our services. They outline the rules and regulations for the use of Aptic Studio's Website and Services.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 <button className="w-full sm:w-auto bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-8 py-3 rounded-xl shadow-lg shadow-purple-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                   Download PDF <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                 </button>
              </div>
            </div>

            {/* Right Visual (Mocking the illustration style) */}
            <div className="relative flex items-center justify-center mt-4 lg:mt-0">
               <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-sm md:max-w-md aspect-square flex flex-col items-center justify-center text-center space-y-6 shadow-2xl">
                  {/* Decorative Document Icon */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-500/30">
                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text md:w-12 md:h-12"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                  </div>
                  <div className="space-y-2">
                     <div className="text-xl md:text-2xl font-bold text-white">Legal Overview</div>
                     <div className="text-xs md:text-sm text-gray-400">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                  {/* Pseudo-lines to look like document text */}
                  <div className="w-full space-y-3 px-4 md:px-8 opacity-50">
                     <div className="h-2 w-full bg-gray-500/50 rounded-full" />
                     <div className="h-2 w-3/4 bg-gray-500/50 rounded-full mx-auto" />
                     <div className="h-2 w-5/6 bg-gray-500/50 rounded-full mx-auto" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Aptic Studio. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, users, and others who access or use the Service.
              </p>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">2. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Aptic Studio and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">3. User Responsibilities</h2>
              <div className="bg-muted/30 p-6 rounded-2xl border border-border">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5 shrink-0">✓</div>
                    <span className="text-muted-foreground">You must provide accurate and complete information when creating an account.</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5 shrink-0">✓</div>
                    <span className="text-muted-foreground">You are responsible for safeguarding the password that you use to access the Service.</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5 shrink-0">✓</div>
                    <span className="text-muted-foreground">You typically agree not to use the service for any illegal or unauthorized purpose.</span>
                  </li>
                </ul>
              </div>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">4. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Aptic Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">5. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
          </section>
        </div>
      </div>
    </div>
  )
}
