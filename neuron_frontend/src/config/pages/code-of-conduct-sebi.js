import { img, lnk, section, items } from "../cmsContent";

export const page = {
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
