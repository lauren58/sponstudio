import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Verify this is being called by Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all pending connection requests older than 3 days
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data: pendingRequests, error } = await supabase
    .from("connection_requests")
    .select(`
      id,
      created_at,
      podcaster_id,
      brand_id,
      brands (company_name),
      podcasters (podcast_name, email)
    `)
    .eq("status", "pending")
    .lt("created_at", threeDaysAgo.toISOString());

  if (error) {
    console.error("Error fetching pending requests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!pendingRequests || pendingRequests.length === 0) {
    return NextResponse.json({ message: "No pending reminders to send", count: 0 });
  }

  // Group by podcaster so they get one email even if they have multiple pending requests
  const byPodcaster: Record<string, { email: string; podcastName: string; brands: string[]; ids: string[] }> = {};

  for (const req of pendingRequests) {
    const podcaster = req.podcasters as any;
    const brand = req.brands as any;
    if (!podcaster?.email) continue;

    if (!byPodcaster[req.podcaster_id]) {
      byPodcaster[req.podcaster_id] = {
        email: podcaster.email,
        podcastName: podcaster.podcast_name,
        brands: [],
        ids: [],
      };
    }
    byPodcaster[req.podcaster_id].brands.push(brand?.company_name || "A brand");
    byPodcaster[req.podcaster_id].ids.push(req.id);
  }

  let sent = 0;
  for (const [podcasterId, data] of Object.entries(byPodcaster)) {
    const brandList = data.brands.length === 1
      ? data.brands[0]
      : data.brands.slice(0, -1).join(", ") + " and " + data.brands[data.brands.length - 1];

    const plural = data.brands.length > 1;

    await resend.emails.send({
      from: "SponStudio <notifications@sponstudio.com>",
      to: data.email,
      subject: `Reminder — you have ${plural ? "connection requests" : "a connection request"} waiting on SponStudio`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;">
          <h2 style="color:#00215e;font-size:22px;margin-bottom:8px;">You have ${plural ? "connection requests" : "a connection request"} waiting ✦</h2>
          <p style="color:#6B6B6B;font-size:15px;line-height:1.7;margin-bottom:16px;">
            Just a friendly reminder that <strong>${brandList}</strong> ${plural ? "have" : "has"} requested to connect with <strong>${data.podcastName}</strong> on SponStudio and ${plural ? "are" : "is"} waiting for your response.
          </p>
          <p style="color:#6B6B6B;font-size:15px;line-height:1.7;margin-bottom:24px;">
            Log in to your dashboard to accept or decline. If you accept, the brand will receive your contact email so they can reach out directly.
          </p>
          <a href="https://www.sponstudio.com/dashboard" style="display:inline-block;background:#FF7C6F;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:6px;">
            Review connection ${plural ? "requests" : "request"} →
          </a>
          <p style="color:#AAAAAA;font-size:12px;margin-top:32px;line-height:1.6;">
            If you are not already logged in, log in to your SponStudio podcaster account first then visit My profile → Connection requests from the menu.
          </p>
          <p style="color:#AAAAAA;font-size:11px;margin-top:16px;">via SponStudio ✦ sponstudio.com</p>
        </div>
      `,
    });
    sent++;
  }

  return NextResponse.json({ message: `Sent ${sent} reminder email${sent !== 1 ? "s" : ""}`, count: sent });
}
