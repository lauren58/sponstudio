"use client";

import { useSearchParams } from "next/navigation";
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
    listensRange: "1K to 10K",
    bestMonth: "14,200",
    demographics: "25-44, predominantly female",
    audienceLocations: ["AU", "US"],
    format: "Video and audio",
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
    listensRange: "1K to 10K",
    bestMonth: "8,900",
    demographics: "18-35, mixed gender",
    audienceLocations: ["NZ", "AU"],
    format: "Audio only",
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
    listensRange: "10K to 50K",
    bestMonth: "61,000",
    demographics: "25-54, predominantly female",
    audienceLocations: ["AU", "US", "UK"],
    format: "Video and audio",
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
    listensRange: "Under 1K",
    bestMonth: "2,100",
    demographics: "25-45, predominantly female",
    audienceLocations: ["AU"],
    format: "Video and audio",
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
    listensRange: "1K to 10K",
    bestMonth: "12,400",
    demographics: "28-45, mixed gender",
    audienceLocations: ["AU", "US"],
    format: "Video and audio",
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
    listensRange: "1K to 10K",
    bestMonth: "18,700",
    demographics: "25-45, mixed gender",
    audienceLocations: ["AU", "US"],
    format: "Audio only",
    rates: "From $200 per episode",
  },
];

const listensOrder = ["Under 1K", "1K to 10K", "10K to 50K", "50K to 200K", "200K+"];

function getCombinedListens(ranges: string[]): string {
  const floors: Record<string, number> = {
    "Under 1k": 0,
    "1k to 10k": 1000,
    "10k to 50k": 10000,
    "50k to 200k": 50000,
    "200k+": 200000,
  };
  const ceilings: Record<string, number | null> = {
    "Under 1k": 1000,
    "1k to 10k": 10000,
    "10k to 50k": 50000,
    "50k to 200k": 200000,
    "200k+": null,
  };
  const totalFloor = ranges.reduce((sum, r) => sum + (floors[r] || 0), 0);
  const hasOpenCeiling = ranges.some((r) => ceilings[r] === null);
  const totalCeiling = ranges.reduce((sum, r) => sum + ((ceilings[r] as number) || 0), 0);
  const formatNum = (n: number) => n >= 1000 ? (n / 1000).toFixed(0) + "k" : n.toString();
  if (hasOpenCeiling) {
    return formatNum(totalFloor) + "+";
  }
  return formatNum(totalFloor) + " to " + formatNum(totalCeiling);
}
function getCombinedLocations(locationArrays: string[][]): string[] {
  const all = locationArrays.flat();
  const unique = Array.from(new Set(all));
  return unique;
}

function getCombinedFormats(formatArrays: string[][]): string[] {
  const all = formatArrays.flat();
  return Array.from(new Set(all));
}

export default function PlanPage() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const ids = idsParam.split(",").map(Number).filter(Boolean);
  const selectedPodcasts = podcasts.filter((p) => ids.includes(p.id));

  if (selectedPodcasts.length === 0) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "16px" }}>No shows in your plan</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>Go back to browse and add some shows to get started.</p>
          <a href="/browse" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Browse podcasts</a>
        </div>
        <Footer />
      </div>
    );
  }

  const combinedListens = getCombinedListens(selectedPodcasts.map((p) => p.listensRange));
  const combinedLocations = getCombinedLocations(selectedPodcasts.map((p) => p.audienceLocations));
  const combinedFormats = getCombinedFormats(selectedPodcasts.map((p) => p.adFormats));
  const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 48px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <div>
            <a href="/browse" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: "16px" }}>
              ← Back to browse
            </a>
            <h1 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>
              Your media plan
            </h1>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
              {selectedPodcasts.length} shows selected ✦ Generated {today}
            </p>
          </div>
          <button
            onClick={() => window.print()}
            style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          >
            Download report →
          </button>
        </div>

        {/* Combined totals */}
        <div style={{ background: "#00215e", borderRadius: "16px", padding: "40px", marginBottom: "40px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "24px" }}>
            Combined plan overview
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px", marginBottom: "32px" }}>
            {[
              { label: "Total shows", value: selectedPodcasts.length.toString() },
              { label: "Combined monthly listens", value: combinedListens },
              { label: "Audience locations", value: combinedLocations.join(", ") },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{stat.label}</p>
                <p style={{ fontSize: "20px", fontWeight: "700", color: "#FFFFFF", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>{stat.value}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sans)", marginBottom: "24px", lineHeight: "1.6" }}>
  Based on self-reported ranges. Request media kits from individual shows for verified figures.
</p>
<div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }}>
            <p style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
              Combined ad formats available
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {combinedFormats.map((format) => (
                <span key={format} style={{ fontSize: "12px", fontWeight: "600", color: "#FF7C6F", background: "rgba(255,124,111,0.15)", borderRadius: "4px", padding: "4px 12px", fontFamily: "var(--font-sans)" }}>
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Self reported notice */}
        <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "8px", padding: "12px 16px", marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
            ✦ All listener numbers are self-reported by podcasters and may include downloads, streams, Spotify plays and YouTube views. Generated via SponStudio — sponstudio.com
          </p>
        </div>

        {/* Individual shows */}
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px", letterSpacing: "-0.3px" }}>
          Individual show breakdown
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "60px" }}>
          {selectedPodcasts.map((podcast) => (
            <div key={podcast.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "10px", background: podcast.coverColor, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "24px", opacity: 0.3 }}>🎙</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{podcast.name}</h3>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>by {podcast.publisher}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#00215e", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px", fontFamily: "var(--font-sans)" }}>{podcast.location}</span>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px", fontFamily: "var(--font-sans)" }}>{podcast.format}</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                  {[
                    { label: "Category", value: podcast.category },
                    { label: "Monthly listens", value: podcast.listensRange },
                    { label: "Best month", value: podcast.bestMonth },
                    { label: "Audience", value: podcast.demographics },
                    { label: "Audience locations", value: podcast.audienceLocations.join(", ") },
                    { label: "Rates", value: podcast.rates || "Not provided" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "10px 12px" }}>
                      <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {podcast.adFormats.map((format) => (
                    <span key={format} style={{ fontSize: "11px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FFF0EE", borderRadius: "4px", padding: "3px 10px" }}>
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Print styles */}
      <style>{`
        @media print {
          nav, footer, button, a[href="/browse"] { display: none !important; }
          body { background: white !important; }
          @page { margin: 20mm; }
        }
      `}</style>
    </div>
  );
}
