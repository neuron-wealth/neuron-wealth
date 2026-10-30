// Reuses the disclosureHero and iaFunctionsBody section types from functions-of-investment-adviser.js.
const { img, lnk, section, items } = require("../cmsContent");

const page = {
  slug: "risks",
  title: "Risks",
  description: "Major risk factors that can affect the value of investments and expected returns, and how Neuron Wealth Advisors LLP endeavours to manage them.",
  category: "core",
  icon: "TriangleAlert",
  status: "published",
  seo: {
    title: "Investment Risks | Neuron Wealth Advisors",
    description: "Major risk factors that can affect the value of investments and expected returns, and how Neuron Wealth Advisors LLP endeavours to manage them.",
  },
  sections: [
    section(
      "risks-hero",
      "disclosureHero",
      "Hero Banner",
      {
        parent: "Disclosures",
        breadcrumb: "Risks",
        title: "Investment",
        highlight: "Risks",
        text: "The major risk factors that can affect the value of your investments and expected returns, and how we endeavour to manage them for every client.",
        image: img("/images/why-us-fiduciary.jpg", "Risks - Neuron Wealth Advisors"),
      },
      { anchor: "risks-hero" }
    ),
    section("risks-content", "iaFunctionsBody", "Content & Sidebar", {
      preambleIcon: "TriangleAlert",
      preambleEyebrow: "Risk Disclosure • SEBI IA Framework",
      preambleTitle:
        "The value of the investments and the expected returns affected generally by various risk factors that affect financial and securities market, such as price and volume, volatility in interest rates, currency exchange rates, changes in regulatory and administrative policies of the Government or any other appropriate authority (including tax laws) or other political, economic, and other developments.",

      functions: items("risk-item", [
        {
          number: "1",
          title: "Business / Companies Risk",
          anchor: "business-companies-risk",
          paragraphs: [
            "The investment value depends on the performance of the companies or mutual fund or security invested and its prospects. Investment Advisor focuses on studying various factors related to the company / fund / security and recommend the same based on the suitability for mitigating these company or fund specific risks.",
          ],
        },
        {
          number: "2",
          title: "Market Risk",
          anchor: "market-risk",
          paragraphs: [
            "The risk of losses on financial investments caused by adverse price movements and is inherent in any security. The investor assumes the market risk. However, the Investment Advisor will monitor and analyze the market and economic circumstances from time to time to mitigate Market Risk.",
          ],
        },
        {
          number: "3",
          title: "Price / Volatility Risk",
          anchor: "price-volatility-risk",
          paragraphs: [
            "Price risk is the risk of increase / decrease in the value of a security or an investment portfolio without change in the fundamentals or value of investments. And, this is due to multiple factors. Investment advisor will employ a number of tools and techniques to manage price risk, ranging from relatively conservative decisions to aggressive strategies and balancing it with diversified portfolio.",
          ],
        },
        {
          number: "4",
          title: "Liquidity Risk",
          anchor: "liquidity-risk",
          paragraphs: [
            "Liquidity risk occurs when an investment cannot be converted into cash immediately without any effect on the price. The Investment Advisor tries to mitigate the risks by investing in securities based on the liquidity requirement of the client.",
          ],
        },
        {
          number: "5",
          title: "Service Provider Risk",
          anchor: "service-provider-risk",
          paragraphs: [
            "Investment Advisor is reliant upon the performance of third-party service providers for some functions e.g. research, reporting, etc.. Weak control over technology used in the third-party arrangement may result in threats to security and the integrity of systems and resources, which can have impact upon the operations of the NWA. The Investment Advisor endeavors to mitigate these risks by working with the service provider that has robust information technology controls and is SAAS certified.",
          ],
        },
        {
          number: "6",
          title: "Inflation Risk",
          anchor: "inflation-risk",
          paragraphs: [
            "Inflation is the general rise in the prices of various commodities, products, and services. Inflationary risk will undermine an investment's returns through a decline in purchasing power. Investment Advisor endeavors to mitigate this risk by balancing the investments that beat inflation and generate real return at a overall portfolio level.",
          ],
        },
        {
          number: "7",
          title: "Credit Risk",
          anchor: "credit-risk",
          paragraphs: [
            "Credit risk is the probability of a financial loss resulting from an organization’s failure to repay the loan or redeem the investment. Investment Advisor mitigates credit risk by analyzing the fund’s/borrower's creditworthiness/ investments, such as their current debt load and income, ratings of the funds and recommend investing in the securities that is suitable to the investor.",
          ],
        },
        {
          number: "8",
          title: "Interest Rate Risk",
          anchor: "interest-rate-risk",
          paragraphs: [
            "Interest rate risk is the risk that an investment's value will change as a result of a change in interest rates. This risk affects the value of bonds/debt instruments more directly than stocks. Any reduction in interest rates will increase the value of the instrument and vice versa. Investment Advisor endeavors to consider the interest rate risks while recommending investments that is suitable to the investor.",
          ],
        },
        {
          number: "9",
          title: "Reinvestment Risk",
          anchor: "reinvestment-risk",
          paragraphs: [
            "Reinvestment risk is the chance that cash flows received from an investment will earn less when put to use in a new investment. Investment Advisor attempts to recommend investments considering the financial goals of the investor so the reinvestment risk can be minimized.",
          ],
        },
        {
          number: "10",
          title: "Currency Risk",
          anchor: "currency-risk",
          paragraphs: [
            "Investors having investments across multiple countries or investors from out of India investing in India are exposed to currency risk that may create unpredictable profits and losses in their local currency. Investment Advisors endeavors to considers currency risk for such investors while evaluating suitability of investment.",
          ],
        },
        {
          number: "11",
          title: "Legal / Compliance Risk",
          anchor: "legal-compliance-risk",
          paragraphs: [
            "Compliance with various laws is very important. While Investment advisor will endeavor to comply with all laws related to investments and securities market, the investor are advised to consult a lawyer for investments, taxation or any other legal or compliance related matters.",
          ],
        },
        {
          number: "12",
          title: "Other Risks",
          anchor: "other-risks",
          paragraphs: [
            "There could be other risks too. Investment adviser attempts to implement various risk management strategies like mitigate, reduce, accepts, ignore, etc. based on the nature, type, severity, importance risk as and when it may arise. The risk management strategy would depend on the risk profile of the respective client in their best interest. However, the Investment Advisor does not offer any assured / guaranteed returns. Investment in securities market are subject to market risks. Investors are highly recommended to read all the related documents carefully before investing.",
            "NWA is not liable or responsible for any loss or shortfall resulting on account of Investment Advice. This document represents the views of NWA and should not be taken as the basis for an investment decision.",
          ],
        },
      ]),

      navEyebrow: "On This Page",
      navTitle: "Major Risks",
      frameworkIcon: "Scale",
      frameworkEyebrow: "SEBI IA Framework",
      frameworkTitle: "INA000016481",
      frameworkRows: items("risk-row", [
        { label: "Standard:", value: "Fiduciary Capacity", highlight: false },
        { label: "Advice:", value: "Per Client Risk Profile", highlight: false },
        { label: "Fees:", value: "Fee-only, No Commissions", highlight: false },
        { label: "Returns:", value: "Not Guaranteed", highlight: true },
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

module.exports = { page };
