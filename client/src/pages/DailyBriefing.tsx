import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Clock, TrendingUp, Lightbulb } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc";

export default function DailyBriefing() {
  const { data: briefing, isLoading, refetch } = trpc.briefing.getDaily.useQuery();
  const generateBriefing = trpc.briefing.generate.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Strategy Briefing</h1>
        <p className="text-muted-foreground mt-2">
          AI-generated insights and recommendations for today's content strategy.
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => generateBriefing.mutate()}
          disabled={generateBriefing.isPending}
        >
          {generateBriefing.isPending ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Briefing
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : briefing ? (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="times">Posting Times</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recommended Topics
                </CardTitle>
                <CardDescription>Topics with highest engagement potential today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {briefing.recommendedTopics?.map((topic: any, idx: number) => (
                  <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div>
                      <p className="font-semibold">{topic.topic}</p>
                      <p className="text-xs text-muted-foreground capitalize">Relevance: {topic.relevance}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        topic.relevance === "high"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : topic.relevance === "medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                      }
                    >
                      {topic.relevance}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="times" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Best Posting Times
                </CardTitle>
                <CardDescription>Optimal times for maximum engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {briefing.postingTimes &&
                  Object.entries(briefing.postingTimes).map(([platform, time]: [string, any]) => (
                    <div key={platform} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <PlatformBadge platform={platform as any} />
                        <div>
                          <p className="font-semibold">{platform}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-lg">{time}</p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Content Suggestions
                </CardTitle>
                <CardDescription>Recommended content types and formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {briefing.contentSuggestions?.map((suggestion: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{suggestion.type}</p>
                        <p className="text-sm text-muted-foreground">For {suggestion.platform}</p>
                      </div>
                      <PlatformBadge platform={suggestion.platform} />
                    </div>
                    <p className="text-sm text-muted-foreground">Topic: {suggestion.topic}</p>
                    <Button className="w-full mt-3" size="sm">
                      Create Content
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : null}
    </div>
  );
}
