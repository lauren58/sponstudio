"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

const CATEGORIES = [
  "Arts & Culture", "Business & Entrepreneurship", "Comedy",
  "Mental Health & Wellbeing", "Parenting & Family", "Politics & News",
  "Pop Culture & Commentary", "Science & Education", "Sport & Recreation",
  "Technology", "True Crime & Law"
];

const LOCATIONS = ["AU", "Canada", "NZ", "UK", "US", "Global"];
const LISTENS_RANGES = ["Under 1K", "1K to 10K", "10K to 50K", "50K to 200K", "200K+"];
const AD_FORMATS = ["Pre-roll", "Mid-roll", "Sponsored segment", "Product placement", "Native episode", "Social amplification"];
const AGE_RANGES = ["18-24", "25-34", "35-44", "45-54", "55+"];
const GENDER_OPTIONS = ["Predominantly identify as women", "Predominantly identify as men", "Mixed gender", "Unsure"];
const FORMATS = ["Audio only", "Video and audio", "Video only"];

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

export default function ProfileEditor() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [status, setStatus] = useState<"loading" | "pending" | "approved" | "declined" | "unauthorized">("loading");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus((s) => s === "loading" ? "unauthorized" : s);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  const [podcasterList, setPodcasterList] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn) { setStatus("unauthorized"); return; }
    if (!isPodcaster) { setStatus("unauthorized"); return; }
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setStatus("unauthorized"); return; }
      const { data } = await supabase.from("podcasters").select("*").eq("user_id", session.user.id);
      if (data && data.length > 0) {
        setPodcasterList(data);
        setSelectedId(data[0].id);
        setForm(mapToForm(data[0]));
        setStatus(data[0].status as any);
      } else {
        setStatus("unauthorized");
      }
    };
    fetchData();
  }, [isLoggedIn, isPodcaster, loading]);

  const mapToForm = (data: any) => ({
    podcastName: data.podcast_name || "",
    publisherName: data.publisher_name || "",
    category: data.category || "",
    podcastFormat: data.podcast_format || "",
    rssUrl: data.rss_url || "",
    youtube: data.youtube || "",
    coverArtUrl: data.cover_art_url || "",
    coverArtPosition: data.cover_art_position || "center",
    description: data.description || "",
    listensRange: data.listens_range || "",
    bestMonth: data.best_month || "",
    milestones: data.best_month_context || "",
    audienceLocation1: data.audience_location_1 || "",
    audienceLocation2: data.audience_location_2 || "",
    audienceLocation3: data.audience_location_3 || "",
    ageRange: data.age_range || "",
    gender: data.gender || "",
    adFormats: data.ad_formats || [],
    rates: data.rates || "",
    lookingFor: data.looking_for || "",
    previousSponsors: data.previous_sponsors || "",
    instagram: data.instagram || "",
    tiktok: data.tiktok || "",
    linkedin: data.linkedin || "",
    facebook: data.facebook || "",
  });

  const update = (field: string, value: string) => setForm((f: any) => ({ ...f, [field]: value }));

  const toggleFormat = (format: string) => {
    setForm((f: any) => ({
      ...f,
      adFormats: f.adFormats.includes(format)
        ? f.adFormats.filter((x: string) => x !== format)
        : [...f.adFormats, format],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from("podcasters").update({
      podcast_name: form.podcastName,
      publisher_name: form.publisherName,
      category: form.category,
      podcast_format: form.podcastFormat,
      rss_url: form.rssUrl,
      cover_art_url: form.coverArtUrl,
      cover_art_position: form.coverArtPosition,
      description: form.description,
      youtube: form.youtube,
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
      linkedin: form.linkedin,
      facebook: form.facebook,
    }).eq("id", selectedId);
    setSaving(false);
    if (!error) setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const switchShow = (id: string) => {
    const pod = podcasterList.find((p) => p.id === id);
    if (pod) { setSelectedId(id); setForm(mapToForm(pod)); }
  };

  const isVideoFormat = form?.podcastFormat === "Video and audio" || form?.podcastFormat === "Video only";

  if (status === "loading" || !form) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p></div><Footer /></div>
  );

  if (status === "unauthorized") return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Access denied</h1><a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a></div><Footer /></div>
  );

  if (status === "pending") return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "24px" }}>⏳</div>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Your application is under review</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>We'll review your listing and be in touch within 2 to 3 business days. You'll receive an email when you're approved.</p>
        <a href="/browse" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Browse the marketplace</a>
      </div>
      <Footer />
    </div>
  );

  if (status === "declined") return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "24px" }}>✦</div>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Application not approved</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>Unfortunately your listing wasn't approved at this time. Please get in touch if you have questions.</p>
        <a href="mailto:hello@sponstudio.com" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Contact us</a>
      </div>
      <Footer />
    </div>
  );

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "60px 24px 100px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Edit my profile</h1>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Changes save directly to your listing.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            {podcasterList.length > 1 && (
              <select value={selectedId} onChange={(e) => switchShow(e.target.value)} style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "9px 14px", cursor: "pointer" }}>
                {podcasterList.map((p) => <option key={p.id} value={p.id}>{p.podcast_name}</option>)}
              </select>
            )}
            <a href="/add-show" style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none", background: "#FFF0EE", padding: "9px 16px", borderRadius: "6px" }}>+ Add another show</a>
          </div>
        </div>

        {saved && (
          <div style={{ background: "#EAF3DE", border: "1px solid #97C459", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#27500A", fontFamily: "var(--font-sans)" }}>✓ Profile updated successfully!</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Show details */}
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>Show details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                <select style={inputStyle} value={form.category} onChange={(e) => update("category", e.target.value)}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Podcast format</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FORMATS.map((f) => (
                    <button key={f} onClick={() => update("podcastFormat", f)} style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: "600", padding: "9px 16px", borderRadius: "6px", border: form.podcastFormat === f ? "1.5px solid #FF7C6F" : "1px solid #EFEFED", background: form.podcastFormat === f ? "#FFF0EE" : "#FFFFFF", color: form.podcastFormat === f ? "#FF7C6F" : "#6B6B6B", cursor: "pointer" }}>
                      {f}
                    </button>
                  ))}
                </div>
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
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <img src={form.coverArtUrl} alt="Cover art" style={{ width: "48px", height: "48px", borderRadius: "6px", objectFit: "cover" }} />
                      <p style={{ fontSize: "12px", color: "#27500A", fontFamily: "var(--font-sans)" }}>✓ Cover art uploaded!</p>
                    </div>
                    <label style={labelStyle}>Browse card position</label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[
                        { value: "top", label: "Top" },
                        { value: "center", label: "Center" },
                        { value: "bottom", label: "Bottom" },
                        { value: "left", label: "Left" },
                        { value: "right", label: "Right" },
                      ].map((pos) => (
                        <button key={pos.value} onClick={() => update("coverArtPosition", pos.value)} style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: "600", padding: "8px 14px", borderRadius: "6px", border: form.coverArtPosition === pos.value ? "1.5px solid #FF7C6F" : "1px solid #EFEFED", background: form.coverArtPosition === pos.value ? "#FFF0EE" : "#FFFFFF", color: form.coverArtPosition === pos.value ? "#FF7C6F" : "#6B6B6B", cursor: "pointer" }}>
                          {pos.label}
                        </button>
                      ))}
                    </div>
                    <p style={hintStyle}>Choose which part of your cover art shows on the browse card.</p>
                  </div>
                )}
                <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px" }}>Square images work best (1400x1400px recommended).</p>
              </div>
              <div>
                <label style={labelStyle}>RSS feed URL</label>
                <input style={inputStyle} value={form.rssUrl} onChange={(e) => update("rssUrl", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>YouTube video or channel URL <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.youtube} onChange={(e) => update("youtube", e.target.value)} placeholder="https://youtube.com/watch?v=... or https://youtube.com/@channel" />
                <p style={hintStyle}>Paste a specific episode URL to embed a video, or your channel URL to show a link. Only visible to logged-in brands.</p>
              </div>
            </div>
          </div>

          {/* Audience */}
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>Audience & reach</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Monthly listens range</label>
                <select style={inputStyle} value={form.listensRange} onChange={(e) => update("listensRange", e.target.value)}>
                  <option value="">Select a range</option>
                  {LISTENS_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Best month <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.bestMonth} onChange={(e) => update("bestMonth", e.target.value)} placeholder="e.g. 14,200" />
              </div>
              <div>
                <label style={labelStyle}>Milestones <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.milestones} onChange={(e) => update("milestones", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Audience locations</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["audienceLocation1", "audienceLocation2", "audienceLocation3"].map((field, i) => (
                    <select key={field} style={inputStyle} value={form[field]} onChange={(e) => update(field, e.target.value)}>
                      <option value="">{i === 0 ? "Top location" : `${i === 1 ? "Second" : "Third"} location (optional)`}</option>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Age range</label>
                <select style={inputStyle} value={form.ageRange} onChange={(e) => update("ageRange", e.target.value)}>
                  <option value="">Select</option>
                  {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <select style={inputStyle} value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                  <option value="">Select</option>
                  {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Ad formats */}
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>Ad formats & rates</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Ad formats offered</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {AD_FORMATS.map((format) => {
                    const isLocked = format === "Product placement" && !isVideoFormat;
                    const isSelected = form.adFormats.includes(format);
                    return (
                      <button key={format} onClick={() => !isLocked && toggleFormat(format)} disabled={isLocked} style={{ fontSize: "13px", fontFamily: "var(--font-sans)", fontWeight: "600", padding: "8px 14px", borderRadius: "6px", border: isSelected ? "1.5px solid #FF7C6F" : "1px solid #EFEFED", background: isLocked ? "#FAFAF8" : isSelected ? "#FFF0EE" : "#FFFFFF", color: isLocked ? "#D3D1C7" : isSelected ? "#FF7C6F" : "#6B6B6B", cursor: isLocked ? "not-allowed" : "pointer" }}>
                        {format} {isLocked ? "🔒" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Rates <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.rates} onChange={(e) => update("rates", e.target.value)} placeholder="e.g. From $150 per episode" />
              </div>
              <div>
                <label style={labelStyle}>Looking for <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.lookingFor} onChange={(e) => update("lookingFor", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Previous sponsors <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
                <input style={inputStyle} value={form.previousSponsors} onChange={(e) => update("previousSponsors", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Socials */}
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>Socials</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "instagram", label: "Instagram", placeholder: "@yourhandle" },
                { key: "tiktok", label: "TikTok", placeholder: "@yourhandle" },
                { key: "linkedin", label: "LinkedIn", placeholder: "Profile or page URL" },
                { key: "facebook", label: "Facebook", placeholder: "Page URL" },
              ].map((s) => (
                <div key={s.key}>
                  <label style={labelStyle}>{s.label}</label>
                  <input style={inputStyle} value={form[s.key]} onChange={(e) => update(s.key, e.target.value)} placeholder={s.placeholder} />
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: saving ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "16px", cursor: saving ? "not-allowed" : "pointer", width: "100%" }}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
