export default function Home() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
<span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "14px", marginLeft: "4px" }}>✦</span></span>
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

      {/* Hero */}
      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "100px 48px 100px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(38px, 6vw, 62px)", fontWeight: "800", color: "#00215e", lineHeight: "1.08", letterSpacing: "-1.5px", marginBottom: "28px", fontFamily: "var(--font-display)" }}>
          Democratising<br />podcast advertising<br />
          <span style={{ color: "#FF7C6F", fontStyle: "italic" }}>for everyone.</span>
        </h1>
        <p style={{ fontSize: "17px", color: "#6B6B6B", lineHeight: "1.8", maxWidth: "520px", margin: "0 auto 48px", fontFamily: "var(--font-sans)", fontWeight: "400" }}>
          No download minimums. No gatekeeping. SponStudio connects indie podcasts of any size with brands of any budget looking for authentic, niche voices.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/signup?role=podcaster" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "14px 28px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            List my podcast →
          </a>
          <a href="/browse" style={{ background: "#FFFFFF", color: "#00215e", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "14px 28px", borderRadius: "6px", border: "1px solid #EFEFED", fontFamily: "var(--font-sans)" }}>
            Browse podcasts
          </a>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ borderTop: "1px solid #EFEFED" }} />
      </div>

      {/* For podcasters / brands split */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

        {/* Podcasters */}
        <div style={{ padding: "56px 48px", background: "#FFFFFF", borderRadius: "12px", border: "1px solid #EFEFED", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px", fontFamily: "var(--font-sans)" }}>
            For podcasters
          </div>
          <h2 style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: "700", color: "#00215e", marginBottom: "20px", letterSpacing: "-0.8px", lineHeight: "1.15", fontFamily: "var(--font-display)" }}>
            Get sponsored, whatever your download count.
          </h2>
          <p style={{ fontSize: "15px", color: "#6B6B6B", lineHeight: "1.8", marginBottom: "32px", fontFamily: "var(--font-sans)" }}>
            Build a profile, set your rates or keep them private, and let the right brands find you. SponStudio puts indie podcasters on equal footing. No minimums, free for podcasters always.
          </p>
          <div style={{ marginTop: "auto" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Free profile, always",
                "You approve every connection",
                "Keep rates private if you prefer",
                "Download free report templates",
              ].map(item => (
                <li key={item} style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#FF7C6F" }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href="/signup?role=podcaster" style={{ display: "inline-block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              List my podcast →
            </a>
          </div>
        </div>

        {/* Brands */}
        <div style={{ padding: "56px 48px", background: "#F0EDE8", borderRadius: "12px", border: "1px solid #E8E4DE", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px", fontFamily: "var(--font-sans)" }}>
            For brands
          </div>
          <h2 style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: "700", color: "#00215e", marginBottom: "20px", letterSpacing: "-0.8px", lineHeight: "1.15", fontFamily: "var(--font-display)" }}>
            Niche podcast advertising, for any budget.
          </h2>
          <p style={{ fontSize: "15px", color: "#6B6B6B", lineHeight: "1.8", marginBottom: "32px", fontFamily: "var(--font-sans)" }}>
            Whether you are a startup finding your feet or a growing brand looking for authentic reach, SponStudio helps you find the right show for your audience. Browse by niche, size and location and connect directly.
          </p>
          <div style={{ marginTop: "auto" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Browse and connect with any budget",
                "Filter by niche, size and location",
                "Send targeted briefs to matched shows",
                "Connect directly with podcasters",
              ].map(item => (
                <li key={item} style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#FF7C6F" }}>✦</span> {item}
                </li>
              ))}
            </ul>
            <a href="/browse" style={{ display: "inline-block", background: "#00215e", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              Browse podcasts →
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: "700", color: "#00215e", letterSpacing: "-1px", fontFamily: "var(--font-display)", marginBottom: "12px" }}>
            Simple by design.
          </h2>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Because indie podcasting is hard enough.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {[
            { step: "01", title: "Build your profile", desc: "Podcasters create a free profile with their show details, niche, audience size, ad formats and optional rates." },
            { step: "02", title: "Brands discover you", desc: "Brands browse the marketplace and send connection requests or targeted briefs to shows that match their needs." },
            { step: "03", title: "You stay in control", desc: "Podcasters approve every connection. Accept and your contact details are shared. Decline with zero awkwardness." },
          ].map((item) => (
            <div key={item.step} style={{ background: "#FFFFFF", padding: "36px", border: "1px solid #EFEFED", borderRadius: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#00215e", marginBottom: "12px", letterSpacing: "-0.4px", fontFamily: "var(--font-display)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: "1.7", fontFamily: "var(--font-sans)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "#FF7C6F", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.7)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
            For podcasters
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-1px", marginBottom: "20px", fontFamily: "var(--font-display)", fontStyle: "italic", lineHeight: "1.1" }}>
            Ready to be discovered?
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "36px", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
            Join SponStudio free. List your podcast, set your terms, and let the right brands find you.
          </p>
          <a href="/signup?role=podcaster" style={{ display: "inline-block", background: "#FFFFFF", color: "#FF7C6F", textDecoration: "none", fontWeight: "700", fontSize: "15px", padding: "14px 32px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            List my podcast for free →
          </a>
        </div>
      </section>

      {/* Footer */}
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
            <a href="/signup?role=brand" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>For brands</a>
          </div>
        </div>
      </footer>

    </div>
  );
}