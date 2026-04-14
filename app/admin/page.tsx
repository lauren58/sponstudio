"use client";

import { useState } from "react";

const ADMIN_PASSWORD = "CentennialWorld2026";

const stats = {
  livePodcasts: 6,
  brandAccounts: 14,
  connectionRequests: 23,
  connectionsAccepted: 11,
  pendingApplications: 3,
  pendingStatUpdates: 2,
  pendingBriefs: 1,
};

const pendingApplications = [
  {
    id: 1,
    podcastName: "The Wellness Edit",
    publisher: "Sarah Collins",
    email: "sarah@thewellnessedit.com",
    category: "Mental Health & Wellbeing",
    location: "AU",
    listensRange: "Under 1K",
    adFormats: ["Mid-roll", "Sponsored segment"],
    submittedAt: "14 Apr 2026",
    rssUrl: "https://feeds.example.com/wellnessedit",
  },
  {
    id: 2,
    podcastName: "Tech Tangent",
    publisher: "James Wu",
    email: "james@techtangent.com.au",
    category: "Technology",
    location: "AU",
    listensRange: "1K to 10K",
    adFormats: ["Pre-roll", "Mid-roll", "Native episode"],
    submittedAt: "13 Apr 2026",
    rssUrl: "https://feeds.example.com/techtangent",
  },
  {
    id: 3,
    podcastName: "Parenting Unfiltered",
    publisher: "Mel & Tash",
    email: "hello@parentingunfiltered.com",
    category: "Parenting & Family",
    location: "NZ",
    listensRange: "1K to 10K",
    adFormats: ["Mid-roll", "Sponsored segment", "Social amplification"],
    submittedAt: "12 Apr 2026",
    rssUrl: "https://feeds.example.com/parentingunfiltered",
  },
];

const pendingStatUpdates = [
  {
    id: 1,
    podcastName: "The Shift",
    publisher: "Mia Sutherland",
    field: "Monthly listens range",
    oldValue: "1K to 10K",
    newValue: "10K to 50K",
    submittedAt: "14 Apr 2026",
  },
  {
    id: 2,
    podcastName: "Startup Sauce",
    publisher: "Priya Mehta",
    field: "Primary audience location",
    oldValue: "AU",
    newValue: "US",
    submittedAt: "13 Apr 2026",
  },
];

const pendingBriefs = [
  {
    id: 1,
    brandName: "Ritual Skincare",
    email: "marketing@ritualskincare.com.au",
    industry: "Beauty & Personal Care",
    brief: "Looking for wellness and lifestyle podcasts to promote our new SPF range. Audience should be predominantly female, 25-40, AU/NZ based. Budget around $500-1000 per placement.",
    filters: { category: "Mental Health & Wellbeing", location: "AU", listensRange: "1K to 10K" },
    matchCount: 2,
    submittedAt: "14 Apr 2026",
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "13px",
  color: "#00215e",
  fontFamily: "var(--font-sans)",
  background: "#FFFFFF",
  border: "1px solid #EFEFED",
  borderRadius: "6px",
  padding: "10px 14px",
  outline: "none",
  boxSizing: "border-box",
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "updates" | "briefs">("overview");
  const [declineNotes, setDeclineNotes] = useState<Record<number, string>>({});
  const [actioned, setActioned] = useState<Record<string, "approved" | "declined">>({});

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setPasswordError("Incorrect password.");
    }
  };

  const handleAction = (type: string, id: number, action: "approved" | "declined") => {
    setActioned((prev) => ({ ...prev, [`${type}-${id}`]: action }));
  };

  const tabStyle = (tab: string): React.CSSProperties => ({
    fontSize: "13px",
    fontWeight: "600",
    fontFamily: "var(--font-sans)",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
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
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px", letterSpacing: "-0.5px" }}>
            Admin dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>
            Enter your admin password to continue.
          </p>
          <div style={{ marginBottom: "16px" }}>
            <input
              style={{ ...inputStyle, borderColor: passwordError ? "#FF7C6F" : "#EFEFED" }}
              type="password"
              placeholder="Admin password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {passwordError && (
              <p style={{ fontSize: "12px", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginTop: "6px" }}>{passwordError}</p>
            )}
          </div>
          <button
            onClick={handleLogin}
            style={{ width: "100%", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#00215e", border: "none", borderRadius: "6px", padding: "13px", cursor: "pointer" }}
          >
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
          <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "11px", marginLeft: "4px" }}>✦</span>
          <span style={{ fontSize: "12px", fontWeight: "500", color: "rgba(255,255,255,0.5)", marginLeft: "12px", fontFamily: "var(--font-sans)" }}>Admin</span>
        </span>
        <button
          onClick={() => setIsAuthenticated(false)}
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}
        >
          Log out
        </button>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px" }}>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", marginBottom: "4px" }}>
            Good morning ✦
          </h1>
          <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Here is what needs your attention today.</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Live podcast listings", value: stats.livePodcasts, urgent: false },
            { label: "Brand accounts", value: stats.brandAccounts, urgent: false },
            { label: "Connection requests", value: stats.connectionRequests, urgent: false },
            { label: "Connections accepted", value: stats.connectionsAccepted, urgent: false },
            { label: "Pending applications", value: stats.pendingApplications, urgent: true },
            { label: "Pending stat updates", value: stats.pendingStatUpdates, urgent: true },
            { label: "Pending briefs", value: stats.pendingBriefs, urgent: true },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#FFFFFF", border: `1px solid ${stat.urgent && stat.value > 0 ? "#FFD4CC" : "#EFEFED"}`, borderRadius: "10px", padding: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: "600", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
                {stat.label}
              </p>
              <p style={{ fontSize: "32px", fontWeight: "800", color: stat.urgent && stat.value > 0 ? "#FF7C6F" : "#00215e", fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "8px", padding: "4px", width: "fit-content" }}>
          {[
            { key: "overview", label: "Overview" },
            { key: "applications", label: `Applications (${pendingApplications.length})` },
            { key: "updates", label: `Stat updates (${pendingStatUpdates.length})` },
            { key: "briefs", label: `Briefs (${pendingBriefs.length})` },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} style={tabStyle(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "32px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "20px" }}>
              Platform health
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Acceptance rate", value: `${Math.round((stats.connectionsAccepted / stats.connectionRequests) * 100)}%`, desc: "of connection requests accepted by podcasters" },
                { label: "Live listings", value: stats.livePodcasts, desc: "approved podcasts currently on the marketplace" },
                { label: "Active brands", value: stats.brandAccounts, desc: "brand accounts created" },
                { label: "Website traffic", value: "Connect Vercel Analytics after deploy", desc: "", muted: true },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #EFEFED" }}>
                  <span style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{item.label}</span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: item.muted ? "#6B6B6B" : "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</span>
                    {item.desc && <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "2px" }}>{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications tab */}
        {activeTab === "applications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {pendingApplications.map((app) => {
              const key = `app-${app.id}`;
              const isActioned = actioned[key];
              return (
                <div key={app.id} style={{ background: "#FFFFFF", border: `1px solid ${isActioned ? "#EFEFED" : "#EFEFED"}`, borderRadius: "12px", padding: "28px", opacity: isActioned ? 0.6 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{app.podcastName}</h3>
                      <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>by {app.publisher} — {app.email}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                      {app.submittedAt}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                    {[
                      { label: "Category", value: app.category },
                      { label: "Location", value: app.location },
                      { label: "Listens range", value: app.listensRange },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                        <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</p>
                        <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Ad formats</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {app.adFormats.map((f) => (
                        <span key={f} style={{ fontSize: "12px", color: "#FF7C6F", background: "#FFF0EE", borderRadius: "4px", padding: "3px 10px", fontFamily: "var(--font-sans)", fontWeight: "600" }}>{f}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>RSS feed</p>
                    <p style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)" }}>{app.rssUrl}</p>
                  </div>

                  {!isActioned && (
                    <div style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Decline reason (optional)</p>
                      <textarea
                        style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
                        placeholder="If declining, add a note for the podcaster..."
                        value={declineNotes[app.id] || ""}
                        onChange={(e) => setDeclineNotes((n) => ({ ...n, [app.id]: e.target.value }))}
                      />
                    </div>
                  )}

                  {isActioned ? (
                    <div style={{ background: isActioned === "approved" ? "#EAF3DE" : "#FCEBEB", borderRadius: "6px", padding: "10px 16px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: isActioned === "approved" ? "#27500A" : "#A32D2D", fontFamily: "var(--font-sans)" }}>
                        {isActioned === "approved" ? "✓ Approved — podcaster will be notified" : "✕ Declined — podcaster will be notified"}
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleAction("app", app.id, "approved")}
                        style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction("app", app.id, "declined")}
                        style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Stat updates tab */}
        {activeTab === "updates" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {pendingStatUpdates.map((update) => {
              const key = `update-${update.id}`;
              const isActioned = actioned[key];
              return (
                <div key={update.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px", opacity: isActioned ? 0.6 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{update.podcastName}</h3>
                      <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>by {update.publisher}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                      {update.submittedAt}
                    </span>
                  </div>

                  <div style={{ background: "#FAFAF8", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>{update.field}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 16px" }}>
                        <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>Current</p>
                        <p style={{ fontSize: "15px", fontWeight: "700", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{update.oldValue}</p>
                      </div>
                      <span style={{ color: "#FF7C6F", fontSize: "18px" }}>→</span>
                      <div style={{ background: "#FFF0EE", border: "1px solid #FFD4CC", borderRadius: "6px", padding: "10px 16px" }}>
                        <p style={{ fontSize: "11px", color: "#FF7C6F", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>Requested</p>
                        <p style={{ fontSize: "15px", fontWeight: "700", color: "#FF7C6F", fontFamily: "var(--font-sans)" }}>{update.newValue}</p>
                      </div>
                    </div>
                  </div>

                  {isActioned ? (
                    <div style={{ background: isActioned === "approved" ? "#EAF3DE" : "#FCEBEB", borderRadius: "6px", padding: "10px 16px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: isActioned === "approved" ? "#27500A" : "#A32D2D", fontFamily: "var(--font-sans)" }}>
                        {isActioned === "approved" ? "✓ Approved — profile updated" : "✕ Declined — podcaster will be notified"}
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleAction("update", update.id, "approved")}
                        style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction("update", update.id, "declined")}
                        style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Briefs tab */}
        {activeTab === "briefs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {pendingBriefs.map((brief) => {
              const key = `brief-${brief.id}`;
              const isActioned = actioned[key];
              return (
                <div key={brief.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px", opacity: isActioned ? 0.6 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>{brief.brandName}</h3>
                      <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{brief.email} — {brief.industry}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                      {brief.submittedAt}
                    </span>
                  </div>

                  <div style={{ background: "#FAFAF8", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Brief</p>
                    <p style={{ fontSize: "14px", color: "#00215e", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>{brief.brief}</p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }}>
                    {[
                      { label: "Category filter", value: brief.filters.category },
                      { label: "Location filter", value: brief.filters.location },
                      { label: "Listens filter", value: brief.filters.listensRange },
                    ].map((item) => (
                      <div key={item.label} style={{ background: "#FAFAF8", borderRadius: "6px", padding: "12px" }}>
                        <p style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</p>
                        <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)" }}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#FFF0EE", border: "1px solid #FFD4CC", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", fontWeight: "600" }}>
                      ✦ {brief.matchCount} podcasts match these filters
                    </p>
                  </div>

                  {isActioned ? (
                    <div style={{ background: isActioned === "approved" ? "#EAF3DE" : "#FCEBEB", borderRadius: "6px", padding: "10px 16px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: isActioned === "approved" ? "#27500A" : "#A32D2D", fontFamily: "var(--font-sans)" }}>
                        {isActioned === "approved" ? "✓ Approved — brief sent to matching podcasters" : "✕ Declined — brand will be notified"}
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleAction("brief", brief.id, "approved")}
                        style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}
                      >
                        Approve and send
                      </button>
                      <button
                        onClick={() => handleAction("brief", brief.id, "declined")}
                        style={{ fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "10px 24px", cursor: "pointer" }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
