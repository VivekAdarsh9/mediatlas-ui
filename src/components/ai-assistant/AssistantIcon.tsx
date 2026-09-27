import {
  Stethoscope,
  Pill,
  FlaskConical,
  BookOpen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  pill: Pill,
  flask: FlaskConical,
  book: BookOpen,
};

interface AssistantIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function AssistantIcon({
  name,
  className,
  size = 24,
}: AssistantIconProps) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} size={size} />;
}
