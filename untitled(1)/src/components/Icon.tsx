import {
  MonitorSmartphone,
  GraduationCap,
  Calculator,
  FileSpreadsheet,
  Code2,
  Binary,
  Palette,
  BadgeCheck,
  Keyboard,
  Users,
  Briefcase,
  IndianRupee,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  MonitorSmartphone,
  GraduationCap,
  Calculator,
  FileSpreadsheet,
  Code2,
  Binary,
  Palette,
  BadgeCheck,
  Keyboard,
  Users,
  Briefcase,
  IndianRupee,
  Wrench,
};

export default function Icon({
  name,
  className,
  size,
  strokeWidth,
}: {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name] ?? MonitorSmartphone;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />;
}
