"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{ background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
      <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <span style={{ fontSize: "20px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
          <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "11px", marginLeft: "3px" }}>✦</span>
        </span>
      </a>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <a href="/browse" style={{ fontSize: "14px", color: isActive("/browse") ? "#FF7C6F" : "#6B6B6B", textDecoration: "none", fontWeight: isActive("/browse") ? "600" : "500", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
          Browse
        </a>

        {/* Resources dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setResourcesOpen(!resourcesOpen); setJoinOpen(false); }}
            style={{ fontSize: "14px", color: pathname.startsWith("/resources") ? "#FF7C6F" : "#6B6B6B", fontWeight: pathname.startsWith("/resources") ? "600" : "500", fontFamily: "var(--font-sans)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0, whiteSpace: "nowrap" }}
          >
            Resources
            <span style={{ fontSize: "10px", marginTop: "1px" }}>{resourcesOpen ? "▲" : "▼"}</span>
          </button>
          {resourcesOpen && (
            <div style={{ position: "absolute", top: "32px", left: "50%", transform: "translateX(-50%)", background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "8px", padding: "8px", minWidth: "180px", zIndex: 100, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <a href="/resources/podcasters" onClick={() => setResourcesOpen(false)} style={{ display: "block", fontSize: "13px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "10px 14px", borderRadius: "6px", background: pathname === "/resources/podcasters" ? "#FFF0EE" : "transparent" }}>
                For podcasters
              </a>
              <a href="/resources/brands" onClick={() => setResourcesOpen(false)} style={{ display: "block", fontSize: "13px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "10px 14px", borderRadius: "6px", background: pathname === "/resources/brands" ? "#FFF0EE" : "transparent" }}>
                For brands
              </a>
            </div>
          )}
        </div>

        <a href="/about" style={{ fontSize: "14px", color: isActive("/about") ? "#FF7C6F" : "#6B6B6B", textDecoration: "none", fontWeight: isActive("/about") ? "600" : "500", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
          About
        </a>
        <a href="/login" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
          Log in
        </a>

        {/* Join free dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setJoinOpen(!joinOpen); setResourcesOpen(false); }}
            style={{ fontSize: "13px", background: "#FF7C6F", color: "#FFFFFF", fontWeight: "600", padding: "9px 18px", borderRadius: "6px", fontFamily: "var(--font-sans)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}
          >
            Join free
            <span style={{ fontSize: "10px" }}>{joinOpen ? "▲" : "▼"}</span>
          </button>
          {joinOpen && (
            <div style={{ position: "absolute", top: "44px", right: 0, background: "#FFFFFF", border: "1px solid #EFEFED", borderRadius: "8px", padding: "8px", minWidth: "200px", zIndex: 100, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <a href="/signup" onClick={() => setJoinOpen(false)} style={{ display: "block", textDecoration: "none", padding: "12px 14px", borderRadius: "6px", background: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FFF0EE"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>I'm a podcaster</p>
                <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>List my show for free</p>
              </a>
              <a href="/signup/brand" onClick={() => setJoinOpen(false)} style={{ display: "block", textDecoration: "none", padding: "12px 14px", borderRadius: "6px", background: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FFF0EE"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#00215e", fontFamily: "var(--font-sans)", marginBottom: "2px" }}>I'm a brand</p>
                <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)" }}>Find podcast partners</p>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="mobile-menu-btn"
        style={{ background: "transparent", border: "none", cursor: "pointer", padding: "8px", display: "none", flexDirection: "column", gap: "5px" }}
      >
        <span style={{ display: "block", width: "22px", height: "2px", background: "#00215e", borderRadius: "2px" }} />
        <span style={{ display: "block", width: "22px", height: "2px", background: "#00215e", borderRadius: "2px" }} />
        <span style={{ display: "block", width: "22px", height: "2px", background: "#00215e", borderRadius: "2px" }} />
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ position: "absolute", top: "64px", left: 0, right: 0, background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "16px 24px", zIndex: 100, display: "flex", flexDirection: "column", gap: "4px" }} className="mobile-menu">
          <a href="/browse" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Browse</a>
          <a href="/resources/podcasters" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Resources for podcasters</a>
          <a href="/resources/brands" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Resources for brands</a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>About</a>
          <a href="/login" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Log in</a>
          <a href="/signup" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#FF7C6F", textDecoration: "none", fontWeight: "600", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Join as a podcaster →</a>
          <a href="/signup/brand" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#FF7C6F", textDecoration: "none", fontWeight: "600", fontFamily: "var(--font-sans)", padding: "12px 0" }}>Join as a brand →</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
