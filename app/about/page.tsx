"use client";

export default function About() {
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
          <a href="/about" style={{ fontSize: "14px", color: "#FF7C6F", textDecoration: "none", fontWeight: "600", fontFamily: "var(--font-sans)" }}>About</a>
          <a href="/login" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>Log in</a>
          <a href="/signup" style={{ fontSize: "14px", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", padding: "10px 22px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            Join free
          </a>
        </div>
      </nav>

      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 48px 60px" }}>

        <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
          About
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1.5px", lineHeight: "1.08", marginBottom: "32px" }}>
          Podcasting has changed.<br />
          <span style={{ fontStyle: "italic", color: "#FF7C6F" }}>The industry has not caught up.</span>
        </h1>

        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
          Podcasting is not what it was five years ago. The medium has evolved into something far bigger, more visual, and more social than anyone predicted. Today, podcasters are publishing on YouTube, going live on Spotify, clipping for TikTok, building audiences on Instagram, and streaming to rooms full of people in real time.
        </p>
        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
          And yet most of the tools, platforms, and marketplaces that claim to serve podcasters are still measuring success the old way. Download counts. RSS pulls. Numbers that were designed for an era when podcasting meant one audio file, distributed through one feed, listened to through one app.
        </p>
        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
          That model does not account for the YouTube views. The Spotify video plays. The live stream viewers. The Instagram follower who never downloads an episode but watches every video the moment it drops. These are real audiences, built by real creators, doing real work. But because the numbers do not show up in a traditional download report, they often do not count.
        </p>
        <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "48px" }}>
          The result is a system that makes it harder and harder for indie and niche podcasters to hit the thresholds required to get represented by a network, join an advertising marketplace, or attract sponsors. Not because their shows are not good. Because the goalposts were set before the game changed.
        </p>

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
            Why we built SponStudio
          </div>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            We built SponStudio because we believe the definition of a successful podcast needs to expand. A show with 600 deeply engaged listeners in a specific niche, a loyal YouTube community, and a highly active Instagram audience is a valuable platform for the right brand. It deserves a seat at the table.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            SponStudio is a free marketplace where podcasters of any size can list their show, set their own terms, and get discovered by brands. We ask podcasters to self-report their reach across all platforms, not just downloads, because we think the full picture matters. YouTube views count. Spotify streams count. Social amplification counts.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "48px" }}>
            We call it listens. And we are upfront with brands that these numbers are self-reported, because we would rather build a marketplace on honesty than on inflated metrics.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
            For brands
          </div>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            SponStudio is not just for podcasters. It is for brands too, especially those who have never bought podcast advertising before or who have found existing options too expensive, too opaque, or too hard to navigate.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            Buying directly from a podcast creator is a different experience to other ways brands typically buy media. It is more personal and more flexible. There is no algorithm deciding where your ad goes. You choose the show, you talk to the person behind it, and you build something that actually resonates with their audience. Done well, it is one of the most effective forms of advertising available.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "48px" }}>
            Whether you are a startup with a small budget looking for your first podcast partner, or a growing brand ready to explore niche audiences at scale, SponStudio gives you the tools to find the right show, understand what you are buying, and connect directly. We also offer free resources to help brands who are new to direct podcast buying understand how it works and what to expect.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
            Who we are
          </div>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            SponStudio is a free resource created by <a href="https://centennialworld.com" target="_blank" rel="noopener noreferrer" style={{ color: "#00215e", textDecoration: "underline", fontWeight: "500" }}>Centennial World Podcast Network</a>, an independent podcast network based in Australia.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8", marginBottom: "24px" }}>
            We produce and distribute podcasts across a range of genres and have lived the frustration of building shows that do not fit neatly into the boxes existing platforms were designed for. We know what it is like to be told your numbers are not quite there yet, even when your community is thriving.
          </p>
          <p style={{ fontSize: "17px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.8" }}>
            SponStudio is our way of building the platform we always needed. We hope it becomes the platform you needed too.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "48px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>
            Our principles
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              { title: "Free for podcasters, always", desc: "Listing your podcast on SponStudio will always be free. This is a resource, not a revenue play off the back of small creators." },
              { title: "The full picture counts", desc: "We measure reach across all platforms, not just downloads. YouTube views, Spotify plays, live streams, and social amplification are all part of what makes a modern podcast." },
              { title: "Honest by design", desc: "All listener numbers on SponStudio are self-reported by podcasters and clearly labelled as such. We believe transparency builds better partnerships than inflated metrics ever could." },
              { title: "Curated, not just listed", desc: "Every podcast on SponStudio is reviewed by our team before going live. We are not a directory. We are a curated marketplace built on quality." },
              { title: "Education for everyone", desc: "Buying podcast advertising directly is its own thing and we want both sides to feel confident doing it. Free resources for podcasters and brands are built into the platform." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ color: "#FF7C6F", fontSize: "16px", marginTop: "2px", flexShrink: 0 }}>✦</span>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "6px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

      <footer style={{ background: "#FAFAF8", borderTop: "1px solid #EFEFED", padding: "40px 48px", marginTop: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
              <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
            </span>
            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px" }}>
              A free resource by <a href="https://centennialworld.com" style={{ color: "#6B6B6B", textDecoration: "underline" }}>Centennial World Podcast Network</a>
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
