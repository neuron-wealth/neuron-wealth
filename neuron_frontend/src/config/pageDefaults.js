// Fallback copy of neuron_backend/src/config/pageDefaults.js — keep both in sync.
import { extraPages } from "./pages";

const img = (url, alt, extra = {}) => ({ url, alt, width: 0, height: 0, fit: "", position: "", ...extra });
const lnk = (label, href, extra = {}) => ({ label, shortLabel: "", href, newTab: false, ...extra });
const design = (extra = {}) => ({
  background: "default",
  backgroundColor: "#F7F8F5",
  spacing: "default",
  tone: "auto",
  align: "default",
  columns: "default",
  imageSide: "default",
  cardStyle: "default",
  layout: "default",
  width: "default",
  anchor: "",
  ...extra,
});
const section = (id, type, label, content, designExtra) => ({ id, type, label, visible: true, design: design(designExtra), content });
const items = (prefix, list) => list.map((entry, index) => ({ id: `${prefix}-${index + 1}`, visible: true, ...entry }));

const member = (name, role, initials, highlight, credentials, bio, fullBio, image = "") => ({
  name,
  role,
  initials,
  highlight,
  credentials,
  bio,
  fullBio,
  image: img(image, image ? name : ""),
});

const home = {
  slug: "home",
  title: "Home Page",
  description: "Hero banner, SEBI data, audiences, call back form, Why Us, wealth architecture, insights and team.",
  category: "core",
  icon: "House",
  status: "published",
  seo: { title: "", description: "" },
  sections: [
    section("hero", "hero", "Hero Banner", {
      tags: ["WEALTH ADVISORY", "FAMILY OFFICE", "NRI SOLUTIONS"],
      title: "Simplifying",
      highlight: "Financial Life",
      text:
        "At Neuron Wealth, we help individuals, families and NRIs create, protect and grow their wealth with clarity, discipline and a long-term perspective. The advice stays fee-only and is reviewed as your goals, family and financial life change.",
      primaryButton: lnk("Schedule a Consultation", "/contact", { shortLabel: "Schedule Call" }),
      secondaryButton: lnk("Explore Our Services", "/#wealth-management-for", { shortLabel: "Our Services" }),
      image: img("/images/home/hero-window.jpg", "A refined office with floor-to-ceiling windows overlooking a city skyline"),
      showOrbit: true,
      orbitLines: ["Disciplined", "Advice for", "a Brighter", "Tomorrow"],
      stats: items("stat", [
        { value: "11", leadWord: "Team", label: "Members", icon: "StatTeam" },
        { value: "150+", leadWord: "Years", label: "Combined Experience", icon: "StatExperience" },
        { value: "10+", leadWord: "Education", label: "Qualifications", icon: "StatEducation" },
        { value: "100+", leadWord: "Presentations", label: "All over the world", icon: "StatPresentation" },
      ]),
    }),
    section(
      "sebi-data",
      "table",
      "SEBI Complaints Data",
      {
        eyebrow: "",
        title: "Data as Required by SEBI",
        lead: "Number of Complaints as on Sep 30, 2026.",
        text: "",
        link: lnk("Click here for SEBI Regulatory Compliance Disclosures", "/sebi-regulatory-compliance"),
        table: {
          columns: [
            "At the beginning of the Month",
            "Received during the Month",
            "Resolved during the Month",
            "Pending at the end of the Month",
            "Reasons for dependency",
          ],
          rows: [["0", "0", "0", "0", "N/A"]],
        },
        caption: "Number of Complaints as on Sep 30, 2026 as required by SEBI",
        showDivider: true,
      },
      { anchor: "sebi-compliance" }
    ),
    section("who-we-advise", "imageCards", "Who We Advise", {
      eyebrow: "Who We Advise",
      title: "Wealth Management For",
      text:
        "Tailored multi-generational wealth advisory, cross-border family stewardship, and fiduciary wealth management for global families, founders, and executives.",
      items: items("audience", [
        {
          title: "NRIs Returning to India",
          subtitle: "Coming home after years abroad?",
          text: "Plan your move before you book the ticket. We help you use your RNOR years well, decide what stays abroad and what comes to India, and stay compliant in both countries.",
          image: img("/images/home/nri-horizon.jpg", "An airplane wing above a coastal city at dusk"),
          icon: "Plane",
          link: lnk("See how we help", "/services/nri-returning-to-india"),
        },
        {
          title: "Global Indians (NRIs and PIOs)",
          subtitle: "Living abroad, still connected to India?",
          text: "Invest, sell property, inherit family assets and take money back the right way. We help you avoid paying tax twice on the same income.",
          image: img("/images/home/hero-window.jpg", "A refined office with floor-to-ceiling windows overlooking a city skyline"),
          icon: "Globe",
          link: lnk("See how we help", "/services/global-indians"),
        },
        {
          title: "Global Citizens in India",
          subtitle: "A foreign citizen who made India home?",
          text: "Know what you can invest in, what to report and where to pay tax. Stay right with India and your home country.",
          image: img("/images/home/hero-residence.jpg", "A bright living room with a sofa, stone table, and a city skyline beyond the windows"),
          icon: "Landmark",
          link: lnk("See how we help", "/services/global-citizens-in-india"),
        },
        {
          title: "Global Investors",
          subtitle: "Living in India, investing abroad?",
          text: "Diversify, fund your child’s education or buy a home overseas. Invest wisely and avoid costly tax mistakes.",
          image: img("/images/home/investment-still.jpg", "An architectural model, notebook, and pen on a stone table"),
          icon: "TrendingUp",
          link: lnk("See how we help", "/services/global-investor"),
        },
        {
          title: "Professionals and CXOs",
          subtitle: "Earning well, but short on time?",
          text: "Salary, bonus, ESOPs and RSUs deserve a clear plan. We become your Family CFO to create lasting family wealth, so you can focus on your work.",
          image: img("/images/home/family-shore.jpg", "A family walking along a quiet shore at sunset"),
          icon: "Briefcase",
          link: lnk("See how we help", "/services/professionals-and-cxos"),
        },
        {
          title: "Founders and Entrepreneurs",
          subtitle: "You built the business. Who looks after the family wealth?",
          text: "Keep business and family money apart, invest the proceeds with care, and plan how wealth passes to the next generation.",
          image: img("/images/home/advisory-room.jpg", "A wood meeting table and upholstered chairs in a room with city windows"),
          icon: "Users",
          link: lnk("See how we help", "/services/founders-and-entrepreneurs"),
        },
      ]),
    }, { anchor: "wealth-management-for" }),
    section(
      "callback",
      "callback",
      "Request a Call Back",
      {
        eyebrow: "Consultation",
        title: "Request a Call Back",
        text: "All consultants are able to give you a free call back at any time.",
        image: img("/images/night-skyline-numbers.jpg", ""),
        services: [
          "Strategy & Planning",
          "Insurance & Risk Management",
          "Cross Country Planning",
          "Taxes & Efficiency",
          "Financial / Investment Decisions",
          "Investment Management",
          "Family Governance",
          "Will & Estate",
          "Documentation & Compliance",
          "Other",
        ],
        namePlaceholder: "Your Name",
        phonePlaceholder: "Phone Number",
        buttonLabel: "Send Request",
      },
      { anchor: "request-callback" }
    ),
    section(
      "why-us",
      "whyUs",
      "Why Us",
      {
        eyebrow: "Why us",
        title: "Why Us ?",
        text:
          "As a SEBI-registered fee-only investment advisor, we stand strictly on your side. Zero product commissions, absolute transparency, and an unwavering fiduciary commitment to your family's long-term prosperity.",
        items: items("why", [
          { title: "Fiduciary Role" },
          { title: "Ethics & Integrity" },
          { title: "Transparent and Genuine Advice" },
          { title: "Expert Knowledge" },
          { title: "Quality Experience" },
        ]),
        button: lnk("Why Associate with Us", "/why-associate"),
        image: img("/images/home/advisory-room.jpg", "A quiet meeting room with a long oak table and a city view"),
        badgeTitle: "SEBI Registered Investment Adviser",
        credentials: items("credential", [
          { name: "SEBI", detail: "Investment Adviser INA000016481" },
          { name: "BASL", detail: "Membership 1697" },
          { name: "NISM", detail: "Certification for the advisory team" },
        ]),
      },
      { anchor: "why-us" }
    ),
    section("wealth-architecture", "cardCarousel", "Simplifying Financial Life", {
      eyebrow: "Wealth architecture",
      title: "Simplifying Financial Life",
      text: "",
      items: items("pillar", [
        {
          title: "Better Tax Planning",
          text:
            "A rupee saved is a rupee earned. We continuously use Tax Optimization strategies to lower the effective income tax on a family basis considering Indian taxation, foreign taxation, and DTAA to minimize the tax drag.",
          image: img("/images/pillar-capability.jpg", "An advisor reviewing charts at a desk beside city windows"),
          icon: "TaxPlanning",
          link: lnk("", ""),
        },
        {
          title: "Better Compliances with laws",
          text:
            "Our investment advice follows world's best practices and considers compliance with Income Tax Act, SEBI Regulations, FEMA, Gift Tax, foreign reporting, and DTAA—preventing notices and inquiries while ensuring complete peace of mind.",
          image: img("/images/pillar-integrity.jpg", "A meeting around a marble table in a room with city windows"),
          icon: "Compliances",
          link: lnk("", ""),
        },
        {
          title: "Better Documentation Management",
          text:
            "Proper documentation is maintained for investment agreements, risk profiling, financial goals, IPS, suitability analysis, and advice rationale—ensuring total transparency, goal clarity, and visualization of the path ahead.",
          image: img("/images/home/advisory-room.jpg", "A quiet meeting room with a long table and a city view"),
          icon: "Documentation",
          link: lnk("", ""),
        },
        {
          title: "Better Financial Decisions",
          text:
            "With research-backed processes, we analyze a 360-degree view of any situation across wealth, family, taxation, and compliance—explaining options in a timely manner resulting in superior, well-informed financial decisions.",
          image: img("/images/pillar-intention.jpg", "Two people shaking hands across a meeting table"),
          icon: "FinancialDecisions",
          link: lnk("", ""),
        },
        {
          title: "Better Investment Management",
          text:
            "Better information leads to better decisions and an optimized investment experience. With tax optimization and risk management, we enhance after-tax, risk-adjusted returns to achieve your goals faster.",
          image: img("/images/home/investment-still.jpg", "An architectural model, notebook, and pen on a stone table"),
          icon: "InvestmentManagement",
          link: lnk("", ""),
        },
        {
          title: "Better Overall Wealth Management",
          text:
            "Integrating tax efficiency, legal compliance, documented processes, and superior decision-making to implement effective wealth strategies for protecting, growing, and sustaining family wealth on a continuous basis.",
          image: img("/images/pillar-results.jpg", "A family gathered on a garden patio"),
          icon: "WealthManagement",
          link: lnk("", ""),
        },
      ]),
    }),
    section("insights", "iconCards", "Knowledge Hub", {
      eyebrow: "",
      title: "Knowledge Hub",
      text: "Read our views on the things that matter to you. And get to know our people. We make the difference.",
      showPattern: true,
      items: items("insight", [
        { title: "Media", text: "News, announcements & press coverage", icon: "Media", link: lnk("", "/insights/media") },
        {
          title: "TV media",
          text: "Television interviews, panel discussions & market commentary",
          icon: "TvMedia",
          link: lnk("", "/insights/tv-media"),
        },
        { title: "Books", text: "Curated knowledge & investment library", icon: "Books", link: lnk("", "/insights/books") },
        { title: "Blogs", text: "Expert financial articles & perspectives", icon: "Blogs", link: lnk("", "/insights/blogs") },
        { title: "YouTube", text: "Channel interviews and explainers", icon: "YouTube", link: lnk("", "/insights/youtube") },
        { title: "Connect", text: "Neuron Wealth Connect newsletters", icon: "Connect", link: lnk("", "/insights/connect") },
      ]),
    }),
    section("team", "team", "Team", {
      showLeader: true,
      leaderEyebrow: "Meet our leader",
      leaderQuote:
        "I started Neuron Wealth with one conviction — every family deserves unbiased, fee-only advice. No commissions, no conflicts, no hidden agenda. Just clarity, trust, and a plan built entirely around you.",
      leaderName: "Mr. Jigar Patel",
      leaderRole: "Principal Officer & Investment Advisor",
      leaderInitials: "JP",
      leaderCredentials: ["CA (India)", "CFA Charterholder (USA)", "CPA (USA)", "MBA-Finance (USA)", "20+ Years Exp"],
      leaderBio:
        "Mr. Jigar Patel is the founder and Principal Officer of Neuron Wealth Advisors LLP, a SEBI-registered fee-only investment advisor. He holds a Chartered Accountancy from India, a CFA Charter from CFA Institute USA, a CPA, and an MBA-Finance from the University of Illinois, Chicago. With over 20 years of experience spanning India and the USA, he advises high-net-worth individuals, NRI families, founders, and global citizens on wealth creation, cross-border tax planning, and multi-generational wealth strategy.",
      leaderImage: img("/images/team/jigar-patel.jpg", "Mr. Jigar Patel"),
      eyebrow: "Our Team",
      title: "The people behind the advice",
      button: lnk("", ""),
      autoScroll: true,
      members: items("member", [
        member(
          "Dr. Hamsa Thota",
          "Mentor",
          "HT",
          "10 U.S. Patents • PDMA USA",
          ["35+ Years Exp", "10 U.S. Patents", "Former President PDMA USA", "INSME Board Member"],
          "Founder and President of Innovation Business Development, Inc and board member of INSME. 35+ years of experience with 10 U.S. patents.",
          [
            'Dr Hamsa Thota is the Founder and President of Innovation Business Development, Inc and currently serves on the board of the International Network for Small and Medium Enterprises (INSME). He is an advisor to the "Art of Science Learning Project", a US NSF funded R&D project to shape 21st-Century US workforce.',
            "During his 35+ years of professional experience, he has developed and commercialized over 200 food products and holds 10 U.S. patents. He is a certified specialist in New Product Development and Organizational Engineering.",
            "He has been a President and Chairman of the Product Development and Management Association (PDMA), USA. He served as an advisor to science and technology departments in China and is a frequent lecturer at national and international events on sustaining innovation, new product development, and the application of innovation best practice tools to grow business with profit.",
            "He was a visiting professor at the Zhejiang University (China) and a guest lecturer at the University of Georgia for Marketing Research and Product Development courses. He co-authored “Key concepts in innovation”, a fundamental reference book on innovation for practitioners, students and scholars.",
          ],
          "/images/team/dr-hamsa-thota.jpg"
        ),
        member(
          "Mayank Patel",
          "PE/VC/Startup Executive",
          "MP",
          "CFA Charterholder (USA)",
          ["Electrical Engineer", "MBA (Finance)", "CFA Charterholder (USA)", "20+ Years Exp"],
          "CFA Charterholder and former CEO of CrAdLE with 20+ years in technology incubation, PE/VC investments, and strategic startup valuation.",
          [
            "Mayank has more than twenty years of experience of working in technology business incubation, academics and banking & financial services sector. He is an Electrical Engineer, MBA (Finance) and a CFA Charterholder from CFA Institute, USA.",
            "Mayank provides consulting for evaluation of start ups and for PE, VC and Startup Investments. He has been a CEO of EDII's technology business incubator, CrAdLE and mentored start-up for strategic financing, and business valuation. He has valued more than 100 small and medium enterprises for investment, especially for venture capital and private equity funding.",
            "As a professor at various education institutions, he has taught students in various finance and investment management subjects including investment analysis, portfolio management, asset valuation, new enterprise financing, international finance and alternative investment.",
          ]
        ),
        member(
          "Reecha Patel",
          "CA, CPA, Taxation Executive",
          "RP",
          "FCA (ICAI) • CPA (USA)",
          ["FCA (ICAI)", "CPA (USA)", "DISA (ICAI)", "M.Com", "15+ Years Exp"],
          "Practicing for 15+ years in taxation. Fellow member of ICAI, passed Uniform CPA exam (USA), with extensive experience in India & US tax compliance.",
          [
            "Reecha has been practicing with more than 15 years of experience in taxation. She is a Fellow member of the Institute of Chartered Accountant of India (FCA) and also passed the Uniform CPA examination from the USA. Additionally, she has a Diploma in Information Systems Audit (DISA) from the ICAI and is a Master of Commerce with Accounting and Statistics from Gujarat University.",
            "Reecha has extensive experience in preparation and review of India and US Income tax returns. She has also volunteered in the Volunteers Income Tax Assistance (VITA) program of IRS when she was in the USA from 2006-2009.",
          ]
        ),
        member(
          "Sajan Rathod",
          "CA, Income Tax Executive",
          "SR",
          "CA (ICAI) • DTAA Specialist",
          ["CA (ICAI)", "M.Com", "10+ Years Exp", "DTAA Specialist"],
          "Chartered Accountant with 10+ years specializing in Indian income tax, DTAA tax reliefs, foreign asset reporting, IT audits, and assessments.",
          [
            "Sajan has over 10 years of experience in dealing with income tax matter including income tax returns, income tax audits, claiming DTAA reliefs, reporting of foreign assets, liaison with IT department, replying to IT notices, assessments, appeal, etc.",
            "Sajan is a Chartered Accountant from the Institute of Chartered Accountants of India (ICAI) and Master of Commerce with Accounting and Statistics from Gujarat University.",
          ]
        ),
        member(
          "Chandrasheel Mehta",
          "Insurance Executive",
          "CM",
          "IRDA Registered Since 2004",
          ["IRDA Registered Since 2004", "20+ Years Exp", "3rd Generation Specialist"],
          "Third-generation insurance specialist registered with IRDA since 2004, providing comprehensive wealth protection and risk mitigation strategies.",
          [
            "Chandrasheel has been an Insurance specialist for more than 20 years. He has been registered with IRDA as an Insurance Adviser since 2004.",
            "Chandrasheel provides consulting for wealth protecting strategies through insurance for protecting family lives and various personal and corporate properties, assets and income.",
            "Chandrasheel is the third generation specialist in the insurance business as the Mehta family has been in the insurance business for the last 70+ years. His grandfather had his own Life Insurance Company before nationalization of insurance companies by the Government of India.",
          ]
        ),
        member(
          "Ruchita Thakore",
          "Relationship Manager & Compliance Officer",
          "RT",
          "NISM X-A/B/C • MBA-Finance",
          ["MBA-Finance", "NISM X-A / X-B", "NISM X-C", "Compliance Officer", "5+ Years Exp"],
          "MBA-Finance and Certified Investment Adviser with 5+ years experience. Serving as the Compliance Officer and Client Relationship Manager.",
          [
            "Ruchita is an MBA-Finance from KS School of Business Management and has 5+ years of experience in finance and investments.",
            "She is the Person Associated with Investment Advice as she has both the NISM X-A, X-B exams and the renewal NISM X-C for Investment Advisors. Ruchita is the Compliance Officer of the firm.",
          ]
        ),
        member(
          "Zeel Raval",
          "Wealth Executive",
          "ZR",
          "MBA-Finance (Silver Oak)",
          ["MBA-Finance (Silver Oak Univ)", "Advisory Support", "Back Office Systems"],
          "MBA-Finance from Silver Oak University providing core analytical research, investment advisory support, and back-office management.",
          [
            "Zeel is an MBA-Finance from Silver Oak University in Ahmedabad and has about 1 years of experience in finance and investments.",
            "She provides supports for the investment advisory services and back office work.",
          ]
        ),
        member(
          "Yash Desai",
          "Operations Executive",
          "YD",
          "BBA (Gujarat Univ)",
          ["BBA (Gujarat Univ)", "5+ Years Operations", "Client Servicing"],
          "Over 5 years of experience in investment operations, process workflows, execution, and maintaining timely, high-quality client servicing.",
          [
            "Yash has over 5 years of experience in investment operations, processes and client servicing. He also keeps good contacts with various stakeholders and ensures timely completion of tasks and ensures quality service to the clients.",
            "Yash has completed the Bachelor of Business Administration from Gujarat University.",
          ]
        ),
        member(
          "Jyotika Desai",
          "Partner - Admin",
          "JD",
          "LLP Partner",
          ["LLP Partner", "Corporate Administration"],
          "Partner at Neuron Wealth Advisors LLP handling firm corporate administration, executive coordination, and operational governance.",
          [
            "Jyotika is a partner of Neuron Wealth Advisors LLP. She is not involved for any investment advisory related work but is involved only for the administration related work.",
          ]
        ),
        member(
          "Sunil Shah",
          "Founder, Lynx Computers, IT Infrastructure",
          "SS",
          "Founder Lynx • 35+ Yrs R&D",
          ["Founder Lynx Computers", "35+ Years R&D", "Hardware Architecture"],
          "Founder of Lynx Computers with 35+ years of experience in research, development, and architecture of enterprise computer hardware and security.",
          [
            "Sunil is founder of Lynx Computers and has 35+ years of experience in research and development of computer hardware, production and maintenance in the area of computer hardware and its architecture.",
          ]
        ),
        member(
          "Chirag Darji",
          "CTO, Variance Infotech, Web & Platforms",
          "CD",
          "CTO Variance • 20+ Yrs Exp",
          ["CTO Variance Infotech", "20+ Years Exp", "Web & E-Commerce Platforms"],
          "CTO of Variance Infotech with 20+ years of expertise in digital platforms, cloud architecture, and secure web application development.",
          [
            "Chirag is the CTO of Variance Infotech and has wide knowledge and experience of 20+ years in website development, support and maintenance. His team has developed and is maintaining the website.",
          ]
        ),
      ]),
    }),
    {
      ...section(
        "book-meeting",
        "calendly",
        "Book a Meeting (Calendly)",
        {
          eyebrow: "Book a Meeting",
          title: "Schedule a Meeting",
          highlight: "With Our Team",
          text: "Pick a date and time that suits you. Calendly will confirm your booking by email.",
          calendly: lnk("Open the Booking Page in a New Tab", "", { newTab: true }),
          height: "standard",
          hideDetails: false,
          hideCookieBanner: true,
          fallbackText: "Online booking will be available here shortly. Until then, send us your preferred date and time and our team will get back to you.",
          fallbackButton: lnk("Contact Us", "/contact"),
        },
        { anchor: "book-meeting", background: "ivory" }
      ),
      visible: false,
    },
  ],
};

const about = {
  slug: "about",
  title: "About Us (Overview)",
  description: "About Us hero, Why We Are industry reality, Who We Are SEBI RIA credentials, Neuron philosophy interactive slides, Vision & Mission, and 4 foundational pillars.",
  category: "core",
  icon: "Compass",
  status: "published",
  seo: {
    title: "About Us | Neuron Wealth Advisors",
    description:
      "Neuron Wealth Advisors LLP is a SEBI Registered Investment Adviser (RIA) INA000016481 providing holistic investment advisory and multi-family office services.",
  },
  sections: [
    section(
      "about-hero",
      "aboutHero",
      "Hero Banner",
      {
        breadcrumb: "About",
        title: "About",
        highlight: "Us",
        text: "Transforming financial complexity into transparent, disciplined, and enduring wealth decisions for multi-generational families.",
        image: img("/images/about-room.jpg", "Neuron Wealth Consultation Meeting Room"),
      },
      { anchor: "about-hero" }
    ),
    section(
      "why-we-are",
      "whyWeAre",
      "Why We Are",
      {
        eyebrow: "The Industry Reality",
        title: "Why We Are",
        paragraphs: [
          "Currently, investments are being pushed i.e. sold to investors instead of pulled i.e. investors asking for the investment advisors services. As a result, the products are being sold instead of solutions are offered to the investors. And, investor ends up investing in various products / schemes / plans/ options that he or she may not need or want.",
          "Also, in current times, the financial market has become very complex with complicated investment products, structured products, Algo/AI based investments, various PMS strategies, AIF investments, Crypto currencies on one hand and complicated laws, ever changing taxation and compliance requirements, ignorance or lack of awareness, ambiguity and subjectivity in interpretation on other hand, resulting in complicated financial life of any family that has many members having different income or expense requirements and have varied needs, wants, goals, hopes, aspirations in life affecting financial decision making.",
        ],
        badgeText: "Solutions-First Fiduciary Advisory • Zero Product Pushing",
        image: img("/images/about-why-we-are.jpg", "Neuron Wealth Financial Analysis & Research"),
      },
      { anchor: "why-we-are" }
    ),
    section(
      "who-we-are",
      "whoWeAre",
      "Who We Are",
      {
        eyebrow: "SEBI RIA Validated",
        title: "Who We Are",
        highlight:
          "Neuron Wealth Advisors LLP is a SEBI Registered Investment Adviser (RIA) with registration number INA000016481 with perpetual validity until cancelled.",
        paragraphs: [
          "We are a team of experts in the finance and investments and we provide holistic investment and wealth management advisory services.",
          "We as a trusted adviser to the family, with our education and experience work as a family CFO and provide multi-family office services. We provide the truthful, complete and accurate information transparently and enable our clients to make quality informed decisions to achieve their financial / wealth goals.",
        ],
        tags: ["Family CFO", "Multi-Family Office", "Fee-Only Fiduciary"],
        image: img("/images/about-who-we-are.jpg", "Neuron Wealth Advisors Team & Executive Family Office Advisory"),
      },
      { anchor: "who-we-are" }
    ),
    section(
      "what-we-do",
      "whatWeDo",
      "What We Do & Philosophy",
      {
        image: img("/images/about-what-we-do-banner.jpg", "The Neuron Philosophy"),
        slides: items("slide", [
          {
            tabLabel: "What We Do",
            eyebrow: "The Neuron Philosophy",
            icon: "Brain",
            title: "What We Do",
            quote: "“Distilling multi-market complexity into unified signals of clarity, safety, and enduring generational wealth.”",
            subquote: "Fiduciary Intelligence in Action",
            text: "Just like Neurons in our brain collects the information, interprets them and give instructions to various parts of body to keep it safe and sound, we use our expert knowledge and experience in income tax, investment and wealth management, insurance, estate planning, interpreting domestic and international financial markets, local and global compliance requirement and provide holistic advice to better manage our clients wealth for multiple generations.",
            tags: ["Income Tax", "Investment & Wealth", "Insurance Planning", "Estate & Succession", "Global Compliance"],
          },
          {
            tabLabel: "How We Add Value",
            eyebrow: "Client Value Proposition",
            icon: "ShieldCheck",
            title: "How We Add Value",
            quote: "“One unified family advisor instead of fragmented voices—simplifying financial life and safeguarding generational legacy.”",
            subquote: "Unified Family CFO Governance",
            text: "We provide one stop shop for all of their financial needs so our clients will work with only 1 trusted advisor instead of multiple advisors. We provide holistic advice so our clients can simplify their financial life by making informed decisions, optimizing taxes, creating and sustaining wealth, and making smooth and efficient transfer of wealth to next generations while complying with applicable laws.",
            tags: ["Tax Optimization", "Generational Transfer", "Wealth Preservation", "Holistic Fiduciary", "Global Compliance"],
          },
        ]),
      },
      { anchor: "what-we-do" }
    ),
    section(
      "vision-mission",
      "visionMission",
      "Our Vision & Our Mission",
      {
        visionEyebrow: "Our Purpose",
        visionTitle: "Our Vision",
        visionText:
          "Our vision is to become one of the most TRUSTED investment advisor (Multi Family Office or Family CFO) in India.",
        visionIcon: "Compass",
        visionImage: img("/images/vision-dark-bg.jpg", "Our Vision"),
        missionEyebrow: "Our Commitment",
        missionTitle: "Our Mission",
        missionText:
          "Our mission is to Simplify Financial Life of our clients by providing the suitable financial or investment solution for multi generation wealth management.",
        missionIcon: "TrendingUp",
        missionImage: img("/images/mission-dark-bg.jpg", "Our Mission"),
      },
      { anchor: "vision-mission" }
    ),
    section(
      "how-to-be-most-trusted",
      "pillars",
      "Foundational Pillars",
      {
        eyebrow: "Foundational Pillars",
        title: "How to be the most trusted?",
        text: "Cultivating enduring fiduciary trust through four core pillars:",
        items: items("pillar", [
          {
            num: "01",
            title: "1. Integrity :",
            icon: "ShieldCheck",
            image: img("/images/pillar-integrity.jpg", "1. Integrity"),
            text: "Instilling the highest set of values and beliefs in the organization, and having the courage to consistently act in accordance with them.",
          },
          {
            num: "02",
            title: "2. Intention :",
            icon: "HeartHandshake",
            image: img("/images/pillar-intention.jpg", "2. Intention"),
            text: "Working as a Fiduciary, where client’s interest is ahead of everyone else’s and Being a Go Giver – Give more in value than fees.",
          },
          {
            num: "03",
            title: "3. Capability :",
            icon: "Award",
            image: img("/images/pillar-capability.jpg", "3. Capability"),
            text: "Having an expert knowledge in investments and perfect mix of technical and soft (leadership, communication, presentation, etc, skills); continuously learning, updating, and educating ourselves and clients; and having positive and humble attitude with empathy.",
          },
          {
            num: "04",
            title: "4. Deliver Results :",
            icon: "TrendingUp",
            image: img("/images/pillar-results.jpg", "4. Deliver Results"),
            text: "Genuinely simplify clients financial Life and giving peace of mind about growing, sustaining and managing wealth for multiple generations.",
          },
        ]),
      },
      { anchor: "how-to-be-most-trusted" }
    ),
  ],
};

const whyAssociate = {
  slug: "why-associate",
  title: "Why Associate with Us",
  description:
    "Explaining Association through Swami Vivekananda's pearl parable and the 7 core foundations of fiduciary partnership.",
  category: "core",
  icon: "Handshake",
  status: "published",
  seo: {
    title: "Why Associate with Us | Neuron Wealth Advisors",
    description:
      "Explaining Association through Swami Vivekananda's pearl parable. Learn why high-net-worth families, NRIs, and business owners partner with Neuron Wealth Advisors.",
  },
  sections: [
    section(
      "why-associate-hero",
      "whyAssociateHero",
      "Why Associate Hero",
      {
        breadcrumb: "Home / About / Why Associate with Us",
        title: "Why Associate",
        highlight: "with Us",
        text:
          "Building enduring, mutually beneficial fiduciary partnerships anchored in unwavering ethics, multidisciplinary expertise, and shared values.",
        image: img("/images/why-us-fiduciary.jpg", "Neuron Wealth Fiduciary Advisory Office"),
      },
      { anchor: "why-associate-hero" }
    ),
    section(
      "association-philosophy",
      "associationPhilosophy",
      "Association & Parable",
      {
        eyebrow: "Philosophical Principle",
        title: "Association",
        intro: "Explaining the meaning of 'Association', one of the greatest Hindu monk, Swami Vivekananda ji said:",
        quoteTitle: "“The rain drop from the sky:",
        quoteLines: [
          "If it is caught in hands, it is pure enough for drinking.",
          "If it falls in a gutter, its value drops so much that it can't be used even for washing the feet.",
          "If it falls on a hot surface, it perishes.",
          "If it falls on lotus leaf, it shines like a pearl and",
          "finally, if it falls on an oyster, it becomes a pearl.",
        ],
        quoteConclusion:
          "The drop is the same, but its existence & worth depend on with whom it associates.” Always be associated with people who are good at heart.",
        text:
          "Embodying the same spirit, we strongly believe that an association with Neuron Wealth Advisers (NWA) can work wonders for everyone - clients, team members, service providers, and other stakeholders because of the following reasons.",
        button: lnk("Become a Pearl Assessment", "#pearl-form"),
        image: img("/images/Swami_Vivekananda.jpg", "Swami Vivekananda"),
      },
      { anchor: "association" }
    ),
    section(
      "seven-reasons",
      "sevenReasons",
      "7 Reasons to Associate",
      {
        eyebrow: "Core Foundations",
        title: "7 Reasons to Associate",
        highlight: "with NWA",
        text:
          "Every advisory relationship at Neuron Wealth Advisors is anchored in statutory fiduciary alignment, deep technical mastery, and authentic transparency.",
        image: img("/images/reasons-dark-bg.jpg", "Reasons Background"),
        items: items("reason", [
          {
            num: "01",
            title: "Fiduciary Role",
            tag: "Statutory Obligation",
            icon: "Scale",
            text:
              "We have a fundamental obligation and regulatory requirement to act as a Fiduciary i.e. our Clients’ interest is Paramount for us and it is always the first in whatever we do.",
            hasLink: false,
            calloutText: "",
            button: lnk("", ""),
          },
          {
            num: "02",
            title: "Ethics & Integrity",
            tag: "Global Standard of Conduct",
            icon: "ShieldCheck",
            text:
              "We have ethics and integrity at core of our service and strictly follow SEBI Investor Adviser Code of Conduct and CFA Institute’s Code of Conduct and Standard of Ethical behavior.",
            hasLink: false,
            calloutText: "",
            button: lnk("", ""),
          },
          {
            num: "03",
            title: "Expert Knowledge",
            tag: "Multidisciplinary Qualifications",
            icon: "GraduationCap",
            text:
              "Collectively, we have completed professional qualifications like CA, CPA (USA), CFA (USA), MBA-Finance, LLB, Insurance Adviser, IT Engineer, etc.",
            hasLink: false,
            calloutText: "",
            button: lnk("", ""),
          },
          {
            num: "04",
            title: "Quality Experience",
            tag: "150+ Man Years Leadership",
            icon: "Award",
            text:
              "We are an outstanding team of experts with combined experience of 150+ man years in consulting, advisory, investments, domestic and global compliance, insurance, PE/ VC, tax structuring and optimization, DTAA, etc.",
            hasLink: false,
            calloutText: "",
            button: lnk("", ""),
          },
          {
            num: "05",
            title: "Transparent and Genuine",
            tag: "Unbiased & Process-Driven",
            icon: "Eye",
            text:
              "A strong and experienced team, unbiased process oriented approach, cutting edge technology, latest infrastructure facility make us accessible and help us to maintain transparency and genuineness of advice to make informed decisions and prevent future complications",
            hasLink: false,
            calloutText: "",
            button: lnk("", ""),
          },
          {
            num: "06",
            title: "SEBI Oversight",
            tag: "Statutory Regulatory Rigor",
            icon: "Building2",
            text:
              "We are a SEBI Registered Investment Adviser and we follow SEBI Investment Advisor Rules, Regulations and guidelines that includes submitting regular reports to SEBI and an annual Audit.",
            hasLink: false,
            calloutText: "",
            button: lnk("", ""),
          },
          {
            num: "07",
            title: "Selective approach",
            tag: "Ethos, Pathos & Logos",
            icon: "UserCheck",
            text:
              "We are very selective and very careful with whom we associate with, be it our team members, our service providers or our clients. We believe that some common ethos, pathos and logos are required for a long term mutually beneficial association.",
            hasLink: true,
            calloutText:
              "Please answer 5 questions to understand if our association could become pearl by clicking below:",
            button: lnk("Answer 5 Questions Now", "#pearl-form"),
          },
        ]),
      },
      { anchor: "seven-reasons" }
    ),
    section(
      "pearl-assessment",
      "pearlAssessment",
      "Pearl Assessment",
      {
        eyebrow: "Partnership Assessment",
        title: "Interested in Becoming a",
        highlight: "Pearl?",
        intro:
          "We are always looking forward to associate with great human beings and guide them to better protect and manage their family wealth, increase risk adjusted after-tax return, sustain it for multiple generations and have a fulfilling and satisfied financial life while complying with applicable laws.",
        subtext:
          "Please answer following 5 questions for us to better understand your requirements and if we can have a long lasting mutually beneficial association.",
      },
      { anchor: "pearl-form" }
    ),
  ],
};

const team = {
  slug: "team",
  title: "Stakeholders / Team Members",
  description:
    "Multidisciplinary collective of CFA charterholders, CAs, CPAs, MBAs, technology architects, and industry pioneers at Neuron Wealth Advisors.",
  category: "core",
  icon: "Users",
  status: "published",
  seo: {
    title: "Stakeholders / Team Members | Neuron Wealth Advisors",
    description:
      "Meet the multidisciplinary team of CFA, CA, CPA, MBA, and industry leaders at Neuron Wealth Advisors LLP.",
  },
  sections: [
    section(
      "team-hero",
      "teamHero",
      "Team Hero Banner",
      {
        breadcrumb: "Home / About / Team",
        title: "Stakeholders /",
        highlight: "Team Members",
        text:
          "A multidisciplinary collective of Chartered Accountants, CFA charterholders, CPAs, MBAs, technology architects, and industry pioneers united by an uncompromising fiduciary standard.",
        image: img("/images/about-what-we-do-banner.jpg", "Neuron Wealth Advisors Multidisciplinary Team"),
      },
      { anchor: "team-hero" }
    ),
    section(
      "leadership",
      "leadership",
      "Leadership & Mentorship",
      {
        eyebrow: "Institutional Stewardship",
        title: "Leadership & Mentorship",
        text:
          "Pioneering patented global innovation, corporate engineering, and cross-border fiduciary wealth stewardship.",
        leaders: items("leader", [
          {
            name: "Mr. Jigar Patel",
            role: "Principal Officer & Investment Advisor",
            credentials: ["CA (India)", "CFA Charterholder (USA)", "CPA (USA)", "MBA-Finance (USA)", "20+ Years Exp"],
            monogram: "JP",
            image: img("/images/team/jigar-patel.jpg", "Mr. Jigar Patel"),
            bio: [
              "Mr. Jigar Patel is a Chartered Accountant from India, CFA Charterholder from CFA Institute, USA as well as CPA and MBA-Finance from USA.",
              "With 20+ years of experience, he has developed ingenuity for Simplifying Financial Life and established himself as a trusted adviser for multi-generational wealth management. He helps clients make informed decisions for protecting, complying, creating, accumulating, preserving, utilizing, distributing and enjoying wealth.",
              "Jigar has been invited by Microsoft, Google in the USA as well as various other places for giving presentations on Investments, taxation and global compliance. His book on NRI Investments and Taxation is published on Amazon.com and his articles have been published in magazines in India and in the USA. He has organized webinars, shares his views on TV and has been writing blogs and replying to questions on blog and quora.",
              "He has been a mentor at the EDI for students and startups since 2015 and a volunteer for CFA Society India since 2012. Personally, Jigar loves traveling and adventure sports, having done bungee jumping and skydiving.",
            ],
            badge: "Fiduciary Leadership",
          },
          {
            name: "Dr. Hamsa Thota",
            role: "Mentor",
            credentials: ["35+ Years Exp", "10 U.S. Patents", "Former President PDMA USA", "INSME Board Member"],
            monogram: "HT",
            image: img("/images/team/dr-hamsa-thota.jpg", "Dr. Hamsa Thota"),
            bio: [
              "Dr Hamsa Thota is the Founder and President of Innovation Business Development, Inc and currently serves on the board of the International Network for Small and Medium Enterprises (INSME). He is an advisor to the \"Art of Science Learning Project\", a US NSF funded R&D project to shape 21st-Century US workforce.",
              "During his 35+ years of professional experience, he has developed and commercialized over 200 food products and holds 10 U.S. patents. He is a certified specialist in New Product Development and Organizational Engineering.",
              "He has been a President and Chairman of the Product Development and Management Association (PDMA), USA. He served as an advisor to science and technology departments in China and is a frequent lecturer at national and international events on sustaining innovation, new product development, and the application of innovation best practice tools to grow business with profit.",
              "He was a visiting professor at the Zhejiang University (China) and a guest lecturer at the University of Georgia for Marketing Research and Product Development courses. He co-authored “Key concepts in innovation”, a fundamental reference book on innovation for practitioners, students and scholars.",
            ],
            badge: "Fiduciary Leadership",
          },
        ]),
      },
      { anchor: "leadership" }
    ),
    section(
      "team-ecosystem",
      "teamEcosystem",
      "Team Members Ecosystem",
      {
        eyebrow: "Multidisciplinary Expertise",
        title: "Team Members",
        text:
          "Specialized private equity structuring, income tax audit experts, SEBI compliance, and mission-critical digital architects.",
        departments: items("dept", [
          {
            deptId: "advisory-taxation",
            eyebrow: "Specialized Advisory",
            title: "PE/VC, Taxation & Wealth Protection",
            desc:
              "Private equity structuring, cross-border DTAA taxation, income tax compliance, and multi-generational risk mitigation.",
          },
          {
            deptId: "operations-governance",
            eyebrow: "Firm Operations & Governance",
            title: "Compliance, Operations & Administration",
            desc:
              "SEBI regulatory oversight, back-office excellence, operational precision, and seamless client servicing.",
          },
          {
            deptId: "technology-partners",
            eyebrow: "Infrastructure & Technology",
            title: "Technology & Strategic Partners",
            desc:
              "Mission-critical hardware security, cyber infrastructure, e-commerce, and high-availability digital platforms.",
          },
        ]),
        members: items("member", [
          {
            name: "Mayank Patel",
            role: "PE/VC/Startup Executive",
            deptId: "advisory-taxation",
            credentials: ["Electrical Engineer", "MBA (Finance)", "CFA Charterholder (USA)", "20+ Years Exp"],
            monogram: "MP",
            bio: [
              "Mayank has more than twenty years of experience of working in technology business incubation, academics and banking & financial services sector. He is an Electrical Engineer, MBA (Finance) and a CFA Charterholder from CFA Institute, USA.",
              "Mayank provides consulting for evaluation of start ups and for PE, VC and Startup Investments. He has been a CEO of EDII's technology business incubator, CrAdLE and mentored start-up for strategic financing, and business valuation. He has valued more than 100 small and medium enterprises for investment, especially for venture capital and private equity funding.",
              "As a professor at various education institutions, he has taught students in various finance and investment management subjects including investment analysis, portfolio management, asset valuation, new enterprise financing, international finance and alternative investment.",
            ],
          },
          {
            name: "Reecha Patel",
            role: "CA, CPA, Taxation Executive",
            deptId: "advisory-taxation",
            credentials: ["FCA (ICAI)", "CPA (USA)", "DISA (ICAI)", "M.Com", "15+ Years Exp"],
            monogram: "RP",
            bio: [
              "Reecha has been practicing with more than 15 years of experience in taxation. She is a Fellow member of the Institute of Chartered Accountant of India (FCA) and also passed the Uniform CPA examination from the USA. Additionally, she has a Diploma in Information Systems Audit (DISA) from the ICAI and is a Master of Commerce with Accounting and Statistics from Gujarat University.",
              "Reecha has extensive experience in preparation and review of India and US Income tax returns. She has also volunteered in the Volunteers Income Tax Assistance (VITA) program of IRS when she was in the USA from 2006-2009.",
            ],
          },
          {
            name: "Sajan Rathod",
            role: "CA, Income Tax Executive",
            deptId: "advisory-taxation",
            credentials: ["CA (ICAI)", "M.Com", "10+ Years Exp", "DTAA Specialist"],
            monogram: "SR",
            bio: [
              "Sajan has over 10 years of experience in dealing with income tax matter including income tax returns, income tax audits, claiming DTAA reliefs, reporting of foreign assets, liaison with IT department, replying to IT notices, assessments, appeal, etc.",
              "Sajan is a Chartered Accountant from the Institute of Chartered Accountants of India (ICAI) and Master of Commerce with Accounting and Statistics from Gujarat University.",
            ],
          },
          {
            name: "Chandrasheel Mehta",
            role: "Insurance Executive",
            deptId: "advisory-taxation",
            credentials: ["IRDA Registered Since 2004", "20+ Years Exp", "3rd Generation Specialist"],
            monogram: "CM",
            bio: [
              "Chandrasheel has been an Insurance specialist for more than 20 years. He has been registered with IRDA as an Insurance Adviser since 2004.",
              "Chandrasheel provides consulting for wealth protecting strategies through insurance for protecting family lives and various personal and corporate properties, assets and income.",
              "Chandrasheel is the third generation specialist in the insurance business as the Mehta family has been in the insurance business for the last 70+ years. His grandfather had his own Life Insurance Company before nationalization of insurance companies by the Government of India.",
            ],
          },
          {
            name: "Ruchita Thakore",
            role: "Relationship Manager & Compliance Officer",
            deptId: "operations-governance",
            credentials: ["MBA-Finance", "NISM X-A / X-B", "NISM X-C", "Compliance Officer", "5+ Years Exp"],
            monogram: "RT",
            bio: [
              "Ruchita is an MBA-Finance from KS School of Business Management and has 5+ years of experience in finance and investments.",
              "She is the Person Associated with Investment Advice as she has both the NISM X-A, X-B exams and the renewal NISM X-C for Investment Advisors. Ruchita is the Compliance Officer of the firm.",
            ],
          },
          {
            name: "Zeel Raval",
            role: "Wealth Executive",
            deptId: "operations-governance",
            credentials: ["MBA-Finance (Silver Oak Univ)", "Advisory Support", "Back Office Systems"],
            monogram: "ZR",
            bio: [
              "Zeel is an MBA-Finance from Silver Oak University in Ahmedabad and has about 1 years of experience in finance and investments.",
              "She provides supports for the investment advisory services and back office work.",
            ],
          },
          {
            name: "Yash Desai",
            role: "Operations Executive",
            deptId: "operations-governance",
            credentials: ["BBA (Gujarat Univ)", "5+ Years Operations", "Client Servicing"],
            monogram: "YD",
            bio: [
              "Yash has over 5 years of experience in investment operations, processes and client servicing. He also keeps good contacts with various stakeholders and ensures timely completion of tasks and ensures quality service to the clients.",
              "Yash has completed the Bachelor of Business Administration from Gujarat University.",
            ],
          },
          {
            name: "Jyotika Desai",
            role: "Partner - Admin",
            deptId: "operations-governance",
            credentials: ["LLP Partner", "Corporate Administration"],
            monogram: "JD",
            bio: [
              "Jyotika is a partner of Neuron Wealth Advisors LLP. She is not involved for any investment advisory related work but is involved only for the administration related work.",
            ],
          },
          {
            name: "Sunil Shah",
            role: "Founder, Lynx Computers, IT Infrastructure",
            deptId: "technology-partners",
            credentials: ["Founder Lynx Computers", "35+ Years R&D", "Hardware Architecture"],
            monogram: "SS",
            bio: [
              "Sunil is founder of Lynx Computers and has 35+ years of experience in research and development of computer hardware, production and maintenance in the area of computer hardware and its architecture.",
            ],
          },
          {
            name: "Chirag Darji",
            role: "CTO, Variance Infotech, Website and E-commerce",
            deptId: "technology-partners",
            credentials: ["CTO Variance Infotech", "20+ Years Exp", "Web & E-Commerce Platforms"],
            monogram: "CD",
            bio: [
              "Chirag is the CTO of Variance Infotech and has wide knowledge and experience of 20+ years in website development, support and maintenance. His team has developed and is maintaining the website.",
            ],
          },
        ]),
      },
      { anchor: "team-ecosystem" }
    ),
    section(
      "team-disclaimer",
      "teamDisclaimer",
      "Team Relationship Disclaimer",
      {
        icon: "ShieldCheck",
        title: "Disclaimer about the relationship with Stakeholders / Team members:",
        text:
          "Please note that the stakeholders except Mr. Jigar Patel, are not the persons associated with the investment advice. They are experts in their respective field like taxation, compliance, private equity, venture capital, insurance, law, research, back office, Information Technology, administration, etc. and includes support team. They may not be an employee of the firm. They may be self-employed, employed by other organization or retired. They have agreed to provide their services on a consulting basis as a value addition service to the clients as and when required for fees or on pro bono basis, depending on the nature and complexity of the work.",
      },
      { anchor: "team-disclaimer" }
    ),
  ],
};

const contact = {
  slug: "contact",
  title: "Contact Us",
  description:
    "Fiduciary consultation desk, confidential inquiry form, SEBI RIA registration credentials, and headquarters location map.",
  category: "core",
  icon: "Phone",
  status: "published",
  seo: {
    title: "Contact Us | Executive Advisory Desk | Neuron Wealth Advisors",
    description:
      "Connect with Neuron Wealth Advisors LLP in Satellite, Ahmedabad. SEBI Registered Investment Adviser INA000016481. Phone +91 90999 42563, email info@neuronwealth.com.",
  },
  sections: [
    section(
      "contact-hero",
      "contactHero",
      "Contact Hero Banner",
      {
        breadcrumb: "Contact",
        title: "Contact",
        highlight: "Us",
        text:
          "We welcome dialogue with families, professionals, and institutions seeking objective, conflict-free fiduciary wealth advisory.",
        image: img("/images/about-room.jpg", "Neuron Wealth Consultation Meeting Room"),
      },
      { anchor: "contact-hero" }
    ),
    section(
      "contact-hub",
      "contactHub",
      "Contact Hub & Executive Desk",
      {
        formBadge: "Fiduciary Consultation Desk",
        formTitle: "Start a Confidential Advisory Conversation",
        formDescription:
          "Thank you for your interest. Please fill out the form below to inquire about our fiduciary wealth advisory services.",
        formNote: "Your inquiry is protected by statutory SEBI fiduciary discretion and never shared.",
        formButton: "Send Fiduciary Inquiry",
        deskBadge: "SEBI Registered Investment Adviser",
        regNumber: "Reg. No: INA000016481 • Non-Individual",
        companyName: "Neuron Wealth Advisors LLP",
        validity: "Validity: Perpetual; until cancelled",
        officerDeskTitle: "Principal Officer Desk",
        officerName: "Mr. Jigar Patel",
        officerCredentials: "CA (India), CFA (USA), CPA (USA), MBA-Finance (USA)",
        officerEmail: "jigar@neuronwealth.com",
        whatsappUrl:
          "https://wa.me/919099942563?text=Hello%20Neuron%20Wealth%20Advisors%2C%20I%20would%20like%20to%20inquire%20about%20your%20fiduciary%20wealth%20advisory%20services.",
        headquartersTitle: "Headquarters:",
        headquartersAddress:
          "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, B/s. Parekhs Hospital, Satellite, Ahmedabad-380015, Gujarat, India.",
        mapsUrl:
          "https://www.google.com/maps/search/Mauryansh+Elanza+Nr.Parekh's+Hospital,,+Shyamal+Crossroad+Shyamal+Ahmedabad,+Gujarat+380015/@23.012939,72.529865,1603m/data=!3m1!1e3?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
        sebiOfficeTitle: "SEBI Western Regional Office (WRO)",
        sebiOfficeAddress:
          "SEBI Bhavan, Panchvati 1st Lane, Gulbai Tekra Road, Ahmedabad-380006, Gujarat, India",
        directPhone: "+91 90999 42563",
        officialEmail: "info@neuronwealth.com",
        bottomBgImage: img("/images/mission-dark-bg.jpg", "Dark Abstract Scrim"),
      },
      { anchor: "contact-hub" }
    ),
    section(
      "contact-careers",
      "careerWhyWork",
      "Careers & Opportunities",
      {
        eyebrow: "Careers & Opportunities",
        title: "Why Associate and Work with Us?",
        image: img("/images/career-team-collaborate.jpg", "Careers & Professional Association at Neuron Wealth Advisors"),
        paragraphs: [
          "We are always looking forward to associate with great human beings with integrity who are smart and passionate about helping clients better protect and manage their family wealth, increase their risk adjusted after-tax return, sustain wealth for multiple generations while complying with applicable laws.",
          "Please answer following 4 questions for us to better understand if we can be the best fit for your career advancements and if we can have a long lasting mutually beneficial association.",
        ],
        formButton: lnk(
          "Fill out form",
          "https://docs.google.com/forms/d/e/1FAIpQLSf4W007DEPVhQBMXKAynMhM5bmgEJGDD-_CXG9XcU_GI11VCA/viewform",
          { shortLabel: "Apply", newTab: true }
        ),
        formNote: "* Standard 4-question candidate questionnaire • Opens in new tab",
        contactTitle: "Confidential CV Submission & Inquiries",
        contactEmail: "contact@neuronwealth.com",
        contactPhone: "+91 99252 44688",
        contactLocation: "Satellite, Ahmedabad",
      },
      { anchor: "careers" }
    ),
    section(
      "contact-map",
      "contactMap",
      "Headquarters Map Embed",
      {
        title: "Advisory Headquarters Location — Satellite, Ahmedabad",
        whatsappUrl:
          "https://wa.me/919099942563?text=Hello%20Neuron%20Wealth%20Advisors%2C%20I%20would%20like%20to%20inquire%20about%20your%20fiduciary%20wealth%20advisory%20services.",
        mapsUrl:
          "https://www.google.com/maps/search/Mauryansh+Elanza+Nr.Parekh's+Hospital,,+Shyamal+Crossroad+Shyamal+Ahmedabad,+Gujarat+380015/@23.012939,72.529865,1603m/data=!3m1!1e3?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
        mapEmbedUrl: "https://maps.google.com/maps?q=23.012939,72.529865&z=15&output=embed",
      },
      { anchor: "contact-map" }
    ),
  ],
};

const sebiRegulatoryCompliance = {
  slug: "sebi-regulatory-compliance",
  title: "SEBI Regulatory Compliance Disclosure",
  description:
    "Official SEBI regulatory compliance disclosures, annual audit records, monthly complaints disposal, and designated compliance officers.",
  category: "core",
  icon: "Scale",
  status: "published",
  seo: {
    title: "SEBI Regulatory Compliance Disclosure | Neuron Wealth Advisors",
    description:
      "Official SEBI Regulatory Compliance Disclosures for Neuron Wealth Advisors LLP (SEBI RIA INA000016481, BASL 1697): Audit status, complaints disposal and officer details.",
  },
  sections: [
    section(
      "compliance-hero",
      "complianceHero",
      "Compliance Hero Banner",
      {
        breadcrumb: "SEBI Regulatory Compliance Disclosure",
        title: "SEBI Regulatory Compliance",
        highlight: "Disclosure",
        text:
          "Statutory regulatory disclosures, annual compliance audit records, investor grievance tracking, and designated compliance officers of Neuron Wealth Advisors LLP.",
        image: img("/images/why-us-fiduciary.jpg", "Neuron Wealth Legal and Statutory Governance"),
      },
      { anchor: "compliance-hero" }
    ),
    section(
      "compliance-hub",
      "complianceHub",
      "Compliance Hub & Disclosures",
      {
        // 1. About Neuron Wealth Advisors
        aboutTitle: "About Neuron Wealth Advisors LLP",
        aboutText:
          "Neuron Wealth Advisors LLP (NWA) is a SEBI Registered Investment Adviser (RIA) with registration number INA000016481. We are located at 803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad 380015, Gujarat, India. We are a team of experts in the finance and investments and we provide holistic investment and wealth management advisory services.",
        aboutLink: lnk(
          "Please click here to know Material Information about Neuron Wealth Advisors LLP",
          "/material-information"
        ),

        // 2. SEBI RIA Registration
        riaTitle: "SEBI RIA Registration Certificate",
        riaText:
          "Neuron Wealth Advisors LLP holds the Certificate of Registration as Investment Adviser issued by the Securities and Exchange Board of India (SEBI), Registration No. INA000016481. The registration was granted on Dec 20, 2021 and has perpetual validity.",
        riaLinkLabel: "Please click here to view the SEBI RIA Registration Certificate.",
        riaCertificate: img(
          "/images/SEBI RIA Registration Certificate.jpg",
          "SEBI RIA Registration Certificate - Neuron Wealth Advisors LLP (Registration No. INA000016481)"
        ),

        // 3. BSE ASL Membership
        bseTitle: "BSE ASL Membership",
        bseText:
          "Neuron Wealth Advisors LLP holds the Certificate of Membership as Investment Adviser issued by BSE Administration & Supervision Ltd. (BASL), Membership ID 1697.",
        bseLinkLabel: "Please click here to view the BSE ASL Membership Certificate.",
        bseCertificate: img(
          "/images/BSE ASL Membership.jpg",
          "BSE Administration & Supervision Ltd membership certificate for Neuron Wealth Advisors LLP, BASL 1697"
        ),

        // 4. Disclaimer
        disclaimerTitle: "Disclaimer:",
        disclaimerParagraphs: [
          "All the information is for the consumption by the clients of NWA only and such material should not be redistributed.",
          "Investments in securities market, are subject to market risks. Investors are advised to read all scheme related documents and other relevant information carefully before making any investment.",
          "Registration granted by SEBI (INA000016481), membership of BASL (1697) and certification from NISM in no way guarantee performance of Neuron Wealth Advisors LLP or provide any assurance of returns to investors.",
        ],
        disclaimerLink: lnk(
          "Please click here to read the Disclaimers.",
          "/website-disclaimer"
        ),

        // 5. Investor Charter
        charterTitle: "Investor Charter",
        charterText:
          "The Investor Charter, inter alia, includes the vision and mission statement, rights and responsibilities of investors, investor grievance redressal mechanism and Do’s and Don'ts for investing in securities market. The Investor Charter also gives a broader perspective of various rights and responsibilities of investors.",
        charterLink: lnk(
          "Please click here to read more about Investor Charter.",
          "/sebi-investor-charter"
        ),

        // 6. Code of Conduct
        codeTitle: "Code of Conduct",
        sebiCodeText:
          "NWA follows the code of conduct in accordance with the third schedule of IA Regulations 15(9) of the IA Regulations which covers the Code of conduct for investment adviser.",
        sebiCodeLink: lnk(
          "Please refer to the SEBI Code of Conduct.",
          "/code-of-conduct-sebi"
        ),
        cfaCodeText: "NWA also follows the CFA Code of Ethics and Professional Conduct.",
        cfaCodeLink: lnk(
          "Please click here to read more about CFA Code of Conduct.",
          "/cfa-code-of-conduct"
        ),

        // 7. Functions of Investment Adviser
        functionsTitle: "Functions of Investment Adviser",
        functionsText:
          "As an Investment Adviser, NWA carries out its functions, obligations, duties and responsibilities in accordance with the SEBI (Investment Advisers) Regulations, 2013.",
        functionsLink: lnk(
          "Please click here to read more about Functions of Investment Adviser.",
          "/functions-of-investment-adviser"
        ),

        // 8. Risks
        risksTitle: "Risks",
        risksText:
          "The value of the investments and the expected returns affected generally by various risk factors that affect financial and securities market, such as price and volume, volatility in interest rates, currency exchange rates, changes in regulatory and administrative policies of the Government or any other appropriate authority (including tax laws) or other political, economic, and other developments.",
        risksLink: lnk("Please click here to read more about various Risks.", "/risks"),

        // 9. Conflict of Interest
        conflictTitle: "Conflict of Interest",
        conflictText:
          "Neuron Wealth Advisors LLP (NWA) shall try to avoid conflicts of interest as far as possible and when they cannot be avoided, it shall ensure that appropriate disclosures are made to the clients and that the clients are fairly treated.",
        conflictLink: lnk(
          "Please click here to read more about disclosures related to conflict of interest.",
          "/conflict-of-interest"
        ),

        // 10. Annual Audit
        auditTitle: "Annual Audit",
        auditNote: "Please contact us if you like to view the detailed Audit report with Annexures.",
        auditRecords: items("audit", [
          { sr: "1.", fy: "FY 2020-21", status: "Not Applicable", url: "", remarks: "IA license received and business operation started after the financial year" },
          { sr: "2.", fy: "FY 2021-22", status: "Conducted", url: "https://neuronwealth.com/wp-content/uploads/AUDIT_FY2021-22.pdf", remarks: "None" },
          { sr: "3.", fy: "FY 2022-23", status: "Conducted", url: "https://neuronwealth.com/wp-content/uploads/AUDIT_FY2022-23.pdf", remarks: "None" },
          { sr: "4.", fy: "FY 2023-24", status: "Conducted", url: "https://neuronwealth.com/wp-content/uploads/AUDIT_FY2023-24.pdf", remarks: "None" },
          { sr: "5.", fy: "FY 2024-25", status: "Conducted", url: "https://neuronwealth.com/wp-content/uploads/AUDIT_FY2024-25.pdf", remarks: "None" },
          { sr: "6.", fy: "FY 2025-26", status: "Conducted", url: "", remarks: "None" },
        ]),

        // 11. Grievance Redressal
        grievanceTitle: "Grievance Redressal",
        grievanceText:
          "Client’s queries / complaints may arise due to lack of understanding or a deficiency of service experienced by clients. Deficiency of service may include lack of explanation, clarifications, understanding which escalates into shortfalls in the expected delivery standards, either due to inadequacy of facilities available or through the attitude of staff towards the client.",
        grievanceLink: lnk(
          "Please click here to read more about Grievance Redressal Process.",
          "/grievance-redressal"
        ),

        // 12. Disciplinary History & Complaints Status
        complaintsTitle: "Disciplinary History and Complaints Status",
        complaintsText:
          "No penalties / directions have been issued by SEBI under the SEBI Act or Regulations made there under against NWA or its Partners, or employees relating to Investment Advisory services. There are no pending material litigations or legal proceedings, findings of inspections or investigations for which action has been taken or initiated by any regulatory authority against the NWA or its Partners, or employees. The status of complaint, if any, as required by SEBI is disclosed below:",
        currentMonthTitle: "Data for the month ending September 30, 2026",
        monthlyCurrent: items("mc", [
          { sr: "1.", source: "Directly from Investors", pendingLast: "0", received: "0", resolved: "0", totalPending: "0", pendingOver3M: "0", avgTime: "0" },
          { sr: "2.", source: "SEBI(SCORES)", pendingLast: "0", received: "0", resolved: "0", totalPending: "0", pendingOver3M: "0", avgTime: "0" },
          { sr: "3.", source: "Other Sources (if any)", pendingLast: "0", received: "0", resolved: "0", totalPending: "0", pendingOver3M: "0", avgTime: "0" },
        ]),
        monthlyTrend: items("mt", [
          { sr: "1.", month: "April, 2026", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "2.", month: "May, 2026", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "3.", month: "June, 2026", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "4.", month: "July, 2026", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "5.", month: "August, 2026", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "6.", month: "September, 2026", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "7.", month: "October, 2026", carried: "N/A", received: "N/A", resolved: "N/A", pending: "N/A" },
          { sr: "8.", month: "November, 2026", carried: "N/A", received: "N/A", resolved: "N/A", pending: "N/A" },
          { sr: "9.", month: "December, 2026", carried: "N/A", received: "N/A", resolved: "N/A", pending: "N/A" },
          { sr: "10.", month: "January, 2027", carried: "N/A", received: "N/A", resolved: "N/A", pending: "N/A" },
          { sr: "11.", month: "February, 2027", carried: "N/A", received: "N/A", resolved: "N/A", pending: "N/A" },
          { sr: "12.", month: "March, 2027", carried: "N/A", received: "N/A", resolved: "N/A", pending: "N/A" },
        ]),
        annualTrend: items("at", [
          { sr: "1.", year: "2019-20", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "2.", year: "2020-21", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "3.", year: "2021-22", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "4.", year: "2022-23", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "5.", year: "2023-24", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "6.", year: "2024-25", carried: "0", received: "0", resolved: "0", pending: "0" },
          { sr: "7.", year: "2025-26", carried: "0", received: "0", resolved: "0", pending: "0" },
        ]),

        // 13. Disclosure of Holdings
        holdingsTitle: "Disclosure of Holdings of the Investment Adviser",
        holdingsParagraphs: [
          "Neuron Wealth Advisors LLP (“the Investment Adviser”) does not provide investment advice on direct equity or individual listed securities.",
          "The Investment Adviser holds and will hold investments in one or more of the following mutual fund schemes:",
        ],
        holdingsFunds: [
          "Aditya Birla Multi Asset Allocator Fund",
          "HDFC Liquid Fund",
          "ICICI Balanced Advantage Fund",
          "ICICI Bank Deposit",
          "Nippon Multi Asset Allocation Fund",
        ],
        holdingsNotes: [
          "The investments of the Investment Adviser are made for its own purposes. They do not constitute a recommendation to any client.",
          "This disclosure is reviewed periodically. It is updated whenever the holdings of the Investment Adviser change.",
        ],
        clientAdviceTitle: "Client specific advice",
        clientAdviceParagraphs: [
          "Investment advice is provided to each client based on the client’s financial goals, risk profile, investment horizon, tax status, residential status and other relevant information obtained from the client.",
          "Accordingly, the advice provided to a client may differ from, and may be contrary to, the advice provided to other clients. It may also differ from, and may be contrary to, the investments made by the Investment Adviser.",
        ],

        // 14. Details of Principal & Compliance Officers
        officersTitle: "Details of Principal Officer and Compliance Officer",
        principalName: "Jigar Patel",
        principalRole: "Principal Officer",
        principalEmail: "jigar@neuronwealth.com",
        principalPhone: "+91 90999 42563",
        complianceName: "Ruchita Thakor",
        complianceRole: "Compliance Officer",
        complianceEmail: "ruchita@neuronwealth.com",
        compliancePhone: "+91 90999 42576",

        // Sidebar & Authority Credentials
        sidebarTitle: "Compliance Sections",
        sidebarSebiReg: "INA000016481",
        sidebarBaslId: "1697",
        sidebarStatus: "Perpetual Registration",
        sidebarModel: "100% Fee-Only Fiduciary",
        sidebarTrackRecord: "100% Track Record",
        sidebarInquiryTitle: "Compliance Inquiries",
        sidebarInquirySubtitle: "Official Assistance",
        sidebarEmail: "ruchita@neuronwealth.com",
        sidebarPhone: "+91 90999 42576",
        sidebarAddress: "803, Mauryansh Elanza, Nr. Shyamal Cross Roads, Satellite, Ahmedabad-380015",
      },
      { anchor: "compliance-hub" }
    ),
  ],
};

const privacyPolicy = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "Official Privacy Policy of Neuron Wealth Advisors LLP (SEBI RIA INA000016481): Data collection, usage, sharing, protection, client rights and DPDP Act compliance.",
  category: "core",
  icon: "ShieldCheck",
  status: "published",
  seo: {
    title: "Privacy Policy | Neuron Wealth Advisors",
    description:
      "How Neuron Wealth Advisors LLP, a SEBI Registered Investment Adviser, collects, uses, shares and protects your personal information, and the rights you have.",
  },
  sections: [
    section(
      "privacy-hero",
      "policyHero",
      "Policy Hero Banner",
      {
        breadcrumb: "Privacy Policy",
        title: "Privacy",
        highlight: "Policy",
        text: "How we collect, use, share and protect your personal information, and the rights you have.",
        badge: "Last updated: 23 October 2026",
        image: img("/images/about-what-we-do-banner.jpg", "Neuron Wealth Privacy Governance"),
      },
      { anchor: "privacy-hero" }
    ),
    section(
      "privacy-hub",
      "privacyPolicyHub",
      "Privacy Policy Articles & Disclosures",
      {
        introTitle: "Introduction",
        introParagraphs: [
          "Neuron Wealth Advisors LLP (“Neuron Wealth”, “we”, “us” or “our”) is a SEBI Registered Investment Adviser, Registration No. INA000016481. We respect your privacy and treat the information you share with us with care and confidentiality.",
          "This Privacy Policy explains what personal information we collect when you visit our website or engage us as a client, how we use and protect it, who we may share it with, and the choices and rights you have.",
        ],
        collectTitle: "Information We Collect",
        collectWebsiteSubtitle: "When you visit our website",
        collectWebsiteText:
          "Our website does not use analytics or advertising cookies. It saves your display preferences, such as the light or dark theme, text size and accessibility settings, in your own browser's local storage so they are remembered on your next visit. This information stays on your device and is not sent to us. You can clear it at any time from your browser settings.",
        collectContactSubtitle: "When you contact us",
        collectContactText:
          "The forms and contact buttons on our website open an email in your own email application, addressed to connect@neuronwealth.com. We receive only the information you choose to send, such as your name, email address, phone number and message.",
        collectClientSubtitle: "When you become a client",
        collectClientText:
          "To provide investment advice in line with the SEBI (Investment Advisers) Regulations, 2013, we collect information that may include:",
        collectClientBullets: [
          "Your name, contact details, date of birth and address",
          "Identity and address proof, PAN and other KYC documents",
          "Residential status and, where relevant, tax residency in other countries",
          "Income, assets, liabilities, investments and insurance details",
          "Financial goals, family details relevant to your planning and your risk profile",
          "Bank details for fee payments",
        ],
        useTitle: "How We Use Your Information",
        useIntro: "We use your personal information only for purposes connected with our services, including to:",
        useBullets: [
          "Respond to your enquiries and schedule calls",
          "Complete KYC, risk profiling and suitability assessment as required by SEBI",
          "Prepare and deliver investment advice, financial plans and reports",
          "Communicate with you about your engagement, fees and reviews",
          "Meet our legal, regulatory, tax and audit obligations",
        ],
        useNotice:
          "We do not sell or rent your personal information, and we do not share it with third parties for their marketing.",
        shareTitle: "When We Share Information",
        shareIntro: "We share personal information only when it is needed, and only with:",
        shareBullets: [
          "SEBI, KYC Registration Agencies, our supervisory body and other regulatory, tax or government authorities, where required by law or regulation",
          "Professionals and service providers who support our work, such as auditors and technology providers, under a duty of confidentiality",
          "Your chartered accountant, lawyer, bank or other advisers, only with your instruction or consent",
          "Courts or law enforcement agencies, where we are legally required to do so",
        ],
        securityTitle: "How We Protect Your Information",
        securityText:
          "We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, misuse or disclosure. Access is limited to people who need it to serve you. No method of transmission over the internet or electronic storage is completely secure, so while we work hard to protect your information, we cannot guarantee absolute security.",
        retentionTitle: "How Long We Keep Information",
        retentionText:
          "We keep personal information for as long as needed to provide our services and to meet our legal and regulatory obligations. The SEBI (Investment Advisers) Regulations, 2013 require us to maintain client records for a minimum period of five years. After this, information that is no longer needed is deleted or securely disposed of.",
        rightsTitle: "Your Rights",
        rightsIntro:
          "Subject to the Digital Personal Data Protection Act, 2023 and other applicable laws, you may:",
        rightsBullets: [
          "Ask for a summary of the personal information we hold about you",
          "Ask us to correct, complete or update your information",
          "Ask us to delete your information, except where we must keep it to meet legal or regulatory obligations",
          "Withdraw your consent, which may mean we are no longer able to provide some or all of our services",
          "Nominate another person to exercise these rights on your behalf in the event of death or incapacity",
          "Raise a grievance about how your information has been handled",
        ],
        rightsOutro: "To make a request, please contact us using the details below.",
        thirdPartyTitle: "Third Party Websites",
        thirdPartyText:
          "Our website may link to other websites, such as SEBI, BSE and our social media pages. We are not responsible for the privacy practices of those websites. Please read their privacy policies before sharing information with them.",
        childrenTitle: "Children's Information",
        childrenText:
          "Our website and services are not directed at children. Where information about a minor is needed for family planning, such as a child's education goals, we collect it only from the parent or legal guardian.",
        changesTitle: "Changes to This Policy",
        changesText:
          "We may update this Privacy Policy from time to time to reflect changes in our practices or in the law. The updated version will be posted on this page with a revised “Last updated” date.",
        contactTitle: "Contact Us",
        contactText:
          "For any questions, requests or concerns about this Privacy Policy or your personal information, please contact us:",
        contactEmail: "connect@neuronwealth.com",
        contactAddress:
          "Neuron Wealth Advisors LLP\n803, Mauryansh Elanza, Nr. Shyamal Cross Roads,\nB/s. Parekhs Hospital, Satellite,\nAhmedabad-380015, Gujarat, India.",
      },
      { anchor: "privacy-hub" }
    ),
  ],
};

const disclaimerPage = {
  slug: "website-disclaimer",
  title: "Website Disclaimer & Terms",
  description:
    "Official website disclaimer, terms of use, limitation of liability, financial literacy scope, and market risk disclosures of Neuron Wealth Advisors LLP.",
  category: "core",
  icon: "Scale",
  status: "published",
  seo: {
    title: "Disclaimer | Terms of Use & Legal Disclosures | Neuron Wealth Advisors",
    description:
      "Official website disclaimer, terms of use, limitation of liability, financial literacy scope, and market risk disclosures of Neuron Wealth Advisors LLP.",
  },
  sections: [
    section(
      "disclaimer-hero",
      "policyHero",
      "Disclaimer Hero Banner",
      {
        breadcrumb: "Website Disclaimer",
        title: "Website",
        highlight: "Disclaimer",
        text: "Official website disclaimer, terms of use, limitation of liability, financial literacy scope, and statutory risk disclosures of Neuron Wealth Advisors LLP.",
        badge: "SEBI RIA INA000016481",
        image: img("/images/why-us-fiduciary.jpg", "Neuron Wealth Legal and Statutory Governance"),
      },
      { anchor: "disclaimer-hero" }
    ),
    section(
      "disclaimer-hub",
      "disclaimerHub",
      "Website Disclaimers & Statutory Disclosures",
      {
        termsTitle: "Terms of Use & Binding Agreement",
        termsParagraphs: [
          "By accessing or using the website of Neuron Wealth Advisors LLP (hereinafter referred to as “NWA”, “we”, “us”, or “our”), you acknowledge that you have read, understood, and agreed to be bound by the terms, conditions, disclaimers, and notices contained herein.",
          "If you do not agree to these terms, please refrain from using or accessing this website. Your continued use of the website signifies your acceptance of any revisions or modifications to these terms.",
        ],
        educationalTitle: "Financial Literacy & Educational Purpose (No Offer)",
        educationalParagraphs: [
          "All materials, commentary, analyses, data, charts, calculators, and content published on this website are intended solely for financial literacy, educational awareness, and general informational purposes.",
          "Nothing contained on this website constitutes, or should be construed as, an offer to sell, a solicitation of an offer to buy, or a recommendation to purchase, hold, or divest any security, mutual fund, derivative, or financial product.",
          "Accessing this website or reviewing its content does not establish an Investment Adviser-Client relationship between you and Neuron Wealth Advisors LLP. Such a fiduciary relationship is formed strictly upon execution of a formal, written Advisory Agreement and completion of mandatory Know Your Customer (KYC) and Risk Profiling procedures.",
        ],
        accuracyTitle: "Accuracy of Information & Professional Advice",
        accuracyParagraphs: [
          "While NWA exercises reasonable care and diligence in preparing and curating content on this website from sources believed to be authentic and reliable, we make no representations or warranties, express or implied, regarding the accuracy, completeness, timeliness, or suitability of the information.",
          "Tax laws, regulatory guidelines, and financial market dynamics are subject to change without notice. Visitors are strongly advised to seek independent legal, tax, accounting, and financial advice tailored to their specific circumstances before making any investment decisions.",
        ],
        liabilityTitle: "Limitation of Liability",
        liabilityParagraphs: [
          "To the fullest extent permitted by applicable Indian law, Neuron Wealth Advisors LLP, its designated partners, employees, advisors, affiliates, and representatives shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages or financial loss.",
          "This includes, but is not limited to, loss of profits, capital depreciation, loss of data, business interruption, or damages arising out of the use of, or inability to use, this website, even if NWA has been advised of the possibility of such damages.",
        ],
        functionalityTitle: "Website Functionality & Third-Party Links",
        functionalityParagraphs: [
          "NWA does not warrant that this website, its servers, or electronic communications sent from us will be uninterrupted, error-free, secure, or free from viruses, malware, or other potentially harmful components.",
          "This website may contain hyperlinks to external third-party websites (including SEBI, BSE, NSE, AMFI, or regulatory authorities) for reference convenience. NWA has no control over, and assumes no responsibility for, the content, privacy practices, accuracy, or availability of third-party platforms.",
        ],
        risksTitle: "Market & Investment Risks",
        risksParagraphs: [
          "Investments in securities markets are subject to market risks, including the potential loss of principal capital. Investors must read all relevant scheme documents, offer documents, risk disclosure documents, and investment mandates carefully before investing.",
          "Past performance of any investment strategy, asset class, index, or historical portfolio simulation is not an indicator, guarantee, or predictor of future returns. Asset allocation and diversification strategies do not ensure a profit or protect against loss in declining markets.",
        ],
        statutoryTitle: "SEBI & BASL Statutory Disclosures",
        statutoryParagraphs: [
          "Neuron Wealth Advisors LLP is a SEBI Registered Investment Adviser with Registration No. INA000016481 (Validity: Perpetual, Date of Registration: Dec 20, 2021) and a member of BSE Administration & Supervision Ltd. (BASL Membership ID: 1697).",
          "Registration granted by SEBI, membership of BASL, and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
        ],
      },
      { anchor: "disclaimer-hub" }
    ),
  ],
};

const refundPolicyPage = {
  slug: "refund-policy",
  title: "Refund Policy & Retainer Terms",
  description:
    "Official refund policy, SEBI IA Regulation 15A statutory framework, breakage fee calculations, and 5-day banking settlement procedures of Neuron Wealth Advisors LLP.",
  category: "core",
  icon: "Banknote",
  status: "published",
  seo: {
    title: "Refund Policy & Retainer Terms | Neuron Wealth Advisors",
    description:
      "Official refund policy of Neuron Wealth Advisors LLP under SEBI IA Regulation 15A: advisory retainers, breakage deductions, and 5-day banking settlement procedure.",
  },
  sections: [
    section(
      "refund-hero",
      "policyHero",
      "Refund Hero Banner",
      {
        breadcrumb: "Refund Policy",
        title: "Refund",
        highlight: "Policy",
        text: "Statutory refund policy, advisory retainer terms, breakage deductions, and SEBI-mandated 5-day settlement procedure of Neuron Wealth Advisors LLP.",
        badge: "SEBI IA Regulation 15A",
        image: img("/images/about-room.jpg", "Neuron Wealth Consultation Meeting Room"),
      },
      { anchor: "refund-hero" }
    ),
    section(
      "refund-hub",
      "refundHub",
      "Refund Framework & Procedure",
      {
        sebiTitle: "SEBI IA Regulation 15A Statutory Framework",
        sebiParagraphs: [
          "Neuron Wealth Advisors LLP (hereinafter referred to as “NWA”, “we”, “us”, or “our”) is a SEBI Registered Investment Adviser (Registration No. INA000016481, BASL Membership ID: 1697). We operate strictly under the regulatory framework established by the Securities and Exchange Board of India (Investment Advisers) Regulations, 2013.",
          "Regulation 15A of the SEBI (Investment Advisers) Regulations, 2013 governs fees and charging mechanisms, establishing fiduciary standards that protect both clients and advisers. NWA charges fees strictly on an advisory retainer or hourly basis, free of any product commissions, distribution incentives, or third-party kickbacks.",
        ],
        noLiabilityTitle: "No Liability for Market Losses",
        noLiabilityParagraphs: [
          "Investment advisory services provided by NWA represent professional guidance and financial stewardship based on asset allocation, research, and client risk tolerance.",
          "Securities markets are subject to inherent market volatility, interest rate fluctuations, macroeconomic risks, and capital fluctuations. NWA does not guarantee any specific returns, capital preservation, or investment performance.",
          "Accordingly, fees paid for advisory services are non-refundable on the grounds of investment portfolio performance, asset depreciation, or market downturns.",
        ],
        policyTitle: "Standard Refund Policy & Advisory Retainer",
        policyParagraphs: [
          "Advisory retainers are billed in advance on a quarterly, half-yearly, or annual basis as mutually agreed in the written Investment Advisory Agreement.",
          "In the event of premature termination of advisory services by either the Client or the Investment Adviser, refunds shall be processed on a pro-rata basis for the unexpired portion of the billing period.",
          "All refunds are calculated after deducting applicable statutory taxes, payment gateway or banking transaction charges, and statutory breakage fees for advisory work, onboarding, and comprehensive financial planning already executed.",
        ],
        procedureTitle: "Step-by-Step Refund Procedure",
        procedureIntro:
          "Our transparent 7-step procedure ensures compliant, auditable, and prompt processing of all eligible refund requests:",
        steps: [
          {
            id: "step-1",
            visible: true,
            step: "1",
            title: "Acknowledgment & Request Assessment",
            description:
              "Once a refund request is received and assessed, the Investment Adviser will send an email to notify the Client that the Investment Adviser has received the request.",
            tag: "Email Notification",
            icon: "Mail",
          },
          {
            id: "step-2",
            visible: true,
            step: "2",
            title: "Direct Client Verification",
            description:
              "The Investment Adviser support team will contact the Client to confirm request or to ask for additional information if needed.",
            tag: "Support Review",
            icon: "UserCheck",
          },
          {
            id: "step-3",
            visible: true,
            step: "3",
            title: "Formal Determination",
            description: "The Investment Adviser shall notify the Client of the approval or rejection.",
            tag: "Written Decision",
            icon: "BellRing",
          },
          {
            id: "step-4",
            visible: true,
            step: "4",
            title: "Statutory Deductions & Breakage",
            description:
              "Refunds shall be made after deducting a cancellation fee for services already rendered or a breakage fee.",
            tag: "Statutory Breakage",
            icon: "Scale",
          },
          {
            id: "step-5",
            visible: true,
            step: "5",
            title: "Banking Channel Disbursement",
            description:
              "If the refund request is approved, the refund will be processed through banking channel either through cheque or through IMPS/NEFT/RTGS within 5 days.",
            tag: "5-Day Window",
            icon: "CreditCard",
          },
          {
            id: "step-6",
            visible: true,
            step: "6",
            title: "Bank Account Verification",
            description:
              "If the Client has not received a refund within 5 days of approval of refund, the Client is requested to check the bank account as it may take some time before the funds are available in the account.",
            tag: "Settlement Check",
            icon: "Banknote",
          },
          {
            id: "step-7",
            visible: true,
            step: "7",
            title: "Escalation & Direct Assistance",
            description:
              "If the Client has followed all the instructions given, and yet to receive the refund, please contact the Investment Adviser.",
            tag: "Immediate Follow-Up",
            icon: "CircleHelp",
          },
        ],
        timelineTitle: "Settlement & Processing Timeline (5 Business Days)",
        timelineParagraphs: [
          "Approved refunds are disbursed within five (5) business days from the date of formal written approval.",
          "Disbursements are made strictly to the Client's verified primary bank account via NEFT, RTGS, or IMPS banking channels to comply with PMLA (Prevention of Money Laundering Act) and SEBI anti-money laundering guidelines. Cash refunds or third-party bank disbursements are strictly prohibited.",
        ],
        supportTitle: "Support, Inquiries & Escalations",
        supportText:
          "For any questions regarding advisory fees, billing reconciliations, or refund status, clients may reach our dedicated compliance and support desk:",
        supportEmail: "connect@neuronwealth.com",
        supportPhone: "+91 90999 42576",
        supportAddress:
          "Neuron Wealth Advisors LLP\n803, Mauryansh Elanza, Nr. Shyamal Cross Roads,\nSatellite, Ahmedabad-380015, Gujarat, India.",
      },
      { anchor: "refund-hub" }
    ),
  ],
};

const nriReturningToIndia = {
  slug: "nri-returning-to-india",
  title: "NRIs Returning to India",
  description:
    "Pre-return residency, asset repatriation, RNOR window, RSU/401(k) vesting, and transition financial planning.",
  category: "services",
  icon: "Plane",
  status: "published",
  seo: {
    title: "Returning to India from the USA | RSU, 401(k) and RNOR Planning | Neuron Wealth",
    description:
      "Moving back to India from the US? Plan your RSUs, 401(k), US stocks, RNOR years and money transfers before you move. Fee only SEBI RIA founded by a US returnee.",
  },
  sections: [
    section(
      "nri-hero",
      "nriReturnHero",
      "NRI Return Hero Banner",
      {
        eyebrow: "For US NRIs and their families moving back to India",
        title: "You Are Coming Home.",
        titleHighlight: "Your Wealth Does Not Have To.",
        quote:
          "Years at a leading US company have given you RSUs, a 401(k), a US brokerage account and a life you are proud of. Now home is calling. Whether you are leaving your company or moving to its India office, the next 12 to 36 months will decide how much of that wealth you keep.",
        description:
          "Moving back does not mean moving everything back. Some of your wealth is best kept in the US, some is better brought to India, and all of it can be managed from India as one global plan. We are a SEBI Registered Investment Adviser founded by a US returnee. We plan your investments, equity compensation, taxes and money transfers across both countries, so you come home with clarity, not with questions.",
        bgImage: img("/images/home/nri-horizon.jpg", "NRI returning to India horizon view"),
        primaryButton: lnk("Book a 30 minute call", "/contact"),
        secondaryButton: lnk(
          "See the 10 decisions that matter",
          "#financial-decisions"
        ),
        globalNote: "Returning from the UK, Canada, Singapore, UAE or elsewhere? We advise families from every country.",
        originLabel: "USA",
        destinationLabel: "India",
        statNumber: "12–36",
        statUnit: "months",
        statText: "will decide how much of that wealth you keep.",
        planHeading: "One global plan",
        planItems: [
          { id: "plan-1", visible: true, icon: "LineChart", label: "Investments" },
          { id: "plan-2", visible: true, icon: "PieChart", label: "Equity compensation" },
          { id: "plan-3", visible: true, icon: "Banknote", label: "Taxes" },
          { id: "plan-4", visible: true, icon: "Globe", label: "Money transfers" },
        ],
        trustItems: [
          { id: "trust-1", visible: true, icon: "ShieldCheck", text: "SEBI Registered Investment Adviser INA000016481" },
          { id: "trust-2", visible: true, icon: "Wallet", text: "Fee only, no commissions" },
          { id: "trust-3", visible: true, icon: "Briefcase", text: "CA, US CPA and CFA team" },
          { id: "trust-4", visible: true, icon: "Plane", text: "Founder returned from the USA after 9 years" },
        ],
      },
      { anchor: "nri-return-hero" }
    ),

    section(
      "nri-drivers",
      "nriReturnDrivers",
      "Personal Reasons & Return Drivers",
      {
        heading: "The Reasons Are Personal. The Planning Is Financial.",
        paragraph1:
          "Parents who need you closer. Children who should grow up knowing their grandparents and their roots. A career opportunity in a fast growing India. A wish for a fuller life with family around.",
        paragraph2:
          "Whatever brings you home, the decision is made with the heart. Our job is to make sure the money side is handled with the head.",
        sideImage: img("/images/about-who-we-are.jpg", "Neuron Wealth advisory consultation"),
        drivers: [
          { id: "driver-1", visible: true, icon: "Users", title: "Ageing parents", text: "Being close enough to care for your parents as their health and needs change." },
          { id: "driver-2", visible: true, icon: "HeartHandshake", title: "Family ties", text: "Living near brothers, sisters and the wider family again, for the big days and the ordinary ones." },
          { id: "driver-3", visible: true, icon: "Compass", title: "Children and culture", text: "Children growing up with their grandparents, their language, festivals and roots." },
          { id: "driver-4", visible: true, icon: "TrendingUp", title: "Career in India", text: "Leadership roles and new ventures in one of the fastest growing economies in the world." },
          { id: "driver-5", visible: true, icon: "Wallet", title: "Quality of life", text: "Help at home, more time with family and a way of life that is hard to match abroad." },
          { id: "driver-6", visible: true, icon: "Globe", title: "A new chapter", text: "A fresh start after years abroad, on your own terms and at the right time." },
        ],
      },
      { anchor: "personal-reasons" }
    ),

    section(
      "nri-who-we-help",
      "nriWhoWeHelp",
      "Built for US Tech Professionals",
      {
        heading: "Built for Professionals at Leading US Companies",
        description:
          "Many of the families we advise have built their careers at large US technology companies such as Google, Microsoft, Amazon, Apple, Meta, Nvidia, Oracle and others, as well as fast growing startups. Their wealth looks similar, and so do their questions.",
        cards: [
          {
            id: "card-1",
            visible: true,
            title: "You are leaving your US employer",
            text: "You have unvested RSUs, ESPP shares, a 401(k), maybe a severance package. Your move date and your last working day can change how much you keep.",
            image: img("/images/who-oci-global.jpg", "Indian professional holding a tablet in a city lounge"),
          },
          {
            id: "card-2",
            visible: true,
            title: "You are moving to your company's India office",
            text: "An internal transfer looks simple, but your salary, RSUs and taxes now sit across two countries. Vesting shares may be taxed in both India and the US, and your India payroll may not get it right on its own.",
            image: img("/images/who-wealthy-families.jpg", "Advisory meeting in an office overlooking Mumbai"),
          },
          {
            id: "card-3",
            visible: true,
            title: "You are a US citizen or Green Card holder",
            text: "Your US tax life continues after you move. Your Indian investments must be chosen with that in mind.",
            image: img("/images/who-greencard.jpg", "Couple reviewing their US and India tax papers"),
          },
          {
            id: "card-4",
            visible: true,
            title: "You hold a large position in one company's stock",
            text: "Your employer's shares may be a big part of your net worth. Moving countries is the right moment to plan how and when to diversify.",
            image: img("/images/pillar-capability.jpg", "Market screens showing a concentrated stock portfolio"),
          },
        ],
      },
      { anchor: "who-we-help" }
    ),

    section(
      "nri-founder",
      "nriFounderStory",
      "Founder Experience & Credentials",
      {
        founderImage: img("/images/team/jigar-patel.jpg", "Mr. Jigar Patel, Founder and Principal Officer"),
        founderName: "Mr. Jigar Patel",
        founderRole: "Founder & Principal Officer",
        heading: "We Have Made This Journey Ourselves",
        paragraphs: [
          "Our founder, Jigar Patel, lived and worked in the United States for 9 years before moving back to India with his family.",
          "He knows the numbers: the tax rules, the forms, the timing. He also knows the part nobody talks about: the emotions, the family expectations and the fear of getting a big decision wrong.",
          "As a Chartered Accountant, US CPA and CFA charterholder, he and his team bring both sides of your financial life together in one plan.",
        ],
        credentials: [
          { id: "cred-1", visible: true, title: "CA", detail: "India" },
          { id: "cred-2", visible: true, title: "CPA", detail: "USA" },
          { id: "cred-3", visible: true, title: "CFA", detail: "Charterholder" },
          { id: "cred-4", visible: true, title: "MBA", detail: "Finance (USA)" },
        ],
        teamLink: lnk("Meet the team", "/team"),
      },
      { anchor: "founder" }
    ),

    section(
      "nri-rnor",
      "nriRnorWindow",
      "RNOR Golden Window Transition",
      {
        heading: "Your RNOR Years Are a Golden Window",
        leadText:
          "When you first move back, you can usually qualify as Resident but Not Ordinarily Resident (RNOR) for up to two or three years, depending on your years abroad and your move date. During this time:",
        sideImage: img(
          "/images/rnor-golden-window.jpg",
          "Neuron Wealth Advisor discussing RNOR golden window transition with returning NRI client"
        ),
        points: [
          "Most income and gains from abroad are generally not taxed in India",
          "Interest on FCNR deposits stays tax free",
          "You do not need to report foreign assets in your Indian tax return",
        ],
        paragraphs: [
          "For many returning tech professionals who are not US citizens or Green Card holders, this window can be the most tax efficient time in their life to sell US shares, rebalance and decide what to keep abroad and what to bring to India. For US citizens and Green Card holders, the window works differently, and the plan must account for US tax too.",
          "Used well, these years can protect a large part of your wealth. Used poorly, they simply pass by.",
        ],
        focusLabel: "Our focus:",
        focusText:
          "better returns after tax in India and the US, for the risk you are comfortable with, fully within Indian tax law, FEMA and US rules.",
      },
      { anchor: "rnor-window" }
    ),

    section(
      "nri-decisions",
      "nriFinancialDecisions",
      "Ten Financial Decisions",
      {
        heading: "Ten Decisions That Shape Your Wealth for Years",
        decisions: [
          {
            id: "dec-1",
            visible: true,
            num: "01",
            icon: "Calendar",
            title: "When to move",
            text: "Your arrival date decides your tax status in India for years. A few weeks earlier or later can add or lose a full year of RNOR benefit.",
          },
          {
            id: "dec-2",
            visible: true,
            num: "02",
            icon: "CalendarClock",
            title: "Your last day, your vest dates and your move date",
            text: "RSU vests, bonus payouts, ESPP purchases and severance should be lined up with your move. The wrong order can mean leaving money behind or paying tax twice.",
          },
          {
            id: "dec-3",
            visible: true,
            num: "03",
            icon: "LineChart",
            title: "Your RSUs and ESPP shares",
            text: "RSUs that vest after you move may be taxed partly in the US and partly in India. We plan the timing, the foreign tax credit and the reporting, and decide which shares to hold or sell.",
          },
          {
            id: "dec-4",
            visible: true,
            num: "04",
            icon: "PieChart",
            title: "Concentrated stock in your employer",
            text: "How much to keep, how much to sell, and when, so you diversify at the lowest possible tax across both countries.",
          },
          {
            id: "dec-5",
            visible: true,
            num: "05",
            icon: "PiggyBank",
            title: "Your 401(k), IRA and HSA",
            text: "Keep, withdraw or roll over. Indian law offers relief that can align the tax on your US retirement accounts with the US timing, if you plan for it.",
          },
          {
            id: "dec-6",
            visible: true,
            num: "06",
            icon: "Wallet",
            title: "How much money to move, and when",
            text: "Not everything needs to come to India at once. Some money is better kept abroad for a while. Some is better brought in early.",
          },
          {
            id: "dec-7",
            visible: true,
            num: "07",
            icon: "UserRound",
            title: "In whose name to move it",
            text: "Your name, your spouse's or a joint account. The right choice can lower tax for the whole family.",
          },
          {
            id: "dec-8",
            visible: true,
            num: "08",
            icon: "Banknote",
            title: "How to move it",
            text: "NRE, FCNR or RFC accounts, or a direct transfer. The right route protects your money from avoidable tax and currency costs.",
          },
          {
            id: "dec-9",
            visible: true,
            num: "09",
            icon: "House",
            title: "Your US home and other US assets",
            text: "Sell or rent your home, keep or close your US brokerage account. Some US brokers restrict accounts once you live abroad, and US shares held by non US persons carry US estate tax risk above a small limit.",
          },
          {
            id: "dec-10",
            visible: true,
            num: "10",
            icon: "Briefcase",
            title: "Your new portfolio in India",
            text: "A fresh investment plan for your new life, built for your goals, your risk comfort and your tax status in both countries, written into a clear Investment Policy Statement.",
          },
        ],
      },
      { anchor: "financial-decisions" }
    ),

    section(
      "nri-roadmap",
      "nriTimelineRoadmap",
      "Planning Timeline & Roadmap",
      {
        stagesHeading: "Start 6 to 12 Months Before You Move",
        bgImage: img("/images/reasons-dark-bg.jpg", "Dark reasons background"),
        stages: [
          {
            id: "stage-1",
            visible: true,
            period: "12 months before",
            text: "The best time to start. Every option is still open, including your move date and vesting calendar.",
          },
          {
            id: "stage-2",
            visible: true,
            period: "6 months before",
            text: "Still a good time. Most of the important decisions can be planned well.",
          },
          {
            id: "stage-3",
            visible: true,
            period: "Already moved or moving next month",
            text: "Not too late. Many decisions can still be made during your RNOR years. Let us talk now.",
          },
        ],
        stagesFootnote:
          "Moving between two calendar years and two Indian tax years can change your tax status. We help you pick the date that works best for your family.",
        stepsHeading: "Your Return, Step by Step",
        steps: [
          {
            id: "step-1",
            visible: true,
            stage: "12 to 6 months before you move",
            text: "Fix your move date against your vest and bonus calendar. Review every account, share and retirement plan in the US. Decide what to sell, keep and move.",
          },
          {
            id: "step-2",
            visible: true,
            stage: "The last 3 months in the US",
            text: "Open the right accounts in India. Start moving money in a planned way. Finalise your 401(k), HSA and brokerage plan. Plan your final US tax year.",
          },
          {
            id: "step-3",
            visible: true,
            stage: "The first 90 days in India",
            text: "Convert NRE accounts to resident accounts, open RFC accounts where useful, update KYC and FEMA status. Put your new investment plan in place.",
          },
          {
            id: "step-4",
            visible: true,
            stage: "Your RNOR years",
            text: "Use the tax window to diversify, sell foreign assets wisely and move money only when and where it makes sense.",
          },
          {
            id: "step-5",
            visible: true,
            stage: "After that",
            text: "An ongoing plan for your global wealth, with your Indian and US reporting handled correctly and reviewed every year.",
          },
        ],
      },
      { anchor: "plan-early" }
    ),

    section(
      "nri-values",
      "nriValuePoints",
      "Small Decisions, Big Difference",
      {
        heading: "Small Decisions. Big Difference.",
        description:
          "Moving home with your family is a big life decision. The smaller choices around it, like timing, names and amounts, often matter more than people expect. Planned well, they can help you:",
        points: [
          {
            id: "val-1",
            visible: true,
            text: "Gain the full RNOR window by choosing the right move date",
            icon: "Calendar",
            image: img("/images/home/nri-horizon.jpg", "RNOR Window"),
          },
          {
            id: "val-2",
            visible: true,
            text: "Keep more of your RSUs by lining up vesting, sales and foreign tax credits",
            icon: "LineChart",
            image: img("/images/home/investment-still.jpg", "RSU Vesting"),
          },
          {
            id: "val-3",
            visible: true,
            text: "Diversify a concentrated stock position at a lower tax cost",
            icon: "PieChart",
            image: img("/images/pillar-results.jpg", "Concentrated Stock"),
          },
          {
            id: "val-4",
            visible: true,
            text: "Keep your 401(k) working without surprise tax in India",
            icon: "PiggyBank",
            image: img("/images/about-room.jpg", "401(k) Advisory"),
          },
          {
            id: "val-5",
            visible: true,
            text: "Lower tax on your Indian income by structuring it across family members",
            icon: "Users",
            image: img("/images/home/family-shore.jpg", "Family Structuring"),
          },
          {
            id: "val-6",
            visible: true,
            text: "Reduce currency costs by planning how and when money moves",
            icon: "Banknote",
            image: img("/images/night-skyline-numbers.jpg", "Forex currency planning"),
          },
          {
            id: "val-7",
            visible: true,
            text: "Stay compliant in both countries with correct reporting and records",
            icon: "ShieldCheck",
            image: img("/images/pillar-integrity.jpg", "Compliance"),
          },
        ],
      },
      { anchor: "value-points" }
    ),

    section(
      "nri-cross-border",
      "nriCrossBorderAssets",
      "Cross-Border Assets & US Tax",
      {
        block1Heading: "What Happens to Everything You Leave in the US?",
        block1Intro: "Not everything needs to be sold, and not everything should be kept. We look at each asset, one by one:",
        block1Items: [
          { id: "asset-1", visible: true, label: "US shares and RSUs", detail: "hold, sell or diversify, and when" },
          { id: "asset-2", visible: true, label: "401(k), IRA and HSA", detail: "keep, withdraw or roll over" },
          { id: "asset-3", visible: true, label: "US home", detail: "sell, rent or keep for the future" },
          { id: "asset-4", visible: true, label: "Bank and brokerage accounts", detail: "which to keep and with whom" },
          { id: "asset-5", visible: true, label: "529 plans and other family accounts", detail: "how they fit your new life" },
        ],
        block1Conclusion:
          "If we keep them, we make sure the income and assets are reported correctly in both countries. If we sell, we plan when to sell so the gain is taxed as little as possible in India and the US.",
        block1Image: img(
          "/images/us-assets-planning.jpg",
          "Wealth advisor reviewing US assets, equity compensation and property floor plans"
        ),
        block2Heading: "Your US Tax Life Does Not End at the Airport",
        block2Items: [
          "US citizens continue to file US tax returns, wherever they live",
          "Indian mutual funds are usually treated as PFIC in the US and can be complicated for novice investor or advisor",
          "FBAR and FATCA reporting of your Indian accounts continues",
          "Giving up a Green Card has its own rules and, for long term holders, a possible exit tax",
          "Some US states may still treat you as a resident unless you leave properly",
        ],
        block2Conclusion:
          "We build your Indian portfolio so it works under both tax systems, and we work alongside your US CPA so both sides match.",
        block2Image: img(
          "/images/us-tax-airport.jpg",
          "NRI couple in international airport lounge managing cross-border US-India tax compliance"
        ),
        block3Heading: "A New Country Means a New Financial Plan",
        block3Paragraphs: [
          "Your taxes, investment options, expenses, income, goals and even your comfort with risk all change when you move. A plan made for life in California or Seattle will not work in Bengaluru, Hyderabad or Ahmedabad.",
          "We rebuild your plan for your new life: your goals, your cash flow, your children's education, your parents' care and your retirement, with investments chosen for after tax returns in both countries.",
        ],
        block3Image: img(
          "/images/nri-relocation-advisory.jpg",
          "Neuron Wealth Advisors consulting an NRI couple returning to India"
        ),
      },
      { anchor: "us-assets" }
    ),

    section(
      "nri-deliverables",
      "nriDeliverables",
      "What You Receive (Deliverables)",
      {
        heading: "What You Receive",
        subtitle: "A complete, written plan prepared by our CA, CPA and CFA team:",
        bgImage: img("/images/home/hero-residence.jpg", "Deliverables background"),
        deliverables: [
          { id: "del-1", visible: true, num: "01", title: "Residential status plan", desc: "your best move date and your RNOR window, year by year" },
          {
            id: "del-2",
            visible: true,
            num: "02",
            title: "Equity compensation plan",
            desc: "RSUs, ESPP and stock options mapped against your move, with the tax in both countries",
          },
          { id: "del-3", visible: true, num: "03", title: "Concentrated stock plan", desc: "how and when to diversify" },
          { id: "del-4", visible: true, num: "04", title: "US assets plan", desc: "401(k), IRA, HSA, brokerage, home and bank accounts" },
          { id: "del-5", visible: true, num: "05", title: "Money transfer plan", desc: "how much, when, how and in whose name" },
          { id: "del-6", visible: true, num: "06", title: "New India portfolio", desc: "asset allocation and Investment Policy Statement" },
          { id: "del-7", visible: true, num: "07", title: "Tax plan for India and the US", desc: "the effect of every step in both countries" },
          {
            id: "del-8",
            visible: true,
            num: "08",
            title: "Compliance calendar",
            desc: "every filing and report in India and the US, so nothing is missed",
          },
          { id: "del-9", visible: true, num: "09", title: "Family protection", desc: "insurance, will and nominations for your new life" },
        ],
        footerText: "We then help you put the plan in place and stay with you through your RNOR years and beyond.",
        button: lnk("Book a 30 minute call", "/contact"),
      },
      { anchor: "what-you-receive" }
    ),

    section(
      "nri-why-choose",
      "nriWhyChoose",
      "One Trusted Adviser (Why Choose)",
      {
        heading: "One Trusted Adviser for Both Sides of Your Life",
        founderImage: img("/images/team/jigar-patel.jpg", "Mr. Jigar Patel, Founder"),
        leadCardNum: "01",
        leadCardTitle: "We have lived it.",
        leadCardText: "Our founder returned from the USA himself.",
        reasons: [
          {
            id: "why-1",
            visible: true,
            icon: "LineChart",
            title: "Investment advisers first.",
            text: "Every recommendation starts with one question: will this improve what you keep, for the risk you take?",
          },
          {
            id: "why-2",
            visible: true,
            icon: "Globe",
            title: "India and US under one roof.",
            text: "Indian tax, US tax, FEMA and DTAA are planned together before you invest, not after.",
          },
          {
            id: "why-3",
            visible: true,
            icon: "Briefcase",
            title: "We understand tech compensation.",
            text: "RSUs, ESPP, vesting schedules and concentrated stock are part of our everyday work.",
          },
          {
            id: "why-4",
            visible: true,
            icon: "Wallet",
            title: "Fee only.",
            text: "We are paid only by you, never by a product. No commissions.",
          },
          {
            id: "why-5",
            visible: true,
            icon: "ShieldCheck",
            title: "Your money stays in your name.",
            text: "We advise and help you act. Your investments stay in your own accounts.",
          },
          {
            id: "why-6",
            visible: true,
            icon: "HeartHandshake",
            title: "Plain language.",
            text: "You will always know what we suggest and why.",
          },
        ],
      },
      { anchor: "why-choose" }
    ),

    section(
      "nri-story",
      "nriFamilyStory",
      "Family Journey Case Study",
      {
        heading: "A Family We Helped",
        disclaimerBadge: "An example for illustration. Names and details are changed.",
        phases: [
          {
            id: "phase-1",
            visible: true,
            title: "Seattle",
            badge: "Seattle",
            image: img("/images/who-nri-h1b.jpg", "Seattle Tech Career"),
            text: "Arjun spent 11 years in Seattle at a large US technology company. He and his wife Kavya held H1B and H4 visas. A large part of their wealth was in his employer's shares, with more RSUs vesting each quarter.",
            bulletPoints: [],
          },
          {
            id: "phase-2",
            visible: true,
            title: "Nine months ahead",
            badge: "Nine months ahead",
            image: img("", ""),
            text: "When Arjun accepted an internal transfer to his company's Hyderabad office, they came to us nine months ahead.",
            bulletPoints: [
              "We set his move date to secure the full RNOR window.",
              "We mapped every upcoming vest against his transfer date and planned how the shares would be taxed in each country.",
              "We created a plan to diversify the concentrated stock over his RNOR years.",
              "We kept the 401(k) invested with the right Indian tax treatment.",
              "We moved money to India in stages.",
            ],
          },
          {
            id: "phase-3",
            visible: true,
            title: "Hyderabad",
            badge: "Hyderabad",
            image: img("/images/who-global-families.jpg", "Hyderabad Settlement"),
            text: "Today the family is settled in Hyderabad with a diversified portfolio, a clear plan for their US accounts and a calendar that tells them exactly what to do and when.",
            bulletPoints: [],
          },
        ],
        footNote: "Every family is different. Results depend on individual circumstances and markets.",
      },
      { anchor: "family-story" }
    ),

    section(
      "nri-faqs",
      "nriFaqsClosing",
      "FAQs & Closing CTA",
      {
        faqHeading: "Frequently Asked Questions",
        contactLink: lnk("Contact Us", "/contact"),
        faqs: [
          {
            id: "faq-1",
            visible: true,
            q: "When do I become a resident of India after I return?",
            a: "Under FEMA, you become a resident when you return to live in India. For income tax, your status depends on the days you spend in India and your years abroad. Most returning NRIs are first RNOR, then fully resident.",
          },
          {
            id: "faq-2",
            visible: true,
            q: "What is RNOR and how long does it last?",
            a: "RNOR means Resident but Not Ordinarily Resident. During this period most foreign income is generally not taxed in India. It usually lasts up to two or three years, depending on your years abroad and your move date.",
          },
          {
            id: "faq-3",
            visible: true,
            q: "How are my RSUs taxed if they vest after I move to India?",
            a: "RSUs that vest after the move are often taxed partly in the US and partly in India, based on where you worked between grant and vesting. Credit for tax paid in one country can usually be claimed in the other. Planning the timing and the paperwork makes a big difference.",
          },
          {
            id: "faq-4",
            visible: true,
            q: "I am moving to my company's India office. What changes?",
            a: "Your salary moves to Indian payroll, but your RSUs and ESPP usually stay in the US. Both countries may tax the same shares, and your employer may not handle it fully. We plan your transfer date, your vesting and your tax credits so you do not pay twice.",
          },
          {
            id: "faq-5",
            visible: true,
            q: "Can I keep my 401(k) and IRA after moving to India?",
            a: "Yes, you can usually keep them. Indian tax law also offers relief that can align the tax on these accounts with US timing. Whether to keep, withdraw or roll over depends on your age, tax in both countries and your plans.",
          },
          {
            id: "faq-6",
            visible: true,
            q: "Should I sell my US shares before or after I move?",
            a: "It depends on your citizenship, your visa status and your RNOR window. For some families, selling during the RNOR years is far more tax efficient. For US citizens and Green Card holders, US tax applies either way. We plan this share by share.",
          },
          {
            id: "faq-7",
            visible: true,
            q: "Can I keep my US brokerage account?",
            a: "Often yes, but some US brokers restrict accounts once you live abroad. Also, US shares held by non US persons can carry US estate tax risk. We help you choose where and how to hold them.",
          },
          {
            id: "faq-8",
            visible: true,
            q: "What happens to my NRE and FCNR accounts?",
            a: "NRE accounts must be converted to resident accounts once you return. FCNR deposits can continue until maturity, and their interest stays tax free while you are RNOR. You can also hold foreign currency in an RFC account.",
          },
          {
            id: "faq-9",
            visible: true,
            q: "I am a US citizen. Do I still file US taxes after moving?",
            a: "Yes. US citizens file US tax returns wherever they live. With the DTAA and foreign tax credits, you can usually avoid paying tax twice, but it needs planning.",
          },
          {
            id: "faq-10",
            visible: true,
            q: "I have already moved back. Is it too late?",
            a: "No. Many important decisions can still be made during your RNOR years. The earlier we start, the more options you have.",
          },
        ],
        closingHeading: "Come Home with a Plan, Not with Questions.",
        closingText:
          "Tell us about your move in a 30 minute call. No obligation and nothing to sell. Just clear answers from people who have made the same journey from the US to India.",
        primaryButton: lnk("Book a 30 minute call", "/contact"),
        secondaryButton: lnk(
          "See the 10 decisions that matter",
          "#financial-decisions"
        ),
        disclaimer:
          "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
      },
      { anchor: "faqs" }
    ),
  ],
};

const globalIndians = {
  slug: "global-indians",
  title: "Global Indians",
  description:
    "Investment advisory for NRIs, OCI cardholders and Persons of Indian Origin.",
  category: "services",
  icon: "Globe",
  status: "published",
  seo: {
    title: "Investment Adviser for NRIs and OCIs | After Tax Returns | Neuron Wealth",
    description:
      "SEBI registered, fee only investment adviser for NRIs and OCIs. Better returns after tax in India and your home country, with the right risk and full compliance.",
  },
  sections: [
    section(
      "gi-hero",
      "globalIndiansHero",
      "Global Indians Hero Banner",
      {
        eyebrow: "Investment advice for NRIs, OCI cardholders and Persons of Indian Origin",
        title: "Your Money in India Should Work for You",
        titleHighlight: "in Both Countries.",
        description:
          "Many Global Indians earn good returns in India, then lose a large part of it to tax in India and again where they live. We are a SEBI Registered Investment Adviser with one clear focus: helping you earn better returns after tax in both countries, for the risk you are comfortable with, while staying fully within Indian tax law, FEMA and the rules of your home country.",
        bgImage: img("/images/home/hero-window.jpg", "Global Indians Hero Horizon"),
        primaryButton: lnk("Book a 30 minute call", "/contact"),
        secondaryButton: lnk("See how we invest", "#how-we-help"),
        trustItems: items("trust", [
          { text: "SEBI Registered Investment Adviser INA000016481" },
          { text: "Fee only, no commissions" },
          { text: "CA, CPA and CFA team" },
          { text: "India and US tax built into every investment decision" },
        ]),
      },
      { anchor: "hero" }
    ),

    section(
      "gi-what-you-keep",
      "globalIndiansWhatYouKeep",
      "What Matters Is What You Keep",
      {
        heading: "What Matters Is What You Keep",
        sideImage: img("/images/home/family-shore.jpg", "A family walking together along the shore"),
        calloutBadge: "A good return on paper is not the same as a good return in your pocket.",
        introText:
          "Two families can hold similar investments in India and keep very different amounts. The difference comes from a few quiet choices:",
        choices: items("choice", [
          { num: "01", text: "Which investment you choose, based on where you pay tax" },
          { num: "02", text: "Which account it sits in: NRE, NRO, FCNR or abroad" },
          { num: "03", text: "In whose name you invest" },
          { num: "04", text: "When you buy, when you sell and when you bring the money out" },
          { num: "05", text: "How the tax paid in India is used in your home country" },
        ]),
        conclusionText:
          "Get these right and every rupee works harder. Get them wrong and returns leak away year after year, often without anyone noticing.",
      },
      { anchor: "what-you-keep" }
    ),

    section(
      "gi-approach",
      "globalIndiansApproach",
      "Three Guiding Questions (Approach)",
      {
        heading: "Three Questions Guide Every Recommendation",
        bgImage: img("/images/mission-bg.jpg", "Neuron Wealth mission background"),
        pillars: items("pillar", [
          {
            icon: "LineChart",
            title: "Better returns after tax.",
            text: "We judge every investment by what you keep after tax in India and in your home country.",
          },
          {
            icon: "Scale",
            title: "The right level of risk.",
            text: "Your portfolio matches your goals and your comfort, not the market mood.",
          },
          {
            icon: "ShieldCheck",
            title: "Fully compliant.",
            text: "Every decision follows Indian income tax law, FEMA and the reporting rules where you live. No shortcuts, no surprises later.",
          },
        ]),
      },
      { anchor: "approach" }
    ),

    section(
      "gi-familiar",
      "globalIndiansFamiliar",
      "Does This Sound Familiar? (Client Voices)",
      {
        heading: "Does This Sound Familiar?",
        quotes: items("quote", [
          { quote: "My Indian mutual funds have done well, but my CPA says the US tax on them is very high." },
          { quote: "My money sits in fixed deposits because I never found time to plan it properly." },
          { quote: "I invest in India through a relative's name. I am not sure it is right." },
          { quote: "I seem to pay tax in India and again abroad." },
          { quote: "I have accounts and investments everywhere and no single view of how they are doing." },
          { quote: "If something happens to me, my family will not know what we own in India." },
        ]),
        bannerText:
          "If even one of these sounds like you, your money in India is probably working harder for the tax authorities than for you.",
        bannerHighlight: "We can help.",
      },
      { anchor: "familiar" }
    ),

    section(
      "gi-who-we-work-with",
      "globalIndiansWhoWeWorkWith",
      "Who We Work With",
      {
        heading: "Who We Work With",
        subtitleNote:
          "Most of our clients live in the United States, so we know the rules of India and the US especially well.",
        profiles: items("profile", [
          {
            icon: "Briefcase",
            text: "NRIs working abroad on H1B, L1 and other work visas",
            image: img("/images/who-nri-h1b.jpg", "NRIs working abroad"),
          },
          {
            icon: "BadgeCheck",
            text: "Green Card holders and US citizens of Indian origin",
            image: img("/images/who-greencard.jpg", "Green Card holders"),
          },
          {
            icon: "Globe",
            text: "OCI cardholders and Persons of Indian Origin in the US, UK, Canada, UAE, Singapore and beyond",
            image: img("/images/who-oci-global.jpg", "OCI cardholders"),
          },
          {
            icon: "Users",
            text: "Families with members living in two or more countries",
            image: img("/images/who-global-families.jpg", "Global families"),
          },
          {
            icon: "Landmark",
            text: "Families with investable wealth of USD 1 million or more who want one trusted investment adviser for India",
            image: img("/images/who-wealthy-families.jpg", "Wealthy families"),
          },
        ]),
      },
      { anchor: "who-we-work-with" }
    ),

    section(
      "gi-why-different",
      "globalIndiansWhyDifferent",
      "Why Investing in India Is Different",
      {
        heading: "Why Investing in India Is Different for You",
        subheading: "You live under two sets of rules.",
        box1Text: "India decides what you can buy, how you must hold it and how much you can take out.",
        box2Text: "Your home country decides how all of it is taxed and reported.",
        bannerBgImage: img("/images/us-tax-airport.jpg", "US tax airport"),
        bannerHeading: "So an investment that is perfect for someone living in India can be costly for you:",
        points: items("point", [
          {
            point:
              "Indian mutual funds work well for residents. For US taxpayers they are usually treated as PFIC, which can take away a large part of the gain in US tax.",
          },
          {
            point: "NRE deposit interest is tax free in India. If you are a US tax resident, it is still taxed in the US.",
          },
          {
            point:
              "Selling property or shares at the wrong time, or from the wrong account, can mean higher tax in both countries.",
          },
        ]),
        footerNote:
          "This is why investment advice made for resident Indians often goes wrong for NRIs. We always look at both countries before we recommend anything.",
      },
      { anchor: "why-different" }
    ),

    section(
      "gi-how-we-help",
      "globalIndiansHowWeHelp",
      "How We Help (Stacking Cards)",
      {
        heading: "How We Help",
        services: items("service", [
          {
            num: "01",
            icon: "LineChart",
            title: "Investment advice built for after tax returns",
            text: [
              "This is the heart of what we do. We understand your goals, your risk comfort and where you pay tax, then build your India portfolio around it.",
              "Independent advice on shares, mutual funds, bonds, deposits, PMS, AIF, GIFT City and global options, chosen for what you keep, not what looks good on paper. You get a written Investment Policy Statement, regular reviews, rebalancing and one simple report.",
            ],
            image: img("/images/pillar-capability.jpg", "Investment advice"),
          },
          {
            num: "02",
            icon: "Layers",
            title: "The right structure for every rupee",
            text: [
              "NRE, NRO or FCNR. India or abroad. Your name, your spouse's or a joint holding. Direct investment or a fund. We help you hold each investment in the way that is most efficient and fully allowed under FEMA.",
            ],
            image: img("/images/home/investment-still.jpg", "Account structuring"),
          },
          {
            num: "03",
            icon: "Scale",
            title: "Tax planning across both countries",
            text: [
              "We plan when to buy and sell, how to use DTAA so you do not pay tax twice and how to claim credit abroad for tax paid in India. We work with your CPA or tax adviser abroad so both sides match.",
            ],
            image: img("/images/reasons-dark-bg.jpg", "Tax planning"),
          },
          {
            num: "04",
            icon: "ArrowLeftRight",
            title: "Moving money in and out",
            text: [
              "Bringing money to India when it makes sense, and taking it back out the right way, with correct forms and records. Planned well, this protects your returns as well as your peace of mind.",
            ],
            image: img("/images/home/nri-horizon.jpg", "Moving money"),
          },
          {
            num: "05",
            icon: "House",
            title: "Property, parents and inheritance",
            text: [
              "Property and family wealth in India are part of your total portfolio. We advise on buying, selling and inheriting, and how the money from a sale can be put to better use.",
            ],
            image: img("/images/pillar-results.jpg", "Property and inheritance"),
          },
          {
            num: "06",
            icon: "ShieldCheck",
            title: "Compliance that protects your wealth",
            text: [
              "FEMA status, KYC, FATCA, FBAR and foreign reporting, a clear will for Indian assets and correct nominations. Good compliance is not paperwork. It protects your returns from penalties and your family from confusion.",
            ],
            image: img("/images/mission-dark-bg.jpg", "Compliance protection"),
          },
        ]),
      },
      { anchor: "how-we-help" }
    ),

    section(
      "gi-why-choose",
      "globalIndiansWhyChoose",
      "Why Families Choose Neuron Wealth",
      {
        heading: "Why Families Choose Neuron Wealth",
        tiles: items("tile", [
          {
            icon: "LineChart",
            title: "Investment advisers first.",
            text: "We are a SEBI Registered Investment Adviser. Every recommendation starts with one question: will this improve what you keep, for the risk you take?",
            image: img("", ""),
          },
          {
            icon: "Scale",
            title: "Tax and law built into every decision.",
            text: "Our team of Chartered Accountants, a US CPA and a CFA charterholder looks at India and your home country together, so tax is planned before you invest, not after.",
            image: img("/images/nri-relocation-advisory.jpg", "Relocation advisory"),
          },
          {
            icon: "Plane",
            title: "We have lived it.",
            text: "Our founder, Jigar Patel, lived and worked in the United States for 9 years before returning to India.",
            image: img("/images/home/hero-residence.jpg", "Founder experience"),
          },
          {
            icon: "Wallet",
            title: "Fee only.",
            text: "We are paid only by you, never by a product. No commissions, no hidden interest.",
            image: img("", ""),
          },
          {
            icon: "ShieldCheck",
            title: "Your money stays in your name.",
            text: "Your investments stay in your own accounts. We advise and help you act on it.",
            image: img("", ""),
          },
          {
            icon: "HeartHandshake",
            title: "Plain language.",
            text: "You will always know what we suggest and why.",
            image: img("", ""),
          },
        ]),
      },
      { anchor: "why-choose" }
    ),

    section(
      "gi-how-we-work",
      "globalIndiansHowWeWork",
      "How We Work (Process Steps)",
      {
        heading: "How We Work",
        steps: items("step", [
          {
            num: "01",
            title: "A first conversation.",
            text: "A 30 minute call to understand your situation. No obligation.",
            image: img("/images/pillar-intention.jpg", "First conversation"),
          },
          {
            num: "02",
            title: "Understanding you.",
            text: "Your family, residency, goals, assets in India and abroad, and your comfort with risk.",
            image: img("/images/about-who-we-are.jpg", "Understanding you"),
          },
          {
            num: "03",
            title: "Your investment plan.",
            text: "A written plan and Investment Policy Statement covering what to hold, where, in whose name and why, with the tax effect in both countries.",
            image: img("/images/us-assets-planning.jpg", "Investment plan"),
          },
          {
            num: "04",
            title: "Putting it in place and staying with you.",
            text: "We help you act on the plan, track it and review it at least once a year, or whenever your life or the rules change.",
            image: img("/images/why-us-fiduciary.jpg", "Ongoing fiduciary guidance"),
          },
        ]),
      },
      { anchor: "how-we-work" }
    ),

    section(
      "gi-family-story",
      "globalIndiansFamilyStory",
      "Family Journey Case Study",
      {
        heading: "A Family We Helped",
        disclaimerBadge: "An example for illustration. Names and details are changed.",
        sideImage: img("/images/mission-bg.jpg", "A family meeting with their adviser at home"),
        paragraphs: [
          "Rahul and Priya are US citizens living in California and hold OCI cards. Their money in India was spread across NRO deposits, Indian mutual funds bought years ago and a flat left by Rahul's father. Their US CPA had warned that the mutual funds were creating a heavy US tax bill.",
          "We planned the exit from the mutual funds in a sensible order across both countries, then rebuilt their India portfolio with investments that suit US taxpayers. We planned the flat sale and the move of money to the US, closed accounts they no longer needed and put a written Investment Policy Statement in place.",
        ],
        highlightText:
          "Today the family has a portfolio designed for after tax returns in both countries, fewer accounts and one clear report they understand.",
        footnote: "Every family is different. Results depend on individual circumstances and markets.",
      },
      { anchor: "family-story" }
    ),

    section(
      "gi-faqs-closing",
      "globalIndiansFaqsClosing",
      "FAQs & Closing CTA",
      {
        faqHeading: "Frequently Asked Questions",
        contactLink: lnk("Contact Us", "/contact"),
        faqs: items("faq", [
          {
            q: "What do you mean by better returns after tax?",
            a: "It is what you actually keep after paying tax in India and in your home country. We compare investments on this basis, adjusted for the risk you take, instead of looking only at the headline return.",
          },
          {
            q: "Can I invest in Indian mutual funds while living in the US?",
            a: "Yes, but only some fund houses accept investors living in the US and Canada. More important, for US taxpayers Indian mutual funds are usually treated as PFIC, which can mean higher tax and extra filing in the US. Shares, bonds and some other options may suit you better. We look at both countries before you invest.",
          },
          {
            q: "Do you manage my money?",
            a: "We advise. Your money stays in your own name and your own accounts. We recommend what to do, help you carry it out and keep reviewing it.",
          },
          {
            q: "Is interest on my NRE account tax free?",
            a: "In India, yes, as long as you are a non resident. If you are a US tax resident, the interest is taxed in the US and must be reported there.",
          },
          {
            q: "How much money can I take out of my NRO account?",
            a: "Up to USD 1 million in each financial year, after paying the tax due and with the required forms. Money in NRE accounts can be taken out in full.",
          },
          {
            q: "I hold an OCI card. What can I invest in?",
            a: "Mostly the same as NRIs: shares, mutual funds, bonds, deposits and residential or commercial property. You cannot buy agricultural land, farmhouses or plantations, though you can inherit them.",
          },
          {
            q: "Will I pay tax twice on my Indian income?",
            a: "Usually not. Under DTAA, the tax paid in India can generally be claimed as a credit in the country you live in. This needs planning and correct filing in both countries.",
          },
          {
            q: "Can you work with my CPA in the US?",
            a: "Yes. We regularly work with CPAs and tax advisers abroad so that your investment decisions and tax returns in both countries match.",
          },
        ]),
        closingHeading: "Earn Well. Keep More. Stay Compliant.",
        closingText:
          "Tell us about your investments in India in a 30 minute call. No obligation and nothing to sell. Just clear answers from investment advisers who understand both countries.",
        primaryButton: lnk("Book a 30 minute call", "/contact"),
        secondaryButton: lnk(
          "See how we invest",
          "#how-we-help"
        ),
        disclaimer:
          "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
      },
      { anchor: "faqs" }
    ),
  ],
};

const globalCitizensInIndia = {
  slug: "global-citizens-in-india",
  title: "Global Citizens in India",
  description:
    "Dual taxation, FEMA compliance, foreign asset reporting, and investment advisory for foreign citizens and OCIs in India.",
  category: "services",
  icon: "Globe",
  status: "published",
  seo: {
    title: "Foreign Citizens and OCIs Living in India | Tax and Investment Adviser | Neuron Wealth",
    description:
      "Foreign citizen or OCI living in India? Plan investments for better returns after tax in India and your home country, with DTAA, foreign tax credit, reporting and FEMA handled together.",
  },
  sections: [
    section(
      "gci-hero",
      "globalCitizensHero",
      "Global Citizens Hero Banner",
      {
        eyebrow: "For foreign citizens and OCI cardholders who call India home",
        title: "You Live in India. Your Passport Is From Another Country.",
        titleHighlight: "Your Money Answers to Both.",
        paragraphs: [
          "You may have lived in India for years. Your work, family and future are here. But your home country may still tax some or all of your income, and India now taxes you as a resident on your income from around the world.",
          "Two countries, two tax years, two sets of rules and one family trying to make sense of it all. We are a SEBI Registered Investment Adviser. We bring Indian tax, your home country's tax, the tax treaty between them and FEMA into one simple plan, and invest your money for better returns after tax in both countries.",
        ],
        bgImage: img("/images/home/hero-residence.jpg", "Global Citizens Hero Horizon"),
        primaryButton: lnk("Book a 30 minute call", "/contact"),
        secondaryButton: lnk(
          "Check your residential status",
          "#status"
        ),
        trustItems: items("trust", [
          { text: "SEBI Registered Investment Adviser INA000016481" },
          { text: "Fee only, no commissions" },
          { text: "CA, US CPA and CFA team" },
          { text: "Cross border tax built into every investment decision" },
        ]),
      },
      { anchor: "hero" }
    ),

    section(
      "gci-familiar",
      "globalCitizensFamiliar",
      "Does This Sound Familiar? (Dilemmas)",
      {
        heading: "Does This Sound Familiar?",
        subtitle:
          "If this sounds like you, you are not alone. These are some of the most common and most costly mix ups we see.",
        quotes: items("quote", [
          { quote: "I have lived in India for years, but I still think of myself as an NRI." },
          { quote: "My PPF interest is tax free in India. Why is my tax adviser back home asking about it?" },
          { quote: "I pay tax in India. Why do I still owe tax in my home country?" },
          { quote: "I still have a pension, a house and bank accounts back home. I am not sure how India sees them." },
          { quote: "My adviser in India and my adviser abroad do not talk to each other, and I am stuck in the middle." },
          { quote: "I am not sure what I am allowed to invest in, as a foreign citizen in India." },
        ]),
      },
      { anchor: "familiar" }
    ),

    section(
      "gci-status",
      "globalCitizensStatus",
      "You May Not Be an NRI Anymore (Status)",
      {
        heading: "You May Not Be an NRI Anymore",
        description:
          "Many foreign citizens and OCI cardholders who have lived in India for years still think of themselves as NRIs. Under Indian law, they usually are not.",
        strikeFrom: "NRI",
        strikeTo: "Resident",
        calloutQuote: "Your passport does not decide your status. Where you live does.",
        laws: items("law", [
          {
            icon: "Landmark",
            title: "Under Indian income tax",
            text: "If you have lived in India long enough, you are a resident and usually an ordinary resident. India then taxes your global income, and you must report your foreign assets in your Indian tax return: bank accounts, investments, pensions, retirement accounts and property abroad.",
          },
          {
            icon: "ShieldCheck",
            title: "Under FEMA",
            text: "If you live in India to work or settle here, you are a resident. Your bank accounts, KYC and investments should reflect that. Holding NRE accounts or investing as an NRI when you are not one can create problems later.",
          },
        ]),
        warningBox:
          "Missing this is common. The penalties for not reporting foreign assets in India can be heavy. The fix is simple once you know your status, and we help you get there quietly and correctly.",
      },
      { anchor: "status" }
    ),

    section(
      "gci-home-tax",
      "globalCitizensHomeTax",
      "Does Your Home Country Still Tax You?",
      {
        heading: "Does Your Home Country Still Tax You?",
        subheading: "It depends on your passport.",
        cards: items("card", [
          {
            icon: "Flag",
            title: "US citizens and Green Card holders",
            text: "The US taxes its citizens on their worldwide income, wherever they live. So you file a US tax return every year, and you also pay tax in India as a resident. Careful planning is essential to avoid paying twice.",
          },
          {
            icon: "Globe",
            title: "Citizens of most other countries",
            text: "The UK, Canada, Australia, Singapore and most other countries tax you mainly based on where you live. Once you are no longer resident there, they usually tax only income that comes from that country, such as rent, some pensions or gains on local property. But leaving properly matters. Some countries have strict tests for when you stop being resident, and some tax certain gains when you leave.",
          },
          {
            icon: "Scale",
            title: "For everyone",
            text: "India taxes your income from around the world once you are an ordinary resident. Your home country may tax part of the same income. The tax treaty between India and your country decides who taxes first and who gives credit.",
          },
        ]),
      },
      { anchor: "home-tax" }
    ),

    section(
      "gci-tax-free",
      "globalCitizensTaxFree",
      "Tax Free in India Trap",
      {
        heading: "Tax Free in India Does Not Mean Tax Free at Home",
        introText: "India and your home country can see the same income very differently. A few common examples:",
        examples: items("example", [
          {
            icon: "PiggyBank",
            text: "PPF and EPF interest, tax free bonds and some insurance maturity amounts are tax free in India, but may be taxed by your home country. For US citizens, they usually are.",
          },
          {
            icon: "LineChart",
            text: "Indian mutual funds are simple in India, but some countries tax them harshly. In the US they are usually treated as PFIC, with heavy tax and extra forms.",
          },
          { icon: "Receipt", text: "Section 80C savings reduce Indian tax but give no benefit abroad." },
          {
            icon: "Landmark",
            text: "Pensions and retirement accounts abroad, like a 401(k), UK pension, RRSP or superannuation, may be treated very differently by India and by your home country.",
          },
          { icon: "House", text: "Rent or gains on property back home may be taxed in both countries, with credit in one of them." },
        ]),
        conclusionImage: img("/images/home/investment-still.jpg", "Investment Still"),
        conclusionText:
          "The result is simple. An investment that looks perfect in India can be a poor choice for a foreign citizen. Tax saving in India alone is not the goal.",
        conclusionHighlight: "What matters is what you keep after tax in both countries.",
      },
      { anchor: "tax-free" }
    ),

    section(
      "gci-share-tax",
      "globalCitizensShareTax",
      "How Two Countries Share Your Tax",
      {
        heading: "How Two Countries Share Your Tax",
        description:
          "India has tax treaties (DTAA) with most countries. Together with foreign tax credits, they are there to stop you paying tax twice. But they only work if you plan and file correctly.",
        rules: items("rule", [
          {
            title: "Who taxes first.",
            text: "For some income, India taxes first and your home country gives credit. For other income, it is the other way round. Getting this order wrong is the most common reason people pay tax twice.",
            image: img("/images/pillar-integrity.jpg", "Who taxes first"),
          },
          {
            title: "Different tax years.",
            text: "India runs April to March. The US runs January to December, the UK April to April and Australia July to June. Income and tax credits have to be matched across both, year after year.",
            image: img("/images/pillar-capability.jpg", "Different tax years"),
          },
          {
            title: "Credit in India for tax paid abroad.",
            text: "Tax paid in your home country on income from there can usually be claimed in India, with the correct form filed on time.",
            image: img("/images/us-tax-airport.jpg", "Credit in India"),
          },
          {
            title: "Credit abroad for tax paid in India.",
            text: "Where your home country taxes the same income, it usually gives credit for Indian tax, if claimed correctly.",
            image: img("/images/us-assets-planning.jpg", "Credit abroad"),
          },
          {
            title: "Income that falls through the gap.",
            text: "Income that is tax free in one country has no tax to claim as credit in the other, so it can become a full cost unless it is planned.",
            image: img("/images/about-what-we-do-banner.jpg", "Income gap"),
          },
        ]),
        footnote:
          "Every treaty is different. This is where most families lose money without realising it, and where careful planning makes the biggest difference.",
      },
      { anchor: "share-tax" }
    ),

    section(
      "gci-report",
      "globalCitizensReport",
      "What You Report, and Where",
      {
        heading: "What You Report, and Where",
        indiaHeading: "In India, as a resident",
        indiaItems: items("report-in", [
          { text: "Your global income in your Indian tax return" },
          { text: "Your foreign assets: bank accounts, investments, pensions, retirement accounts and property abroad" },
          { text: "A claim for credit of tax paid abroad, with the right form" },
        ]),
        centerImage: img("/images/who-greencard.jpg", "A couple reviewing their tax papers together at home"),
        centerText:
          "We build your investments and records so that every report, in both countries, is simple, consistent and on time.",
        homeHeading: "In your home country",
        homeSubheading: "Depends on your citizenship and residence",
        usLabel: "US citizens",
        usText:
          "A full US tax return, FBAR for Indian accounts, FATCA reporting, PFIC forms for Indian mutual funds, large gifts or inheritances from India and stakes in Indian companies",
        otherLabel: "Other citizens",
        otherText:
          "Usually income from your home country, plus any return or form needed to show you are no longer resident there",
      },
      { anchor: "report" }
    ),

    section(
      "gci-invest",
      "globalCitizensInvest",
      "What You Can Invest In, and What You Should",
      {
        heading: "What You Can Invest In, and What You Should",
        femaTitle: "What FEMA allows",
        femaText:
          "OCI cardholders can invest in India much like NRIs and residents, with some limits, such as on agricultural land, farmhouses and plantations. Foreign citizens without an OCI card face more restrictions, especially on property. Some fund houses do not accept investors with certain citizenships, such as US citizens.",
        worksTitle: "What works for you",
        worksText:
          "The right investments are those that are efficient in both India and your home country. Depending on your citizenship, that may mean direct Indian shares, bonds, government securities and deposits, a planned approach to assets held abroad, and care with mutual funds, ULIPs and some insurance products.",
        checkTitle: "What we do",
        checkSubtitle: "We check every investment three ways before we recommend it:",
        questions: items("question", [
          { question: "Is it allowed under FEMA?" },
          { question: "What is the tax in India?" },
          { question: "What is the tax in your home country?" },
        ]),
        conclusionNote: "Only then do we ask whether it fits your goals and risk.",
      },
      { anchor: "invest" }
    ),

    section(
      "gci-who",
      "globalCitizensWhoWeHelp",
      "Who We Help (Global Citizens)",
      {
        heading: "Who We Help",
        sideImage: img("/images/nri-relocation-advisory.jpg", "A couple in a planning meeting with their adviser"),
        profiles: items("profile", [
          { icon: "Flag", text: "US citizens and Green Card holders living in India" },
          {
            icon: "Globe",
            text: "OCI cardholders of the US, UK, Canada, Australia, Singapore, New Zealand and other countries",
          },
          { icon: "Briefcase", text: "Foreign citizens without OCI who live and work in India" },
          { icon: "Users", text: "Mixed citizenship families, where one spouse or the children hold a foreign passport" },
          { icon: "Building2", text: "Foreign professionals posted to India by global companies" },
          {
            icon: "Landmark",
            text: "Families with investable wealth of USD 1 million or more who want one trusted adviser across countries",
          },
        ]),
        footnote:
          "Many of our clients in this group are US citizens, and our team includes a US CPA, so we know the India and US rules especially well. For other countries, we work closely with your tax adviser at home so both sides are planned together.",
      },
      { anchor: "who-we-help" }
    ),

    section(
      "gci-how",
      "globalCitizensHowWeHelp",
      "How We Help (6 Advisory Areas)",
      {
        heading: "How We Help",
        services: items("service", [
          {
            icon: "LineChart",
            title: "Investment advice built for two tax systems",
            text: "The heart of what we do. We build your portfolio around your goals, your risk comfort and the tax rules of both India and your home country. Every investment is chosen for what you keep after tax in both countries, not just what looks good on paper. You get a written Investment Policy Statement, regular reviews and one clear report.",
          },
          {
            icon: "BadgeCheck",
            title: "Getting your status right",
            text: "Your residential status under Indian income tax and FEMA, and what it means for your accounts, KYC and investments. If anything needs correcting, we help you do it the right way.",
          },
          {
            icon: "Scale",
            title: "Tax planning across both countries",
            text: "Using the tax treaty and foreign tax credits in both directions, matching different tax years and timing income and gains so you do not pay tax twice. We work alongside your adviser abroad and your CA in India so both returns tell the same story.",
          },
          {
            icon: "RefreshCw",
            title: "Cleaning up legacy investments",
            text: "Many families carry investments, insurance policies or accounts that are costly for their citizenship. We plan when and how to exit or restructure them at the lowest total tax.",
          },
          {
            icon: "Globe",
            title: "Your assets abroad, from India",
            text: "Pensions, retirement accounts, brokerage accounts, property and bank accounts in your home country. What to keep, how to report it in India and how it fits your overall plan.",
          },
          {
            icon: "ShieldCheck",
            title: "Compliance, family and succession",
            text: "Foreign asset reporting in India, reporting in your home country, records kept in one place. Gift and estate rules across countries, gifts between spouses of different citizenship, wills for assets in both countries and correct nominations.",
          },
        ]),
      },
      { anchor: "how-we-help" }
    ),

    section(
      "gci-plan",
      "globalCitizensPlan",
      "Your Global Citizen Plan (Tiles)",
      {
        heading: "Your Global Citizen Plan",
        subtitle: "When you work with us, you receive a written plan covering:",
        planItems: items("plan", [
          {
            icon: "BadgeCheck",
            title: "Your status",
            text: "Residential status under Indian income tax and FEMA, explained simply.",
            image: img("/images/who-oci-global.jpg", "Your status"),
          },
          {
            icon: "LineChart",
            title: "Your investment review",
            text: "Every investment in India and abroad, checked for FEMA, Indian tax and home country tax.",
            image: img("/images/night-skyline-numbers.jpg", "Your investment review"),
          },
          {
            icon: "PiggyBank",
            title: "Your new portfolio",
            text: "Asset allocation and Investment Policy Statement built for after tax returns in both countries.",
            image: img("/images/rnor-golden-window.jpg", "Your new portfolio"),
          },
          {
            icon: "RefreshCw",
            title: "Your clean up plan",
            text: "Which investments to exit, restructure or keep, and when.",
            image: img("/images/about-why-we-are.jpg", "Your clean up plan"),
          },
          {
            icon: "ArrowLeftRight",
            title: "Your tax map",
            text: "How each income is taxed in India and your home country, and how credits flow both ways.",
            image: img("/images/global-approach-bg.jpg", "Your tax map"),
          },
          {
            icon: "FileText",
            title: "Your reporting checklist",
            text: "Every report you need in India and abroad, and when.",
            image: img("/images/home/advisory-room.jpg", "Your reporting checklist"),
          },
          {
            icon: "HeartHandshake",
            title: "Your family plan",
            text: "Gifts, wills, nominations and estate rules across both countries.",
            image: img("/images/pillar-results.jpg", "Your family plan"),
          },
        ]),
        closingTileText:
          "We then help you put the plan in place and review it every year, or whenever your life or the rules change.",
      },
      { anchor: "plan" }
    ),

    section(
      "gci-why",
      "globalCitizensWhyChoose",
      "Why Choose Neuron Wealth (Citizens)",
      {
        heading: "Why Choose Neuron Wealth",
        tiles: items("tile", [
          {
            icon: "LineChart",
            title: "Investment advisers first.",
            text: "Every recommendation starts with one question: will this improve what you keep, for the risk you take?",
          },
          {
            icon: "Users",
            title: "Cross border expertise under one roof.",
            text: "Our team of Chartered Accountants, a US CPA and a CFA charterholder looks at India and your home country together, so you are no longer stuck between two advisers.",
          },
          {
            icon: "Plane",
            title: "We have lived in two worlds.",
            text: "Our founder lived and worked in the United States for 9 years before returning to India.",
          },
          {
            icon: "Wallet",
            title: "Fee only.",
            text: "We are paid only by you, never by a product. No commissions.",
          },
          {
            icon: "ShieldCheck",
            title: "Your money stays in your name.",
            text: "We advise and help you act. Your investments stay in your own accounts.",
          },
          {
            icon: "HeartHandshake",
            title: "Plain language.",
            text: "You will always know what we suggest and why.",
          },
        ]),
      },
      { anchor: "why-choose" }
    ),

    section(
      "gci-work",
      "globalCitizensHowWeWork",
      "How We Work (4 Outline Steps)",
      {
        heading: "How We Work",
        bgImage: img("/images/mission-dark-bg.jpg", "Mission dark background"),
        steps: items("step", [
          {
            title: "A first conversation.",
            text: "A 30 minute call to understand your situation. No obligation.",
          },
          {
            title: "Understanding your family.",
            text: "Citizenship, residency, income, investments in India and abroad, goals and comfort with risk.",
          },
          {
            title: "Your Global Citizen Plan.",
            text: "A clear written plan with the effect of every step in both countries.",
          },
          {
            title: "Putting it in place and staying with you.",
            text: "We help you act on the plan and review it every year.",
          },
        ]),
      },
      { anchor: "how-we-work" }
    ),

    section(
      "gci-stories",
      "globalCitizensStories",
      "Families We Helped (Client Stories)",
      {
        heading: "Families We Helped",
        disclaimerBadge: "Examples for illustration. Names and details are changed.",
        stories: items("story", [
          {
            title: "A US citizen in Pune.",
            text: "Sameer moved to Pune twelve years ago and still thought of himself as an NRI. He held Indian mutual funds, a ULIP and a PPF account, and had never reported his US accounts in India. We confirmed his status, helped him correct his past reporting, planned his exit from the mutual funds and the ULIP across both countries and rebuilt his portfolio with investments that work for a US citizen. His Indian and US returns now match and the tax credits flow correctly.",
          },
          {
            title: "A British family in Bengaluru.",
            text: "Helen, a UK citizen with an OCI card, moved to Bengaluru with her Indian husband. She still had a UK pension, a rented flat in London and UK savings. We confirmed her Indian status, set up proper reporting of her UK assets in India, planned how her UK rent and pension would be taxed in each country and built an Indian portfolio suited to her long term plans.",
          },
        ]),
        footnote: "Every family is different. Results depend on individual circumstances and markets.",
      },
      { anchor: "stories" }
    ),

    section(
      "gci-faqs",
      "globalCitizensFaqsClosing",
      "Citizens FAQs & Closing CTA",
      {
        faqHeading: "Frequently Asked Questions",
        faqs: items("faq", [
          {
            q: "I am a foreign citizen living in India. Am I an NRI?",
            a: "Usually not. If you have lived in India long enough, you are a resident under Indian income tax and under FEMA. Your citizenship does not change that. Your accounts, investments and tax returns should reflect your resident status.",
          },
          {
            q: "Do I have to report my foreign assets in India?",
            a: "If you are a resident and ordinarily resident in India, yes. Bank accounts, investments, pensions, retirement accounts and property abroad must be reported in your Indian tax return, even if they earn no income.",
          },
          {
            q: "Will my home country still tax me after I move to India?",
            a: "It depends on your citizenship. US citizens are taxed by the US on worldwide income wherever they live. Most other countries tax you mainly on income from that country once you are no longer resident there.",
          },
          {
            q: "How do I avoid paying tax twice?",
            a: "Through the tax treaty between India and your home country and foreign tax credits. It works only when the right country taxes first, the tax years are matched and the correct forms are filed in both countries.",
          },
          {
            q: "Should a foreign citizen invest in Indian mutual funds?",
            a: "It depends on your citizenship. For US citizens, Indian mutual funds are usually treated as PFIC and can be very costly. For some other countries they may be fine. We check before you invest.",
          },
          {
            q: "What happens to my pension or retirement account back home?",
            a: "You can usually keep it, but India and your home country may tax it differently, and it must be reported in India. We plan how and when to use it for the lowest total tax.",
          },
          {
            q: "I hold an OCI card. What can I invest in?",
            a: "OCI cardholders can invest in Indian shares, bonds, mutual funds and residential or commercial property much like NRIs, but cannot buy agricultural land, farmhouses or plantations. Foreign citizens without OCI face more restrictions.",
          },
          {
            q: "Can you work with my tax adviser abroad?",
            a: "Yes. We regularly work with CPAs and tax advisers in other countries so your investments and tax returns in both countries match.",
          },
        ]),
        closingHeading: "One Family. Two Countries. One Clear Plan.",
        closingText:
          "Tell us about your situation in a 30 minute call. No obligation and nothing to sell. Just clear answers from investment advisers who understand life across borders.",
        primaryButton: lnk("Book a 30 minute call", "/contact"),
        secondaryButton: lnk(
          "Check your residential status",
          "#status"
        ),
        disclaimer:
          "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
      },
      { anchor: "faqs" }
    ),
  ],
};

const SEBI_DISCLAIMER =
  "Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.";
const STORY_DISCLAIMER = "Every family is different. Results depend on individual circumstances and markets.";
const STORY_NOTE = "Examples for illustration. Names and details are changed.";
const bookCall = () => lnk("Book a 30 minute call", "/contact");
const mailtoSubject = (subject) => `mailto:info@neuronwealth.com?subject=${encodeURIComponent(subject)}`;

const globalInvestor = {
  slug: "global-investor",
  title: "Global Investors",
  description:
    "Advisory for Indian families and family offices investing globally through LRS, GIFT City and Interactive Brokers.",
  category: "services",
  icon: "Globe",
  status: "published",
  seo: {
    title: "Invest Abroad from India | LRS, GIFT City and Global Investing Adviser | Neuron Wealth",
    description:
      "Investing abroad from India? Fee only SEBI RIA guiding HNI families on LRS, TCS, GIFT IFSC funds, Interactive Brokers, foreign tax credit, US estate tax and FEMA, for better returns after tax.",
  },
  sections: [
    section(
      "ginv-hero",
      "investorHero",
      "Global Investors Hero Banner",
      {
        eyebrow: "For Indian families and family offices investing beyond India",
        title: "Your Wealth Has Outgrown One Country.",
        titleHighlight: "Your Plan Should Too.",
        paragraphs: [
          "You have built your wealth in India. Now your goals are global: children studying or settled abroad, a home in another country, a future move, or simply not keeping everything in one economy and one currency.",
          "Investing abroad from India is very possible. But the rules on how much you can send, how it is taxed, what you must report and what happens to it after you are gone are not simple. We are a SEBI Registered Investment Adviser. We help you build a global portfolio for better returns after tax, fully within FEMA, Indian tax law and the rules of the countries you invest in.",
        ],
        primaryButton: bookCall(),
        secondaryButton: lnk("See how we invest globally", "#ways-to-invest"),
        backgroundImage: img("/images/night-skyline-numbers.jpg", ""),
        trustItems: [
          "SEBI Registered Investment Adviser INA000016481",
          "Fee only, no commissions",
          "CA, US CPA and CFA team",
          "Registered adviser on Interactive Brokers",
          "Active in the GIFT City ecosystem",
        ],
      },
      { anchor: "global-investors-hero" }
    ),
    section("ginv-reasons", "investorReasons", "Why Families Invest Abroad", {
      heading: "Why Indian Families Invest Abroad",
      text: "Every family has its own reason. Most of them come from love and long term thinking.",
      image: img("/images/us-tax-airport.jpg", "An Indian couple planning at an airport lounge"),
      reasons: items("ginv-reason", [
        {
          icon: "GraduationCap",
          title: "For your children's education",
          text: "Fees abroad are paid in dollars, pounds or euros. Saving in the same currency, years in advance, takes away the worry of a falling rupee.",
        },
        {
          icon: "HeartHandshake",
          title: "For children who live abroad",
          text: "Your son or daughter has settled in another country. You want to support them, help with a home or pass on wealth in a way that works in both countries.",
        },
        {
          icon: "House",
          title: "For a home outside India",
          text: "A second home in London, Dubai, Singapore or the US, for family visits, children or later life.",
        },
        {
          icon: "Plane",
          title: "For a future move",
          text: "You may move abroad in a few years. Building assets there early makes the move smoother.",
        },
        {
          icon: "PieChart",
          title: "For true diversification",
          text: "India is a great story, but it is one country and one currency. A part of your wealth in the world's leading companies and markets brings balance.",
        },
      ]),
    }),
    section("ginv-familiar", "investorFamiliar", "Does This Sound Familiar", {
      heading: "Does This Sound Familiar?",
      text: "If any of these sounds like you, you are not alone. These are the questions we answer every week for families like yours.",
      quotes: [
        "I want to invest in US stocks, but I am not sure how much I can send or how it is taxed.",
        "I paid a large TCS on my remittance. Will I get it back?",
        "I bought US shares directly. Now I hear about US estate tax. Is my family at risk?",
        "My foreign dividends are taxed in the US and again in India.",
        "I want to give money to my daughter in Canada. Is that allowed, and is it taxed?",
        "Someone suggested GIFT City funds. Are they right for me?",
        "Our family invests through a company and a trust. What are the rules for us?",
      ],
      ctaText: "Have a different question? We will answer it in a 30 minute call.",
      ctaLink: bookCall(),
    }),
    section("ginv-rules", "investorRules", "Investing Abroad Rules", {
      heading: "Investing Abroad Is Possible. It Is Not Simple.",
      text: "Before the first rupee leaves India, these rules come into play:",
      rules: items("ginv-rule", [
        {
          icon: "Send",
          title: "How much you can send",
          text: "Under the Liberalised Remittance Scheme (LRS), each resident individual can send up to a yearly limit abroad (currently USD 250,000). Each family member has their own limit, so planning across the family matters.",
          image: img("/images/home/nri-horizon.jpg", ""),
        },
        {
          icon: "Receipt",
          title: "TCS on what you send",
          text: "Tax is collected at source on many remittances above a threshold. It is not an extra tax, as it can be adjusted against your income tax or refunded, but it ties up your money until then. Planning who sends, when and for what purpose makes a real difference.",
          image: img("/images/who-wealthy-families.jpg", ""),
        },
        {
          icon: "ListChecks",
          title: "What you can invest in",
          text: "FEMA allows most listed investments abroad, but some investments, like stakes in private companies, companies with links back to India, or certain structures, have extra rules. Money sent abroad and not used must be invested or brought back within a set time.",
          image: img("/images/home/investment-still.jpg", ""),
        },
        {
          icon: "Percent",
          title: "How foreign income is taxed in India",
          text: "Foreign dividends, interest and capital gains are taxed in India, often differently from Indian investments. Holding periods, tax rates and rules are not the same.",
          image: img("/images/us-assets-planning.jpg", ""),
        },
        {
          icon: "Scale",
          title: "Foreign tax credit",
          text: "Tax deducted abroad, like US tax on dividends, can usually be claimed as credit in India under the tax treaty (DTAA), but only if the right form is filed on time.",
          image: img("/images/pillar-intention.jpg", ""),
        },
        {
          icon: "FileText",
          title: "Reporting foreign assets",
          text: "Every foreign account, share, fund and property must be reported in your Indian tax return, on a calendar year basis. Penalties for missing this can be heavy, even if no income was earned.",
          image: img("/images/about-why-we-are.jpg", ""),
        },
        {
          icon: "Gift",
          title: "Gifts to family abroad",
          text: "FEMA's list of relatives you can gift to is narrower than the list under income tax. A gift that is tax free in India may still not be allowed under FEMA, and it may need reporting in your child's country.",
          image: img("/images/who-global-families.jpg", ""),
        },
        {
          icon: "TriangleAlert",
          title: "US estate tax",
          text: "If you hold US shares or US based funds directly, your family may face US estate tax on them after your death, above a small limit, even though you have never lived in the US. This is one of the most overlooked risks for Indian investors.",
          image: img("/images/vision-dark-bg.jpg", ""),
        },
      ]),
    }),
    section("ginv-keep", "investorKeep", "What You Keep", {
      heading: "What Matters Is What You Keep",
      subheading: "A good return in dollars is not the same as a good return in your pocket.",
      intro: "Two families can invest the same amount abroad and keep very different amounts. The difference comes from choices like:",
      choices: [
        "Who in the family sends the money, and when, to use each person's limit and manage TCS",
        "Which route you use: direct shares, global funds, GIFT City funds or Indian funds that invest abroad",
        "Where the fund is based, which affects tax on dividends and US estate tax risk",
        "When you sell, based on holding periods and tax in India",
        "How foreign tax credit is claimed, so you do not pay tax twice",
      ],
      outro: "Get these right and your global portfolio works harder for you. Get them wrong and returns quietly leak away.",
      focusLabel: "Our focus:",
      focusText:
        "better returns after tax, for the risk you are comfortable with, fully compliant with FEMA, Indian income tax and the rules of every country you invest in.",
    }),
    section(
      "ginv-routes",
      "investorRoutes",
      "Ways to Invest Abroad",
      {
        heading: "Three Ways to Invest Abroad",
        text: "There is no single best route. The right mix depends on your goals, the amount, your family structure and how hands on you want to be.",
        suitsLabel: "Suits:",
        routes: items("ginv-route", [
          {
            icon: "Globe",
            title: "Direct global investing",
            text: "Through a global brokerage account, such as Interactive Brokers. Access to shares, ETFs and bonds across the world's major markets, held in your own name.",
            suits: "families who want wide choice, low costs and direct ownership.",
            image: img("/images/who-oci-global.jpg", ""),
          },
          {
            icon: "Building2",
            title: "GIFT City (GIFT IFSC) funds, PMS and AIFs",
            text: "Dollar based investments through India's international financial centre, regulated in India.",
            suits: "families who want global exposure through a regulated Indian platform, and those who want to keep things simpler.",
            image: img("/images/home/hero-window.jpg", ""),
          },
          {
            icon: "Layers",
            title: "Indian funds that invest abroad",
            text: "Indian mutual funds that invest in global markets, bought in rupees.",
            suits: "smaller amounts and simple needs, when industry limits allow new investment.",
            image: img("/images/about-who-we-are.jpg", ""),
          },
        ]),
        note: "Many of our clients use a combination. We help you choose the right mix for each goal.",
      },
      { anchor: "ways-to-invest" }
    ),
    section("ginv-ibkr", "investorIbkr", "Interactive Brokers", {
      heading: "Investing Through Interactive Brokers",
      text: "Neuron Wealth is registered as an adviser on Interactive Brokers, one of the world's leading global brokerage platforms.",
      statement:
        "We do not just help you open an account. We help you build and look after a global portfolio that is efficient in India and abroad.",
      image: img("/images/pillar-capability.jpg", ""),
      pointsHeading: "What this means for you",
      points: [
        "Your account is opened in your own name, and your money stays with you",
        "Access to shares, ETFs and bonds across many global markets, from one account",
        "We advise on what to buy, hold and sell, and monitor your portfolio regularly",
        "Your investments are chosen with Indian tax, foreign tax credit and US estate tax in mind",
        "Clear records that make your foreign asset reporting in India simpler",
      ],
    }),
    section("ginv-gift", "investorGift", "GIFT City", {
      heading: "Investing Through GIFT City",
      text: "GIFT IFSC in Gandhinagar is India's international financial centre. It allows resident Indians to invest in dollars, in global funds, PMS and AIFs, through a platform regulated in India.",
      image: img("/images/career-team-collaborate.jpg", "Advisers and fund professionals in a meeting"),
      badge: "Ahmedabad, near GIFT City",
      panelTitle: "Our place in the GIFT City ecosystem",
      panelText:
        "We are based in Ahmedabad, a short drive from GIFT City, and have followed it closely since its early years. Our team has helped organise CFA Society India conferences at GIFT City and works with fund managers, banks and platforms in the IFSC. This gives our clients informed, independent advice on a fast growing but still new market.",
      pointsHeading: "Why families look at GIFT City",
      points: [
        "Invest in dollars while staying within an Indian regulated system",
        "Access to global strategies through funds, PMS and AIFs set up in GIFT IFSC",
        "Some structures can simplify reporting and reduce certain cross border risks, depending on how they are set up",
        "A growing choice of global and Indian fund managers",
      ],
      checkTitle: "What to check before investing",
      checkText:
        "Every GIFT City product is different. Costs, tax treatment, liquidity, minimum investment and what the fund actually holds all vary. We review each option against your goals and your tax position before you invest.",
    }),
    section("ginv-goals", "investorGoals", "Planning for Your Goals", {
      heading: "Planning for Your Goals",
      goals: items("ginv-goal", [
        {
          icon: "GraduationCap",
          title: "Education abroad",
          text: "We plan the fund, the currency and the timing for each child, and how fee payments and TCS will work when the time comes.",
          image: img("/images/who-nri-h1b.jpg", ""),
        },
        {
          icon: "HeartHandshake",
          title: "Supporting children who live abroad",
          text: "Gifts, loans or investments in their name. We plan what FEMA allows, how it is taxed in India, how your child must report it in their country and how it fits your overall estate plan.",
          image: img("/images/home/family-shore.jpg", ""),
        },
        {
          icon: "House",
          title: "Buying property abroad",
          text: "Buying a home abroad is allowed within the LRS limit, with rules on how you pay, rent, report and later sell. We help you plan the funding across family members and years, and the tax in both countries.",
          image: img("/images/home/hero-residence.jpg", ""),
        },
        {
          icon: "Plane",
          title: "Planning a future move",
          text: "If you may move abroad in a few years, we help you build assets there early, plan your residential status and the tax effect of leaving India, and make sure your Indian investments still work after you move.",
          image: img("/images/nri-relocation-advisory.jpg", ""),
        },
        {
          icon: "PieChart",
          title: "Diversification",
          text: "A global portfolio built around your total wealth, not a few popular stocks: the right mix of markets, currencies, asset classes and fund structures.",
          image: img("/images/global-approach-bg.jpg", ""),
        },
      ]),
    }),
    section("ginv-who", "investorWhoWeHelp", "Who We Help", {
      heading: "Who We Help",
      items: items("ginv-who", [
        { icon: "Landmark", text: "HNI and UHNI families living in India who want to invest outside India" },
        {
          icon: "Building2",
          text: "Family offices and families investing through companies, LLPs or trusts, where different FEMA and tax rules apply",
        },
        { icon: "GraduationCap", text: "Parents with children studying or settled abroad" },
        { icon: "Plane", text: "Families planning to move abroad in the coming years" },
        { icon: "Briefcase", text: "Business owners and senior professionals with surplus wealth seeking global diversification" },
        { icon: "Wallet", text: "Families with investable wealth of USD 1 million or more who want one trusted adviser across countries" },
      ]),
      image: img("/images/rnor-golden-window.jpg", "A client meeting with an adviser overlooking the Mumbai sea front"),
    }),
    section(
      "ginv-help",
      "investorHowWeHelp",
      "How We Help",
      {
        heading: "How We Help",
        backgroundImage: img("/images/reasons-dark-bg.jpg", ""),
        items: items("ginv-help", [
          {
            icon: "LineChart",
            title: "Global investment advice built for after tax returns",
            text: "The heart of what we do. We design your global portfolio around your goals, risk comfort and tax position, using direct investments, GIFT City options and global funds. You get a written Investment Policy Statement, regular reviews and one clear report.",
          },
          {
            icon: "Send",
            title: "Remittance and LRS planning",
            text: "Who sends, how much, when and for what purpose, across family members and years, with TCS planned and recovered.",
          },
          {
            icon: "Route",
            title: "Choosing the right route and structure",
            text: "Direct, through GIFT IFSC or through Indian funds. Individual, joint or through a family entity. Fund domicile and estate tax risk. We help you hold each investment in the most efficient way allowed under FEMA.",
          },
          {
            icon: "Scale",
            title: "Tax planning in India and abroad",
            text: "Tax on foreign income in India, withholding tax abroad, foreign tax credit under DTAA and the timing of sales. We work with your CA and tax advisers abroad so everything matches.",
          },
          {
            icon: "FileText",
            title: "Foreign asset reporting and compliance",
            text: "Clean records and reporting of every foreign asset in your Indian tax return, FEMA compliance and any reporting needed abroad.",
          },
          {
            icon: "Gift",
            title: "Family, gifts and succession",
            text: "Gifts to children abroad, nominations, wills for global assets and planning to reduce US estate tax and other cross border succession risks, working with trusted legal experts where needed.",
          },
        ]),
      },
      { anchor: "how-we-help" }
    ),
    section("ginv-plan", "investorPlan", "Your Global Investor Plan", {
      heading: "Your Global Investor Plan",
      intro: "When you work with us, you receive a written plan covering:",
      cardTitle: "Your Global Investor Plan",
      items: items("ginv-plan", [
        { title: "Your goals in each currency", text: "education, children abroad, property, migration and diversification" },
        { title: "Your remittance plan", text: "who sends, how much, when, and how TCS will be recovered" },
        { title: "Your global portfolio", text: "asset allocation across markets, currencies and routes, with your Investment Policy Statement" },
        { title: "Your route and structure map", text: "Interactive Brokers, GIFT IFSC or Indian funds, and in whose name" },
        { title: "Your tax map", text: "how each investment is taxed abroad and in India, and how credits flow" },
        { title: "Your risk check", text: "US estate tax and other cross border risks, and how to reduce them" },
        { title: "Your compliance calendar", text: "FEMA, foreign asset reporting and any filings abroad" },
      ]),
      closing:
        "We then help you put the plan in place, monitor your portfolio and review it every year, or whenever your goals or the rules change.",
    }),
    section("ginv-why", "investorWhyChoose", "Why Choose Neuron Wealth", {
      heading: "Why Choose Neuron Wealth",
      items: items("ginv-why", [
        {
          icon: "LineChart",
          title: "Investment advisers first.",
          text: "Every recommendation starts with one question: will this improve what you keep, for the risk you take?",
        },
        {
          icon: "Scale",
          title: "Global and Indian rules under one roof.",
          text: "Our team of Chartered Accountants, a US CPA and a CFA charterholder plans FEMA, Indian tax and foreign tax together, before you invest.",
        },
        {
          icon: "Globe",
          title: "Hands on with global platforms.",
          text: "Registered adviser on Interactive Brokers and active in the GIFT City ecosystem.",
        },
        {
          icon: "Plane",
          title: "We have lived abroad.",
          text: "Our founder lived and worked in the United States for 9 years and understands what your children's lives abroad look like.",
        },
        {
          icon: "Wallet",
          title: "Fee only.",
          text: "We are paid only by you, never by a fund house, platform or product. No commissions.",
        },
        {
          icon: "ShieldCheck",
          title: "Your money stays in your name.",
          text: "Your accounts and investments stay in your name. We advise and help you act.",
        },
        { icon: "HeartHandshake", title: "Plain language.", text: "You will always know what we suggest and why." },
      ]),
    }),
    section(
      "ginv-work",
      "investorHowWeWork",
      "How We Work",
      {
        heading: "How We Work",
        steps: items("ginv-step", [
          { title: "A first conversation.", text: "A 30 minute call to understand your goals. No obligation." },
          {
            title: "Understanding your family.",
            text: "Your goals, family members, existing investments in India and abroad, structures and comfort with risk.",
          },
          {
            title: "Your Global Investor Plan.",
            text: "A clear written plan with the route, the tax effect and the compliance for every step.",
          },
          {
            title: "Putting it in place and staying with you.",
            text: "We help you set up accounts, invest, monitor and review your portfolio every year.",
          },
        ]),
      },
      { anchor: "how-we-work" }
    ),
    section("ginv-stories", "investorStories", "Families We Helped", {
      heading: "Families We Helped",
      note: STORY_NOTE,
      backgroundImage: img("/images/mission-bg.jpg", ""),
      stories: items("ginv-story", [
        {
          title: "A family in Mumbai with children abroad.",
          text: "The Mehtas' son lives in Toronto and their daughter is studying in London. They had sent money abroad in an unplanned way, held US shares directly and had not reported all foreign assets in India. We set up a yearly remittance plan across four family members, moved their global portfolio to a structure with lower US estate tax risk, corrected their reporting and planned gifts to their son that work under FEMA and in Canada.",
        },
        {
          title: "A business family in Ahmedabad.",
          text: "The Shahs wanted a part of their wealth in global markets but preferred to stay within an Indian regulated platform. We built a mix of GIFT IFSC funds for their core global allocation and a direct portfolio through Interactive Brokers for specific goals, with clear tax and reporting for both.",
        },
      ]),
      disclaimer: STORY_DISCLAIMER,
    }),
    section(
      "ginv-faqs",
      "investorFaqsClosing",
      "FAQs, Closing CTA & Disclaimer",
      {
        faqHeading: "Frequently Asked Questions",
        contactLink: lnk("Contact Us", "/contact"),
        faqs: items("ginv-faq", [
          {
            q: "How much money can I invest abroad from India?",
            a: "Each resident individual can send money abroad up to the yearly limit under the Liberalised Remittance Scheme (currently USD 250,000). Each family member has their own limit. Families investing through companies or trusts follow different rules.",
          },
          {
            q: "Is TCS on foreign remittance an extra tax?",
            a: "No. TCS collected on your remittance can be adjusted against your income tax or claimed as a refund. But it ties up your money until then, so it is worth planning.",
          },
          {
            q: "How are my foreign investments taxed in India?",
            a: "As a resident, your foreign dividends, interest and gains are taxed in India. Tax deducted abroad can usually be claimed as foreign tax credit under the tax treaty, with the right form filed on time.",
          },
          {
            q: "Do I need to report my foreign investments in India?",
            a: "Yes. Every foreign account, investment and property must be reported in your Indian tax return, even if it earned no income in the year.",
          },
          {
            q: "What is US estate tax and does it affect me?",
            a: "If you hold US shares or US based funds directly, they may be subject to US estate tax after your death, above a small limit, even if you have never lived in the US. The right fund choice and structure can reduce this risk.",
          },
          {
            q: "Should I invest through GIFT City?",
            a: "GIFT City offers dollar investments through an Indian regulated platform, and can suit many families. But products vary widely in cost, tax, liquidity and holdings. We review each option against your goals before you invest.",
          },
          {
            q: "Can you manage my Interactive Brokers account?",
            a: "We are registered as an adviser on Interactive Brokers. Your account stays in your name. We advise you on your global portfolio, help you implement it and monitor it regularly.",
          },
          {
            q: "Can I gift money to my child living abroad?",
            a: "Yes, within the LRS limit and to relatives as defined under FEMA. Your child may need to report it in their country. We plan gifts so they work under FEMA, Indian tax and the rules where your child lives.",
          },
          {
            q: "Can I buy property abroad?",
            a: "Yes, within the LRS limit. How you pay for it, rent it, report it and later sell it all have rules in India and abroad. We help you plan it across family members and years.",
          },
        ]),
        closingTitle: "Think Global. Invest Wisely. Stay Compliant.",
        closingText:
          "Tell us about your global goals in a 30 minute call. No obligation and nothing to sell. Just clear answers from investment advisers who understand India and the world.",
        primaryButton: bookCall(),
        secondaryButton: lnk("See how we invest globally", "#ways-to-invest"),
        disclaimerText: [
          SEBI_DISCLAIMER,
          "Neuron Wealth Advisors LLP is an independent adviser and is not affiliated with Interactive Brokers or any fund manager in GIFT IFSC. We receive no commission or fee from any platform or product.",
        ],
      },
      { anchor: "faqs" }
    ),
  ],
};

const foundersAndEntrepreneurs = {
  slug: "founders-and-entrepreneurs",
  title: "Founders & Entrepreneurs",
  description:
    "Family office advisory for founders, business owners and entrepreneurs. Separate business and family wealth, plan exits and succession.",
  category: "services",
  icon: "Briefcase",
  status: "published",
  seo: {
    title: "Family Office for Founders and Business Owners | Wealth After Exit | Neuron Wealth",
    description:
      "Founder or business owner? Separate business and family wealth, plan for funding rounds and exits, diversify and plan succession. Fee only SEBI RIA acting as your Family CFO.",
  },
  sections: [
    section(
      "fe-hero",
      "foundersHero",
      "Founders Hero Banner",
      {
        eyebrow: "For founders, business owners and entrepreneurs",
        title: "You Built a Business.",
        titleHighlight: "Now Build Wealth Beyond It.",
        paragraphs: [
          "Your business is your life's work. It carries your name, your sweat and years of risk. But for most founders, it is also where almost all the family's wealth sits, tied to one company, one market and one set of risks.",
          "We work as your Family CFO. While you build the business, we build and protect your family's wealth outside it: separating business and personal money, planning for funding rounds and exits, investing for better returns after tax and preparing the next generation. So your family's future never depends on one company alone, and what you have built becomes a legacy that lasts for generations.",
        ],
        primaryButton: bookCall(),
        secondaryButton: lnk("See how we work with founders", "#founder-stages"),
        backgroundImage: img("/images/vision-dark-bg.jpg", ""),
        trustItems: [
          "SEBI Registered Investment Adviser INA000016481",
          "Fee only, no commissions",
          "CA, US CPA and CFA team",
          "Multi family office services",
        ],
      },
      { anchor: "founders-hero" }
    ),
    section("fe-familiar", "foundersFamiliar", "Does This Sound Familiar", {
      heading: "Does This Sound Familiar?",
      quotes: [
        "Almost everything we own is in the business.",
        "I cannot always tell where company money ends and family money begins.",
        "I have signed personal guarantees for the business. If something goes wrong, my home is at risk.",
        "We may raise money or sell a stake in the next two years. I have no plan for what happens after.",
        "Everyone brings me deals: startups, land, private funds. I do not have time to check them properly.",
        "I am not sure my children want to run the business, and we have never really talked about it.",
      ],
      lead: "If any of this sounds like you, you are not alone.",
      text: "Founders are brilliant at building businesses. Very few have had the time to build a plan for their own wealth.",
    }),
    section("fe-exposed", "foundersExposed", "Rich on Paper, Exposed in Real Life", {
      heading: "Rich on Paper.",
      headingHighlight: "Exposed in Real Life.",
      intro: "Most founders live with a quiet contradiction. On paper, they are wealthy. In real life, most of that wealth is:",
      paperLabel: "On paper",
      paperValue: "Wealthy.",
      realLabel: "In real life",
      image: img("/images/about-what-we-do-banner.jpg", ""),
      items: items("fe-exposed", [
        { icon: "Lock", text: "Locked in one company that cannot easily be sold or valued" },
        { icon: "Building2", text: "Exposed to the same risks as the business: one industry, one market, one economy" },
        { icon: "Link2", text: "Mixed with business money through loans, guarantees and shared accounts" },
        { icon: "Hourglass", text: "Hard to pass on without a clear plan for succession" },
      ]),
      closingLead: "Your business needs you to take risks.",
      closingHighlight: "Your family's wealth does not.",
      closingText: "The two need different plans, and different care.",
    }),
    section("fe-balance", "foundersBalanceSheets", "Two Balance Sheets", {
      heading: "Two Balance Sheets. One Trusted Team.",
      intro: "Every founder has two balance sheets: the business and the family.",
      businessText: "Your business has a CFO, auditors and bankers looking after it.",
      familyText: "Your family's balance sheet usually has nobody.",
      summaryLead: "We become the CFO for your family's balance sheet.",
      summaryText:
        "We help you build a wall between the two, so a setback in the business does not become a crisis at home, and the wealth the business creates is moved out, invested and protected in the right way.",
    }),
    section("fe-who", "foundersWhoWeHelp", "Who We Help", {
      heading: "Who We Help",
      personas: items("fe-persona", [
        {
          icon: "Lightbulb",
          title: "First generation founders",
          text: "You started with an idea and built something real. Now you want security for your family beyond the business.",
          image: img("/images/pillar-intention.jpg", ""),
        },
        {
          icon: "Users",
          title: "Family business owners",
          text: "You run a business your parents started, or one you hope your children will carry forward. We help with wealth outside the business, family governance and succession.",
          image: img("/images/who-global-families.jpg", ""),
        },
        {
          icon: "Rocket",
          title: "Startup founders",
          text: "Funding rounds, secondaries and ESOPs. Your wealth can change sharply in a single round. We help you plan for each step.",
          image: img("/images/who-nri-h1b.jpg", ""),
        },
        {
          icon: "Flag",
          title: "Founders after an exit",
          text: "You have sold your company, or part of it. For the first time, your wealth is in cash. The next decisions matter as much as the ones that built it.",
          image: img("/images/rnor-golden-window.jpg", ""),
        },
        {
          icon: "Globe",
          title: "Founders with global businesses",
          text: "A US holding company, overseas subsidiaries or investors abroad. We plan FEMA, Indian tax and foreign rules together.",
          image: img("/images/who-oci-global.jpg", ""),
        },
      ]),
      note: "Most of our founder clients have family wealth of USD 1 million or more outside the business, or will have after their next liquidity event.",
      link: lnk(
        "A senior professional or CXO with ESOPs rather than a founder? Our page for Professionals and CXOs is made for you.",
        "/services/professionals-and-cxos"
      ),
    }),
    section(
      "fe-stages",
      "foundersStages",
      "With You at Every Stage",
      {
        heading: "With You at Every Stage",
        stageLabel: "Stage",
        stages: items("fe-stage", [
          {
            icon: "Hammer",
            title: "While you are building",
            text: "A personal safety net outside the business. The right mix of salary, dividend and other ways to take money out of the company. Protection against personal guarantees and key person risk.",
          },
          {
            icon: "Handshake",
            title: "Before a funding round, secondary or sale",
            text: "Planning how much to sell, in what structure and what the tax will be, before the deal is signed, not after.",
          },
          {
            icon: "Hourglass",
            title: "The day after the money arrives",
            text: "No rush. A calm plan for where the money goes: what to keep safe, what to invest, what to give, and what to keep for the next idea.",
          },
          {
            icon: "Compass",
            title: "After the exit",
            text: "Managing family wealth like a family office. Staying invested, avoiding costly mistakes, angel investing within sensible limits and finding purpose in what comes next.",
          },
          {
            icon: "ScrollText",
            title: "Passing it on",
            text: "A family charter, wills, trusts and a clear plan for the next generation, prepared with trusted legal experts.",
          },
        ]),
      },
      { anchor: "founder-stages" }
    ),
    section("fe-legacy", "foundersLegacy", "Build a Legacy", {
      heading: "Build a Legacy, Not Just a Business",
      subheading: "One day, the question will change from \u201cHow big can this grow?\u201d to \u201cWhat will we leave behind?\u201d",
      text: "A legacy is more than money. It is the values you built the business on, a family that stays together, children who are ready for wealth and the good your success can do for others. Most family wealth does not survive three generations. Not because the money runs out, but because nobody planned how to pass it on.",
      image: img("/images/pillar-results.jpg", "Three generations of a family together in a garden"),
      centerText: "We help you build a legacy that lasts:",
      items: items("fe-legacy", [
        {
          icon: "Landmark",
          title: "Wealth that outlives the business,",
          text: "invested and protected for your children and grandchildren",
        },
        {
          icon: "Users",
          title: "A family that stays united,",
          text: "with a family charter that sets out values, roles, decisions and how disagreements are handled",
        },
        {
          icon: "GraduationCap",
          title: "A next generation that is ready,",
          text: "through money conversations, financial education and gradual responsibility, whether or not they join the business",
        },
        {
          icon: "ScrollText",
          title: "A clear succession plan",
          text: "for both the business and the family's wealth, so nothing is left to chance",
        },
        {
          icon: "HeartHandshake",
          title: "Giving back,",
          text: "through a planned approach to philanthropy, a family foundation or support for causes close to your heart",
        },
        {
          icon: "BookOpen",
          title: "Your story, preserved,",
          text: "so the next generation knows not just what you built, but why",
        },
      ]),
      note: "We work alongside trusted legal experts on wills, trusts and family structures, and stay with your family across generations.",
    }),
    section("fe-keep", "foundersKeep", "What You Keep", {
      heading: "What Matters Is What You Keep",
      lead: "Building value in a company is one thing.",
      leadHighlight: "Turning it into family wealth that lasts is another.",
      text: "How you take money out of the company, how you sell your stake, where the proceeds are held and how they are invested can make a large difference to what your family actually keeps.",
      image: img("/images/home/hero-residence.jpg", ""),
      approachHeading: "Our approach rests on three things:",
      items: items("fe-approach", [
        {
          icon: "LineChart",
          title: "Better returns after tax.",
          text: "Every decision is judged by what your family keeps after tax, in India and abroad.",
        },
        {
          icon: "Scale",
          title: "The right level of risk.",
          text: "Your business already carries enough risk. Your family's wealth should be built for safety, balance and long term growth.",
        },
        {
          icon: "ShieldCheck",
          title: "Fully compliant.",
          text: "Every step follows income tax law, FEMA, SEBI and company law. No shortcuts, no surprises later.",
        },
      ]),
    }),
    section(
      "fe-help",
      "foundersHowWeHelp",
      "How We Help",
      {
        heading: "How We Help",
        items: items("fe-help", [
          {
            icon: "LineChart",
            title: "Investing your family's wealth",
            text: "The heart of what we do. A clear asset allocation for wealth outside the business, across Indian and global markets, with a written Investment Policy Statement, regular reviews and one consolidated report.",
            image: img("/images/home/investment-still.jpg", ""),
          },
          {
            icon: "Split",
            title: "Separating business and family money",
            text: "Clear lines between company and personal accounts, loans and guarantees. Advice on holding structures, such as a family investment company, LLP or trust, with trusted legal experts where needed.",
            image: img("/images/home/family-shore.jpg", ""),
          },
          {
            icon: "Banknote",
            title: "Taking money out of the business",
            text: "Salary, dividend, buyback, rent or loans: each is taxed differently. We help you take money out of the company in a way that is efficient and compliant.",
            image: img("/images/home/advisory-room.jpg", ""),
          },
          {
            icon: "Handshake",
            title: "Planning for funding rounds and exits",
            text: "Before you sign, we look at the tax, the structure and the plan for the proceeds. After you sign, we help you invest them with care.",
            image: img("/images/career-team-collaborate.jpg", ""),
          },
          {
            icon: "PieChart",
            title: "Diversifying beyond your company",
            text: "Moving a part of your wealth out of one company, one industry and one country, step by step, within the rules.",
            image: img("/images/home/nri-horizon.jpg", ""),
          },
          {
            icon: "Globe",
            title: "Global investments and structures",
            text: "Investing abroad under LRS, overseas holding companies, foreign investors and children living abroad, planned under FEMA and the tax rules of each country.",
            image: img("/images/us-tax-airport.jpg", ""),
          },
          {
            icon: "ShieldCheck",
            title: "Protection and succession",
            text: "Insurance and key person cover, protection from personal guarantees, wills, trusts, a family charter and a clear succession plan for the business and the wealth.",
            image: img("/images/insights/books.jpg", ""),
          },
          {
            icon: "FolderOpen",
            title: "Documents, compliance and reporting",
            text: "Every account, investment, structure and document organised in one place, with every filing and report tracked.",
            image: img("/images/about-room.jpg", ""),
          },
        ]),
      },
      { anchor: "how-we-help" }
    ),
    section("fe-sounding", "foundersSoundingBoard", "Your Sounding Board", {
      heading: "Your Sounding Board",
      text: "Founders make hard decisions every day, often alone. It helps to have someone outside the business to think them through with.",
      callout: "We are the people you call before you decide:",
      image: img("/images/mission-bg.jpg", ""),
      decisions: [
        "Raising funds or growing on your own money: what it means for your family's wealth",
        "Selling a part of your stake, or the whole company",
        "Starting a new venture after an exit",
        "An angel investment, a private fund or a property deal someone has brought you",
        "Buying out a partner",
        "Bringing your children into the business, or not",
        "Putting money back into the business, or taking money out",
      ],
      modes: items("fe-mode", [
        { icon: "Lightbulb", text: "Sometimes we coach," },
        { icon: "Target", text: "sometimes we challenge," },
        { icon: "MessageCircleQuestion", text: "and sometimes we simply ask the questions nobody inside the business will ask." },
      ]),
      closing: "Always with your family's long term interest first.",
    }),
    section("fe-service", "foundersDeliverables", "Your Family CFO Service", {
      heading: "Your Family CFO Service",
      receiveHeading: "What you receive",
      items: items("fe-receive", [
        {
          title: "Your two balance sheets:",
          text: "business and family, side by side, in one clear picture",
          image: img("/images/us-assets-planning.jpg", ""),
        },
        {
          title: "Your separation plan:",
          text: "how to protect family wealth from business risk",
          image: img("/images/why-us-fiduciary.jpg", ""),
        },
        {
          title: "Your liquidity plan:",
          text: "how to take money out of the business, and how to plan for funding rounds and exits",
          image: img("/images/home/hero-window.jpg", ""),
        },
        {
          title: "Your investment plan:",
          text: "asset allocation and Investment Policy Statement for wealth outside the business",
          image: img("/images/pillar-capability.jpg", ""),
        },
        {
          title: "Your diversification plan:",
          text: "a step by step plan to reduce dependence on one company",
          image: img("/images/global-approach-bg.jpg", ""),
        },
        {
          title: "Your legacy plan:",
          text: "succession, wills, trusts, family charter, next generation readiness and giving back",
          image: img("/images/mission-dark-bg.jpg", ""),
        },
        {
          title: "Your document vault and calendar:",
          text: "every structure, document and deadline in one place",
          image: img("/images/about-why-we-are.jpg", ""),
        },
      ]),
      stayHeading: "How we stay with you",
      stayImage: img("/images/reasons-dark-bg.jpg", ""),
      stayItems: items("fe-stay", [
        { icon: "RefreshCw", text: "Regular portfolio reviews and one consolidated report" },
        { icon: "CalendarCheck", text: "An annual family planning meeting, and more around any liquidity event" },
        { icon: "PhoneCall", text: "On call when you need us for any money question, big or small" },
        { icon: "Users", text: "Coordination with your CA, company secretary, lawyer, bankers and investment bankers" },
      ]),
    }),
    section("fe-why", "foundersWhyChoose", "Why Founders Choose Neuron Wealth", {
      heading: "Why Founders Choose Neuron Wealth",
      image: img("/images/pillar-integrity.jpg", ""),
      items: items("fe-why", [
        {
          icon: "LineChart",
          title: "Investment advisers first.",
          text: "Every recommendation starts with one question: will this improve what your family keeps, for the risk it takes?",
        },
        {
          icon: "Rocket",
          title: "We understand founders.",
          text: "Neuron Wealth is itself a founder led firm, and our team includes people who have built, funded and mentored startups and businesses.",
        },
        {
          icon: "Scale",
          title: "Tax, law and investments together.",
          text: "Chartered Accountants, a US CPA and a CFA charterholder plan your business exits, tax, FEMA and investments as one.",
        },
        {
          icon: "Wallet",
          title: "Fee only and independent.",
          text: "We are paid only by you, never by a fund, a bank or a deal. No commissions, no conflicts.",
        },
        {
          icon: "ShieldCheck",
          title: "Your money stays in your name.",
          text: "We advise and help you act. Your investments stay in your family's own accounts.",
        },
        {
          icon: "EyeOff",
          title: "Discreet and selective.",
          text: "We take on only a few new families each year, and treat every detail with complete confidentiality.",
        },
      ]),
    }),
    section(
      "fe-work",
      "foundersHowWeWork",
      "How We Work",
      {
        heading: "How We Work",
        steps: items("fe-step", [
          {
            title: "A first conversation.",
            text: "A 30 minute call to understand your business, your family and your goals. No obligation.",
          },
          {
            title: "Understanding both balance sheets.",
            text: "Your business, your family's wealth, your structures, your plans and your comfort with risk.",
          },
          {
            title: "Your Family CFO plan.",
            text: "A clear written plan for separation, liquidity, investments, protection and succession.",
          },
          {
            title: "Putting it in place and staying with you.",
            text: "Through every funding round, exit and generation, as your first call for anything to do with money.",
          },
        ]),
      },
      { anchor: "how-we-work" }
    ),
    section("fe-stories", "foundersStories", "Families We Helped", {
      heading: "Families We Helped",
      note: STORY_NOTE,
      stories: items("fe-story", [
        {
          icon: "Flag",
          image: img("/images/about-who-we-are.jpg", ""),
          title: "A founder after an exit.",
          text: "Karan sold a large stake in the software company he founded. Within weeks, he was being pitched private funds, land deals and startups. We planned the tax on the sale before it closed, kept a part of the money safe while the family took time to think, and then built a diversified portfolio across India and global markets. A set amount was kept aside for angel investing, so Karan could back new founders without putting the family's future at risk.",
        },
        {
          icon: "Users",
          image: img("/images/who-wealthy-families.jpg", ""),
          title: "A second generation family business.",
          text: "The Desai family runs a manufacturing business started by the father. Most family wealth was inside the company, with personal guarantees on bank loans. We helped the family build wealth outside the business through regular, tax efficient payouts, set up a family investment structure with legal experts, and started conversations on succession that led to a written family charter.",
        },
      ]),
      disclaimer: STORY_DISCLAIMER,
    }),
    section(
      "fe-faqs",
      "foundersFaqsClosing",
      "FAQs, Closing CTA & Disclaimer",
      {
        faqHeading: "Frequently Asked Questions",
        contactLink: lnk("Contact Us", "/contact"),
        faqs: items("fe-faq", [
          {
            q: "Can you help me before I sell my company or raise funds?",
            a: "Yes, and that is the best time. The structure and timing of a sale or secondary decides much of the tax and what your family keeps. We work alongside your CA, lawyers and bankers.",
          },
          {
            q: "What is the best way to take money out of my company?",
            a: "It depends on your company, your income and your plans. Salary, dividend, buyback, rent and loans are each taxed differently. We help you choose the right mix, legally and efficiently.",
          },
          {
            q: "Should our family's investments be held personally or through a company?",
            a: "Each has pros and cons for tax, control, succession and protection. We help you decide, and work with legal experts where a structure is needed.",
          },
          {
            q: "How do I protect my family from business risk?",
            a: "By building wealth outside the business, keeping clear lines between company and personal money, the right insurance and careful handling of personal guarantees.",
          },
          {
            q: "I have just sold my company. What should I do with the money?",
            a: "First, do not rush. Keep the money safe while you think. Then build a written plan for safety, growth, giving and new ventures. We help you through each step.",
          },
          {
            q: "Can you help with family business succession?",
            a: "Yes. We help with the wealth and financial side of succession, including family charters, wills and trusts, working with trusted legal experts.",
          },
          {
            q: "How do we prepare our children for the family's wealth?",
            a: "Step by step. We help you start money conversations early, involve children in family meetings as they grow and give them responsibility gradually, whether or not they join the business. A family charter helps everyone understand the values and rules that come with the wealth.",
          },
          {
            q: "Can you help us plan our giving?",
            a: "Yes. We help you decide how much to give, when and how, whether directly, through a family foundation or through a trust, so that giving back becomes part of your family's legacy.",
          },
          {
            q: "Do you advise on investing abroad and global structures?",
            a: "Yes. We advise on investing abroad under LRS, overseas holding structures and children living abroad, within FEMA and tax rules in each country.",
          },
          {
            q: "How much of my time will this take?",
            a: "Very little. After the first few meetings, most founders meet us a few times a year, and more around a funding round or exit. We handle the details and bring you only the decisions that need you.",
          },
        ]),
        closingTitle: "Your Business Made the Money. Let Us Help It Become a Legacy.",
        closingText:
          "Tell us about your business, your family and your plans in a 30 minute call. No obligation and nothing to sell. Just clear, independent thinking from a team that will look after your family's balance sheet as carefully as you look after your company's.",
        primaryButton: bookCall(),
        secondaryButton: lnk("See how we work with founders", "#founder-stages"),
        disclaimerText: [SEBI_DISCLAIMER],
      },
      { anchor: "faqs" }
    ),
  ],
};

const professionalsAndCxos = {
  slug: "professionals-and-cxos",
  title: "Professionals & CXOs",
  description:
    "Family CFO for doctors, lawyers, CAs, technology leaders and CXOs: investments, ESOPs, tax, insurance, will and early retirement planning.",
  category: "services",
  icon: "Briefcase",
  status: "published",
  seo: {
    title: "Family CFO for Professionals and CXOs | Wealth Management and ESOP Advice | Neuron Wealth",
    description:
      "Busy doctor, lawyer, CA or CXO? We act as your Family CFO: investments, ESOPs, tax, insurance, will and early retirement planning, in one place. Fee only SEBI RIA.",
  },
  sections: [
    section(
      "cxo-hero",
      "cxoHero",
      "Professionals Hero Banner",
      {
        eyebrow: "For doctors, lawyers, CAs, technology leaders and CXOs",
        title: "Don't Just Earn Money.",
        titleHighlight: "Create Wealth.",
        paragraphs: [
          "You have spent years becoming the best at what you do, and you earn well for it. But a high income is not the same as lasting wealth. Your days are full and your time is precious, so your own money often gets whatever attention is left at the end of a long week.",
          "You are the expert at work. Let us be the expert for your wealth. We work as your Family CFO: one trusted team that looks after your investments, taxes, insurance, will and every money decision in between. You focus on your work and your family. We turn what you earn into wealth that lasts.",
        ],
        primaryButton: bookCall(),
        secondaryButton: lnk("See how we create wealth", "#how-we-help"),
        image: img("/images/career-team-collaborate.jpg", "Senior professionals in a meeting around a boardroom table"),
        trustItems: [
          "SEBI Registered Investment Adviser INA000016481",
          "Fee only, no commissions",
          "CA, US CPA and CFA team",
          "Multi family office services",
        ],
      },
      { anchor: "professionals-hero" }
    ),
    section("cxo-familiar", "cxoFamiliar", "Does This Sound Familiar", {
      heading: "Does This Sound Familiar?",
      text: "If even one of these sounds like you, you are in good company. Most successful professionals we meet say the same things. They simply have not had the time.",
      image: img("/images/about-why-we-are.jpg", ""),
      quotes: [
        "I earn well, but I am not sure I am really building wealth.",
        "A large part of my wealth is in my company's shares, and I do not know when or how to sell.",
        "My bank manager keeps suggesting products. I am never sure whose interest they serve.",
        "I have a CA, an insurance agent and a lawyer, but nobody sees the full picture.",
        "I want to stop working at 50, or at least have the choice. I do not know if that is possible.",
        "We still do not have a proper will. I keep meaning to get to it.",
      ],
    }),
    section("cxo-drift", "cxoDrift", "The Hidden Cost of Being Busy", {
      heading: "The Hidden Cost of Being Busy",
      subheading: "When you are busy, money does not stop. It just drifts.",
      text: "None of this feels urgent on any single day. Over ten or twenty years, it can cost a family a great deal: in returns, in tax and in risk.",
      items: [
        "Cash sits idle in savings accounts for months",
        "Products are bought because someone called at the right moment",
        "Tax that could have been planned is simply paid",
        "Company shares keep piling up in one place",
        "Insurance, nominations and the will stay on the to do list for years",
      ],
      banner: "Your money works only as hard as the attention it gets. That attention is what we give it.",
    }),
    section("cxo-cfo", "cxoFamilyCfo", "Your Family CFO", {
      heading: "Your Family CFO",
      text: "A company has a CFO to look after its money, plan ahead and handle the details so the leaders can focus on what they do best. Your family deserves the same.",
      lead: "As your Family CFO, we are your first call for anything to do with money:",
      teamLine: "One trusted team.",
      teamLineHighlight: "One plan.",
      teamLineEnd: "One call.",
      roles: items("cxo-role", [
        {
          icon: "LineChart",
          title: "Investments",
          text: "in India and abroad, planned and reviewed for you",
          image: img("/images/us-assets-planning.jpg", ""),
        },
        {
          icon: "Receipt",
          title: "Tax",
          text: "planning your income, investments and gains so you keep more, legally",
          image: img("/images/about-who-we-are.jpg", ""),
        },
        {
          icon: "Umbrella",
          title: "Insurance and protection",
          text: "the right cover for your family, without overpaying",
          image: img("/images/mission-bg.jpg", ""),
        },
        {
          icon: "ScrollText",
          title: "Will, estate and succession",
          text: "making sure your wealth reaches the right people in the right way",
          image: img("/images/home/investment-still.jpg", ""),
        },
        {
          icon: "ArrowLeftRight",
          title: "Money and wealth transfers",
          text: "within India, abroad and to the next generation",
          image: img("/images/home/nri-horizon.jpg", ""),
        },
        {
          icon: "FolderOpen",
          title: "Documentation and reporting",
          text: "every account, policy and document organised, with one clear report",
          image: img("/images/reasons-dark-bg.jpg", ""),
        },
        {
          icon: "ShieldCheck",
          title: "Compliance",
          text: "income tax, FEMA and foreign reporting handled correctly",
          image: img("/images/pillar-integrity.jpg", ""),
        },
        {
          icon: "Users",
          title: "Coordination",
          text: "we work with your CA, lawyer, banker and insurance adviser so everyone works from one plan",
          image: img("/images/mission-dark-bg.jpg", ""),
        },
      ]),
    }),
    section("cxo-who", "cxoWhoWeHelp", "Who We Help", {
      heading: "Who We Help",
      personas: items("cxo-persona", [
        {
          icon: "Stethoscope",
          title: "Doctors",
          text: "Long hours, high income and little time. We help you separate practice and personal money, invest your surplus wisely, protect your family and plan for the day you choose to slow down.",
          image: img("/images/home/family-shore.jpg", ""),
        },
        {
          icon: "Scale",
          title: "Lawyers and Chartered Accountants",
          text: "You advise others every day. Who advises you? We give you an independent second view on your own wealth, taxes and long term plans.",
          image: img("/images/who-greencard.jpg", ""),
        },
        {
          icon: "Laptop",
          title: "Technology professionals",
          text: "Salary, bonus, ESOPs and RSUs, sometimes from a global parent company. We turn a complex pay package into a simple, diversified plan for lasting wealth.",
          image: img("/images/who-nri-h1b.jpg", ""),
        },
        {
          icon: "Briefcase",
          title: "CEOs, CFOs, CTOs and other CXOs",
          text: "Your company's shares may be your biggest asset, with trading windows and insider rules on when you can sell. We help you diversify carefully and build wealth beyond your employer.",
          image: img("/images/insights/blogs.jpg", ""),
        },
        {
          icon: "Globe",
          title: "Senior leaders at global companies",
          text: "Foreign stock plans, foreign assets to report in India and perhaps a future move abroad. We plan across both countries.",
          image: img("/images/who-oci-global.jpg", ""),
        },
      ]),
      note: "Most of our clients have investable wealth of USD 1 million or more, or are on their way there.",
      quote:
        "Your income is your engine. Whether it comes as salary, fees or stock, our job is to turn it into wealth that keeps working when you choose to stop.",
      link: lnk(
        "Built your own company? Our page for Founders and Entrepreneurs is made for you.",
        "/services/founders-and-entrepreneurs"
      ),
    }),
    section("cxo-earning", "cxoEarning", "Earning vs Creating Wealth", {
      heading: "Earning Money and Creating Wealth Are Not the Same",
      backgroundImage: img("/images/night-skyline-numbers.jpg", ""),
      earnTitle: "Earning money",
      earnText: "is your salary, your fees, your bonus. It stops when you stop.",
      createTitle: "Creating wealth",
      createText:
        "is what your money does for you: investments that grow, taxes that are planned, risks that are covered and a family that is secure. It keeps working even when you do not.",
      summary:
        "Most professionals are excellent at the first. Very few have the time for the second. What you keep after tax, adjusted for the risk you take, is what turns income into wealth.",
      approachHeading: "Our approach rests on three things:",
      approach: items("cxo-approach", [
        {
          title: "Better returns after tax.",
          text: "Every investment is judged by what you keep after tax in India and, where relevant, abroad.",
        },
        {
          title: "The right level of risk.",
          text: "Your portfolio matches your goals, your time frame and your comfort, not the market mood or the latest tip.",
        },
        {
          title: "Fully compliant.",
          text: "Every decision follows income tax law, FEMA and SEBI rules. No shortcuts, no surprises later.",
        },
      ]),
    }),
    section(
      "cxo-help",
      "cxoHowWeHelp",
      "How We Help",
      {
        heading: "How We Help",
        services: items("cxo-help", [
          {
            icon: "LineChart",
            title: "Investment planning and management",
            text: "The heart of what we do. A clear asset allocation across Indian and global markets, built for your goals and risk comfort. Independent advice on shares, mutual funds, bonds, PMS, AIF and global options, with a written Investment Policy Statement, regular reviews and one consolidated report.",
            image: img("/images/nri-relocation-advisory.jpg", ""),
          },
          {
            icon: "Briefcase",
            title: "ESOPs, RSUs and company stock",
            text: "When to exercise, when to sell and how much to keep. We plan around vesting dates, trading windows, tax at exercise and sale, and foreign stock plans, so you diversify step by step without losing more than necessary to tax.",
            image: img("/images/pillar-capability.jpg", ""),
          },
          {
            icon: "Target",
            title: "Financial freedom and early retirement",
            text: "How much is enough? When can work become a choice, not a need? We work out your financial freedom number, build a plan to reach it and review your progress every year.",
            image: img("/images/rnor-golden-window.jpg", ""),
          },
          {
            icon: "Receipt",
            title: "Tax planning and compliance",
            text: "Planning your salary, professional income, investments and gains across the year, not just at filing time. Foreign income and assets reported correctly where needed.",
            image: img("/images/us-tax-airport.jpg", ""),
          },
          {
            icon: "Umbrella",
            title: "Insurance and protection",
            text: "A review of your life, health and other cover. The right protection for your family, with no overpaying and no products you do not need.",
            image: img("/images/pillar-results.jpg", ""),
          },
          {
            icon: "ScrollText",
            title: "Will, estate and succession",
            text: "A clear will, correct nominations and, where useful, a family trust, prepared with trusted legal experts. Your wealth reaches the right people, the right way.",
            image: img("/images/insights/books.jpg", ""),
          },
          {
            icon: "Sprout",
            title: "Money, wealth transfers and your legacy",
            text: "Moving money between family members, to children studying or living abroad, or across generations, within FEMA and tax rules. Your career will end one day. The wealth you create can keep supporting your children, your parents and the causes you care about long after. We help you plan that legacy, simply and clearly.",
            image: img("/images/who-global-families.jpg", ""),
          },
          {
            icon: "FolderOpen",
            title: "Documents, records and reporting",
            text: "Every account, policy, property and document organised in one place, with a clear summary your spouse or children can understand if they ever need to.",
            image: img("/images/about-room.jpg", ""),
          },
        ]),
      },
      { anchor: "how-we-help" }
    ),
    section("cxo-sounding", "cxoSoundingBoard", "Your Sounding Board", {
      heading: "Your Sounding Board",
      image: img("/images/pillar-intention.jpg", "A client and adviser shaking hands after a meeting"),
      text: "Senior professionals spend their days making decisions for others. It helps to have someone to think through your own.",
      callout: "We are the people you call before you decide:",
      decisions: [
        "A new job offer: what the pay package is really worth after tax and ESOPs",
        "Exercising or selling your ESOPs",
        "Buying a home, prepaying a loan or investing the surplus",
        "A friend's startup asking for money, or a property deal that sounds too good",
        "Children's education in India or abroad",
        "A sabbatical, a career change or starting your own venture",
        "Supporting parents or family members",
      ],
      closing:
        "Sometimes we coach, sometimes we challenge, and sometimes we simply ask the questions nobody else will. Always with your family's long term interest first.",
    }),
    section(
      "cxo-freedom",
      "cxoFreedom",
      "Financial Freedom",
      {
        quote: "Many of our clients do not want to stop working. They want the freedom to choose.",
        image: img("/images/home/hero-window.jpg", ""),
        heading: "When Can Work Become a Choice?",
        text: "Financial freedom means your wealth can support the life you want, without depending on the next pay cheque. We help you answer three simple questions:",
        questions: items("cxo-question", [
          { icon: "Calculator", title: "How much do I need?", text: "Your financial freedom number, based on how you want to live" },
          { icon: "Hourglass", title: "When can I get there?", text: "A realistic timeline based on your savings, investments and goals" },
          { icon: "Compass", title: "What do I need to do now?", text: "The steps, reviewed every year as life changes" },
        ]),
        note: "Whether you want to retire at 50, move to part time work, start something of your own or simply sleep better at night, the plan starts with knowing your number.",
        legacy:
          "And beyond your own freedom, the same wealth can give your children a strong start and leave something meaningful behind. That is wealth that outlives your career.",
      },
      { anchor: "financial-freedom" }
    ),
    section("cxo-service", "cxoDeliverables", "Your Family CFO Service", {
      heading: "Your Family CFO Service",
      receiveHeading: "What you receive",
      items: items("cxo-receive", [
        { title: "Your complete financial picture:", text: "everything you own and owe, in India and abroad, in one place" },
        { title: "Your financial freedom plan:", text: "your number, your timeline and your steps" },
        { title: "Your investment plan:", text: "asset allocation and Investment Policy Statement for after tax returns" },
        { title: "Your ESOP and stock plan:", text: "a clear plan to diversify company shares" },
        { title: "Your tax plan:", text: "for income, investments and gains across the year" },
        { title: "Your protection review:", text: "insurance, will, nominations and succession" },
        { title: "Your document vault and calendar:", text: "every document organised and every deadline tracked" },
      ]),
      stayHeading: "How we stay with you",
      stayImage: img("/images/home/advisory-room.jpg", ""),
      stayItems: items("cxo-stay", [
        { icon: "RefreshCw", text: "Regular portfolio reviews and one consolidated report" },
        { icon: "CalendarCheck", text: "An annual planning meeting to update your plan, goals and numbers" },
        { icon: "PhoneCall", text: "On call when you need us for any money question, big or small" },
        { icon: "Users", text: "Coordination with your CA, lawyer, banker and insurance adviser" },
      ]),
    }),
    section("cxo-why", "cxoWhyChoose", "Why Choose Neuron Wealth", {
      heading: "Why Choose Neuron Wealth",
      items: items("cxo-why", [
        {
          icon: "LineChart",
          title: "Investment advisers first.",
          text: "Every recommendation starts with one question: will this improve what you keep, for the risk you take?",
        },
        {
          icon: "Users",
          title: "A team of professionals, for professionals.",
          text: "Chartered Accountants, a US CPA and a CFA charterholder, so tax, law and investments are planned together.",
        },
        {
          icon: "Wallet",
          title: "Fee only.",
          text: "We are paid only by you, never by a product. No commissions, so our advice has one aim: what is right for your family.",
        },
        {
          icon: "ShieldCheck",
          title: "Your money stays in your name.",
          text: "We advise and help you act. Your investments stay in your own accounts.",
        },
        {
          icon: "MessageSquareText",
          title: "Plain language and respect for your time.",
          text: "Short meetings, clear summaries and decisions made simple. You will always know what we suggest and why.",
        },
        {
          icon: "Gem",
          title: "Selective by choice.",
          text: "We take on only a few new families each year, so every client gets real attention.",
        },
      ]),
    }),
    section(
      "cxo-work",
      "cxoHowWeWork",
      "How We Work",
      {
        heading: "How We Work",
        steps: items("cxo-step", [
          { title: "A first conversation.", text: "A 30 minute call to understand your life, work and goals. No obligation." },
          { title: "Understanding your family.", text: "Your income, assets, company stock, goals, family needs and comfort with risk." },
          {
            title: "Your Family CFO plan.",
            text: "A clear written plan covering investments, tax, protection, succession and financial freedom.",
          },
          {
            title: "Putting it in place and staying with you.",
            text: "We help you act on the plan, review it regularly and remain your first call for anything to do with money.",
          },
        ]),
      },
      { anchor: "how-we-work" }
    ),
    section("cxo-stories", "cxoStories", "Families We Helped", {
      heading: "Families We Helped",
      note: STORY_NOTE,
      stories: items("cxo-story", [
        {
          icon: "Laptop",
          image: img("/images/vision-dark-bg.jpg", ""),
          title: "A CTO in Bengaluru.",
          text: "Vikram, the CTO of a listed technology company, had more than half his wealth in his employer's shares. Trading windows and insider rules made selling difficult, and he had no time to plan it. We built a step by step plan to diversify within the company's trading rules, planned the tax on each sale and invested the proceeds in a balanced portfolio across India and global markets. His family now has a clear picture of their wealth and a date by which work becomes a choice.",
        },
        {
          icon: "Stethoscope",
          image: img("/images/who-wealthy-families.jpg", ""),
          title: "A doctor couple in Ahmedabad.",
          text: "Drs. Nisha and Rajesh ran a busy clinic. Their money sat in savings accounts, scattered fixed deposits and insurance policies bought over the years. We separated their practice and personal finances, cleaned up their insurance, invested their surplus to a written plan and put wills in place. Today they meet us twice a year and spend the rest of their free time with their children.",
        },
      ]),
      disclaimer: STORY_DISCLAIMER,
    }),
    section(
      "cxo-faqs",
      "cxoFaqsClosing",
      "FAQs, Closing CTA & Disclaimer",
      {
        faqHeading: "Frequently Asked Questions",
        contactLink: lnk("Contact Us", "/contact"),
        faqs: items("cxo-faq", [
          {
            q: "What is a Family CFO?",
            a: "Just as a company's CFO looks after its finances, a Family CFO looks after a family's money: investments, tax, insurance, succession, documents and every financial decision. We become your first call for anything to do with money.",
          },
          {
            q: "I already have a CA. Why do I need you?",
            a: "Your CA files your returns and handles compliance. We plan and manage your investments and your overall wealth, and we work with your CA so both sides follow one plan.",
          },
          {
            q: "How do you help with ESOPs and RSUs?",
            a: "We plan when to exercise and sell, how the tax works at each stage, how to work within trading windows and insider rules, and how to reinvest the proceeds into a diversified portfolio.",
          },
          {
            q: "Can I really retire early?",
            a: "It depends on your savings, lifestyle and goals. We work out your financial freedom number and a realistic timeline, then build and review the plan to get there.",
          },
          {
            q: "Do you also advise on investing outside India?",
            a: "Yes. We advise on global investments within FEMA and Indian tax rules, including through Interactive Brokers and GIFT City options, so your wealth is diversified beyond one country.",
          },
          {
            q: "Do you sell insurance or financial products?",
            a: "No. We are fee only. We review your insurance and investments independently and recommend only what you need.",
          },
          {
            q: "How much time will this take from me?",
            a: "Very little. After the first few meetings, most clients meet us a few times a year. We handle the details and bring you only the decisions that need you.",
          },
          {
            q: "Do you work with only a few clients?",
            a: "Yes. We are selective, and take on only a few new families each year, so that every family gets real time and attention.",
          },
        ]),
        closingTitle: "Don't Just Earn Money.",
        closingHighlight: "Create Wealth.",
        closingText:
          "You have worked hard for your income. Let us help it work hard for your family. Tell us about your work, your family and your goals in a 30 minute call. No obligation and nothing to sell. Just clear thinking from a team that will look after your wealth like its own CFO would.",
        primaryButton: bookCall(),
        secondaryButton: lnk("See when work becomes a choice", "#financial-freedom"),
        disclaimerText: [SEBI_DISCLAIMER],
      },
      { anchor: "faqs" }
    ),
  ],
};

export const pageDefaults = {
  home,
  about,
  "why-associate": whyAssociate,
  team,
  contact,
  "sebi-regulatory-compliance": sebiRegulatoryCompliance,
  "privacy-policy": privacyPolicy,
  "website-disclaimer": disclaimerPage,
  "refund-policy": refundPolicyPage,
  "nri-returning-to-india": nriReturningToIndia,
  "global-indians": globalIndians,
  "global-citizens-in-india": globalCitizensInIndia,
  "global-investor": globalInvestor,
  "founders-and-entrepreneurs": foundersAndEntrepreneurs,
  "professionals-and-cxos": professionalsAndCxos,
  ...extraPages,
};
