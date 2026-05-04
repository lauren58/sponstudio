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

const emptyForm = {
  brandName: "", campaignName: "", projectOverview: "", campaignObjectives: "",
  measurableObjectives: "", productDescription: "", keyBenefits: "", valueProposition: "",
  targetAudience: "", audienceTakeaway: "", adFormats: "", episodeCount: "",
  campaignPeriod: "", minimumGuarantees: "", dos: "", donts: "", brandingStandards: "",
  competitorBrands: "", toneAndStyle: "", keyMessages: "", socialHandles: "", hashtags: "",
  additionalInfo: "",
};

type SavedBrief = {
  id: string;
  brief_name: string;
  brief_data: typeof emptyForm;
  updated_at: string;
};

export default function BriefBuilder() {
  const { isLoggedIn, isBrand, loading } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [savedBriefs, setSavedBriefs] = useState<SavedBrief[]>([]);
  const [currentBriefId, setCurrentBriefId] = useState<string | null>(null);
  const [currentBriefName, setCurrentBriefName] = useState("Untitled brief");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !isBrand) return;
    const fetchBrandAndBriefs = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data: brandData } = await supabase.from("brands").select("id, company_name").eq("user_id", session.user.id).single();
      if (brandData) {
        setBrandId(brandData.id);
        setForm((f) => ({ ...f, brandName: f.brandName || brandData.company_name || "" }));
        const { data: briefs } = await supabase.from("saved_briefs").select("id, brief_name, brief_data, updated_at").eq("brand_id", brandData.id).order("updated_at", { ascending: false });
        if (briefs) setSavedBriefs(briefs as SavedBrief[]);
      }
    };
    fetchBrandAndBriefs();
  }, [isLoggedIn, isBrand]);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    if (!brandId) return;
    setSaving(true);
    if (currentBriefId) {
      const { error } = await supabase.from("saved_briefs").update({
        brief_name: currentBriefName,
        brief_data: form,
        updated_at: new Date().toISOString(),
      }).eq("id", currentBriefId);
      if (!error) {
        setSavedBriefs((prev) => prev.map((b) => b.id === currentBriefId ? { ...b, brief_name: currentBriefName, brief_data: form, updated_at: new Date().toISOString() } : b));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } else {
      const { data, error } = await supabase.from("saved_briefs").insert({
        brand_id: brandId,
        brief_name: currentBriefName,
        brief_data: form,
      }).select("id, brief_name, brief_data, updated_at").single();
      if (!error && data) {
        setCurrentBriefId(data.id);
        setSavedBriefs((prev) => [data as SavedBrief, ...prev]);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    }
    setSaving(false);
  };

  const loadBrief = (brief: SavedBrief) => {
    setForm(brief.brief_data);
    setCurrentBriefId(brief.id);
    setCurrentBriefName(brief.brief_name);
    setShowSaved(false);
  };

  const deleteBrief = async (id: string) => {
    await supabase.from("saved_briefs").delete().eq("id", id);
    setSavedBriefs((prev) => prev.filter((b) => b.id !== id));
    if (currentBriefId === id) {
      setForm(emptyForm);
      setCurrentBriefId(null);
      setCurrentBriefName("Untitled brief");
    }
  };

  const newBrief = () => {
    setForm({ ...emptyForm, brandName: form.brandName });
    setCurrentBriefId(null);
    setCurrentBriefName("Untitled brief");
    setShowSaved(false);
  };

  const handlePrint = () => {
    setGenerating(true);
    const originalTitle = document.title;
    document.title = `${form.brandName}${form.campaignName ? ` — ${form.campaignName}` : ""} — Campaign Brief`;
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setGenerating(false);
    }, 500);
  };

  if (loading) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p></div><Footer /></div>
  );

  if (!isLoggedIn || !isBrand) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Sign in to access the brief builder</h1><a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a></div><Footer /></div>
  );

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
            <a href="/resources/brands" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>← Back to resources</a>
          </div>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
            <div style={{ flex: 1 }}>
              {editingName ? (
                <input
                  autoFocus
                  style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", border: "none", borderBottom: "2px solid #FF7C6F", background: "transparent", outline: "none", width: "100%", marginBottom: "8px" }}
                  value={currentBriefName}
                  onChange={(e) => setCurrentBriefName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", margin: 0 }}>{currentBriefName}</h1>
                  <button onClick={() => setEditingName(true)} style={{ fontSize: "12px", color: "#6B6B6B", background: "#FAFAF8", border: "1px solid #EFEFED", cursor: "pointer", fontFamily: "var(--font-sans)", padding: "4px 8px", borderRadius: "4px" }}>Rename</button>
                </div>
              )}
              <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
                Fill in your campaign details and download a professional brief to share with podcasters.
              </p>
            </div>
          </div>

          {/* Action bar */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={handleSave} disabled={saving} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: saving ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "11px 20px", cursor: "pointer" }}>
              {saving ? "Saving..." : saved ? "✓ Saved!" : "Save brief"}
            </button>
            <button onClick={handlePrint} disabled={generating} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#00215e", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "11px 20px", cursor: "pointer" }}>
              {generating ? "Preparing..." : "Download as PDF"}
            </button>
            <button onClick={newBrief} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "6px", padding: "11px 20px", cursor: "pointer" }}>
              + New brief
            </button>
            {savedBriefs.length > 0 && (
              <button onClick={() => setShowSaved(!showSaved)} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "6px", padding: "11px 20px", cursor: "pointer" }}>
                Saved briefs ({savedBriefs.length})
              </button>
            )}
          </div>

          {/* Saved briefs panel */}
          {showSaved && (
            <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "20px", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "16px" }}>Your saved briefs</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {savedBriefs.map((brief) => (
                  <div key={brief.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: currentBriefId === brief.id ? "#FFF0EE" : "#FAFAF8", borderRadius: "8px", border: currentBriefId === brief.id ? "1px solid #FFD4CC" : "1px solid #EFEFED" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", margin: "0 0 2px" }}>{brief.brief_name}</p>
                      <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", margin: 0 }}>
                        Last saved {new Date(brief.updated_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => loadBrief(brief)} style={{ fontSize: "13px", fontWeight: "600", color: "#FF7C6F", background: "#FFF0EE", border: "none", borderRadius: "6px", padding: "8px 14px", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Load</button>
                      <button onClick={() => deleteBrief(brief.id)} style={{ fontSize: "13px", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "8px 14px", cursor: "pointer", fontFamily: "var(--font-sans)" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 1 — Campaign overview */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Campaign overview</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Brand name</label>
                  <input style={inputStyle} value={form.brandName} onChange={(e) => update("brandName", e.target.value)} placeholder="e.g. BRITA" />
                </div>
                <div>
                  <label style={labelStyle}>Campaign name {optionalBadge}</label>
                  <input style={inputStyle} value={form.campaignName} onChange={(e) => update("campaignName", e.target.value)} placeholder="e.g. Global Podcast Campaign 2026" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Project overview</label>
                <textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} value={form.projectOverview} onChange={(e) => update("projectOverview", e.target.value)} placeholder="Describe the campaign — what are you creating, across which channels, and what is the overall scope?" />
                <p style={hintStyle}>Include the formats you're buying, the number of episodes or posts, and any key campaign moments or timing.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Campaign period</label>
                  <input style={inputStyle} value={form.campaignPeriod} onChange={(e) => update("campaignPeriod", e.target.value)} placeholder="e.g. June – August 2026" />
                </div>
                <div>
                  <label style={labelStyle}>Minimum guarantees {optionalBadge}</label>
                  <input style={inputStyle} value={form.minimumGuarantees} onChange={(e) => update("minimumGuarantees", e.target.value)} placeholder="e.g. 5,000 listens per episode" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 — Deliverables */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Deliverables</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Ad formats requested</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.adFormats} onChange={(e) => update("adFormats", e.target.value)} placeholder="e.g.&#10;• 1 x mid-roll host-read ad (60 seconds)&#10;• 1 x social amplification (Instagram Reels)&#10;• 3 x newsletter mentions" />
              </div>
              <div>
                <label style={labelStyle}>Number of episodes {optionalBadge}</label>
                <input style={inputStyle} value={form.episodeCount} onChange={(e) => update("episodeCount", e.target.value)} placeholder="e.g. 3 episodes across 8 weeks" />
              </div>
            </div>
          </div>

          {/* Section 3 — Objectives */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Campaign objectives</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Goals and desired outcomes</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.campaignObjectives} onChange={(e) => update("campaignObjectives", e.target.value)} placeholder="e.g.&#10;• Drive awareness of our new product launch&#10;• Build brand affinity with 25-44 female audience" />
              </div>
              <div>
                <label style={labelStyle}>Measurable objectives {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.measurableObjectives} onChange={(e) => update("measurableObjectives", e.target.value)} placeholder="e.g. Achieve 10,000 total listens, 500 promo code uses" />
              </div>
            </div>
          </div>

          {/* Section 4 — Product */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Product details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>About the product</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.productDescription} onChange={(e) => update("productDescription", e.target.value)} placeholder="Describe your product clearly — what it is, what it does, and what makes it different." />
              </div>
              <div>
                <label style={labelStyle}>Key benefits and messaging</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.keyBenefits} onChange={(e) => update("keyBenefits", e.target.value)} placeholder="e.g.&#10;• Key benefit 1&#10;• Key benefit 2&#10;• Core campaign message or tagline" />
              </div>
              <div>
                <label style={labelStyle}>Value proposition {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.valueProposition} onChange={(e) => update("valueProposition", e.target.value)} placeholder="In one or two sentences, what is the core promise of this product?" />
              </div>
            </div>
          </div>

          {/* Section 5 — Audience */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Target audience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Who are you trying to reach?</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} placeholder="e.g. Women aged 25-44, based in Australia, interested in wellness and sustainability." />
              </div>
              <div>
                <label style={labelStyle}>Desired audience takeaway</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.audienceTakeaway} onChange={(e) => update("audienceTakeaway", e.target.value)} placeholder="What do you want the audience to think, feel or do after hearing this ad?" />
              </div>
            </div>
          </div>

          {/* Section 6 — Look and feel */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Campaign look and feel</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Tone and style</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.toneAndStyle} onChange={(e) => update("toneAndStyle", e.target.value)} placeholder="e.g. Authentic, conversational and relatable. Not overly polished or aspirational." />
              </div>
              <div>
                <label style={labelStyle}>Key messages {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.keyMessages} onChange={(e) => update("keyMessages", e.target.value)} placeholder="Any specific phrases, taglines or messages that must be included." />
              </div>
            </div>
          </div>

          {/* Section 7 — Guidelines */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Content guidelines</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Do's</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.dos} onChange={(e) => update("dos", e.target.value)} placeholder="e.g.&#10;• Put your own spin on the content&#10;• Draw on your own personal experiences" />
              </div>
              <div>
                <label style={labelStyle}>Don'ts</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.donts} onChange={(e) => update("donts", e.target.value)} placeholder="e.g.&#10;• Do not mention competitor brands&#10;• Do not go live without approval" />
              </div>
              <div>
                <label style={labelStyle}>Branding standards {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.brandingStandards} onChange={(e) => update("brandingStandards", e.target.value)} placeholder="e.g. Brand name pronunciation, logo usage, how to refer to products correctly." />
              </div>
              <div>
                <label style={labelStyle}>Competitor brands to avoid {optionalBadge}</label>
                <input style={inputStyle} value={form.competitorBrands} onChange={(e) => update("competitorBrands", e.target.value)} placeholder="e.g. Brand A, Brand B" />
              </div>
            </div>
          </div>

          {/* Section 8 — Social */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Social handles and hashtags {optionalBadge}</h2>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "24px" }}>Only include if social amplification is part of this campaign.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Social handles</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.socialHandles} onChange={(e) => update("socialHandles", e.target.value)} placeholder="e.g.&#10;Instagram: @yourbrand&#10;TikTok: @yourbrand" />
              </div>
              <div>
                <label style={labelStyle}>Hashtags</label>
                <input style={inputStyle} value={form.hashtags} onChange={(e) => update("hashtags", e.target.value)} placeholder="e.g. #yourbrand #campaignhashtag #Ad" />
              </div>
            </div>
          </div>

          {/* Section 9 — Additional */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Additional information {optionalBadge}</h2>
            <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} placeholder="Anything else the podcaster needs to know." />
          </div>

          <div style={{ display: "flex", gap: "12px", paddingTop: "16px" }}>
            <button onClick={handleSave} disabled={saving} style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: saving ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "16px 32px", cursor: "pointer" }}>
              {saving ? "Saving..." : saved ? "✓ Saved!" : "Save brief"}
            </button>
            <button onClick={handlePrint} disabled={generating} style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#00215e", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "16px 32px", cursor: "pointer" }}>
              {generating ? "Preparing..." : "Download as PDF →"}
            </button>
          </div>
          <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "12px" }}>
            Your browser's print dialog will open — select "Save as PDF" to download.
          </p>
        </div>
        <Footer />
      </div>

      {/* Print area */}
      <div className="print-area" style={{ padding: "60px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
        <div style={{ borderBottom: "3px solid #FF7C6F", paddingBottom: "24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#FF7C6F", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 8px" }}>Campaign Brief</p>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", margin: "0 0 4px", letterSpacing: "-0.8px" }}>{form.brandName}{form.campaignName ? ` — ${form.campaignName}` : ""}</h1>
              {form.campaignPeriod && <p style={{ fontSize: "14px", color: "#6B6B6B", margin: 0 }}>{form.campaignPeriod}</p>}
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "10px", color: "#AAAAAA", margin: "4px 0 0" }}>via SponStudio ✦</p>
              <p style={{ fontSize: "11px", color: "#6B6B6B", margin: 0 }}>{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
        </div>

        {form.projectOverview && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Campaign overview</h2><p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 12px", whiteSpace: "pre-line" }}>{form.projectOverview}</p><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>{[{ label: "Campaign period", value: form.campaignPeriod }, { label: "Minimum guarantees", value: form.minimumGuarantees }].filter(i => i.value).map((item) => (<div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p><p style={{ fontSize: "13px", color: "#00215e", fontWeight: "600", margin: 0 }}>{item.value}</p></div>))}</div></div>)}
        {(form.adFormats || form.episodeCount) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Deliverables</h2>{form.adFormats && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 8px", whiteSpace: "pre-line" }}>{form.adFormats}</p>}{form.episodeCount && <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0 }}>{form.episodeCount}</p>}</div>)}
        {(form.campaignObjectives || form.measurableObjectives) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Campaign objectives</h2>{form.campaignObjectives && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 8px", whiteSpace: "pre-line" }}>{form.campaignObjectives}</p>}{form.measurableObjectives && (<div style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px", marginTop: "8px" }}><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Measurable objectives</p><p style={{ fontSize: "13px", color: "#00215e", margin: 0, lineHeight: "1.6" }}>{form.measurableObjectives}</p></div>)}</div>)}
        {(form.productDescription || form.keyBenefits || form.valueProposition) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Product details</h2>{form.productDescription && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 10px" }}>{form.productDescription}</p>}{form.keyBenefits && (<div style={{ marginBottom: "10px" }}><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Key benefits</p><p style={{ fontSize: "13px", color: "#333", lineHeight: "1.6", margin: 0, whiteSpace: "pre-line" }}>{form.keyBenefits}</p></div>)}{form.valueProposition && (<div style={{ background: "#FFF0EE", borderLeft: "3px solid #FF7C6F", padding: "12px 16px", borderRadius: "0 6px 6px 0" }}><p style={{ fontSize: "13px", color: "#333", margin: 0, lineHeight: "1.6", fontStyle: "italic" }}>{form.valueProposition}</p></div>)}</div>)}
        {(form.targetAudience || form.audienceTakeaway) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Target audience</h2>{form.targetAudience && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 10px" }}>{form.targetAudience}</p>}{form.audienceTakeaway && (<div style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Desired audience takeaway</p><p style={{ fontSize: "13px", color: "#00215e", margin: 0, lineHeight: "1.6" }}>{form.audienceTakeaway}</p></div>)}</div>)}
        {(form.toneAndStyle || form.keyMessages) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Campaign look and feel</h2>{form.toneAndStyle && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 10px" }}>{form.toneAndStyle}</p>}{form.keyMessages && (<div style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Key messages</p><p style={{ fontSize: "13px", color: "#00215e", margin: 0, lineHeight: "1.6" }}>{form.keyMessages}</p></div>)}</div>)}
        {(form.dos || form.donts || form.brandingStandards || form.competitorBrands) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Content guidelines</h2><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>{form.dos && (<div style={{ background: "#EAF3DE", borderRadius: "8px", padding: "14px 16px" }}><p style={{ fontSize: "11px", fontWeight: "700", color: "#27500A", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Do's</p><p style={{ fontSize: "13px", color: "#27500A", margin: 0, lineHeight: "1.6", whiteSpace: "pre-line" }}>{form.dos}</p></div>)}{form.donts && (<div style={{ background: "#FCEBEB", borderRadius: "8px", padding: "14px 16px" }}><p style={{ fontSize: "11px", fontWeight: "700", color: "#A32D2D", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Don'ts</p><p style={{ fontSize: "13px", color: "#A32D2D", margin: 0, lineHeight: "1.6", whiteSpace: "pre-line" }}>{form.donts}</p></div>)}</div>{form.brandingStandards && (<div style={{ marginBottom: "10px" }}><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Branding standards</p><p style={{ fontSize: "13px", color: "#333", lineHeight: "1.6", margin: 0 }}>{form.brandingStandards}</p></div>)}{form.competitorBrands && (<div><p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Competitor brands to avoid</p><p style={{ fontSize: "13px", color: "#333", margin: 0 }}>{form.competitorBrands}</p></div>)}</div>)}
        {(form.socialHandles || form.hashtags) && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Social handles and hashtags</h2>{form.socialHandles && <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.6", margin: "0 0 8px", whiteSpace: "pre-line" }}>{form.socialHandles}</p>}{form.hashtags && <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0 }}>{form.hashtags}</p>}</div>)}
        {form.additionalInfo && (<div style={{ marginBottom: "28px" }}><h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Additional information</h2><p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: 0, whiteSpace: "pre-line" }}>{form.additionalInfo}</p></div>)}

        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "11px", color: "#AAAAAA", margin: 0 }}>Generated via SponStudio ✦ sponstudio.com</p>
          <p style={{ fontSize: "11px", color: "#AAAAAA", margin: 0 }}>{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </>
  );
}
