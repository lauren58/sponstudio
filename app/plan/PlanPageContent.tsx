"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type PlanPodcast = {
  id: string;
  plan_item_id: string;
  podcast_name: string;
  publisher_name: string;
  category: string;
  audience_location_1: string;
  audience_location_2: string;
  audience_location_3: string;
  ad_formats: string[];
  listens_range: string;
  best_month: string;
  age_range: string;
  gender: string;
  rates: string;
  cover_art_url: string;
  cover_color: string;
  podcast_format: string;
};

const floors: Record<string, number> = { "Under 1K": 0, "1K to 10K": 1000, "10K to 50K": 10000, "50K to 100K": 50000, "100K to 200K": 100000, "200K to 400K": 200000, "400K+": 400000 };
const ceilings: Record<string, number | null> = { "Under 1K": 1000, "1K to 10K": 10000, "10K to 50K": 50000, "50K to 100K": 100000, "100K to 200K": 200000, "200K to 400K": 400000, "400K+": null };

function formatNum(n: number) { return n >= 1000 ? (n / 1000).toFixed(0) + "K" : n.toString(); }

function getCombinedListens(ranges: string[]): string {
  const valid = ranges.filter(r => floors[r] !== undefined);
  if (valid.length === 0) return "N/A";
  const hasOpenCeiling = valid.some((r) => ceilings[r] === null);
  const totalFloor = valid.reduce((sum, r) => sum + (floors[r] || 0), 0);
  const totalCeiling = valid.reduce((sum, r) => sum + ((ceilings[r] as number) || 0), 0);
  if (hasOpenCeiling) return formatNum(totalFloor) + "+";
  return formatNum(totalFloor) + " to " + formatNum(totalCeiling);
}

export default function PlanPageContent() {
  const { isLoggedIn, isBrand, loading } = useAuth();
  const [podcasts, setPodcasts] = useState<PlanPodcast[]>([]);
  const [loadingPlan, setLoadingPlan] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn || !isBrand) { setLoadingPlan(false); return; }
    const fetchPlan = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoadingPlan(false); return; }
      const { data: brandData } = await supabase.from("brands").select("id").eq("user_id", session.user.id).single();
      if (!brandData) { setLoadingPlan(false); return; }
      const { data: planItems } = await supabase
        .from("plan_items")
        .select("id, podcaster_id")
        .eq("brand_id", brandData.id);
      if (!planItems || planItems.length === 0) { setLoadingPlan(false); return; }
      const podcasterIds = planItems.map((p) => p.podcaster_id);
      const { data: podcastData } = await supabase
        .from("podcasters")
        .select("id, podcast_name, publisher_name, category, audience_location_1, audience_location_2, audience_location_3, ad_formats, listens_range, best_month, age_range, gender, rates, cover_art_url, cover_color, podcast_format")
        .in("id", podcasterIds);
      if (podcastData) {
        const merged = podcastData.map((pod) => ({
          ...pod,
          plan_item_id: planItems.find((p) => p.podcaster_id === pod.id)?.id || "",
        }));
        setPodcasts(merged);
      }
      setLoadingPlan(false);
    };
    fetchPlan();
  }, [isLoggedIn, isBrand, loading]);

  const removeFromPlan = async (planItemId: string) => {
    await supabase.from("plan_items").delete().eq("id", planItemId);
    setPodcasts((prev) => prev.filter((p) => p.plan_item_id !== planItemId));
  };

  if (loading || loadingPlan) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading your plan...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn || !isBrand) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "16px" }}>Sign in to view your plan</h1>
          <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
        </div>
        <Footer />
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "24px" }}>🎙</div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "16px" }}>No shows in your plan yet</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "32px" }}>Save shows from the browse page to build your media plan and generate a combined reach report.</p>
          <a href="/browse" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Browse podcasts</a>
        </div>
        <Footer />
      </div>
    );
  }

  const combinedListens = getCombinedListens(podcasts.map((p) => p.listens_range));
  const allLocations = Array.from(new Set(podcasts.flatMap((p) => [p.audience_location_1, p.audience_location_2, p.audience_location_3].filter(Boolean))));
  const allFormats = Array.from(new Set(podcasts.flatMap((p) => p.ad_formats || [])));
  const COVER_COLORS = ["#E8D5C4", "#C4D4C4", "#2D2D2D", "#F2C4A0", "#C4D4E8", "#F2E8C4"];

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 48px 100px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>My media plan</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "48px" }}>{podcasts.length} show{podcasts.length !== 1 ? "s" : ""} saved</p>

        {/* Combined reach */}
        <div style={{ background: "#00215e", borderRadius: "16px", padding: "40px 48px", marginBottom: "48px" }}>
          <p style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>Combined reach report</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px", marginBottom: "24px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Combined monthly listens</p>
              <p style={{ fontSize: "32px", fontWeight: "800", color: "#FFFFFF", fontFamily: "var(--font-display)" }}>{combinedListens}</p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Audience locations</p>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF", fontFamily: "var(--font-sans)" }}>{allLocations.join(", ")}</p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Ad formats available</p>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>{allFormats.join(", ")}</p>
            </div>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sans)" }}>✦ All figures self-reported by podcasters. Listens may include downloads, streams, Spotify plays and YouTube views.</p>
        </div>

        {/* Shows */}
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "24px", letterSpacing: "-0.3px" }}>Shows in your plan</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {podcasts.map((podcast) => (
            <div key={podcast.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", overflow: "hidden", display: "grid", gridTemplateColumns: "120px 1fr", minHeight: "120px" }}>
              <div style={{ background: podcast.cover_art_url ? "#F5F5F5" : (podcast.cover_color || COVER_COLORS[podcast.id.charCodeAt(0) % COVER_COLORS.length]), display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {podcast.cover_art_url ? (
                  <img src={podcast.cover_art_url} alt={podcast.podcast_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "32px", opacity: 0.3 }}>🎙</span>
                )}
              </div>
              <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{podcast.podcast_name}</h3>
                  <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>{podcast.category} · {podcast.publisher_name}</p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>📊 {podcast.listens_range} listens</span>
                    {podcast.audience_location_1 && <span style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>📍 {[podcast.audience_location_1, podcast.audience_location_2].filter(Boolean).join(", ")}</span>}
                    {podcast.rates && <span style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>💰 {podcast.rates}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                  <a href={`/browse/${podcast.id}`} style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none", background: "#FFF0EE", padding: "8px 14px", borderRadius: "6px" }}>View profile</a>
                  <button onClick={() => removeFromPlan(podcast.plan_item_id)} style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "6px", padding: "8px 14px", cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <a href="/browse" style={{ fontSize: "14px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none" }}>+ Add more shows →</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
