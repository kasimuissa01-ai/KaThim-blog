import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Search } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { trpc } from "@/lib/trpc";
import { Spinner } from "@/components/ui/spinner";

export default function TrendAnalyzer() {
  const { data: trends, isLoading } = trpc.trends.getTrending.useQuery({
    limit: 10,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trend Analyzer</h1>
        <p className="text-muted-foreground mt-2">
          Discover trending topics across all platforms and get insights to fuel your content strategy.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input placeholder="Search trends..." className="h-10" />
        </div>
        <Button variant="outline" size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : trends?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No trends found. Try a different search.</p>
            </CardContent>
          </Card>
        ) : (
          trends?.map((trend) => (
            <Card key={trend.id} className="hover:bg-card/80 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{trend.keyword}</CardTitle>
                      <PlatformBadge platform={trend.platform as any} />
                    </div>
                    <CardDescription>{trend.category}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">+{trend.growthRate}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{trend.volume.toLocaleString()} searches</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Related Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {trend.relatedKeywords?.map((keyword: string) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Use for Content</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
