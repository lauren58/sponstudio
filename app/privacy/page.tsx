import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Last updated: May 2026</p>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Privacy Policy</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "48px" }}>This policy explains what data we collect, how we use it and where it is stored. SponStudio is operated by Centennial World.</p>

        {[
          {
            title: "1. What data we collect",
            body: "When you create an account, we collect your name, email address and password. Podcasters also provide show details including listener statistics, audience demographics, social media handles and cover art. Brands provide company name, industry and campaign preferences. This information is used solely to operate the SponStudio platform."
          },
          {
            title: "2. How we use your data",
            body: "We use your data to create and manage your account, display your listing on the marketplace, facilitate connection requests between podcasters and brands, and send transactional emails such as account confirmation, approval notifications and connection request alerts. We do not sell your data to third parties. We do not use your data for advertising purposes."
          },
          {
            title: "3. Where your data is stored",
            body: "Your account and profile data is stored securely using Supabase, a database platform hosted on Amazon Web Services (AWS) infrastructure in the United States. Cover art and uploaded images are stored in Supabase Storage. Transactional emails are sent via Resend, an email delivery service based in the United States. By using SponStudio, you consent to your data being stored and processed in the United States."
          },
          {
            title: "4. Data sharing",
            body: "Your data is not shared with third parties except in the following circumstances: if you are a podcaster and you accept a connection request from a brand, your contact email address will be shared with that brand. If you are a brand and your connection request is accepted, the podcaster's contact email address will be shared with you. No other data is shared between users beyond what is displayed on the public marketplace."
          },
          {
            title: "5. Cookies",
            body: "SponStudio uses only essential cookies necessary to keep you logged in to your account. We do not use tracking cookies, advertising cookies or any third-party analytics that identify you personally. You can disable cookies in your browser settings, but this may affect your ability to log in to the platform."
          },
          {
            title: "6. Data retention",
            body: "We retain your data for as long as your account is active. If you would like your account and associated data deleted, please contact us at hello@sponstudio.com and we will process your request within 30 days."
          },
          {
            title: "7. Security",
            body: "We take reasonable steps to protect your data including encrypted password storage and secure HTTPS connections. However, no system is completely secure and we cannot guarantee the absolute security of your data."
          },
          {
            title: "8. Your rights",
            body: "You have the right to access, correct or delete the personal data we hold about you. To exercise these rights, please contact us at hello@sponstudio.com."
          },
          {
            title: "9. Changes to this policy",
            body: "We may update this privacy policy from time to time. We will notify you of significant changes by email or by a notice on the platform."
          },
          {
            title: "10. Contact",
            body: "If you have any questions about this privacy policy, please contact us at hello@sponstudio.com."
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
