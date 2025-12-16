"use client"

import { motion } from "framer-motion"
import { Gamepad2, Palette, Code, User, Rocket } from "lucide-react"

export default function TeamPage() {
  const team = [
    {
      role: "Founder",
      skills: ["Leadership", "Strategy", "Vision", "Management"],
      icon: <User className="w-10 h-10 mb-4 text-blue-500" />,
      description: "Driving the vision and strategy to create world-class digital experiences."
    },
    {
      role: "Game Developer",
      skills: ["Unity / C#", "Unreal Engine / C++", "Godot rGDScript / C#"],
      icon: <Gamepad2 className="w-10 h-10 mb-4 text-purple-500" />,
      description: "Expert in creating immersive gaming experiences across multiple next-gen engines."
    },
    {
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      icon: <Palette className="w-10 h-10 mb-4 text-pink-500" />,
      description: "Crafting intuitive and visually stunning interfaces that delight users."
    },
    {
      role: "UI/UX Designer",
      skills: ["Visual Design", "Wireframing", "Interaction Design", "Usability Testing"],
      icon: <Palette className="w-10 h-10 mb-4 text-pink-500" />,
      description: "Specializing in user-centric design principles and beautiful aesthetics."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Meet Our Experts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The talented individuals behind our exceptional digital solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-card border border-gray-800 p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] group"
            >
              <div className="bg-gray-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 {member.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{member.role}</h3>
              <p className="text-muted-foreground mb-6 h-12">{member.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Listen to User Request: "Join with us" button */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           <h2 className="text-3xl font-bold mb-8">Want to become part of our story?</h2>
           <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
              Join With Us <Rocket className="ml-2 h-4 w-4" />
            </span>
          </button>
        </motion.div>

      </div>
    </div>
  )
}
