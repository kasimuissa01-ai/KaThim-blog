import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Calendar, BookOpen } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  const mockTrends = [
    { keyword: "#AI", platform: "General", growth: 128 },
    { keyword: "#TechStartup", platform: "LinkedIn", growth: 85 },
    { keyword: "#SocialGrowth", platform: "Instagram", growth: 64 },
  ];

  const mockScheduled = [
    {
      id: 1,
      date: "Today, 9:00 AM",
      platform: "Instagram",
      content: "5 Morning Habits That Change Your Life",
      status: "scheduled" as const,
    },
    {
      id: 2,
      date: "Tomorrow, 7:00 PM",
      platform: "TikTok",
      content: "Quick AI Tips for Content Creators",
      status: "scheduled" as const,
    },
    {
      id: 3,
      date: "May 20, 10:00 AM",
      platform: "LinkedIn",
      content: "The Future of Social Media Marketing",
      status: "draft" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your social media strategy at a glance.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => navigate("/generator")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Generate Scripts</h3>
                <p className="text-sm text-muted-foreground">Create engaging content instantly</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => navigate("/trends")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Analyze Trends</h3>
                <p className="text-sm text-muted-foreground">Discover trending topics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Now
            </CardTitle>
            <CardDescription>Top trending topics across platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTrends.map((trend, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold">{trend.keyword}</p>
                    <p className="text-xs text-muted-foreground">{trend.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    +{trend.growth}%
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/trends")}>
              View All Trends
            </Button>
          </CardContent>
        </Card>

        {/* Daily Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Content Scheduled</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Drafts</p>
              <p className="text-3xl font-bold">2</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-3xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Calendar Snapshot */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Content
              </CardTitle>
              <CardDescription>Next scheduled posts</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/calendar")}>
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockScheduled.map((item) => (
              <div key={item.id} className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <PlatformBadge platform={item.platform as any} />
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="font-medium">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Briefing CTA */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Daily Strategy Briefing
              </CardTitle>
              <CardDescription>AI-generated insights for today</CardDescription>
            </div>
            <Button onClick={() => navigate("/briefing")}>View Briefing</Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
