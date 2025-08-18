"use client";

import React, { useState, useEffect } from 'react';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { value: "all", label: "All" },
    { value: "technology", label: "Technology" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
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

  const filteredPosts = activeTab === "all"
    ? posts
    : posts.filter((item: any) => item.category === activeTab);

  const postItemsForHoverEffect = filteredPosts.map((item: any) => ({
    title: item.name, // Assuming 'name' is the title of the post
    description: item.description,
    link: "#", // Placeholder link, update if you have actual links
    image: item.image || "/image/teamlanding.png",
  }));

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-12">All Blog Posts</h1>
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <HoverEffect items={postItemsForHoverEffect} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}