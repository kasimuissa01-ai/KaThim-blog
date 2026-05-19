import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { StatusBadge } from "@/components/StatusBadge";

export default function ContentCalendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
        <p className="text-muted-foreground mt-2">
          Plan, schedule, and manage your content across all platforms.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>May 2025</CardTitle>
              <CardDescription>Drag and drop to reschedule content</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="month" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>

            <TabsContent value="month" className="mt-6">
              <div className="space-y-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {days.map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((date) => (
                    <div
                      key={date}
                      className="aspect-square p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <p className="text-xs font-semibold mb-1">{date}</p>
                      {date === 15 && (
                        <div className="space-y-1">
                          <div className="text-xs bg-pink-500/20 text-pink-400 px-1 py-0.5 rounded truncate">
                            Instagram
                          </div>
                          <div className="text-xs bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded truncate">
                            LinkedIn
                          </div>
                        </div>
                      )}
                      {date === 18 && (
                        <div className="text-xs bg-slate-500/20 text-slate-400 px-1 py-0.5 rounded truncate">
                          TikTok
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="week" className="mt-6">
              <p className="text-muted-foreground text-center py-12">Week view coming soon</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Scheduled Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Content</CardTitle>
          <CardDescription>All your upcoming posts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <PlatformBadge platform={item === 1 ? "Instagram" : item === 2 ? "TikTok" : "LinkedIn"} />
                  <StatusBadge status="scheduled" />
                </div>
                <p className="font-medium">Sample content post {item}</p>
                <p className="text-xs text-muted-foreground mt-1">May {15 + item}, 9:00 AM</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
