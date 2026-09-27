import {
  Pill,
  Heart,
  Brain,
  Droplets,
  Wind,
  Activity,
  Eye,
  ShieldAlert,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  pill: Pill,
  heart: Heart,
  brain: Brain,
  droplets: Droplets,
  wind: Wind,
  activity: Activity,
  eye: Eye,
  "shield-alert": ShieldAlert,
  stethoscope: Stethoscope,
};

interface DrugIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DrugIcon({
  name,
  className,
  size = 24,
}: DrugIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return <Pill className={className} size={size} />;
  return <Icon className={className} size={size} />;
}
