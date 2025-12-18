
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Aptic Studio",
  description: "Privacy Policy for Aptic Studio.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* Hero Section / Card Aesthetic */}
      <section className="container mx-auto px-4 py-8 md:py-24">
        <div className="rounded-[2.5rem] bg-[#110C2A] overflow-hidden relative shadow-2xl">
          {/* Background Elements to mimic the depth */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center p-6 md:p-16 relative z-10">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Privacy <br className="hidden md:block"/> Policy
              </h1>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Your privacy is important to us. This policy outlines how Aptic Studio collects, uses, and protects your personal information.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 <button className="w-full sm:w-auto bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                   Download PDF <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                 </button>
              </div>
            </div>

            {/* Right Visual (Mocking the illustration style) */}
            <div className="relative flex items-center justify-center mt-4 lg:mt-0">
               <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-sm md:max-w-md aspect-square flex flex-col items-center justify-center text-center space-y-6 shadow-2xl">
                  {/* Decorative Shield Icon */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check md:w-12 md:h-12"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <div className="space-y-2">
                     <div className="text-xl md:text-2xl font-bold text-white">Data Protection</div>
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
              <h2 className="text-3xl font-bold text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, delivery notes, and other information you choose to provide.
              </p>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, such as to administration of your account, process and deliver your orders, and facilitate payments. We also use the information to:
              </p>
              <div className="bg-muted/30 p-6 rounded-2xl border border-border mt-4">
                <ul className="space-y-3">
                   <li className="flex gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mt-0.5 shrink-0">✓</div>
                     <span className="text-muted-foreground">Send you technical notices, updates, security alerts, and support messages.</span>
                   </li>
                   <li className="flex gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mt-0.5 shrink-0">✓</div>
                     <span className="text-muted-foreground">Respond to your comments, questions, and requests and provide customer service.</span>
                   </li>
                   <li className="flex gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mt-0.5 shrink-0">✓</div>
                     <span className="text-muted-foreground">Communicate with you about products, services, offers, and events.</span>
                   </li>
                </ul>
              </div>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">3. Sharing of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>With third party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process.</li>
              </ul>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">4. Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aptic Studio takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
              </p>
          </section>

          <section className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">5. Your Choices</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may correct your account information at any time by logging into your online or in-app account. If you wish to cancel your account, please email us at <a href="mailto:support@apticstudio.com" className="text-primary hover:underline">support@apticstudio.com</a>.
              </p>
          </section>
        </div>
      </div>
    </div>
  )
}
