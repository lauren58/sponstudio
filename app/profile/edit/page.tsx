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

const INSTANT_FIELDS = ["adFormats", "rates", "lookingFor", "previousSponsors", "milestones", "instagram", "tiktok", "youtube", "linkedin", "facebook"];
const REVIEW_FIELDS = ["listensRange", "bestMonth", "audienceLocation1", "audienceLocation2", "audienceLocation3", "ageRange", "gender"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "14px",
  color: "#00215e",
  fontFamily: "var(--font-sans)",
  background: "#FFFFFF",
  border: "1px solid #EFEFED",
  borderRadius: "6px",
  padding: "12px 16px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#00215e",
  fontFamily: "var(--font-sans)",
  display: "block",
  marginBottom: "8px",
};

const hintStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#6B6B6B",
  fontFamily: "var(--font-sans)",
  marginTop: "6px",
};

const reviewBadge = (
  <span style={{ fontSize: "11px", fontWeight: "600", color: "#BA7517", background: "#FAEEDA", borderRadius: "4px", padding: "2px 8px", marginLeft: "8px", fontFamily: "var(--font-sans)" }}>
    Pending review
  </span>
);

const mockProfile = {
  podcastName: "The Shift",
  rssUrl: "https://feeds.example.com/theshift",
  category: "Business & Entrepreneurship",
  listensRange: "1K to 10K",
  bestMonth: "14,200",
  milestones: "Featured on a Spotify playlist",
  audienceLocation1: "AU",
  audienceLocation2: "US",
  audienceLocation3: "",
  ageRange: "25-34",
  gender: "Predominantly identify as women",
  adFormats: ["Mid-roll", "Native episode"],
  rates: "From $150 per episode",
  lookingFor: "Brands that align with our values around entrepreneurship and creativity.",
  previousSponsors: "Notion, Canva",
  instagram: "@theshiftpod",
  tiktok: "",
  youtube: "",
  linkedin: "theshiftpodcast",
  facebook: "",
};

export default function ProfileEditor() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [status, setStatus] = useState<"loading" | "pending" | "approved" | "declined" | "unauthorized">("loading");
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [form, setForm] = useState(mockProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn || !isPodcaster) { setStatus("unauthorized"); return; }
    const fetchStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setStatus("unauthorized"); return; }
      const { data } = await supabase.from("podcasters").select("status").eq("user_id", session.user.id).single();
      if (data) setStatus(data.status as any);
      else setStatus("unauthorized");
    };
    fetchStatus();
  }, [isLoggedIn, isPodcaster, loading]);
if (status === "loading") return (
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
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>
          We'll review your listing and be in touch within 2 to 3 business days. You'll receive an email when you're approved.
        </p>
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
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>
          Unfortunately your listing wasn't approved at this time. If you have questions please get in touch.
        </p>
        <a href="mailto:hello@sponstudio.com" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Contact us</a>
      </div>
      <Footer />
    </div>
  );
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const toggleFormat = (format: string) => {
    setForm((f) => ({
      ...f,
      adFormats: f.adFormats.includes(format)
        ? f.adFormats.filter((x) => x !== format)
        : [...f.adFormats, format],
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <Nav />

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "60px 24px 100px" }}>

        <div style={{ marginBottom: "12px" }}>
          <a href="/dashboard" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
            ← Back to my profile
          </a>
        </div>

        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px", marginTop: "16px" }}>
          Edit your profile
        </h1>
        <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px", lineHeight: "1.7" }}>
          Changes to your stats and audience information will be reviewed by our team before going live. Everything else updates immediately.
        </p>

        <div style={{ background: "#FAEEDA", border: "1px solid #FAC775", borderRadius: "8px", padding: "12px 16px", marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", color: "#633806", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
            <span style={{ fontWeight: "700" }}>✦ Fields marked "Pending review"</span> will be held until our team approves the change, usually within 2 business days. All other changes go live immediately.
          </p>
        </div>

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
              {step === 5 && "Review and save"}
            </span>
          </div>
          <div style={{ background: "#EFEFED", borderRadius: "100px", height: "4px", width: "100%" }}>
            <div style={{ background: "#FF7C6F", borderRadius: "100px", height: "4px", width: progressWidth + "%", transition: "width 0.3s ease" }} />
          </div>
        </div>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Podcast name</label>
              <input style={inputStyle} type="text" value={form.podcastName} onChange={(e) => update("podcastName", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>RSS feed URL</label>
              <input style={inputStyle} type="url" value={form.rssUrl} onChange={(e) => update("rssUrl", e.target.value)} />
              <p style={hintStyle}>Updating your RSS feed will refresh your show artwork and description.</p>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category} onChange={(e) => update("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Monthly listens range {reviewBadge}</label>
              <select style={inputStyle} value={form.listensRange} onChange={(e) => update("listensRange", e.target.value)}>
                {LISTENS_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <p style={hintStyle}>Listens include downloads, streams, Spotify plays, YouTube views and live streams.</p>
            </div>
            <div>
              <label style={labelStyle}>Best month {reviewBadge}</label>
              <input style={inputStyle} type="text" value={form.bestMonth} onChange={(e) => update("bestMonth", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Additional wins or milestones <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                value={form.milestones}
                onChange={(e) => update("milestones", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Top audience locations {reviewBadge}</label>
              <p style={hintStyle}>Your show appears in search results for each location you select.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
                {[
                  { key: "audienceLocation1", label: "Top location" },
{ key: "audienceLocation2", label: "Second location (optional)" },
{ key: "audienceLocation3", label: "Third location (optional)" },
                ].map((loc) => (
                  <select
                    key={loc.key}
                    style={inputStyle}
                    value={form[loc.key as keyof typeof form] as string}
                    onChange={(e) => update(loc.key, e.target.value)}
                  >
                    <option value="">{loc.label}</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Audience age range {reviewBadge}</label>
              <select style={inputStyle} value={form.ageRange} onChange={(e) => update("ageRange", e.target.value)}>
                {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Audience gender {reviewBadge}</label>
              <select style={inputStyle} value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Ad formats offered</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                {AD_FORMATS.map((format) => (
                  <button
                    key={format}
                    onClick={() => toggleFormat(format)}
                    style={{
                      fontSize: "13px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: "600",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      border: form.adFormats.includes(format) ? "1.5px solid #FF7C6F" : "1px solid #EFEFED",
                      background: form.adFormats.includes(format) ? "#FFF0EE" : "#FFFFFF",
                      color: form.adFormats.includes(format) ? "#FF7C6F" : "#6B6B6B",
                      cursor: "pointer",
                    }}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Rates <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
              <input style={inputStyle} type="text" value={form.rates} onChange={(e) => update("rates", e.target.value)} />
              <p style={hintStyle}>✦ Podcasters who include rates tend to get more relevant brand enquiries.</p>
            </div>
            <div>
              <label style={labelStyle}>What are you looking for in a brand partner? <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                value={form.lookingFor}
                onChange={(e) => update("lookingFor", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Previous sponsors <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
              <input style={inputStyle} type="text" placeholder="e.g. Shopify, Canva, Audible" value={form.previousSponsors} onChange={(e) => update("previousSponsors", e.target.value)} />
              <p style={hintStyle}>Self-reported. Separate multiple sponsors with commas.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
              Social links are only visible to logged-in brands.
            </p>
            {[
              { key: "instagram", label: "Instagram", placeholder: "@yourhandle" },
              { key: "tiktok", label: "TikTok", placeholder: "@yourhandle" },
              { key: "linkedin", label: "LinkedIn", placeholder: "Profile or page URL" },
              { key: "facebook", label: "Facebook", placeholder: "Page URL" },
            ].map((social) => (
              <div key={social.key}>
                <label style={labelStyle}>{social.label}</label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder={social.placeholder}
                  value={form[social.key as keyof typeof form] as string}
                  onChange={(e) => update(social.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {step === 5 && (
          <div>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px", lineHeight: "1.7" }}>
              Review your changes below. Fields marked pending review will go live once our team has approved them.
            </p>

            {[
              { label: "Podcast name", value: form.podcastName, review: false },
              { label: "Category", value: form.category, review: false },
              { label: "Monthly listens", value: form.listensRange, review: true },
              { label: "Best month", value: form.bestMonth, review: true },
              { label: "Primary location", value: form.audienceLocation1, review: true },
              { label: "Age range", value: form.ageRange, review: true },
              { label: "Gender", value: form.gender, review: true },
              { label: "Ad formats", value: form.adFormats.join(", "), review: false },
              { label: "Rates", value: form.rates || "Not provided", review: false },
              { label: "Previous sponsors", value: form.previousSponsors || "Not provided", review: false },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #EFEFED" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", fontWeight: "500" }}>{item.label}</span>
                  {item.review && reviewBadge}
                </div>
                <span style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", fontWeight: "600", textAlign: "right", maxWidth: "50%" }}>{item.value}</span>
              </div>
            ))}

            {saved && (
              <div style={{ background: "#EAF3DE", border: "1px solid #97C459", borderRadius: "8px", padding: "12px 16px", marginTop: "24px" }}>
                <p style={{ fontSize: "13px", color: "#27500A", fontFamily: "var(--font-sans)", fontWeight: "600" }}>
                  ✓ Changes saved! Instant updates are now live on your profile. Pending review items will go live within 2 business days.
                </p>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", gap: "12px" }}>
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "13px 24px", cursor: "pointer" }}
            >
              Back
            </button>
          )}
          <button
            onClick={() => step < totalSteps ? setStep((s) => s + 1) : handleSave()}
            style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: "pointer", marginLeft: "auto" }}
          >
            {step === totalSteps ? "Save changes" : "Continue"}
          </button>
        </div>

      </div>

      <Footer />

    </div>
  );
}
