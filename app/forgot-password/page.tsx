"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inputStyle: React.CSSProperties = {
  width: "100%", fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)",
  background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px",
  padding: "12px 16px", outline: "none", boxSizing: "border-box",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.sponstudio.com/reset-password",
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "440px", margin: "0 auto", padding: "100px 24px" }}>
        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "24px" }}>✉️</div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Check your email</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>
              We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to set a new password.
            </p>
            <a href="/login" style={{ fontSize: "14px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none" }}>
              Back to log in
            </a>
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Reset your password</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "40px" }}>
              Enter the email address you signed up with and we'll send you a reset link.
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", display: "block", marginBottom: "8px" }}>Email address</label>
              <input style={{ ...inputStyle, borderColor: error ? "#FF7C6F" : "#EFEFED" }} type="email" placeholder="you@email.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
              {error && <p style={{ fontSize: "12px", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginTop: "6px" }}>{error}</p>}
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: loading ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "14px", cursor: loading ? "not-allowed" : "pointer", marginBottom: "16px" }}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <div style={{ textAlign: "center" }}>
              <a href="/login" style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", textDecoration: "none" }}>Back to log in</a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
