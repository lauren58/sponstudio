"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const podcasts = [
  {
    id: 1,
    name: "The Shift",
    publisher: "Mia Sutherland",
    category: "Business & Entrepreneurship",
    location: "AU",
    coverColor: "#E8D5C4",
    adFormats: ["Mid-roll", "Native episode", "Social amplification"],
  },
  {
    id: 2,
    name: "Good Dirt",
    publisher: "Tom & Rhys Callahan",
    category: "Sustainability & Environment",
    location: "NZ",
    coverColor: "#C4D4C4",
    adFormats: ["Pre-roll", "Mid-roll", "Sponsored segment"],
  },
  {
    id: 3,
    name: "Barely Legal",
    publisher: "Centennial World",
    category: "True Crime & Law",
    location: "AU",
    coverColor: "#2D2D2D",
    adFormats: ["Mid-roll", "Native episode"],
  },
  {
    id: 4,
    name: "Plate Up",
    publisher: "Jessie Nguyen",
    category: "Food & Hospitality",
    location: "AU",
    coverColor: "#F2C4A0",
    adFormats: ["Sponsored segment", "Product placement", "Social amplification"],
  },
  {
    id: 5,
    name: "The Long Run",
    publisher: "Sam Okafor",
    category: "Health & Fitness",
    location: "AU",
    coverColor: "#C4D4E8",
    adFormats: ["Pre-roll", "Mid-roll", "Product placement"],
  },
  {
    id: 6,
    name: "Startup Sauce",
    publisher: "Priya Mehta",
    category: "Business & Entrepreneurship",
    location: "AU",
    coverColor: "#F2E8C4",
    adFormats: ["Mid-roll", "Native episode", "Sponsored segment"],
  },
];

const selectStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#00215e",
  fontFamily: "var(--font-sans)",
  background: "#FFFFFF",
  border: "1px solid #EFEFED",
  borderRadius: "6px",
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: "500",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300215e' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
};

export default function Browse() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 48px 40px" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "12px" }}>
          Browse podcasts
        </h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "560px" }}>
          Discover indie podcasts of every size and niche. Sign in with your work email to unlock listener stats, demographics and connect with shows.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 40px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <select style={selectStyle}>
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
          <select style={selectStyle}>
            <option>All locations</option>
            <option>AU</option>
            <option>Canada</option>
            <option>NZ</option>
            <option>UK</option>
            <option>US</option>
            <option>Global</option>
          </select>
          <select style={selectStyle}>
            <option>All sizes</option>
            <option>Under 1K</option>
            <option>1K to 10K</option>
            <option>10K to 50K</option>
            <option>50K to 200K</option>
            <option>200K+</option>
          </select>
          <select style={selectStyle}>
            <option>All formats</option>
            <option>Pre-roll</option>
            <option>Mid-roll</option>
            <option>Sponsored segment</option>
            <option>Product placement</option>
            <option>Native episode</option>
            <option>Social amplification</option>
          </select>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 32px" }}>
        <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", display: "inline-block" }}>
          ✦ Listener numbers are self-reported by podcasters and may include a combination of downloads, streams, Spotify plays and YouTube views. All listings are reviewed by the SponStudio team before going live.
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

      <Footer />
    </div>
  );
}
