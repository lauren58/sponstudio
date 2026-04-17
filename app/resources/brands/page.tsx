"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const adFormats = [
  { title: "Host-read ad", tag: "Most common", tagColor: "#FF7C6F", desc: "The host reads your ad in their own words, in their own voice, as part of the episode. This is the most trusted format in podcasting because listeners hear it as a genuine recommendation from someone they already trust. Host-read ads are burned in to the episode permanently.", bestFor: "Brand awareness, trust-building, long-term recall", notFor: "Last-click attribution or direct sales tracking" },
  { title: "Native episode", tag: "Highest impact", tagColor: "#00215e", desc: "The brand sponsors an entire episode built around a topic relevant to both the show and the brand. The product or message is woven naturally into the content rather than read as a separate ad.", bestFor: "Deep brand integration, storytelling, audience education", notFor: "Quick turnarounds or highly scripted messaging" },
  { title: "Sponsored segment", tag: "Flexible", tagColor: "#6B6B6B", desc: "A defined section of the episode is sponsored by your brand. The host introduces the segment as sponsored and integrates your messaging naturally within it.", bestFor: "Mid-funnel brand consideration, recurring sponsorships", notFor: "Brands that need full content control" },
  { title: "Product placement", tag: "Video only", tagColor: "#BA7517", desc: "Your product appears on screen during a video podcast episode. Works best for visually compelling products and video-first shows with strong YouTube presence.", bestFor: "Visual products, lifestyle brands, video-first audiences", notFor: "Audio-only shows or non-visual products" },
  { title: "Social amplification", tag: "Add-on", tagColor: "#534AB7", desc: "The podcaster creates short-form content clipped from the episode and posts it to their social channels with your brand featured.", bestFor: "Extending reach, reaching younger audiences, driving awareness", notFor: "Brands without strong visual or social-friendly messaging" },
];

const briefGuide = [
  { step: "01", title: "Define your objective", desc: "Be clear about what you want the campaign to achieve. Brand awareness? Product consideration? Event promotion? Your objective shapes everything." },
  { step: "02", title: "Describe your product clearly", desc: "Give the podcaster everything they need to talk about your product authentically. Key features, what makes it different, what you want the audience to feel or do." },
  { step: "03", title: "Share your target audience", desc: "Who are you trying to reach? Age, gender, location, interests, behaviours. The more specific you are, the better the podcaster can tailor the integration." },
  { step: "04", title: "Set your dos and don'ts", desc: "Are there competitor brands that should not be mentioned? Specific claims you cannot make? Messaging you want included? Be clear upfront." },
  { step: "05", title: "Agree on guarantees", desc: "Work with the podcaster to set minimum guarantees for listens and impressions. This gives you a clear benchmark for the post-campaign report." },
  { step: "06", title: "Allow one round of edits", desc: "Build in one round of content approval before the episode goes live. Trust the host to interpret your brief in a way that resonates with their audience." },
];

export default function BrandResources() {
  const [authState, setAuthState] = useState<"loading" | "unauthorized" | "wrong-role" | "authorized">("loading");
  const [openFormat, setOpenFormat] = useState<number | null>(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setAuthState("unauthorized"); return; }

      const { data: brandData } = await supabase.from("brands").select("id").eq("user_id", session.user.id).single();
      if (brandData) { setAuthState("authorized"); return; }

      setAuthState("wrong-role");
    };
    checkAuth();
  }, []);

  if (authState === "loading") {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (authState === "unauthorized") {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "24px" }}>🔒</div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Sign in to access resources</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>Brand resources are only available to logged-in brand accounts.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
            <a href="/signup/brand" style={{ background: "#FFFFFF", color: "#00215e", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", border: "1px solid #EFEFED", fontFamily: "var(--font-sans)" }}>Create a brand account</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (authState === "wrong-role") {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "24px" }}>✦</div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>These resources are for brands</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>You're logged in as a podcaster. Looking for podcaster resources?</p>
          <a href="/resources/podcasters" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Go to podcaster resources →</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 48px 40px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>For brands</div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "16px" }}>
          How to buy podcast advertising
        </h1>
        <p style={{ fontSize: "16px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "620px" }}>
          Buying podcast advertising directly from a creator is different to other ways you might buy media. This is what you need to know to do it well.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ background: "#00215e", borderRadius: "16px", padding: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>The most important thing to understand</div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-sans)", letterSpacing: "-0.5px", marginBottom: "16px", lineHeight: "1.2" }}>
            Are host-read ads a media buy or a content play? Often both.
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "16px" }}>
            Direct host-read podcast advertising sits at the intersection of paid media and branded content — and understanding the difference matters for your internal budget conversations.
          </p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "16px" }}>
            A standard host-read ad or pre-roll is closer to a traditional media placement. A native episode, a branded series, or a long-term ambassador partnership is a creative content investment. The host is not just reading your message — they are building a story around your brand in their own voice, creating an asset that lives on their channel indefinitely.
          </p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
            If you are unsure which team should own this internally, ask yourself: are we buying a placement, or are we commissioning content?
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginBottom: "60px" }}>
          {[
            { title: "You are buying trust, not clicks", desc: "Podcast listeners have a deep, parasocial relationship with their favourite hosts. When a host recommends your brand, it carries the weight of a personal endorsement. That trust shows up in brand recall and long-term purchasing behaviour." },
            { title: "Host-read ads are burned in forever", desc: "Unlike programmatic ads that disappear when your budget runs out, a burned-in host-read ad lives inside the episode permanently. An episode published today will still carry your ad in five years. You are buying a permanent placement, not a fleeting impression." },
            { title: "How to measure success", desc: "Direct podcast campaigns can be both a top-of-funnel and bottom-of-funnel play. The right metrics are listens, impressions and audience sentiment — not click-through rates. If you want a conversion signal, give the podcaster a unique promo code or trackable URL for the episode description." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px", letterSpacing: "-0.5px" }}>Understanding ad formats</h2>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "28px", lineHeight: "1.7" }}>Podcast advertising is not one-size-fits-all. Here is what each format means and when to use it.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "60px" }}>
          {adFormats.map((format, i) => (
            <div key={format.title} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: i === 0 ? "12px 12px 0 0" : i === adFormats.length - 1 ? "0 0 12px 12px" : "0", overflow: "hidden" }}>
              <button onClick={() => setOpenFormat(openFormat === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{format.title}</span>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#FFFFFF", background: format.tagColor, borderRadius: "4px", padding: "3px 10px", fontFamily: "var(--font-sans)" }}>{format.tag}</span>
                </div>
                <span style={{ color: "#6B6B6B", fontSize: "18px" }}>{openFormat === i ? "−" : "+"}</span>
              </button>
              {openFormat === i && (
                <div style={{ padding: "0 28px 24px" }}>
                  <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "20px" }}>{format.desc}</p>
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

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px", letterSpacing: "-0.5px" }}>How to write a good brief</h2>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px", lineHeight: "1.7" }}>A clear brief makes for a better campaign. Here is what to include.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
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

        <div style={{ background: "#FF7C6F", borderRadius: "16px", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)", marginBottom: "8px", fontStyle: "italic", letterSpacing: "-0.5px" }}>Ready to find your show?</h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)" }}>Browse indie podcasts across every niche, size and location.</p>
          </div>
          <a href="/browse" style={{ background: "#FFFFFF", color: "#FF7C6F", textDecoration: "none", fontWeight: "700", fontSize: "14px", padding: "13px 28px", borderRadius: "6px", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>Browse podcasts →</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
