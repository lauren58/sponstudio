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

const LISTENS_FLOORS: Record<string, number> = { "Under 1K": 0, "1K to 10K": 1000, "10K to 50K": 10000, "50K to 100K": 50000, "100K to 200K": 100000, "200K to 400K": 200000, "400K+": 400000 };
const LISTENS_CEILINGS: Record<string, number | null> = { "Under 1K": 1000, "1K to 10K": 10000, "10K to 50K": 50000, "50K to 100K": 100000, "100K to 200K": 200000, "200K to 400K": 400000, "400K+": null };
const LISTENS_RANGES = ["Under 1K", "1K to 10K", "10K to 50K", "50K to 100K", "100K to 200K", "200K to 400K", "400K+"];

function getCombinedListens(ranges: string[]): string {
  const valid = ranges.filter(r => LISTENS_FLOORS[r] !== undefined);
  if (valid.length === 0) return "";
  const hasOpenCeiling = valid.some(r => LISTENS_CEILINGS[r] === null);
  const totalFloor = valid.reduce((sum, r) => sum + (LISTENS_FLOORS[r] || 0), 0);
  const totalCeiling = valid.reduce((sum, r) => sum + ((LISTENS_CEILINGS[r] as number) || 0), 0);
  const fmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(0) + "K" : n.toString();
  if (hasOpenCeiling) return fmt(totalFloor) + "+";
  return fmt(totalFloor) + " to " + fmt(totalCeiling);
}

function getBestListensRange(ranges: string[]): string {
  const valid = ranges.filter(r => LISTENS_FLOORS[r] !== undefined);
  if (valid.length === 0) return "";
  const totalFloor = valid.reduce((sum, r) => sum + (LISTENS_FLOORS[r] || 0), 0);
  const hasOpenCeiling = valid.some(r => LISTENS_CEILINGS[r] === null);
  if (hasOpenCeiling || totalFloor >= 400000) return "400K+";
  if (totalFloor >= 200000) return "200K to 400K";
  if (totalFloor >= 100000) return "100K to 200K";
  if (totalFloor >= 50000) return "50K to 100K";
  if (totalFloor >= 10000) return "10K to 50K";
  if (totalFloor >= 1000) return "1K to 10K";
  return "Under 1K";
}

export default function AddBundle() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [myShows, setMyShows] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [networkName, setNetworkName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !isPodcaster) return;
    const fetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data } = await supabase.from("podcasters").select("id, podcast_name, listens_range, category, ad_formats, audience_location_1, cover_art_url, cover_color").eq("user_id", session.user.id).eq("is_bundle", false).eq("status", "approved");
      if (data) setMyShows(data);
    };
    fetch();
  }, [isLoggedIn, isPodcaster]);

  const toggleShow = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectedShows = myShows.filter(s => selectedIds.includes(s.id));
  const combinedListens = getCombinedListens(selectedShows.map(s => s.listens_range));
  const combinedListensRange = getBestListensRange(selectedShows.map(s => s.listens_range));
  const combinedLocations = Array.from(new Set(selectedShows.map(s => s.audience_location_1).filter(Boolean)));
  const combinedFormats = Array.from(new Set(selectedShows.flatMap(s => s.ad_formats || [])));
  const combinedCategories = Array.from(new Set(selectedShows.map(s => s.category).filter(Boolean)));

  const handleSubmit = async () => {
    if (!networkName.trim()) { setError("Please enter a network or bundle name."); return; }
    if (selectedIds.length < 2) { setError("Please select at least 2 shows to create a bundle."); return; }
    setSubmitting(true);
    setError("");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { setSubmitting(false); return; }
    const { data: userData } = await supabase.from("podcasters").select("publisher_name, email").eq("user_id", session.user.id).single();

    const { error: insertError } = await supabase.from("podcasters").insert({
      user_id: session.user.id,
      podcast_name: networkName,
      publisher_name: userData?.publisher_name || "",
      email: userData?.email || "",
      description: description,
      is_bundle: true,
      bundle_shows: selectedIds,
      network_name: networkName,
      listens_range: combinedListensRange,
      audience_location_1: combinedLocations[0] || "",
      audience_location_2: combinedLocations[1] || "",
      audience_location_3: combinedLocations[2] || "",
      ad_formats: combinedFormats,
      category: combinedCategories[0] || "",
      status: "pending",
    });

    if (insertError) { setError(insertError.message); setSubmitting(false); return; }

    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "new_application",
        data: {
          podcastName: networkName + " (Bundle listing)",
          publisherName: userData?.publisher_name || "",
          email: userData?.email || "",
          category: combinedCategories.join(", "),
          listensRange: combinedListensRange,
          location: combinedLocations[0] || "",
        },
      }),
    });

    setSubmitted(true);
    setSubmitting(false);
  };

  if (loading) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p></div><Footer /></div>
  );

  if (!isLoggedIn || !isPodcaster) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}><Nav /><div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}><h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Sign in to create a bundle listing</h1><a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a></div><Footer /></div>
  );

  if (submitted) return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>🎙</div>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "16px" }}>Bundle listing submitted!</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>Your bundle listing for <strong>{networkName}</strong> is under review. We'll be in touch within 2 to 3 business days.</p>
        <a href="/my-listings" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>View my listings</a>
      </div>
      <Footer />
    </div>
  );

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <div style={{ marginBottom: "12px" }}>
          <a href="/my-listings" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>← Back to my listings</a>
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px", marginTop: "16px" }}>Create a bundle listing</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "40px" }}>
          Bundle multiple shows into a single listing so brands can sponsor across your entire network with one deal.
        </p>

        {/* Step 1 — Name */}
        <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>Bundle details</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Network or bundle name</label>
              <input style={inputStyle} value={networkName} onChange={e => setNetworkName(e.target.value)} placeholder="e.g. Centennial World Network" />
              <p style={hintStyle}>This is how your bundle will appear on the marketplace.</p>
            </div>
            <div>
              <label style={labelStyle}>Description <span style={{ fontWeight: "400", color: "#6B6B6B" }}>(optional)</span></label>
              <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your network and what makes bundled sponsorship across your shows valuable to brands." />
            </div>
          </div>
        </div>

        {/* Step 2 — Select shows */}
        <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>Select shows to include</h2>
          <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "20px", lineHeight: "1.6" }}>Select at least 2 approved shows. Combined stats will be calculated automatically.</p>
          {myShows.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>You need at least 2 approved shows to create a bundle. <a href="/add-show" style={{ color: "#FF7C6F", textDecoration: "none", fontWeight: "600" }}>Add a show →</a></p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {myShows.map(show => {
                const isSelected = selectedIds.includes(show.id);
                const COVER_COLORS = ["#E8D5C4", "#C4D4C4", "#2D2D2D", "#F2C4A0", "#C4D4E8", "#F2E8C4"];
                return (
                  <button key={show.id} onClick={() => toggleShow(show.id)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "8px", border: isSelected ? "1.5px solid #FF7C6F" : "1px solid #EFEFED", background: isSelected ? "#FFF0EE" : "#FAFAF8", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: show.cover_art_url ? "#F5F5F5" : (show.cover_color || COVER_COLORS[show.id.charCodeAt(0) % COVER_COLORS.length]) }}>
                      {show.cover_art_url ? <img src={show.cover_art_url} alt={show.podcast_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: "18px", opacity: 0.4 }}>🎙</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", margin: "0 0 2px" }}>{show.podcast_name}</p>
                      <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", margin: 0 }}>{show.listens_range} listens · {show.category}</p>
                    </div>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: isSelected ? "none" : "2px solid #EFEFED", background: isSelected ? "#FF7C6F" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isSelected && <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: "700" }}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Combined stats preview */}
        {selectedIds.length >= 2 && (
          <div style={{ background: "#00215e", borderRadius: "12px", padding: "24px 28px", marginBottom: "24px" }}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>Combined reach preview</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Monthly listens</p>
                <p style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)" }}>{combinedListens}</p>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Shows included</p>
                <p style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)" }}>{selectedIds.length}</p>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Locations</p>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{combinedLocations.join(", ")}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: "#FCEBEB", border: "1px solid #F09595", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", color: "#A32D2D", fontFamily: "var(--font-sans)" }}>{error}</p>
          </div>
        )}

        <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
            Bundle listings are reviewed by the SponStudio team before going live. Combined stats are calculated from your individual show listings and labelled as self-reported.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={submitting || selectedIds.length < 2 || !networkName.trim()} style={{ fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: submitting || selectedIds.length < 2 || !networkName.trim() ? "#FFAB9F" : "#FF7C6F", border: "none", borderRadius: "6px", padding: "16px 32px", cursor: submitting ? "not-allowed" : "pointer" }}>
          {submitting ? "Submitting..." : "Submit bundle for review"}
        </button>
      </div>
      <Footer />
    </div>
  );
}
