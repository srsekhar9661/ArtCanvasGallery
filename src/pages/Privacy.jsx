import { Link } from "react-router-dom";
import { businessEmail } from "../utils/enquiry";
import { openAnalyticsPreferences } from "../lib/analytics";

function Privacy() {
  return <div className="legal-page">
    <section className="page-intro container"><p className="eyebrow">Directional Works / Your choices</p><h1>Privacy Policy<span className="title-period">.</span></h1><p>How this website handles enquiries and optional analytics. Last updated 6 November 2026.</p></section>
    <div className="container legal-content section">
      <section><h2>Contact and enquiries</h2><p>The <Link to="/contact">contact page</Link> prepares an enquiry in your browser. Your name, selected service and message are not sent to this website or saved in a database. Choosing WhatsApp or email opens a draft with your details; it is only sent if you choose to send it in that app. Those services have their own privacy policies. To ask about messages you have already sent, use the same channel or email <a href={`mailto:${businessEmail}`}>{businessEmail}</a>.</p></section>
      <section><h2>Optional analytics</h2><p>If a Directional Works Google Analytics 4 property is configured on the production domain, analytics loads only after you allow it. We may measure page views and clicks on enquiry, gallery, service and collaboration links. We do not send names, emails, phone numbers, message text, URL queries, fragments or incoming referrers as events. Opening an app is not a confirmed lead. We do not use advertising features.</p><p>Allow or reject using the small preferences card; your choice is stored in this browser's local storage. Do Not Track and Global Privacy Control override permission. You can change your choice using <button type="button" className="inline-button" onClick={openAnalyticsPreferences}>Analytics preferences</button>. Rejecting later stops future tracking and attempts to remove accessible analytics cookies, but cannot retract information already received by Google. Google may process data outside your country. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.</p></section>
      <section><h2>Hosting and fonts</h2><p>The website host may retain standard technical logs for security and reliability. This website loads its display fonts from Google Fonts, which may receive your IP address and browser details when fonts are requested. Original paintings are served from this website; they are not uploaded to an analytics provider.</p></section>
      <section><h2>Questions</h2><p>For questions about this policy or information you have sent, contact <a href={`mailto:${businessEmail}`}>{businessEmail}</a>. This page will be updated if the website's data handling changes.</p></section>
    </div>
  </div>;
}
export default Privacy;
