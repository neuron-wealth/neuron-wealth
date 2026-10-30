const { text, textarea, link, icon, tags, toggle, select, list, opt } = require("../cmsFields");
const { img, lnk, section, items } = require("../cmsContent");

const ID_HINT = "Used for the sidebar link. Lowercase letters, numbers and hyphens only.";
const PROCESS = "1. Redressal Process";
const MATRIX = "2. Escalation Matrix";
const TIMELINE = "3. Turnaround Timeline";
const SCORES = "4. SEBI SCORES Platform";
const WRO = "5. SEBI Regional Office";
const ODR = "6. Smart ODR Portal";
const PHYSICAL = "7. Physical Complaints";
const SIDEBAR = "Sidebar";

const sectionTypes = {
  grievanceBody: {
    label: "Grievance Redressal Articles & Sidebar",
    description:
      "Redressal process, escalation matrix, turnaround timeline, SEBI SCORES, regional office, Smart ODR and physical complaint articles with a sticky sidebar.",
    icon: "Scale",
    design: ["anchor"],
    fields: [
      text("processId", "Article Anchor ID", 40, { group: PROCESS, hint: ID_HINT }),
      text("processNavLabel", "Sidebar Link Label", 60, { group: PROCESS }),
      { ...icon("processIcon", "Article Icon"), group: PROCESS },
      text("processEyebrow", "Eyebrow", 100, { group: PROCESS }),
      text("processTitle", "Heading", 160, { group: PROCESS }),
      textarea("processText", "Opening Paragraph", 900, { group: PROCESS }),
      text("processLead", "Bold Lead Line", 200, { group: PROCESS }),
      textarea("processContactText", "Contact Paragraph (before email)", 400, { group: PROCESS }),
      link("processEmail", "Contact Email Link", { group: PROCESS }),
      text("processContactMiddle", "Contact Paragraph (between email and phone)", 200, { group: PROCESS }),
      link("processPhone", "Contact Phone Link", { group: PROCESS }),
      text("processContactEnd", "Contact Paragraph (after phone)", 100, { group: PROCESS }),
      textarea("processPostText", "Postal Complaint Line", 300, { group: PROCESS }),
      text("processAddressName", "Postal Address Name", 100, { group: PROCESS }),
      textarea("processAddress", "Postal Address", 300, { group: PROCESS }),
      textarea("processNote", "Closing Note", 400, { group: PROCESS }),

      text("matrixId", "Article Anchor ID", 40, { group: MATRIX, hint: ID_HINT }),
      text("matrixNavLabel", "Sidebar Link Label", 60, { group: MATRIX }),
      text("matrixEyebrow", "Eyebrow", 100, { group: MATRIX }),
      text("matrixTitle", "Heading", 160, { group: MATRIX }),
      text("matrixBadge", "Badge", 60, { group: MATRIX }),
      text("colDesignation", "Column: Designation", 60, { group: MATRIX }),
      text("colName", "Column: Contact Person", 60, { group: MATRIX }),
      text("colAddress", "Column: Address", 60, { group: MATRIX }),
      text("colMobile", "Column: Mobile", 60, { group: MATRIX }),
      text("colEmail", "Column: Email", 60, { group: MATRIX }),
      text("colHours", "Column: Working Hours", 60, { group: MATRIX }),
      list(
        "levels",
        "Escalation Levels",
        "Level",
        8,
        [
          text("level", "Level", 40),
          text("designation", "Designation", 80),
          text("name", "Contact Person Name", 80),
          textarea("address", "Address", 300),
          link("phone", "Mobile (label and tel: link)"),
          link("email", "Email (label and mailto: link)"),
          text("workingHours", "Working Hours", 80),
          toggle("highlight", "Highlight on Mobile"),
        ],
        { titleKey: "designation", group: MATRIX }
      ),

      text("timelineId", "Article Anchor ID", 40, { group: TIMELINE, hint: ID_HINT }),
      text("timelineNavLabel", "Sidebar Link Label", 60, { group: TIMELINE }),
      { ...icon("timelineIcon", "Article Icon"), group: TIMELINE },
      text("timelineTitle", "Heading", 160, { group: TIMELINE }),
      text("timelineTextStart", "Text Before Bold Part", 200, { group: TIMELINE }),
      text("timelineHighlight", "Bold Part", 80, { group: TIMELINE }),
      textarea("timelineTextEnd", "Text After Bold Part", 600, { group: TIMELINE }),

      text("scoresId", "Article Anchor ID", 40, { group: SCORES, hint: ID_HINT }),
      text("scoresNavLabel", "Sidebar Link Label", 60, { group: SCORES }),
      { ...icon("scoresIcon", "Article Icon"), group: SCORES },
      text("scoresEyebrow", "Eyebrow", 100, { group: SCORES }),
      text("scoresTitle", "Heading", 160, { group: SCORES }),
      textarea("scoresText", "Paragraph (before link)", 400, { group: SCORES }),
      link("scoresLink", "Inline SCORES Link", { group: SCORES }),
      text("scoresTextEnd", "Paragraph (after link)", 200, { group: SCORES }),
      textarea("scoresAppText", "Mobile App Line", 300, { group: SCORES }),
      link("scoresWebButton", "Web Portal Button", { group: SCORES }),
      link("scoresAppButton", "Mobile App Button", { group: SCORES }),

      text("wroId", "Article Anchor ID", 40, { group: WRO, hint: ID_HINT }),
      text("wroNavLabel", "Sidebar Link Label", 60, { group: WRO }),
      { ...icon("wroIcon", "Article Icon"), group: WRO },
      text("wroEyebrow", "Eyebrow", 100, { group: WRO }),
      text("wroTitle", "Heading", 160, { group: WRO }),
      textarea("wroText", "Paragraph", 400, { group: WRO }),
      text("wroAddressName", "Address Name", 100, { group: WRO }),
      tags("wroAddressLines", "Address Lines", 8, 120, { group: WRO, hint: "The last line is shown in bold." }),

      text("odrId", "Article Anchor ID", 40, { group: ODR, hint: ID_HINT }),
      text("odrNavLabel", "Sidebar Link Label", 60, { group: ODR }),
      { ...icon("odrIcon", "Article Icon"), group: ODR },
      text("odrEyebrow", "Eyebrow", 100, { group: ODR }),
      text("odrTitle", "Heading", 160, { group: ODR }),
      textarea("odrText", "Paragraph (before link)", 400, { group: ODR }),
      link("odrLink", "Inline Smart ODR Link", { group: ODR }),
      text("odrTextEnd", "Paragraph (after link)", 100, { group: ODR }),
      link("odrButton", "Smart ODR Button", { group: ODR }),

      text("physicalId", "Article Anchor ID", 40, { group: PHYSICAL, hint: ID_HINT }),
      text("physicalNavLabel", "Sidebar Link Label", 60, { group: PHYSICAL }),
      { ...icon("physicalIcon", "Article Icon"), group: PHYSICAL },
      text("physicalEyebrow", "Eyebrow", 100, { group: PHYSICAL }),
      text("physicalTitle", "Heading", 160, { group: PHYSICAL }),
      textarea("physicalText", "Paragraph", 400, { group: PHYSICAL }),
      text("physicalAddressName", "Address Name", 100, { group: PHYSICAL }),
      tags("physicalAddressLines", "Address Lines", 8, 120, { group: PHYSICAL, hint: "The last line is shown in bold." }),

      text("navEyebrow", "Contents Card Eyebrow", 60, { group: SIDEBAR }),
      text("navTitle", "Contents Card Title", 80, { group: SIDEBAR }),
      { ...icon("portalsIcon", "Portals Card Icon"), group: SIDEBAR },
      text("portalsEyebrow", "Portals Card Eyebrow", 60, { group: SIDEBAR }),
      text("portalsTitle", "Portals Card Title", 80, { group: SIDEBAR }),
      list(
        "portals",
        "Portal Links",
        "Portal",
        6,
        [
          link("link", "Link"),
          select("iconStyle", "Trailing Icon", [opt("external", "External link"), opt("app", "Mobile app")]),
        ],
        { group: SIDEBAR }
      ),
      text("contactEyebrow", "Contact Card Eyebrow", 60, { group: SIDEBAR }),
      text("contactTitle", "Contact Card Title", 80, { group: SIDEBAR }),
      text("contactName", "Contact Name", 80, { group: SIDEBAR }),
      link("contactEmail", "Contact Email Link", { group: SIDEBAR }),
      link("contactPhone", "Contact Phone Link", { group: SIDEBAR }),
      text("contactHours", "Contact Working Hours", 80, { group: SIDEBAR }),
    ],
  },
};

const OFFICE_ADDRESS = "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, B/s. Parekhs Hospital, Satellite, Ahmedabad-380015.";

const page = {
  slug: "grievance-redressal",
  title: "Grievance Redressal",
  description:
    "Investor grievance redressal process and escalation matrix of Neuron Wealth Advisors LLP, with SEBI SCORES, regional office and Smart ODR escalation routes.",
  category: "core",
  icon: "Scale",
  status: "published",
  seo: {
    title: "Grievance Redressal | Investor Redressal Mechanism | Neuron Wealth Advisors",
    description:
      "Investor grievance redressal mechanism and escalation matrix at Neuron Wealth Advisors LLP. Contact Customer Care, Compliance Officer, Principal Officer, SEBI SCORES, and Smart ODR.",
  },
  sections: [
    section(
      "grievance-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "Grievance Redressal",
        title: "Grievance",
        highlight: "Redressal",
        text: "Transparent dispute resolution process, structured escalation matrix, and regulatory arbitration pathways ensuring fair, time-bound solutions.",
        image: img("/images/why-us-fiduciary.jpg", "Neuron Wealth Advisors Investor Grievance Redressal"),
      },
      { anchor: "grievance-hero" }
    ),
    section("grievance-content", "grievanceBody", "Redressal Articles & Sidebar", {
      processId: "redressal-process",
      processNavLabel: "Redressal Process",
      processIcon: "Scale",
      processEyebrow: "Investor Grievance Redressal Process",
      processTitle: "Investor Grievance Redressal Process at Neuron Wealth Advisors LLP",
      processText:
        "Client’s queries / complaints may arise due to lack of understanding or a deficiency of service experienced by clients. Deficiency of service may include lack of explanation, clarifications, understanding which escalates into shortfalls in the expected delivery standards, either due to inadequacy of facilities available or through the attitude of staff towards the client.",
      processLead: "Investor grievance redressal process at Neuron Wealth Advisors LLP is as follows:",
      processContactText:
        "Clients can seek clarification of their query and are further entitled to make a complaint in writing, orally or telephonically. An email may be sent to",
      processEmail: lnk("info@neuronwealth.com", "mailto:info@neuronwealth.com"),
      processContactMiddle: ". Alternatively, the Investor may call on",
      processPhone: lnk("+91 90999 42563", "tel:+919099942563"),
      processContactEnd: ".",
      processPostText: "A letter may also be written with the Client query/complaint and posted at the below mentioned address:",
      processAddressName: "Neuron Wealth Advisors LLP",
      processAddress: OFFICE_ADDRESS,
      processNote:
        "The client should first contact the IA using the details on its website or following contact details and escalation matrix:",

      matrixId: "escalation-matrix",
      matrixNavLabel: "Escalation Matrix",
      matrixEyebrow: "Institutional Oversight",
      matrixTitle: "Escalation Matrix",
      matrixBadge: "3-Tier Hierarchy",
      colDesignation: "Details of designation",
      colName: "Contact person Name",
      colAddress: "Address",
      colMobile: "Mobile",
      colEmail: "Email",
      colHours: "Working hours",
      levels: items("grv-level", [
        {
          level: "Level 1",
          designation: "Customer Care",
          name: "Zeel Raval",
          address: OFFICE_ADDRESS,
          phone: lnk("+91 79-26752544/45", "tel:+917926752544"),
          email: lnk("neuronwealth@gmail.com", "mailto:neuronwealth@gmail.com"),
          workingHours: "Monday-Friday 10:30 AM-6:30 PM",
          highlight: false,
        },
        {
          level: "Level 2",
          designation: "Compliance Officer",
          name: "Ruchita Thakor",
          address: OFFICE_ADDRESS,
          phone: lnk("+91 9099942576", "tel:+919099942576"),
          email: lnk("ruchita@neuronwealth.com", "mailto:ruchita@neuronwealth.com"),
          workingHours: "Monday-Friday 10:30 AM to 6:30 PM",
          highlight: true,
        },
        {
          level: "Level 3",
          designation: "Principal Officer",
          name: "Jigar Patel",
          address: OFFICE_ADDRESS,
          phone: lnk("+91 9099942563", "tel:+919099942563"),
          email: lnk("jigar@neuronwealth.com", "mailto:jigar@neuronwealth.com"),
          workingHours: "Monday-Friday 10:30 AM to 6:30 PM",
          highlight: true,
        },
      ]),

      timelineId: "turnaround-timeline",
      timelineNavLabel: "Turnaround Timelines",
      timelineIcon: "Clock",
      timelineTitle: "Standard Response & Escalation Timeline",
      timelineTextStart: "The Client can expect a reply within",
      timelineHighlight: "10 business days",
      timelineTextEnd:
        "of approaching the Investment Advisor. If the Investor does not receive a response within 10 business days of writing, Clients can escalate as per escalation matrix above.",

      scoresId: "sebi-scores",
      scoresNavLabel: "SEBI SCORES Platform",
      scoresIcon: "Landmark",
      scoresEyebrow: "Regulatory Platform",
      scoresTitle: "SEBI SCORES 2.0 Platform",
      scoresText:
        "In case the Client is not satisfied with the resolution, the Client can lodge the grievance through SEBI's SCORES platform at",
      scoresLink: lnk("https://scores.gov.in", "https://scores.sebi.gov.in/", { newTab: true }),
      scoresTextEnd: "or you may also write to any of the offices of SEBI.",
      scoresAppText: "SCORES may be accessed through the SCORES mobile application as well, same can be downloaded from below link:",
      scoresWebButton: lnk("Access SCORES 2.0 Web Portal", "https://scores.sebi.gov.in/", { newTab: true }),
      scoresAppButton: lnk(
        "Download SCORES Mobile App (Google Play)",
        "https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN",
        { newTab: true }
      ),

      wroId: "sebi-regional-office",
      wroNavLabel: "SEBI Regional Office (WRO)",
      wroIcon: "Building2",
      wroEyebrow: "Jurisdictional Authority",
      wroTitle: "SEBI Western Regional Office (WRO)",
      wroText: "The Client may also contact regional / local SEBI Western Regional Office (WRO) at:",
      wroAddressName: "SEBI Western Regional Office (WRO)",
      wroAddressLines: ["SEBI Bhavan, Panchvati 1st Lane,", "Gulbai Tekra Road,", "Ahmedabad - 380006, Gujarat, India."],

      odrId: "smart-odr",
      odrNavLabel: "Smart ODR Portal",
      odrIcon: "Scale",
      odrEyebrow: "Online Dispute Resolution",
      odrTitle: "Smart ODR Portal (Conciliation / Arbitration)",
      odrText:
        "If the client is not satisfied with the outcome of the SCORES complaint, the client may consider the Online Dispute Resolution (ODR) through the Smart ODR portal at",
      odrLink: lnk("smartodr.in", "https://smartodr.in/login", { newTab: true }),
      odrTextEnd: ".",
      odrButton: lnk("Access Smart ODR Portal (smartodr.in)", "https://smartodr.in/login", { newTab: true }),

      physicalId: "physical-complaints",
      physicalNavLabel: "Physical Complaints",
      physicalIcon: "Building2",
      physicalEyebrow: "Physical Submission",
      physicalTitle: "Physical Complaints to SEBI Headquarters",
      physicalText:
        "The client can also send his/her physical complaints to Office of Investor Assistance and Education at Securities and Exchange Board of India (SEBI):",
      physicalAddressName: "Office of Investor Assistance and Education",
      physicalAddressLines: [
        "Securities and Exchange Board of India (SEBI),",
        "SEBI Bhavan, Plot No. C4-A, ‘G’ Block,",
        "Bandra-Kurla Complex, Bandra (E),",
        "Mumbai - 400 051",
      ],

      navEyebrow: "On This Page",
      navTitle: "Redressal Stages",
      portalsIcon: "Scale",
      portalsEyebrow: "Statutory Escalation",
      portalsTitle: "Official Portals",
      portals: items("grv-portal", [
        { link: lnk("SCORES 2.0 Web Portal", "https://scores.sebi.gov.in/", { newTab: true }), iconStyle: "external" },
        {
          link: lnk("SCORES Mobile App", "https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN", { newTab: true }),
          iconStyle: "app",
        },
        { link: lnk("Smart ODR Portal", "https://smartodr.in/login", { newTab: true }), iconStyle: "external" },
      ]),
      contactEyebrow: "Direct Support",
      contactTitle: "Compliance Officer",
      contactName: "Ruchita Thakor",
      contactEmail: lnk("ruchita@neuronwealth.com", "mailto:ruchita@neuronwealth.com"),
      contactPhone: lnk("+91 90999 42576", "tel:+919099942576"),
      contactHours: "Mon-Fri 10:30 AM to 6:30 PM",
    }),
  ],
};

module.exports = { sectionTypes, page };
