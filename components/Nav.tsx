"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
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
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
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
        <a href="/signup" style={{ fontSize: "13px", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", padding: "9px 18px", borderRadius: "6px", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}>
          Join free
        </a>
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

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div style={{ position: "absolute", top: "64px", left: 0, right: 0, background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "16px 24px", zIndex: 100, display: "flex", flexDirection: "column", gap: "4px" }} className="mobile-menu">
          <a href="/browse" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Browse</a>
          <a href="/resources/podcasters" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Resources for podcasters</a>
          <a href="/resources/brands" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Resources for brands</a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>About</a>
          <a href="/login" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#00215e", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)", padding: "12px 0", borderBottom: "1px solid #EFEFED" }}>Log in</a>
          <a href="/signup" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: "15px", color: "#FF7C6F", textDecoration: "none", fontWeight: "600", fontFamily: "var(--font-sans)", padding: "12px 0" }}>Join free →</a>
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
