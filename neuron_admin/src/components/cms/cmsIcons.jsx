import {
  BadgeCheck,
  Banknote,
  Brain,
  ChartLine,
  CheckCircle2,
  CircleCheck,
  Clock,
  Coins,
  Eye,
  FileText,
  Gem,
  HandCoins,
  HeartHandshake,
  Leaf,
  Lock,
  Megaphone,
  Mic,
  PiggyBank,
  Quote,
  Rocket,
  Send,
  Sparkles,
  Trophy,
  UserCheck,
  Video,
  Link2,
  Hourglass,
  Flag,
  Hammer,
  ScrollText,
  Split,
  FolderOpen,
  MessageCircleQuestion,
  RefreshCw,
  CalendarCheck,
  PhoneCall,
  EyeOff,
  PieChart,
  LineChart,
  Receipt,
  Umbrella,
  ArrowLeftRight,
  Stethoscope,
  Laptop,
  Sprout,
  MessageSquareText,
  ListChecks,
  Percent,
  Gift,
  TriangleAlert,
  Layers,
  Route,
  Search,
  Download,
  CalendarClock,
  UserRound,
  Zap,
} from "lucide-react";
import { NAV_ICONS } from "../site/icons";

// Mirror of neuron_frontend/src/components/cms/cmsIcons.jsx so the picker shows the website's artwork.

function Svg({ className = "h-6 w-6", strokeWidth = "2", viewBox = "0 0 24 24", children }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const TaxPlanning = (props) => (
  <Svg {...props}>
    <rect x="4" y="2" width="16" height="20" rx="3" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
  </Svg>
);

const Compliances = (props) => (
  <Svg {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

const Documentation = (props) => (
  <Svg {...props}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    <path d="M9 13h6M9 16h4" />
  </Svg>
);

const FinancialDecisions = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </Svg>
);

const InvestmentManagement = (props) => (
  <Svg {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
    <line x1="2" y1="21" x2="22" y2="21" />
  </Svg>
);

const WealthManagement = (props) => (
  <Svg {...props}>
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3 8 9l4 12 4-12-3-6" />
    <line x1="2" y1="9" x2="22" y2="9" />
  </Svg>
);

const StatTeam = (props) => (
  <Svg viewBox="0 0 48 48" strokeWidth="2.4" {...props}>
    <circle cx="24" cy="16" r="5" />
    <path d="M16 32 C16 26 20 24 24 24 C28 24 32 26 32 32" />
    <circle cx="12" cy="20" r="4" />
    <path d="M6 34 C6 30 9 28 12 28" />
    <circle cx="36" cy="20" r="4" />
    <path d="M42 34 C42 30 39 28 36 28" />
  </Svg>
);

const StatExperience = (props) => (
  <Svg viewBox="0 0 48 48" strokeWidth="2.4" {...props}>
    <rect x="10" y="10" width="28" height="22" rx="3" />
    <circle cx="24" cy="21" r="5" />
    <path d="M20 32 L16 42 L24 37 L32 42 L28 32" />
  </Svg>
);

const StatEducation = (props) => (
  <Svg viewBox="0 0 48 48" strokeWidth="2.4" {...props}>
    <path d="M24 10 L6 19 L24 28 L42 19 Z" />
    <path d="M12 22 V32 C12 36 18 39 24 39 C30 39 36 36 36 32 V22" />
    <path d="M42 19 V31" />
  </Svg>
);

const StatPresentation = (props) => (
  <Svg viewBox="0 0 48 48" strokeWidth="2.4" {...props}>
    <rect x="8" y="10" width="32" height="22" rx="2" />
    <path d="M14 24 L20 18 L26 21 L32 16" />
    <path d="M24 32 V40 M16 42 L24 38 L32 42" />
  </Svg>
);

const Media = (props) => (
  <Svg strokeWidth="1.8" {...props}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </Svg>
);

const TvMedia = (props) => (
  <Svg strokeWidth="1.8" {...props}>
    <rect width="20" height="14" x="2" y="3" rx="2.5" />
    <polygon points="10 7.5 15 10 10 12.5 10 7.5" fill="currentColor" stroke="none" />
    <line x1="12" x2="12" y1="17" y2="21" />
    <line x1="8" x2="16" y1="21" y2="21" />
  </Svg>
);

const Books = (props) => (
  <Svg strokeWidth="1.8" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M6 8h2" />
    <path d="M16 8h2" />
  </Svg>
);

const Blogs = (props) => (
  <Svg strokeWidth="1.8" {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </Svg>
);

const YouTube = (props) => (
  <Svg strokeWidth="1.8" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
  </Svg>
);

const Connect = (props) => (
  <Svg strokeWidth="1.8" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
);

export const CMS_ICONS = {
  TaxPlanning,
  Compliances,
  Documentation,
  FinancialDecisions,
  InvestmentManagement,
  WealthManagement,
  StatTeam,
  StatExperience,
  StatEducation,
  StatPresentation,
  Media,
  TvMedia,
  Books,
  Blogs,
  YouTube,
  Connect,
  ...NAV_ICONS,
  CircleCheck,
  BadgeCheck,
  Clock,
  Gem,
  Leaf,
  Lock,
  PiggyBank,
  Rocket,
  Sparkles,
  Trophy,
  Banknote,
  Coins,
  ChartLine,
  HandCoins,
  FileText,
  Video,
  Link2,
  Hourglass,
  Flag,
  Hammer,
  ScrollText,
  Split,
  FolderOpen,
  MessageCircleQuestion,
  RefreshCw,
  CalendarCheck,
  PhoneCall,
  EyeOff,
  PieChart,
  LineChart,
  Mic,
  Megaphone,
  Quote,
  Send,
  Brain,
  CheckCircle2,
  HeartHandshake,
  Eye,
  UserCheck,
  Receipt,
  Umbrella,
  ArrowLeftRight,
  Stethoscope,
  Laptop,
  Sprout,
  MessageSquareText,
  ListChecks,
  Percent,
  Gift,
  TriangleAlert,
  Layers,
  Route,
  Search,
  Download,
  CalendarClock,
  UserRound,
  Zap,
};
