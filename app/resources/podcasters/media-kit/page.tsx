"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inputStyle: React.CSSProperties = {
  width: "100%", fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)",
  background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px",
  padding: "12px 16px", outline: "none", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)",
  display: "block", marginBottom: "8px",
};

const hintStyle: React.CSSProperties = {
  fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px", lineHeight: "1.6",
};

const sectionStyle: React.CSSProperties = {
  background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "32px", marginBottom: "24px",
};

export default function MediaKit() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [podcastData, setPodcastData] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    podcastName: "",
    publisherName: "",
    category: "",
    location: "",
    podcastFormat: "",
    bio: "",
    monthlyListens: "",
    bestMonth: "",
    audienceLocationBreakdown: "",
    ageRange: "",
    gender: "",
    adFormats: [] as string[],
    rates: "",
    previousSponsors: "",
    lookingFor: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
    contactEmail: "",
    contactWebsite: "",
    contactNote: "",
    quote1: "",
    quote2: "",
    quote3: "",
    quote4: "",
    quote5: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    if (!isLoggedIn || !isPodcaster) return;
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data } = await supabase.from("podcasters").select("*").eq("user_id", session.user.id).eq("status", "approved").single();
      if (data) {
        setPodcastData(data);
        setForm((f) => ({
          ...f,
          podcastName: data.podcast_name || "",
          publisherName: data.publisher_name || "",
          category: data.category || "",
          location: data.audience_location_1 || "",
          podcastFormat: data.podcast_format || "",
          monthlyListens: data.listens_range || "",
          bestMonth: data.best_month || "",
          ageRange: data.age_range || "",
          gender: data.gender || "",
          adFormats: data.ad_formats || [],
          rates: data.rates || "",
          previousSponsors: data.previous_sponsors || "",
          lookingFor: data.looking_for || "",
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
          youtube: data.youtube || "",
    coverArtUrl: data.cover_art_url || "",
    description: data.description || "",
          linkedin: data.linkedin || "",
        }));
      }
    };
    fetchData();
  }, [isLoggedIn, isPodcaster]);

  const handlePrint = () => {
    setGenerating(true);
    const originalTitle = document.title;
    document.title = `${form.podcastName} — Media Kit`;
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setGenerating(false);
    }, 500);
  };

  if (loading) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn || !isPodcaster) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Sign in to access your media kit</h1>
          <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
        </div>
        <Footer />
      </div>
    );
  }

  const quotes = [form.quote1, form.quote2, form.quote3, form.quote4, form.quote5].filter(Boolean);
  const socials = [
    form.instagram && `Instagram: ${form.instagram}`,
    form.tiktok && `TikTok: ${form.tiktok}`,
    form.youtube && `YouTube: ${form.youtube}`,
    form.linkedin && `LinkedIn: ${form.linkedin}`,
  ].filter(Boolean);

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { display: block !important; }
        }
        @media screen {
          .print-area { display: none; }
        }
      `}</style>

      <div className="no-print" style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />

        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
          <div style={{ marginBottom: "12px" }}>
            <a href="/resources/podcasters" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>← Back to resources</a>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
            <div>
              <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Media kit builder</h1>
              <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "520px" }}>
                Your SponStudio data has been pre-filled below. Edit any field to be more specific, then download as a PDF to share with brands.
              </p>
            </div>
            <button
              onClick={handlePrint}
              disabled={generating}
              style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {generating ? "Preparing..." : "Download as PDF"}
            </button>
          </div>

          {/* Section 1 — Show overview */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Show overview</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Podcast name</label>
                <input style={inputStyle} value={form.podcastName} onChange={(e) => update("podcastName", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Publisher / host name</label>
                <input style={inputStyle} value={form.publisherName} onChange={(e) => update("publisherName", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <input style={inputStyle} value={form.category} onChange={(e) => update("category", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Format</label>
                <input style={inputStyle} value={form.podcastFormat} onChange={(e) => update("podcastFormat", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>About the show</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="Write a short description of your podcast — what it's about, who it's for, and what makes it unique." value={form.bio} onChange={(e) => update("bio", e.target.value)} />
                <p style={hintStyle}>2-4 sentences works best. Write it as you would introduce the show to a brand.</p>
              </div>
            </div>
          </div>

          {/* Section 2 — Audience */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Audience & reach</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Monthly listens</label>
                <input style={inputStyle} value={form.monthlyListens} onChange={(e) => update("monthlyListens", e.target.value)} placeholder="e.g. 4,200 average per month" />
                <p style={hintStyle}>Give a specific number if you can — it's more compelling than a range. Listens may include downloads, streams, Spotify plays and YouTube views.</p>
              </div>
              <div>
                <label style={labelStyle}>Best month <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.bestMonth} onChange={(e) => update("bestMonth", e.target.value)} placeholder="e.g. 14,200 in March 2024" />
              </div>
              <div>
                <label style={labelStyle}>Audience location breakdown</label>
                <input style={inputStyle} value={form.audienceLocationBreakdown} onChange={(e) => update("audienceLocationBreakdown", e.target.value)} placeholder="e.g. AU 65%, US 20%, UK 10%, Other 5%" />
                <p style={hintStyle}>Check your Spotify for Podcasters or RSS analytics for location data.</p>
              </div>
              <div>
                <label style={labelStyle}>Age range</label>
                <input style={inputStyle} value={form.ageRange} onChange={(e) => update("ageRange", e.target.value)} placeholder="e.g. 25-44 (core), 18-54 (full range)" />
              </div>
              <div>
                <label style={labelStyle}>Audience gender</label>
                <input style={inputStyle} value={form.gender} onChange={(e) => update("gender", e.target.value)} placeholder="e.g. 68% women, 32% men" />
              </div>
            </div>
          </div>

          {/* Section 3 — Advertising */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Advertising</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Ad formats offered</label>
                <input style={inputStyle} value={form.adFormats.join(", ")} onChange={(e) => setForm((f) => ({ ...f, adFormats: e.target.value.split(", ") }))} />
              </div>
              <div>
                <label style={labelStyle}>Rates</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.rates} onChange={(e) => update("rates", e.target.value)} placeholder="e.g. Pre-roll: $80, Mid-roll: $150, Native episode: $400" />
                <p style={hintStyle}>Breaking rates down by format gives brands clearer budget guidance.</p>
              </div>
              <div>
                <label style={labelStyle}>Previous sponsors <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.previousSponsors} onChange={(e) => update("previousSponsors", e.target.value)} placeholder="e.g. Shopify, Canva, Audible" />
              </div>
              <div>
                <label style={labelStyle}>What you're looking for in a brand partner <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.lookingFor} onChange={(e) => update("lookingFor", e.target.value)} placeholder="e.g. Brands aligned with entrepreneurship, productivity and tools for small business owners." />
              </div>
            </div>
          </div>

          {/* Section 4 — Socials */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Socials & links</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "instagram", label: "Instagram" },
                { key: "tiktok", label: "TikTok" },
                { key: "youtube", label: "YouTube" },
                { key: "linkedin", label: "LinkedIn" },
              ].map((s) => (
                <div key={s.key}>
                  <label style={labelStyle}>{s.label}</label>
                  <input style={inputStyle} value={form[s.key as keyof typeof form] as string} onChange={(e) => update(s.key, e.target.value)} />
                </div>
              ))}
            </div>
          </div>
          {/* Section 5 — Contact */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Contact</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Email address</label>
                <input style={inputStyle} value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} placeholder="your@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Website or link <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.contactWebsite} onChange={(e) => update("contactWebsite", e.target.value)} placeholder="https://yourwebsite.com" />
              </div>
              <div>
                <label style={labelStyle}>Preferred contact method <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.contactNote} onChange={(e) => update("contactNote", e.target.value)} placeholder="e.g. Email is best, or DM on Instagram" />
              </div>
            </div>
          </div>

          {/* Section 6 — Audience quotes */}
          
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Audience comments</h2>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "24px", lineHeight: "1.7" }}>
              Add up to 5 real listener comments or reviews. These show brands the quality of your audience engagement.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n}>
                  <label style={labelStyle}>Comment {n} <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
                    placeholder={`Paste a real listener comment or review...`}
                    value={form[`quote${n}` as keyof typeof form] as string}
                    onChange={(e) => update(`quote${n}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", paddingTop: "16px" }}>
            <button
              onClick={handlePrint}
              disabled={generating}
              style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "16px 40px", cursor: "pointer" }}
            >
              {generating ? "Preparing PDF..." : "Download media kit as PDF →"}
            </button>
            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "12px" }}>
              Your browser's print dialog will open — select "Save as PDF" to download.
            </p>
          </div>
        </div>

        <Footer />
      </div>

      {/* Print area */}
      <div className="print-area" ref={printRef} style={{ padding: "60px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
        <div className="print-only">
          {/* Header */}
          <div style={{ borderBottom: "3px solid #FF7C6F", paddingBottom: "24px", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", margin: "0 0 4px", letterSpacing: "-1px" }}>{form.podcastName}</h1>
                <p style={{ fontSize: "16px", color: "#6B6B6B", margin: "0 0 8px" }}>by {form.publisherName}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[form.category, form.podcastFormat].filter(Boolean).map((tag) => (
                    <span key={tag} style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", background: "#FFF0EE", borderRadius: "4px", padding: "3px 10px", letterSpacing: "0.5px" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", color: "#6B6B6B", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "1px" }}>Media Kit</p>
                <p style={{ fontSize: "11px", color: "#6B6B6B", margin: 0 }}>{new Date().toLocaleDateString("en-AU", { month: "long", year: "numeric" })}</p>
                <p style={{ fontSize: "10px", color: "#AAAAAA", margin: "4px 0 0" }}>via SponStudio ✦</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {form.bio && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>About the show</h2>
              <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.7", margin: 0 }}>{form.bio}</p>
            </div>
          )}

          {/* Audience stats */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Audience & reach</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              {[
                { label: "Monthly listens", value: form.monthlyListens },
                { label: "Best month", value: form.bestMonth },
                { label: "Primary location", value: form.location },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "8px", padding: "16px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>{item.label}</p>
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              {[
                { label: "Location breakdown", value: form.audienceLocationBreakdown },
                { label: "Age range", value: form.ageRange },
                { label: "Gender", value: form.gender },
              ].filter(item => item.value).map((item) => (
                <div key={item.label}>
                  <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "10px", color: "#AAAAAA", marginTop: "12px" }}>All figures self-reported. Listens may include downloads, streams, Spotify plays and YouTube views.</p>
          </div>

          {/* Advertising */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Advertising</h2>
            {form.adFormats.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Ad formats</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {form.adFormats.map((f) => (
                    <span key={f} style={{ fontSize: "12px", color: "#FF7C6F", background: "#FFF0EE", borderRadius: "4px", padding: "4px 10px", fontWeight: "600" }}>{f}</span>
                  ))}
                </div>
              </div>
            )}
            {form.rates && (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>Rates</p>
                <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>{form.rates}</p>
              </div>
            )}
            {form.previousSponsors && (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>Previous sponsors</p>
                <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>{form.previousSponsors}</p>
              </div>
            )}
            {form.lookingFor && (
              <div>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>Looking for</p>
                <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>{form.lookingFor}</p>
              </div>
            )}
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Socials</h2>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {socials.map((s) => (
                  <p key={s} style={{ fontSize: "13px", color: "#333", margin: 0 }}>{s}</p>
                ))}
              </div>
            </div>
          )}
{/* Contact */}
          {(form.contactEmail || form.contactWebsite) && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Contact</h2>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {form.contactEmail && <p style={{ fontSize: "13px", color: "#333", margin: 0 }}>Email: {form.contactEmail}</p>}
                {form.contactWebsite && <p style={{ fontSize: "13px", color: "#333", margin: 0 }}>Web: {form.contactWebsite}</p>}
                {form.contactNote && <p style={{ fontSize: "13px", color: "#333", margin: 0 }}>{form.contactNote}</p>}
              </div>
            </div>
          )}

          {/* Audience comments */}
          {quotes.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>What our listeners say</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {quotes.map((quote, i) => (
                  <div key={i} style={{ background: "#FAFAF8", borderLeft: "3px solid #FF7C6F", padding: "14px 16px", borderRadius: "0 6px 6px 0" }}>
                    <p style={{ fontSize: "14px", color: "#333", margin: 0, lineHeight: "1.6", fontStyle: "italic" }}>"{quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "11px", color: "#AAAAAA", margin: 0 }}>Generated via SponStudio ✦ sponstudio.com</p>
            <p style={{ fontSize: "11px", color: "#AAAAAA", margin: 0 }}>{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    </>
  );
}
