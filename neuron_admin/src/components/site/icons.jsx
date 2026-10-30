import { useId } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  ChartPie,
  CircleHelp,
  Compass,
  FileCheck,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  House,
  Info,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  PenLine,
  Phone,
  Plane,
  Play,
  Scale,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";

export const NAV_ICONS = {
  Compass,
  Building2,
  Handshake,
  Users,
  Workflow,
  TrendingUp,
  Landmark,
  Globe,
  Plane,
  Briefcase,
  Newspaper,
  BookOpen,
  PenLine,
  Play,
  Mail,
  ShieldCheck,
  Scale,
  FileCheck,
  Phone,
  House,
  Info,
  Star,
  Award,
  Target,
  ChartPie,
  Wallet,
  Calculator,
  GraduationCap,
  Lightbulb,
  MapPin,
  Calendar,
  MessageCircle,
  CircleHelp,
  Heart,
};

export const SOCIAL_PLATFORMS = {
  facebook: { label: "Facebook", placeholder: "https://www.facebook.com/your-page" },
  x: { label: "X", placeholder: "https://x.com/your-handle" },
  youtube: { label: "YouTube", placeholder: "https://www.youtube.com/@your-channel" },
  linkedin: { label: "LinkedIn", placeholder: "https://www.linkedin.com/company/your-company" },
  instagram: { label: "Instagram", placeholder: "https://www.instagram.com/your-handle" },
  whatsapp: { label: "WhatsApp", placeholder: "https://wa.me/919999999999" },
  telegram: { label: "Telegram", placeholder: "https://t.me/your-channel" },
  email: { label: "Email", placeholder: "name@example.com" },
  website: { label: "Website", placeholder: "https://example.com" },
};

function Badge({ fill, className, children }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill={fill} />
      {children}
    </svg>
  );
}

function InstagramBadge({ className }) {
  const gradientId = `ig-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill={`url(#${gradientId})`} />
      <rect x="10.2" y="10.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.8" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="19.4" cy="12.6" r="0.75" fill="#FFFFFF" />
    </svg>
  );
}

export function SocialIcon({ platform, className = "h-7 w-7" }) {
  switch (platform) {
    case "facebook":
      return (
        <Badge fill="#1877F2" className={className}>
          <path d="M21.2 16.6l.6-3.9h-3.8v-2.5c0-1.1.3-1.8 1.9-1.8h2V5c-.7-.1-1.8-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.4v2.7h-3.4v3.9h3.4V27h4.8v-10.4h2.8z" fill="#FFFFFF" />
        </Badge>
      );
    case "x":
      return (
        <Badge fill="#000000" className={className}>
          <path d="M21.9 8h2.6l-5.7 6.5 6.7 8.9h-5.2l-4.1-5.4-4.7 5.4H9l6.1-7-6.4-8.4h5.4l3.7 4.9L21.9 8zm-.9 13.8h1.4L13.1 9.5h-1.6l9.5 12.3z" fill="#FFFFFF" />
        </Badge>
      );
    case "youtube":
      return (
        <Badge fill="#FF0000" className={className}>
          <path d="M24.4 12.4c-.2-.7-.7-1.3-1.4-1.5C21.8 10.5 16 10.5 16 10.5s-5.8 0-7 .4c-.7.2-1.2.8-1.4 1.5C7.2 13.6 7.2 16 7.2 16s0 2.4.4 3.6c.2.7.7 1.3 1.4 1.5 1.2.4 7 .4 7 .4s5.8 0 7-.4c.7-.2 1.2-.8 1.4-1.5.4-1.2.4-3.6.4-3.6s0-2.4-.4-3.6zm-10.2 6.1v-5l4.6 2.5-4.6 2.5z" fill="#FFFFFF" />
        </Badge>
      );
    case "linkedin":
      return (
        <Badge fill="#0A66C2" className={className}>
          <path d="M11.6 13.2h-3v9.6h3v-9.6zm-1.5-4.8c-1 0-1.7.7-1.7 1.7 0 .9.7 1.7 1.7 1.7 1 0 1.7-.7 1.7-1.7 0-1-.7-1.7-1.7-1.7zm13.3 8.3c0-2.8-1.5-4.1-3.5-4.1-1.6 0-2.3.9-2.7 1.5v-1.3h-3c.1.9 0 9.6 0 9.6h3v-5.4c0-.3 0-.6.1-.8.2-.6.8-1.3 1.7-1.3 1.2 0 1.7.9 1.7 2.3v5.2h3v-5.7z" fill="#FFFFFF" />
        </Badge>
      );
    case "instagram":
      return <InstagramBadge className={className} />;
    case "whatsapp":
      return (
        <Badge fill="#25D366" className={className}>
          <path d="M16 7.5a8.5 8.5 0 0 0-7.3 12.8L7.5 24.5l4.3-1.1A8.5 8.5 0 1 0 16 7.5z" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M13.2 12.1c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.9 1.3 1.7 2.2 2.2.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .5-.2 1.3-.9 1.7-.7.4-1.8.5-3.6-.4-1.6-.8-3-2.4-3.6-3.6-.6-1.2-.4-2.3.5-3.7z" fill="#FFFFFF" />
        </Badge>
      );
    case "telegram":
      return (
        <Badge fill="#229ED9" className={className}>
          <path d="M8.4 15.6l13.7-5.3c.6-.2 1.2.2 1 1.1l-2.3 11c-.2.8-.7 1-1.3.6l-3.6-2.7-1.8 1.7c-.2.2-.4.4-.8.4l.3-3.7 6.7-6c.3-.3-.1-.4-.4-.2l-8.3 5.2-3.6-1.1c-.8-.2-.8-.8.2-1.1z" fill="#FFFFFF" />
        </Badge>
      );
    case "email":
      return (
        <Badge fill="#21649A" className={className}>
          <rect x="9" y="11" width="14" height="10" rx="1.6" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M9.6 11.9L16 16.8l6.4-4.9" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </Badge>
      );
    default:
      return (
        <Badge fill="#15344F" className={className}>
          <circle cx="16" cy="16" r="7" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <ellipse cx="16" cy="16" rx="3" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M9 16h14" stroke="#FFFFFF" strokeWidth="1.5" />
        </Badge>
      );
  }
}
