"use client";

const podcasts = [
  {
    id: 1,
    name: "The Shift",
    publisher: "Mia Sutherland",
    category: "Business & Entrepreneurship",
    location: "AU",
    coverColor: "#E8D5C4",
    adFormats: ["Mid-roll", "Native episode", "Social amplification"],
    listensRange: "1k to 10k",
    bestMonth: "14,200",
    bestMonthContext: "Featured in Spotify New and Noteworthy",
    demographics: "25-44, predominantly female",
    previousSponsors: "Notion, Canva, Shopify",
    rates: "From $150 per episode",
  },
  {
    id: 2,
    name: "Good Dirt",
    publisher: "Tom & Rhys Callahan",
    category: "Sustainability & Environment",
    location: "NZ",
    coverColor: "#C4D4C4",
    adFormats: ["Pre-roll", "Mid-roll", "Sponsored segment"],
    listensRange: "1k to 10k",
    bestMonth: "8,900",
    bestMonthContext: "",
    demographics: "18-35, mixed gender",
    previousSponsors: "",
    rates: "",
  },
  {
    id: 3,
    name: "Barely Legal",
    publisher: "Centennial World",
    category: "True Crime & Law",
    location: "AU",
    coverColor: "#2D2D2D",
    adFormats: ["Mid-roll", "Native episode"],
    listensRange: "10k to 50k",
    bestMonth: "61,000",
    bestMonthContext: "Episode featured on Reddit r/truecrime",
    demographics: "25-54, predominantly female",
    previousSponsors: "BetterHelp, Squarespace",
    rates: "From $400 per episode",
  },
  {
    id: 4,
    name: "Plate Up",
    publisher: "Jessie Nguyen",
    category: "Food & Hospitality",
    location: "AU",
    coverColor: "#F2C4A0",
    adFormats: ["Sponsored segment", "Product placement", "Social amplification"],
    listensRange: "Under 1k",
    bestMonth: "2,100",
    bestMonthContext: "",
    demographics: "25-45, predominantly female",
    previousSponsors: "",
    rates: "From $50 per episode",
  },
  {
    id: 5,
    name: "The Long Run",
    publisher: "Sam Okafor",
    category: "Health & Fitness",
    location: "AU",
    coverColor: "#C4D4E8",
    adFormats: ["Pre-roll", "Mid-roll", "Product placement"],
    listensRange: "1k to 10k",
    bestMonth: "12,400",
    bestMonthContext: "",
    demographics: "28-45, mixed gender",
    previousSponsors: "Hoka, Precision Hydration",
    rates: "",
  },
  {
    id: 6,
    name: "Startup Sauce",
    publisher: "Priya Mehta",
    category: "Business & Entrepreneurship",
    location: "AU",
    coverColor: "#F2E8C4",
    adFormats: ["Mid-roll", "Native episode", "Sponsored segment"],
    listensRange: "1k to 10k",
    bestMonth: "18,700",
    bestMonthContext: "Interviewed Atlassian co-founder",
    demographics: "25-45, mixed gender",
    previousSponsors: "Xero, Mailchimp",
    rates: "From $200 per episode",
  },
];

export default function Browse() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <nav style={{ background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
            <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="/browse" style={{ fontSize: "14px", color: "#FF7C6F", textDecoration: "none", fontWeight: "600", fontFamily: "var(--font-sans)" }}>Browse</a>
          <a href="/about" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>About</a>
          <a href="/login" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>Log in</a>
          <a href="/signup" style={{ fontSize: "14px", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", padding: "10px 22px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            Join free
          </a>
        </div>
      </nav>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 48px 40px" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "12px" }}>
          Browse podcasts
        </h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "560px" }}>
          Discover indie podcasts of every size and niche. Sign in with a company email to unlock listener stats, demographics and connect with shows.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 40px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <select style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", cursor: "pointer", fontWeight: "500" }}>
           <option>All categories</option>
            <option>Arts & Culture</option>
            <option>Business & Entrepreneurship</option>
            <option>Comedy</option>
            <option>Mental Health & Wellbeing</option>
            <option>Parenting & Family</option>
            <option>Politics & News</option>
            <option>Pop Culture & Commentary</option>
            <option>Science & Education</option>
            <option>Sport & Recreation</option>
            <option>Technology</option>
            <option>True Crime & Law</option>
          </select>
          <select style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", cursor: "pointer", fontWeight: "500" }}>
            <option>All locations</option>
            <option>AU</option>
            <option>Canada</option>
            <option>NZ</option>
            <option>UK</option>
            <option>US</option>
            <option>Global</option>
          </select>
          <select style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", cursor: "pointer", fontWeight: "500" }}>
            <option>All sizes</option>
            <option>Under 1K</option>
            <option>1K to 10K</option>
            <option>10K to 50K</option>
            <option>50K to 200K</option>
            <option>200K+</option>
          </select>
          <select style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", cursor: "pointer", fontWeight: "500" }}>
            <option>All formats</option>
            <option>Pre-roll</option>
            <option>Mid-roll</option>
            <option>Sponsored segment</option>
            <option>Product placement</option>
            <option>Native episode</option>
            <option>Branded mini series</option>
            <option>Social amplification</option>
          </select>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 32px" }}>
        <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", display: "inline-block" }}>
          ✦ Listener numbers are self-reported by podcasters and include may include a combination of downloads, streams, Spotify plays and YouTube views. All listings are reviewed by the SponStudio team before going live. and may include a combination of downloads, streams, Spotify plays and YouTube views.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {podcasts.map((podcast) => (
            <a key={podcast.id} href={"/browse/" + podcast.id} style={{ textDecoration: "none", display: "block" }}>
              <div
                style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #EFEFED", overflow: "hidden", cursor: "pointer", transition: "transform 0.15s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ background: podcast.coverColor, height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "48px", opacity: 0.3 }}>🎙</span>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.3px", margin: 0 }}>
                      {podcast.name}
                    </h3>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "2px 8px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                      {podcast.location}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
                    {podcast.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {podcast.adFormats.slice(0, 2).map((format) => (
                      <span key={format} style={{ fontSize: "11px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FFF0EE", borderRadius: "4px", padding: "3px 8px" }}>
                        {format}
                      </span>
                    ))}
                    {podcast.adFormats.length > 2 && (
                      <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "3px 8px" }}>
                        +{podcast.adFormats.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

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
