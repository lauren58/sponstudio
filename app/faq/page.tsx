"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const faqs = {
  podcasters: [
    {
      q: "How do I list my podcast on SponStudio?",
      a: "Click 'Join free' in the navigation and select 'List my podcast'. Fill in your show details, audience stats and ad formats. You will need to verify your email address before your application is submitted. Your listing will then be reviewed by our team and you will receive an email within 2 to 3 business days once it is approved. You cannot log in until your email has been verified."
    },
    {
      q: "Is it free to list my podcast?",
      a: "Yes. Listing your podcast on SponStudio is completely free, always. We never charge podcasters to be on the platform."
    },
    {
      q: "What does SponStudio actually do?",
      a: "SponStudio is a discoverability tool, not a campaign manager. We connect you with brands who are interested in working with you. Once a brand accepts your connection request and you receive their contact details, the conversation, negotiation and campaign management happen directly between you and the brand. No money exchanges through SponStudio and we do not take a commission on any deals you make."
    },
    {
      q: "What listener stats do I need to provide?",
      a: "We ask for a monthly listens range rather than exact numbers. Listens can include downloads, streams, Spotify plays, YouTube views and live streams, whatever makes up your total reach. All stats are self-reported and labelled as such on your profile."
    },
    {
      q: "Can I list multiple shows?",
      a: "Yes. Once your first show is approved you can add more shows from the 'My profile' menu. Each show gets its own listing. You can also create a bundle listing if you want to sell sponsorship across multiple shows as a package."
    },
    {
      q: "What is a bundle listing?",
      a: "A bundle listing lets you combine multiple shows into a single listing so brands can sponsor across your entire network in one deal. Go to 'My listings' and click 'Create a bundle' to get started. You can also hide individual show listings from the browse page so only your bundle appears, while still including those shows in the bundle stats. This is useful if you prefer to sell your network as a package rather than show by show."
    },
    {
      q: "How do I hide a listing from the browse page?",
      a: "Go to 'Edit my profile', select the show you want to hide, and scroll to the Visibility section at the bottom. Toggle the hide option to remove it from the browse page. Hidden shows can still be included in a bundle listing and their stats will still count toward the combined reach."
    },
    {
      q: "How do connection requests work?",
      a: "When a brand is interested in your show they will send you a connection request. You will receive an email notification and can log in to your dashboard to accept or decline. If you accept, the brand will receive your contact email so they can reach out directly."
    },
    {
      q: "Do I have to respond to every connection request?",
      a: "You are not obligated to accept every request, but we encourage you to respond promptly. Brands who do not hear back within a few days may move on to other shows."
    },
    {
      q: "Can I edit my listing after it is approved?",
      a: "Yes. Go to 'My profile' in the navigation and select 'Edit my profile'. Changes save directly to your listing. If you have multiple shows you can switch between them using the dropdown at the top of the editor."
    },
    {
      q: "Why are my listener stats not visible to everyone?",
      a: "Listener stats, audience demographics and rates are only visible to verified brand accounts logged in with a company email. This protects your data and ensures only serious buyers can see your numbers."
    },
    {
      q: "Can I delete my listing or account?",
      a: "Yes. To delete an individual listing, go to 'Edit my profile' and scroll to the bottom. To delete your entire account, go to 'My profile' and select 'Delete account'."
    },
  ],
  brands: [
    {
      q: "How do I create a brand account?",
      a: "Click 'Join free' in the navigation and select 'I am a brand'. Fill in your company details and confirm your email. Once your account is created you can browse the full marketplace and unlock listener stats immediately."
    },
    {
      q: "Is SponStudio free for brands?",
      a: "Yes. SponStudio is free for brands during our early access period. We do not charge a commission or take a cut of any deals made through the platform. Pricing may be introduced in future as the platform grows, but we will always give users notice before any changes."
    },
    {
      q: "What does SponStudio actually do?",
      a: "SponStudio is a discoverability tool. We help you find and connect with indie podcasters. Once a podcaster accepts your connection request you will receive their contact details and can take the conversation directly from there. No money exchanges through SponStudio and we are not involved in campaign management or execution."
    },
    {
      q: "How do I find the right podcast for my brand?",
      a: "Use the search bar and filters on the browse page to narrow down by category, audience location and ad format. Sign in to unlock full listener stats and audience demographics for each show."
    },
    {
      q: "What does a connection request do?",
      a: "A connection request lets a podcaster know you are interested in working with them. If they accept, you will receive an email with their contact details so you can reach out directly to discuss rates and campaign details."
    },
    {
      q: "What is the media plan?",
      a: "The media plan lets you save multiple shows and see a combined reach report, including total listens, audience locations and ad formats across all saved shows. You can also send connection requests to all saved shows at once."
    },
    {
      q: "How do I send a campaign brief to a podcaster?",
      a: "Use the Campaign Brief Builder under 'Resources' in the navigation. Fill in your campaign details and download a professional PDF brief to share with podcasters directly. You can save multiple briefs and come back to them anytime."
    },
    {
      q: "Are listener stats verified?",
      a: "Listener stats are self-reported by podcasters and reviewed by the SponStudio team before listings go live. They may include a combination of downloads, streams, Spotify plays, YouTube views and live streams. We recommend asking podcasters for a media kit and post-campaign report for full transparency."
    },
    {
      q: "What ad formats are available?",
      a: "Available formats vary by show and include pre-roll, mid-roll, sponsored segment, product placement, native episode and social amplification. Each podcast listing shows which formats they offer."
    },
    {
      q: "Can I work with podcasters outside Australia?",
      a: "Yes. SponStudio features podcasts from Australia, New Zealand, the US, Canada, the UK, Europe and other regions. You can filter by audience location to find shows that reach your target market."
    },
    {
      q: "Can I delete my brand account?",
      a: "Yes. Go to 'Brand account' in the navigation and select 'Delete account'. This will permanently remove your account and all associated data from SponStudio."
    },
  ],
};

export default function FAQ() {
  const [tab, setTab] = useState<"podcasters" | "brands">("podcasters");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>Help</div>
        <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "16px" }}>Frequently asked questions</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "48px" }}>Everything you need to know about using SponStudio. Can't find what you're looking for? Email us at <a href="mailto:hello@sponstudio.com" style={{ color: "#FF7C6F", textDecoration: "none", fontWeight: "600" }}>hello@sponstudio.com</a>.</p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#EFEFED", borderRadius: "8px", padding: "4px", marginBottom: "40px", width: "fit-content" }}>
          {(["podcasters", "brands"] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setOpenIndex(null); }} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", padding: "10px 24px", borderRadius: "6px", border: "none", cursor: "pointer", background: tab === t ? "#FFFFFF" : "transparent", color: tab === t ? "#00215e" : "#6B6B6B", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              {t === "podcasters" ? "For podcasters" : "For brands"}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {faqs[tab].map((faq, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: i === 0 ? "12px 12px 0 0" : i === faqs[tab].length - 1 ? "0 0 12px 12px" : "0", overflow: "hidden" }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", paddingRight: "16px" }}>{faq.q}</span>
                <span style={{ color: "#FF7C6F", fontSize: "20px", flexShrink: 0 }}>{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#FFF0EE", borderRadius: "12px", padding: "28px", marginTop: "48px", textAlign: "center" }}>
          <p style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Still have questions?</p>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>We're here to help. Send us a message and we'll get back to you.</p>
          <a href="mailto:hello@sponstudio.com" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "12px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Contact us</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
