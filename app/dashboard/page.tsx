"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewsForm from "@/components/dashboard/NewsForm";
import TeamForm from "@/components/dashboard/TeamForm";
import PortfolioForm from "@/components/dashboard/PortfolioForm";
import Posts from "@/components/dashboard/Posts";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Dashboard() {
  const [news, setNews] = useState([]);
  const [team, setTeam] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [activeTab, setActiveTab] = useState<"news" | "team" | "portfolio">("news");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, teamRes, portfolioRes] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/team"),
          fetch("/api/portfolio"),
        ]);
        const newsData = await newsRes.json();
        const teamData = await teamRes.json();
        const portfolioData = await portfolioRes.json();
        setNews(newsData);
        setTeam(teamData);
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getPostsForTab = () => {
    switch (activeTab) {
      case "news":
        return news.map((item: any) => ({
          _id: item._id,
          title: item.title,
          content: item.post,
          imageUrl: item.image,
        }));
      case "team":
        return team.map((item: any) => ({
          _id: item._id,
          title: item.name,
          content: item.qualification,
          imageUrl: item.image,
        }));
      case "portfolio":
        return portfolio.map((item: any) => ({
          _id: item._id,
          title: item.name,
          content: item.description,
          imageUrl: item.image,
        }));
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <Tabs defaultValue="news" className="w-full" onValueChange={(value) => setActiveTab(value as "news" | "team" | "portfolio")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>
          <TabsContent value="news">
            <NewsForm />
          </TabsContent>
          <TabsContent value="team">
            <TeamForm />
          </TabsContent>
          <TabsContent value="portfolio">
            <PortfolioForm />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Current {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <Posts posts={getPostsForTab()} resource={activeTab} />
        </div>
      </div>
    </div>
  );
}