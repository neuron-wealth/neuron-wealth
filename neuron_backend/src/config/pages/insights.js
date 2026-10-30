const { text, textarea, link, image, select, list, opt } = require("../cmsFields");
const { img, lnk, section, items } = require("../cmsContent");

const coverFields = [
  image("image", "Cover Image", { sizing: false }),
  text("title", "Title", 250),
  link("link", "File or Link", {
    upload: true,
    hint: "Upload a PDF, Word, Excel or PowerPoint file, or paste a web address. It opens when the cover is clicked. Leave empty for a cover without a link.",
  }),
];

const videoFields = [
  text("youtubeId", "YouTube Video ID", 20, {
    hint: "The ID from the YouTube address, e.g. rBEKMzck7K0 from youtube.com/watch?v=rBEKMzck7K0.",
  }),
  text("title", "Title", 250),
];

const coverList = (label, itemLabel) => [
  text("title", "Heading", 80),
  list("items", label, itemLabel, 60, coverFields, { titleKey: "title" }),
];
const videoList = [text("title", "Heading", 80), list("videos", "Videos", "Video", 60, videoFields, { titleKey: "title" })];
const TAB_NOTE = "Shown on the All tab and on its own tab.";

const sectionTypes = {
  insightsBanner: {
    label: "Knowledge Hub Banner & Tabs",
    description: "Background image, heading, intro line, breadcrumb and the tab bar (All, Media, Books, Blogs, Video, Connect).",
    icon: "Newspaper",
    design: ["anchor"],
    fields: [
      link("homeLink", "Home Breadcrumb", { group: "Banner" }),
      link("insightsLink", "Knowledge Hub Breadcrumb", { group: "Banner", hint: "Shown as plain text on the All tab." }),
      image("heroImage", "Background Image", { group: "Banner", sizing: false }),
      text("heading", "Heading (Italic)", 80, { group: "Banner" }),
      textarea("intro", "Intro Line", 300, { group: "Banner" }),
      list(
        "tabs",
        "Tabs",
        "Tab",
        12,
        [
          select(
            "key",
            "Highlights On",
            [
              opt("all", "All (/insights)"),
              opt("media", "Media (/insights/media)"),
              opt("books", "Books (/insights/books)"),
              opt("blogs", "Blogs (/insights/blogs)"),
              opt("video", "Video (/insights/video, /insights/tv-media, /insights/youtube)"),
              opt("connect", "Connect (/insights/connect)"),
              opt("other", "Other Page"),
            ],
            { hint: "The tab is underlined while this Knowledge Hub view is open; its label is also used in the breadcrumb and browser title." }
          ),
          text("label", "Label", 40),
          link("link", "Link"),
        ],
        { group: "Tabs", titleKey: "label" }
      ),
    ],
  },
  insightsMedia: {
    label: "Knowledge Hub: Print Media",
    description: `Magazine and newspaper covers, each opening a PDF, Word file or link. ${TAB_NOTE}`,
    icon: "Newspaper",
    design: ["anchor"],
    fields: coverList("Media Covers", "Cover"),
  },
  insightsBooks: {
    label: "Knowledge Hub: Books",
    description: `Book covers, each opening a PDF, Word file or link. ${TAB_NOTE}`,
    icon: "BookOpen",
    design: ["anchor"],
    fields: coverList("Books", "Book"),
  },
  insightsBlogs: {
    label: "Knowledge Hub: Blogs",
    description: `The six latest published blog posts (managed under Blogs) and a View All button. ${TAB_NOTE}`,
    icon: "PenLine",
    design: ["anchor"],
    fields: [
      text("title", "Heading", 80),
      link("link", "View All Button", { hint: "{count} in the label is replaced with the number of published blog posts." }),
      text("errorText", "Load Error Message", 160),
      text("retryLabel", "Retry Button Label", 40),
    ],
  },
  insightsTv: {
    label: "Knowledge Hub: TV Media",
    description: "Television appearances from YouTube. Shown on the All tab and the Video tab.",
    icon: "Play",
    design: ["anchor"],
    fields: videoList,
  },
  insightsYoutube: {
    label: "Knowledge Hub: YouTube",
    description: "YouTube videos. Shown on the All tab and the Video tab.",
    icon: "Play",
    design: ["anchor"],
    fields: videoList,
  },
  insightsConnect: {
    label: "Knowledge Hub: Connect",
    description: `Neuron Wealth Connect newsletter issues, each opening a PDF, Word file or link. ${TAB_NOTE}`,
    icon: "Mail",
    design: ["anchor"],
    fields: coverList("Newsletter Issues", "Issue"),
  },
};

// The Knowledge Hub is stored as one section per block; each entry maps the original combined
// content keys onto that section's own keys.
const HUB_SPLIT = [
  ["insights-banner", "insightsBanner", "Banner & Tabs", "knowledge-hub", { homeLink: "homeLink", insightsLink: "insightsLink", heroImage: "heroImage", heading: "heading", intro: "intro", tabs: "tabs" }],
  ["insights-media", "insightsMedia", "Print Media", "print-media", { mediaTitle: "title", mediaItems: "items" }],
  ["insights-books", "insightsBooks", "Books", "books", { booksTitle: "title", books: "items" }],
  ["insights-blogs", "insightsBlogs", "Blogs", "blogs", { blogsTitle: "title", blogsLink: "link", blogsError: "errorText", blogsRetry: "retryLabel" }],
  ["insights-tv", "insightsTv", "TV Media", "tv-media", { tvTitle: "title", tvVideos: "videos" }],
  ["insights-youtube", "insightsYoutube", "YouTube", "youtube", { youtubeTitle: "title", youtubeVideos: "videos" }],
  ["insights-connect", "insightsConnect", "Connect", "connect", { connectTitle: "title", connectIssues: "items" }],
];

const splitHub = (hub) =>
  HUB_SPLIT.map(([id, type, label, anchor, keys]) =>
    section(id, type, label, Object.fromEntries(Object.entries(keys).map(([from, to]) => [to, hub[from]])), { anchor })
  );

const cover = (url, title, href) => ({ image: img(url, ""), title, link: lnk("", href, { newTab: true }) });
const video = (youtubeId, title) => ({ youtubeId, title });

const page = {
  slug: "insights",
  title: "Knowledge Hub",
  description: "Print media, books, blogs, television, YouTube and Neuron Wealth Connect from Neuron Wealth Advisors.",
  category: "core",
  icon: "Newspaper",
  status: "published",
  seo: {
    title: "Knowledge Hub | Neuron Wealth Advisors",
    description: "Print media, books, blogs, television, YouTube and Neuron Wealth Connect from Neuron Wealth Advisors.",
  },
  sections: splitHub({
    homeLink: lnk("Home", "/"),
    insightsLink: lnk("Knowledge Hub", "/insights"),
    heroImage: img("/images/insights/books.jpg", "A man reading in a leather chair beside tall bookshelves"),
    heading: "Knowledge Hub",
    intro: "Print media, books, blogs, television, YouTube and Neuron Wealth Connect.",
    tabs: items("ins-tab", [
      { key: "all", label: "All", link: lnk("", "/insights") },
      { key: "media", label: "Media", link: lnk("", "/insights/media") },
      { key: "books", label: "Books", link: lnk("", "/insights/books") },
      { key: "blogs", label: "Blogs", link: lnk("", "/blog") },
      { key: "video", label: "Video", link: lnk("", "/insights/video") },
      { key: "connect", label: "Connect", link: lnk("", "/insights/connect") },
    ]),
    mediaTitle: "Print Media",
    mediaItems: items("ins-media", [
      cover(
        "/images/Media/moneylife-1.jpg",
        "MoneyLife Magazine: Cover Story : NRI ? Have you Complied with Tax and Other Rules?",
        "https://neuronwealth.com/wp-content/uploads/2025/07/MoneyLife-Cover-Story_NRI_Have-you-Complied-with-Tax-and-Other-Rules.pdf"
      ),
      cover(
        "/images/Media/khabar-315x446.jpg",
        "Khabar, Atlanta, USA: Cover Story: Investing in India",
        "https://neuronwealth.com/wp-content/uploads/2025/07/Khabar-Magagine_March-2015_Coverstory_Investing-in-India_compressed.pdf"
      ),
      cover(
        "/images/Media/Moneylife-Cover-Story_NRI-Investors-Your-Way-through-Investment-Options-a-Maze-of-Rules-315x443.jpg",
        "MoneyLife Magazine: Cover Story : NRI Investors: Your Way through Investment Options & a Maze of Rules",
        "https://neuronwealth.com/wp-content/uploads/2025/07/Moneylife-Cover-Story_NRI-Investors-Your-Way-through-Investment-Options-a-Maze-of-Rules.pdf"
      ),
      cover("/images/Media/khabar2.jpg", "Khabar, Atlanta, USA: NRI PAN and Aadhaar - from Confusion to Clarity", ""),
      cover(
        "/images/Media/Feelings-Magazine_Gujarati_Budget-Analysis-315x433.jpg",
        "Feelings Magazine_Gujarati_Budget Analysis",
        "https://neuronwealth.com/wp-content/uploads/2025/07/Feelings-Magazine_Gujarati_Budget-Analysis.pdf"
      ),
      cover(
        "/images/Media/Neuron-Wealth-Connect_-July-2025-315x445.jpg",
        "Neuron Wealth Connect_July 2025",
        "https://neuronwealth.com/wp-content/uploads/2025/07/Neuron-Wealth-Connect_July-2025.pdf"
      ),
    ]),
    booksTitle: "Books",
    books: items("ins-book", [
      cover(
        "/images/books/nri-25-26.jpg",
        "NRI Investments and Taxation: A Small Guide for Big Gains (FY 2024-25 and FY 2025-26)",
        "https://www.amazon.in/NRI-Investments-Taxation-2024-25-2025-26-ebook/dp/B0FF3H6QSP/"
      ),
      cover(
        "/images/books/nri-19-20.jpg",
        "NRI Investments and Taxation: A Small Guide for Big Gains (FY 2018-19 and FY 2019-20)",
        "https://www.amazon.in/NRI-Investments-Taxation-2018-19-2019-20-ebook/dp/B07WK45S5L"
      ),
      cover(
        "/images/books/nri-23-24.jpg",
        "NRI Investments and Taxation: A Small Guide for Big Gains (FY 2022-23 and FY 2023-24)",
        "https://www.amazon.in/NRI-Investments-Taxation-2022-23-2023-24-ebook/dp/B0CBT39PFJ"
      ),
      cover(
        "/images/books/nri-18-19.jpg",
        "NRI Investments and Taxation: A Small Guide for Big Gains (FY 2017-18 and FY 2018-19)",
        "https://www.amazon.in/NRI-Investments-Taxation-2017-18-2018-19-ebook/dp/B07CGLPNKY"
      ),
      cover(
        "/images/books/nri-16-17.jpg",
        "NRI Investments and Taxation: A Small Guide for Big Gains (FY 2016-17 and FY 2017-18)",
        "https://www.amazon.in/NRI-Investments-Taxation-2016-17-2017-18-ebook/dp/B07198SRFP"
      ),
      cover(
        "/images/books/nri-guide.jpg",
        "NRI Investments and Taxation: A Small Guide for Big Gains",
        "https://www.amazon.in/NRI-Investments-Taxation-Small-Guide-ebook/dp/B00ROOOMI6"
      ),
    ]),
    blogsTitle: "Blogs",
    blogsError: "Blog posts could not be loaded.",
    blogsRetry: "Try again",
    blogsLink: lnk("View All {count} Blogs", "/blog"),
    tvTitle: "TV media",
    tvVideos: items("ins-tv", [
      video("rBEKMzck7K0", "રિઝર્વ બેન્ક ઓફ ઇન્ડિયા ની મહત્વની જાહેરાત રેપો રેટમાં ઘટાડો કર્યો |#RBI |DaySpecial | GTPL"),
      video("rkNYxPQ9JMQ", "Budget 2019 Special Talk show on GujaratNews | 01-Feb-2019 | 03:30 PM | GTPL"),
      video("mpd1uX31WbA", "Chartered financial analyst vadodara today press conference"),
      video("JRbvXJrLhfw", "Day Special માં આજે Sensex ના ઇતિહાસમાં સૌથી મોટી \"હોળી\"....વિશેષ ચર્ચા । Gujaratnews"),
      video("FMaX6zdzjsM", "Budget 2020 - બજેટ 2020 થી શું છે અપેક્ષાઓ ? with જીગ્નેશ પટેલ (CA)સાથે on Gujaratnews"),
      video("alGyUyeZvAA", "How To Examine Your Mutual Fund Portfolio To Get Maximum Benefits? | The Mutual Fund Show"),
      video("JSH4s2w5Wic", "Current Topic - યુએસ સુધારા બિલ(US Sudhara Bill)"),
    ]),
    youtubeTitle: "YouTube",
    youtubeVideos: items("ins-yt", [
      video("aHkrrAYiAZg", "Whether and How to vote (Yes or No) on Winding up of 6 Franklin Schemes"),
      video("fD9BppUhIYo", "TCS on Foreign Remittances - NRI Applicability"),
    ]),
    connectTitle: "Connect",
    connectIssues: items("ins-connect", [
      cover(
        "/images/connect/september-2025.jpg",
        "Neuron Wealth Connect September 2025",
        "https://neuronwealth.com/neuron-wealth_news-letter_september-2025/"
      ),
      cover(
        "/images/connect/july-2025.jpg",
        "Neuron Wealth Connect July 2025",
        "https://neuronwealth.com/wp-content/uploads/2025/07/Neuron-Wealth-Connect_July-2025.pdf"
      ),
      cover(
        "/images/connect/august-2025.jpg",
        "Neuron Wealth Connect August 2025",
        "https://neuronwealth.com/wp-content/uploads/2025/08/Neuron-Wealth-Connect_August-2025.pdf"
      ),
    ]),
  }),
};

module.exports = { sectionTypes, page };
