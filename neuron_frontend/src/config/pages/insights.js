import { img, lnk, section, items } from "../cmsContent";

const cover = (url, title, href) => ({ image: img(url, ""), title, link: lnk("", href, { newTab: true }) });
const video = (youtubeId, title) => ({ youtubeId, title });

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

export const page = {
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
