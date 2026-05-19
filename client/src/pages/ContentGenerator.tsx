import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import { Copy, RefreshCw, Save } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { toast } from "sonner";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function ContentGenerator() {
  const [selectedTrend, setSelectedTrend] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"Instagram" | "TikTok" | "X" | "LinkedIn">("Instagram");
  const [contentType, setContentType] = useState("post");

  const generatePost = trpc.content.generatePost.useMutation();
  const generateScript = trpc.content.generateScript.useMutation();
  const generateCaption = trpc.content.generateCaption.useMutation();
  const generateHashtags = trpc.content.generateHashtags.useMutation();

  const handleGeneratePost = async () => {
    if (!selectedTrend) {
      toast.error("Please enter a trend topic");
      return;
    }
    await generatePost.mutateAsync({
      trend: selectedTrend,
      platform: selectedPlatform,
    });
  };

  const handleGenerateScript = async () => {
    if (!selectedTrend) {
      toast.error("Please enter a trend topic");
      return;
    }
    await generateScript.mutateAsync({
      trend: selectedTrend,
      platform: selectedPlatform,
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Generator</h1>
        <p className="text-muted-foreground mt-2">
          Generate platform-specific content powered by AI. Choose a trend and let the magic happen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Set up your content generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trend">Trend Topic</Label>
              <Input
                id="trend"
                placeholder="e.g., AI trends, social growth..."
                value={selectedTrend}
                onChange={(e) => setSelectedTrend(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={selectedPlatform} onValueChange={(value: any) => setSelectedPlatform(value)}>
                <SelectTrigger id="platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="X">X</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="script">Script (Hook/Body/CTA)</SelectItem>
                  <SelectItem value="caption">Caption</SelectItem>
                  <SelectItem value="hashtags">Hashtags</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleGeneratePost}
              disabled={generatePost.isPending || !selectedTrend}
            >
              {generatePost.isPending ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Generating...
                </>
              ) : (
                "Generate Content"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content Display */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>AI-powered content ready to use</CardDescription>
          </CardHeader>
          <CardContent>
            {generatePost.isPending ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : generatePost.data ? (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="space-y-4 mt-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <PlatformBadge platform={selectedPlatform} />
                    </div>
                    <p className="text-sm leading-relaxed">{generatePost.data.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCopy(generatePost.data.content)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => generatePost.mutate({ trend: selectedTrend, platform: selectedPlatform })}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-4">
                  <p className="text-muted-foreground text-sm mb-4">Edit content before saving</p>
                  {/* Edit form would go here */}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Generate content to see it here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
