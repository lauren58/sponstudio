"use client";

import { useState } from "react";

const templates = [
  {
    id: 1,
    title: "Media kit template",
    description: "A professionally structured media kit template covering your show overview, audience demographics, reach across all platforms, ad formats, rates and past sponsors. Everything a brand needs to evaluate your show in one document.",
    includes: [
      "Show overview and description",
      "Audience demographics and location breakdown",
      "Monthly listens and platform breakdown",
      "Ad formats offered and rates",
      "Previous sponsors and campaign examples",
      "Contact information",
    ],
    format: "Canva template",
    comingSoon: true,
  },
  {
    id: 2,
    title: "Post-campaign report template",
    description: "A clear, professional report to send brands after a campaign wraps. Shows what was delivered, how it performed against guarantees, audience sentiment and platform highlights. Makes you look like a pro and sets you up for repeat bookings.",
    includes: [
      "Campaign overview and deliverables",
      "Minimum guarantees vs actuals delivered",
      "Platform breakdown (YouTube, RSS, social media)",
      "Audience sentiment and comments",
      "Key highlights and wins",
    ],
    format: "Canva template",
    comingSoon: true,
  },
];

const guides = [
  {
    title: "How to set your rates",
    desc: "Not sure what to charge? We break down how to think about your rates based on your audience size, engagement, and ad format — and why listing them (even as a starting point) helps you attract better brand fits.",
  },
  {
    title: "What brands actually want",
    desc: "A breakdown of what brands look for when evaluating a podcast for sponsorship — and how to make sure your profile and media kit speaks their language.",
  },
  {
    title: "How to talk about your audience",
    desc: "Downloads are just one piece of the puzzle. Here is how to present your full reach across YouTube, Spotify, TikTok and social in a way that resonates with brands.",
  },
  {
    title: "Your first sponsor: what to expect",
    desc: "Never worked with a brand before? Here is a plain-English walkthrough of how a typical podcast sponsorship works from first contact to post-campaign report.",
  },
];

export default function PodcasterResources() {
  const [requested, setRequested] = useState<Record<number, boolean>>({});

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <nav style={{ background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
            <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="/browse" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>Browse</a>
          <a href="/about" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>About</a>
          <a href="/login" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>Log in</a>
          <a href="/signup" style={{ fontSize: "14px", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", padding: "10px 22px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            Join free
          </a>
        </div>
      </nav>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 48px 40px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
          For podcasters
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "16px" }}>
          Free resources for podcasters
        </h1>
        <p style={{ fontSize: "16px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "600px" }}>
          Everything you need to present yourself professionally to brands, run a smooth campaign, and report on results — built from our own experience working with brands at Centennial World.
        </p>
      </section>

      {/* Templates */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 60px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px", letterSpacing: "-0.3px" }}>
          Templates
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: "24px" }}>
          {templates.map((template) => (
            <div key={template.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "36px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>
                  {template.title}
                </h3>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px", fontFamily: "var(--font-sans)", whiteSpace: "nowrap", marginLeft: "12px" }}>
                  {template.format}
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "24px" }}>
                {template.description}
              </p>
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "12px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
                  What's included
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {template.includes.map((item) => (
                    <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "#FF7C6F", fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>✦</span>
                      <span style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "auto" }}>
                {template.comingSoon ? (
                  requested[template.id] ? (
                    <div style={{ background: "#EAF3DE", border: "1px solid #97C459", borderRadius: "6px", padding: "12px 16px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#27500A", fontFamily: "var(--font-sans)" }}>
                        ✓ You'll be notified when this template is ready!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", marginBottom: "12px" }}>
                        <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
                          ✦ This template is coming soon. Notify me when it's ready.
                        </p>
                      </div>
                      <button
                        onClick={() => setRequested((r) => ({ ...r, [template.id]: true }))}
                        style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px", cursor: "pointer" }}
                      >
                        Notify me when ready
                      </button>
                    </div>
                  )
                ) : (
                  <button
                    style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px", cursor: "pointer" }}
                  >
                    Download free template →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}

      <footer style={{ background: "#FAFAF8", borderTop: "1px solid #EFEFED", padding: "40px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
              <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
            </span>
            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px" }}>
              Built by <a href="https://centennialworld.com" style={{ color: "#6B6B6B", textDecoration: "underline" }}>Centennial World Podcast Network</a>
            </p>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            <a href="/browse" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>Browse</a>
            <a href="/about" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>About</a>
            <a href="/signup?role=podcaster" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>List my podcast</a>
            <a href="/signup/brand" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>For brands</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
