"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DeleteAccount() {
  const { isLoggedIn, isBrand, isPodcaster, loading } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { setDeleting(false); return; }

    if (isPodcaster) {
      await supabase.from("podcasters").delete().eq("user_id", session.user.id);
    }
    if (isBrand) {
      await supabase.from("plan_items").delete().eq("brand_id", (await supabase.from("brands").select("id").eq("user_id", session.user.id).single()).data?.id);
      await supabase.from("connection_requests").delete().eq("brand_id", (await supabase.from("brands").select("id").eq("user_id", session.user.id).single()).data?.id);
      await supabase.from("brands").delete().eq("user_id", session.user.id);
    }

    await supabase.auth.signOut();
    setDeleting(false);
    setDone(true);
  };

  if (loading) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p></div><Footer /></div>
  );

  if (!isLoggedIn) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>You're not logged in</h1><a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a></div><Footer /></div>
  );

  if (done) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "24px" }}>✦</div>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Your account has been deleted</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>All your data has been removed from SponStudio. Thank you for being part of the platform.</p>
        <a href="/" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Go to homepage</a>
      </div>
      <Footer />
    </div>
  );

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "8px" }}>Delete your account</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "40px" }}>
          {isPodcaster ? "This will permanently remove all your podcast listings and account data from SponStudio." : "This will permanently remove your brand account and all associated data from SponStudio."}
          {" "}This cannot be undone.
        </p>

        <div style={{ background: "#FCEBEB", border: "1px solid #F09595", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
          <p style={{ fontSize: "14px", fontWeight: "700", color: "#A32D2D", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>The following will be permanently deleted:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {isPodcaster && (
              <>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>✕ All your podcast listings</p>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>✕ All connection request history</p>
              </>
            )}
            {isBrand && (
              <>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>✕ Your brand profile</p>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>✕ Your saved media plan</p>
                <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>✕ All connection request history</p>
              </>
            )}
            <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>✕ Your login credentials</p>
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", marginBottom: "24px" }}>
          <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginTop: "2px", flexShrink: 0 }} />
          <span style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
            I understand that deleting my account is permanent and cannot be undone.
          </span>
        </label>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleDelete} disabled={!confirmed || deleting} style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: !confirmed || deleting ? "#FFAB9F" : "#A32D2D", border: "none", borderRadius: "6px", padding: "13px 24px", cursor: !confirmed || deleting ? "not-allowed" : "pointer" }}>
            {deleting ? "Deleting..." : "Delete my account"}
          </button>
          <a href="/" style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "13px 24px", textDecoration: "none" }}>
            Cancel
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
