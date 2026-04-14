"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar, Search, ArrowRight, ChevronRight, 
  FileText, Clock, User, Tag, Facebook, Twitter, Linkedin, Loader2
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const defaultCategories = [
  { name: "All Posts", count: 12 },
  { name: "Industry News", count: 5 },
  { name: "Company News", count: 4 },
  { name: "Regulations", count: 2 },
  { name: "Market Trends", count: 1 },
];

const defaultPosts = [
  {
    _id: "1",
    title: "2026 Construction Cost Index Report Released",
    excerpt: "Our annual analysis of construction costs across South Africa reveals significant trends in material pricing and labor costs...",
    category: "Industry News",
    author: "James van der Berg",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    featured: true,
    post: "The 2026 Construction Cost Index report provides a comprehensive analysis of construction costs across South Africa..."
  },
  {
    _id: "2",
    title: "JBLM QS Completes R850M Mbombela Plaza Project",
    excerpt: "We are proud to announce the successful completion of the Mbombela Plaza Shopping Centre, one of the largest retail developments in Mpumalanga...",
    category: "Company News",
    author: "Lerato Mkhize",
    date: "March 28, 2026",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
    featured: false,
    post: "JBLM Quantity Surveyors is pleased to announce the successful completion of the Mbombela Plaza Shopping Centre..."
  },
  {
    _id: "3",
    title: "New Building Regulations: What Property Developers Need to Know",
    excerpt: "The Department of Public Works has introduced updated regulations affecting construction projects. Here's what you need to know...",
    category: "Regulations",
    author: "Anna Smith",
    date: "March 15, 2026",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop",
    featured: false,
    post: "Recent changes to building regulations will impact how developers approach new construction projects..."
  },
  {
    _id: "4",
    title: "Sustainable Construction Practices in 2026",
    excerpt: "Green building standards continue to evolve. Learn about the latest sustainability requirements and how they affect project costs...",
    category: "Market Trends",
    author: "Mlungisi Khoza",
    date: "March 1, 2026",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop",
    featured: false,
    post: "Sustainability is no longer optional in construction. Here's what's driving green building practices..."
  },
];

export default function NewsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPosts(data);
            const uniqueCategories = new Set(data.map((p: any) => p.category || "General"));
            const generatedCategories: { name: string; count: number }[] = [
              { name: "All Posts", count: data.length },
              ...Array.from(uniqueCategories).map(cat => ({
                name: String(cat),
                count: data.filter((p: any) => p.category === cat).length
              }))
            ];
            setCategories(generatedCategories);
          } else {
            setPosts(defaultPosts);
          }
        } else {
          setPosts(defaultPosts);
        }
      } catch (err) {
        setPosts(defaultPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const featuredPost = posts.find(p => p.featured) || posts[0];
  
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
    const matchesSearch = (post.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recentPosts = posts.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-gray-400">Loading news...</p>
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
              <FileText className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Latest News</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Industry <span className="gradient-gold-text">Insights</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400">
              Stay updated with the latest trends, regulations, and insights in the 
              quantity surveying and construction industry.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8">
                <span className="text-sm text-gold font-medium">Featured Article</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={featuredPost.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"}
                    alt={featuredPost.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold/90 text-black text-xs font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {featuredPost.excerpt || featuredPost.post}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author || "JBLM Team"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date ? new Date(featuredPost.date).toLocaleDateString() : "Recent"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      5 min read
                    </span>
                  </div>
                  <Link href={`/news/${featuredPost._id}`}>
                    <button className="btn-gold px-6 py-3">
                      Read Full Article
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Articles Grid */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl bg-card border border-gold/20 text-foreground placeholder:text-gray-500 focus:outline-none focus:border-gold/50 w-64"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.name
                        ? "bg-gold text-black"
                        : "bg-card border border-gold/20 text-foreground hover:border-gold/50"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.filter(p => p._id !== featuredPost?._id).map((post: any, i: number) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card-premium bg-card p-0 overflow-hidden group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-gold text-black text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date ? new Date(post.date).toLocaleDateString() : "Recent"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          5 min read
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt || post.post}
                      </p>
                      <Link href={`/news/${post._id}`} className="text-gold font-medium hover:underline inline-flex items-center text-sm">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Posts */}
              <div className="card-premium bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.slice(0, 4).map((post: any) => (
                    <Link key={post._id} href={`/news/${post._id}`} className="flex gap-4 group cursor-pointer">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop"}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.date ? new Date(post.date).toLocaleDateString() : "Recent"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="card-premium bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() => setActiveCategory(cat.name)}
                        className={`flex items-center justify-between w-full text-left transition-colors ${
                          activeCategory === cat.name ? "text-gold" : "text-muted-foreground hover:text-gold"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          {cat.name}
                        </span>
                        <span className="text-sm opacity-70">({cat.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="card-premium bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Stay Updated</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Subscribe to our newsletter for the latest industry insights and news.
                </p>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-gold/20 text-foreground placeholder:text-gray-500 focus:outline-none focus:border-gold/50 mb-3"
                />
                <button className="w-full btn-gold py-3">
                  Subscribe
                </button>
              </div>

              {/* Social Links */}
              <div className="card-premium bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gold" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
              Need Expert Advice?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contact our team for professional quantity surveying services 
              tailored to your project needs.
            </p>
            <Link href="/#contact">
              <button className="btn-gold text-lg px-8 py-4">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
