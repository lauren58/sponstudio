"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DemoPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>Platform Demo</div>
          <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "16px", lineHeight: "1.1" }}>Welcome to SponStudio</h1>
          <p style={{ fontSize: "16px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "600px" }}>
            SponStudio is a free podcast advertising marketplace connecting independent Australian podcasters with brands and advertisers of any size and budget. This page gives you full access to both sides of the platform.
          </p>
        </div>

        {/* Two cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "48px" }}>

          {/* Brand view */}
          <div style={{ background: "#00215e", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>For Brands & Agencies</div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)", letterSpacing: "-0.5px", lineHeight: "1.2" }}>Browse the marketplace as a brand</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
              See the full brand experience — browse all podcasts, unlock listener stats, audience demographics, rates and ad formats. Filter by category and location.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Full listener stats visible","Audience demographics unlocked","Filter by category and location","Save shows to a media plan","Send connection requests"].map((item) => (
                <li key={item} style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FF7C6F", fontWeight: "700" }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href="/browse?demo=newsinnovation2026" style={{ display: "inline-block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "700", fontSize: "14px", padding: "14px 24px", borderRadius: "8px", fontFamily: "var(--font-sans)", textAlign: "center", marginTop: "8px" }}>
              Explore as a brand →
            </a>
          </div>

          {/* Podcaster view */}
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>For Podcasters</div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px", lineHeight: "1.2" }}>See what podcasters experience</h2>
            <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
              Explore the podcaster signup flow, profile editor and dashboard. See how podcasters list their shows, manage connection requests and access professional tools.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Free podcast listing signup","Profile editor and cover art","Connection request dashboard","Media kit builder","Post-campaign report template"].map((item) => (
                <li key={item} style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FF7C6F", fontWeight: "700" }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href="/signup?demo=newsinnovation2026" style={{ display: "inline-block", background: "#00215e", color: "#FFFFFF", textDecoration: "none", fontWeight: "700", fontSize: "14px", padding: "14px 24px", borderRadius: "8px", fontFamily: "var(--font-sans)", textAlign: "center", marginTop: "8px" }}>
              Explore as a podcaster →
            </a>
          </div>
        </div>

        {/* About section */}
        <div style={{ background: "#FFF0EE", border: "1px solid #FFD4CC", borderRadius: "16px", padding: "32px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "16px" }}>About this demo</h3>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "12px" }}>
            This is a working prototype of SponStudio, currently in a controlled testing phase with real podcasters and brands. The platform is fully functional — all listings, connection requests and commercial tools shown are live and in active use.
          </p>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
            SponStudio is operated by Centennial World, an independent Australian digital news organisation producing current affairs, technology policy and social issues journalism for Gen Z audiences. This demo has been provided for assessment purposes as part of the News Innovation Fund grant application.
          </p>
        </div>

        {/* Key features grid */}
        <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px", letterSpacing: "-0.3px" }}>Key platform features</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "48px" }}>
          {[
            { title: "Curated marketplace", body: "Every podcast listing is reviewed by the SponStudio team before going live." },
            { title: "Gated audience data", body: "Full listener stats and demographics are only visible to verified brand accounts." },
            { title: "Direct connections", body: "Brands send connection requests. Podcasters accept or decline. Contact details shared on acceptance." },
            { title: "Media plan", body: "Brands save multiple shows and see a combined reach report across their shortlist." },
            { title: "Bundle listings", body: "Podcast networks can bundle multiple shows into a single sponsorship package." },
            { title: "Professional tools", body: "Media kit builder, post-campaign report and campaign brief builder built in for all users." },
          ].map((feature) => (
            <div key={feature.title} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>{feature.title}</p>
              <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>{feature.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "32px", background: "#00215e", borderRadius: "16px" }}>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Questions about the platform?</p>
          <a href="mailto:hello@sponstudio.com" style={{ color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>hello@sponstudio.com</a>
        </div>

      </div>
      <Footer />
    </div>
  );
}
