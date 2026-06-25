import {
  Droplets,
  Clock,
  Eye,
  Zap,
  Heart,
  Brain,
  Pill,
  Activity,
  Thermometer,
  Wind,
  Bone,
  Ear,
  Hand,
  Footprints,
  ShieldAlert,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  clock: Clock,
  eye: Eye,
  zap: Zap,
  heart: Heart,
  brain: Brain,
  pill: Pill,
  activity: Activity,
  thermometer: Thermometer,
  wind: Wind,
  bone: Bone,
  ear: Ear,
  hand: Hand,
  footprints: Footprints,
  "shield-alert": ShieldAlert,
  stethoscope: Stethoscope,
};

interface DiseaseIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DiseaseIcon({
  name,
  className,
  size = 24,
}: DiseaseIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return <Stethoscope className={className} size={size} />;
  return <Icon className={className} size={size} />;
}
