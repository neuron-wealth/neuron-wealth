const { text, textarea, link, icon, paragraphs, toggle, list } = require("../cmsFields");
const { img, lnk, section, items } = require("../cmsContent");

const PREAMBLE = "Preamble";
const FUNCTIONS = "Functions";
const SIDEBAR = "Sidebar";

const sectionTypes = {
  iaFunctionsBody: {
    label: "Investment Adviser Functions & Sidebar",
    description: "Statutory preamble and numbered function cards with a sticky contents, SEBI framework and direct support sidebar.",
    icon: "ListChecks",
    design: ["anchor"],
    fields: [
      { ...icon("preambleIcon", "Preamble Icon"), group: PREAMBLE },
      text("preambleEyebrow", "Preamble Eyebrow", 120, { group: PREAMBLE }),
      textarea("preambleTitle", "Preamble Heading", 400, { group: PREAMBLE }),

      list(
        "functions",
        "Function Cards",
        "Function",
        40,
        [
          text("number", "Number", 10),
          text("title", "Title", 160),
          text("anchor", "Anchor ID", 40, { hint: "Used for the sidebar link. Lowercase letters, numbers and hyphens only." }),
          paragraphs("paragraphs", "Paragraphs", 8, 1500),
        ],
        { titleKey: "title", group: FUNCTIONS }
      ),

      text("navEyebrow", "Contents Card Eyebrow", 60, { group: SIDEBAR }),
      text("navTitle", "Contents Card Title", 80, { group: SIDEBAR }),
      { ...icon("frameworkIcon", "Framework Card Icon"), group: SIDEBAR },
      text("frameworkEyebrow", "Framework Card Eyebrow", 60, { group: SIDEBAR }),
      text("frameworkTitle", "Framework Card Title", 80, { group: SIDEBAR }),
      list(
        "frameworkRows",
        "Framework Card Rows",
        "Row",
        8,
        [text("label", "Label", 60), text("value", "Value", 80), toggle("highlight", "Show Value in Green")],
        { titleKey: "label", group: SIDEBAR }
      ),
      link("frameworkLink", "Framework Card Button", { group: SIDEBAR }),
      text("contactEyebrow", "Contact Card Eyebrow", 60, { group: SIDEBAR }),
      text("contactTitle", "Contact Card Title", 80, { group: SIDEBAR }),
      textarea("contactAddress", "Contact Card Address", 300, {
        group: SIDEBAR,
        hint: "Email and phone come from the site contact settings.",
      }),
    ],
  },
};

const page = {
  slug: "functions-of-investment-adviser",
  title: "Functions of Investment Adviser",
  description:
    "Statutory functions, obligations, duties and responsibilities of Neuron Wealth Advisors LLP under the SEBI (Investment Advisers) Regulations, 2013.",
  category: "core",
  icon: "BookOpen",
  status: "published",
  seo: {
    title: "Functions of Investment Adviser | Neuron Wealth Advisors",
    description:
      "Statutory functions, obligations, duties, and responsibilities of Neuron Wealth Advisors LLP under the SEBI (Investment Advisers) Regulations, 2013.",
  },
  sections: [
    section(
      "functions-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "Functions of Investment Adviser",
        title: "Functions of",
        highlight: "Investment Adviser",
        text: "Comprehensive functions, fiduciary obligations, duties, and statutory responsibilities governing our relationship with clients under the SEBI (Investment Advisers) Regulations, 2013.",
        image: img("/images/why-us-fiduciary.jpg", "Functions and Duties of Investment Adviser"),
      },
      { anchor: "functions-hero" }
    ),
    section("functions-content", "iaFunctionsBody", "Functions & Sidebar", {
      preambleIcon: "Scale",
      preambleEyebrow: "Statutory Mandate • SEBI IA Framework",
      preambleTitle:
        "Functions, obligations, duties and responsibilities of the Investment Adviser (including principal officer and all persons associated with the investment advice) include the following, subject to this agreement:",

      functions: items("iaf-fn", [
        {
          number: "1",
          title: "Fiduciary duty",
          anchor: "fiduciary-duty",
          paragraphs: [
            "The investment adviser shall act in a fiduciary capacity towards its clients and shall disclose all conflicts of interests as and when they arise.",
          ],
        },
        {
          number: "2",
          title: "Restricted Consideration",
          anchor: "restricted-consideration",
          paragraphs: [
            "The investment adviser shall not receive any consideration by way of remuneration or compensation or in any other form from any person other than the client being advised, in respect of the underlying products or securities for which advice is provided.",
          ],
        },
        {
          number: "3",
          title: "Arms-Length activities",
          anchor: "arms-length-activities",
          paragraphs: [
            "The investment adviser shall maintain an arms-length relationship between its activities as an investment adviser and other activities.",
          ],
        },
        {
          number: "4",
          title: "Segregation of IA services",
          anchor: "segregation-ia-services",
          paragraphs: [
            "The investment adviser which is also engaged in activities other than investment advisory services shall ensure that the investment advisory services are clearly segregated from all other activities, in the manner as prescribed under the IA Regulations.",
          ],
        },
        {
          number: "5",
          title: "Disclosure of conflict of interest",
          anchor: "disclosure-conflict-interest",
          paragraphs: [
            "The investment adviser shall ensure that in case of any conflict of interest of the investment advisory activities with other activities, such conflict of interest shall be disclosed to the client.",
          ],
        },
        {
          number: "6",
          title: "Non-disclosure of confidential information",
          anchor: "non-disclosure-confidential-info",
          paragraphs: [
            "The investment adviser shall not divulge any confidential information about its clients, which has come to its knowledge, without taking prior permission of its clients, except where such disclosures are required to be made in compliance with any law for the time being in force.",
            "However, the client hereby agree, acknowledge, consent and permit to the processing and use of the confidential information including personal data and financial data, by the adviser including third party vendors, as far as it is necessary for the performance of functions, obligations and responsibilities, towards providing services, herein.",
            "The Client also agrees and allows the Adviser to include a general description of work performed for the purpose of demonstrating its experience to other potential clients or prepare and share it as a case study or use any other mode without naming the Client. The Adviser will also be entitled to use the Client as a reference to other potential work or clients.",
          ],
        },
        {
          number: "7",
          title: "Restricted Transactions contrary to advise given",
          anchor: "restricted-transactions-contrary",
          paragraphs: [
            "The investment advisor shall not enter into transactions on its own account which is contrary to its advice given to the client for a period of fifteen days from the day of such advice.",
            "Provided that during the period of such fifteen days, if the investment adviser is of the opinion that the situation has changed, then it may enter into such a transaction on its own account after giving such revised assessment to the client at least 24 hours in advance of entering into such transaction.",
            "The client agrees that the advice given is subject to a specific set of factors including the client-profile, risk-profile, goals, market conditions and others, and such set of factors differ for different persons including the adviser. Therefore, the client agrees to consent and permit that the investment adviser may enter into transactions on its own account which may be contrary to the advice given to the client. In case, the client need any confirmation or clarification or have any objection in investment adviser’s such transactions or holding or position, the client shall notify the adviser immediately.",
          ],
        },
        {
          number: "8",
          title: "KYC compliance",
          anchor: "kyc-compliance",
          paragraphs: [
            "The investment advisor shall follow Know Your Client (‘KYC’) procedure as specified by the Board from time to time.",
          ],
        },
        {
          number: "9",
          title: "Code of Conduct",
          anchor: "code-of-conduct",
          paragraphs: [
            "The investment adviser shall abide by Code of Conduct as specified in Third Schedule of the IA Regulations – contained as in Schedule G.",
          ],
        },
        {
          number: "10",
          title: "Restricted Transactions on own account",
          anchor: "restricted-transactions-own-account",
          paragraphs: [
            "The investment adviser shall not act on its own account, knowingly to sell securities or investment products to or purchase securities or investment product from a client.",
          ],
        },
        {
          number: "11",
          title: "Prior approval for change in control",
          anchor: "prior-approval-change-control",
          paragraphs: ["In case of change in control of the investment adviser, prior approval from the Board shall be taken."],
        },
        {
          number: "12",
          title: "Submission of Information",
          anchor: "submission-of-information",
          paragraphs: [
            "The investment adviser shall furnish to the Board, information and reports as may be specified by the Board from time to time.",
          ],
        },
        {
          number: "13",
          title: "Compliance with Certification and Qualification requirements",
          anchor: "compliance-certification-qualification",
          paragraphs: [
            "The investment adviser shall ensure compliance with the certification and qualification requirements as specified u/r 7 of IA Regulations, at all times.",
            "These include, the qualification and certification requirement for a principal officer and for the persons associated with investment advice.",
          ],
        },
        {
          number: "14",
          title: "Compliance with Regulatory mandates",
          anchor: "compliance-regulatory-mandates",
          paragraphs: ["The investment adviser shall ensure compliance with the Regulatory mandates."],
        },
        {
          number: "15",
          title: "Compliance with Eligibility criteria",
          anchor: "compliance-eligibility-criteria",
          paragraphs: [
            "The investment adviser shall ensure compliance with the eligibility criteria as specified under the IA Regulations at all times.",
          ],
        },
        {
          number: "16",
          title: "Risk profiling and suitability",
          anchor: "risk-profiling-suitability",
          paragraphs: [
            "The investment adviser follows a set process of risk profiling, risk assessment and suitability analysis, as mandated u/r 16 and 17 of IA Regulations and other regulatory mandates, including risk capacity and risk aversion.",
          ],
        },
        {
          number: "17",
          title: "Reports to clients",
          anchor: "reports-to-clients",
          paragraphs: ["The investment adviser shall provide reports to the client on potential and current investments, as required."],
        },
        {
          number: "18",
          title: "Maintenance of records",
          anchor: "maintenance-of-records",
          paragraphs: [
            "The investment adviser shall maintain the records, as specified u/r 19(1) of IA Regulations and related books of accounts including client accounts and data.",
          ],
        },
        {
          number: "19",
          title: "Audit as per the IA Regulations",
          anchor: "audit-ia-regulations",
          paragraphs: [
            "The investment adviser shall conduct yearly audit u/r 19(3) of IA Regulations, in respect of compliance with the IA Regulations.",
          ],
        },
      ]),

      navEyebrow: "On This Page",
      navTitle: "Functions & Obligations",
      frameworkIcon: "Scale",
      frameworkEyebrow: "SEBI IA Framework",
      frameworkTitle: "INA000016481",
      frameworkRows: items("iaf-row", [
        { label: "Standard:", value: "Fiduciary Capacity", highlight: false },
        { label: "Fees:", value: "Direct-Client Only", highlight: false },
        { label: "Segregation:", value: "Strict Arms-Length", highlight: false },
        { label: "Audit:", value: "Yearly u/r 19(3)", highlight: true },
      ]),
      frameworkLink: lnk(
        "Verify on SEBI Portal",
        "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13",
        { newTab: true }
      ),
      contactEyebrow: "Direct Support",
      contactTitle: "Advisory Desk",
      contactAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015",
    }),
  ],
};

module.exports = { sectionTypes, page };
