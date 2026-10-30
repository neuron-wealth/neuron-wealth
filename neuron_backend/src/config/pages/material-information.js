const { text, textarea, link, icon, paragraphs, toggle, list } = require("../cmsFields");
const { img, lnk, section, items } = require("../cmsContent");

const NAV_HINT = "Entry for this article in the sticky “On This Page” list. Leave empty to leave it out of the list.";

const G_DIRECTIVE = "1. Statutory Directive";
const G_ENTITY = "2. Entity Particulars";
const G_SERVICES = "3. Brief about Services";
const G_TEAM = "4. Team Composition";
const G_PRINCIPAL = "5. Principal Officer Profile";
const G_RELATIONS = "6. Relation with Team";
const G_DISCIPLINARY = "7. Disciplinary Action";
const G_ASPECTS = "8. Other Important Aspects";
const G_FEES = "9. Fees & Terms";
const G_NAV = "Sidebar: On This Page";
const G_CREDENTIAL = "Sidebar: Registration Card";
const G_CONTACT = "Sidebar: Contact Card";

const sectionTypes = {
  materialInfoBody: {
    label: "Material Information Articles",
    description:
      "Regulation 18(1) disclosures: statutory directive, entity particulars, services, team, principal officer, relations, disciplinary status, fiduciary aspects and fees, with a sticky sidebar.",
    icon: "FileText",
    design: ["anchor"],
    fields: [
      text("directiveNav", "Sidebar Label", 60, { group: G_DIRECTIVE, hint: NAV_HINT }),
      { ...icon("directiveIcon", "Icon"), group: G_DIRECTIVE },
      text("directiveEyebrow", "Small Label", 80, { group: G_DIRECTIVE }),
      text("directiveTitle", "Heading", 160, { group: G_DIRECTIVE }),
      textarea("directiveText", "Text", 600, { group: G_DIRECTIVE }),

      text("entityNav", "Sidebar Label", 60, { group: G_ENTITY, hint: NAV_HINT }),
      text("entityTitle", "Heading", 120, { group: G_ENTITY }),
      textarea("entityText", "Intro Line", 400, { group: G_ENTITY }),
      list(
        "entityItems",
        "Particulars",
        "Particular",
        16,
        [
          text("label", "Label", 60),
          textarea("value", "Value", 300),
          icon("icon", "Icon"),
          toggle("highlight", "Highlight (filled icon and blue value)"),
        ],
        { titleKey: "label", group: G_ENTITY }
      ),
      text("verifyEyebrow", "Verification Banner Label", 80, { group: G_ENTITY }),
      text("verifyText", "Verification Banner Text", 200, { group: G_ENTITY }),
      link("verifyLink", "Verification Button", { group: G_ENTITY }),

      text("servicesNav", "Sidebar Label", 60, { group: G_SERVICES, hint: NAV_HINT }),
      text("servicesTitle", "Heading", 120, { group: G_SERVICES }),
      paragraphs("servicesParagraphs", "Paragraphs", 8, 1500, { group: G_SERVICES }),

      text("teamNav", "Sidebar Label", 60, { group: G_TEAM, hint: NAV_HINT }),
      text("teamTitle", "Heading", 120, { group: G_TEAM }),
      text("teamBadge", "Label Beside Heading", 80, { group: G_TEAM }),
      list(
        "teamMembers",
        "Team Members",
        "Team Member",
        40,
        [
          text("name", "Name", 100),
          text("category", "Category", 60),
          textarea("role", "Role", 400),
          toggle("highlight", "Highlight Card"),
        ],
        { titleKey: "name", group: G_TEAM }
      ),

      text("principalNav", "Sidebar Label", 60, { group: G_PRINCIPAL, hint: NAV_HINT }),
      { ...icon("principalIcon", "Icon"), group: G_PRINCIPAL },
      text("principalEyebrow", "Small Label", 80, { group: G_PRINCIPAL }),
      text("principalTitle", "Heading", 200, { group: G_PRINCIPAL }),
      paragraphs("principalParagraphs", "Paragraphs", 8, 1500, { group: G_PRINCIPAL }),

      text("relationsNav", "Sidebar Label", 60, { group: G_RELATIONS, hint: NAV_HINT }),
      text("relationsTitle", "Heading", 120, { group: G_RELATIONS }),
      textarea("relationsText", "Text", 1500, { group: G_RELATIONS }),

      text("disciplinaryNav", "Sidebar Label", 60, { group: G_DISCIPLINARY, hint: NAV_HINT }),
      { ...icon("disciplinaryIcon", "Icon"), group: G_DISCIPLINARY },
      text("disciplinaryTitle", "Heading", 120, { group: G_DISCIPLINARY }),
      textarea("disciplinaryText", "Text", 600, { group: G_DISCIPLINARY }),

      text("aspectsNav", "Sidebar Label", 60, { group: G_ASPECTS, hint: NAV_HINT }),
      text("aspectsTitle", "Heading", 120, { group: G_ASPECTS }),
      list(
        "aspects",
        "Aspects",
        "Aspect",
        20,
        [text("title", "Title", 160), textarea("detail", "Detail", 400)],
        { titleKey: "title", group: G_ASPECTS }
      ),

      text("feesNav", "Sidebar Label", 60, { group: G_FEES, hint: NAV_HINT }),
      text("feesTitle", "Fees Heading", 120, { group: G_FEES }),
      text("feesModel", "Fee Model Name", 120, { group: G_FEES }),
      textarea("feesText", "Fee Model Text", 600, { group: G_FEES }),
      text("termsTitle", "Terms Heading", 120, { group: G_FEES }),
      textarea("termsText", "Terms Text", 600, { group: G_FEES }),

      text("navEyebrow", "Small Label", 60, { group: G_NAV }),
      text("navTitle", "Heading", 80, { group: G_NAV }),

      { ...icon("credentialIcon", "Icon"), group: G_CREDENTIAL },
      text("credentialLabel", "Small Label", 60, { group: G_CREDENTIAL }),
      text("credentialValue", "Registration Number", 60, { group: G_CREDENTIAL }),
      list(
        "credentialFacts",
        "Facts",
        "Fact",
        8,
        [text("label", "Label", 40), text("value", "Value", 80), toggle("highlight", "Green Value")],
        { titleKey: "label", group: G_CREDENTIAL }
      ),
      link("credentialLink", "Verify Button", { group: G_CREDENTIAL }),

      text("contactEyebrow", "Small Label", 60, { group: G_CONTACT }),
      text("contactTitle", "Heading", 80, { group: G_CONTACT, hint: "Email and phone come from the site settings." }),
      textarea("contactAddress", "Address", 300, { group: G_CONTACT }),
    ],
  },
};

const SEBI_VERIFY_URL = "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13";

const page = {
  slug: "material-information",
  title: "Material Information about NWA",
  description:
    "Material information disclosed under Regulation 18(1) of the SEBI IA Regulations: registration, services, team, principal officer, fiduciary aspects and fees.",
  category: "core",
  icon: "FileText",
  status: "published",
  seo: {
    title: "Material Information about NWA | Regulation 18(1) | Neuron Wealth Advisors",
    description:
      "Official material information disclosed by Neuron Wealth Advisors LLP in accordance with para 18(1) of the SEBI IA Regulations: Statutory registration, services, team composition, fee models.",
  },
  sections: [
    section(
      "material-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "Material Information about NWA",
        title: "Material Information",
        highlight: "about NWA",
        text: "Statutory disclosures provided in compliance with Regulation 18(1) of the SEBI (Investment Advisers) Regulations, 2013 to enable informed client decisions.",
        image: img("/images/why-us-fiduciary.jpg", "Neuron Wealth Legal and Statutory Governance"),
      },
      { anchor: "material-hero" }
    ),
    section("material-info-body", "materialInfoBody", "Material Information Articles", {
      directiveNav: "Statutory Directive",
      directiveIcon: "Scale",
      directiveEyebrow: "SEBI IA Regulations • Para 18(1)",
      directiveTitle: "In accordance with para 18 (1) of the IA Regulations:",
      directiveText:
        "An investment adviser has disclosed following material information about itself to the client to take an informed decision on whether or not to avail its services in compliance with the IA regulation 18(1).",

      entityNav: "Entity Particulars",
      entityTitle: "Entity Identification & Statutory Particulars",
      entityText: "Key corporate credentials, SEBI registration parameters, and official registry verification coordinates.",
      entityItems: items("mi-entity", [
        { label: "Name", value: "Neuron Wealth Advisors LLP", icon: "Building2", highlight: false },
        {
          label: "Address",
          value: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015, Gujarat, India.",
          icon: "MapPin",
          highlight: false,
        },
        { label: "No. of Branches", value: "Only Head Office at Ahmedabad location. No Branches.", icon: "Building2", highlight: false },
        { label: "Registered with", value: "Securities Exchange Board of India", icon: "Landmark", highlight: false },
        { label: "Registration as", value: "Investment Advisor", icon: "Award", highlight: false },
        { label: "Registration Type", value: "Non Individual", icon: "FileText", highlight: false },
        { label: "Registration No", value: "INA000016481", icon: "BadgeCheck", highlight: true },
        { label: "Valid Unto", value: "20/12/2021 to Perpetual", icon: "ShieldCheck", highlight: true },
      ]),
      verifyEyebrow: "SEBI Official Registry Verification",
      verifyText: "Verify Neuron Wealth Advisors LLP directly on the official SEBI Portal:",
      verifyLink: lnk("SEBI Link (for verification)", SEBI_VERIFY_URL, { newTab: true }),

      servicesNav: "Brief about Services",
      servicesTitle: "Brief about the Services:",
      servicesParagraphs: [
        "Neuron Wealth Advisors (NWA) provides holistic wealth advisory services that covers all the aspects of financial or investment life. The services may include working as a multi-family office or family CFO of the client’s family and provide advice for wealth protection, wealth creation, Wealth enjoyment, wealth utilization, wealth management, wealth sustenance, wealth transition and wealth preservation for multiple generations.",
        "The investment advice would be based on and after considering the Client’s family needs, financial goals, expectation, risk profile, tax laws, domestic and global economic conditions financial market scenario, compliance requirements, and all other relevant information.",
      ],

      teamNav: "Team Composition",
      teamTitle: "Team:",
      teamBadge: "12 Key Professionals & Specialists",
      teamMembers: items("mi-team", [
        { name: "Dr. Hamsa Thota (USA)", category: "Advisory & Mentorship", role: "Innovation Expert, Mentor", highlight: false },
        {
          name: "Jigar Patel",
          category: "Key Leadership & Fiduciary",
          role: "Principal Officer and a Person associated with Investment Advice",
          highlight: true,
        },
        {
          name: "Mayank Patel, CFA",
          category: "Private Equity & Incubation",
          role: "Venture Capital / Private Equity Consultant, Ex-CEO of Cradle, a start-up incubation centre at Entrepreneurship Development Institute (EDI) of India",
          highlight: false,
        },
        {
          name: "Ruchita Thakor, MBA-Finance",
          category: "Statutory Compliance & Advice",
          role: "Compliance Officer, Investment Adviser",
          highlight: true,
        },
        { name: "Zeel Raval, MBA-Finance", category: "Research & Support", role: "Investment Support", highlight: false },
        { name: "Vedangi Shastri", category: "Client Operations", role: "Operations", highlight: false },
        { name: "Yash Desai, BBA", category: "Administration", role: "Back Office Support", highlight: false },
        { name: "Chandrasheel Mehta", category: "Risk & Insurance", role: "Insurance Consultant, registered with IRDA", highlight: false },
        { name: "Reecha Patel, CA, CPA, DISA", category: "Taxation Advisory", role: "Income Tax Consultant", highlight: false },
        { name: "Vishal Jagetiya, CA", category: "Cross-Border Taxation", role: "US Tax Return Consultant", highlight: false },
        { name: "Kinnari Kudecha", category: "Administration", role: "Administrative Support", highlight: false },
        { name: "Chirag Darji", category: "Technology Infrastructure", role: "IT/Web, E-commerce Consultant", highlight: false },
      ]),

      principalNav: "Principal Officer Profile",
      principalIcon: "UserCheck",
      principalEyebrow: "Leadership Credentials",
      principalTitle: "Brief about Principal Officer and the person associated with Investment Advice:",
      principalParagraphs: [
        "Mr. Jigar Patel, Principal Officer and Person Associated with Investment Advice, is a Chartered Accountant from India (1999), MBA-Finance from University of Illinois, Chicago (2003), USA, a CFA Charter holder from CFA Institute, USA since 2011 and a Certified Public Accountant (CPA) from USA. With 20+ years of experience, he has developed ingenuity for Simplifying Financial Life and established himself as a trusted advisor for Multi-Generational Wealth Management. He helps clients make informed decisions about protecting, creating, accumulating, preserving, complying, utilizing, distributing, and enjoying Wealth.",
        "Jigar has given presentations on Investments, Taxation and Global Compliance around the world, including at GOOGLE in California and MICROSOFT in Seattle, USA. His book on NRI Investments and Taxation is being published on Amazon and his articles have been published in magazines in India and in USA. He has organized webinars, shares his views on TV, and has been writing blogs at that have been viewed by visitors from 60+ countries and have 6500+ comments.",
        "Jigar is a mentor at the Entrepreneurship Development Institute of India (EDI) for students and start-ups businesses since 2015 and a volunteer for the CFA Society India for its Ahmedabad chapter since 2012.",
      ],

      relationsNav: "Nature of Relation with Team",
      relationsTitle: "Nature of relation with other Team members:",
      relationsText:
        "Team members other than Mr. Jigar Patel, include experts in the respective field like insurance, private equity, venture capital, taxation, law, research, back office, etc. and includes support team. They may not be in the employment of the firm and are not the persons associated with the investment advice. They have agreed to provide their services on a consulting basis as a value addition service to the clients. They may be self-employed, employed by other organization or retired. They have agreed to provide their expert service as and when required for fees or on pro bono basis, depending on the nature and complexity of the work.",

      disciplinaryNav: "Disciplinary Action Status",
      disciplinaryIcon: "CheckCircle2",
      disciplinaryTitle: "Disciplinary Action:",
      disciplinaryText:
        "No disciplinary action has been taken by SEBI or other financial or professional regulator against principal officer, person associated with investment advice or the team members.",

      aspectsNav: "Other Important Aspects",
      aspectsTitle: "Other Important Aspects:",
      aspects: items("mi-aspect", [
        { title: "Act as a Fiduciary", detail: "Legally obligated to put Client’s interest before our own" },
        {
          title: "Earn income only as fees from the Client",
          detail: "Not allowed to earn commission or brokerage or other consideration from third person.",
        },
        { title: "Invest in direct plan of investments", detail: "saving costs by lower expense ratio" },
        {
          title: "Comply with SEBI Investor Advisor Regulations, and Guidelines",
          detail: "Strict compliance with SEBI IA regulations and operational guidelines.",
        },
        {
          title: "Periodic reporting to SEBI and Audit by SEBI",
          detail: "Regular compliance submissions and statutory audit by SEBI.",
        },
        {
          title: "Comply with CFA Institute’s Code of Ethics and Standard of Professional Conduct",
          detail: "Adherence to highest global standards of professional and ethical integrity.",
        },
      ]),

      feesNav: "Fees & Terms",
      feesTitle: "Fees:",
      feesModel: "“Together-We-Grow’ Model:",
      feesText: "As per Agreement based on Asset Under Advice (AUA) basis as specifically included in Schedule B and C of the Agreement.",
      termsTitle: "Other Terms and conditions:",
      termsText: "As per Agreement",

      navEyebrow: "On This Page",
      navTitle: "Material Particulars",

      credentialIcon: "Scale",
      credentialLabel: "SEBI Registered IA",
      credentialValue: "INA000016481",
      credentialFacts: items("mi-fact", [
        { label: "Validity:", value: "Perpetual", highlight: false },
        { label: "BASL Member ID:", value: "1697", highlight: false },
        { label: "Head Office:", value: "Ahmedabad, India", highlight: false },
        { label: "Model:", value: "100% Fee-Only Fiduciary", highlight: true },
      ]),
      credentialLink: lnk("Verify on SEBI Portal", SEBI_VERIFY_URL, { newTab: true }),

      contactEyebrow: "Direct Inquiries",
      contactTitle: "Advisory Desk",
      contactAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015",
    }),
  ],
};

module.exports = { sectionTypes, page };
