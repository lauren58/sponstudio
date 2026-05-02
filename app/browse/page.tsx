"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Podcast = {
  id: string;
  podcast_name: string;
  publisher_name: string;
  category: string;
  audience_location_1: string;
  audience_location_2: string;
  ad_formats: string[];
  listens_range: string;
  podcast_format: string;
  cover_color: string;
  cover_art_url: string;
  description: string;
};

const CATEGORIES = [
  "All categories", "Arts & Culture", "Business & Entrepreneurship", "Comedy",
  "Mental Health & Wellbeing", "Parenting & Family", "Politics & News",
  "Pop Culture & Commentary", "Science & Education", "Sport & Recreation",
  "Technology", "True Crime & Law"
];

const LOCATIONS = ["All locations", "AU", "Canada", "NZ", "UK", "US", "Global"];
const LISTENS = ["All monthly listens", "Under 1K", "1K to 10K", "10K to 50K", "50K to 200K", "200K+"];
const FORMATS = ["All formats", "Pre-roll", "Mid-roll", "Sponsored segment", "Product placement", "Native episode", "Social amplification"];

const COVER_COLORS = ["#E8D5C4", "#C4D4C4", "#2D2D2D", "#F2C4A0", "#C4D4E8", "#F2E8C4", "#D4C4E8", "#C4E8D4", "#E8C4D4"];

const selectStyle: React.CSSProperties = {
  fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)",
  background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px",
  padding: "10px 16px", cursor: "pointer", fontWeight: "500",
  appearance: "none", WebkitAppearance: "none",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300215e' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "32px",
};

export default function Browse() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filtered, setFiltered] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All categories");
  const [location, setLocation] = useState("All locations");
  const [listens, setListens] = useState("All monthly listens");
  const [format, setFormat] = useState("All formats");

  useEffect(() => {
    const fetchPodcasts = async () => {
      const { data } = await supabase
        .from("podcasters")
        .select("id, podcast_name, publisher_name, category, audience_location_1, audience_location_2, ad_formats, listens_range, podcast_format, cover_color, cover_art_url, description")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (data) {
        setPodcasts(data);
        setFiltered(data);
      }
      setLoading(false);
    };
    fetchPodcasts();
  }, []);

  useEffect(() => {
    let result = podcasts;
    if (category !== "All categories") result = result.filter((p) => p.category === category);
    if (location !== "All locations") result = result.filter((p) => p.audience_location_1 === location);
    if (listens !== "All monthly listens") result = result.filter((p) => p.listens_range === listens);
    if (format !== "All formats") result = result.filter((p) => p.ad_formats?.includes(format));
    setFiltered(result);
  }, [category, location, listens, format, podcasts]);

  const getCoverColor = (id: string) => {
    const index = id.charCodeAt(0) % COVER_COLORS.length;
    return COVER_COLORS[index];
  };

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
          <select style={selectStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select style={selectStyle} value={location} onChange={(e) => setLocation(e.target.value)}>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select style={selectStyle} value={listens} onChange={(e) => setListens(e.target.value)}>
            {LISTENS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select style={selectStyle} value={format} onChange={(e) => setFormat(e.target.value)}>
            {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 32px" }}>
        <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", display: "inline-block" }}>
          ✦ Listener numbers are self-reported by podcasters and may include downloads, streams, Spotify plays and YouTube views. All listings are reviewed by the SponStudio team before going live.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 100px" }}>
        {loading && (
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading podcasts...</p>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "20px", marginBottom: "12px" }}>🎙</p>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>No podcasts found</p>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Try adjusting your filters.</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {filtered.map((podcast) => (
            <a key={podcast.id} href={`/browse/${podcast.id}`} style={{ textDecoration: "none", display: "block" }}>
              <div
                style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #EFEFED", overflow: "hidden", cursor: "pointer", transition: "transform 0.15s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {podcast.cover_art_url ? (
                  <div style={{ height: "180px", overflow: "hidden", background: "#F5F5F5", borderRadius: "11px 11px 0 0" }}>
                    <img src={podcast.cover_art_url} alt={podcast.podcast_name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                ) : (
                  <div style={{ background: podcast.cover_color || getCoverColor(podcast.id), height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "48px", opacity: 0.3 }}>🎙</span>
                  </div>
                )}
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.3px", margin: 0 }}>
                      {podcast.podcast_name}
                    </h3>
                    <div style={{ display: "flex", gap: "4px", marginLeft: "8px", flexShrink: 0 }}>
                      {[podcast.audience_location_1, podcast.audience_location_2].filter(Boolean).map((loc) => (
                        <span key={loc} style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "2px 8px", whiteSpace: "nowrap" }}>
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: podcast.description ? "8px" : "12px" }}>
                    {podcast.category}
                  </p>
                  {podcast.description && (
                    <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "12px", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {podcast.description}
                    </p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {podcast.ad_formats?.slice(0, 2).map((f) => (
                      <span key={f} style={{ fontSize: "11px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FFF0EE", borderRadius: "4px", padding: "3px 8px" }}>
                        {f}
                      </span>
                    ))}
                    {podcast.ad_formats?.length > 2 && (
                      <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "3px 8px" }}>
                        +{podcast.ad_formats.length - 2} more
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
