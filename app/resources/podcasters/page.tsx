"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    comingSoon: false,
  },
  {
    id: 2,
    title: "Post-campaign report template",
    description: "A clear, professional report to send brands after a campaign wraps. Shows what was delivered, how it performed against guarantees, audience sentiment and platform highlights. Makes you look like a pro and sets you up for repeat bookings.",
    includes: [
      "Campaign overview and deliverables",
      "Minimum guarantees vs actuals delivered",
      "Platform breakdown (Spotify, YouTube, RSS)",
      "Impressions and listens achieved",
      "Audience sentiment and comments",
      "Key highlights and wins",
    ],
    format: "Canva template",
    comingSoon: true,
  },
];

export default function PodcasterResources() {
  const [authState, setAuthState] = useState<"loading" | "unauthorized" | "wrong-role" | "authorized">("loading");
  const [requested, setRequested] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setAuthState("unauthorized"); return; }

      const { data: podcasterData } = await supabase.from("podcasters").select("id").eq("user_id", session.user.id).single();
      if (podcasterData) { setAuthState("authorized"); return; }

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
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>Podcaster resources are only available to logged-in podcaster accounts.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
            <a href="/signup" style={{ background: "#FFFFFF", color: "#00215e", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", border: "1px solid #EFEFED", fontFamily: "var(--font-sans)" }}>Create a podcaster account</a>
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
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>These resources are for podcasters</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>You're logged in as a brand. Looking for brand resources?</p>
          <a href="/resources/brands" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Go to brand resources →</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

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

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 100px" }}>
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
                {requested[template.id] ? (
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
                    {template.id === 1 ? (
                      <a href="/resources/podcasters/media-kit" style={{ display: "block", width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", borderRadius: "6px", padding: "13px", cursor: "pointer", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
                        Build my media kit →
                      </a>
                    ) : (
                      <button
                        onClick={() => setRequested((r) => ({ ...r, [template.id]: true }))}
                        style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px", cursor: "pointer" }}
                      >
                        Notify me when ready
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
