import { img, lnk, section, items } from "../cmsContent";

export const page = {
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
