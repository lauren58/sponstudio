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
    listensRange: "1k to 10k",
    bestMonth: "14,200",
    bestMonthContext: "Featured in Spotify New and Noteworthy",
    demographics: "25-44, predominantly female",
    previousSponsors: "Notion, Canva, Shopify",
    rates: "From $150 per episode",
    socials: { instagram: "@theshiftpod", linkedin: "theshiftpodcast" },
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
    socials: { instagram: "@gooddirtpod" },
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
    socials: { instagram: "@barelylegal", tiktok: "@barelylegal" },
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
    socials: { instagram: "@plateuppod", youtube: "PlateUpPodcast" },
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
    socials: { instagram: "@thelongrunpod" },
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
    socials: { instagram: "@startupsauce", linkedin: "startupsaucepod" },
  },
];

export default function PodcastProfile({ params }: { params: { id: string } }) {
  const id = params.id;
  const podcast = podcasts.find((p) => p.id === parseInt(id)) || podcasts[0];
  const isLoggedIn = false;

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <Nav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 48px" }}>
        <a href="/browse" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          ← Back to browse
        </a>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px", alignItems: "flex-start" }}>

          <div>
            <div style={{ background: podcast.coverColor, borderRadius: "16px", height: "280px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "72px", opacity: 0.3 }}>🎙</span>
            </div>

            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "6px" }}>
              {podcast.name}
            </h1>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
              by {podcast.publisher}
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                {podcast.category}
              </span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                {podcast.location}
              </span>
            </div>

            <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px", marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
                Ad formats
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {podcast.adFormats.map((format) => (
                  <span key={format} style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FFF0EE", borderRadius: "4px", padding: "6px 10px", display: "inline-block" }}>
                    {format}
                  </span>
                ))}
              </div>
            </div>

            {isLoggedIn && (
              <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px" }}>
                <a href="#connect" style={{ display: "block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "14px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)", textAlign: "center", marginBottom: "12px" }}>
                  Request to connect
                </a>
                <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "8px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
                    <span style={{ color: "#FF7C6F", fontWeight: "700" }}>✦ Tip:</span> ask this podcaster for their media kit upon connecting.
                  </p>
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px" }}>
                <a href="/login" style={{ display: "block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "14px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)", textAlign: "center" }}>
                  Sign in to connect
                </a>
              </div>
            )}
          </div>

          <div>
            {!isLoggedIn && (
              <div style={{ position: "relative", marginBottom: "32px" }}>
                <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    {[
                      { label: "Monthly listens", value: "1k to 10k" },
                      { label: "Best month", value: "14,200 listens" },
                      { label: "Audience", value: "25-44, female skew" },
                      { label: "Rates", value: "From $150/ep" },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                        <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Previous sponsors</p>
                    <p style={{ fontSize: "15px", color: "#00215e", fontFamily: "var(--font-sans)" }}>Notion, Canva, Shopify</p>
                  </div>
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Socials</p>
                    <p style={{ fontSize: "15px", color: "#00215e", fontFamily: "var(--font-sans)" }}>@theshiftpod</p>
                  </div>
                </div>

                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,250,248,0.7)", borderRadius: "12px" }}>
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "32px 40px", textAlign: "center", maxWidth: "340px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: "24px", marginBottom: "12px" }}>🔒</div>
                    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "10px" }}>
                      Unlock full profile
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "20px" }}>
                      Sign in with a company email to view listener stats, demographics and more.
                    </p>
                    <a href="/login" style={{ display: "block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "12px 20px", borderRadius: "6px", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>
                      Sign in
                    </a>
                    <a href="/signup?role=brand" style={{ display: "block", fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
                      No account? Sign up free
                    </a>
                  </div>
                </div>
              </div>
            )}

            {isLoggedIn && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Monthly listens</p>
                    <p style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{podcast.listensRange}</p>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>Self-reported</p>
                  </div>
                  {podcast.bestMonth && (
                    <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Best month</p>
                      <p style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{podcast.bestMonth}</p>
                      {podcast.bestMonthContext && (
                        <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>{podcast.bestMonthContext}</p>
                      )}
                    </div>
                  )}
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Audience</p>
                    <p style={{ fontSize: "16px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{podcast.demographics}</p>
                  </div>
                  {podcast.rates && (
                    <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Rates</p>
                      <p style={{ fontSize: "16px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{podcast.rates}</p>
                      <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>Self-reported</p>
                    </div>
                  )}
                </div>

                {podcast.previousSponsors && (
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Previous sponsors</p>
                    <p style={{ fontSize: "15px", color: "#00215e", fontFamily: "var(--font-sans)" }}>{podcast.previousSponsors}</p>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>Self-reported</p>
                  </div>
                )}

                <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>Socials</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {Object.entries(podcast.socials).map(([platform, handle]) => (
                      <p key={platform} style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)" }}>
                        <span style={{ color: "#6B6B6B", textTransform: "capitalize" }}>{platform}:</span> {handle}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "20px", lineHeight: "1.6" }}>
              ✦ Listener numbers are self-reported by podcasters and may include a combination of downloads, streams, Spotify plays and YouTube views. All listings are reviewed by the SponStudio team before going live. 
            </p>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}
