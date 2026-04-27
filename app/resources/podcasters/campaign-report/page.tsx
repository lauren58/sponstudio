"use client";

import { useState, useEffect } from "react";
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

const optionalBadge = <span style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "2px 8px", marginLeft: "8px", verticalAlign: "middle" }}>Optional</span>;

export default function CampaignReport() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [generating, setGenerating] = useState(false);

  const [form, setForm] = useState({
    // Show details
    podcastName: "",
    publisherName: "",
    // Brand & episode
    brandName: "",
    episodeTitle: "",
    publishDate: "",
    episodeLink: "",
    adFormats: "",
    // Impressions
    totalListens: "",
    spotifyListens: "",
    youtubeViews: "",
    rssDownloads: "",
    liveStreams: "",
    // Guarantees
    hasGuarantees: false,
    guaranteeListens: "",
    actualListens: "",
    guaranteeImpressions: "",
    actualImpressions: "",
    // Social
    hasSocial: false,
    socialPlatform: "",
    socialViews: "",
    socialReach: "",
    socialEngagements: "",
    // Sentiment
    quote1: "", quote2: "", quote3: "", quote4: "", quote5: "",
    // Highlights
    hasHighlights: false,
    highlights: "",
    // Promo
    hasPromo: false,
    promoCode: "",
    promoClicks: "",
    promoConversions: "",
    promoRevenue: "",
    // Thank you
    thankYou: "",
    nextSteps: "",
  });

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    if (!isLoggedIn || !isPodcaster) return;
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data } = await supabase.from("podcasters").select("podcast_name, publisher_name, ad_formats").eq("user_id", session.user.id).eq("status", "approved").single();
      if (data) {
        setForm((f) => ({
          ...f,
          podcastName: data.podcast_name || "",
          publisherName: data.publisher_name || "",
          adFormats: data.ad_formats?.join(", ") || "",
        }));
      }
    };
    fetchData();
  }, [isLoggedIn, isPodcaster]);

  const handlePrint = () => {
    setGenerating(true);
    const originalTitle = document.title;
    document.title = `${form.podcastName} x ${form.brandName} — Campaign Report`;
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setGenerating(false);
    }, 500);
  };

  const quotes = [form.quote1, form.quote2, form.quote3, form.quote4, form.quote5].filter(Boolean);

  const guaranteePercent = (actual: string, guarantee: string) => {
    const a = parseFloat(actual.replace(/,/g, ""));
    const g = parseFloat(guarantee.replace(/,/g, ""));
    if (!a || !g) return null;
    return Math.round((a / g) * 100);
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
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Sign in to access your campaign report</h1>
          <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
        </div>
        <Footer />
      </div>
    );
  }

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
              <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Post-campaign report</h1>
              <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "520px" }}>
                Fill in your campaign details and download a professional report to send to your brand partner.
              </p>
            </div>
            <button onClick={handlePrint} disabled={generating} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: "pointer", whiteSpace: "nowrap" }}>
              {generating ? "Preparing..." : "Download as PDF"}
            </button>
          </div>

          {/* Section 1 — Campaign overview */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Campaign overview</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Podcast name</label>
                  <input style={inputStyle} value={form.podcastName} onChange={(e) => update("podcastName", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Host / publisher</label>
                  <input style={inputStyle} value={form.publisherName} onChange={(e) => update("publisherName", e.target.value)} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Brand name</label>
                  <input style={inputStyle} value={form.brandName} onChange={(e) => update("brandName", e.target.value)} placeholder="e.g. Shopify" />
                </div>
                <div>
                  <label style={labelStyle}>Ad formats delivered</label>
                  <input style={inputStyle} value={form.adFormats} onChange={(e) => update("adFormats", e.target.value)} placeholder="e.g. Mid-roll, Social amplification" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 — Episode details */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Episode details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Episode title</label>
                <input style={inputStyle} value={form.episodeTitle} onChange={(e) => update("episodeTitle", e.target.value)} placeholder="e.g. How to build a brand from scratch" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Publish date</label>
                  <input style={inputStyle} type="date" value={form.publishDate} onChange={(e) => update("publishDate", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Episode link</label>
                  <input style={inputStyle} value={form.episodeLink} onChange={(e) => update("episodeLink", e.target.value)} placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 — Impressions */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Impressions & listens achieved</h2>
            <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "24px", lineHeight: "1.6" }}>
              Include your total and a platform breakdown if you have it. Check Spotify for Podcasters, YouTube Studio and your RSS host for stats.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Total listens / impressions</label>
                <input style={inputStyle} value={form.totalListens} onChange={(e) => update("totalListens", e.target.value)} placeholder="e.g. 6,400" />
                <p style={hintStyle}>This is your headline number — the total across all platforms.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Spotify listens {optionalBadge}</label>
                  <input style={inputStyle} value={form.spotifyListens} onChange={(e) => update("spotifyListens", e.target.value)} placeholder="e.g. 3,200" />
                </div>
                <div>
                  <label style={labelStyle}>YouTube views {optionalBadge}</label>
                  <input style={inputStyle} value={form.youtubeViews} onChange={(e) => update("youtubeViews", e.target.value)} placeholder="e.g. 1,800" />
                </div>
                <div>
                  <label style={labelStyle}>RSS downloads {optionalBadge}</label>
                  <input style={inputStyle} value={form.rssDownloads} onChange={(e) => update("rssDownloads", e.target.value)} placeholder="e.g. 900" />
                </div>
                <div>
                  <label style={labelStyle}>Live streams {optionalBadge}</label>
                  <input style={inputStyle} value={form.liveStreams} onChange={(e) => update("liveStreams", e.target.value)} placeholder="e.g. 500" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 — Guarantees */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", margin: 0 }}>Minimum guarantees vs actuals {optionalBadge}</h2>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.hasGuarantees} onChange={(e) => update("hasGuarantees", e.target.checked)} />
                Include this section
              </label>
            </div>
            {form.hasGuarantees && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6", margin: 0 }}>
                  Only include if you sold this campaign on minimum guarantee numbers.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Guaranteed listens</label>
                    <input style={inputStyle} value={form.guaranteeListens} onChange={(e) => update("guaranteeListens", e.target.value)} placeholder="e.g. 3,000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Actual listens delivered</label>
                    <input style={inputStyle} value={form.actualListens} onChange={(e) => update("actualListens", e.target.value)} placeholder="e.g. 4,200" />
                  </div>
                  <div>
                    <label style={labelStyle}>Guaranteed impressions {optionalBadge}</label>
                    <input style={inputStyle} value={form.guaranteeImpressions} onChange={(e) => update("guaranteeImpressions", e.target.value)} placeholder="e.g. 5,000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Actual impressions delivered {optionalBadge}</label>
                    <input style={inputStyle} value={form.actualImpressions} onChange={(e) => update("actualImpressions", e.target.value)} placeholder="e.g. 6,400" />
                  </div>
                </div>
              </div>
            )}
            {!form.hasGuarantees && (
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Tick the box above to include minimum guarantee vs actuals in your report.</p>
            )}
          </div>

          {/* Section 5 — Social */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", margin: 0 }}>Social performance {optionalBadge}</h2>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.hasSocial} onChange={(e) => update("hasSocial", e.target.checked)} />
                Include this section
              </label>
            </div>
            {form.hasSocial && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Platform</label>
                  <input style={inputStyle} value={form.socialPlatform} onChange={(e) => update("socialPlatform", e.target.value)} placeholder="e.g. Instagram Reels, TikTok" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Views</label>
                    <input style={inputStyle} value={form.socialViews} onChange={(e) => update("socialViews", e.target.value)} placeholder="e.g. 12,400" />
                  </div>
                  <div>
                    <label style={labelStyle}>Reach</label>
                    <input style={inputStyle} value={form.socialReach} onChange={(e) => update("socialReach", e.target.value)} placeholder="e.g. 9,800" />
                  </div>
                  <div>
                    <label style={labelStyle}>Engagements</label>
                    <input style={inputStyle} value={form.socialEngagements} onChange={(e) => update("socialEngagements", e.target.value)} placeholder="e.g. 340" />
                  </div>
                </div>
              </div>
            )}
            {!form.hasSocial && (
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Tick the box above to include social performance in your report.</p>
            )}
          </div>

          {/* Section 6 — Audience sentiment */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Audience sentiment</h2>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "24px", lineHeight: "1.7" }}>
              Add up to 5 real listener comments or reactions about this episode or the brand. Check your comments, DMs and reviews.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n}>
                  <label style={labelStyle}>Comment {n} {n > 1 ? optionalBadge : ""}</label>
                  <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} placeholder="Paste a real listener comment or reaction..." value={form[`quote${n}` as keyof typeof form] as string} onChange={(e) => update(`quote${n}`, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          {/* Section 7 — Highlights */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", margin: 0 }}>Key highlights & wins {optionalBadge}</h2>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.hasHighlights} onChange={(e) => update("hasHighlights", e.target.checked)} />
                Include this section
              </label>
            </div>
            {form.hasHighlights && (
              <div>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="e.g. Episode ranked in top 10 in Australia on Spotify. Promo code used 47 times in first week. Audience left 28 comments on YouTube." value={form.highlights} onChange={(e) => update("highlights", e.target.value)} />
                <p style={hintStyle}>Share anything notable — rankings, spikes in downloads, press mentions, social virality.</p>
              </div>
            )}
            {!form.hasHighlights && (
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Tick the box above to include key highlights in your report.</p>
            )}
          </div>

          {/* Section 8 — Promo code */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", margin: 0 }}>Promo code / trackable link {optionalBadge}</h2>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.hasPromo} onChange={(e) => update("hasPromo", e.target.checked)} />
                Include this section
              </label>
            </div>
            {form.hasPromo && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Promo code or URL</label>
                  <input style={inputStyle} value={form.promoCode} onChange={(e) => update("promoCode", e.target.value)} placeholder="e.g. PODCAST20 or trackable URL" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Clicks / uses {optionalBadge}</label>
                    <input style={inputStyle} value={form.promoClicks} onChange={(e) => update("promoClicks", e.target.value)} placeholder="e.g. 94" />
                  </div>
                  <div>
                    <label style={labelStyle}>Conversions {optionalBadge}</label>
                    <input style={inputStyle} value={form.promoConversions} onChange={(e) => update("promoConversions", e.target.value)} placeholder="e.g. 31" />
                  </div>
                  <div>
                    <label style={labelStyle}>Revenue attributed {optionalBadge}</label>
                    <input style={inputStyle} value={form.promoRevenue} onChange={(e) => update("promoRevenue", e.target.value)} placeholder="e.g. $2,400" />
                  </div>
                </div>
              </div>
            )}
            {!form.hasPromo && (
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Tick the box above if you used a promo code or trackable link for this campaign.</p>
            )}
          </div>

          {/* Section 9 — Thank you */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Thank you & what's next</h2>
            <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "24px", lineHeight: "1.6" }}>
              A warm closing sets you up for repeat bookings. Keep it genuine and specific.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Thank you note</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="e.g. Thank you so much for partnering with us on this episode. It was a genuine fit for our audience and we loved bringing your brand to life in our own voice." value={form.thankYou} onChange={(e) => update("thankYou", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>What's next {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} placeholder="e.g. We'd love to work together again — we have availability in Q3 and would be happy to put together a proposal for a longer campaign." value={form.nextSteps} onChange={(e) => update("nextSteps", e.target.value)} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", paddingTop: "16px" }}>
            <button onClick={handlePrint} disabled={generating} style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "16px 40px", cursor: "pointer" }}>
              {generating ? "Preparing PDF..." : "Download report as PDF →"}
            </button>
            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "12px" }}>
              Your browser's print dialog will open — select "Save as PDF" to download.
            </p>
          </div>
        </div>

        <Footer />
      </div>

      {/* Print area */}
      <div className="print-area" style={{ padding: "60px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>

        {/* Header */}
        <div style={{ borderBottom: "3px solid #FF7C6F", paddingBottom: "24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 8px" }}>Post-Campaign Report</p>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", margin: "0 0 4px", letterSpacing: "-0.8px" }}>{form.podcastName} × {form.brandName}</h1>
              <p style={{ fontSize: "14px", color: "#6B6B6B", margin: 0 }}>by {form.publisherName}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", color: "#6B6B6B", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "1px" }}>Campaign Report</p>
              <p style={{ fontSize: "11px", color: "#6B6B6B", margin: 0 }}>{form.publishDate ? new Date(form.publishDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : new Date().toLocaleDateString("en-AU", { month: "long", year: "numeric" })}</p>
              <p style={{ fontSize: "10px", color: "#AAAAAA", margin: "4px 0 0" }}>via SponStudio ✦</p>
            </div>
          </div>
        </div>

        {/* Campaign overview */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Campaign overview</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "Brand", value: form.brandName },
              { label: "Ad formats", value: form.adFormats },
              { label: "Episode", value: form.episodeTitle },
              { label: "Published", value: form.publishDate ? new Date(form.publishDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : "" },
            ].filter(item => item.value).map((item) => (
              <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                <p style={{ fontSize: "13px", color: "#00215e", fontWeight: "600", margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
          {form.episodeLink && (
            <p style={{ fontSize: "12px", color: "#6B6B6B", marginTop: "12px" }}>Episode link: {form.episodeLink}</p>
          )}
        </div>

        {/* Impressions */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Impressions & listens achieved</h2>
          <div style={{ background: "#00215e", borderRadius: "10px", padding: "20px 24px", marginBottom: "16px", display: "inline-block", minWidth: "200px" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px" }}>Total listens / impressions</p>
            <p style={{ fontSize: "32px", fontWeight: "800", color: "#FFFFFF", margin: 0 }}>{form.totalListens}</p>
          </div>
          {[
            { label: "Spotify listens", value: form.spotifyListens },
            { label: "YouTube views", value: form.youtubeViews },
            { label: "RSS downloads", value: form.rssDownloads },
            { label: "Live streams", value: form.liveStreams },
          ].filter(item => item.value).length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              {[
                { label: "Spotify listens", value: form.spotifyListens },
                { label: "YouTube views", value: form.youtubeViews },
                { label: "RSS downloads", value: form.rssDownloads },
                { label: "Live streams", value: form.liveStreams },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Guarantees */}
        {form.hasGuarantees && (form.guaranteeListens || form.guaranteeImpressions) && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Minimum guarantees vs actuals</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {form.guaranteeListens && form.actualListens && (() => {
                const pct = guaranteePercent(form.actualListens, form.guaranteeListens);
                return (
                  <div style={{ border: "1px solid #EFEFED", borderRadius: "8px", padding: "16px" }}>
                    <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px" }}>Listens</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div><p style={{ fontSize: "10px", color: "#6B6B6B", margin: "0 0 2px" }}>Guaranteed</p><p style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", margin: 0 }}>{form.guaranteeListens}</p></div>
                      <div style={{ textAlign: "right" }}><p style={{ fontSize: "10px", color: "#6B6B6B", margin: "0 0 2px" }}>Delivered</p><p style={{ fontSize: "18px", fontWeight: "700", color: "#FF7C6F", margin: 0 }}>{form.actualListens}</p></div>
                    </div>
                    {pct && <p style={{ fontSize: "13px", fontWeight: "700", color: pct >= 100 ? "#27500A" : "#A32D2D", margin: 0 }}>{pct}% of guarantee delivered</p>}
                  </div>
                );
              })()}
              {form.guaranteeImpressions && form.actualImpressions && (() => {
                const pct = guaranteePercent(form.actualImpressions, form.guaranteeImpressions);
                return (
                  <div style={{ border: "1px solid #EFEFED", borderRadius: "8px", padding: "16px" }}>
                    <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px" }}>Impressions</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div><p style={{ fontSize: "10px", color: "#6B6B6B", margin: "0 0 2px" }}>Guaranteed</p><p style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", margin: 0 }}>{form.guaranteeImpressions}</p></div>
                      <div style={{ textAlign: "right" }}><p style={{ fontSize: "10px", color: "#6B6B6B", margin: "0 0 2px" }}>Delivered</p><p style={{ fontSize: "18px", fontWeight: "700", color: "#FF7C6F", margin: 0 }}>{form.actualImpressions}</p></div>
                    </div>
                    {pct && <p style={{ fontSize: "13px", fontWeight: "700", color: pct >= 100 ? "#27500A" : "#A32D2D", margin: 0 }}>{pct}% of guarantee delivered</p>}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Social */}
        {form.hasSocial && form.socialPlatform && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Social performance — {form.socialPlatform}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { label: "Views", value: form.socialViews },
                { label: "Reach", value: form.socialReach },
                { label: "Engagements", value: form.socialEngagements },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audience sentiment */}
        {quotes.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Audience sentiment</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {quotes.map((quote, i) => (
                <div key={i} style={{ background: "#FAFAF8", borderLeft: "3px solid #FF7C6F", padding: "12px 16px", borderRadius: "0 6px 6px 0" }}>
                  <p style={{ fontSize: "13px", color: "#333", margin: 0, lineHeight: "1.6", fontStyle: "italic" }}>"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {form.hasHighlights && form.highlights && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Key highlights & wins</h2>
            <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: 0 }}>{form.highlights}</p>
          </div>
        )}

        {/* Promo code */}
        {form.hasPromo && form.promoCode && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Promo code / trackable link</h2>
            <div style={{ background: "#FAFAF8", borderRadius: "8px", padding: "16px 20px", marginBottom: "12px" }}>
              <p style={{ fontSize: "12px", color: "#6B6B6B", margin: "0 0 4px" }}>Code / URL</p>
              <p style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", margin: 0, fontFamily: "monospace" }}>{form.promoCode}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { label: "Clicks / uses", value: form.promoClicks },
                { label: "Conversions", value: form.promoConversions },
                { label: "Revenue attributed", value: form.promoRevenue },
              ].filter(item => item.value).map((item) => (
                <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thank you */}
        {(form.thankYou || form.nextSteps) && (
          <div style={{ marginBottom: "32px", background: "#FFF0EE", borderRadius: "10px", padding: "24px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#FF7C6F", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Thank you & what's next</h2>
            {form.thankYou && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 12px" }}>{form.thankYou}</p>}
            {form.nextSteps && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: 0 }}>{form.nextSteps}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "11px", color: "#AAAAAA", margin: 0 }}>Generated via SponStudio ✦ sponstudio.com</p>
          <p style={{ fontSize: "11px", color: "#AAAAAA", margin: 0 }}>{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </>
  );
}
