import { img, lnk, section, items } from "../cmsContent";

const SEBI_VERIFY_URL = "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13";

export const page = {
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
