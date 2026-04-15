"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

const adFormats = [
  {
    title: "Host-read ad",
    tag: "Most common",
    tagColor: "#FF7C6F",
    desc: "The host reads your ad in their own words, in their own voice, as part of the episode. This is the most trusted format in podcasting because listeners hear it as a genuine recommendation from someone they already trust. Most host-read ads purchased directly from the creator are burned in to the episode permanently.",
    bestFor: "Brand awareness, trust-building",
    notFor: "One-off sponsorship campaigns",
  },
  {
    title: "Native episode",
    tag: "Highest impact",
    tagColor: "#00215e",
    desc: "The brand sponsors an entire episode built around a topic relevant to both the show and the brand. The product or message is woven naturally into the content rather than read as a separate ad. Think of it as branded content that the audience actually wants to listen to. Sponsorship disclosure is still necessary here.",
    bestFor: "Deep brand integration, storytelling, audience education",
    notFor: "Quick turnarounds or highly scripted brand messaging",
  },
  {
    title: "Sponsored segment",
    tag: "Flexible",
    tagColor: "#6B6B6B",
    desc: "A defined section of the episode is sponsored by your brand. The host introduces the segment as sponsored and integrates your messaging naturally within it. Less commitment than a full native episode but more integrated than a standard ad-read.",
    bestFor: "Mid-to-bottom funnel brand consideration",
    notFor: "Brands that need full content control",
  },
  {
    title: "Product placement",
    tag: "Video only",
    tagColor: "#BA7517",
    desc: "Your product appears on screen during a video podcast episode. The host may reference it naturally or it may simply sit on screen behind, beside, or in front of them. Works best for video-first shows with strong YouTube and Spotify video presence.",
    bestFor: "Visual products, lifestyle brands, video-first audiences",
    notFor: "Audio-only shows or non-visual products",
  },
  {
    title: "Social amplification",
    tag: "Add-on",
    tagColor: "#534AB7",
    desc: "The podcaster creates short-form content clipped from the episode and posts it to their social channels with your brand featured. Extends the reach of your podcast campaign beyond the RSS feed.",
    bestFor: "Extending reach, integrated media campaigns with social deliverables",
    notFor: "Shows that don't produce creative soical",
  },
];

const roiGuide = [
  {
    title: "You are buying trust",
    desc: "Podcast listeners have a deep, parasocial relationship with their favourite hosts. When a host recommends your brand, it carries the weight of a personal endorsement from someone their audience chooses to spend hours a week listening to. That trust shows up in brand recall and long-term purchasing behaviour.",
  },
  {
    title: "Host-read ads are burned in forever",
    desc: "Unlike programmatic ads that disappear when your budget runs out, a burned-in host-read ad lives inside the episode permanently. An episode published today will still carry your ad in five years. And as the podcast grows, every new listener will hear it. You are buying a permanent placement, not a fleeting impression.",
  },
  {
    title: "How to measure success",
    desc: "Direct podcast campaigns can be both a top-of-funnel and bottom-of-funnel play. If you're in the early stages of testing podcast advertising for your brand, we recommend measuring success based on listens, impressions and audience sentiment. If you want a conversion signal, give the podcaster a unique promo code or trackable URL for the episode description.",
  },
];

const briefGuide = [
  { step: "01", title: "Define your objective", desc: "Be clear about what you want the campaign to achieve. Brand awareness? Product consideration? Click-throughs? Your objective will shape how the podcaster responds to your request." },
  { step: "02", title: "Describe your product clearly", desc: "Give the podcaster everything they need to talk about your product authentically. Key features, what makes it different, what you want the audience to feel or do after hearing about it." },
  { step: "03", title: "Share your target audience", desc: "Who are you trying to reach? Age, gender, location, interests, behaviours. The more specific you are, the better the podcaster can tailor the integration to resonate with their audience." },
  { step: "04", title: "Set your dos and don'ts", desc: "Are there competitor brands that should not be mentioned? Specific claims you cannot make? Messaging you want included? Be clear upfront to streamline the content approval process." },
  { step: "05", title: "Agree on deliverables", desc: "Work with the podcaster to set minimum guarantees for listens and impressions. This gives you a clear benchmark for the post-campaign report and ensures both sides are aligned on expectations." },
  { step: "06", title: "Allow one round of edits", desc: "Build in one round of script approval before the podcaster gets on mic. Trust the host to interpret your brief in a way that resonates with their audience, but requesting approval on the ad-read copy or native brand integration is standard." },
];

export default function BrandResources() {
  const [openFormat, setOpenFormat] = useState<number | null>(0);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <Nav />

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 48px 40px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
          For brands
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "16px" }}>
          How to buy podcast advertising
        </h1>
        <p style={{ fontSize: "16px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "620px" }}>
          Buying podcast advertising directly from a creator is different to other ways you might buy media or partner on branded content. This is what you need to know to do it well.
        </p>
      </section>

      {/* ROI reframe */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ background: "#00215e", borderRadius: "16px", padding: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
            The most important thing to understand
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-sans)", letterSpacing: "-0.5px", marginBottom: "16px", lineHeight: "1.2" }}>
            Podcast ads can be a media buy or a content play.
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
           Direct host-read podcast advertising sits at the intersection of paid media and branded content. Read on to understand where different formats sit within your marketing strategy.


          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {roiGuide.map((item) => (
            <div key={item.title} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "10px", letterSpacing: "-0.3px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad formats */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 60px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          Understanding ad formats
        </h2>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "28px", lineHeight: "1.7" }}>
          Podcast advertising is not one-size-fits-all. Here is what each format means and when to use it.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {adFormats.map((format, i) => (
            <div key={format.title} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: i === 0 ? "12px 12px 0 0" : i === adFormats.length - 1 ? "0 0 12px 12px" : "0", overflow: "hidden" }}>
              <button
                onClick={() => setOpenFormat(openFormat === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{format.title}</span>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#FFFFFF", background: format.tagColor, borderRadius: "4px", padding: "3px 10px", fontFamily: "var(--font-sans)" }}>{format.tag}</span>
                </div>
                <span style={{ color: "#6B6B6B", fontSize: "18px" }}>{openFormat === i ? "−" : "+"}</span>
              </button>
              {openFormat === i && (
                <div style={{ padding: "0 28px 24px" }}>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "20px" }}>
                    {format.desc}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ background: "#EAF3DE", borderRadius: "8px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#27500A", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Best for</p>
                      <p style={{ fontSize: "13px", color: "#27500A", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>{format.bestFor}</p>
                    </div>
                    <div style={{ background: "#FCEBEB", borderRadius: "8px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#A32D2D", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Not ideal for</p>
                      <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>{format.notFor}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Brief guide */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 100px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          How to write a good brief
        </h2>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px", lineHeight: "1.7" }}>
          A clear brief makes for a better campaign. Here is what to include.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {briefGuide.map((item) => (
            <div key={item.step} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px", display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#FF7C6F", fontFamily: "var(--font-sans)", letterSpacing: "1px", flexShrink: 0, paddingTop: "2px" }}>{item.step}</span>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#FF7C6F", borderRadius: "16px", padding: "40px 48px", marginTop: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)", marginBottom: "8px", fontStyle: "italic", letterSpacing: "-0.5px" }}>
              Ready to find your show?
            </h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)" }}>
              Browse indie podcasts across every niche, size and location.
            </p>
          </div>
          <a href="/browse" style={{ background: "#FFFFFF", color: "#FF7C6F", textDecoration: "none", fontWeight: "700", fontSize: "14px", padding: "13px 28px", borderRadius: "6px", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
            Browse podcasts →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
