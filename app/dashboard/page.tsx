"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type ConnectionRequest = {
  id: string;
  brand_id: string;
  status: string;
  created_at: string;
  brands: {
    company_name: string;
    contact_name: string;
    email: string;
    industry: string;
    website: string;
    looking_for: string;
  user_id: string;
    budget: string;
  };
};

export default function PodcasterDashboard() {
  const { isLoggedIn, isPodcaster, loading } = useAuth();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [actioned, setActioned] = useState<Record<string, "accepted" | "declined">>({});
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [podcasterEmail, setPodcasterEmail] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn || !isPodcaster) return;

    const fetchRequests = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoadingRequests(false); return; }

      setPodcasterEmail(session.user.email || "");

      const { data: podcasterRows } = await supabase
        .from("podcasters")
        .select("id")
        .eq("user_id", session.user.id);

      const podcasterIds = (podcasterRows || []).map((p) => p.id);
      if (podcasterIds.length === 0) { setLoadingRequests(false); return; }

      const { data: requestData } = await supabase
        .from("connection_requests")
        .select(`
          id,
          brand_id,
          status,
          created_at,
          brands (
            company_name,
            contact_name,
            email,
            industry,
            website,
            looking_for,
            budget
          )
        `)
        .in("podcaster_id", podcasterIds)
        .order("created_at", { ascending: false });

      if (requestData) setRequests(requestData as any);
      setLoadingRequests(false);
    };

    fetchRequests();
  }, [isLoggedIn, isPodcaster, loading]);

  const handleAction = async (request: ConnectionRequest, action: "accepted" | "declined") => {
    await supabase
      .from("connection_requests")
      .update({ status: action })
      .eq("id", request.id);

    if (action === "accepted") {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "connection_accepted",
          data: {
            brandEmail: request.brands.email,
            brandName: request.brands.company_name,
            podcasterEmail: podcasterEmail,
          },
        }),
      });
    } else {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "connection_declined",
          data: {
            brandEmail: request.brands.email,
            brandName: request.brands.company_name,
          },
        }),
      });
    }

    setActioned((prev) => ({ ...prev, [request.id]: action }));
  };

  if (loading || loadingRequests) {
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        <Nav />
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
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
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>Access denied</h1>
          <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "32px" }}>This page is only available to podcaster accounts.</p>
          <a href="/login" style={{ background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", fontSize: "14px", padding: "13px 24px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>Log in</a>
        </div>
        <Footer />
      </div>
    );
  }

  const pending = requests.filter((r) => r.status === "pending" && !actioned[r.id]);
  const past = requests.filter((r) => r.status !== "pending" || actioned[r.id]);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>
          Connection requests
        </h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "48px", lineHeight: "1.7" }}>
          Review brands that want to connect with your show. If you accept, they'll receive your contact details.
        </p>

        {pending.length === 0 && past.length === 0 && (
          <div style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "32px", marginBottom: "16px" }}>✦</p>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "8px" }}>No requests yet</h2>
            <p style={{ fontSize: "14px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>
              When brands request to connect with your show, they'll appear here.
            </p>
          </div>
        )}

        {pending.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
              Pending ({pending.length})
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {pending.map((request) => (
                <div key={request.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "4px" }}>
                        {request.brands.company_name}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>
                        {request.brands.industry} · {request.brands.contact_name}
                      </p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#6B6B6B", fontFamily: "var(--font-sans)", background: "#FAFAF8", border: "1px solid #EFEFED", borderRadius: "4px", padding: "4px 10px" }}>
                      {new Date(request.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  {request.brands.website && (
                    <div style={{ marginBottom: "12px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Website</p>
                      <a href={request.brands.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#FF7C6F", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
                        {request.brands.website}
                      </a>
                    </div>
                  )}

                  {request.brands.looking_for && (
                    <div style={{ background: "#FAFAF8", borderRadius: "8px", padding: "14px 16px", marginBottom: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>What they're looking for</p>
                      <p style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)", lineHeight: "1.7" }}>{request.brands.looking_for}</p>
                    </div>
                  )}

                  {request.brands.budget && (
                    <div style={{ marginBottom: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "700", color: "#6B6B6B", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Budget</p>
                      <p style={{ fontSize: "13px", color: "#00215e", fontFamily: "var(--font-sans)" }}>{request.brands.budget}</p>
                    </div>
                  )}

                  <div style={{ background: "#FFF0EE", border: "1px solid #FFD4CC", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px" }}>
                    <p style={{ fontSize: "12px", color: "#FF7C6F", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
                      ✦ If you accept, your email address will be shared with this brand so they can reach out directly.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleAction(request, "accepted")}
                      style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#FFFFFF", background: "#FF7C6F", border: "none", borderRadius: "6px", padding: "12px 24px", cursor: "pointer" }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(request, "declined")}
                      style={{ fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-sans)", color: "#6B6B6B", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "6px", padding: "12px 24px", cursor: "pointer" }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
              Past requests
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {past.map((request) => {
                const status = actioned[request.id] || request.status;
                return (
                  <div key={request.id} style={{ background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", opacity: 0.7 }}>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>{request.brands.company_name}</p>
                      <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>{request.brands.industry}</p>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "600", fontFamily: "var(--font-sans)", color: status === "accepted" ? "#27500A" : "#A32D2D", background: status === "accepted" ? "#EAF3DE" : "#FCEBEB", borderRadius: "4px", padding: "4px 12px" }}>
                      {status === "accepted" ? "✓ Accepted" : "✕ Declined"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
