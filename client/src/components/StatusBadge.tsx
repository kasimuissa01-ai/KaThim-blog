import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "draft" | "scheduled" | "published";
}

const statusConfig = {
  draft: {
    icon: FileText,
    color: "bg-slate-600/20 text-slate-300 border-slate-600/30",
    label: "Draft",
  },
  scheduled: {
    icon: Clock,
    color: "bg-amber-600/20 text-amber-300 border-amber-600/30",
    label: "Scheduled",
  },
  published: {
    icon: CheckCircle,
    color: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
    label: "Published",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1 ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
