import { img, lnk, section, items } from "../cmsContent";

const DOC_PAGE_1 =
  "https://neuronwealth.com/wp-content/uploads/2022/02/CFA-Code-of-Ethics-and-Standards-of-Professional-Conduct_page-0001.jpg";
const DOC_PAGE_2 = "https://neuronwealth.com/wp-content/uploads/2022/03/CFA2-scaled.jpg";

export const page = {
  slug: "cfa-code-of-conduct",
  title: "CFA Code of Conduct",
  description:
    "The CFA Institute Code of Ethics and Standards of Professional Conduct followed by Neuron Wealth Advisors LLP under CFA Charterholder Jigar Patel.",
  category: "core",
  icon: "Award",
  status: "published",
  seo: {
    title: "CFA Code of Conduct | Ethics & Professional Standards | Neuron Wealth Advisors",
    description:
      "Official CFA Institute Code of Ethics and Standards of Professional Conduct followed by Neuron Wealth Advisors LLP. Leadership under CFA Charterholder Jigar Patel since 2011.",
  },
  sections: [
    section(
      "cfa-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "CFA Code of Conduct",
        title: "CFA Code",
        highlight: "of Conduct",
        text: "CFA Institute Code of Ethics and Standards of Professional Conduct — upholding global benchmark standards in investment integrity, client loyalty, and fiduciary responsibility.",
        image: img("/images/why-us-fiduciary.jpg", "CFA Institute Code of Ethics and Standards of Professional Conduct"),
      },
      { anchor: "cfa-hero" }
    ),
    section("cfa-code-body", "cfaCodeBody", "Code & Standards", {
      docIcon: "FileText",
      docEyebrow: "Official Documentation",
      docTitle: "CFA Institute Document Repository",
      docText: "Official scanned documents of the CFA Institute Code of Ethics and Standards of Professional Conduct.",
      documents: items("cfa-doc", [
        {
          label: "Document Page 1",
          image: img(DOC_PAGE_1, "CFA Code of Ethics and Standards of Professional Conduct Page 1"),
          caption: "CFA Code of Ethics and Standards of Professional Conduct • Page 1",
          allCaption: "Page 1: Code of Ethics & Standards I – III",
        },
        {
          label: "Document Page 2",
          image: img(DOC_PAGE_2, "CFA Code of Ethics and Standards of Professional Conduct Page 2"),
          caption: "CFA Code of Ethics and Standards of Professional Conduct • Page 2",
          allCaption: "Page 2: Standards IV – VII & Summary",
        },
      ]),
      allTabLabel: "All Pages (Both)",
      openLabel: "Open Full Size",

      preambleIcon: "Award",
      preambleEyebrow: "Global Gold Standard of Ethical Conduct",
      preambleTitle: "CFA Institute Code of Ethics & Standards of Professional Conduct",
      preambleLead: "Neuron Wealth Advisors LLP operates under the leadership of Principal Officer",
      preambleName: "Mr. Jigar Patel",
      preambleText:
        ", a CFA Charterholder from the CFA Institute, USA since 2011 and an active volunteer for the CFA Society India (Ahmedabad chapter) since 2012. We proudly align our fiduciary practice with the world’s most recognized standard of investment ethics.",

      ethicsEyebrow: "Fundamental Precepts",
      ethicsTitle: "The Code of Ethics",
      ethicsBadge: "6 Core Principles",
      ethicsIntro:
        "Members of CFA Institute (including CFA charterholders) and candidates for the CFA designation must adhere to the following principles:",
      ethics: items("cfa-ethic", [
        {
          title: "Integrity, Competence & Respect",
          desc: "Act with integrity, competence, diligence, respect and in an ethical manner with the public, clients, prospective clients, employers, employees, colleagues in the investment profession, and other participants in the global capital markets.",
        },
        {
          title: "Client & Profession Supremacy",
          desc: "Place the integrity of the investment profession and the interests of clients above their own personal interests.",
        },
        {
          title: "Reasonable Care & Independent Judgment",
          desc: "Use reasonable care and exercise independent professional judgment when conducting investment analysis, making investment recommendations, taking investment actions, and engaging in other professional activities.",
        },
        {
          title: "Exemplary Ethical Leadership",
          desc: "Practice and encourage others to practice in a professional and ethical manner that will reflect credit on themselves and the profession.",
        },
        {
          title: "Capital Markets Integrity",
          desc: "Promote the integrity and viability of the global capital markets for the ultimate benefit of society.",
        },
        {
          title: "Continuous Professional Excellence",
          desc: "Maintain and improve their professional competence and strive to maintain and improve the competence of other investment professionals.",
        },
      ]),

      standardsEyebrow: "Professional Framework",
      standardsTitle: "Standards of Professional Conduct (Standards I – VII)",
      standardsText:
        "Detailed statutory rules governing fiduciary relationships, professional independence, fair dealing, and conflict management.",
      standards: items("cfa-standard", [
        {
          anchor: "standard-1",
          roman: "I",
          title: "Professionalism",
          highlight: false,
          substandards: items("cfa-std-1", [
            {
              code: "I(A)",
              name: "Knowledge of the Law",
              desc: "Understand and comply with all applicable laws, rules, and regulations (including the Code and Standards) of any government, regulatory organization, licensing agency, or professional association governing professional activities. In the event of conflict, comply with the stricter law, rule, or regulation. Never knowingly participate or assist in violations.",
            },
            {
              code: "I(B)",
              name: "Independence and Objectivity",
              desc: "Use reasonable care and judgment to achieve and maintain independence and objectivity in professional activities. Do not offer, solicit, or accept any gift, benefit, compensation, or consideration that could compromise independence and objectivity.",
            },
            {
              code: "I(C)",
              name: "Misrepresentation",
              desc: "Do not knowingly make any misrepresentations relating to investment analysis, recommendations, actions, or other professional activities.",
            },
            {
              code: "I(D)",
              name: "Misconduct",
              desc: "Do not engage in any professional conduct involving dishonesty, fraud, or deceit or commit any act that reflects adversely on professional reputation, integrity, or competence.",
            },
          ]),
        },
        {
          anchor: "standard-2",
          roman: "II",
          title: "Integrity of Capital Markets",
          highlight: false,
          substandards: items("cfa-std-2", [
            {
              code: "II(A)",
              name: "Material Nonpublic Information",
              desc: "Members and Candidates who possess material nonpublic information that could affect the value of an investment must not act or cause others to act on the information.",
            },
            {
              code: "II(B)",
              name: "Market Manipulation",
              desc: "Do not engage in practices that distort prices or artificially inflate trading volume with the intent to mislead market participants.",
            },
          ]),
        },
        {
          anchor: "standard-3",
          roman: "III",
          title: "Duties to Clients",
          highlight: true,
          substandards: items("cfa-std-3", [
            {
              code: "III(A)",
              name: "Loyalty, Prudence, and Care",
              desc: "Duty of loyalty to clients; act with reasonable care and exercise prudent judgment. Act for the benefit of clients and place clients’ interests before employer’s or own personal interests.",
            },
            {
              code: "III(B)",
              name: "Fair Dealing",
              desc: "Deal fairly and objectively with all clients when providing investment analysis, making investment recommendations, taking investment action, or engaging in other professional activities.",
            },
            {
              code: "III(C)",
              name: "Suitability",
              desc: "Make reasonable inquiry into client's investment experience, risk and return objectives, and financial constraints prior to making recommendations; judge suitability of investments in the context of the client’s total portfolio.",
            },
            {
              code: "III(D)",
              name: "Performance Presentation",
              desc: "When communicating investment performance information, make reasonable efforts to ensure that it is fair, accurate, and complete.",
            },
            {
              code: "III(E)",
              name: "Preservation of Confidentiality",
              desc: "Keep information about current, former, and prospective clients strictly confidential unless the information concerns illegal activities, disclosure is required by law, or client permits disclosure.",
            },
          ]),
        },
        {
          anchor: "standard-4",
          roman: "IV",
          title: "Duties to Employers",
          highlight: false,
          substandards: items("cfa-std-4", [
            {
              code: "IV(A)",
              name: "Loyalty",
              desc: "Act for the benefit of employer and do not deprive employer of the advantage of skills and abilities, divulge confidential information, or otherwise cause harm.",
            },
            {
              code: "IV(B)",
              name: "Additional Compensation Arrangements",
              desc: "Do not accept gifts, benefits, compensation, or consideration that competes with or creates a conflict of interest with employer’s interest without written consent from all parties.",
            },
            {
              code: "IV(C)",
              name: "Responsibilities of Supervisors",
              desc: "Make reasonable efforts to ensure that anyone subject to supervision complies with applicable laws, rules, regulations, and the Code and Standards.",
            },
          ]),
        },
        {
          anchor: "standard-5",
          roman: "V",
          title: "Investment Analysis, Recommendations, and Actions",
          highlight: false,
          substandards: items("cfa-std-5", [
            {
              code: "V(A)",
              name: "Diligence and Reasonable Basis",
              desc: "Exercise diligence, independence, and thoroughness in analyzing investments, making recommendations, and taking investment actions supported by adequate research and investigation.",
            },
            {
              code: "V(B)",
              name: "Communication with Clients and Prospective Clients",
              desc: "Disclose the basic format and general principles of investment processes; disclose significant limitations and risks; distinguish between fact and opinion in presentations.",
            },
            {
              code: "V(C)",
              name: "Record Retention",
              desc: "Develop and maintain appropriate records to support investment analyses, recommendations, actions, and all other investment-related communications.",
            },
          ]),
        },
        {
          anchor: "standard-6",
          roman: "VI",
          title: "Conflicts of Interest",
          highlight: true,
          substandards: items("cfa-std-6", [
            {
              code: "VI(A)",
              name: "Disclosure of Conflicts",
              desc: "Full and fair disclosure of all matters that could reasonably be expected to impair independence and objectivity or interfere with respective duties to clients, prospective clients, and employer.",
            },
            {
              code: "VI(B)",
              name: "Priority of Transactions",
              desc: "Investment transactions for clients and employers must have priority over investment transactions in which a Member or Candidate is the beneficial owner.",
            },
            {
              code: "VI(C)",
              name: "Referral Fees",
              desc: "Disclose to employer, clients, and prospective clients any compensation, consideration, or benefit received from, or paid to, others for the recommendation of products or services.",
            },
          ]),
        },
        {
          anchor: "standard-7",
          roman: "VII",
          title: "Responsibilities as a CFA Institute Member or CFA Candidate",
          highlight: false,
          substandards: items("cfa-std-7", [
            {
              code: "VII(A)",
              name: "Conduct as Participants in CFA Institute Programs",
              desc: "Do not engage in any conduct that compromises the reputation or integrity of CFA Institute or the CFA designation or the integrity, validity, or security of CFA Institute programs.",
            },
            {
              code: "VII(B)",
              name: "Reference to CFA Institute, Designation, and Program",
              desc: "Do not misrepresent or exaggerate the meaning or implications of membership in CFA Institute, holding the CFA designation, or candidacy in the CFA Program.",
            },
          ]),
        },
      ]),

      navEyebrow: "On This Page",
      navTitle: "Code & Standards",
      navItems: items("cfa-nav", [
        { label: "Official Document Repository", target: "document-view" },
        { label: "CFA Charterholder Commitment", target: "cfa-preamble" },
        { label: "The Code of Ethics", target: "code-of-ethics" },
        { label: "Standards of Professional Conduct", target: "standards-conduct" },
        { label: "I. Professionalism", target: "standard-1" },
        { label: "II. Integrity of Capital Markets", target: "standard-2" },
        { label: "III. Duties to Clients", target: "standard-3" },
        { label: "IV. Duties to Employers", target: "standard-4" },
        { label: "V. Investment Analysis & Action", target: "standard-5" },
        { label: "VI. Conflicts of Interest", target: "standard-6" },
        { label: "VII. CFA Institute Responsibilities", target: "standard-7" },
      ]),

      credentialIcon: "Award",
      credentialEyebrow: "CFA Charterholder",
      credentialTitle: "CFA Institute, USA",
      credentialFacts: items("cfa-fact", [
        { label: "Charterholder:", value: "Jigar Patel", accent: false },
        { label: "Charter Year:", value: "Since 2011", accent: false },
        { label: "Society:", value: "CFA Society India", accent: false },
        { label: "Role:", value: "Ahmedabad Chapter Volunteer", accent: true },
      ]),
      credentialLink: lnk("Visit CFA Institute", "https://www.cfainstitute.org/", { newTab: true }),

      contactEyebrow: "Direct Support",
      contactTitle: "Advisory Desk",
      contactAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015",
    }),
  ],
};
