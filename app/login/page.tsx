"use client";

import { useState } from "react";

const PERSONAL_DOMAINS = [
  "gmail.com", "hotmail.com", "outlook.com", "yahoo.com",
  "icloud.com", "me.com", "mac.com", "live.com",
  "msn.com", "aol.com", "protonmail.com",
];

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

export default function Login() {
  const [tab, setTab] = useState<"podcaster" | "brand">("podcaster");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setEmailError("");
  };

  const validateBrandEmail = () => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    if (PERSONAL_DOMAINS.includes(domain)) {
      setEmailError("Please use your company email address to log in as a brand.");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (tab === "brand") {
      if (!validateBrandEmail()) return;
    }
    alert(`Logged in as ${tab}! (Auth will be connected when we set up Supabase.)`);
  };

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>

      <nav style={{ background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
            <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
          </span>
        </a>
        <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#FF7C6F", textDecoration: "none", fontWeight: "600" }}>Join free</a>
        </p>
      </nav>

      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "80px 24px 100px" }}>

        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "40px", lineHeight: "1.7" }}>
          Log in to your SponStudio account.
        </p>

        {/* Tab switcher */}
        <div style={{ display: "flex", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "8px", padding: "4px", marginBottom: "32px", gap: "4px" }}>
          <button
            onClick={() => { setTab("podcaster"); setEmailError(""); }}
            style={{
              flex: 1,
              fontSize: "13px",
              fontWeight: "600",
              fontFamily: "var(--font-sans)",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: tab === "podcaster" ? "#FF7C6F" : "transparent",
              color: tab === "podcaster" ? "#FFFFFF" : "#6B6B6B",
              transition: "all 0.15s ease",
            }}
          >
            I'm a podcaster
          </button>
          <button
            onClick={() => { setTab("brand"); setEmailError(""); }}
            style={{
              flex: 1,
              fontSize: "13px",
              fontWeight: "600",
              fontFamily: "var(--font-sans)",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: tab === "brand" ? "#00215e" : "transparent",
              color: tab === "brand" ? "#FFFFFF" : "#6B6B6B",
              transition: "all 0.15s ease",
            }}
          >
            I'm a brand
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>
              {tab === "brand" ? "Company email address" : "Email address"}
            </label>
            <input
              style={{ ...inputStyle, borderColor: emailError ? "#FF7C6F" : "#EFEFED" }}
              type="email"
              placeholder={tab === "brand" ? "you@yourcompany.com" : "you@email.com"}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailError && (
              <p style={{ ...hintStyle, color: "#FF7C6F" }}>{emailError}</p>
            )}
            {tab === "brand" && !emailError && (
              <p style={hintStyle}>Brands must log in with a company email address.</p>
            )}
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
              <a href="/forgot-password" style={{ fontSize: "12px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
                Forgot password?
              </a>
            </div>
            <input
              style={inputStyle}
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "var(--font-sans)",
              color: "#FFFFFF",
              background: tab === "podcaster" ? "#FF7C6F" : "#00215e",
              border: "none",
              borderRadius: "6px",
              padding: "14px",
              cursor: "pointer",
              marginTop: "8px",
              transition: "opacity 0.15s ease",
            }}
          >
            Log in
          </button>
        </div>

        <div style={{ borderTop: "1px solid #EFEFED", marginTop: "40px", paddingTop: "32px", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
            Don't have an account yet?
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <a href="/signup" style={{ fontSize: "13px", fontWeight: "600", color: "#FF7C6F", textDecoration: "none", fontFamily: "var(--font-sans)", border: "1px solid #FF7C6F", borderRadius: "6px", padding: "10px 20px" }}>
              List my podcast
            </a>
            <a href="/signup/brand" style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", textDecoration: "none", fontFamily: "var(--font-sans)", border: "1px solid #00215e", borderRadius: "6px", padding: "10px 20px" }}>
              Sign up as a brand
            </a>
          </div>
        </div>

      </div>

      <footer style={{ background: "#FAFAF8", borderTop: "1px solid #EFEFED", padding: "40px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
              <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
            </span>
            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px" }}>
              Built by <a href="https://centennialworld.com" style={{ color: "#6B6B6B", textDecoration: "underline" }}>Centennial World Podcast Network</a>
            </p>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            <a href="/browse" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>Browse</a>
            <a href="/about" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>About</a>
            <a href="/signup" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>List my podcast</a>
            <a href="/signup/brand" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>For brands</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
