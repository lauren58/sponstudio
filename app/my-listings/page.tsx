"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Listing = {
  id: string;
  podcast_name: string;
  publisher_name: string;
  category: string;
  audience_location_1: string;
  listens_range: string;
  ad_formats: string[];
  status: string;
  cover_art_url: string;
  cover_color: string;
  podcast_format: string;
};

const COVER_COLORS = ["#E8D5C4", "#C4D4C4", "#2D2D2D", "#F2C4A0", "#C4D4E8", "#F2E8C4"];

export default function MyListings() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn || !isPodcaster) { setLoadingListings(false); return; }
    const fetchListings = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoadingListings(false); return; }
      const { data } = await supabase
        .from("podcasters")
        .select("id, podcast_name, publisher_name, category, audience_location_1, listens_range, ad_formats, status, cover_art_url, cover_color, podcast_format")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
      if (data) setListings(data);
      setLoadingListings(false);
    };
    fetchListings();
 }, [isLoggedIn, isPodcaster, loading]);

  if (loading || loadingListings) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
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
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Access denied</h1>
          <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>My listings</h1>
            <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
              {listings.length} show{listings.length !== 1 ? "s" : ""} on your account
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="/add-show" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "12px 20px", borderRadius: "6px", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
              + Add another show
            </a>
            <a href="/add-bundle" style={{ background: "#FFFFFF", color: "#00215e", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "12px 20px", borderRadius: "6px", border: "1px solid #EFEFED", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
              + Create a bundle
            </a>
          </div>
        </div>

        {listings.length === 0 && (
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "32px", marginBottom: "16px" }}>🎙</p>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>No listings yet</h2>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "24px" }}>Add your first show to get started.</p>
            <a href="/signup" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Add a show</a>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {listings.map((listing) => (
            <div key={listing.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", overflow: "hidden", display: "grid", gridTemplateColumns: "100px 1fr", minHeight: "110px" }}>
              <div style={{ background: listing.cover_art_url ? "#F5F5F5" : (listing.cover_color || COVER_COLORS[listing.id.charCodeAt(0) % COVER_COLORS.length]), display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {listing.cover_art_url ? (
                  <img src={listing.cover_art_url} alt={listing.podcast_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "28px", opacity: 0.3 }}>🎙</span>
                )}
              </div>
              <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", margin: 0 }}>{listing.podcast_name}</h3>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: listing.status === "approved" ? "#27500A" : listing.status === "declined" ? "#A32D2D" : "#6B6B6B", background: listing.status === "approved" ? "#EAF3DE" : listing.status === "declined" ? "#FCEBEB" : "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "2px 10px", fontFamily: "var(--font-sans)" }}>
                      {listing.status === "approved" ? "✓ Live" : listing.status === "declined" ? "Not approved" : "Under review"}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px" }}>{listing.category} · {listing.audience_location_1}</p>
                  <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{listing.listens_range} listens · {listing.podcast_format}</p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {listing.status === "approved" && (
                    <a href={`/browse/${listing.id}`} style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none", background: "#FFF0EE", padding: "8px 14px", borderRadius: "6px" }}>View listing</a>
                  )}
                  <a href={`/profile/edit?id=${listing.id}`} style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none", background: "#FAFAF8", border: "1px solid #EFEFED", padding: "8px 14px", borderRadius: "6px" }}>Edit</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
