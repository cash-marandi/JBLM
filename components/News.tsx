"use client"

import React, { useState, useEffect } from 'react'
import Header from './reusable-components/Header'
import { motion } from "motion/react"
import { Card } from './ui/card-hover-effect'
import { CardContent, CardHeader } from './ui/card'
import { ArrowRight, Calendar } from 'lucide-react' 
import Image from 'next/image'
import Link from 'next/link'

export default function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                if (!res.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id="news" className="py-20 px-4 sm:px-6 lg-8">
            <Header title="Latest News" />
            <div className='max-w-7xlnmx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-16'
                >
                    <h2 className='text-3xl md: text-4xl font-serif font-bold text-foreground mb-4'>
                        Features News
                    </h2>
                    <p>
                        Get the latest updates from the interesting world of Quantity Survey,
                        we are the best, this text will change
                    </p>
                </motion.div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                    {posts.map((post: any, index) => (
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
        </section>
    )
}