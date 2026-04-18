export default function Footer() {
  return (
    <footer style={{ background: "#FAFAF8", borderTop: "1px solid #EFEFED", padding: "40px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
            <span style={{ fontStyle: "italic" }}>Spon</span><span style={{ color: "#FF7C6F" }}>Studio</span><span style={{ color: "#FF7C6F", fontSize: "12px", marginLeft: "4px" }}>✦</span>
          </span>
          <p style={{ fontSize: "12px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginTop: "6px" }}>
            Built by <a href="https://centennialworld.com" style={{ color: "#6B6B6B", textDecoration: "underline" }}>Centennial World Podcast Network</a>
          </p>
        </div>
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Platform</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="/browse" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>Browse podcasts</a>
              <a href="/signup" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>List my podcast</a>
              <a href="/signup/brand" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>For brands</a>
              <a href="/about" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>About</a>
            </div>
          </div>
        <div>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-sans)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Resources</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="/resources/podcasters" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>For podcasters</a>
              <a href="/resources/brands" style={{ fontSize: "13px", color: "#6B6B6B", textDecoration: "none", fontFamily: "var(--font-sans)" }}>For brands</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
