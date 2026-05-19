import { Badge } from "@/components/ui/badge";
import { Instagram, Video, MessageCircle, Linkedin } from "lucide-react";

interface PlatformBadgeProps {
  platform: "Instagram" | "TikTok" | "X" | "LinkedIn";
  variant?: "default" | "outline" | "secondary";
}

const platformConfig = {
  Instagram: {
    icon: Instagram,
    color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    label: "Instagram",
  },
  TikTok: {
    icon: Video,
    color: "bg-black/30 text-white border-white/20",
    label: "TikTok",
  },
  X: {
    icon: MessageCircle,
    color: "bg-slate-600/20 text-slate-300 border-slate-600/30",
    label: "X",
  },
  LinkedIn: {
    icon: Linkedin,
    color: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    label: "LinkedIn",
  },
};

export function PlatformBadge({ platform, variant = "default" }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1 ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
