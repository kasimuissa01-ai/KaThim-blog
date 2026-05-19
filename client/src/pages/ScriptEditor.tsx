import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Save } from "lucide-react";
import { PlatformBadge } from "@/components/PlatformBadge";
import { toast } from "sonner";
import { useState } from "react";

export default function ScriptEditor() {
  const [hook, setHook] = useState("Struggling to be more productive and happy? These 5 morning habits can change everything.");
  const [body, setBody] = useState(
    "1. Drink a glass of water – Rehydrate your body and boost your energy.\n2. Move your body – Just 5 minutes of movement wakes up your mind.\n3. Plan your day – Know your priorities, stay focused.\n4. Avoid your phone – Protect your time and attention.\n5. Practice gratitude – A positive mind creates a better day."
  );
  const [cta, setCta] = useState("Start tomorrow morning. Try these 5 habits and let me know which one made the biggest difference!");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleCopyAll = () => {
    const fullScript = `HOOK:\n${hook}\n\nBODY:\n${body}\n\nCTA:\n${cta}`;
    navigator.clipboard.writeText(fullScript);
    toast.success("Full script copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Script Editor</h1>
        <p className="text-muted-foreground mt-2">
          Edit and refine your video scripts. Structure: Hook / Body / CTA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Video Script</CardTitle>
            <CardDescription>Edit each section of your script</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hook Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Hook (0-3 seconds)</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(hook)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                className="min-h-20"
                placeholder="Enter your hook..."
              />
            </div>

            {/* Body Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Body (3-25 seconds)</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(body)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-32"
                placeholder="Enter your main content..."
              />
            </div>

            {/* CTA Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Call to Action (25-30 seconds)</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(cta)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="min-h-20"
                placeholder="Enter your CTA..."
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button className="flex-1" onClick={handleCopyAll}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
              <Button className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Script
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How it looks on platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <PlatformBadge platform="TikTok" />
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">HOOK (0-3s)</p>
                <p className="font-semibold text-sm">{hook}</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">BODY (3-25s)</p>
                <p className="text-sm whitespace-pre-wrap">{body}</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">CTA (25-30s)</p>
                <p className="font-semibold text-sm">{cta}</p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Total Duration: ~30 seconds</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
