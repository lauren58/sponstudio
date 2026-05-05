import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Last updated: May 2026</p>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Terms of Service</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "48px" }}>Please read these terms carefully before using SPONSTUDIO. By creating an account or accessing the platform, you agree to be bound by these terms and conditions. Your statutory rights under the Australian Consumer Law are not waived by any provision in these terms.</p>

        {[
          {
            title: "1. Definitions and interpretation",
            body: `In these Terms of Service, unless the context otherwise requires:

User means any person or entity that creates an account or otherwise uses the platform, including podcasters and brands.
Podcaster means a User who applies to list their podcast for advertising opportunities on the platform.
Brand means a User, organisation, or entity seeking to connect with Podcasters for the purpose of podcast advertising.
Platform means SPONSTUDIO, operated by CENTENNIAL BEAUTY PTY LTD ACN 54 657 154 213.
Content means all data, text, audio, images, logos and other materials submitted, uploaded, or otherwise provided by Users to the Platform.
Connection Request means a feature whereby Brands may express interest in collaborating with a Podcaster, and, upon acceptance, are provided the Podcaster's contact information.
Intellectual Property means all present and future rights conferred by statute, common law, or equity in relation to copyrights, trade marks, designs, patents, business names, domain names, database rights, confidential information, know-how and other results of intellectual activity, existing anywhere in the world, whether registered or not.
Australian Consumer Law means Schedule 2 of the Competition and Consumer Act 2010 (Cth).
Privacy Law means the Privacy Act 1988 (Cth) and any rules, codes or requirements made under it.
Terms means these Terms of Service, as amended from time to time.
Jurisdiction means New South Wales, Australia.`
          },
          {
            title: "2. About SponStudio",
            body: "SPONSTUDIO is a podcast advertising marketplace operated by CENTENNIAL BEAUTY PTY LTD. SPONSTUDIO provides a platform to connect independent Podcasters with Brands and Advertisers. SPONSTUDIO is not an advertising agency and does not facilitate, negotiate, or guarantee any commercial arrangements between Podcasters and Brands. The Platform acts solely as an introduction and communication service for podcast advertising."
          },
          {
            title: "3. Eligibility",
            body: `3.1 To create an account, Users must be at least eighteen (18) years of age and able to form legally binding agreements. By registering, Users:
— warrant that all information provided is true, accurate, current, and complete;
— have the authority to act on behalf of any business or organisation represented; and
— agree to update information promptly as changes occur.

3.2 The Platform reserves the right to verify User information and suspend, terminate, or refuse accounts at its sole discretion.`
          },
          {
            title: "4. Podcaster listings",
            body: `4.1 Podcasters may apply to list their show on SPONSTUDIO free of charge.

4.2 All applications are reviewed by the SPONSTUDIO team before going live. SPONSTUDIO reserves the right to approve, reject, or remove any listing at any time, for any reason, without being required to disclose the reasons for its decision.

4.3 Listing approval does not constitute endorsement, verification of content, or any representation by the Platform as to the quality or suitability of the podcast.

4.4 Listener statistics and audience data submitted by Podcasters are self-reported. SPONSTUDIO does not independently verify this information; Podcasters remain fully responsible for ensuring their listings are accurate and up-to-date.`
          },
          {
            title: "5. Brand accounts",
            body: `5.1 Brands may create an account to browse the SPONSTUDIO marketplace and connect with Podcasters.

5.2 Brand accounts require a valid company email address and may be subject to identity and eligibility verification.

5.3 SPONSTUDIO reserves the right to verify, suspend, or remove Brand accounts at its discretion, without obligation to explain its actions.

5.4 Brands are solely responsible for conducting their own due diligence before entering into any commercial arrangement with a Podcaster. SPONSTUDIO has no responsibility or liability in respect of any arrangements made between Users.`
          },
          {
            title: "6. Connection requests",
            body: `6.1 The Connection Request feature allows Brands to express interest in working with a Podcaster. If a Podcaster accepts a Connection Request, their contact email will be shared with the requesting Brand.

6.2 SPONSTUDIO is not a party to, and accepts no liability for, any subsequent commercial arrangement, dispute, failed campaign, or financial loss arising from Connections made through the Platform.

6.3 Users agree that SPONSTUDIO is not responsible for and shall not be subject to any claims, actions, damages, or liability relating to communications, arrangements, or outcomes between Users.`
          },
          {
            title: "7. Prohibited conduct",
            body: `7.1 Users must not use SPONSTUDIO to:
— submit false, misleading, or fraudulent information;
— spam, harass, or contact other Users outside of the Platform's intended purpose;
— attempt to circumvent the Platform by making direct contact with Users discovered through SPONSTUDIO for purposes unrelated to podcast advertising;
— violate any applicable law or regulation, including intellectual property, data privacy, or consumer protection laws;
— upload or transmit content that is defamatory, obscene, offensive, or infringes another's intellectual property or privacy rights.

7.2 Violation of these rules may result in immediate suspension or termination of account and removal of content, at the sole discretion of the Platform operator.`
          },
          {
            title: "8. Intellectual property",
            body: `8.1 All content on the Platform, including design, copy, software code and branding, is owned by CENTENNIAL BEAUTY PTY LTD. Users:
— retain ownership of Content they submit to the Platform;
— grant SPONSTUDIO a worldwide, non-exclusive, royalty-free licence to display, reproduce, modify, and communicate such Content on or in relation to the Platform and its promotional materials.

8.2 Users must not use, reproduce, or distribute any Platform content (other than their own Content) without the prior written consent of the Platform operator.

8.3 Nothing in these Terms transfers or assigns any Intellectual Property right to Users or third parties, except as expressly provided.`
          },
          {
            title: "9. Data privacy and confidentiality",
            body: `9.1 All personal information submitted to the Platform will be handled in accordance with the SPONSTUDIO Privacy Policy, and in compliance with the Privacy Act 1988 (Cth).

9.2 SPONSTUDIO will:
— take reasonable steps to protect personal information and comply with all applicable privacy and data protection laws;
— implement appropriate technical and organisational measures to guard against unauthorised access, use, or disclosure of personal information;
— notify Users of any data breach in accordance with mandatory notification requirements under the Privacy Act 1988 (Cth).

9.3 Users are responsible for maintaining the confidentiality of their account credentials and agree to promptly notify SPONSTUDIO of any unauthorised access or security incident.`
          },
          {
            title: "10. Limitation of liability and indemnity",
            body: `10.1 SPONSTUDIO is provided on an 'as is' and 'as available' basis. To the fullest extent permitted by law, CENTENNIAL BEAUTY PTY LTD:
— disclaims all warranties (express or implied), including merchantability, fitness for a particular purpose, accuracy of information, and non-infringement;
— does not warrant that the Platform will be error-free, uninterrupted, secure, or free from viruses or other harmful components.

10.2 To the extent permitted by law, the Platform operator shall not be liable for any indirect, consequential, incidental, or special losses, including but not limited to loss of commercial opportunity, loss of profit, or loss of goodwill, arising from use of the Platform or any commercial arrangements between Users.

10.3 Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any matter for which liability cannot be excluded or limited under applicable Australian law.

10.4 Users agree to indemnify and hold harmless the Platform operator from and against any and all claims, losses, liabilities, damages, costs, and expenses (including reasonable legal costs) arising from any breach of these Terms or violation of any applicable law or regulation.`
          },
          {
            title: "11. Changes to these terms",
            body: `11.1 SPONSTUDIO may update or modify these Terms of Service from time to time. Amendments will be effective upon posting to the Platform.

11.2 Continued use of the Platform after publication of amended Terms constitutes acceptance of those amendments. Users should review these Terms regularly to stay informed of any changes.`
          },
          {
            title: "12. Governing law and dispute resolution",
            body: `12.1 These Terms are governed by, and construed in accordance with, the laws of New South Wales, Australia.

12.2 The parties submit to the exclusive jurisdiction of the courts of that jurisdiction.

12.3 If any dispute arises in connection with these Terms or the Platform:
— the parties must use best endeavours to resolve the dispute by negotiation and good faith discussions;
— if the dispute is not resolved within twenty (20) days of notice, either party may refer the dispute to mediation administered by the Resolution Institute and conducted in accordance with its rules;
— unless otherwise agreed, mediation shall occur in Sydney, Australia;
— nothing in this clause prevents a party from seeking urgent interlocutory relief in any court of competent jurisdiction.`
          },
          {
            title: "13. Contact",
            body: "If you have any questions about these Terms or your use of the Platform, please contact us at hello@sponstudio.com."
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>{section.title}</h2>
            <p style={{ fontSize: "15px", color: "#4A4A4A", fontFamily: "var(--font-sans)", lineHeight: "1.8", whiteSpace: "pre-line" }}>{section.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
