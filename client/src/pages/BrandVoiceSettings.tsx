import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";

export default function BrandVoiceSettings() {
  const [niche, setNiche] = useState("Tech Startups");
  const [audience, setAudience] = useState("Young entrepreneurs and tech enthusiasts");
  const [tone, setTone] = useState("professional");
  const [pillars, setPillars] = useState(["Innovation", "Growth", "Community"]);

  const [platforms, setPlatforms] = useState({
    Instagram: true,
    TikTok: true,
    X: true,
    LinkedIn: true,
  });

  const handleSave = () => {
    toast.success("Brand voice settings saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Voice & Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your brand identity and content strategy preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brand Voice Configuration */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Brand Voice</CardTitle>
            <CardDescription>Define your brand identity and messaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="niche">Niche / Industry</Label>
              <Input
                id="niche"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., Tech Startups, Fashion, Fitness..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Textarea
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Describe your ideal audience..."
                className="min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone of Voice</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Content Pillars</Label>
              <div className="space-y-2">
                {pillars.map((pillar, idx) => (
                  <Input
                    key={idx}
                    value={pillar}
                    onChange={(e) => {
                      const newPillars = [...pillars];
                      newPillars[idx] = e.target.value;
                      setPillars(newPillars);
                    }}
                    placeholder={`Content pillar ${idx + 1}`}
                  />
                ))}
              </div>
              <Button variant="outline" className="w-full" onClick={() => setPillars([...pillars, ""])}>
                Add Pillar
              </Button>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Brand Voice
            </Button>
          </CardContent>
        </Card>

        {/* Connected Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Platforms</CardTitle>
            <CardDescription>Choose where to publish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(platforms).map(([platform, isActive]) => (
              <div key={platform} className="flex items-center justify-between">
                <Label htmlFor={platform} className="cursor-pointer">
                  {platform}
                </Label>
                <Switch
                  id={platform}
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, [platform]: checked })
                  }
                />
              </div>
            ))}

            <div className="pt-4 border-t border-border space-y-3">
              <div className="space-y-2">
                <Label htmlFor="instagram-username" className="text-sm">
                  Instagram Username
                </Label>
                <Input id="instagram-username" placeholder="@username" disabled={!platforms.Instagram} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok-username" className="text-sm">
                  TikTok Username
                </Label>
                <Input id="tiktok-username" placeholder="@username" disabled={!platforms.TikTok} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="x-username" className="text-sm">
                  X Username
                </Label>
                <Input id="x-username" placeholder="@username" disabled={!platforms.X} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-username" className="text-sm">
                  LinkedIn Profile
                </Label>
                <Input id="linkedin-username" placeholder="Profile URL" disabled={!platforms.LinkedIn} />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Platforms
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
