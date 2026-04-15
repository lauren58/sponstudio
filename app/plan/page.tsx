import { Suspense } from "react";
import PlanPageContent from "./PlanPageContent";

export default function PlanPage() {
  return (
    <Suspense fallback={<div style={{ background: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontFamily: "sans-serif", color: "#6B6B6B" }}>Loading your plan...</p></div>}>
      <PlanPageContent />
    </Suspense>
  );
}
