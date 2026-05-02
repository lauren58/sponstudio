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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setLoading(true);
    setError("");
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setDone(true);
    }
  };

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "440px", margin: "0 auto", padding: "100px 24px" }}>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "24px" }}>✅</div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Password updated!</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>Your password has been changed. You can now log in with your new password.</p>
            <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Set a new password</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "40px" }}>Choose a strong password for your SponStudio account.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", display: "block", marginBottom: "8px" }}>New password</label>
                <input style={inputStyle} type="password" placeholder="At least 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", display: "block", marginBottom: "8px" }}>Confirm password</label>
                <input style={{ ...inputStyle, borderColor: error ? "#FF7C6F" : "#EFEFED" }} type="password" placeholder="Repeat your password" value={confirm} onChange={(e) => { setConfirm(e.target.value); setError(""); }} onKeyDown={(e) => e.key === "Enter" && handleReset()} />
                {error && <p style={{ fontSize: "12px", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginTop: "6px" }}>{error}</p>}
              </div>
            </div>
            <button onClick={handleReset} disabled={loading} style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: loading ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "14px", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Updating..." : "Update password"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
