"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const CATEGORIES = [
  "Arts & Culture", "Business & Entrepreneurship", "Comedy",
  "Mental Health & Wellbeing", "Parenting & Family", "Politics & News",
  "Pop Culture & Commentary", "Science & Education", "Sport & Recreation",
  "Technology", "True Crime & Law"
];

const LOCATIONS = ["AU", "Canada", "NZ", "UK", "US", "Global"];
const LISTENS_RANGES = ["Under 1K", "1K to 10K", "10K to 50K", "50K to 200K", "200K+"];
const FORMATS = ["Audio only", "Video and audio", "Video only"];
const AD_FORMATS = ["Pre-roll", "Mid-roll", "Sponsored segment", "Product placement", "Native episode", "Social amplification"];
const AGE_RANGES = ["18-24", "25-34", "35-44", "45-54", "55+"];
const GENDER_OPTIONS = ["Predominantly identify as women", "Predominantly identify as men", "Mixed gender", "Unsure"];

const inputStyle: React.CSSProperties = {
  width: "100%", fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)",
  background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px",
  padding: "12px 16px", outline: "none", boxSizing: "border-box",
};

const errorInputStyle: React.CSSProperties = {
  ...inputStyle, borderColor: "#FF7C6F",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)",
  display: "block", marginBottom: "8px",
};

const hintStyle: React.CSSProperties = {
  fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px",
};

const errorStyle: React.CSSProperties = {
  fontSize: "12px", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginTop: "6px",
};

export default function PodcasterSignup() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "", email: "", password: "",
    rssUrl: "", podcastName: "", category: "", coverArt: "", podcastFormat: "",
    listensRange: "", bestMonth: "", milestones: "",
    audienceLocation1: "", audienceLocation2: "", audienceLocation3: "",
    ageRange: "", gender: "",
    adFormats: [] as string[], rates: "", lookingFor: "", previousSponsors: "",
    instagram: "", tiktok: "", youtubeChannel: "", linkedin: "", facebook: "", youtube: "",
  });

  const [rssLoading, setRssLoading] = useState(false);
  const [rssPreview, setRssPreview] = useState<{ name: string; description: string; coverArt: string } | null>(null);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((e) => ({ ...e, [field]: "" }));
  };

  const isVideoFormat = form.podcastFormat === "Video and audio" || form.podcastFormat === "Video only";

  const toggleFormat = (format: string) => {
    if (format === "Product placement" && !isVideoFormat) return;
    setForm((f) => ({
      ...f,
      adFormats: f.adFormats.includes(format)
        ? f.adFormats.filter((x) => x !== format)
        : [...f.adFormats, format],
    }));
    setFieldErrors((e) => ({ ...e, adFormats: "" }));
  };

  const fetchRSS = async () => {
    if (!form.rssUrl) return;
    setRssLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRssPreview({ name: "Your Podcast", description: "Auto-filled from RSS feed.", coverArt: "#E8D5C4" });
    setForm((f) => ({ ...f, podcastName: f.podcastName || "Your Podcast", coverArt: "#E8D5C4" }));
    setFieldErrors((e) => ({ ...e, rssUrl: "" }));
    setRssLoading(false);
  };

  const validateStep = () => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!form.name.trim()) errors.name = "Name is required";
      if (!form.email.trim()) errors.email = "Email is required";
      if (!form.password.trim()) errors.password = "Password is required";
      else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";
    }

    if (step === 2) {
      if (!form.rssUrl.trim()) errors.rssUrl = "RSS feed URL is required";
      if (!form.podcastName.trim()) errors.podcastName = "Podcast name is required";
      if (!form.category) errors.category = "Category is required";
      if (!form.podcastFormat) errors.podcastFormat = "Podcast format is required";
    }

    if (step === 3) {
      if (!form.listensRange) errors.listensRange = "Listens range is required";
      if (!form.audienceLocation1) errors.audienceLocation1 = "Primary location is required";
      if (!form.ageRange) errors.ageRange = "Age range is required";
      if (!form.gender) errors.gender = "Audience gender is required";
    }

    if (step === 4) {
      if (form.adFormats.length === 0) errors.adFormats = "Please select at least one ad format";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < totalSteps) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name, role: "podcaster" } }
      });
      if (authError) throw authError;
      if (authData.user) {
        const { error: profileError } = await supabase.from("podcasters").insert({
          user_id: authData.user.id,
          podcast_name: form.podcastName,
          publisher_name: form.name,
          email: form.email,
          category: form.category,
          location: form.audienceLocation1,
          podcast_format: form.podcastFormat,
          rss_url: form.rssUrl,
          listens_range: form.listensRange,
          best_month: form.bestMonth,
          best_month_context: form.milestones,
          audience_location_1: form.audienceLocation1,
          audience_location_2: form.audienceLocation2,
          audience_location_3: form.audienceLocation3,
          age_range: form.ageRange,
          gender: form.gender,
          ad_formats: form.adFormats,
          rates: form.rates,
          looking_for: form.lookingFor,
          previous_sponsors: form.previousSponsors,
          instagram: form.instagram,
          tiktok: form.tiktok,
          youtube: form.youtube,
          linkedin: form.linkedin,
          facebook: form.facebook,
          status: "pending",
        });
        if (profileError) throw profileError;
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  if (submitted) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>🎙</div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "16px" }}>
            You're submitted!
          </h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "12px" }}>
            Thanks for listing your podcast on SponStudio. We'll review your application and be in touch within 2 to 3 business days.
          </p>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>
            Check your email to confirm your account.
          </p>
          <a href="/browse" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
            Browse the marketplace
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "60px 24px 100px" }}>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Step {step} of {totalSteps}
            </span>
            <span style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
              {step === 1 && "Your account"}
              {step === 2 && "Your show"}
              {step === 3 && "Your audience"}
              {step === 4 && "Ad formats and rates"}
              {step === 5 && "Socials"}
              {step === 6 && "Review and submit"}
            </span>
          </div>
          <div style={{ background: "#EFEFED", borderRadius: "100px", height: "4px", width: "100%" }}>
            <div style={{ background: "#FF7C6F", borderRadius: "100px", height: "4px", width: progressWidth + "%", transition: "width 0.3s ease" }} />
          </div>
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Create your account</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>List your podcast for free and start getting discovered by brands.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input style={fieldErrors.name ? errorInputStyle : inputStyle} type="text" placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} />
                {fieldErrors.name && <p style={errorStyle}>{fieldErrors.name}</p>}
              </div>
              <div>
                <label style={labelStyle}>Email address</label>
                <input style={fieldErrors.email ? errorInputStyle : inputStyle} type="email" placeholder="you@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                {fieldErrors.email && <p style={errorStyle}>{fieldErrors.email}</p>}
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input style={fieldErrors.password ? errorInputStyle : inputStyle} type="password" placeholder="At least 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
                {fieldErrors.password && <p style={errorStyle}>{fieldErrors.password}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Your show</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>Paste your RSS feed and we will pull your show details automatically.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>RSS feed URL</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input style={{ ...(fieldErrors.rssUrl ? errorInputStyle : inputStyle), flex: 1 }} type="url" placeholder="https://feeds.example.com/yourshow" value={form.rssUrl} onChange={(e) => update("rssUrl", e.target.value)} />
                  <button onClick={fetchRSS} style={{ background: "#00215e", color: "#FFFFFF", border: "none", borderRadius: "6px", padding: "0 16px", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", cursor: "pointer", whiteSpace: "nowrap" }}>
                    {rssLoading ? "Loading..." : "Fetch"}
                  </button>
                </div>
                {fieldErrors.rssUrl && <p style={errorStyle}>{fieldErrors.rssUrl}</p>}
                <p style={hintStyle}>Your RSS feed URL can be found in your podcast hosting platform settings.</p>
              </div>
              {rssPreview && (
                <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: rssPreview.coverArt, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "24px", opacity: 0.4 }}>🎙</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{rssPreview.name}</p>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{rssPreview.description}</p>
                  </div>
                </div>
              )}
              <div>
                <label style={labelStyle}>Podcast name</label>
                <input style={fieldErrors.podcastName ? errorInputStyle : inputStyle} type="text" placeholder="Enter your podcast name" value={form.podcastName} onChange={(e) => update("podcastName", e.target.value)} />
                <p style={hintStyle}>Enter your podcast name manually — the RSS fetch is just a guide.</p>
                {fieldErrors.podcastName && <p style={errorStyle}>{fieldErrors.podcastName}</p>}
              </div>
              <div>
                <label style={labelStyle}>Cover art <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) update("coverArtFile", file.name);
                }} />
                <p style={hintStyle}>Upload your podcast cover art. Square images work best (1400x1400px recommended).</p>
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select style={fieldErrors.category ? errorInputStyle : inputStyle} value={form.category} onChange={(e) => update("category", e.target.value)}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {fieldErrors.category && <p style={errorStyle}>{fieldErrors.category}</p>}
              </div>
              <div>
                <label style={labelStyle}>Podcast format</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FORMATS.map((f) => (
                    <button key={f} onClick={() => update("podcastFormat", f)} style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: "600", padding: "10px 18px", borderRadius: "6px", border: form.podcastFormat === f ? "1.5px solid #FF7C6F" : fieldErrors.podcastFormat ? "1px solid #FF7C6F" : "1px solid #EFEFED", background: form.podcastFormat === f ? "#FFF0EE" : "#FFFFFF", color: form.podcastFormat === f ? "#FF7C6F" : "#6B6B6B", cursor: "pointer" }}>
                      {f}
                    </button>
                  ))}
                </div>
                {fieldErrors.podcastFormat && <p style={errorStyle}>{fieldErrors.podcastFormat}</p>}
                <p style={hintStyle}>This determines which ad formats are available to you.</p>
              </div>
              <div>
                <label style={labelStyle}>Featured YouTube video or channel URL <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="url" placeholder="https://youtube.com/watch?v=... or https://youtube.com/@yourchannel" value={form.youtube} onChange={(e) => update("youtube", e.target.value)} />
                <p style={hintStyle}>Paste a specific episode to showcase on your profile, or your channel URL. Only visible to logged-in brands.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Your audience</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>All figures are self-reported and will be labelled as such on your profile. Your stats are never shown publicly — listener numbers and audience demographics are only visible to verified brands logged in with a company email address.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Monthly listens range</label>
                <select style={fieldErrors.listensRange ? errorInputStyle : inputStyle} value={form.listensRange} onChange={(e) => update("listensRange", e.target.value)}>
                  <option value="">Select a range</option>
                  {LISTENS_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {fieldErrors.listensRange && <p style={errorStyle}>{fieldErrors.listensRange}</p>}
                <p style={hintStyle}>Listens include downloads, streams, Spotify plays, YouTube views and live streams.</p>
              </div>
              <div>
                <label style={labelStyle}>Best month <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="text" placeholder="e.g. 14,200" value={form.bestMonth} onChange={(e) => update("bestMonth", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Additional wins or milestones <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="e.g. Featured on a Spotify playlist, nominated for a podcast award, notable guest appearance" value={form.milestones} onChange={(e) => update("milestones", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Top 3 audience locations</label>
                <p style={hintStyle}>Your show appears in search results for each location you select.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
                  <select style={fieldErrors.audienceLocation1 ? errorInputStyle : inputStyle} value={form.audienceLocation1} onChange={(e) => update("audienceLocation1", e.target.value)}>
                    <option value="">Top location</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {fieldErrors.audienceLocation1 && <p style={errorStyle}>{fieldErrors.audienceLocation1}</p>}
                  <select style={inputStyle} value={form.audienceLocation2} onChange={(e) => update("audienceLocation2", e.target.value)}>
                    <option value="">Second location (optional)</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <select style={inputStyle} value={form.audienceLocation3} onChange={(e) => update("audienceLocation3", e.target.value)}>
                    <option value="">Third location (optional)</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Audience age range</label>
                <select style={fieldErrors.ageRange ? errorInputStyle : inputStyle} value={form.ageRange} onChange={(e) => update("ageRange", e.target.value)}>
                  <option value="">Select primary age range</option>
                  {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                {fieldErrors.ageRange && <p style={errorStyle}>{fieldErrors.ageRange}</p>}
              </div>
              <div>
                <label style={labelStyle}>Audience gender</label>
                <select style={fieldErrors.gender ? errorInputStyle : inputStyle} value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                  <option value="">Select</option>
                  {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                {fieldErrors.gender && <p style={errorStyle}>{fieldErrors.gender}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Ad formats and rates</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>Let brands know what you offer and what you charge.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Ad formats offered</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                  {AD_FORMATS.map((format) => {
                    const isLocked = format === "Product placement" && !isVideoFormat;
                    const isSelected = form.adFormats.includes(format);
                    return (
                      <button key={format} onClick={() => toggleFormat(format)} disabled={isLocked} style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: "600", padding: "8px 14px", borderRadius: "6px", border: isSelected ? "1.5px solid #FF7C6F" : fieldErrors.adFormats && !isLocked ? "1px solid #FF7C6F" : "1px solid #EFEFED", background: isLocked ? "#FAFAF8" : isSelected ? "#FFF0EE" : "#FFFFFF", color: isLocked ? "#D3D1C7" : isSelected ? "#FF7C6F" : "#6B6B6B", cursor: isLocked ? "not-allowed" : "pointer" }}>
                        {format} {isLocked ? "🔒" : ""}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.adFormats && <p style={errorStyle}>{fieldErrors.adFormats}</p>}
                {!isVideoFormat && <p style={{ ...hintStyle, marginTop: "10px" }}>✦ Product placement is only available for video podcasts.</p>}
              </div>
              <div>
                <label style={labelStyle}>Rates <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="text" placeholder="e.g. From $150 per episode" value={form.rates} onChange={(e) => update("rates", e.target.value)} />
                <p style={hintStyle}>✦ Podcasters who include rates tend to get more relevant brand enquiries.</p>
              </div>
              <div>
                <label style={labelStyle}>What are you looking for in a brand partner? <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="e.g. We love working with brands that align with our values around sustainability and wellness." value={form.lookingFor} onChange={(e) => update("lookingFor", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Previous sponsors <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="text" placeholder="e.g. Shopify, Canva, Audible" value={form.previousSponsors} onChange={(e) => update("previousSponsors", e.target.value)} />
                <p style={hintStyle}>Self-reported. Separate multiple sponsors with commas.</p>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Your socials</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>All optional. Social links are only visible to logged-in brands.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { key: "instagram", label: "Instagram", placeholder: "@yourhandle" },
                { key: "tiktok", label: "TikTok", placeholder: "@yourhandle" },
                { key: "linkedin", label: "LinkedIn", placeholder: "Profile or page URL" },
                { key: "facebook", label: "Facebook", placeholder: "Page URL" },
              ].map((social) => (
                <div key={social.key}>
                  <label style={labelStyle}>{social.label}</label>
                  <input style={inputStyle} type="text" placeholder={social.placeholder} value={form[social.key as keyof typeof form] as string} onChange={(e) => update(social.key, e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Review and submit</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>Almost there. Check your details and submit for review. We will be in touch within 2 to 3 business days.</p>
            {[
              { label: "Name", value: form.name },
              { label: "Email", value: form.email },
              { label: "Podcast", value: form.podcastName },
              { label: "Category", value: form.category },
              { label: "Format", value: form.podcastFormat },
              { label: "Monthly listens", value: form.listensRange },
              { label: "Primary audience location", value: form.audienceLocation1 },
              { label: "Age range", value: form.ageRange },
              { label: "Gender", value: form.gender },
              { label: "Ad formats", value: form.adFormats.join(", ") },
              { label: "Rates", value: form.rates || "Not provided" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #EFEFED" }}>
                <span style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", fontWeight: "500" }}>{item.label}</span>
                <span style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", fontWeight: "600", textAlign: "right", maxWidth: "60%" }}>{item.value || "Not provided"}</span>
              </div>
            ))}
            {error && (
              <div style={{ background: "#FCEBEB", border: "1px solid #F09595", borderRadius: "8px", padding: "12px 16px", marginTop: "20px" }}>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>{error}</p>
              </div>
            )}
            <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "8px", padding: "16px", marginTop: "24px" }}>
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
                By submitting, you confirm that all information is accurate to the best of your knowledge. Listener numbers are self-reported and will be labelled as such on your profile.
              </p>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", gap: "12px" }}>
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "13px 24px", cursor: "pointer" }}>
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={loading}
            style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: loading ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: loading ? "not-allowed" : "pointer", marginLeft: "auto" }}
          >
            {loading ? "Submitting..." : step === totalSteps ? "Submit for review" : "Continue"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
