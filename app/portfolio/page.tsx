"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Building, Home, HardHat, ArrowRight, Filter,
  MapPin, Calendar, DollarSign, ChevronRight, Award, Loader2
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const categories = [
  { name: "All Projects", icon: Building },
  { name: "Commercial", icon: Building },
  { name: "Residential", icon: Home },
  { name: "Industrial", icon: HardHat },
  { name: "Infrastructure", icon: Building },
];

const defaultProjects = [
  {
    title: "Mbombela Plaza Shopping Centre",
    category: "Commercial",
    location: "Mbombela, Mpumalanga",
    value: "R850 Million",
    year: "2024",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description: "A premier shopping destination featuring 150 retail outlets, cinema complex, and food court spanning 45,000m²."
  },
  {
    title: "Sonheuwel Residential Estate",
    category: "Residential",
    location: "Sonheuwel, Mbombela",
    value: "R320 Million",
    year: "2023",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    description: "Luxury residential estate comprising 200 sectional title units with world-class amenities and 24-hour security."
  },
  {
    title: "Mpumalanga Provincial Hospital",
    category: "Commercial",
    location: "Nelspruit, Mpumalanga",
    value: "R1.2 Billion",
    year: "2023",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    description: "State-of-the-art 400-bed provincial hospital with advanced medical facilities and emergency services."
  },
  {
    title: "Nelspruit Industrial Park",
    category: "Industrial",
    location: "Nelspruit, Mpumalanga",
    value: "R450 Million",
    year: "2022",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    description: "Modern industrial complex with 25 factory units and comprehensive logistics facilities."
  },
  {
    title: "White River Country Lodge",
    category: "Residential",
    location: "White River, Mpumalanga",
    value: "R180 Million",
    year: "2022",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    description: "Exclusive 45-room boutique hotel and conference facility in the scenic Lowveld region."
  },
  {
    title: "Matsamo Border Post Upgrade",
    category: "Infrastructure",
    location: "Matsamo, Mpumalanga",
    value: "R680 Million",
    year: "2021",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    description: "Major upgrade of the Matsamo/Swaziland border post including new customs facilities and cargo inspection areas."
  },
];

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Projects");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPortfolio(data);
          } else {
            setPortfolio(defaultProjects);
          }
        } else {
          setPortfolio(defaultProjects);
        }
      } catch (err) {
        setPortfolio(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredProjects = activeCategory === "All Projects" 
    ? portfolio 
    : portfolio.filter((p: any) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const featuredProjects = filteredProjects.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-sm text-gold font-medium">Our Portfolio</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Featured <span className="gradient-gold-text">Projects</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400">
              Explore our diverse portfolio of successfully delivered projects across 
              commercial, residential, industrial, and infrastructure sectors.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Award className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Featured Work</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Our Most <span className="gradient-gold-text">Notable Projects</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project: any, i: number) => (
              <motion.div
                key={project._id || project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-premium bg-card p-0 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"}
                    alt={project.title || project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold/90 text-black text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title || project.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location || "Mpumalanga"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year || new Date().getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{project.description || ""}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                    <span className="text-gold font-bold text-lg">{project.value || project.projectValue || "Contact for Quote"}</span>
                    <button className="text-gold font-medium hover:underline inline-flex items-center">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & All Projects */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[200px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              All <span className="gradient-gold-text">Projects</span>
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat.name
                    ? "bg-gold text-black"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any, i: number) => (
              <motion.div
                key={project._id || project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group card-premium bg-white/5 border-white/10 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"}
                    alt={project.title || project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold/90 text-black text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title || project.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location || "Mpumalanga"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.year || new Date().getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                    <span className="text-gold font-bold">{project.value || project.projectValue || "Contact for Quote"}</span>
                    <button className="text-white/70 hover:text-gold transition-colors text-sm font-medium inline-flex items-center">
                      Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
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
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Start Your Next <span className="gradient-gold-text">Project</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to bring your vision to life? Contact us to discuss your project 
              and discover how we can help you achieve your goals.
            </p>
            <a href="/#contact">
              <button className="btn-gold text-lg px-8 py-4">
                Get a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
