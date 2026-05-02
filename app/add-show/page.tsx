"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
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
const errorInputStyle: React.CSSProperties = { ...inputStyle, borderColor: "#FF7C6F" };
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

export default function AddShow() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    rssUrl: "", podcastName: "", category: "", podcastFormat: "", youtube: "",
    listensRange: "", bestMonth: "", milestones: "",
    audienceLocation1: "", audienceLocation2: "", audienceLocation3: "",
    ageRange: "", gender: "",
    adFormats: [] as string[], rates: "", lookingFor: "", previousSponsors: "",
    instagram: "", tiktok: "", linkedin: "", facebook: "", coverArtUrl: "", description: "",
  });

  const [rssLoading, setRssLoading] = useState(false);

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
    try {
      const res = await fetch(`/api/parse-rss?url=${encodeURIComponent(form.rssUrl)}`);
      const data = await res.json();
      if (data.name) {
        setForm((f) => ({ ...f, podcastName: f.podcastName || data.name }));
      }
    } catch (e) {
      console.error("RSS fetch failed", e);
    } finally {
      setRssLoading(false);
    }
  };

  const validateStep = () => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!form.rssUrl.trim()) errors.rssUrl = "RSS feed URL is required";
      if (!form.podcastName.trim()) errors.podcastName = "Podcast name is required";
      if (!form.category) errors.category = "Category is required";
      if (!form.podcastFormat) errors.podcastFormat = "Podcast format is required";
    }
    if (step === 2) {
      if (!form.listensRange) errors.listensRange = "Listens range is required";
      if (!form.audienceLocation1) errors.audienceLocation1 = "Primary location is required";
      if (!form.ageRange) errors.ageRange = "Age range is required";
      if (!form.gender) errors.gender = "Audience gender is required";
    }
    if (step === 3) {
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
    setSubmitting(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("Not logged in");

      const { data: userProfile } = await supabase
        .from("podcasters")
        .select("publisher_name, email")
        .eq("user_id", session.user.id)
        .single();

      const { error: insertError } = await supabase.from("podcasters").insert({
        user_id: session.user.id,
        podcast_name: form.podcastName,
        publisher_name: userProfile?.publisher_name || session.user.email,
        email: userProfile?.email || session.user.email,
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
        cover_art_url: form.coverArtUrl,
        description: form.description,
        status: "pending",
      });

      if (insertError) throw insertError;

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_application",
          data: {
            podcastName: form.podcastName,
            publisherName: userProfile?.publisher_name || session.user.email,
            email: userProfile?.email || session.user.email,
            category: form.category,
            listensRange: form.listensRange,
            location: form.audienceLocation1,
          },
        }),
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  if (loading) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
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
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Access denied</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>You need a podcaster account to add a show.</p>
          <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
        </div>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>🎙</div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "16px" }}>Show submitted!</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>
            {form.podcastName} has been submitted for review. We'll be in touch within 2 to 3 business days.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/profile/edit" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              Manage my shows
            </a>
            <a href="/add-show" onClick={() => { setSubmitted(false); setStep(1); setForm({ rssUrl: "", podcastName: "", category: "", podcastFormat: "", youtube: "", listensRange: "", bestMonth: "", milestones: "", audienceLocation1: "", audienceLocation2: "", audienceLocation3: "", ageRange: "", gender: "", adFormats: [], rates: "", lookingFor: "", previousSponsors: "", instagram: "", tiktok: "", linkedin: "", facebook: "", coverArtUrl: "", description: "" }); }} style={{ background: "#FFFFFF", color: "#00215e", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", border: "1px solid #EFEFED", fontFamily: "var(--font-sans)" }}>
              Add another show
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "60px 24px 100px" }}>

        <div style={{ marginBottom: "12px" }}>
          <a href="/profile/edit" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>← Back to my shows</a>
        </div>

        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px", marginTop: "16px" }}>Add another show</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>
          Adding a new show to your existing account. No need to create a new login.
        </p>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Step {step} of {totalSteps}
            </span>
            <span style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
              {step === 1 && "Your show"}
              {step === 2 && "Your audience"}
              {step === 3 && "Ad formats and rates"}
              {step === 4 && "Socials"}
              {step === 5 && "Review and submit"}
            </span>
          </div>
          <div style={{ background: "#EFEFED", borderRadius: "100px", height: "4px", width: "100%" }}>
            <div style={{ background: "#FF7C6F", borderRadius: "100px", height: "4px", width: progressWidth + "%", transition: "width 0.3s ease" }} />
          </div>
        </div>

        {step === 1 && (
          <div>
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
                <p style={hintStyle}>Multiple shows can share the same RSS feed — just enter each show's details separately.</p>
              </div>
              <div>
                <label style={labelStyle}>Podcast name</label>
                <input style={fieldErrors.podcastName ? errorInputStyle : inputStyle} type="text" placeholder="Enter your podcast name" value={form.podcastName} onChange={(e) => update("podcastName", e.target.value)} />
                {fieldErrors.podcastName && <p style={errorStyle}>{fieldErrors.podcastName}</p>}
              </div>
              <div>
                <label style={labelStyle}>About your podcast <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="Write a short description — what's your show about, who is it for, and what makes it unique?" value={form.description || ""} onChange={(e) => update("description", e.target.value)} />
                <p style={hintStyle}>This appears on your public profile and helps brands understand your show.</p>
              </div>
              <div>
                <label style={labelStyle}>Cover art <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const fileExt = file.name.split(".").pop();
                  const fileName = `${Date.now()}.${fileExt}`;
                  const { data, error } = await supabase.storage.from("cover-art").upload(fileName, file);
                  if (!error && data) {
                    const { data: urlData } = supabase.storage.from("cover-art").getPublicUrl(fileName);
                    update("coverArtUrl", urlData.publicUrl);
                  }
                }} />
                {form.coverArtUrl && (
                  <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={form.coverArtUrl} alt="Cover art" style={{ width: "48px", height: "48px", borderRadius: "6px", objectFit: "cover" }} />
                    <p style={{ fontSize: "12px", color: "#27500A", fontFamily: "var(--font-sans)" }}>✓ Cover art uploaded!</p>
                  </div>
                )}
                <p style={hintStyle}>Square images work best (1400x1400px recommended).</p>
              </div>
              <div>
                <input style={inputStyle} type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const fileExt = file.name.split(".").pop();
                  const fileName = `${Date.now()}.${fileExt}`;
                  const { data, error } = await supabase.storage.from("cover-art").upload(fileName, file);
                  if (!error && data) {
                    const { data: urlData } = supabase.storage.from("cover-art").getPublicUrl(fileName);
                    update("coverArtUrl", urlData.publicUrl);
                  }
                }} />
                {form.coverArtUrl && <p style={{ fontSize: "12px", color: "#27500A", fontFamily: "var(--font-sans)", marginTop: "6px" }}>✓ Cover art uploaded!</p>}
                <p style={hintStyle}>Square images work best (1400x1400px recommended).</p>
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
              </div>
              <div>
                <label style={labelStyle}>Featured YouTube video or channel URL <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="url" placeholder="https://youtube.com/watch?v=... or https://youtube.com/@yourchannel" value={form.youtube} onChange={(e) => update("youtube", e.target.value)} />
                <p style={hintStyle}>Paste a specific episode to showcase on your profile. Only visible to logged-in brands.</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px", lineHeight: "1.7" }}>
              Your stats are never shown publicly — only visible to verified brands logged in with a company email address.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Monthly listens range</label>
                <select style={fieldErrors.listensRange ? errorInputStyle : inputStyle} value={form.listensRange} onChange={(e) => update("listensRange", e.target.value)}>
                  <option value="">Select a range</option>
                  {LISTENS_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                {fieldErrors.listensRange && <p style={errorStyle}>{fieldErrors.listensRange}</p>}
                <p style={hintStyle}>Listens may include a combination of downloads, streams, Spotify plays, YouTube views and live streams.</p>
              </div>
              <div>
                <label style={labelStyle}>Best month <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <input style={inputStyle} type="text" placeholder="e.g. 14,200" value={form.bestMonth} onChange={(e) => update("bestMonth", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Additional wins or milestones <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="e.g. Featured on a Spotify playlist, nominated for a podcast award" value={form.milestones} onChange={(e) => update("milestones", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Top 3 audience locations</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
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

        {step === 3 && (
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
              <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.lookingFor} onChange={(e) => update("lookingFor", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Previous sponsors <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
              <input style={inputStyle} type="text" placeholder="e.g. Shopify, Canva, Audible" value={form.previousSponsors} onChange={(e) => update("previousSponsors", e.target.value)} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>All optional. Social links are only visible to logged-in brands.</p>
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
        )}

        {step === 5 && (
          <div>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px", lineHeight: "1.7" }}>Check your details and submit for review.</p>
            {[
              { label: "Podcast", value: form.podcastName },
              { label: "Category", value: form.category },
              { label: "Format", value: form.podcastFormat },
              { label: "Monthly listens", value: form.listensRange },
              { label: "Primary location", value: form.audienceLocation1 },
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
            disabled={submitting}
            style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: submitting ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: submitting ? "not-allowed" : "pointer", marginLeft: "auto" }}
          >
            {submitting ? "Submitting..." : step === totalSteps ? "Submit for review" : "Continue"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
