const { text, textarea, link, icon, toggle, list } = require("../cmsFields");
const { img, lnk, section, items } = require("../cmsContent");

const G_DIRECTIVE = "Statutory Directive";
const G_PRINCIPLES = "Code Principles";
const G_NAV = "Sidebar: On This Page";
const G_CREDENTIAL = "Sidebar: Registration Card";
const G_CONTACT = "Sidebar: Contact Card";

const sectionTypes = {
  sebiCodeBody: {
    label: "SEBI Code of Conduct Principles",
    description:
      "Third Schedule statutory directive and numbered code principles, with a sticky sidebar listing the principles, registration card and contact card.",
    icon: "Scale",
    design: ["anchor"],
    fields: [
      { ...icon("directiveIcon", "Icon"), group: G_DIRECTIVE },
      text("directiveEyebrow", "Small Label", 80, { group: G_DIRECTIVE }),
      textarea("directiveTitle", "Heading", 300, { group: G_DIRECTIVE }),
      textarea("directiveText", "Text", 600, { group: G_DIRECTIVE }),

      list(
        "principles",
        "Principles",
        "Principle",
        20,
        [
          text("number", "Number", 10),
          text("anchor", "Anchor ID", 40, {
            hint: "Lowercase letters, numbers and hyphens. Used to jump to this principle from the sidebar.",
          }),
          text("title", "Title", 120),
          textarea("statement", "Statement", 1000),
        ],
        { titleKey: "title", group: G_PRINCIPLES }
      ),

      text("navEyebrow", "Small Label", 60, { group: G_NAV }),
      text("navTitle", "Heading", 80, { group: G_NAV, hint: "The list below the heading is built from the principles." }),

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

const page = {
  slug: "code-of-conduct-sebi",
  title: "Code of Conduct – SEBI",
  description:
    "Statutory Code of Conduct for investment advisers under the Third Schedule of the SEBI (Investment Advisers) Regulations, 2013 pursuant to Regulation 15(9).",
  category: "core",
  icon: "Scale",
  status: "published",
  seo: {
    title: "Code of Conduct – SEBI | Third Schedule | Neuron Wealth Advisors",
    description:
      "Official Code of Conduct for Investment Advisers under the Third Schedule of SEBI IA Regulations, 2013 pursuant to Regulation 15(9): Honesty, diligence, fair charges, conflict management.",
  },
  sections: [
    section(
      "code-of-conduct-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "Code of Conduct – SEBI",
        title: "Code of Conduct",
        highlight: "– SEBI",
        text: "Statutory Code of Conduct prescribed under the Third Schedule of SEBI (Investment Advisers) Regulations, 2013 pursuant to Regulation 15(9).",
        image: img("/images/why-us-fiduciary.jpg", "SEBI Code of Conduct for Investment Advisers"),
      },
      { anchor: "code-of-conduct-hero" }
    ),
    section("sebi-code-body", "sebiCodeBody", "Code Principles", {
      directiveIcon: "Scale",
      directiveEyebrow: "Third Schedule • Regulation 15(9)",
      directiveTitle:
        "In accordance with the third schedule of IA Regulations u/r 15(9) of the IA Regulations which covers the Code of conduct for investment adviser:",
      directiveText:
        "Neuron Wealth Advisors LLP strictly abides by all statutory standards of integrity, professional skill, thorough analysis, client confidentiality, and fair dealing established by the Securities and Exchange Board of India.",

      principles: items("sc-principle", [
        {
          number: "1",
          anchor: "honesty-fairness",
          title: "Honesty and fairness",
          statement:
            "An investment adviser shall act honestly, fairly and in the best interests of its clients and in the integrity of the market.",
        },
        {
          number: "2",
          anchor: "diligence",
          title: "Diligence",
          statement:
            "An investment adviser shall act with due skill, care and diligence in the best interests of its clients and shall ensure that its advice is offered after thorough analysis and taking into account available alternatives.",
        },
        {
          number: "3",
          anchor: "capabilities",
          title: "Capabilities",
          statement:
            "An investment adviser shall have and employ effectively appropriate resources and procedures which are needed for the efficient performance of its business activities.",
        },
        {
          number: "4",
          anchor: "info-about-clients",
          title: "Information about clients",
          statement:
            "An investment adviser shall seek from its clients, information about their financial situation, investment experience and investment objectives relevant to the services to be provided and maintain confidentiality of such information.",
        },
        {
          number: "5",
          anchor: "info-to-clients",
          title: "Information to its clients",
          statement:
            "An investment adviser shall make adequate disclosures of relevant material information while dealing with its clients.",
        },
        {
          number: "6",
          anchor: "fair-charges",
          title: "Fair and reasonable charges",
          statement:
            "An investment adviser advising a client may charge fees, subject to any ceiling as may be specified by the Board. The investment adviser shall ensure that fees charged to the clients is fair and reasonable.",
        },
        {
          number: "7",
          anchor: "conflicts-interest",
          title: "Conflicts of interest",
          statement:
            "An investment adviser shall try to avoid conflicts of interest as far as possible and when they cannot be avoided, it shall ensure that appropriate disclosures are made to the clients and that the clients are fairly treated.",
        },
        {
          number: "8",
          anchor: "compliance",
          title: "Compliance",
          statement:
            "An investment adviser including its partners, principal officer and persons associated with investment advice, as the case may be, shall comply with all regulatory requirements applicable to the conduct of its business activities so as to promote the best interests of clients and the integrity of the market.",
        },
        {
          number: "9",
          anchor: "senior-management",
          title: "Responsibility of senior management",
          statement:
            "The senior management of the LLP shall bear primary responsibility for ensuring the maintenance of appropriate standards of conduct and adherence to proper procedures by the LLP.",
        },
      ]),

      navEyebrow: "On This Page",
      navTitle: "Code Principles",

      credentialIcon: "Scale",
      credentialLabel: "Statutory Oversight",
      credentialValue: "INA000016481",
      credentialFacts: items("sc-fact", [
        { label: "Act:", value: "SEBI IA Reg. 2013", highlight: false },
        { label: "Schedule:", value: "Third Schedule", highlight: false },
        { label: "Regulation:", value: "Reg. 15(9)", highlight: false },
        { label: "Ethics:", value: "100% Fiduciary Standard", highlight: true },
      ]),
      credentialLink: lnk("Verify on SEBI Portal", "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13", {
        newTab: true,
      }),

      contactEyebrow: "Direct Inquiries",
      contactTitle: "Compliance Desk",
      contactAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015",
    }),
  ],
};

module.exports = { sectionTypes, page };
