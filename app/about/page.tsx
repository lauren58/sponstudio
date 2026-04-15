"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function About() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <Nav />

      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 48px 60px" }}>

        <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
          About
        </div>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1.5px", lineHeight: "1.08", marginBottom: "40px" }}>
          Podcast advertising,<br />
          <span style={{ fontStyle: "italic", color: "#FF7C6F" }}>democratised.</span>
        </h1>

        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
          SponStudio is a marketplace connecting podcasters of all sizes with brands of all budgets.
        </p>

        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
          Built by the team at Centennial World Podcast Network, SponStudio serves as both a platform to buy host-read podcast advertising directly from creators, and an educational tool for both sides of the industry.
        </p>

        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "48px" }}>
          The podcast landscape has changed dramatically since we entered it over six years ago. The rise of video podcasting, TikTok, live-streaming and branded shows (just to name a few changes!) have made the space increasingly saturated, competitive, and even more expensive to break into. Meanwhile, industry measurement and advertising tools have yet to catch up with how people actually consume podcasts today.
        </p>

       <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px 32px", marginBottom: "48px" }}>
          <p style={{ fontSize: "22px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px", lineHeight: "1.3", marginBottom: "12px" }}>
            Podcast advertising revenue grew 26.4% in 2024, reaching over $2.4 billion in the US alone.
          </p>
          <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
            Source: IAB Internet Advertising Revenue Report, Full Year 2024, compiled with PwC. <a href="https://www.iab.com" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B", textDecoration: "underline" }}>iab.com</a>
          </p>
        </div>

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>
            How we do things differently
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <span style={{ color: "#FF7C6F", fontSize: "16px", marginTop: "3px", flexShrink: 0 }}>✦</span>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "10px" }}>
                  We report on listens, not downloads.
                </h3>
                <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
                  Downloads is an archaic measurement that cannot encapsulate the full breadth of a show's audience in today's ecosystem. Listens is a catch-all term that may include downloads, streams, Spotify video plays and YouTube views. If someone watches your podcast on YouTube, that should count just as much as a download to their Apple Podcasts app.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <span style={{ color: "#FF7C6F", fontSize: "16px", marginTop: "3px", flexShrink: 0 }}>✦</span>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "10px" }}>
                  For podcasters, there are no minimum listens to join.
                </h3>
                <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
                  As indie podcasters ourselves, we know how frustrating it is to be locked out of ad platforms and programmatic networks because your show has not yet hit a certain threshold. Every show deserves to make money, and there are countless brands looking to reach the engaged, niche communities you are building.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <span style={{ color: "#FF7C6F", fontSize: "16px", marginTop: "3px", flexShrink: 0 }}>✦</span>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "10px" }}>
                  For brands, we do the legwork.
                </h3>
                <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
                  SponStudio gives you a curated, searchable directory of podcasts across a range of niches, sizes and locations so you do not have to go hunting for them yourself. Whether you are a startup with a small budget or a larger brand building a niche media strategy, you can connect directly with podcasters, while accessing free educational resources on how to buy direct and how to measure results.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#00215e", borderRadius: "16px", padding: "40px 48px", marginBottom: "48px" }}>
          <p style={{ fontSize: "20px", fontWeight: "700", color: "#FFFFFF", fontFamily: "var(--font-display)", lineHeight: "1.5" }}>
           Our Ethos</p><p style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginTop: "12px" }}>To democratise podcast advertising for both sides. For podcasters, whatever your listens, you deserve to make money. For brands, whatever your budget, you should be able to advertise on podcasts.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
            About Centennial World
          </div>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "20px" }}>
            Centennial World is an award-winning independent youth podcast network based in Sydney, Australia, covering internet culture, tech and the creator economy. Founded in 2019 by Lauren Meisner, the network reaches 15 million young people around the world each month across video podcasts, TikTok and newsletter.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            SponStudio was built out of our own experience navigating the podcast advertising industry as independent creators. We wanted something better to exist for the podcasters who came after us.
          </p>
          <a href="https://centennialworld.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderBottom: "1px solid #00215e", paddingBottom: "2px" }}>
            Visit Centennial World
          </a>
        </div>

        <div style={{ background: "#FF7C6F", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "16px", fontStyle: "italic" }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>
            Whether you are a podcaster looking for your first sponsor or a brand looking for your next niche audience, SponStudio is for you.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/signup?role=podcaster" style={{ background: "#FFFFFF", color: "#FF7C6F", textDecoration: "none", fontWeight: "700", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              List my podcast →
            </a>
            <a href="/browse" style={{ background: "transparent", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)", border: "1px solid rgba(255,255,255,0.4)" }}>
              Browse podcasts
            </a>
          </div>
        </div>

      </section>

      <Footer />

    </div>
  );
}
