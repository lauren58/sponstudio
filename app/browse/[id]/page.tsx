"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Podcast = {
  id: string;
  podcast_name: string;
  publisher_name: string;
  category: string;
  audience_location_1: string;
  audience_location_2: string;
  audience_location_3: string;
  ad_formats: string[];
  listens_range: string;
  best_month: string;
  best_month_context: string;
  demographics: string;
  age_range: string;
  gender: string;
  previous_sponsors: string;
  rates: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  facebook: string;
  podcast_format: string;
  cover_color: string;
  cover_art_url: string;
  description: string;
  looking_for: string;
  user_id: string;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function isChannelUrl(url: string): boolean {
  return url.includes("youtube.com/@") || url.includes("youtube.com/channel/") || url.includes("youtube.com/c/");
}

export default function PodcastProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { isLoggedIn, isBrand, isPodcaster, session, loading: authLoading } = useAuth();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [podcastLoading, setPodcastLoading] = useState(true);
  const [inPlan, setInPlan] = useState(false);
  const [showConnectConfirm, setShowConnectConfirm] = useState(false);
  const [connectSent, setConnectSent] = useState(false);

  useEffect(() => {
    const fetchPodcast = async () => {
      const { data, error } = await supabase
        .from("podcasters")
        .select("*")
        .eq("id", id)
        .single();
      console.log("Podcast data:", data);
      console.log("Podcast error:", error);
      if (data) setPodcast(data);
      setPodcastLoading(false);
    };
    fetchPodcast();
  }, [id]);

  const isOwnProfile = isPodcaster && podcast?.user_id === session?.user?.id;
  const showGatedContent = (isLoggedIn && isBrand) || isOwnProfile;
  const showActions = isLoggedIn && isBrand;

  if (authLoading || podcastLoading) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!podcast) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Podcast not found</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>This podcast may have been removed or is not yet approved.</p>
          <a href="/browse" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Browse podcasts</a>
        </div>
        <Footer />
      </div>
    );
  }

  const COVER_COLORS = ["#E8D5C4", "#C4D4C4", "#2D2D2D", "#F2C4A0", "#C4D4E8", "#F2E8C4"];
  const coverColor = podcast.cover_color || COVER_COLORS[podcast.id.charCodeAt(0) % COVER_COLORS.length];

  const socials = [
    { platform: "Instagram", value: podcast.instagram },
    { platform: "TikTok", value: podcast.tiktok },
    { platform: "LinkedIn", value: podcast.linkedin },
    { platform: "Facebook", value: podcast.facebook },
  ].filter((s) => s.value);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 48px" }}>
        <a href="/browse" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          ← Back to browse
        </a>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px", alignItems: "flex-start" }}>

          {/* Left column */}
          <div>
            {podcast.cover_art_url ? (
              <div style={{ borderRadius: "16px", height: "280px", overflow: "hidden", marginBottom: "24px" }}>
                <img src={podcast.cover_art_url} alt={podcast.podcast_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ) : (
              <div style={{ background: coverColor, borderRadius: "16px", height: "280px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <span style={{ fontSize: "72px", opacity: 0.3 }}>🎙</span>
              </div>
            )}

            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "6px" }}>
              {podcast.podcast_name}
            </h1>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
              by {podcast.publisher_name}
            </p>
            {podcast.description && (
              <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "16px" }}>
                {podcast.description}
              </p>
            )}

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
              {[podcast.category, podcast.audience_location_1, podcast.podcast_format].filter(Boolean).map((tag) => (
                <span key={tag} style={{ fontSize: "12px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                  {tag}
                </span>
              ))}
            </div>

            {podcast.youtube && (
              <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px", marginTop: "16px", marginBottom: "16px" }}>
                {isChannelUrl(podcast.youtube) ? (
                  <>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>YouTube</p>
                    <a href={podcast.youtube} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", background: "#FF0000", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "12px 20px", borderRadius: "8px", fontFamily: "var(--font-sans)", width: "fit-content" }}>
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="white"><path d="M19.6 2.2C19.4 1.4 18.8.8 18 .6 16.4.2 10 .2 10 .2S3.6.2 2 .6C1.2.8.6 1.4.4 2.2.1 3.8 0 7 0 7s.1 3.2.4 4.8c.2.8.8 1.4 1.6 1.6C3.6 13.8 10 13.8 10 13.8s6.4 0 8-.4c.8-.2 1.4-.8 1.6-1.6.3-1.6.4-4.8.4-4.8s-.1-3.2-.4-4.8zM8 10V4l5.3 3L8 10z"/></svg>
                      Watch on YouTube
                    </a>
                  </>
                ) : getYouTubeId(podcast.youtube) ? (
                  <>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>Featured episode</p>
                    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#000", borderRadius: "8px", overflow: "hidden" }}>
                      <iframe src={`https://www.youtube.com/embed/${getYouTubeId(podcast.youtube)}`} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen />
                    </div>
                  </>
                ) : null}
              </div>
            )}

            <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px", marginTop: "16px", marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>Ad formats</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {podcast.ad_formats?.map((format) => (
                  <span key={format} style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", background: "#FFF0EE", borderRadius: "4px", padding: "6px 10px", display: "inline-block" }}>
                    {format}
                  </span>
                ))}
              </div>
            </div>

            {showActions && (
              <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {connectSent ? (
                  <div style={{ background: "#EAF3DE", border: "1px solid #97C459", borderRadius: "8px", padding: "14px 16px" }}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#27500A", fontFamily: "var(--font-sans)" }}>✓ Connection request sent!</p>
                  </div>
                ) : !showConnectConfirm ? (
                  <button onClick={() => setShowConnectConfirm(true)} style={{ display: "block", width: "100%", background: "#FF7C6F", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", padding: "14px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)", border: "none", cursor: "pointer", textAlign: "center" }}>
                    Request to connect
                  </button>
                ) : (
                  <div style={{ background: "#FFF0EE", border: "1px solid #FFD4CC", borderRadius: "8px", padding: "16px" }}>
                    <p style={{ fontSize: "13px", fontWeight: "700", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginBottom: "6px" }}>Before you connect</p>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6", marginBottom: "12px" }}>✦ Tip: ask this podcaster for their media kit upon connecting.</p>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={async () => {
                        const { data: { session } } = await supabase.auth.getSession();
                        if (!session?.user) return;
                        const { data: brandData } = await supabase.from("brands").select("id, company_name, email").eq("user_id", session.user.id).single();
                        if (!brandData) return;
                        await supabase.from("connection_requests").insert({
                          brand_id: brandData.id,
                          podcaster_id: podcast.id,
                          status: "pending",
                        });
                        await fetch("/api/send-email", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            type: "connection_request",
                            data: {
                              brandName: brandData.company_name,
                              brandEmail: brandData.email,
                              podcastName: podcast.podcast_name,
                            },
                          }),
                        });
                        setShowConnectConfirm(false);
                        setConnectSent(true);
                      }} style={{ flex: 1, background: "#FF7C6F", color: "#FFFFFF", fontWeight: "600", fontSize: "13px", padding: "10px", borderRadius: "6px", fontFamily: "var(--font-sans)", border: "none", cursor: "pointer" }}>
                        Send request
                      </button>
                      <button onClick={() => setShowConnectConfirm(false)} style={{ fontSize: "13px", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px", fontFamily: "var(--font-sans)", cursor: "pointer" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <button onClick={() => setInPlan(!inPlan)} style={{ display: "block", width: "100%", background: inPlan ? "#FFF0EE" : "#FAFAF8", color: inPlan ? "#FF7C6F" : "#00215e", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)", border: `1px solid ${inPlan ? "#FF7C6F" : "#EFEFED"}`, cursor: "pointer", textAlign: "center" }}>
                  {inPlan ? "✦ Saved to plan" : "+ Save to plan"}
                </button>

                {inPlan && (
                  <a href="/plan" style={{ display: "block", textAlign: "center", fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", textDecoration: "none", fontWeight: "600" }}>
                    View your plan →
                  </a>
                )}

                <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "8px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>✦ Save multiple shows to your plan to generate a combined reach report.</p>
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px" }}>
                <a href="/login" style={{ display: "block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "14px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)", textAlign: "center" }}>
                  Sign in to connect
                </a>
              </div>
            )}

            {isLoggedIn && !isBrand && (
              <div style={{ borderTop: "1px solid #EFEFED", paddingTop: "20px" }}>
                <div style={{ background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "8px", padding: "14px 16px" }}>
                  <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>✦ Brand accounts can view full stats and connect with podcasters.</p>
                  <a href="/signup/brand" style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600", textDecoration: "none", display: "block", marginTop: "8px" }}>Create a brand account →</a>
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            {!showGatedContent && (
              <div style={{ position: "relative", marginBottom: "32px" }}>
                <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    {[
                      { label: "Monthly listens", value: "••••" },
                      { label: "Best month", value: "••••" },
                      { label: "Audience", value: "••••" },
                      { label: "Rates", value: "••••" },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                        <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>{item.label}</p>
                        <p style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,250,248,0.7)", borderRadius: "12px" }}>
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "32px 40px", textAlign: "center", maxWidth: "340px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: "24px", marginBottom: "12px" }}>🔒</div>
                    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "10px" }}>Unlock full profile</h3>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "20px" }}>
                      Sign in with a company email to view listener stats, demographics and more.
                    </p>
                    <a href="/login" style={{ display: "block", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "12px 20px", borderRadius: "6px", fontFamily: "var(--font-sans)", marginBottom: "10px" }}>Sign in</a>
                    <a href="/signup/brand" style={{ display: "block", fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>No account? Sign up free</a>
                  </div>
                </div>
              </div>
            )}

            {showGatedContent && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Monthly listens</p>
                    <p style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{podcast.listens_range}</p>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>Self-reported</p>
                  </div>
                  {podcast.best_month && (
                    <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Best month</p>
                      <p style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)" }}>{podcast.best_month}</p>
                      {podcast.best_month_context && <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>{podcast.best_month_context}</p>}
                    </div>
                  )}
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Audience</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{podcast.age_range}{podcast.gender ? `, ${podcast.gender}` : ""}</p>
                  </div>
                  {podcast.rates && (
                    <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Rates</p>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{podcast.rates}</p>
                      <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>Self-reported</p>
                    </div>
                  )}
                </div>

                {[podcast.audience_location_1, podcast.audience_location_2, podcast.audience_location_3].filter(Boolean).length > 0 && (
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Audience locations</p>
                    <p style={{ fontSize: "15px", color: "#00215e", fontFamily: "var(--font-sans)" }}>
                      {[podcast.audience_location_1, podcast.audience_location_2, podcast.audience_location_3].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}

                {podcast.previous_sponsors && (
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Previous sponsors</p>
                    <p style={{ fontSize: "15px", color: "#00215e", fontFamily: "var(--font-sans)" }}>{podcast.previous_sponsors}</p>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "4px" }}>Self-reported</p>
                  </div>
                )}

                {podcast.looking_for && (
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Looking for</p>
                    <p style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>{podcast.looking_for}</p>
                  </div>
                )}

                {socials.length > 0 && (
                  <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "10px", padding: "20px" }}>
                    <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>Socials</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {socials.map(({ platform, value }) => (
                        <p key={platform} style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)" }}>
                          <span style={{ color: "#6B6B6B" }}>{platform}:</span> {value}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "20px", lineHeight: "1.6" }}>
              ✦ Self-reported by the podcaster and reviewed by SponStudio. Listens may include a combination of downloads, streams, Spotify plays and YouTube views.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
