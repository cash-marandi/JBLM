"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Award, Users, Target, Heart, Clock, Shield, 
  ChevronRight, Phone, Mail, MapPin, Linkedin, 
  Twitter, Facebook, CheckCircle, Building, TrendingUp
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const teamMembers = [
  {
    name: "James van der Berg",
    role: "Managing Director",
    qualification: "Pr. QS, MRICS",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "With over 30 years in quantity surveying, James leads JBLM with vision and expertise."
  },
  {
    name: "Lerato Mkhize",
    role: "Senior Quantity Surveyor",
    qualification: "Pr. QS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Lerato specializes in commercial and industrial projects with 15 years of experience."
  },
  {
    name: "Mlungisi Khoza",
    role: "Cost Manager",
    qualification: "MCIOB, Pr. QS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Mlungisi brings innovative cost management solutions to complex infrastructure projects."
  },
  {
    name: "Anna Smith",
    role: "Contract Administrator",
    qualification: "MSc Construction Law",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Anna excels in contract negotiation and dispute resolution for construction projects."
  },
  {
    name: "David Nkosi",
    role: "Project Quantity Surveyor",
    qualification: "BSc QS",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "David focuses on residential and mixed-use developments across Mpumalanga."
  },
  {
    name: "Maria Naidoo",
    role: "Estimating Manager",
    qualification: "Pr. QS",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop",
    bio: "Maria leads our estimating team with precision and attention to detailed cost analysis."
  },
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Accurate measurements and detailed cost planning for every project."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparent practices and honest communication with all stakeholders."
  },
  {
    icon: Heart,
    title: "Commitment",
    description: "Dedicated support from project inception through to completion."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Building lasting relationships with clients, contractors, and suppliers."
  },
];

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "R50B+", label: "Project Value Managed" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">About JBLM QS</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Building Excellence Through <span className="gradient-gold-text">Trust & Expertise</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400">
              Since 1999, JBLM Quantity Surveyors has been the trusted partner for construction 
              cost management and project delivery across South Africa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-gold mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="JBLM Office"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 glass-dark rounded-2xl p-6 shadow-gold">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gold flex items-center justify-center">
                    <Building className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">Founded</p>
                    <p className="text-sm text-gray-400">1999</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
                <span className="text-sm text-gold font-medium">Our Story</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                A Legacy of <span className="gradient-gold-text">Excellence</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                JBLM Quantity Surveyors was founded with a simple mission: to provide accurate, 
                reliable, and professional quantity surveying services that help our clients 
                achieve their construction goals.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Over the past 25 years, we have grown from a small practice to one of the 
                most respected quantity surveying firms in Mpumalanga and beyond. Our commitment 
                to precision, integrity, and client success has remained unchanged.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Today, we serve a diverse client base including developers, contractors, 
                government agencies, and private individuals, delivering projects ranging from 
                residential homes to major commercial and infrastructure developments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[200px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Our Values</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              What <span className="gradient-gold-text">Drives Us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium bg-white/5 border-white/10 p-8 text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Our Team</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Meet the <span className="gradient-gold-text">Experts</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Our team of qualified professionals brings decades of combined experience 
              and a passion for excellence to every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium bg-card p-6 group hover:border-gold/30 transition-all"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center hover:bg-gold/30 transition-colors">
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-gold font-medium">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{member.qualification}</p>
                <p className="text-muted-foreground mt-4">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contact us today to discuss your project and discover how JBLM Quantity 
              Surveyors can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <button className="btn-gold text-lg px-8 py-4">
                  Get in Touch
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <a href="tel:0130104060">
                <button className="btn-outline-gold text-lg px-8 py-4">
                  <Phone className="mr-2 w-5 h-5" />
                  013 010 4060
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
