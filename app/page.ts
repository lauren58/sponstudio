"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px 100px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px, 7vw, 76px)", fontWeight: "800", color: "#00215e", lineHeight: "1.05", letterSpacing: "-2px", marginBottom: "28px", fontFamily: "var(--font-display)" }}>
          Democratising<br />podcast advertising<br />
          <span style={{ color: "#FF7C6F", fontStyle: "italic" }}>for everyone.</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#6B6B6B", lineHeight: "1.8", maxWidth: "540px", margin: "0 auto 48px", fontFamily: "var(--font-sans)", fontWeight: "400" }}>
          No download minimums. No gatekeeping. SponStudio connects indie podcasts of any size with brands of any budget looking for authentic, niche voices.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/signup" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "16px 32px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            List my podcast →
          </a>
          <a href="/browse" style={{ background: "#FFFFFF", color: "#00215e", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "16px 32px", borderRadius: "6px", border: "1px solid #EFEFED", fontFamily: "var(--font-sans)" }}>
            Browse podcasts
          </a>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ borderTop: "1px solid #EFEFED" }} />
      </div>

      {/* For podcasters / brands split */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>

          {/* Podcasters */}
          <div style={{ padding: "48px 40px", background: "#FFFFFF", borderRadius: "16px", border: "1px solid #EFEFED" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px", fontFamily: "var(--font-sans)" }}>
              For podcasters
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: "700", color: "#00215e", marginBottom: "20px", letterSpacing: "-0.8px", lineHeight: "1.2", fontFamily: "var(--font-display)" }}>
              Your show deserves to make money — whatever your download count.
            </h2>
            <p style={{ fontSize: "15px", color: "#6B6B6B", lineHeight: "1.8", marginBottom: "32px", fontFamily: "var(--font-sans)" }}>
              Build a beautiful profile, set your rates or keep them private, and let the right brands find you. Free for podcasters, always.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Free profile, always", "You approve every connection", "Keep rates private if you prefer", "Download free report templates"].map(item => (
                <li key={item} style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#FF7C6F" }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href="/signup" style={{ display: "inline-block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              List my podcast →
            </a>
          </div>

          {/* Brands */}
          <div style={{ padding: "48px 40px", background: "#00215e", borderRadius: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px", fontFamily: "var(--font-sans)" }}>
              For brands
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px", letterSpacing: "-0.8px", lineHeight: "1.2", fontFamily: "var(--font-display)" }}>
              Niche podcast advertising shouldn't need a big budget.
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: "1.8", marginBottom: "32px", fontFamily: "var(--font-sans)" }}>
              Browse by niche, audience size and location. Connect directly with the right show. No agency fees, ever.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Free to browse and connect", "Filter by niche, size and location", "Send targeted briefs to matched shows", "No agency fees, ever"].map(item => (
                <li key={item} style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#FF7C6F" }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href="/browse" style={{ display: "inline-block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              Browse podcasts →
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "700", color: "#00215e", letterSpacing: "-1px", fontFamily: "var(--font-display)", marginBottom: "16px" }}>
            Simple by design.
          </h2>
          <p style={{ fontSize: "16px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>No complicated dashboards. No lengthy contracts.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            { step: "01", title: "Build your profile", desc: "Podcasters create a free profile with their show details, niche, audience size, ad formats and optional rates." },
            { step: "02", title: "Brands discover you", desc: "Brands browse the marketplace and send connection requests or targeted briefs to shows that match their needs." },
            { step: "03", title: "You stay in control", desc: "Podcasters approve every connection. Accept and your contact details are shared. Decline with zero awkwardness." },
          ].map((item) => (
            <div key={item.step} style={{ background: "#FFFFFF", padding: "36px", border: "1px solid #EFEFED", borderRadius: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", marginBottom: "12px", letterSpacing: "-0.5px", fontFamily: "var(--font-display)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "1.7", fontFamily: "var(--font-sans)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* IAB stat */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ background: "#00215e", borderRadius: "16px", padding: "48px 40px" }}>
          <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)", letterSpacing: "-0.5px", lineHeight: "1.3", marginBottom: "12px" }}>
            Podcast advertising revenue surged 26.4% in 2024, reaching over $2.4 billion in the US — and is projected to keep growing.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
            Source: IAB Internet Advertising Revenue Report, Full Year 2024, compiled with PwC.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "#FF7C6F", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-1.5px", marginBottom: "20px", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
          Ready to be discovered?
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", marginBottom: "40px", fontFamily: "var(--font-sans)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: "1.7" }}>
          Join SponStudio free. List your podcast, set your terms, and let the right brands find you.
        </p>
        <a href="/signup" style={{ display: "inline-block", background: "#FFFFFF", color: "#FF7C6F", textDecoration: "none", fontWeight: "700", fontSize: "15px", padding: "16px 36px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
          List my podcast for free →
        </a>
      </section>

      <Footer />
    </div>
  );
}
