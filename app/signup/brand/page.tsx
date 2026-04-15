"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const INDUSTRIES = [
  "Arts & Entertainment", "Beauty & Personal Care", "Education & E-learning",
  "Fashion & Apparel", "Finance & Fintech", "Food & Beverage", "Health & Wellness",
  "Home & Lifestyle", "Legal & Professional Services", "Media & Publishing",
  "Parenting & Family", "Retail & E-commerce", "Sport & Fitness",
  "Technology & Software", "Travel & Hospitality", "Other",
];

const BUDGETS = ["Under $500", "$500 to $2,000", "$2,000 to $5,000", "$5,000 to $10,000", "$10,000+", "Prefer not to say"];

const PERSONAL_DOMAINS = [
  "gmail.com", "hotmail.com", "outlook.com", "yahoo.com",
  "icloud.com", "me.com", "mac.com", "live.com", "msn.com", "aol.com", "protonmail.com",
];

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
  fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px",
};

export default function BrandSignup() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [form, setForm] = useState({
    name: "", companyName: "", email: "", password: "",
    industry: "", website: "", lookingFor: "", budget: "",
  });

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "email") setEmailError("");
  };

  const validateEmail = () => {
    const domain = form.email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    if (PERSONAL_DOMAINS.includes(domain)) {
      setEmailError("Please use a company email address. Personal email addresses are not accepted.");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (step === 1 && !validateEmail()) return;
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
        options: {
          data: { name: form.name, role: "brand" }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase.from("brands").insert({
          user_id: authData.user.id,
          company_name: form.companyName,
          contact_name: form.name,
          email: form.email,
          industry: form.industry,
          website: form.website,
          looking_for: form.lookingFor,
          budget: form.budget,
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
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>✦</div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "16px" }}>
            Welcome to SponStudio!
          </h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "12px" }}>
            Your brand account has been created. Check your email to confirm your account, then start browsing podcasts.
          </p>
          <div style={{ marginTop: "32px" }}>
            <a href="/browse" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
              Browse podcasts →
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

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase" }}>
              Step {step} of {totalSteps}
            </span>
            <span style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
              {step === 1 && "Your account"}
              {step === 2 && "Your brand"}
              {step === 3 && "Review and create account"}
            </span>
          </div>
          <div style={{ background: "#EFEFED", borderRadius: "100px", height: "4px", width: "100%" }}>
            <div style={{ background: "#FF7C6F", borderRadius: "100px", height: "4px", width: progressWidth + "%", transition: "width 0.3s ease" }} />
          </div>
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Create your brand account</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>Browse indie podcasts, send briefs and connect with creators that are right for your brand.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input style={inputStyle} type="text" placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Company name</label>
                <input style={inputStyle} type="text" placeholder="Your company or brand name" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Company email address</label>
                <input style={{ ...inputStyle, borderColor: emailError ? "#FF7C6F" : "#EFEFED" }} type="email" placeholder="you@yourcompany.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                {emailError ? (
                  <p style={{ ...hintStyle, color: "#FF7C6F" }}>{emailError}</p>
                ) : (
                  <p style={hintStyle}>A company email address is required.</p>
                )}
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input style={inputStyle} type="password" placeholder="At least 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Your brand</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>Help us understand what you are looking for so we can surface the most relevant shows.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Industry</label>
                <select style={inputStyle} value={form.industry} onChange={(e) => update("industry", e.target.value)}>
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Company website</label>
                <input style={inputStyle} type="url" placeholder="https://yourcompany.com" value={form.website} onChange={(e) => update("website", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>What kind of podcasts are you looking for? <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="e.g. We are a sustainable fashion brand looking for shows in the lifestyle or wellness space with a predominantly female audience aged 25 to 40." value={form.lookingFor} onChange={(e) => update("lookingFor", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Approximate budget per campaign <span style={{ color: "#6B6B6B", fontWeight: "400" }}>(optional)</span></label>
                <select style={inputStyle} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <p style={hintStyle}>Only visible to podcasters when you send a brief.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Review and create account</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>Check your details and create your account.</p>
            {[
              { label: "Name", value: form.name },
              { label: "Company", value: form.companyName },
              { label: "Email", value: form.email },
              { label: "Industry", value: form.industry },
              { label: "Website", value: form.website || "Not provided" },
              { label: "Budget", value: form.budget || "Not provided" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #EFEFED" }}>
                <span style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", fontWeight: "500" }}>{item.label}</span>
                <span style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", fontWeight: "600", textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
              </div>
            ))}
            {error && (
              <div style={{ background: "#FCEBEB", border: "1px solid #F09595", borderRadius: "8px", padding: "12px 16px", marginTop: "20px" }}>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>{error}</p>
              </div>
            )}
            <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "8px", padding: "16px", marginTop: "24px", marginBottom: "8px" }}>
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
                By creating an account you agree to use SponStudio respectfully and in good faith.
              </p>
            </div>
            <div style={{ background: "#FFF0EE", border: "1px solid #FFD4CC", borderRadius: "8px", padding: "16px" }}>
              <p style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600" }}>✦ New to buying podcast ads directly?</p>
              <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginTop: "4px" }}>Check out our free brand resources once you're in.</p>
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
            onClick={handleContinue}
            disabled={loading}
            style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: loading ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: loading ? "not-allowed" : "pointer", marginLeft: "auto" }}
          >
            {loading ? "Creating account..." : step === totalSteps ? "Create account" : "Continue"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
