const { NAV_ICONS } = require("./siteDefaults");

// Custom drawn icons that exist in both the website and admin icon registries.
const CUSTOM_ICONS = [
  "TaxPlanning",
  "Compliances",
  "Documentation",
  "FinancialDecisions",
  "InvestmentManagement",
  "WealthManagement",
  "StatTeam",
  "StatExperience",
  "StatEducation",
  "StatPresentation",
  "Media",
  "TvMedia",
  "Books",
  "Blogs",
  "YouTube",
  "Connect",
];

const EXTRA_ICONS = [
  "Eye",
  "UserCheck",
  "Brain",
  "HeartHandshake",
  "CheckCircle2",
  "CircleCheck",
  "BadgeCheck",
  "Clock",
  "Gem",
  "Leaf",
  "Lock",
  "PiggyBank",
  "Rocket",
  "Sparkles",
  "Trophy",
  "Banknote",
  "Coins",
  "ChartLine",
  "HandCoins",
  "FileText",
  "Video",
  "Mic",
  "Megaphone",
  "Quote",
  "Send",
  "GraduationCap",
  "House",
  "Plane",
  "PieChart",
  "Receipt",
  "ListChecks",
  "Percent",
  "Scale",
  "Gift",
  "TriangleAlert",
  "Globe",
  "Building2",
  "Layers",
  "Landmark",
  "Briefcase",
  "Wallet",
  "LineChart",
  "Route",
  "ShieldCheck",
  "MapPin",
  "Search",
  "Download",
  "Link2",
  "Hourglass",
  "Lightbulb",
  "Flag",
  "Hammer",
  "Handshake",
  "ScrollText",
  "BookOpen",
  "Split",
  "FolderOpen",
  "Target",
  "MessageCircleQuestion",
  "RefreshCw",
  "CalendarCheck",
  "PhoneCall",
  "EyeOff",
  "Compass",
  "Umbrella",
  "ArrowLeftRight",
  "Stethoscope",
  "Laptop",
  "Sprout",
  "MessageSquareText",
  "CalendarClock",
  "UserRound",
];

const PAGE_ICONS = [...CUSTOM_ICONS, ...NAV_ICONS, ...EXTRA_ICONS];

const CATEGORIES = [
  { value: "core", label: "Core" },
  { value: "general", label: "General" },
  { value: "services", label: "Services" },
  { value: "support", label: "Support" },
  { value: "events", label: "Events" },
];

const LIMITS = {
  sections: 30,
  pages: 60,
  tableColumns: 10,
  tableRows: 50,
  imageSize: { min: 16, max: 2400 },
};

const IMAGE_RULES = {
  maxBytes: 5 * 1024 * 1024,
  types: { png: "image/png", jpg: "image/jpeg", webp: "image/webp", gif: "image/gif" },
  maxWidth: 6000,
  maxHeight: 6000,
};

// Files that a link can point to (PDFs, Word, Excel and PowerPoint). Keyed by extension.
const DOCUMENT_RULES = {
  maxBytes: 25 * 1024 * 1024,
  types: {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
};

// First path segments already used by website routes; custom pages cannot take them.
const RESERVED_SLUGS = [
  "home",
  "about",
  "about-us",
  "why-associate",
  "why-associate-with-us",
  "team",
  "our-team",
  "stakeholders",
  "stakeholders-team-members",
  "process",
  "our-process",
  "simplifying-financial-life",
  "investment-advice",
  "investment-advisor-process",
  "advisory",
  "family-office",
  "family-office-family-cfo",
  "investment-advisory",
  "nri-advisory",
  "nri-oci-advisory",
  "services",
  "nri-returning-to-india",
  "nris-returning-to-india",
  "global-indians",
  "global-citizens-in-india",
  "global-investor",
  "founders-and-entrepreneurs",
  "founders-and-enterpreneurs",
  "professionals-and-cxos",
  "cross-country-planning",
  "blog",
  "blogs",
  "career",
  "careers",
  "contact",
  "privacy-policy",
  "privacy",
  "refund-policy",
  "refund",
  "sebi-ria-certificate",
  "sebi-ria-registration-certificate",
  "bse-asl-membership",
  "bse-asl",
  "sebi-regulatory-compliance",
  "sebi-compliance-disclosure",
  "compliance-disclosure",
  "monthly-disclosure-of-investors-complaints",
  "material-information",
  "material-information-about-nwa",
  "sebi-investor-charter",
  "investor-charter",
  "code-of-conduct-sebi",
  "sebi-code-of-conduct",
  "code-of-conduct",
  "grievance-redressal",
  "investor-grievance",
  "functions-of-investment-adviser",
  "risks",
  "conflict-of-interest",
  "functions-of-ia",
  "cfa-code-of-conduct",
  "cfa-code",
  "website-disclaimer",
  "disclaimer",
  "legal",
  "insights",
  "cms-preview",
  "api",
  "images",
  "assets",
];

const opt = (value, label) => ({ value, label });

const DESIGN_FIELDS = {
  background: {
    label: "Background",
    kind: "select",
    options: [
      opt("default", "Section Default"),
      opt("white", "White"),
      opt("ivory", "Ivory"),
      opt("light", "Light Blue"),
      opt("navy", "Navy"),
      opt("deep", "Deep Navy"),
      opt("custom", "Custom Colour"),
    ],
  },
  backgroundColor: { label: "Custom Background Colour", kind: "color", showIf: { background: "custom" } },
  spacing: {
    label: "Vertical Spacing",
    kind: "select",
    options: [
      opt("default", "Section Default"),
      opt("none", "None"),
      opt("compact", "Compact"),
      opt("normal", "Normal"),
      opt("spacious", "Spacious"),
    ],
  },
  tone: {
    label: "Text Colour",
    kind: "select",
    options: [opt("auto", "Automatic (Based on Background)"), opt("dark", "Dark Text"), opt("light", "Light Text")],
  },
  align: {
    label: "Heading Alignment",
    kind: "select",
    options: [opt("default", "Section Default"), opt("left", "Left"), opt("center", "Centre")],
  },
  columns: {
    label: "Columns (Desktop)",
    kind: "select",
    options: [opt("default", "Section Default"), opt("1", "1"), opt("2", "2"), opt("3", "3"), opt("4", "4"), opt("6", "6")],
  },
  imageSide: {
    label: "Image Position",
    kind: "select",
    options: [opt("default", "Section Default"), opt("left", "Image on Left"), opt("right", "Image on Right")],
  },
  cardStyle: {
    label: "Card Style",
    kind: "select",
    options: [opt("default", "Section Default"), opt("bordered", "Bordered"), opt("shadow", "Raised Shadow"), opt("filled", "Filled"), opt("plain", "Plain")],
  },
  layout: {
    label: "Card Layout",
    kind: "select",
    options: [opt("default", "Section Default"), opt("scroll", "Pinned Horizontal Scroll"), opt("row", "Swipeable Row"), opt("grid", "Grid")],
  },
  width: {
    label: "Content Width",
    kind: "select",
    options: [opt("default", "Section Default"), opt("narrow", "Narrow (Reading Width)"), opt("wide", "Wide")],
  },
  anchor: {
    label: "Anchor ID",
    kind: "text",
    max: 40,
    hint: 'Lets links jump to this section, e.g. "why-us" for /#why-us. Lowercase letters, numbers and hyphens.',
  },
};

const DESIGN_DEFAULTS = {
  background: "default",
  backgroundColor: "#F7F8F5",
  spacing: "default",
  tone: "auto",
  align: "default",
  columns: "default",
  imageSide: "default",
  cardStyle: "default",
  layout: "default",
  width: "default",
  anchor: "",
};

const text = (key, label, max = 120, extra = {}) => ({ key, label, kind: "text", max, ...extra });
const textarea = (key, label, max = 600, extra = {}) => ({ key, label, kind: "textarea", max, ...extra });
const link = (key, label, extra = {}) => ({ key, label, kind: "link", ...extra });
const image = (key, label, extra = {}) => ({ key, label, kind: "image", sizing: true, ...extra });
const icon = (key = "icon", label = "Icon") => ({ key, label, kind: "icon" });
const tags = (key, label, max = 12, itemMax = 60, extra = {}) => ({ key, label, kind: "tags", max, itemMax, ...extra });
const paragraphs = (key, label, max = 8, itemMax = 1500, extra = {}) => ({ key, label, kind: "paragraphs", max, itemMax, ...extra });
const toggle = (key, label, extra = {}) => ({ key, label, kind: "toggle", ...extra });
const select = (key, label, options, extra = {}) => ({ key, label, kind: "select", options, ...extra });
const table = (key, label, extra = {}) => ({ key, label, kind: "table", ...extra });
const list = (key, label, itemLabel, max, fields, extra = {}) => ({ key, label, kind: "list", itemLabel, max, fields, ...extra });

const CARD_LINK_HINT = "Leave the label empty to make the whole card clickable without a text link.";
const emptyImage = () => ({ url: "", alt: "", width: 0, height: 0, fit: "", position: "" });
const emptyLink = () => ({ label: "", href: "", newTab: false });

const SECTION_TYPES = {
  hero: {
    label: "Hero Banner",
    description: "Full-width opening banner with heading, buttons, orbit badge and stats.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      tags("tags", "Eyebrow Tags", 5, 40, { hint: "Short labels above the heading, separated by green dots." }),
      text("title", "Heading", 60),
      text("highlight", "Highlighted Second Line", 60, { hint: "Shown in green below the heading." }),
      textarea("text", "Intro Paragraph", 700),
      link("primaryButton", "Primary Button", { short: true }),
      link("secondaryButton", "Secondary Button", { short: true }),
      image("image", "Background Image", { sizing: false, hint: "Background images always fill the banner. Use at least 1600 px wide." }),
      toggle("showOrbit", "Show Orbit Badge (Desktop)", { group: "Orbit Badge" }),
      tags("orbitLines", "Orbit Badge Lines", 5, 30, { group: "Orbit Badge" }),
      list(
        "stats",
        "Stats",
        "Stat",
        6,
        [text("value", "Value", 12, { hint: "Numbers count up on scroll, e.g. 150+." }), text("leadWord", "Bold Label", 30), text("label", "Label", 60), icon()],
        { titleKey: "leadWord", group: "Stats" }
      ),
    ],
  },
  table: {
    label: "Data Table",
    description: "Heading, short note, link and an editable table (e.g. SEBI complaints data).",
    icon: "Table",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      text("lead", "Bold Lead Text", 160),
      textarea("text", "Paragraph", 600),
      link("link", "Inline Link"),
      table("table", "Table"),
      text("caption", "Table Caption (For Screen Readers)", 200),
      toggle("showDivider", "Show Green Divider Below"),
    ],
  },
  imageCards: {
    label: "Image Cards",
    description: "Large photo cards with icon, title, text and a link (e.g. Wealth Management For).",
    icon: "LayoutGrid",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "columns", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 500),
      list(
        "items",
        "Cards",
        "Card",
        24,
        [
          text("title", "Title", 80),
          text("subtitle", "Question Line", 120, { hint: "Optional line shown below the title (e.g. \"Coming home after years abroad?\")." }),
          textarea("text", "Description", 300),
          image("image", "Card Image", { hint: "Height sets the card height. Leave 0 for automatic sizing." }),
          icon(),
          link("link", "Card Link", { hint: CARD_LINK_HINT }),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  callback: {
    label: "Call Back Form",
    description: "Name, phone and service form. Requests are saved under Form Submissions › Call Back Requests.",
    icon: "Phone",
    design: ["spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 300),
      image("image", "Background Image", { sizing: false }),
      tags("services", "Service Options", 20, 60),
      text("namePlaceholder", "Name Field Placeholder", 40),
      text("phonePlaceholder", "Phone Field Placeholder", 40),
      text("buttonLabel", "Button Label", 40),
    ],
  },
  calendly: {
    label: "Calendly Booking",
    description: "Lets visitors book a meeting from your Calendly scheduling page without leaving the website.",
    icon: "CalendarCheck",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      text("highlight", "Heading Accent (Italic)", 60),
      textarea("text", "Intro Text", 500),
      link("calendly", "Calendly Scheduling Link", {
        hint: "Paste the link from Calendly › Share, e.g. https://calendly.com/your-name/30min. The label is used for the open-in-new-tab button below the calendar.",
      }),
      select("height", "Calendar Height", [opt("standard", "Standard (700 px)"), opt("compact", "Compact (620 px)"), opt("tall", "Tall (820 px)")]),
      toggle("hideDetails", "Hide Event Details Panel", { hint: "Shows only the calendar, without the meeting name and description." }),
      toggle("hideCookieBanner", "Hide Calendly Cookie Banner"),
      textarea("fallbackText", "Message When No Link Is Set", 300, {
        group: "Without a Calendly Link",
        hint: "Shown instead of the calendar until a valid calendly.com link is saved.",
      }),
      link("fallbackButton", "Button When No Link Is Set", { group: "Without a Calendly Link" }),
    ],
  },
  whyUs: {
    label: "Split List With Image",
    description: "Image with credential card beside a numbered list and button (e.g. Why Us).",
    icon: "ListChecks",
    design: ["background", "backgroundColor", "spacing", "tone", "imageSide", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 600),
      list("items", "Numbered Points", "Point", 12, [text("title", "Point", 100)], { titleKey: "title" }),
      link("button", "Button"),
      image("image", "Side Image", { sizing: false, hint: "Fills the image half of the section." }),
      text("badgeTitle", "Credential Card Heading", 80, { group: "Credential Card" }),
      list("credentials", "Credentials", "Credential", 6, [text("name", "Name", 30), text("detail", "Detail", 80)], {
        titleKey: "name",
        group: "Credential Card",
      }),
    ],
  },
  cardCarousel: {
    label: "Scrolling Image Cards",
    description: "Image cards that scroll sideways as the visitor scrolls (e.g. Simplifying Financial Life).",
    icon: "GalleryHorizontal",
    design: ["background", "backgroundColor", "spacing", "tone", "layout", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 500),
      list(
        "items",
        "Cards",
        "Card",
        12,
        [
          text("title", "Title", 80),
          textarea("text", "Description", 400),
          image("image", "Card Image", { hint: "Height sets the image banner height. Leave 0 for automatic sizing." }),
          icon(),
          link("link", "Card Link", { hint: CARD_LINK_HINT }),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  iconCards: {
    label: "Icon Cards",
    description: "Compact cards with a round icon badge, title and text (e.g. Knowledge Hub).",
    icon: "CircleDot",
    design: ["background", "backgroundColor", "spacing", "tone", "columns", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 400),
      toggle("showPattern", "Show Doodle Pattern Background"),
      list(
        "items",
        "Cards",
        "Card",
        12,
        [text("title", "Title", 40), textarea("text", "Description", 160), icon(), link("link", "Card Link", { hint: CARD_LINK_HINT })],
        { titleKey: "title" }
      ),
    ],
  },
  team: {
    label: "Team Showcase",
    description: "Featured leader with quote plus an auto-scrolling team carousel with profiles.",
    icon: "UsersRound",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      toggle("showLeader", "Show Featured Leader", { group: "Featured Leader" }),
      text("leaderEyebrow", "Eyebrow", 60, { group: "Featured Leader" }),
      textarea("leaderQuote", "Quote", 600, { group: "Featured Leader" }),
      text("leaderName", "Name", 80, { group: "Featured Leader" }),
      text("leaderRole", "Role", 100, { group: "Featured Leader" }),
      text("leaderInitials", "Initials (Shown if No Photo)", 4, { group: "Featured Leader" }),
      tags("leaderCredentials", "Credentials", 8, 40, { group: "Featured Leader" }),
      textarea("leaderBio", "Short Bio", 800, { group: "Featured Leader" }),
      image("leaderImage", "Photo", { group: "Featured Leader", hint: "Portrait (4:5) works best. Height and width are optional." }),
      text("eyebrow", "Eyebrow", 60, { group: "Team Carousel" }),
      text("title", "Heading", 100, { group: "Team Carousel" }),
      link("button", "Button", { group: "Team Carousel" }),
      toggle("autoScroll", "Auto-Scroll Carousel", { group: "Team Carousel" }),
      list(
        "members",
        "Team Members",
        "Member",
        40,
        [
          text("name", "Name", 80),
          text("role", "Role", 100),
          text("initials", "Initials (Shown if No Photo)", 4),
          text("highlight", "Highlight Badge", 60),
          tags("credentials", "Credentials", 8, 60),
          textarea("bio", "Short Bio (Card)", 300),
          paragraphs("fullBio", "Full Profile Paragraphs (Pop-up)", 8, 1500),
          image("image", "Photo", { hint: "Optional. Height sets the card photo height." }),
        ],
        { titleKey: "name", group: "Team Carousel" }
      ),
    ],
  },
  richText: {
    label: "Text Block",
    description: "Heading with paragraphs and up to three buttons.",
    icon: "Type",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "width", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 140),
      paragraphs("body", "Paragraphs", 12, 2000),
      list(
        "buttons",
        "Buttons",
        "Button",
        3,
        [link("link", "Button"), select("style", "Style", [opt("solid", "Green"), opt("blue", "Blue"), opt("outline", "Outline")])],
        { titleKey: "link.label" }
      ),
    ],
  },
  cards: {
    label: "Card Grid",
    description: "Flexible grid of cards with optional image, icon, text and link.",
    icon: "Columns3",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "columns", "cardStyle", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 500),
      list(
        "items",
        "Cards",
        "Card",
        24,
        [
          text("title", "Title", 80),
          textarea("text", "Description", 400),
          image("image", "Card Image (Optional)", { hint: "Leave height and width at 0 to keep the image's natural shape." }),
          icon(),
          link("link", "Card Link", { hint: CARD_LINK_HINT }),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  imageText: {
    label: "Image & Text",
    description: "Image beside a heading, paragraphs, checklist and button.",
    icon: "PanelsTopLeft",
    design: ["background", "backgroundColor", "spacing", "tone", "imageSide", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 120),
      paragraphs("body", "Paragraphs", 8, 2000),
      tags("bullets", "Checklist Points", 10, 120),
      link("button", "Button"),
      image("image", "Image", { hint: "Leave height and width at 0 to keep the image's natural shape." }),
    ],
  },
  cta: {
    label: "Call to Action Banner",
    description: "Bold banner with heading, text and up to two buttons.",
    icon: "Megaphone",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 120),
      textarea("text", "Text", 400),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      image("image", "Background Image (Optional)", { sizing: false }),
    ],
  },
  stats: {
    label: "Stats Band",
    description: "Row of key numbers with labels and icons.",
    icon: "ChartNoAxesColumn",
    design: ["background", "backgroundColor", "spacing", "tone", "align", "columns", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      list("items", "Stats", "Stat", 8, [text("value", "Value", 12), text("label", "Label", 60), icon()], { titleKey: "label" }),
    ],
  },
  aboutHero: {
    label: "About Hero",
    description: "Hero banner with breadcrumb, heading with highlighted word, intro text and background photo.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Text", 40),
      text("title", "Heading First Line", 60),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro Paragraph", 500),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  whyWeAre: {
    label: "Why We Are",
    description: "The Industry Reality section with eyebrow, heading, body paragraphs, fiduciary badge and image.",
    icon: "ListChecks",
    design: ["background", "backgroundColor", "spacing", "tone", "imageSide", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      paragraphs("paragraphs", "Body Paragraphs", 6, 1500),
      text("badgeText", "Checkmark Badge Text", 120),
      image("image", "Side Image", { sizing: false, hint: "Fills the photo half of the section." }),
    ],
  },
  whoWeAre: {
    label: "Who We Are",
    description: "SEBI RIA Validated section with credentials highlight, body paragraphs, tags and team image.",
    icon: "UsersRound",
    design: ["background", "backgroundColor", "spacing", "tone", "imageSide", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("highlight", "Bold Highlight Text", 500),
      paragraphs("paragraphs", "Body Paragraphs", 6, 1500),
      tags("tags", "Badge Pills", 8, 40),
      image("image", "Side Image", { sizing: false, hint: "Fills the photo half of the section." }),
    ],
  },
  whatWeDo: {
    label: "What We Do & Philosophy",
    description: "The Neuron Philosophy interactive tabbed slider with background banner and value proposition slides.",
    icon: "Brain",
    design: ["anchor"],
    fields: [
      image("image", "Background Banner Image", { sizing: false }),
      list(
        "slides",
        "Philosophy Slides",
        "Slide",
        4,
        [
          text("tabLabel", "Tab Button Label", 40),
          text("eyebrow", "Eyebrow", 60),
          icon(),
          text("title", "Heading", 80),
          textarea("quote", "Featured Quote (Italic Serif)", 300),
          text("subquote", "Quote Caption / Subtitle", 80),
          textarea("text", "Body Description", 1000),
          tags("tags", "Pill Tags", 10, 40),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  visionMission: {
    label: "Vision & Mission",
    description: "Side-by-side dark visual cards for Our Vision and Our Mission with icons and photos.",
    icon: "Compass",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("visionEyebrow", "Eyebrow", 40, { group: "Our Vision" }),
      text("visionTitle", "Title", 60, { group: "Our Vision" }),
      textarea("visionText", "Description", 500, { group: "Our Vision" }),
      icon("visionIcon", "Icon", { group: "Our Vision" }),
      image("visionImage", "Background Card Image", { group: "Our Vision", sizing: false }),

      text("missionEyebrow", "Eyebrow", 40, { group: "Our Mission" }),
      text("missionTitle", "Title", 60, { group: "Our Mission" }),
      textarea("missionText", "Description", 500, { group: "Our Mission" }),
      icon("missionIcon", "Icon", { group: "Our Mission" }),
      image("missionImage", "Background Card Image", { group: "Our Mission", sizing: false }),
    ],
  },
  pillars: {
    label: "Foundational Pillars",
    description: "How to be the most trusted: 4 pillars with numbers, icons, photos and descriptions.",
    icon: "ShieldCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 100),
      textarea("text", "Intro Text", 400),
      list(
        "items",
        "Pillars",
        "Pillar",
        8,
        [
          text("num", "Number (e.g. 01)", 10),
          text("title", "Title", 80),
          icon(),
          image("image", "Pillar Photo", { sizing: false }),
          textarea("text", "Description", 500),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  whyAssociateHero: {
    label: "Why Associate Hero",
    description: "Opening banner with breadcrumbs, heading with highlighted word, intro text and background photo.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Text", 60),
      text("title", "Heading First Line", 60),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro Paragraph", 500),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  associationPhilosophy: {
    label: "Association & Parable",
    description: "Swami Vivekananda Ji parable on Association, quote box with moral and assessment button.",
    icon: "BookOpen",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 80),
      textarea("intro", "Intro Statement", 400),
      text("quoteTitle", "Quote Header", 100),
      paragraphs("quoteLines", "Parable Lines", 8, 300),
      textarea("quoteConclusion", "Quote Moral / Conclusion", 400),
      textarea("text", "Application Description", 600),
      link("button", "Assessment Button"),
      image("image", "Portrait Image", { sizing: false, hint: "Swami Vivekananda photo" }),
    ],
  },
  sevenReasons: {
    label: "7 Reasons to Associate",
    description: "Core foundations interactive section with sticky navigation, animated timeline, and 7 foundation cards.",
    icon: "Scale",
    design: ["anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading First Part", 80),
      text("highlight", "Heading Highlight Part", 80),
      textarea("text", "Intro Description", 400),
      image("image", "Background Image", { sizing: false }),
      list(
        "items",
        "Foundations",
        "Foundation",
        12,
        [
          text("num", "Number (e.g. 01)", 10),
          text("title", "Title", 80),
          text("tag", "Pill Tag", 60),
          icon(),
          textarea("text", "Description", 500),
          toggle("hasLink", "Show Assessment Callout Box"),
          text("calloutText", "Callout Box Note", 200),
          link("button", "Callout Button"),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  pearlAssessment: {
    label: "Pearl Assessment",
    description: "Interested in Becoming a Pearl 3-step interactive assessment questionnaire form.",
    icon: "HeartHandshake",
    design: ["anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading First Part", 60),
      text("highlight", "Heading Highlight Part", 60),
      textarea("intro", "Intro Paragraph", 600),
      textarea("subtext", "Form Callout Subtext", 400),
    ],
  },
  teamHero: {
    label: "Team Hero Banner",
    description: "Full-width opening banner with breadcrumb, heading with highlighted phrase, and background photo.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Text", 60),
      text("title", "Heading First Part", 60),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro Paragraph", 500),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  leadership: {
    label: "Leadership & Mentorship",
    description: "Keynote leader and mentor profiles with alternating photo layout, credentials, and full biographies.",
    icon: "Award",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 80),
      textarea("text", "Intro Description", 400),
      list(
        "leaders",
        "Leaders & Mentors",
        "Leader",
        6,
        [
          text("name", "Name", 80),
          text("role", "Role / Title", 100),
          tags("credentials", "Credentials Pills", 8, 60),
          text("monogram", "Monogram Initials (e.g. JP)", 4),
          image("image", "Portrait Photo", { sizing: false }),
          paragraphs("bio", "Biography Paragraphs", 8, 1500),
          text("badge", "Footer Badge", 60),
        ],
        { titleKey: "name" }
      ),
    ],
  },
  teamEcosystem: {
    label: "Team Members Ecosystem",
    description: "Interactive team members showcase with spotlight rolling view, View All grid, and department filters.",
    icon: "Users",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 80),
      textarea("text", "Intro Description", 400),
      list(
        "departments",
        "Departments",
        "Department",
        8,
        [
          text("deptId", "Department ID (e.g. advisory-taxation)", 40),
          text("eyebrow", "Category Eyebrow", 60),
          text("title", "Department Title", 80),
          textarea("desc", "Department Description", 300),
        ],
        { titleKey: "title" }
      ),
      list(
        "members",
        "Team Members",
        "Member",
        40,
        [
          text("name", "Name", 80),
          text("role", "Role / Designation", 100),
          text("deptId", "Department ID (matches Department ID above)", 40),
          tags("credentials", "Credentials Pills", 8, 60),
          text("monogram", "Monogram Initials (e.g. MP)", 4),
          paragraphs("bio", "Biography Paragraphs", 8, 1500),
        ],
        { titleKey: "name" }
      ),
    ],
  },
  teamDisclaimer: {
    label: "Team Relationship Disclaimer",
    description: "Fiduciary regulatory notice about the consulting relationship with stakeholders.",
    icon: "ShieldCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      icon("icon", "Shield / Notice Icon"),
      text("title", "Disclaimer Heading", 120),
      textarea("text", "Disclaimer Copy", 1200),
    ],
  },
  careerHero: {
    label: "Career Hero Banner",
    description: "Full-width opening banner with breadcrumb, heading, italic highlight, and background image.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Text", 60),
      text("title", "Heading First Part", 60),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro Paragraph", 500),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  careerWhyWork: {
    label: "Why Work With Us & Application",
    description: "Application details with photo, editorial paragraphs, candidate questionnaire link, and direct contact details.",
    icon: "Briefcase",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow / Category Tag", 60),
      text("title", "Heading", 80),
      image("image", "Square Team Photo", { sizing: false }),
      paragraphs("paragraphs", "Editorial Paragraphs", 6, 800),
      link("formButton", "Application Form Button"),
      text("formNote", "Form Helper Note", 150),
      text("contactTitle", "Contact Section Header", 80),
      text("contactEmail", "Inquiry Email", 80),
      text("contactPhone", "Inquiry Phone", 40),
      text("contactLocation", "Office Location", 60),
    ],
  },
  careerEthos: {
    label: "Work Ethos & Culture Pillars",
    description: "Culture foundations with background photos, dark contrast scrims, category tags, icons, and descriptions.",
    icon: "Scale",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 60),
      text("title", "Heading", 80),
      textarea("text", "Intro Description", 400),
      list(
        "pillars",
        "Culture Pillars",
        "Pillar",
        8,
        [
          icon(),
          text("title", "Pillar Title", 80),
          text("tag", "Pill Tag", 50),
          image("image", "Card Background Photo", { sizing: false }),
          textarea("description", "Pillar Description", 500),
        ],
        { titleKey: "title" }
      ),
    ],
  },
  contactHero: {
    label: "Contact Hero Banner",
    description: "Full-width opening banner with breadcrumb, heading, italic highlight, and background photo.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Text", 60),
      text("title", "Heading First Part", 60),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro Paragraph", 500),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  contactHub: {
    label: "Contact Hub & Executive Desk",
    description: "Interactive advisory inquiry form paired with the verified SEBI RIA executive desk card.",
    icon: "Phone",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("formBadge", "Form Badge / Pill", 60),
      text("formTitle", "Form Heading", 80),
      textarea("formDescription", "Form Subtitle", 300),
      text("formNote", "Fiduciary Privacy Note", 200),
      text("formButton", "Submit Button Label", 60),
      text("deskBadge", "Desk SEBI Badge", 60),
      text("regNumber", "SEBI Registration Number", 80),
      text("companyName", "Company Legal Name", 80),
      text("validity", "Registration Validity Note", 80),
      text("officerDeskTitle", "Officer Section Title", 60),
      text("officerName", "Principal Officer Name", 80),
      text("officerCredentials", "Officer Qualifications", 120),
      text("officerEmail", "Officer Direct Email", 80),
      text("whatsappUrl", "WhatsApp Link URL", 300),
      text("headquartersTitle", "HQ Label", 40),
      textarea("headquartersAddress", "Headquarters Full Address", 300),
      text("mapsUrl", "Google Maps Link URL", 500),
      text("sebiOfficeTitle", "SEBI Regional Office Label", 60),
      textarea("sebiOfficeAddress", "SEBI Regional Office Address", 300),
      text("directPhone", "Direct Advisory Line Phone", 40),
      text("officialEmail", "Official Firm Email", 80),
      image("bottomBgImage", "Card Bottom Scrim Background Image", { sizing: false }),
    ],
  },
  contactMap: {
    label: "Headquarters Map Embed",
    description: "Full-width interactive Google Maps embed with directions link and WhatsApp button.",
    icon: "Building2",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("title", "Bar Location Title", 80),
      text("whatsappUrl", "WhatsApp Inquiry URL", 300),
      text("mapsUrl", "Google Maps URL", 500),
      text("mapEmbedUrl", "Google Maps Embed URL (iframe src)", 500),
    ],
  },
  complianceHero: {
    label: "Compliance Hero Banner",
    description: "Opening banner with breadcrumb, heading, highlighted text, and background photo.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Text", 80),
      text("title", "Heading First Part", 60),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro Paragraph", 500),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  complianceHub: {
    label: "Compliance Hub & Disclosures",
    description: "Core regulatory hub with all 14 statutory articles, annual audit records, 3 complaints tables, compliance officers, and authority sidebar.",
    icon: "Scale",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      // 1. About Neuron Wealth Advisors
      text("aboutTitle", "Section 1 Heading", 80, { group: "1. About Neuron Wealth Advisors" }),
      textarea("aboutText", "Section 1 Description", 800, { group: "1. About Neuron Wealth Advisors" }),
      link("aboutLink", "Material Info Link", { group: "1. About Neuron Wealth Advisors" }),

      // 2. SEBI RIA Registration
      text("riaTitle", "Section 2 Heading", 80, { group: "2. SEBI RIA Registration" }),
      textarea("riaText", "Section 2 Description", 800, { group: "2. SEBI RIA Registration" }),
      text("riaLinkLabel", "Certificate Link Text", 120, { group: "2. SEBI RIA Registration" }),
      image("riaCertificate", "Registration Certificate Image", {
        sizing: false,
        group: "2. SEBI RIA Registration",
        hint: "Shown on its own in a popup when the link text is clicked.",
      }),

      // 3. BSE ASL Membership
      text("bseTitle", "Section 3 Heading", 80, { group: "3. BSE ASL Membership" }),
      textarea("bseText", "Section 3 Description", 800, { group: "3. BSE ASL Membership" }),
      text("bseLinkLabel", "Certificate Link Text", 120, { group: "3. BSE ASL Membership" }),
      image("bseCertificate", "Membership Certificate Image", {
        sizing: false,
        group: "3. BSE ASL Membership",
        hint: "Shown on its own in a popup when the link text is clicked.",
      }),

      // 4. Disclaimer
      text("disclaimerTitle", "Section 4 Heading", 80, { group: "4. Disclaimer" }),
      paragraphs("disclaimerParagraphs", "Disclaimer Paragraphs", 6, 1000, { group: "4. Disclaimer" }),
      link("disclaimerLink", "Full Disclaimer Page Link", { group: "4. Disclaimer" }),

      // 5. Investor Charter
      text("charterTitle", "Section 5 Heading", 80, { group: "5. Investor Charter" }),
      textarea("charterText", "Section 5 Description", 800, { group: "5. Investor Charter" }),
      link("charterLink", "Investor Charter Link", { group: "5. Investor Charter" }),

      // 6. Code of Conduct
      text("codeTitle", "Section 6 Heading", 80, { group: "6. Code of Conduct" }),
      textarea("sebiCodeText", "SEBI Code Text", 600, { group: "6. Code of Conduct" }),
      link("sebiCodeLink", "SEBI Code Link", { group: "6. Code of Conduct" }),
      textarea("cfaCodeText", "CFA Code Text", 600, { group: "6. Code of Conduct" }),
      link("cfaCodeLink", "CFA Code Link", { group: "6. Code of Conduct" }),

      // 7. Functions of Investment Adviser
      text("functionsTitle", "Section 7 Heading", 80, { group: "7. Functions of Investment Adviser" }),
      textarea("functionsText", "Section 7 Description", 800, { group: "7. Functions of Investment Adviser" }),
      link("functionsLink", "Functions Page Link", { group: "7. Functions of Investment Adviser" }),

      // 8. Risks
      text("risksTitle", "Section 8 Heading", 80, { group: "8. Risks" }),
      textarea("risksText", "Section 8 Description", 800, { group: "8. Risks" }),
      link("risksLink", "Risks Page Link", { group: "8. Risks" }),

      // 9. Conflict of Interest
      text("conflictTitle", "Section 9 Heading", 80, { group: "9. Conflict of Interest" }),
      textarea("conflictText", "Section 9 Description", 800, { group: "9. Conflict of Interest" }),
      link("conflictLink", "Conflict of Interest Page Link", { group: "9. Conflict of Interest" }),

      // 10. Annual Audit
      text("auditTitle", "Section 10 Heading", 80, { group: "10. Annual Audit" }),
      text("auditNote", "Audit Disclaimer Note", 200, { group: "10. Annual Audit" }),
      list(
        "auditRecords",
        "Annual Compliance Audit Records",
        "Audit Record",
        20,
        [
          text("sr", "Sr. No.", 10),
          text("fy", "Financial Year", 40),
          text("status", "Audit Status (e.g. Conducted)", 40),
          text("url", "PDF Report URL (optional)", 500),
          text("remarks", "Remarks / Notes", 200),
        ],
        { titleKey: "fy", group: "10. Annual Audit" }
      ),

      // 11. Grievance Redressal
      text("grievanceTitle", "Section 11 Heading", 80, { group: "11. Grievance Redressal" }),
      textarea("grievanceText", "Section 11 Description", 800, { group: "11. Grievance Redressal" }),
      link("grievanceLink", "Grievance Process Link", { group: "11. Grievance Redressal" }),

      // 12. Disciplinary History & Complaints Status
      text("complaintsTitle", "Section 12 Heading", 100, { group: "12. Disciplinary History & Complaints Status" }),
      textarea("complaintsText", "Disciplinary Statement", 600, { group: "12. Disciplinary History & Complaints Status" }),
      text("currentMonthTitle", "Table 1 Month Heading", 100, { group: "12. Disciplinary History & Complaints Status" }),
      list(
        "monthlyCurrent",
        "Current Month Complaints (Table 1)",
        "Source Row",
        10,
        [
          text("sr", "Sr. No.", 10),
          text("source", "Received From", 60),
          text("pendingLast", "Pending Last Month", 20),
          text("received", "Received", 20),
          text("resolved", "Resolved", 20),
          text("totalPending", "Total Pending", 20),
          text("pendingOver3M", "Pending > 3 Months", 20),
          text("avgTime", "Avg Resolution Days", 20),
        ],
        { titleKey: "source", group: "12. Disciplinary History & Complaints Status" }
      ),
      list(
        "monthlyTrend",
        "Monthly Trend of Complaints (Table 2)",
        "Month Row",
        24,
        [
          text("sr", "Sr. No.", 10),
          text("month", "Month & Year", 40),
          text("carried", "Carried Forward", 20),
          text("received", "Received", 20),
          text("resolved", "Resolved", 20),
          text("pending", "Pending", 20),
        ],
        { titleKey: "month", group: "12. Disciplinary History & Complaints Status" }
      ),
      list(
        "annualTrend",
        "Annual Trend of Complaints (Table 3)",
        "Financial Year Row",
        24,
        [
          text("sr", "Sr. No.", 10),
          text("year", "Year (e.g. 2024-25)", 30),
          text("carried", "Carried Forward", 20),
          text("received", "Received", 20),
          text("resolved", "Resolved", 20),
          text("pending", "Pending", 20),
        ],
        { titleKey: "year", group: "12. Disciplinary History & Complaints Status" }
      ),

      // 13. Disclosure of Holdings
      text("holdingsTitle", "Section 13 Heading", 120, { group: "13. Disclosure of Holdings" }),
      paragraphs("holdingsParagraphs", "Opening Paragraphs", 4, 800, { group: "13. Disclosure of Holdings" }),
      paragraphs("holdingsFunds", "Schemes Held (Bullets)", 20, 200, { group: "13. Disclosure of Holdings" }),
      paragraphs("holdingsNotes", "Closing Paragraphs", 4, 800, { group: "13. Disclosure of Holdings" }),
      text("clientAdviceTitle", "Sub-heading", 120, { group: "13. Disclosure of Holdings" }),
      paragraphs("clientAdviceParagraphs", "Sub-heading Paragraphs", 4, 800, { group: "13. Disclosure of Holdings" }),

      // 14. Details of Principal & Compliance Officers
      text("officersTitle", "Section 14 Heading", 100, { group: "14. Details of Principal & Compliance Officers" }),
      text("principalName", "Principal Officer Name", 80, { group: "14. Details of Principal & Compliance Officers" }),
      text("principalRole", "Principal Officer Role", 80, { group: "14. Details of Principal & Compliance Officers" }),
      text("principalEmail", "Principal Officer Email", 80, { group: "14. Details of Principal & Compliance Officers" }),
      text("principalPhone", "Principal Officer Phone", 40, { group: "14. Details of Principal & Compliance Officers" }),
      text("complianceName", "Compliance Officer Name", 80, { group: "14. Details of Principal & Compliance Officers" }),
      text("complianceRole", "Compliance Officer Role", 80, { group: "14. Details of Principal & Compliance Officers" }),
      text("complianceEmail", "Compliance Officer Email", 80, { group: "14. Details of Principal & Compliance Officers" }),
      text("compliancePhone", "Compliance Officer Phone", 40, { group: "14. Details of Principal & Compliance Officers" }),

      // Sidebar & Authority Credentials
      text("sidebarTitle", "Table of Contents Title", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarSebiReg", "SEBI Registration No", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarBaslId", "Sidebar BASL ID", 40, { group: "Sidebar & Authority Credentials" }),
      text("sidebarStatus", "Sidebar Reg Status", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarModel", "Sidebar Model", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarTrackRecord", "Sidebar Track Record", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarInquiryTitle", "Direct Inquiries Card Title", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarInquirySubtitle", "Direct Inquiries Subtitle", 60, { group: "Sidebar & Authority Credentials" }),
      text("sidebarEmail", "Sidebar Compliance Email", 80, { group: "Sidebar & Authority Credentials" }),
      text("sidebarPhone", "Sidebar Compliance Phone", 40, { group: "Sidebar & Authority Credentials" }),
      textarea("sidebarAddress", "Sidebar Office Address", 300, { group: "Sidebar & Authority Credentials" }),
    ],
  },
  policyHero: {
    label: "Policy Hero Banner",
    description: "Full-width hero header for policy, disclaimer, and statutory governance pages.",
    icon: "ShieldCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("breadcrumb", "Breadcrumb Label", 80),
      text("title", "Main Heading", 80),
      text("highlight", "Heading Highlight (Italic Accent)", 60),
      textarea("text", "Intro / Scope Summary", 500),
      text("badge", "Header Status Badge (e.g. Last updated / Regulation)", 80),
      image("image", "Background Image", { sizing: false, hint: "1920x1080 px image works best." }),
    ],
  },
  privacyPolicyHub: {
    label: "Privacy Policy Articles & Disclosures",
    description: "Complete legal data privacy articles, collection scope, usage limits, client rights, and grievance desk.",
    icon: "Lock",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      // 1. Introduction
      text("introTitle", "Section 1 Heading", 80, { group: "1. Introduction" }),
      paragraphs("introParagraphs", "Introduction Paragraphs", 4, 1000, { group: "1. Introduction" }),

      // 2. Information We Collect
      text("collectTitle", "Section 2 Heading", 80, { group: "2. Information We Collect" }),
      text("collectWebsiteSubtitle", "Website Visitors Subheading", 80, { group: "2. Information We Collect" }),
      textarea("collectWebsiteText", "Website Visitors Text", 800, { group: "2. Information We Collect" }),
      text("collectContactSubtitle", "Contact Subheading", 80, { group: "2. Information We Collect" }),
      textarea("collectContactText", "Contact Inquiries Text", 800, { group: "2. Information We Collect" }),
      text("collectClientSubtitle", "Client Data Subheading", 80, { group: "2. Information We Collect" }),
      textarea("collectClientText", "Client Data Intro", 800, { group: "2. Information We Collect" }),
      tags("collectClientBullets", "Client Data Points Collected", 10, 150, { group: "2. Information We Collect" }),

      // 3. How We Use Your Information
      text("useTitle", "Section 3 Heading", 80, { group: "3. How We Use Information" }),
      textarea("useIntro", "Use Intro Text", 500, { group: "3. How We Use Information" }),
      tags("useBullets", "Usage Purposes", 8, 150, { group: "3. How We Use Information" }),
      textarea("useNotice", "No-Marketing / Anti-Sale Notice", 400, { group: "3. How We Use Information" }),

      // 4. When We Share Information
      text("shareTitle", "Section 4 Heading", 80, { group: "4. When We Share Information" }),
      textarea("shareIntro", "Sharing Intro Text", 500, { group: "4. When We Share Information" }),
      tags("shareBullets", "Authorized Entities & Disclosures", 8, 250, { group: "4. When We Share Information" }),

      // 5. How We Protect Information
      text("securityTitle", "Section 5 Heading", 80, { group: "5. How We Protect Information" }),
      textarea("securityText", "Security Measures Description", 1000, { group: "5. How We Protect Information" }),

      // 6. How Long We Keep Information
      text("retentionTitle", "Section 6 Heading", 80, { group: "6. How Long We Keep Information" }),
      textarea("retentionText", "Statutory 5-Year Record Retention Text", 1000, { group: "6. How Long We Keep Information" }),

      // 7. Your Rights
      text("rightsTitle", "Section 7 Heading", 80, { group: "7. Your Rights" }),
      textarea("rightsIntro", "DPDP Act Rights Intro", 500, { group: "7. Your Rights" }),
      tags("rightsBullets", "Client Privacy Rights", 8, 150, { group: "7. Your Rights" }),
      text("rightsOutro", "Rights Exercise Instructions", 200, { group: "7. Your Rights" }),

      // 8. Third Party Websites
      text("thirdPartyTitle", "Section 8 Heading", 80, { group: "8. Third Party Websites" }),
      textarea("thirdPartyText", "External Links Disclaimer", 600, { group: "8. Third Party Websites" }),

      // 9. Children's Information
      text("childrenTitle", "Section 9 Heading", 80, { group: "9. Children's Information" }),
      textarea("childrenText", "Minors & Family Planning Text", 600, { group: "9. Children's Information" }),

      // 10. Changes to This Policy
      text("changesTitle", "Section 10 Heading", 80, { group: "10. Policy Changes" }),
      textarea("changesText", "Policy Updates & Notice Text", 600, { group: "10. Policy Changes" }),

      // 11. Contact & Grievance Desk
      text("contactTitle", "Section 11 Heading", 80, { group: "11. Contact & Grievance Desk" }),
      textarea("contactText", "Contact Description", 400, { group: "11. Contact & Grievance Desk" }),
      text("contactEmail", "Grievance Email Address", 80, { group: "11. Contact & Grievance Desk" }),
      textarea("contactAddress", "Physical Address", 300, { group: "11. Contact & Grievance Desk" }),
    ],
  },
  disclaimerHub: {
    label: "Website Disclaimers & Statutory Disclosures",
    description: "Terms of use, financial literacy scope, limitation of liability, and market risk disclaimers.",
    icon: "Scale",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      // 1. Terms of Use
      text("termsTitle", "Section 1 Heading", 80, { group: "1. Terms of Use & Binding Agreement" }),
      paragraphs("termsParagraphs", "Terms of Use Paragraphs", 4, 1000, { group: "1. Terms of Use & Binding Agreement" }),

      // 2. Financial Literacy & No Offer
      text("educationalTitle", "Section 2 Heading", 80, { group: "2. Financial Literacy & No Offer" }),
      paragraphs("educationalParagraphs", "Educational Purpose Paragraphs", 5, 1000, { group: "2. Financial Literacy & No Offer" }),

      // 3. Accuracy of Information
      text("accuracyTitle", "Section 3 Heading", 80, { group: "3. Accuracy of Information" }),
      paragraphs("accuracyParagraphs", "Accuracy Paragraphs", 4, 1000, { group: "3. Accuracy of Information" }),

      // 4. Limitation of Liability
      text("liabilityTitle", "Section 4 Heading", 80, { group: "4. Limitation of Liability" }),
      paragraphs("liabilityParagraphs", "Liability Limitation Paragraphs", 4, 1000, { group: "4. Limitation of Liability" }),

      // 5. Functionality & Third-Party Links
      text("functionalityTitle", "Section 5 Heading", 80, { group: "5. Functionality & Third-Party Links" }),
      paragraphs("functionalityParagraphs", "Functionality & External Links Paragraphs", 4, 1000, { group: "5. Functionality & Third-Party Links" }),

      // 6. Market & Investment Risks
      text("risksTitle", "Section 6 Heading", 80, { group: "6. Market & Investment Risks" }),
      paragraphs("risksParagraphs", "Market Risks Paragraphs", 4, 1000, { group: "6. Market & Investment Risks" }),

      // 7. SEBI & BASL Statutory Disclosures
      text("statutoryTitle", "Section 7 Heading", 80, { group: "7. SEBI & BASL Disclosures" }),
      paragraphs("statutoryParagraphs", "SEBI & BASL Disclosures Paragraphs", 4, 1000, { group: "7. SEBI & BASL Disclosures" }),
    ],
  },
  refundHub: {
    label: "Refund Framework & Procedure",
    description: "SEBI IA 15A framework, non-liability for losses, retainer policy, 7-step procedure and settlement timeline.",
    icon: "Banknote",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      // 1. SEBI Regulation 15A
      text("sebiTitle", "Section 1 Heading", 80, { group: "1. SEBI Regulation 15A Framework" }),
      paragraphs("sebiParagraphs", "SEBI 15A Framework Paragraphs", 4, 1000, { group: "1. SEBI Regulation 15A Framework" }),

      // 2. No Liability for Loss
      text("noLiabilityTitle", "Section 2 Heading", 80, { group: "2. No Liability for Market Losses" }),
      paragraphs("noLiabilityParagraphs", "No Liability Paragraphs", 4, 1000, { group: "2. No Liability for Market Losses" }),

      // 3. Standard Refund Policy
      text("policyTitle", "Section 3 Heading", 80, { group: "3. Standard Refund Policy" }),
      paragraphs("policyParagraphs", "Retainer & Breakage Policy Paragraphs", 5, 1000, { group: "3. Standard Refund Policy" }),

      // 4. Step-by-Step Procedure
      text("procedureTitle", "Section 4 Heading", 80, { group: "4. Step-by-Step Procedure" }),
      textarea("procedureIntro", "Procedure Intro Description", 500, { group: "4. Step-by-Step Procedure" }),
      list(
        "steps",
        "Procedure Steps",
        "Step",
        10,
        [
          text("step", "Step Number", 10),
          text("title", "Step Title", 80),
          textarea("description", "Step Description", 500),
          text("tag", "Step Badge Tag", 40),
          icon("icon", "Step Icon"),
        ],
        { titleKey: "title", group: "4. Step-by-Step Procedure" }
      ),

      // 5. Settlement Timeline
      text("timelineTitle", "Section 5 Heading", 80, { group: "5. Settlement Timeline" }),
      paragraphs("timelineParagraphs", "5-Day Settlement Timeline Paragraphs", 4, 1000, { group: "5. Settlement Timeline" }),

      // 6. Support & Escalations
      text("supportTitle", "Section 6 Heading", 80, { group: "6. Support & Escalations" }),
      textarea("supportText", "Support Desk Description", 500, { group: "6. Support & Escalations" }),
      text("supportEmail", "Support Email Address", 80, { group: "6. Support & Escalations" }),
      text("supportPhone", "Support Phone Number", 40, { group: "6. Support & Escalations" }),
      textarea("supportAddress", "Headquarters Address", 300, { group: "6. Support & Escalations" }),
    ],
  },

  // --- NRIs Returning to India Sections ---
  nriReturnHero: {
    label: "NRI Return Hero Banner",
    description: "Hero banner with headline, callout quote, flight animation badge, trust strip, and CTA buttons.",
    icon: "Plane",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow Tag", 80),
      text("title", "Hero Title Line 1", 100),
      text("titleHighlight", "Highlighted Title Line 2", 100),
      textarea("quote", "Callout Quote", 400),
      textarea("description", "Description Paragraph", 600),
      image("bgImage", "Background Image"),
      link("primaryButton", "Primary Action Button"),
      link("secondaryButton", "Secondary Action Button"),
      text("globalNote", "Global Returnees Footnote", 150),
      text("originLabel", "Origin Label", 30),
      text("destinationLabel", "Destination Label", 30),
      text("statNumber", "Stat Number", 20),
      text("statUnit", "Stat Unit", 20),
      text("statText", "Stat Caption", 100),
      text("planHeading", "Plan Card Heading", 40),
      list("planItems", "One Global Plan Items", "Item", 6, [icon("icon", "Icon"), text("label", "Label", 50)]),
      list("trustItems", "Trust Strip Items", "Badge", 6, [icon("icon", "Icon"), text("text", "Trust Statement", 100)]),
    ],
  },

  nriReturnDrivers: {
    label: "Personal Reasons & Return Drivers",
    description: "The Reasons Are Personal, The Planning Is Financial: 6 icon motivation cards.",
    icon: "HeartHandshake",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("paragraph1", "Opening Paragraph", 400),
      textarea("paragraph2", "Secondary Paragraph", 400),
      image("sideImage", "Side Feature Image"),
      list("drivers", "Return Driver Cards", "Driver", 8, [
        icon("icon", "Icon"),
        text("title", "Driver Title", 60),
        textarea("text", "Short Description", 200),
      ]),
    ],
  },

  nriWhoWeHelp: {
    label: "Professionals at US Companies",
    description: "Target profiles: leaving employer, moving to India office, US citizen / Green Card, concentrated stock.",
    icon: "Briefcase",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("description", "Introductory Description", 500),
      list("cards", "Profile Cards", "Profile", 6, [
        image("image", "Card Image"),
        text("title", "Profile Title", 80),
        textarea("text", "Situation Description", 400),
      ]),
    ],
  },

  nriFounderStory: {
    label: "Founder Journey & Credentials",
    description: "Founder's 9-year US experience, personal return journey, CA/CPA/CFA credentials and team link.",
    icon: "Award",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      image("founderImage", "Founder Portrait"),
      text("founderName", "Founder Name", 60),
      text("founderRole", "Founder Role / Designation", 80),
      text("heading", "Heading", 120),
      paragraphs("paragraphs", "Journey Paragraphs", 6, 800),
      list("credentials", "Professional Credentials", "Credential", 6, [
        text("title", "Credential Title", 30),
        text("detail", "Detail / Country", 40),
      ]),
      link("teamLink", "Meet the Team Link"),
    ],
  },

  nriRnorWindow: {
    label: "RNOR Golden Window Transition",
    description: "RNOR transition benefits, key tax exemptions, strategic window explanation and callout.",
    icon: "Sparkles",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("leadText", "Lead Introductory Text", 400),
      image("sideImage", "Feature Image"),
      tags("points", "RNOR Key Benefits", 8, 150),
      paragraphs("paragraphs", "Strategic Commentary Paragraphs", 6, 800),
      text("focusLabel", "Callout Label", 40),
      textarea("focusText", "Callout Message", 300),
    ],
  },

  nriFinancialDecisions: {
    label: "Ten Decisions That Shape Your Wealth",
    description: "Interactive 10 crucial financial decisions from move date and RSU vests to US assets and India portfolio.",
    icon: "Compass",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("decisions", "Decisions List", "Decision", 12, [
        text("num", "Number (e.g. 01)", 10),
        icon("icon", "Icon"),
        text("title", "Decision Title", 80),
        textarea("text", "Decision Explanation", 400),
      ]),
    ],
  },

  nriTimelineRoadmap: {
    label: "Planning Timeline & Roadmap",
    description: "Start 6 to 12 Months Before You Move (3 stages) and Your Return, Step by Step (5 phases).",
    icon: "Clock",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("stagesHeading", "Planning Stages Heading", 120),
      image("bgImage", "Stages Background Image"),
      list("stages", "Planning Timeframes", "Stage", 5, [
        text("period", "Time Period", 60),
        textarea("text", "Guidance", 300),
      ]),
      text("stagesFootnote", "Stages Footnote Note", 200),
      text("stepsHeading", "Step-by-Step Heading", 120),
      list("steps", "Roadmap Steps", "Step", 8, [
        text("stage", "Timeline Phase", 80),
        textarea("text", "Action Details", 400),
      ]),
    ],
  },

  nriValuePoints: {
    label: "Small Decisions, Big Difference",
    description: "7 high-impact financial decisions: RNOR window, RSU vesting, concentrated stock, 401(k), family structuring, forex.",
    icon: "TrendingUp",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("description", "Introductory Text", 400),
      list("points", "Value Point Cards", "Point", 10, [
        text("text", "Impact Description", 150),
        icon("icon", "Icon"),
        image("image", "Card Background Image"),
      ]),
    ],
  },

  nriCrossBorderAssets: {
    label: "Cross-Border Assets & US Tax",
    description: "What Happens to US Assets, Your US Tax Life After Airport, and Rebuilding an India Financial Plan.",
    icon: "Building2",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("block1Heading", "Block 1 Heading (US Assets)", 120),
      textarea("block1Intro", "Block 1 Introduction", 300),
      list("block1Items", "US Assets Breakdown", "Asset", 8, [
        text("label", "Asset Name", 60),
        text("detail", "Strategic Treatment", 120),
      ]),
      textarea("block1Conclusion", "Block 1 Conclusion", 300),
      image("block1Image", "Block 1 Image"),
      text("block2Heading", "Block 2 Heading (US Tax Life)", 120),
      tags("block2Items", "US Tax Considerations", 8, 180),
      textarea("block2Conclusion", "Block 2 Conclusion", 300),
      image("block2Image", "Block 2 Image"),
      text("block3Heading", "Block 3 Heading (New Country Plan)", 120),
      paragraphs("block3Paragraphs", "Block 3 Paragraphs", 4, 800),
      image("block3Image", "Block 3 Image"),
    ],
  },

  nriDeliverables: {
    label: "What You Receive (Deliverables)",
    description: "9 written plan deliverables prepared by CA, CPA and CFA team with interactive card carousel.",
    icon: "ListChecks",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("subtitle", "Sub-heading / Intro", 300),
      image("bgImage", "Background Image"),
      list("deliverables", "Deliverable Cards", "Deliverable", 12, [
        text("num", "Number (e.g. 01)", 10),
        text("title", "Plan Title", 80),
        text("desc", "Description", 150),
      ]),
      textarea("footerText", "Footer Follow-through Note", 300),
      link("button", "Call to Action Button"),
    ],
  },

  nriWhyChoose: {
    label: "One Trusted Adviser (Why Choose)",
    description: "Why Neuron Wealth: We have lived it lead card + 6 advisory principles with vertical timeline.",
    icon: "ShieldCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      image("founderImage", "Founder Photo"),
      text("leadCardNum", "Lead Card Number", 10),
      text("leadCardTitle", "Lead Card Title", 80),
      textarea("leadCardText", "Lead Card Text", 300),
      list("reasons", "Advisory Principles", "Reason", 8, [
        icon("icon", "Icon"),
        text("title", "Principle Title", 80),
        textarea("text", "Principle Text", 300),
      ]),
    ],
  },

  nriFamilyStory: {
    label: "Family Journey Case Study",
    description: "A Family We Helped: 3-stage case study from Seattle tech career to 9 months prep and Hyderabad settlement.",
    icon: "UsersRound",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("disclaimerBadge", "Illustration Badge", 100),
      list("phases", "Journey Phases", "Phase", 4, [
        text("title", "Phase Title / Location", 60),
        image("image", "Phase Image"),
        text("badge", "Location / Stage Badge", 40),
        textarea("text", "Phase Narrative", 400),
        tags("bulletPoints", "Actions Taken (Middle Card)", 8, 180),
      ]),
      text("footNote", "Closing Disclaimer Footnote", 200),
    ],
  },

  nriFaqsClosing: {
    label: "FAQs & Closing CTA",
    description: "10 returning NRI FAQs, final consultation booking CTA banner, and SEBI regulatory disclaimer.",
    icon: "CircleDot",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("faqHeading", "FAQ Heading", 120),
      link("contactLink", "Contact Link"),
      list("faqs", "Questions & Answers", "FAQ", 16, [
        text("q", "Question", 200),
        textarea("a", "Answer", 800),
      ]),
      text("closingHeading", "Closing CTA Headline", 120),
      textarea("closingText", "Closing CTA Body", 400),
      link("primaryButton", "Primary Action Button"),
      link("secondaryButton", "Secondary Action Button"),
      textarea("disclaimer", "Regulatory Disclaimer", 600),
    ],
  },

  // --- Global Indians Sections ---
  globalIndiansHero: {
    label: "Global Indians Hero Banner",
    description: "Hero banner with headline, dual taxation intro, CTA buttons, and trust strip.",
    icon: "Globe",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow Tag", 100),
      text("title", "Hero Title Line 1", 100),
      text("titleHighlight", "Highlighted Title Line 2", 100),
      textarea("description", "Description Paragraph", 600),
      image("bgImage", "Background Image"),
      link("primaryButton", "Primary Action Button"),
      link("secondaryButton", "Secondary Action Button"),
      list("trustItems", "Trust Strip Items", "Statement", 6, [text("text", "Trust Statement", 100)]),
    ],
  },

  globalIndiansWhatYouKeep: {
    label: "What Matters Is What You Keep",
    description: "Return leak warning, side feature photo, and 5 quiet choices.",
    icon: "Layers",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      image("sideImage", "Feature Image"),
      textarea("calloutBadge", "Floating Quote Badge", 200),
      textarea("introText", "Introductory Paragraph", 400),
      list("choices", "Quiet Choices", "Choice", 8, [text("num", "Number (e.g. 01)", 10), text("text", "Choice Statement", 150)]),
      textarea("conclusionText", "Conclusion Paragraph", 400),
    ],
  },

  globalIndiansApproach: {
    label: "Three Guiding Questions (Approach)",
    description: "Better returns after tax, right level of risk, and fully compliant.",
    icon: "Scale",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      image("bgImage", "Parallax Background Image"),
      list("pillars", "Guiding Principles", "Pillar", 5, [
        icon("icon", "Icon"),
        text("title", "Pillar Title", 80),
        textarea("text", "Pillar Description", 300),
      ]),
    ],
  },

  globalIndiansFamiliar: {
    label: "Does This Sound Familiar? (Client Voices)",
    description: "6 familiar situation quotes and urgent help callout banner.",
    icon: "Quote",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("quotes", "Client Quotes", "Quote", 8, [textarea("quote", "Quote Text", 300)]),
      textarea("bannerText", "Callout Banner Text", 400),
      text("bannerHighlight", "Banner Highlight Word", 40),
    ],
  },

  globalIndiansWhoWeWorkWith: {
    label: "Who We Work With",
    description: "5 profile cards for NRIs on H1B/L1, Green Card holders, OCIs, global families, and HNWIs.",
    icon: "Users",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("subtitleNote", "Subtitle Note", 200),
      list("profiles", "Target Profiles", "Profile", 8, [
        icon("icon", "Icon"),
        text("text", "Profile Description", 150),
        image("image", "Profile Background Image"),
      ]),
    ],
  },

  globalIndiansWhyDifferent: {
    label: "Why Investing in India Is Different",
    description: "Two sets of rules comparison, US tax airport photo, and 3 warning cards (PFIC, NRE tax, property sales).",
    icon: "TriangleAlert",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("subheading", "Sub-heading", 100),
      textarea("box1Text", "Box 1 Text (India Rules)", 200),
      textarea("box2Text", "Box 2 Text (Home Country Rules)", 200),
      image("bannerBgImage", "Callout Background Image"),
      text("bannerHeading", "Callout Banner Headline", 150),
      list("points", "Costly Investment Traps", "Point", 6, [textarea("point", "Warning Text", 300)]),
      textarea("footerNote", "Summary Footnote", 400),
    ],
  },

  globalIndiansHowWeHelp: {
    label: "How We Help (Stacking Cards)",
    description: "6 stacking advisory areas from investment advice and structures to cross-border tax, money transfer, and property.",
    icon: "Briefcase",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("services", "Advisory Areas", "Area", 8, [
        text("num", "Number (e.g. 01)", 10),
        icon("icon", "Icon"),
        text("title", "Area Title", 100),
        paragraphs("text", "Area Paragraphs", 4, 600),
        image("image", "Feature Image"),
      ]),
    ],
  },

  globalIndiansWhyChoose: {
    label: "Why Families Choose Neuron Wealth",
    description: "6 Bento grid tiles covering investment advisers first, tax built-in, lived it, fee only, in your name, plain language.",
    icon: "ShieldCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("tiles", "Bento Grid Tiles", "Tile", 8, [
        icon("icon", "Icon"),
        text("title", "Tile Title", 80),
        textarea("text", "Tile Text", 300),
        image("image", "Optional Background Image"),
      ]),
    ],
  },

  globalIndiansHowWeWork: {
    label: "How We Work (Process Steps)",
    description: "4-step process: First conversation, Understanding you, Investment plan, Putting it in place.",
    icon: "Check",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("steps", "Process Steps", "Step", 6, [
        text("num", "Step Number (e.g. 01)", 10),
        text("title", "Step Title", 80),
        textarea("text", "Step Description", 300),
        image("image", "Step Photo"),
      ]),
    ],
  },

  globalIndiansFamilyStory: {
    label: "Family Journey Case Study",
    description: "Rahul & Priya California OCI case study: mutual funds exit, flat sale, unified report.",
    icon: "HeartHandshake",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("disclaimerBadge", "Illustration Badge", 100),
      image("sideImage", "Family Consultation Photo"),
      paragraphs("paragraphs", "Story Paragraphs", 6, 800),
      text("highlightText", "Green Callout Quote", 250),
      text("footnote", "Footnote Disclaimer", 150),
    ],
  },

  globalIndiansFaqsClosing: {
    label: "FAQs & Closing CTA",
    description: "8 Global Indian FAQs, final consultation booking CTA banner, and SEBI regulatory disclaimer.",
    icon: "CircleDot",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("faqHeading", "FAQ Heading", 120),
      link("contactLink", "Contact Link"),
      list("faqs", "Questions & Answers", "FAQ", 16, [
        text("q", "Question", 200),
        textarea("a", "Answer", 800),
      ]),
      text("closingHeading", "Closing CTA Headline", 120),
      textarea("closingText", "Closing CTA Body", 400),
      link("primaryButton", "Primary Action Button"),
      link("secondaryButton", "Secondary Action Button"),
      textarea("disclaimer", "Regulatory Disclaimer", 600),
    ],
  },

  // --- Global Citizens in India Sections ---
  globalCitizensHero: {
    label: "Global Citizens Hero Banner",
    description: "Hero banner with headline, dual taxation intro, CTA buttons, and trust strip.",
    icon: "Globe",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("eyebrow", "Eyebrow Tag", 100),
      text("title", "Hero Title Line 1", 100),
      text("titleHighlight", "Highlighted Title Line 2", 100),
      paragraphs("paragraphs", "Description Paragraphs", 4, 600),
      image("bgImage", "Background Image"),
      link("primaryButton", "Primary Action Button"),
      link("secondaryButton", "Secondary Action Button"),
      list("trustItems", "Trust Strip Items", "Statement", 6, [text("text", "Trust Statement", 100)]),
    ],
  },

  globalCitizensFamiliar: {
    label: "Does This Sound Familiar? (Dilemmas)",
    description: "Editorial quote list of common cross-border dilemmas and intro note.",
    icon: "Quote",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("subtitle", "Side Note Subtitle", 300),
      list("quotes", "Client Dilemma Quotes", "Quote", 10, [textarea("quote", "Quote Text", 300)]),
    ],
  },

  globalCitizensStatus: {
    label: "You May Not Be an NRI Anymore (Status)",
    description: "Strikethrough graphic, residency laws, and foreign asset penalty callout.",
    icon: "Landmark",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("description", "Status Description", 400),
      text("strikeFrom", "Strikethrough Label", 20),
      text("strikeTo", "New Status Label", 20),
      text("calloutQuote", "Green Callout Quote", 200),
      list("laws", "Governing Laws", "Law", 4, [icon("icon", "Icon"), text("title", "Law Title", 80), textarea("text", "Law Description", 400)]),
      textarea("warningBox", "Warning Alert Text", 400),
    ],
  },

  globalCitizensHomeTax: {
    label: "Does Your Home Country Still Tax You?",
    description: "Passport-based taxation rules: US citizens, Other countries, and Everyone.",
    icon: "Flag",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("subheading", "Sub-heading", 100),
      list("cards", "Tax Rules by Passport", "Rule", 5, [icon("icon", "Icon"), text("title", "Category Title", 80), textarea("text", "Tax Details", 500)]),
    ],
  },

  globalCitizensTaxFree: {
    label: "Tax Free in India Trap",
    description: "Indian vs home country tax mismatches and Keep After-Tax conclusion card.",
    icon: "PiggyBank",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("introText", "Introductory Paragraph", 300),
      list("examples", "Tax Mismatch Examples", "Example", 8, [icon("icon", "Icon"), textarea("text", "Example Description", 300)]),
      image("conclusionImage", "Conclusion Background Image"),
      textarea("conclusionText", "Conclusion Paragraph", 300),
      text("conclusionHighlight", "Conclusion Highlight Text", 150),
    ],
  },

  globalCitizensShareTax: {
    label: "How Two Countries Share Your Tax",
    description: "Interactive DTAA sharing rules carousel with country flags graphic and treaty note.",
    icon: "ArrowLeftRight",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      textarea("description", "DTAA Description", 400),
      list("rules", "Tax Sharing Rules", "Rule", 8, [text("title", "Rule Title", 80), textarea("text", "Rule Explanation", 300), image("image", "Rule Photo")]),
      textarea("footnote", "Treaty Summary Note", 300),
    ],
  },

  globalCitizensReport: {
    label: "What You Report, and Where",
    description: "Three-column layout: In India ledger, middle photo card, and Home country ledger.",
    icon: "FileText",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("indiaHeading", "India Ledger Heading", 80),
      list("indiaItems", "India Reporting Items", "Item", 6, [text("text", "Report Item", 150)]),
      image("centerImage", "Center Feature Photo"),
      textarea("centerText", "Center Card Caption", 300),
      text("homeHeading", "Home Country Heading", 80),
      text("homeSubheading", "Home Country Sub-heading", 100),
      text("usLabel", "US Taxpayers Label", 50),
      textarea("usText", "US Reporting Requirements", 300),
      text("otherLabel", "Other Citizens Label", 50),
      textarea("otherText", "Other Citizens Requirements", 300),
    ],
  },

  globalCitizensInvest: {
    label: "What You Can Invest In, and What You Should",
    description: "FEMA allows vs What works for you, plus 3-step check question flow.",
    icon: "BadgeCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("femaTitle", "FEMA Box Title", 80),
      textarea("femaText", "FEMA Box Description", 400),
      text("worksTitle", "What Works Box Title", 80),
      textarea("worksText", "What Works Description", 400),
      text("checkTitle", "Check Section Title", 80),
      text("checkSubtitle", "Check Section Subtitle", 150),
      list("questions", "Investment Screening Questions", "Question", 6, [text("question", "Screening Question", 150)]),
      text("conclusionNote", "Bottom Note", 150),
    ],
  },

  globalCitizensWhoWeHelp: {
    label: "Who We Help (Global Citizens)",
    description: "Side feature photo, checklist of client profiles, and US CPA expertise note.",
    icon: "Users",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      image("sideImage", "Feature Image"),
      list("profiles", "Target Profiles", "Profile", 8, [icon("icon", "Icon"), text("text", "Profile Description", 150)]),
      textarea("footnote", "Cross-Border CPA Note", 400),
    ],
  },

  globalCitizensHowWeHelp: {
    label: "How We Help (6 Advisory Areas)",
    description: "6 numbered editorial index rows covering two tax systems, status, legacy cleanup, and assets abroad.",
    icon: "Briefcase",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("services", "Advisory Services", "Service", 8, [
        icon("icon", "Icon"),
        text("title", "Service Title", 100),
        textarea("text", "Service Description", 500),
      ]),
    ],
  },

  globalCitizensPlan: {
    label: "Your Global Citizen Plan (Tiles)",
    description: "7 written plan components with photos and green closing implementation tile.",
    icon: "Receipt",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("subtitle", "Section Subtitle", 150),
      list("planItems", "Plan Components", "Component", 8, [
        icon("icon", "Icon"),
        text("title", "Component Title", 80),
        textarea("text", "Component Description", 300),
        image("image", "Component Photo"),
      ]),
      textarea("closingTileText", "Closing Tile Note", 300),
    ],
  },

  globalCitizensWhyChoose: {
    label: "Why Choose Neuron Wealth (Citizens)",
    description: "6 open feature tiles on soft blue background covering fiduciary cross-border strengths.",
    icon: "ShieldCheck",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      list("tiles", "Feature Tiles", "Feature", 8, [
        icon("icon", "Icon"),
        text("title", "Feature Title", 80),
        textarea("text", "Feature Description", 300),
      ]),
    ],
  },

  globalCitizensHowWeWork: {
    label: "How We Work (4 Outline Steps)",
    description: "Parallax dark background and 4 process steps with large outlined numerals.",
    icon: "Check",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      image("bgImage", "Background Image"),
      list("steps", "Process Steps", "Step", 6, [
        text("title", "Step Title", 80),
        textarea("text", "Step Description", 300),
      ]),
    ],
  },

  globalCitizensStories: {
    label: "Families We Helped (Client Stories)",
    description: "Pune US citizen and Bengaluru UK citizen case study cards with pin icons.",
    icon: "HeartHandshake",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("heading", "Section Heading", 120),
      text("disclaimerBadge", "Illustration Note", 100),
      list("stories", "Client Stories", "Story", 4, [
        text("title", "Story Headline / Location", 80),
        textarea("text", "Case Study Details", 800),
      ]),
      text("footnote", "Footnote Disclaimer", 150),
    ],
  },

  globalCitizensFaqsClosing: {
    label: "Citizens FAQs & Closing CTA",
    description: "8 Global Citizen FAQs, closing consultation booking CTA banner, and SEBI regulatory disclaimer.",
    icon: "CircleDot",
    design: ["background", "backgroundColor", "spacing", "anchor"],
    fields: [
      text("faqHeading", "FAQ Heading", 120),
      list("faqs", "Questions & Answers", "FAQ", 16, [
        text("q", "Question", 200),
        textarea("a", "Answer", 800),
      ]),
      text("closingHeading", "Closing CTA Headline", 120),
      textarea("closingText", "Closing CTA Body", 400),
      link("primaryButton", "Primary Action Button"),
      link("secondaryButton", "Secondary Action Button"),
      textarea("disclaimer", "Regulatory Disclaimer", 600),
    ],
  },

  // ==========================================
  // Global Investors Sections
  // ==========================================
  investorHero: {
    label: "Global Investors Hero Banner",
    description: "Opening banner with headline, intro paragraphs, buttons and the trust card.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 140),
      text("title", "Title", 120),
      text("titleHighlight", "Highlighted Title (Italic)", 120),
      paragraphs("paragraphs", "Intro Paragraphs", 4, 800),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      image("backgroundImage", "Background Image"),
      tags("trustItems", "Trust Card Items", 8, 120),
    ],
  },
  investorReasons: {
    label: "Why Families Invest Abroad",
    description: "Photo tile with heading beside the reason cards.",
    icon: "Globe",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Text", 400),
      image("image", "Photo"),
      list("reasons", "Reasons", "Reason", 8, [icon(), text("title", "Title", 120), textarea("text", "Text", 500)]),
    ],
  },
  investorFamiliar: {
    label: "Does This Sound Familiar (Questions)",
    description: "Heading and intro above client question cards, ending with a call-to-action tile.",
    icon: "MessageCircle",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Intro", 400),
      tags("quotes", "Client Questions", 12, 300),
      text("ctaText", "Closing Tile Text", 120),
      link("ctaLink", "Closing Tile Link"),
    ],
  },
  investorRules: {
    label: "Investing Abroad Rules",
    description: "Dark section with the rules list and a sticky photo that follows the active rule.",
    icon: "Scale",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Intro", 300),
      list("rules", "Rules", "Rule", 12, [icon(), text("title", "Title", 120), textarea("text", "Text", 700), image("image", "Photo")]),
    ],
  },
  investorKeep: {
    label: "What You Keep",
    description: "Heading, intro and focus note beside the narrowing list of choices.",
    icon: "Wallet",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("subheading", "Subheading", 200),
      textarea("intro", "Intro", 400),
      tags("choices", "Choices", 10, 250),
      textarea("outro", "Closing Text", 400),
      text("focusLabel", "Focus Label (Bold)", 40),
      textarea("focusText", "Focus Text", 400),
    ],
  },
  investorRoutes: {
    label: "Ways to Invest Abroad",
    description: "Three photo route cards with a Suits line.",
    icon: "Route",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Intro", 400),
      text("suitsLabel", "Suits Label", 30),
      list("routes", "Routes", "Route", 6, [
        icon(),
        text("title", "Title", 120),
        textarea("text", "Text", 400),
        textarea("suits", "Suits", 300),
        image("image", "Photo"),
      ]),
      textarea("note", "Note Below Cards", 300),
    ],
  },
  investorIbkr: {
    label: "Interactive Brokers",
    description: "Navy photo panel with statement beside the checklist.",
    icon: "Building2",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Text", 400),
      textarea("statement", "Statement", 300),
      image("image", "Background Photo"),
      text("pointsHeading", "Checklist Heading", 120),
      tags("points", "Checklist Points", 10, 250),
    ],
  },
  investorGift: {
    label: "GIFT City",
    description: "Photo panel with location badge beside numbered reasons and a check callout.",
    icon: "Landmark",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Intro", 500),
      image("image", "Photo"),
      text("badge", "Photo Badge", 60),
      text("panelTitle", "Photo Panel Title", 120),
      textarea("panelText", "Photo Panel Text", 600),
      text("pointsHeading", "Reasons Heading", 120),
      tags("points", "Reasons", 8, 250),
      text("checkTitle", "Callout Title", 120),
      textarea("checkText", "Callout Text", 500),
    ],
  },
  investorGoals: {
    label: "Planning for Your Goals",
    description: "Expanding photo panels, one per goal.",
    icon: "Target",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("goals", "Goals", "Goal", 8, [icon(), text("title", "Title", 120), textarea("text", "Text", 600), image("image", "Photo")]),
    ],
  },
  investorWhoWeHelp: {
    label: "Who We Help (List)",
    description: "Icon list beside a photo.",
    icon: "Users",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("items", "People We Help", "Person", 10, [icon(), textarea("text", "Text", 300)]),
      image("image", "Photo"),
    ],
  },
  investorHowWeHelp: {
    label: "How We Help (Scrolling Cards)",
    description: "Pinned photo backdrop with cards that slide sideways while scrolling.",
    icon: "Layers",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      image("backgroundImage", "Background Photo"),
      list("items", "Services", "Service", 10, [icon(), text("title", "Title", 120), textarea("text", "Text", 600)]),
    ],
  },
  investorPlan: {
    label: "Your Global Investor Plan",
    description: "Sticky plan card that ticks off items as they scroll past.",
    icon: "FileText",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("intro", "Intro", 300),
      text("cardTitle", "Plan Card Title", 120),
      list("items", "Plan Items", "Item", 12, [text("title", "Title", 120), textarea("text", "Text", 400)]),
      textarea("closing", "Closing Card Text", 400),
    ],
  },
  investorWhyChoose: {
    label: "Why Choose (Columns)",
    description: "Dark section with three parallax columns of reasons.",
    icon: "Award",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("items", "Reasons", "Reason", 12, [icon(), text("title", "Title", 120), textarea("text", "Text", 400)]),
    ],
  },
  investorHowWeWork: {
    label: "How We Work (Timeline)",
    description: "Sticky heading beside a vertical numbered timeline.",
    icon: "Workflow",
    design: ["anchor"],
    fields: [text("heading", "Heading", 120), list("steps", "Steps", "Step", 8, [text("title", "Title", 120), textarea("text", "Text", 400)])],
  },
  investorStories: {
    label: "Families We Helped (Fixed Backdrop)",
    description: "Story cards over a fixed photo backdrop.",
    icon: "BookOpen",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("note", "Note Under Heading", 200),
      image("backgroundImage", "Background Photo"),
      list("stories", "Stories", "Story", 6, [text("title", "Title", 120), textarea("text", "Story", 1500)]),
      text("disclaimer", "Footnote", 200),
    ],
  },
  investorFaqsClosing: {
    label: "FAQs, Closing CTA & Disclaimer",
    description: "FAQ accordion, closing call to action and the disclaimer.",
    icon: "CircleHelp",
    design: ["anchor"],
    fields: [
      text("faqHeading", "FAQ Heading", 120),
      link("contactLink", "Link Under FAQ Heading"),
      list("faqs", "Questions & Answers", "FAQ", 20, [text("q", "Question", 200), textarea("a", "Answer", 1000)]),
      text("closingTitle", "Closing Heading", 160),
      textarea("closingText", "Closing Text", 600),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      paragraphs("disclaimerText", "Disclaimer Paragraphs", 4, 800),
    ],
  },

  // ==========================================
  // Founders & Entrepreneurs Sections
  // ==========================================
  foundersHero: {
    label: "Founders Hero Banner",
    description: "Opening banner with headline, intro paragraphs, buttons and trust row.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 140),
      text("title", "Title", 120),
      text("titleHighlight", "Highlighted Title (Italic)", 120),
      paragraphs("paragraphs", "Intro Paragraphs", 4, 800),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      image("backgroundImage", "Background Image"),
      tags("trustItems", "Trust Row Items", 8, 120),
    ],
  },
  foundersFamiliar: {
    label: "Does This Sound Familiar (Notes)",
    description: "Pinned notes with founder quotes and a closing line.",
    icon: "MessageCircle",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      tags("quotes", "Founder Quotes", 12, 300),
      text("lead", "Closing Lead", 200),
      textarea("text", "Closing Text", 400),
    ],
  },
  foundersExposed: {
    label: "Rich on Paper, Exposed in Real Life",
    description: "On paper versus real life split with a closing statement.",
    icon: "Scale",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("headingHighlight", "Highlighted Heading (Green)", 120),
      textarea("intro", "Intro", 400),
      text("paperLabel", "On Paper Label", 40),
      text("paperValue", "On Paper Word", 40),
      text("realLabel", "Real Life Label", 40),
      image("image", "Real Life Background Photo"),
      list("items", "Real Life Points", "Point", 8, [icon(), textarea("text", "Text", 300)]),
      text("closingLead", "Closing Statement", 160),
      text("closingHighlight", "Closing Statement Highlight", 160),
      textarea("closingText", "Closing Text", 300),
    ],
  },
  foundersBalanceSheets: {
    label: "Two Balance Sheets",
    description: "Business and family cards with a wall between them.",
    icon: "Building2",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("intro", "Intro", 300),
      textarea("businessText", "Business Card Text", 300),
      textarea("familyText", "Family Card Text", 300),
      text("summaryLead", "Summary Lead (Bold)", 160),
      textarea("summaryText", "Summary Text", 600),
    ],
  },
  foundersWhoWeHelp: {
    label: "Who We Help (Panels)",
    description: "Expanding photo panels, a note and a link card.",
    icon: "Users",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("personas", "People We Help", "Person", 8, [icon(), text("title", "Title", 120), textarea("text", "Text", 500), image("image", "Photo")]),
      textarea("note", "Note", 400),
      link("link", "Link Card", { hint: "The label is shown as the card text." }),
    ],
  },
  foundersStages: {
    label: "With You at Every Stage",
    description: "Founder journey timeline with alternating stage cards.",
    icon: "Flag",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("stageLabel", "Stage Label", 30),
      list("stages", "Stages", "Stage", 8, [icon(), text("title", "Title", 120), textarea("text", "Text", 500)]),
    ],
  },
  foundersLegacy: {
    label: "Build a Legacy",
    description: "Family photo and story, a centre circle with legacy pillars and a note.",
    icon: "Landmark",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("subheading", "Subheading", 300),
      textarea("text", "Text", 800),
      image("image", "Photo"),
      text("centerText", "Centre Circle Text", 120),
      list("items", "Legacy Pillars", "Pillar", 8, [icon(), text("title", "Title", 120), textarea("text", "Text", 400)]),
      textarea("note", "Note", 400),
    ],
  },
  foundersKeep: {
    label: "What You Keep (Approach)",
    description: "Photo statement with three boxed approach cards.",
    icon: "Wallet",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("lead", "Lead", 200),
      text("leadHighlight", "Lead Highlight (Green)", 200),
      textarea("text", "Text", 500),
      image("image", "Background Photo"),
      text("approachHeading", "Approach Heading", 120),
      list("items", "Approach Cards", "Card", 6, [icon(), text("title", "Title", 120), textarea("text", "Text", 400)]),
    ],
  },
  foundersHowWeHelp: {
    label: "How We Help (Stacking Cards)",
    description: "Image cards that stack while scrolling.",
    icon: "Layers",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("items", "Services", "Service", 12, [icon(), text("title", "Title", 120), textarea("text", "Text", 600), image("image", "Photo")]),
    ],
  },
  foundersSoundingBoard: {
    label: "Your Sounding Board (Founders)",
    description: "Sticky photo panel with a numbered call list and coaching modes.",
    icon: "PhoneCall",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Text", 400),
      text("callout", "Callout", 160),
      image("image", "Photo"),
      tags("decisions", "Decisions", 12, 200),
      list("modes", "Coaching Modes", "Mode", 4, [icon(), textarea("text", "Text", 200)]),
      text("closing", "Closing Line", 160),
    ],
  },
  foundersDeliverables: {
    label: "Your Family CFO Service (Founders)",
    description: "Deliverable photo tiles and the stay with you band.",
    icon: "FileCheck",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("receiveHeading", "Deliverables Heading", 120),
      list("items", "Deliverables", "Deliverable", 10, [text("title", "Title", 120), textarea("text", "Text", 300), image("image", "Photo")]),
      text("stayHeading", "Ongoing Care Heading", 120),
      image("stayImage", "Ongoing Care Background Photo"),
      list("stayItems", "Ongoing Care Points", "Point", 6, [icon(), textarea("text", "Text", 300)]),
    ],
  },
  foundersWhyChoose: {
    label: "Why Founders Choose",
    description: "Sticky photo panel with reasons list.",
    icon: "Award",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      image("image", "Photo"),
      list("items", "Reasons", "Reason", 10, [icon(), text("title", "Title", 120), textarea("text", "Text", 400)]),
    ],
  },
  foundersHowWeWork: {
    label: "How We Work (Staircase)",
    description: "Rising staircase of steps.",
    icon: "Workflow",
    design: ["anchor"],
    fields: [text("heading", "Heading", 120), list("steps", "Steps", "Step", 4, [text("title", "Title", 120), textarea("text", "Text", 400)])],
  },
  foundersStories: {
    label: "Families We Helped (Split Cards)",
    description: "Photo and story split cards.",
    icon: "BookOpen",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("note", "Note Under Heading", 200),
      list("stories", "Stories", "Story", 6, [icon(), image("image", "Photo"), text("title", "Title", 120), textarea("text", "Story", 1500)]),
      text("disclaimer", "Footnote", 200),
    ],
  },
  foundersFaqsClosing: {
    label: "FAQs, Closing CTA & Disclaimer",
    description: "FAQ accordion, closing call to action and the disclaimer.",
    icon: "CircleHelp",
    design: ["anchor"],
    fields: [
      text("faqHeading", "FAQ Heading", 120),
      link("contactLink", "Link Under FAQ Heading"),
      list("faqs", "Questions & Answers", "FAQ", 20, [text("q", "Question", 200), textarea("a", "Answer", 1000)]),
      text("closingTitle", "Closing Heading", 160),
      textarea("closingText", "Closing Text", 600),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      paragraphs("disclaimerText", "Disclaimer Paragraphs", 4, 800),
    ],
  },

  // ==========================================
  // Professionals & CXOs Sections
  // ==========================================
  cxoHero: {
    label: "Professionals Hero Banner",
    description: "Navy text panel with a full height photo and trust list.",
    icon: "Sparkles",
    design: ["anchor"],
    fields: [
      text("eyebrow", "Eyebrow", 140),
      text("title", "Title", 120),
      text("titleHighlight", "Highlighted Title (Green, New Line)", 120),
      paragraphs("paragraphs", "Intro Paragraphs", 4, 800),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      image("image", "Photo"),
      tags("trustItems", "Trust List Items", 8, 120),
    ],
  },
  cxoFamiliar: {
    label: "Does This Sound Familiar (Strips)",
    description: "Quote strips beside a photo.",
    icon: "MessageCircle",
    design: ["anchor"],
    fields: [text("heading", "Heading", 120), textarea("text", "Intro", 400), image("image", "Photo"), tags("quotes", "Quotes", 12, 300)],
  },
  cxoDrift: {
    label: "The Hidden Cost of Being Busy",
    description: "Drifting list with a green banner.",
    icon: "Clock",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("subheading", "Subheading", 200),
      textarea("text", "Text", 400),
      tags("items", "Drift Points", 8, 200),
      textarea("banner", "Green Banner", 300),
    ],
  },
  cxoFamilyCfo: {
    label: "Your Family CFO (Org Chart)",
    description: "One trusted team linked to every money role.",
    icon: "Users",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      textarea("text", "Intro", 400),
      text("lead", "Lead Line", 200),
      text("teamLine", "Team Line Start", 80),
      text("teamLineHighlight", "Team Line Highlight", 80),
      text("teamLineEnd", "Team Line End", 80),
      list("roles", "Roles", "Role", 12, [icon(), text("title", "Title", 120), textarea("text", "Text", 300), image("image", "Photo")]),
    ],
  },
  cxoWhoWeHelp: {
    label: "Who We Help (Tabs)",
    description: "Persona tabs with photo panels, a note, a quote and a link card.",
    icon: "Users",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("personas", "People We Help", "Person", 8, [icon(), text("title", "Title", 120), textarea("text", "Text", 500), image("image", "Photo")]),
      textarea("note", "Note", 300),
      textarea("quote", "Quote", 300),
      link("link", "Link Card", { hint: "The label is shown as the card text." }),
    ],
  },
  cxoEarning: {
    label: "Earning vs Creating Wealth",
    description: "Fixed skyline backdrop with converging cards and the three part approach.",
    icon: "Sprout",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      image("backgroundImage", "Background Photo"),
      text("earnTitle", "Earning Card Title (Bold)", 60),
      textarea("earnText", "Earning Card Text", 300),
      text("createTitle", "Creating Card Title (Bold)", 60),
      textarea("createText", "Creating Card Text", 400),
      textarea("summary", "Summary", 400),
      text("approachHeading", "Approach Heading", 120),
      list("approach", "Approach Points", "Point", 3, [text("title", "Title", 120), textarea("text", "Text", 300)]),
    ],
  },
  cxoHowWeHelp: {
    label: "How We Help (Bento)",
    description: "Featured service tile followed by photo service cards.",
    icon: "Layers",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("services", "Services", "Service", 12, [icon(), text("title", "Title", 120), textarea("text", "Text", 700), image("image", "Photo")], {
        hint: "The first service is shown as the large featured tile.",
      }),
    ],
  },
  cxoSoundingBoard: {
    label: "Your Sounding Board (Professionals)",
    description: "Photo beside decision prompts on dark.",
    icon: "Compass",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      image("image", "Photo"),
      textarea("text", "Text", 400),
      text("callout", "Callout", 160),
      tags("decisions", "Decisions", 12, 200),
      textarea("closing", "Closing Text", 400),
    ],
  },
  cxoFreedom: {
    label: "Financial Freedom",
    description: "Photo quote beside a three step path, with two closing notes.",
    icon: "Target",
    design: ["anchor"],
    fields: [
      textarea("quote", "Photo Quote", 300),
      image("image", "Photo"),
      text("heading", "Heading", 120),
      textarea("text", "Intro", 400),
      list("questions", "Questions", "Question", 6, [icon(), text("title", "Title", 120), textarea("text", "Text", 300)]),
      textarea("note", "Navy Note", 400),
      textarea("legacy", "Green Note", 400),
    ],
  },
  cxoDeliverables: {
    label: "Your Family CFO Service (Professionals)",
    description: "Document cards and the stay with you band.",
    icon: "FileCheck",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("receiveHeading", "Deliverables Heading", 120),
      list("items", "Deliverables", "Deliverable", 10, [text("title", "Title", 120), textarea("text", "Text", 300)]),
      text("stayHeading", "Ongoing Care Heading", 120),
      image("stayImage", "Ongoing Care Background Photo"),
      list("stayItems", "Ongoing Care Points", "Point", 6, [icon(), textarea("text", "Text", 300)]),
    ],
  },
  cxoWhyChoose: {
    label: "Why Choose (Scroll Rows)",
    description: "Large titles that light up as they scroll into view.",
    icon: "Award",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      list("items", "Reasons", "Reason", 10, [icon(), text("title", "Title", 120), textarea("text", "Text", 400)]),
    ],
  },
  cxoHowWeWork: {
    label: "How We Work (Chevrons)",
    description: "Four chevron steps.",
    icon: "Workflow",
    design: ["anchor"],
    fields: [text("heading", "Heading", 120), list("steps", "Steps", "Step", 4, [text("title", "Title", 120), textarea("text", "Text", 400)])],
  },
  cxoStories: {
    label: "Families We Helped (Alternating)",
    description: "Alternating photo and story rows.",
    icon: "BookOpen",
    design: ["anchor"],
    fields: [
      text("heading", "Heading", 120),
      text("note", "Note Beside Heading", 200),
      list("stories", "Stories", "Story", 6, [icon(), image("image", "Photo"), text("title", "Title", 120), textarea("text", "Story", 1500)]),
      text("disclaimer", "Footnote", 200),
    ],
  },
  cxoFaqsClosing: {
    label: "FAQs, Closing CTA & Disclaimer",
    description: "FAQ accordion, closing call to action and the disclaimer.",
    icon: "CircleHelp",
    design: ["anchor"],
    fields: [
      text("faqHeading", "FAQ Heading", 120),
      link("contactLink", "Link Under FAQ Heading"),
      list("faqs", "Questions & Answers", "FAQ", 20, [text("q", "Question", 200), textarea("a", "Answer", 1000)]),
      text("closingTitle", "Closing Heading", 160),
      text("closingHighlight", "Closing Heading Highlight", 120),
      textarea("closingText", "Closing Text", 600),
      link("primaryButton", "Primary Button"),
      link("secondaryButton", "Secondary Button"),
      paragraphs("disclaimerText", "Disclaimer Paragraphs", 4, 800),
    ],
  },
};

for (const entry of require("./pages").modules) {
  Object.assign(SECTION_TYPES, entry.sectionTypes || {});
  for (const name of entry.extraIcons || []) if (!PAGE_ICONS.includes(name)) PAGE_ICONS.push(name);
}

const TEMPLATES = {};

module.exports = {
  SECTION_TYPES,
  DESIGN_FIELDS,
  DESIGN_DEFAULTS,
  TEMPLATES,
  CATEGORIES,
  PAGE_ICONS,
  LIMITS,
  IMAGE_RULES,
  DOCUMENT_RULES,
  RESERVED_SLUGS,
  emptyImage,
  emptyLink,
};
