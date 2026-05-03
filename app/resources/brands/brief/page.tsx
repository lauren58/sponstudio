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

export default function BriefBuilder() {
  const { isLoggedIn, isBrand, loading } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    // Campaign overview
    brandName: "",
    campaignName: "",
    projectOverview: "",
    // Objectives
    campaignObjectives: "",
    measurableObjectives: "",
    // Product
    productDescription: "",
    keyBenefits: "",
    valueProposition: "",
    // Audience
    targetAudience: "",
    audienceTakeaway: "",
    // Deliverables
    adFormats: "",
    episodeCount: "",
    campaignPeriod: "",
    minimumGuarantees: "",
    // Guidelines
    dos: "",
    donts: "",
    brandingStandards: "",
    // Look and feel
    toneAndStyle: "",
    keyMessages: "",
    // Social
    socialHandles: "",
    hashtags: "",
    // Additional
    additionalInfo: "",
    competitorBrands: "",
  });

  useEffect(() => {
    if (!isLoggedIn || !isBrand) return;
    const fetchBrand = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data } = await supabase.from("brands").select("company_name").eq("user_id", session.user.id).single();
      if (data) setForm((f) => ({ ...f, brandName: data.company_name || "" }));
    };
    fetchBrand();
  }, [isLoggedIn, isBrand]);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
            <div>
              <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Campaign brief builder</h1>
              <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", maxWidth: "520px" }}>
                Fill in your campaign details and download a professional brief to share with podcasters. The more detail you provide, the better the integration.
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

          {/* Section 3 — Campaign objectives */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Campaign objectives</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Goals and desired outcomes</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.campaignObjectives} onChange={(e) => update("campaignObjectives", e.target.value)} placeholder="e.g.&#10;• Drive awareness of our new product launch&#10;• Build brand affinity with 25-44 female audience&#10;• Position the brand as a lifestyle brand, not just functional" />
              </div>
              <div>
                <label style={labelStyle}>Measurable objectives {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.measurableObjectives} onChange={(e) => update("measurableObjectives", e.target.value)} placeholder="e.g. Achieve 10,000 total listens, 500 promo code uses, strong positive audience sentiment" />
              </div>
            </div>
          </div>

          {/* Section 4 — Product details */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Product details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>About the product</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.productDescription} onChange={(e) => update("productDescription", e.target.value)} placeholder="Describe your product clearly — what it is, what it does, and what makes it different. Give the podcaster everything they need to talk about it authentically." />
              </div>
              <div>
                <label style={labelStyle}>Key benefits and messaging</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.keyBenefits} onChange={(e) => update("keyBenefits", e.target.value)} placeholder="e.g.&#10;• Key benefit 1&#10;• Key benefit 2&#10;• Core campaign message or tagline" />
              </div>
              <div>
                <label style={labelStyle}>Value proposition {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.valueProposition} onChange={(e) => update("valueProposition", e.target.value)} placeholder="In one or two sentences, what is the core promise of this product to the customer?" />
              </div>
            </div>
          </div>

          {/* Section 5 — Target audience */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Target audience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Who are you trying to reach?</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} placeholder="e.g. Women aged 25-44, based in Australia, interested in wellness, self-care and sustainability. Career-focused, digitally native, values authenticity over aspiration." />
              </div>
              <div>
                <label style={labelStyle}>Desired audience takeaway</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.audienceTakeaway} onChange={(e) => update("audienceTakeaway", e.target.value)} placeholder="What do you want the audience to think, feel or do after hearing this ad?" />
              </div>
            </div>
          </div>

          {/* Section 6 — Campaign look and feel */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Campaign look and feel</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Tone and style</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.toneAndStyle} onChange={(e) => update("toneAndStyle", e.target.value)} placeholder="e.g. Authentic, conversational and relatable. Not overly polished or aspirational. Should feel like a real recommendation from a trusted friend, not a scripted ad." />
              </div>
              <div>
                <label style={labelStyle}>Key messages {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.keyMessages} onChange={(e) => update("keyMessages", e.target.value)} placeholder="Any specific phrases, taglines or messages that must be included or referenced." />
              </div>
            </div>
          </div>

          {/* Section 7 — Content guidelines */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px" }}>Content guidelines</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Do's</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.dos} onChange={(e) => update("dos", e.target.value)} placeholder="e.g.&#10;• Put your own spin on the content and make it feel authentic to your audience&#10;• Draw on your own personal experiences with the product&#10;• Emphasise aspects of the product that resonate most with your listeners" />
              </div>
              <div>
                <label style={labelStyle}>Don'ts</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.donts} onChange={(e) => update("donts", e.target.value)} placeholder="e.g.&#10;• Do not mention competitor brands&#10;• Do not make claims that are untrue or unverified&#10;• Do not go live without approval&#10;• Do not use music you do not have a licence for" />
              </div>
              <div>
                <label style={labelStyle}>Branding standards {optionalBadge}</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.brandingStandards} onChange={(e) => update("brandingStandards", e.target.value)} placeholder="e.g. Brand name pronunciation, logo usage, how to refer to products or partnerships correctly." />
              </div>
              <div>
                <label style={labelStyle}>Competitor brands to avoid {optionalBadge}</label>
                <input style={inputStyle} value={form.competitorBrands} onChange={(e) => update("competitorBrands", e.target.value)} placeholder="e.g. Brand A, Brand B, Brand C" />
              </div>
            </div>
          </div>

          {/* Section 8 — Social */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Social handles and hashtags {optionalBadge}</h2>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "24px", lineHeight: "1.7" }}>Only include if social amplification is part of this campaign.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Social handles</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.socialHandles} onChange={(e) => update("socialHandles", e.target.value)} placeholder="e.g.&#10;Instagram: @yourbrand&#10;TikTok: @yourbrand&#10;Facebook: @yourbrand" />
              </div>
              <div>
                <label style={labelStyle}>Hashtags</label>
                <input style={inputStyle} value={form.hashtags} onChange={(e) => update("hashtags", e.target.value)} placeholder="e.g. #yourbrand #campaignhashtag #Ad" />
              </div>
            </div>
          </div>

          {/* Section 9 — Additional info */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Additional information {optionalBadge}</h2>
            <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} placeholder="Anything else the podcaster needs to know — approval process, key contacts, asset links, legal requirements, etc." />
          </div>

          <div style={{ textAlign: "center", paddingTop: "16px" }}>
            <button onClick={handlePrint} disabled={generating} style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "16px 40px", cursor: "pointer" }}>
              {generating ? "Preparing PDF..." : "Download brief as PDF →"}
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

        {/* Campaign overview */}
        {form.projectOverview && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Campaign overview</h2>
            <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 12px", whiteSpace: "pre-line" }}>{form.projectOverview}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Campaign period", value: form.campaignPeriod },
                { label: "Minimum guarantees", value: form.minimumGuarantees },
              ].filter(i => i.value).map((item) => (
                <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "13px", color: "#00215e", fontWeight: "600", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {(form.adFormats || form.episodeCount) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Deliverables</h2>
            {form.adFormats && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 8px", whiteSpace: "pre-line" }}>{form.adFormats}</p>}
            {form.episodeCount && <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0 }}>{form.episodeCount}</p>}
          </div>
        )}

        {/* Objectives */}
        {(form.campaignObjectives || form.measurableObjectives) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Campaign objectives</h2>
            {form.campaignObjectives && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 8px", whiteSpace: "pre-line" }}>{form.campaignObjectives}</p>}
            {form.measurableObjectives && (
              <div style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px", marginTop: "8px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Measurable objectives</p>
                <p style={{ fontSize: "13px", color: "#00215e", margin: 0, lineHeight: "1.6" }}>{form.measurableObjectives}</p>
              </div>
            )}
          </div>
        )}

        {/* Product */}
        {(form.productDescription || form.keyBenefits || form.valueProposition) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Product details</h2>
            {form.productDescription && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 10px" }}>{form.productDescription}</p>}
            {form.keyBenefits && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Key benefits</p>
                <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.6", margin: 0, whiteSpace: "pre-line" }}>{form.keyBenefits}</p>
              </div>
            )}
            {form.valueProposition && (
              <div style={{ background: "#FFF0EE", borderLeft: "3px solid #FF7C6F", padding: "12px 16px", borderRadius: "0 6px 6px 0" }}>
                <p style={{ fontSize: "13px", color: "#333", margin: 0, lineHeight: "1.6", fontStyle: "italic" }}>{form.valueProposition}</p>
              </div>
            )}
          </div>
        )}

        {/* Audience */}
        {(form.targetAudience || form.audienceTakeaway) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Target audience</h2>
            {form.targetAudience && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 10px" }}>{form.targetAudience}</p>}
            {form.audienceTakeaway && (
              <div style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Desired audience takeaway</p>
                <p style={{ fontSize: "13px", color: "#00215e", margin: 0, lineHeight: "1.6" }}>{form.audienceTakeaway}</p>
              </div>
            )}
          </div>
        )}

        {/* Look and feel */}
        {(form.toneAndStyle || form.keyMessages) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Campaign look and feel</h2>
            {form.toneAndStyle && <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: "0 0 10px" }}>{form.toneAndStyle}</p>}
            {form.keyMessages && (
              <div style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px 14px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Key messages</p>
                <p style={{ fontSize: "13px", color: "#00215e", margin: 0, lineHeight: "1.6" }}>{form.keyMessages}</p>
              </div>
            )}
          </div>
        )}

        {/* Guidelines */}
        {(form.dos || form.donts || form.brandingStandards || form.competitorBrands) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>Content guidelines</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              {form.dos && (
                <div style={{ background: "#EAF3DE", borderRadius: "8px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "#27500A", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Do's</p>
                  <p style={{ fontSize: "13px", color: "#27500A", margin: 0, lineHeight: "1.6", whiteSpace: "pre-line" }}>{form.dos}</p>
                </div>
              )}
              {form.donts && (
                <div style={{ background: "#FCEBEB", borderRadius: "8px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "#A32D2D", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Don'ts</p>
                  <p style={{ fontSize: "13px", color: "#A32D2D", margin: 0, lineHeight: "1.6", whiteSpace: "pre-line" }}>{form.donts}</p>
                </div>
              )}
            </div>
            {form.brandingStandards && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Branding standards</p>
                <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.6", margin: 0 }}>{form.brandingStandards}</p>
              </div>
            )}
            {form.competitorBrands && (
              <div>
                <p style={{ fontSize: "10px", fontWeight: "700", color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>Competitor brands to avoid</p>
                <p style={{ fontSize: "13px", color: "#333", margin: 0 }}>{form.competitorBrands}</p>
              </div>
            )}
          </div>
        )}

        {/* Social */}
        {(form.socialHandles || form.hashtags) && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Social handles and hashtags</h2>
            {form.socialHandles && <p style={{ fontSize: "13px", color: "#333", lineHeight: "1.6", margin: "0 0 8px", whiteSpace: "pre-line" }}>{form.socialHandles}</p>}
            {form.hashtags && <p style={{ fontSize: "13px", color: "#6B6B6B", margin: 0 }}>{form.hashtags}</p>}
          </div>
        )}

        {/* Additional info */}
        {form.additionalInfo && (
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#00215e", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>Additional information</h2>
            <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.7", margin: 0, whiteSpace: "pre-line" }}>{form.additionalInfo}</p>
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
