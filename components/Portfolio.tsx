"use client"

import React, { useState, useEffect } from 'react';
import Header from './reusable-components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import { HoverEffect } from "./ui/card-hover-effect";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(6); // State for "Read More"

  const handleReadMore = () => {
    setDisplayCount(portfolio.length);
  };

  const handleShowLess = () => {
    setDisplayCount(6);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const data = await res.json();
        setPortfolio(data);
        const uniqueCategories = Array.from(new Set(data.map((item: any) => item.category)));
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="portfolio" className="min-h-screen items-center justify-center">
        <Header title='Our Portfolio'/>
        <div className='p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
            <Tabs defaultValue="All" className="w-full">
                <TabsList className="mx-auto justify-center">
                    {categories.map(category => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            onClick={() => {
                                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categories.map(category => {
                    const filteredPortfolio = portfolio.filter(item => category === "All" || item.category === category);
                    const itemsToDisplay = filteredPortfolio.slice(0, displayCount).map((item: any) => ({
                        title: item.name,
                        description: item.description,
                        link: "/portfolio", // Link to the new collective portfolio page
                        image: item.image || "/image/teamlanding.png",
                    }));

                    return (
                        <TabsContent key={category} value={category}>
                            <HoverEffect items={itemsToDisplay} />
                            {filteredPortfolio.length > 6 && displayCount < filteredPortfolio.length && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={handleReadMore}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Read More
                                    </button>
                                </div>
                            )}
                            {displayCount === filteredPortfolio.length && filteredPortfolio.length > 6 && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={handleShowLess}
                                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Show Less
                                    </button>
                                </div>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    </section>
  )
}
