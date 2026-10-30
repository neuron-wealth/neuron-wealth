import { Briefcase, Gem, Inbox, MailCheck, PhoneCall } from "lucide-react";

/** Admin screens for website form submissions. `key` matches the API collection, e.g. /api/callbacks. */
export const RECORD_PAGES = [
  {
    key: "enquiries",
    to: "/enquiries",
    label: "Contact Enquiries",
    icon: Inbox,
    color: "#21649A",
    tone: "from-[#21649A] to-[#15344F]",
    emptyTitle: "No contact enquiries yet",
    emptyText: "Messages sent from the Contact Us form will appear here.",
  },
  {
    key: "callbacks",
    to: "/callbacks",
    label: "Call Back Requests",
    icon: PhoneCall,
    color: "#54B848",
    tone: "from-[#2E933C] to-[#15344F]",
    emptyTitle: "No call back requests yet",
    emptyText: "Requests from the Request a Call Back forms on the website will appear here.",
  },
  {
    key: "assessments",
    to: "/assessments",
    label: "Pearl Assessments",
    icon: Gem,
    color: "#B08A4E",
    tone: "from-[#8A6A3B] to-[#15344F]",
    emptyTitle: "No Pearl assessments yet",
    emptyText: "Answers from the Interested in Becoming a Pearl? form will appear here.",
  },
  {
    key: "subscribers",
    to: "/subscribers",
    label: "Newsletter Subscribers",
    icon: MailCheck,
    color: "#2B9CC8",
    tone: "from-[#1D7FA8] to-[#15344F]",
    emptyTitle: "No subscribers yet",
    emptyText: "Email addresses from the Subscribe to Neuron Wealth Connect form in the footer will appear here.",
  },
  {
    key: "careers",
    to: "/careers",
    label: "Career Applications",
    icon: Briefcase,
    color: "#7A68B5",
    tone: "from-[#5B4B8A] to-[#15344F]",
    emptyTitle: "No career applications yet",
    emptyText: "The website has no job application form, so add applications you receive by email with Add Record.",
  },
];

export const RECORD_PAGE_BY_KEY = Object.fromEntries(RECORD_PAGES.map((page) => [page.key, page]));
