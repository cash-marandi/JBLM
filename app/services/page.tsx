"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calculator, BarChart3, FileText, Target, Shield, TrendingUp,
  ChevronRight, CheckCircle, Phone, ArrowRight, Clock, Users,
  Award, DollarSign, Briefcase, Scale
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const services = [
  {
    icon: Calculator,
    title: "Quantity Surveying",
    description: "Comprehensive measurement and cost management services for construction projects of all sizes.",
    features: [
      "Bills of Quantities (BOQ) Preparation",
      "Site Measurements & Surveys",
      "Cost Planning & Budgeting",
      "Interim Valuations",
      "Final Account Preparation",
      "Life Cycle Costing"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    icon: BarChart3,
    title: "Cost Management",
    description: "Strategic financial control to keep your project on budget and maximize your investment returns.",
    features: [
      "Cost Planning & Forecasting",
      "Cash Flow Analysis",
      "Value Engineering",
      "Cost Control & Monitoring",
      "Risk Assessment",
      "Financial Reporting"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    icon: FileText,
    title: "Contract Administration",
    description: "Expert management of construction contracts to protect your interests and ensure smooth project delivery.",
    features: [
      "Contract Selection & Preparation",
      "Contractor Procurement",
      "Claims Management",
      "Progress Monitoring",
      "Dispute Resolution",
      "Project Close-out"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
  },
  {
    icon: Target,
    title: "Project Planning",
    description: "Detailed project scheduling and resource allocation for successful on-time delivery.",
    features: [
      "Project Programming",
      "Resource Planning",
      "Milestone Scheduling",
      "Risk Management",
      "Quality Assurance",
      "Project Recovery Plans"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Proactive identification and mitigation of project risks to protect your investment.",
    features: [
      "Risk Identification & Analysis",
      "Insurance Advisory",
      "Contingency Planning",
      "Risk Register Management",
      "Mitigation Strategies",
      "Business Continuity Planning"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
  },
  {
    icon: TrendingUp,
    title: "Financial Advisory",
    description: "Expert financial consulting to maximize your investment returns and project viability.",
    features: [
      "Feasibility Studies",
      "Investment Appraisal",
      "Due Diligence",
      "Development Appraisals",
      "Funding Applications",
      "Life Cycle Costing"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
  {
    icon: DollarSign,
    title: "Estimating Services",
    description: "Accurate cost estimates for tendering and budgeting purposes across all project types.",
    features: [
      "Preliminary Estimates",
      "Detailed Estimates",
      "Tender Price Analysis",
      "Material Take-offs",
      "Trade Cost Analysis",
      "Change Order Estimates"
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    description: "Professional support in resolving construction disputes efficiently and cost-effectively.",
    features: [
      "Contractual Advice",
      "Mediation Services",
      "Expert Witness",
      "Arbitration Support",
      "Claims Preparation",
      "Adjudication Support"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop"
  },
];

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "We meet with you to understand your project requirements, goals, and constraints."
  },
  {
    step: "02",
    title: "Feasibility Study",
    description: "We assess the viability of your project and provide initial cost planning."
  },
  {
    step: "03",
    title: "Design Development",
    description: "We work with your design team to refine costs as the design evolves."
  },
  {
    step: "04",
    title: "Tender Documentation",
    description: "We prepare detailed Bills of Quantities for contractor procurement."
  },
  {
    step: "05",
    title: "Construction Phase",
    description: "We provide ongoing cost management and contract administration."
  },
  {
    step: "06",
    title: "Project Completion",
    description: "We finalize accounts and ensure all project objectives are achieved."
  },
];

const benefits = [
  { icon: Award, title: "Professional Accreditation", description: "All our surveyors are professionally registered with SACQSP and RICS." },
  { icon: Clock, title: "Timely Delivery", description: "We understand the importance of deadlines and always deliver on time." },
  { icon: Users, title: "Dedicated Team", description: "You get a dedicated team who know your project inside out." },
  { icon: Briefcase, title: "Industry Experience", description: "Over 25 years of experience across all sectors of construction." },
];

export default function ServicesPage() {
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
              <span className="text-sm text-gold font-medium">Our Services</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Comprehensive <span className="gradient-gold-text">Solutions</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400">
              From initial feasibility to final completion, we provide end-to-end quantity 
              surveying and cost management services tailored to your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className="mt-8 inline-flex items-center text-gold font-medium hover:underline">
                    Request a Quote
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className={`relative ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold rounded-2xl flex items-center justify-center shadow-gold">
                    <span className="text-3xl font-bold text-black">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              <span className="text-sm text-gold font-medium">Our Process</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              How We <span className="gradient-gold-text">Work</span>
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              A structured approach to delivering excellence on every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium bg-white/5 border-white/10 p-8 relative"
              >
                <span className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gold flex items-center justify-center text-xl font-bold text-black">
                  {step.step}
                </span>
                <h3 className="text-xl font-bold text-white mt-4 mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <span className="text-sm text-gold font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              The JBLM <span className="gradient-gold-text">Advantage</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium bg-card p-8 text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contact us today for a free consultation and quote on your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <button className="btn-gold text-lg px-8 py-4">
                  Request a Quote
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
