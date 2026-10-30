import { img, lnk, section, items } from "../cmsContent";

export const page = {
  slug: "conflict-of-interest",
  title: "Conflict of Interest",
  description: "How Neuron Wealth Advisors LLP identifies, discloses and manages potential conflicts of interest so that every client is treated fairly.",
  category: "core",
  icon: "Scale",
  status: "published",
  seo: {
    title: "Conflict of Interest Disclosures | Neuron Wealth Advisors",
    description: "How Neuron Wealth Advisors LLP identifies, discloses and manages potential conflicts of interest so that every client is treated fairly.",
  },
  sections: [
    section(
      "conflict-of-interest-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "Conflict of Interest",
        title: "Conflict of",
        highlight: "Interest",
        text: "How we identify, disclose and manage potential conflicts of interest so that every client is treated fairly and transparently.",
        image: img("/images/why-us-fiduciary.jpg", "Conflict of Interest - Neuron Wealth Advisors"),
      },
      { anchor: "conflict-of-interest-hero" }
    ),
    section("conflict-of-interest-content", "iaFunctionsBody", "Content & Sidebar", {
      preambleIcon: "Scale",
      preambleEyebrow: "Conflict of Interest Policy • SEBI IA Framework",
      preambleTitle:
        "Neuron Wealth Advisors LLP (NWA) shall try to avoid conflicts of interest as far as possible and when they cannot be avoided, it shall ensure that appropriate disclosures are made to the clients and that the clients are fairly treated.",

      functions: items("conf-item", [
        {
          number: "1",
          title: "Relevant Parties",
          anchor: "relevant-parties",
          paragraphs: [
            "The conflicts of interest may arise in relation to the various activities carried out by NWA and their respective partners, officers, employees, agents (collectively, the Relevant Parties) which are engaged in broad spectrum of activities in the financial sector. NWA will endeavor to resolve any such conflicts in a reasonable manner as it deems fit.",
          ],
        },
        {
          number: "2",
          title: "Good Faith & Transparency",
          anchor: "good-faith-transparency",
          paragraphs: [
            "The Relevant Party(ies) shall exercise a standard of good faith in their dealings with the various activities. NWA will be transparent and make disclosures with respect to conflicts of interest situation that NWA determines may have arisen (or which seem likely to arise) between the Relevant Parties and the various activities of NWA.",
          ],
        },
        {
          number: "3",
          title: "Identifying & Managing Conflicts",
          anchor: "identifying-managing-conflicts",
          paragraphs: [
            "NWA maintains and operates effective organizational and administrative arrangements with the view of taking all reasonable steps to identify, continuously monitor and manage conflicts of interest. Some of the potential conflicts of interest situations are provided below:",
          ],
        },
        {
          number: "4",
          title: "Allocation of Time & Resources",
          anchor: "allocation-of-time-resources",
          paragraphs: [
            "The Relevant Parties providing services to the investor will have, in addition to their responsibilities for one client, responsibilities for the firm and other clients. Accordingly, they may have conflicts of interests in allocating management time and other resources amongst the various activities of NWA and clients.",
          ],
        },
        {
          number: "5",
          title: "Firm Interest in Securities",
          anchor: "firm-interest-in-securities",
          paragraphs: [
            "NWA and/or any of the Relevant Parties, while managing the funds of investor, may from time-to-time effect transactions in securities in which NWA may have a financial or other business interest.",
          ],
        },
        {
          number: "6",
          title: "Similar or Contra Positions",
          anchor: "similar-or-contra-positions",
          paragraphs: [
            "NWA and/or any of the Relevant Parties and/or its advisory clients may have existing similar or contra positions in the stocks/funds recommended in one client's account and may execute their trades at different timeline based on their execution strategy which may not match with advice or trade execution in other client(s).",
          ],
        },
        {
          number: "7",
          title: "Statement of Principles",
          anchor: "statement-of-principles",
          paragraphs: [
            "It is not intended to provide a comprehensive list of conflicts of interest or account of the processes and procedures which NWA adopts in connection with the management of conflicts of interest but is instead intended to be a statement of principles with which NWA seeks to manage foreseeable conflicts of interest. NWA may identify additional conflicts of interest situations from time to time, which will be managed/mitigated with the help of the principles identified herein and by also taking into account further processes which NWA may develop over the period of time.",
          ],
        },
      ]),

      navEyebrow: "On This Page",
      navTitle: "Conflict of Interest",
      frameworkIcon: "Scale",
      frameworkEyebrow: "SEBI IA Framework",
      frameworkTitle: "INA000016481",
      frameworkRows: items("conf-row", [
        { label: "Standard:", value: "Fiduciary Capacity", highlight: false },
        { label: "Disclosure:", value: "Proactive & Written", highlight: false },
        { label: "Fees:", value: "Fee-only, No Commissions", highlight: false },
        { label: "Clients:", value: "Treated Fairly", highlight: true },
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
