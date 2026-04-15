"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav style={{ background: "#FAFAF8", borderBottom: "1px solid #EFEFED", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
      <a href="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "22px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
          <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
        </span>
      </a>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <a href="/browse" style={{ fontSize: "14px", color: isActive("/browse") ? "#FF7C6F" : "#6B6B6B", textDecoration: "none", fontWeight: isActive("/browse") ? "600" : "500", fontFamily: "var(--font-sans)" }}>
          Browse
        </a>

        {/* Resources dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            style={{ fontSize: "14px", color: pathname.startsWith("/resources") ? "#FF7C6F" : "#6B6B6B", fontWeight: pathname.startsWith("/resources") ? "600" : "500", fontFamily: "var(--font-sans)", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0 }}
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

        <a href="/about" style={{ fontSize: "14px", color: isActive("/about") ? "#FF7C6F" : "#6B6B6B", textDecoration: "none", fontWeight: isActive("/about") ? "600" : "500", fontFamily: "var(--font-sans)" }}>
          About
        </a>
        <a href="/login" style={{ fontSize: "14px", color: "#6B6B6B", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>
          Log in
        </a>
        <a href="/signup" style={{ fontSize: "14px", background: "#FF7C6F", color: "#FFFFFF", textDecoration: "none", fontWeight: "600", padding: "10px 22px", borderRadius: "6px", fontFamily: "var(--font-sans)" }}>
          Join free
        </a>
      </div>
    </nav>
  );
}
