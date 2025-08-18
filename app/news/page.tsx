"use client";

import React, { useState, useEffect } from 'react';

import { motion } from "framer-motion"; // Changed from "motion/react" to "framer-motion" for common usage
import { Card } from '@/components/ui/card-hover-effect'; // Reusing Card from portfolio
import { CardContent, CardHeader } from '@/components/ui/card'; // Reusing Card from portfolio
import { ArrowRight, Badge, Calendar } from 'lucide-react';
import Image from 'next/image';
import NewsPost from '@/components/newsPost';
import Link from 'next/link';
import HeroSection from "@/components/reusable-components/HeroSection";

const newsHeroTitle = "From AI integration to sustainability, the quantity surveying profession is rapidly evolving to meet modern construction demands.";

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  

  return (
    <div className="min-h-screen p-8 my-20">
      <HeroSection title={newsHeroTitle} />
      <div className="max-w-7xl mx-auto">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {posts.map((post: any, index: number) => (
            <motion.div key={post._id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Link href={`/news/${post._id}`}> {/* Added Link component */}
                <Card className='ground cursor-pointer overflow-hidden hover:shadow-xl p-0
                transition-all duration-300 border-0 bg-card/50 backdrop-blur-xs py-0'>
                  <CardHeader className='p-0'>
                    <div className='relative h-48 w-full'>
                      <Image
                        src={post.image || "/image/teamlanding.png"}
                        alt={post.title || "News Image"}
                        fill
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105 rounded-lg mb-4"
                      />
                      <div className='absolute top-4 left-4'>
                        <Badge
                          // @ts-ignore
                          fontVariant='secondary'
                          className='bg-background/80 backdrop-blur-xs'
                        >
                          {post.category || "News"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <div className='flex items-center text-sm text-muted-foreground mb-3'>
                      <Calendar className='h-4 w-4 mr-2' />
                      {new Date(post.date || Date.now()).toLocaleDateString()}
                    </div>
                    <h3 className='text-xl font-serif font-bold text-foreground mb-3
                    ground-hover:text-prinary transition-colors duration-300'>
                      {post.title || "No Title"}
                    </h3>
                    <p className='text-muted-foreground md-4 line-clamp-3'>
                      {post.post || "No content available."}
                    </p>
                    <div className='flex items-center text-primary font-medium ground-hover:underline'>
                      Read more{" "}
                      <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1' />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
