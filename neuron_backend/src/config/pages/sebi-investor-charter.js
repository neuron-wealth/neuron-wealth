const { text, textarea, link, icon, list, select, opt } = require("../cmsFields");
const { img, lnk, section, items } = require("../cmsContent");

const A = "A. Vision & Mission";
const B = "B. Business Transacted";
const C = "C. Services Provided";
const D = "D. Grievance Redressal";
const E = "E. Rights of Investors";
const F = "F. Do’s & Don’ts";
const NAV = "Sidebar: On This Page";
const PORTALS = "Sidebar: Official Portals";
const CONTACT = "Sidebar: Direct Support";

const point = (label = "Text", max = 600) => [textarea("text", label, max)];
const groupIcon = (key, label, group) => ({ ...icon(key, label), group });

const sectionTypes = {
  investorCharterBody: {
    label: "Investor Charter Articles & Sidebar",
    description:
      "SEBI Investor Charter sections A to F (vision & mission, business transacted, services, grievance redressal, investor rights, Do’s & Don’ts) with a sticky sidebar.",
    icon: "ShieldCheck",
    design: ["anchor"],
    fields: [
      // A. Vision & Mission
      groupIcon("aIcon", "Section Icon", A),
      text("aEyebrow", "Eyebrow", 40, { group: A }),
      text("aTitle", "Heading", 160, { group: A }),
      groupIcon("visionIcon", "Vision Icon", A),
      text("visionTitle", "Vision Heading", 60, { group: A }),
      text("visionQuote", "Vision Statement", 200, { group: A }),
      textarea("visionText", "Vision Description", 500, { group: A }),
      groupIcon("missionIcon", "Mission Icon", A),
      text("missionTitle", "Mission Heading", 60, { group: A }),
      textarea("missionText", "Mission Statement", 600, { group: A }),

      // B. Business Transacted
      groupIcon("bIcon", "Section Icon", B),
      text("bEyebrow", "Eyebrow", 40, { group: B }),
      text("bTitle", "Heading", 200, { group: B }),
      list("bPoints", "Numbered Points", "Point", 30, point("Point"), { titleKey: "text", group: B }),

      // C. Services Provided
      groupIcon("cIcon", "Section Icon", C),
      text("cEyebrow", "Eyebrow", 40, { group: C }),
      text("cTitle", "Heading", 200, { group: C }),
      groupIcon("onboardingIcon", "Onboarding Heading Icon", C),
      text("onboardingTitle", "Onboarding Heading", 100, { group: C }),
      list("onboardingItems", "Onboarding Steps", "Step", 12, [text("text", "Step", 160)], { titleKey: "text", group: C }),
      groupIcon("disclosureIcon", "Disclosure Heading Icon", C),
      text("disclosureTitle", "Disclosure Heading", 100, { group: C }),
      list("disclosureItems", "Disclosures to Clients", "Disclosure", 30, point("Disclosure"), { titleKey: "text", group: C }),

      // D. Grievance Redressal
      groupIcon("dIcon", "Section Icon", D),
      text("dEyebrow", "Eyebrow", 40, { group: D }),
      text("dTitle", "Heading", 200, { group: D }),
      text("lodgeTitle", "1. Lodging Complaints Heading", 200, { group: D }),
      text("adviserModeLabel", "Mode 1 Label", 200, { group: D }),
      textarea("adviserModeBefore", "Mode 1 Text (Before Highlight)", 500, { group: D }),
      text("adviserModeHighlight", "Mode 1 Highlight (Bold)", 40, { group: D }),
      textarea("adviserModeAfter", "Mode 1 Text (After Highlight)", 300, { group: D }),
      text("scoresModeLabel", "Mode 2 Label", 240, { group: D }),
      text("scoresLead", "SCORES Lead (Bold)", 80, { group: D }),
      textarea("scoresText", "SCORES Description", 400, { group: D }),
      link("scoresLink", "SCORES Link (Shown in Brackets)", { group: D }),
      text("reviewTitle", "Review Levels Heading", 200, { group: D }),
      list("reviewItems", "Review Levels", "Level", 8, [text("text", "Level", 160)], { titleKey: "text", group: D }),
      text("emailLead", "Email Option (Bold)", 160, { group: D }),
      text("odrTitle", "2. SMARTODR Heading", 160, { group: D }),
      textarea("odrText", "SMARTODR Description", 600, { group: D }),
      link("odrLink", "SMARTODR Link", { group: D }),
      text("physicalTitle", "3. Physical Complaints Heading", 160, { group: D }),
      textarea("physicalText", "Physical Complaints Intro", 400, { group: D }),
      list(
        "addressLines",
        "SEBI Postal Address Lines",
        "Line",
        10,
        [
          text("text", "Line", 160),
          select("style", "Line Style", [opt("regular", "Regular"), opt("accent", "Accent (Bold Blue)"), opt("bold", "Semi-Bold")]),
        ],
        { titleKey: "text", group: D }
      ),

      // E. Rights of Investors
      groupIcon("eIcon", "Section Icon", E),
      text("eEyebrow", "Eyebrow", 40, { group: E }),
      text("eTitle", "Heading", 200, { group: E }),
      list(
        "rights",
        "Investor Rights",
        "Right",
        30,
        [text("title", "Right", 160), textarea("text", "Description", 400)],
        { titleKey: "title", group: E }
      ),
      text("vulnerableTitle", "Vulnerable Consumers Heading", 160, { group: E }),
      list("vulnerableItems", "Vulnerable Consumer Rights", "Right", 12, point("Right", 400), { titleKey: "text", group: E }),

      // F. Do's & Don'ts
      groupIcon("fIcon", "Section Icon", F),
      text("fEyebrow", "Eyebrow", 40, { group: F }),
      text("fTitle", "Heading", 200, { group: F }),
      text("dosTitle", "Do’s Heading", 40, { group: F }),
      list(
        "dosItems",
        "Do’s",
        "Do",
        30,
        [textarea("text", "Do", 600), link("link", "Optional Link Below", { hint: "Leave empty to show no link." })],
        { titleKey: "text", group: F }
      ),
      text("dontsTitle", "Don’ts Heading", 40, { group: F }),
      list("dontsItems", "Don’ts", "Don’t", 30, point("Don’t"), { titleKey: "text", group: F }),

      // Sidebar
      text("navEyebrow", "Eyebrow", 40, { group: NAV }),
      text("navTitle", "Heading", 80, { group: NAV }),
      list(
        "navItems",
        "Navigation Links",
        "Link",
        12,
        [
          text("label", "Label", 80),
          text("target", "Target Article ID", 40, {
            hint: "One of: vision-mission, business-transacted, services-provided, grievance-redressal, rights-of-investors, investor-responsibilities.",
          }),
        ],
        { titleKey: "label", group: NAV }
      ),
      groupIcon("portalsIcon", "Icon", PORTALS),
      text("portalsEyebrow", "Eyebrow", 40, { group: PORTALS }),
      text("portalsTitle", "Heading", 80, { group: PORTALS }),
      list("portals", "Portal Links", "Portal", 8, [link("link", "Portal Link")], { titleKey: "link.label", group: PORTALS }),
      text("contactEyebrow", "Eyebrow", 40, { group: CONTACT }),
      text("contactTitle", "Heading", 80, { group: CONTACT }),
      textarea("contactAddress", "Office Address", 300, {
        group: CONTACT,
        hint: "Email and phone come from the site-wide company details.",
      }),
    ],
  },
};

const page = {
  slug: "sebi-investor-charter",
  title: "SEBI Investor Charter",
  description:
    "Official SEBI Investor Charter for Investment Advisers covering vision and mission, business transacted, services, grievance redressal, investor rights and Do’s & Don’ts.",
  category: "core",
  icon: "Scale",
  status: "published",
  seo: {
    title: "SEBI Investor Charter | Neuron Wealth Advisors",
    description:
      "Official SEBI Investor Charter for Investment Advisers: Vision, Mission, business transacted, investor rights, grievance redressal mechanism, and essential Do's and Don'ts.",
  },
  sections: [
    section(
      "investor-charter-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "SEBI Investor Charter",
        title: "SEBI Investor",
        highlight: "Charter",
        text: "Statutory framework prescribed by the Securities and Exchange Board of India (SEBI) detailing vision, advisory standards, investor rights, dispute resolution, and operational Do’s & Don’ts.",
        image: img("/images/why-us-fiduciary.jpg", "SEBI Investor Charter and Regulatory Framework"),
      },
      { anchor: "investor-charter-hero" }
    ),
    section("investor-charter-body", "investorCharterBody", "Charter Articles & Sidebar", {
      aIcon: "Compass",
      aEyebrow: "Section A",
      aTitle: "A. Vision and Mission Statements for investors",
      visionIcon: "Compass",
      visionTitle: "Vision",
      visionQuote: "“Invest with knowledge & safety.”",
      visionText: "Empowering investors through financial literacy, informed decision-making, and disciplined risk mitigation.",
      missionIcon: "Target",
      missionTitle: "Mission",
      missionText:
        "Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.",

      bIcon: "Building2",
      bEyebrow: "Section B",
      bTitle: "B. Details of business transacted by the Investment Adviser with respect to the investors.",
      bPoints: items(
        "ic-business",
        [
          "To enter into an agreement with the client providing all details including fee details, aspect of Conflict of interest disclosure and maintaining confidentiality of information.",
          "To do a proper and unbiased risk – profiling and suitability assessment of the client.",
          "To obtain registration with Know Your Client Registration Agency (KRA) and Central Know Your Customer Registry (CKYC).",
          "To conduct audit annually.",
          "To disclose the status of complaints in its website.",
          "To disclose the name, proprietor name, type of registration, registration number, validity, complete address with telephone numbers and associated SEBI regional/local Office details in its website.",
          "To employ only qualified and certified employees.",
          "To deal with clients only from official number",
          "To maintain records of interactions, with all clients including prospective clients (prior to on-boarding), where any conversation related to advice has taken place.",
          "To ensure that all advertisements are in adherence to the provisions of the Advertisement Code for Investment Advisers",
          "Not to discriminate in terms of services provided, among clients opting for same/similar products/services offered by investment adviser.",
        ].map((entry) => ({ text: entry }))
      ),

      cIcon: "FileText",
      cEyebrow: "Section C",
      cTitle: "C. Details of services provided to investors (No Indicative Timelines)",
      onboardingIcon: "CheckCircle2",
      onboardingTitle: "Onboarding of Clients",
      onboardingItems: items("ic-onboarding", [{ text: "Sharing of agreement copy" }, { text: "Completing KYC of clients" }]),
      disclosureIcon: "ShieldCheck",
      disclosureTitle: "Disclosure to Clients",
      disclosureItems: items(
        "ic-disclosure",
        [
          "To provide full disclosure about its business, affiliations, compensation in the agreement.",
          "To not access client’s accounts or holdings for offering advice.",
          "To disclose the risk profile to the client.",
          "To disclose any conflict of interest of the investment advisory activities with any other activities of the investment adviser.",
          "To disclose the extent of use of Artificial Intelligence tools in providing investment advisory services.",
          "To provide investment advice to the client based on the risk-profiling of the clients and suitability of the client.",
          "To treat all advisory clients with honesty and integrity.",
          "To make adequate disclosure to the investor of all material facts such as risks, obligations, costs, etc. relating to the products or securities advised by the adviser.",
          "To provide clear guidance and adequate caution notice to clients when providing investment advice for dealing in complex and high-risk financial products/services.",
          "To ensure confidentiality of information shared by clients unless such information is required to be provided in furtherance of discharging legal obligations or a client has provided specific consent to share such information.",
          "To disclose the timelines for the various services provided by the investment adviser to clients and ensure adherence to the said timelines.",
        ].map((entry) => ({ text: entry }))
      ),

      dIcon: "Scale",
      dEyebrow: "Section D",
      dTitle: "D. Details of grievance redresser mechanism and how to access it",
      lodgeTitle: "1. Investor can lodge complaint/grievance against Investment Adviser in the following ways:",
      adviserModeLabel: "Mode of filing the complaint with investment adviser",
      adviserModeBefore:
        "In case of any grievance / complaint, an investor may approach the concerned Investment Adviser who shall strive to redress the grievance immediately, but not later than",
      adviserModeHighlight: "21 days",
      adviserModeAfter: "of the receipt of the grievance.",
      scoresModeLabel:
        "Mode of filing the complaint on SCORES or with Investment Adviser Administration and Supervisory Body (IAASB)",
      scoresLead: "i. SCORES 2.0",
      scoresText:
        "(a web based centralized grievance redressal system of SEBI for facilitating effective grievance redressal in time-bound manner)",
      scoresLink: lnk("https://scores.sebi.gov.in", "https://scores.sebi.gov.in", { newTab: true }),
      reviewTitle: "Two level review for complaint/grievance against investment adviser:",
      reviewItems: items("ic-review", [{ text: "First review done by designated body (IAASB)" }, { text: "Second review done by SEBI" }]),
      emailLead: "ii. Email to designated email ID of IAASB",
      odrTitle: "2. SMARTODR Conciliation / Arbitration Platform",
      odrText:
        "If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor has the option to file the complaint/ grievance on SMARTODR platform for its resolution through online conciliation or arbitration.",
      odrLink: lnk("Access SMART ODR Portal (smartodr.in)", "https://smartodr.in", { newTab: true }),
      physicalTitle: "3. Physical Complaints to SEBI",
      physicalText: "With regard to physical complaints, investors may send their complaints to:",
      addressLines: items("ic-address", [
        { text: "Office of Investor Assistance and Education,", style: "accent" },
        { text: "Securities and Exchange Board of India,", style: "regular" },
        { text: "SEBI Bhavan, Plot No. C4-A, ‘G’ Block,", style: "regular" },
        { text: "Bandra-Kurla Complex, Bandra (E),", style: "regular" },
        { text: "Mumbai - 400 051", style: "bold" },
      ]),

      eIcon: "BadgeCheck",
      eEyebrow: "Section E",
      eTitle: "E. Rights of Investors",
      rights: items("ic-right", [
        { title: "Right to Privacy and Confidentiality", text: "Confidentiality of all personal and financial information shared with the adviser." },
        { title: "Right to Transparent Practices", text: "Openness and transparency in all advisory relationships and communications." },
        { title: "Right to Fair and Equitable Treatment", text: "Equal treatment and non-discrimination across comparable advisory service tiers." },
        { title: "Right to Adequate Information", text: "Complete, balanced, and understandable information regarding investment recommendations." },
        { title: "Right to Initial and Continuing Disclosure", text: "Mandatory disclosures at onboarding and on an ongoing statutory basis." },
        { title: "Right to Statutory & Regulatory Disclosures", text: "Right to receive information about all statutory and regulatory disclosures." },
        { title: "Right to Fair & True Advertisement", text: "Protection against misleading claims and non-compliant marketing representations." },
        { title: "Right to Service Parameters & Timelines", text: "Awareness about service parameters and turnaround times, and timelines for each service." },
        { title: "Right to be Heard & Timely Grievance Redressal", text: "Access to prompt, fair, and time-bound grievance resolution mechanisms." },
        { title: "Right to Suitability of Financial Products", text: "Advice strictly aligned with client risk profile and financial objectives." },
        { title: "Right to Exit from Financial Product or Service", text: "Exit rights in accordance with the terms of agreement with the investment adviser." },
        { title: "Right to Guidance & Caution on Complex Products", text: "Clear caution notices and risk disclosures when dealing in complex/high-risk instruments." },
      ]),
      vulnerableTitle: "Additional Rights to vulnerable consumers:",
      vulnerableItems: items(
        "ic-vulnerable",
        [
          "Right to get access to services in a suitable manner even if differently abled",
          "Right to provide feedback on the financial products and services used",
          "Right against coercive, unfair, and one-sided clauses in financial agreements",
        ].map((entry) => ({ text: entry }))
      ),

      fIcon: "TriangleAlert",
      fEyebrow: "Section F",
      fTitle: "F. Expectations from the investors (Responsibilities of investors)",
      dosTitle: "Do’s",
      dosItems: items(
        "ic-do",
        [
          "Always deal with SEBI registered Investment Advisers.",
          "Ensure that the Investment Adviser has a valid registration certificate.",
          "Check for SEBI registration number.",
          "Pay only advisory fees to your Investment Adviser. Make payments of advisory fees through banking channels only and maintain duly signed receipts mentioning the details of your payments.",
          "You may make payment of advisory fees through Centralised Fee Collection Mechanism (CeFCoM) of IAASB if investment adviser has opted for the mechanism.",
          "Always ask for your risk profiling before accepting investment advice. Insist that Investment Adviser provides advisory strictly on the basis of your risk profiling and take into account available investment alternatives.",
          "Ask all relevant questions and clear your doubts with your Investment Adviser before acting on advice.",
          "Assess the risk–return profile of the investment as well as the liquidity and safety aspects before making investments.",
          "Insist on getting the terms and conditions in writing duly signed and stamped. Read these terms and conditions carefully particularly regarding advisory fees, advisory plans, category of recommendations etc. before dealing with any Investment Adviser.",
          "Be vigilant in your transactions.",
          "Approach the appropriate authorities for redressal of your doubts / grievances.",
          "Inform SEBI about Investment Advisers offering assured or guaranteed returns.",
          "Always be aware that you have the right to exit the service of an Investment Adviser",
          "Always be aware that you have the right to seek clarifications and clear guidance on advice",
          "Always be aware that you have the right to provide feedback to the Investment Adviser in respect of services received.",
          "Always be aware that you will not be bound by any clause, prescribed by the investment adviser, which is contravening any regulatory provisions.",
        ].map((entry) => ({ text: entry, link: lnk("", "") }))
      ),
      dontsTitle: "Don’ts",
      dontsItems: items(
        "ic-dont",
        [
          "Don’t fall for stock tips offered under the pretext of investment advice.",
          "Do not provide funds for investment to the Investment Adviser.",
          "Don’t fall for the promise of indicative or exorbitant or assured returns by the Investment Advisers. Don’t let greed overcome rational investment decisions.",
          "Don’t fall prey to luring advertisements or market rumors.",
          "Avoid doing transactions only on the basis of phone calls or messages from any Investment adviser or its representatives.",
          "Don’t take decisions just because of repeated messages and calls by Investment Advisers.",
          "Do not fall prey to limited period discount or other incentive, gifts, etc. offered by Investment advisers.",
          "Don’t rush into making investments that do not match your risk taking appetite and investment goals.",
          "Do not share login credential and password of your trading, demat or bank accounts with the Investment Adviser.",
        ].map((entry) => ({ text: entry }))
      ),

      navEyebrow: "On This Page",
      navTitle: "Charter Sections",
      navItems: items("ic-nav", [
        { label: "A. Vision & Mission", target: "vision-mission" },
        { label: "B. Business Transacted", target: "business-transacted" },
        { label: "C. Services Provided", target: "services-provided" },
        { label: "D. Grievance Redressal", target: "grievance-redressal" },
        { label: "E. Rights of Investors", target: "rights-of-investors" },
        { label: "F. Do’s & Don’ts", target: "investor-responsibilities" },
      ]),
      portalsIcon: "Scale",
      portalsEyebrow: "Statutory Redressal",
      portalsTitle: "Official Portals",
      portals: items("ic-portal", [
        { link: lnk("SCORES 2.0 Portal", "https://scores.sebi.gov.in", { newTab: true }) },
        { link: lnk("SMART ODR Portal", "https://smartodr.in", { newTab: true }) },
        {
          link: lnk("SEBI Registered IA List", "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13", {
            newTab: true,
          }),
        },
      ]),
      contactEyebrow: "Direct Support",
      contactTitle: "Advisory Assistance",
      contactAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015",
    }),
  ],
};

module.exports = { sectionTypes, page };
