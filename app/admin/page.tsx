"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = "CentennialWorld2026";

type Podcaster = {
  id: string;
  podcast_name: string;
  publisher_name: string;
  email: string;
  category: string;
  location: string;
  listens_range: string;
  ad_formats: string[];
  rss_url: string;
  status: string;
  created_at: string;
  podcast_format: string;
};

type Brand = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  industry: string;
  website: string;
  budget: string;
  created_at: string;
};

type ConnectionRequest = {
  id: string;
  status: string;
  created_at: string;
  brands: { company_name: string; email: string };
  podcasters: { podcast_name: string };
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "brands" | "connections">("overview");

  const [podcasters, setPodcasters] = useState<Podcaster[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [declineNotes, setDeclineNotes] = useState<Record<string, string>>({});
  const [actioned, setActioned] = useState<Record<string, "approved" | "declined">>({});

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      const [{ data: podData }, { data: brandData }, { data: connData }] = await Promise.all([
        supabase.from("podcasters").select("*").order("created_at", { ascending: false }),
        supabase.from("brands").select("*").order("created_at", { ascending: false }),
        supabase.from("connection_requests").select(`*, brands(company_name, email), podcasters(podcast_name)`).order("created_at", { ascending: false }),
      ]);
      if (podData) setPodcasters(podData);
      if (brandData) setBrands(brandData);
      if (connData) setConnections(connData as any);
      setLoading(false);
    };
    fetchData();
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) setIsAuthenticated(true);
    else setPasswordError("Incorrect password.");
  };

  const handleApprove = async (id: string) => {
    await supabase.from("podcasters").update({ status: "approved" }).eq("id", id);
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "application_approved",
        data: { email: podcasters.find(p => p.id === id)?.email, podcastName: podcasters.find(p => p.id === id)?.podcast_name },
      }),
    });
    setActioned((a) => ({ ...a, [id]: "approved" }));
    setPodcasters((prev) => prev.map((p) => p.id === id ? { ...p, status: "approved" } : p));
  };

  const handleDecline = async (id: string) => {
    await supabase.from("podcasters").update({ status: "declined" }).eq("id", id);
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "application_declined",
        data: { email: podcasters.find(p => p.id === id)?.email, podcastName: podcasters.find(p => p.id === id)?.podcast_name, reason: declineNotes[id] || "" },
      }),
    });
    setActioned((a) => ({ ...a, [id]: "declined" }));
    setPodcasters((prev) => prev.map((p) => p.id === id ? { ...p, status: "declined" } : p));
  };

  const pending = podcasters.filter((p) => p.status === "pending");
  const approved = podcasters.filter((p) => p.status === "approved");
  const acceptedConnections = connections.filter((c) => c.status === "accepted");

  const inputStyle: React.CSSProperties = {
    width: "100%", fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)",
    background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px",
    padding: "10px 14px", outline: "none", boxSizing: "border-box",
  };

  const tabStyle = (tab: string): React.CSSProperties => ({
    fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)",
    padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer",
    background: activeTab === tab ? "#00215e" : "transparent",
    color: activeTab === tab ? "#FFFFFF" : "#6B6B6B",
  });

  if (!isAuthenticated) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "400px" }}>
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", display: "block", marginBottom: "8px" }}>
            <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "11px", marginLeft: "4px" }}>✦</span>
          </span>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px", letterSpacing: "-0.5px" }}>Admin dashboard</h1>
          <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>Enter your admin password to continue.</p>
          <div style={{ marginBottom: "16px" }}>
            <input style={{ ...inputStyle, borderColor: passwordError ? "#FF7C6F" : "#EFEFED" }} type="password" placeholder="Admin password" value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            {passwordError && <p style={{ fontSize: "12px", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginTop: "6px" }}>{passwordError}</p>}
          </div>
          <button onClick={handleLogin} style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#00215e", border: "none", borderRadius: "6px", padding: "13px", cursor: "pointer" }}>
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <nav style={{ background: "#00215e", padding: "0 48px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#FFFFFF", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
          <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span>
          <span style={{ fontSize: "12px", fontWeight: "500", color: "rgba(255,255,255,0.5)", marginLeft: "12px", fontFamily: "var(--font-sans)" }}>Admin</span>
        </span>
        <button onClick={() => setIsAuthenticated(false)} style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
          Log out
        </button>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px" }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "4px" }}>Good morning ✦</h1>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Here is what needs your attention today.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Live listings", value: approved.length, urgent: false },
            { label: "Brand accounts", value: brands.length, urgent: false },
            { label: "Connection requests", value: connections.length, urgent: false },
            { label: "Connections accepted", value: acceptedConnections.length, urgent: false },
            { label: "Pending applications", value: pending.length, urgent: true },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#FFFFFF", border: `1px solid ${stat.urgent && stat.value > 0 ? "#FFD4CC" : "#EFEFED"}`, borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>{stat.label}</p>
              <p style={{ fontSize: "32px", fontWeight: "800", color: stat.urgent && stat.value > 0 ? "#FF7C6F" : "#00215e", fontFamily: "var(--font-display)" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "8px", padding: "4px", width: "fit-content", flexWrap: "wrap" }}>
          {[
            { key: "overview", label: "Overview" },
            { key: "applications", label: `Applications (${podcasters.length})` },
            { key: "brands", label: `Brands (${brands.length})` },
            { key: "connections", label: `Connections (${connections.length})` },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} style={tabStyle(tab.key)}>{tab.label}</button>
          ))}
        </div>

        {loading && <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Loading...</p>}

        {/* Overview */}
        {activeTab === "overview" && !loading && (
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>Platform health</h2>
            {[
              { label: "Live podcast listings", value: approved.length },
              { label: "Pending applications", value: pending.length },
              { label: "Brand accounts", value: brands.length },
              { label: "Total connection requests", value: connections.length },
              { label: "Connections accepted", value: acceptedConnections.length },
              { label: "Acceptance rate", value: connections.length > 0 ? `${Math.round((acceptedConnections.length / connections.length) * 100)}%` : "N/A" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #EFEFED" }}>
                <span style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{item.label}</span>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Applications */}
        {activeTab === "applications" && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {podcasters.length === 0 && (
              <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>No applications yet.</p>
            )}
            {podcasters.map((pod) => (
              <div key={pod.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px", opacity: pod.status !== "pending" ? 0.6 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{pod.podcast_name}</h3>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>by {pod.publisher_name} — {pod.email}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: pod.status === "approved" ? "#27500A" : pod.status === "declined" ? "#A32D2D" : "#6B6B6B", background: pod.status === "approved" ? "#EAF3DE" : pod.status === "declined" ? "#FCEBEB" : "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px", fontFamily: "var(--font-sans)" }}>
                      {pod.status}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                      {new Date(pod.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                  {[
                    { label: "Category", value: pod.category },
                    { label: "Location", value: pod.location },
                    { label: "Listens range", value: pod.listens_range },
                    { label: "Format", value: pod.podcast_format },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                      <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>RSS feed</p>
                  <p style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)" }}>{pod.rss_url}</p>
                </div>
                {pod.ad_formats && pod.ad_formats.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Ad formats</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {pod.ad_formats.map((f) => (
                        <span key={f} style={{ fontSize: "12px", color: "#FF7C6F", background: "#FFF0EE", borderRadius: "4px", padding: "3px 10px", fontFamily: "var(--font-sans)", fontWeight: "600" }}>{f}</span>
                      ))}
                    </div>
                  </div>
                )}
                {pod.status === "pending" && (
                  <>
                    <div style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Decline reason (optional)</p>
                      <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} placeholder="If declining, add a note for the podcaster..." value={declineNotes[pod.id] || ""} onChange={(e) => setDeclineNotes((n) => ({ ...n, [pod.id]: e.target.value }))} />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => handleApprove(pod.id)} style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}>
                        Approve
                      </button>
                      <button onClick={() => handleDecline(pod.id)} style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}>
                        Decline
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Brands */}
        {activeTab === "brands" && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {brands.length === 0 && <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>No brand accounts yet.</p>}
            {brands.map((brand) => (
              <div key={brand.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{brand.company_name}</h3>
                    <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{brand.contact_name} — {brand.email}</p>
                  </div>
                  <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                    {new Date(brand.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
                  {[
                    { label: "Industry", value: brand.industry },
                    { label: "Website", value: brand.website || "Not provided" },
                    { label: "Budget", value: brand.budget || "Not provided" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                      <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connections */}
        {activeTab === "connections" && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {connections.length === 0 && <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>No connection requests yet.</p>}
            {connections.map((conn) => (
              <div key={conn.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>
                    {conn.brands?.company_name} → {conn.podcasters?.podcast_name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
                    {new Date(conn.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span style={{ fontSize: "12px", fontWeight: "600", fontFamily: "var(--font-sans)", color: conn.status === "accepted" ? "#27500A" : conn.status === "declined" ? "#A32D2D" : "#6B6B6B", background: conn.status === "accepted" ? "#EAF3DE" : conn.status === "declined" ? "#FCEBEB" : "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 12px" }}>
                  {conn.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
