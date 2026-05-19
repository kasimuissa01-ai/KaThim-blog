import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trash2, Edit } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { StatusBadge } from "@/components/StatusBadge";

export default function ContentLibrary() {
  const mockContent = [
    {
      id: 1,
      title: "5 Morning Habits That Change Your Life",
      platform: "Instagram",
      status: "published" as const,
      date: "May 10, 2025",
      tags: ["productivity", "lifestyle"],
    },
    {
      id: 2,
      title: "Quick AI Tips for Content Creators",
      platform: "TikTok",
      status: "scheduled" as const,
      date: "May 20, 2025",
      tags: ["AI", "content-creation"],
    },
    {
      id: 3,
      title: "The Future of Social Media Marketing",
      platform: "LinkedIn",
      status: "draft" as const,
      date: "Draft",
      tags: ["marketing", "strategy"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
        <p className="text-muted-foreground mt-2">
          Manage all your saved content, drafts, and published posts.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input placeholder="Search content..." className="h-10" />
        </div>
        <Button variant="outline" size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Content</CardTitle>
          <CardDescription>All your created content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {mockContent.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <PlatformBadge platform={item.platform as any} />
                      <StatusBadge status={item.status} />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    <div className="flex gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="draft" className="mt-4">
              <p className="text-muted-foreground text-center py-8">No draft content</p>
            </TabsContent>

            <TabsContent value="scheduled" className="mt-4">
              <p className="text-muted-foreground text-center py-8">No scheduled content</p>
            </TabsContent>

            <TabsContent value="published" className="mt-4">
              <p className="text-muted-foreground text-center py-8">No published content</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
