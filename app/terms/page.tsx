import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Last updated: May 2026</p>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Terms of Service</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "48px" }}>Please read these terms carefully before using SponStudio. By creating an account, you agree to be bound by these terms.</p>

        {[
          {
            title: "1. About SponStudio",
            body: "SponStudio is a podcast advertising marketplace operated by Centennial World Podcast Network. We provide a platform that connects independent podcasters with brands and advertisers. SponStudio is not an advertising agency and does not facilitate, negotiate or guarantee any commercial arrangements between podcasters and brands."
          },
          {
            title: "2. Eligibility",
            body: "You must be at least 18 years of age to create an account on SponStudio. By registering, you confirm that the information you provide is accurate and that you have the authority to act on behalf of any business or organisation you represent."
          },
          {
            title: "3. Podcaster listings",
            body: "Podcasters may apply to list their show on SponStudio for free. All applications are reviewed by the SponStudio team before going live. SponStudio reserves the right to approve, reject or remove any listing at any time, for any reason, without being required to disclose the reason for that decision. Approval of a listing does not constitute an endorsement of the podcast or its content. Listener statistics and audience data submitted by podcasters are self-reported and SponStudio does not independently verify this information. Podcasters are responsible for ensuring their listings are accurate and up to date."
          },
          {
            title: "4. Brand accounts",
            body: "Brands may create an account to browse the SponStudio marketplace and connect with podcasters. Brand accounts require a valid company email address. SponStudio reserves the right to verify, suspend or remove brand accounts at its discretion. Brands are responsible for conducting their own due diligence before entering into any commercial arrangement with a podcaster."
          },
          {
            title: "5. Connection requests",
            body: "The connection request feature allows brands to express interest in working with a podcaster. If a podcaster accepts a connection request, their contact email will be shared with the requesting brand. SponStudio is not a party to any subsequent commercial arrangement and accepts no liability for any disputes, failed campaigns or financial losses arising from connections made through the platform."
          },
          {
            title: "6. Prohibited conduct",
            body: "You must not use SponStudio to submit false, misleading or fraudulent information. You must not use the platform to spam, harass or contact other users outside of the platform's intended purpose. You must not attempt to circumvent the platform by making direct contact with users discovered through SponStudio for purposes unrelated to podcast advertising."
          },
          {
            title: "7. Intellectual property",
            body: "All content on SponStudio, including design, copy and code, is owned by Centennial World Podcast Network. Podcasters and brands retain ownership of the content they submit to the platform but grant SponStudio a non-exclusive licence to display that content on the platform."
          },
          {
            title: "8. Limitation of liability",
            body: "SponStudio is provided on an 'as is' basis. To the fullest extent permitted by law, Centennial World Podcast Network disclaims all warranties and accepts no liability for any loss or damage arising from your use of the platform, including any commercial arrangements made between users."
          },
          {
            title: "9. Changes to these terms",
            body: "We may update these terms from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated terms."
          },
          {
            title: "10. Contact",
            body: "If you have any questions about these terms, please contact us at hello@sponstudio.com."
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>{section.title}</h2>
            <p style={{ fontSize: "15px", color: "#4A4A4A", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>{section.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
