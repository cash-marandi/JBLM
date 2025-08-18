
 
"use client";

import React, { useState, useEffect } from 'react';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import HeroSection from "@/components/reusable-components/HeroSection";

const portfolioHeroTitle = "Expertly managing construction costs to deliver your project with financial precision and maximum value.";

export default function PostsPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dynamicTabs, setDynamicTabs] = useState([{ value: "all", label: "All" }]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const data = await res.json();
        setPortfolio(data);

        const uniqueCategories = new Set<string>();
        data.forEach((item: any) => {
          if (item.category) {
            uniqueCategories.add(item.category);
          }
        });

        const generatedTabs = [
          { value: "all", label: "All" },
          ...Array.from(uniqueCategories).map(category => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
          }))
        ];
        setDynamicTabs(generatedTabs);
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  const filteredPortfolio = activeTab === "all"
    ? portfolio
    : portfolio.filter((item: any) => item.category === activeTab);

  const portfolioItemsForHoverEffect = filteredPortfolio.map((item: any) => ({
    title: item.name,
    description: item.description,
    link: "#", // Placeholder link, update if you have actual links
    image: item.image || "/image/teamlanding.png",
  }));

  return (
    <div className="min-h-screen p-8 my-20">
      <HeroSection title={portfolioHeroTitle} />
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            {dynamicTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {dynamicTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <HoverEffect items={portfolioItemsForHoverEffect} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}