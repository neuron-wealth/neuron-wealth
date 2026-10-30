import { FilePlus2, LayoutDashboard, LayoutTemplate, MessageSquareText, Newspaper } from "lucide-react";
import { RECORD_PAGES } from "../../config/records";

const FORMS_GROUP = "Form Submissions";

export const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: FORMS_GROUP,
    items: RECORD_PAGES.map(({ to, label, icon }) => ({ to, label, icon })),
  },
  {
    label: "Website",
    items: [{ to: "/website/cms", label: "Website CMS", icon: LayoutTemplate, matchPrefix: "/website/" }],
  },
  {
    label: "Blog Management",
    items: [
      {
        to: "/blogs",
        label: "All Blogs",
        icon: Newspaper,
        end: true,
        matchPattern: /^\/blogs\/(?!new$|comments$)[^/]+$/,
        children: [
          { to: "/blogs/new", label: "Add New Blog", icon: FilePlus2, end: true },
          { to: "/blogs/comments", label: "Comments", icon: MessageSquareText, end: true },
        ],
      },
    ],
  },
];

const CMS = { group: "Website CMS", groupTo: "/website/cms" };
const BLOG = { group: "Blog Management", groupTo: "/blogs" };

export const PAGE_TITLES = {
  "/": { title: "Dashboard", group: "Overview" },
  ...Object.fromEntries(RECORD_PAGES.map((page) => [page.to, { title: page.label, group: FORMS_GROUP }])),
  "/website/cms": { title: "Pages", ...CMS },
  "/website/cms/about": { title: "Overview (About Us)", ...CMS },
  "/website/cms/why-associate": { title: "Why Associate with Us", ...CMS },
  "/website/cms/team": { title: "Stakeholders / Team Members", ...CMS },
  "/website/cms/contact": { title: "Contact Us Page", ...CMS },
  "/website/cms/sebi-regulatory-compliance": { title: "SEBI Compliance Disclosure", ...CMS },
  "/website/cms/privacy-policy": { title: "Privacy Policy", ...CMS },
  "/website/cms/website-disclaimer": { title: "Website Disclaimer", ...CMS },
  "/website/cms/refund-policy": { title: "Refund Policy", ...CMS },
  "/website/cms/nri-returning-to-india": { title: "NRIs Returning to India", ...CMS },
  "/website/cms/global-indians": { title: "Global Indians", ...CMS },
  "/website/cms/global-citizens-in-india": { title: "Global Citizens in India", ...CMS },
  "/website/cms/global-investor": { title: "Global Investors", ...CMS },
  "/website/cms/founders-and-entrepreneurs": { title: "Founders & Entrepreneurs", ...CMS },
  "/website/cms/material-information": { title: "Material Information about NWA", ...CMS },
  "/website/cms/code-of-conduct-sebi": { title: "Code of Conduct – SEBI", ...CMS },
  "/website/cms/sebi-investor-charter": { title: "SEBI Investor Charter", ...CMS },
  "/website/cms/grievance-redressal": { title: "Grievance Redressal", ...CMS },
  "/website/cms/functions-of-investment-adviser": { title: "Functions of Investment Adviser", ...CMS },
  "/website/cms/risks": { title: "Risks", ...CMS },
  "/website/cms/conflict-of-interest": { title: "Conflict of Interest", ...CMS },
  "/website/cms/cfa-code-of-conduct": { title: "CFA Code of Conduct", ...CMS },
  "/website/cms/insights": { title: "Knowledge Hub", ...CMS },
  "/website/overview": { title: "Overview (About Us)", ...CMS },
  "/website/header": { title: "Header & Branding", ...CMS },
  "/website/footer": { title: "Footer & Social", ...CMS },
  "/website/branding": { title: "Header & Branding", ...CMS },
  "/website/social": { title: "Footer & Social", ...CMS },
  "/website/accessibility": { title: "Accessibility", ...CMS },
  "/blogs": { title: "All Blogs", ...BLOG },
  "/blogs/new": { title: "Add New Blog", ...BLOG },
  "/blogs/comments": { title: "Comments", ...BLOG },
  "/profile": { title: "My Profile", group: "Account" },
  "/settings": { title: "Settings", group: "Account" },
};

export function pageTitleFor(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/website/cms/")) return { title: "Edit Page", ...CMS };
  if (pathname.startsWith("/blogs/")) return { title: "Edit Blog", ...BLOG };
  return { title: "Admin", group: "Overview" };
}
