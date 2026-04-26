import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { type, data } = await request.json();

  try {
    if (type === "new_application") {
      await resend.emails.send({
        from: "SponStudio <notifications@sponstudio.com>",
        to: "lauren@centennialworld.com",
        subject: `New podcast application: ${data.podcastName}`,
        html: `<h2>New podcast application received</h2>
          <p><strong>Podcast:</strong> ${data.podcastName}</p>
          <p><strong>Publisher:</strong> ${data.publisherName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Listens range:</strong> ${data.listensRange}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <br/>
          <a href="https://www.sponstudio.com/admin">Review in admin dashboard</a>`,
      });
    }

    if (type === "new_brand") {
      await resend.emails.send({
        from: "SponStudio <notifications@sponstudio.com>",
        to: "lauren@centennialworld.com",
        subject: `New brand account: ${data.companyName}`,
        html: `<h2>New brand account created</h2>
          <p><strong>Company:</strong> ${data.companyName}</p>
          <p><strong>Contact:</strong> ${data.contactName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Industry:</strong> ${data.industry}</p>
          <p><strong>Budget:</strong> ${data.budget || "Not provided"}</p>
          <br/>
          <a href="https://www.sponstudio.com/admin">View in admin dashboard</a>`,
      });
    }

    if (type === "connection_request") {
      await resend.emails.send({
        from: "SponStudio <notifications@sponstudio.com>",
        to: "lauren@centennialworld.com",
        subject: `New connection request on SponStudio`,
        html: `<h2>New connection request</h2>
          <p><strong>Brand:</strong> ${data.brandName}</p>
          <p><strong>Brand email:</strong> ${data.brandEmail}</p>
          <p><strong>Podcast:</strong> ${data.podcastName}</p>
          <br/>
          <a href="https://www.sponstudio.com/admin">Review in admin dashboard</a>`,
      });
    }

    if (type === "connection_accepted") {
      await resend.emails.send({
        from: "SponStudio <notifications@sponstudio.com>",
        to: data.brandEmail,
        subject: `Your connection request was accepted!`,
        html: `<h2>Great news!</h2>
          <p>${data.brandName}, your connection request was accepted.</p>
          <p>You can now reach out directly to the podcaster at: <strong>${data.podcasterEmail}</strong></p>
          <br/>
          <p>We recommend introducing yourself, sharing your brief and asking for their media kit.</p>
          <br/>
          <a href="https://www.sponstudio.com/resources/brands">View our brand resources for tips on working with podcasters</a>`,
      });
    }

    if (type === "connection_declined") {
      await resend.emails.send({
        from: "SponStudio <notifications@sponstudio.com>",
        to: data.brandEmail,
        subject: `Update on your connection request`,
        html: `<h2>Connection request update</h2>
          <p>Hi ${data.brandName}, the podcaster has reviewed your connection request and it wasn't the right fit at this time.</p>
          <p>Don't be discouraged — there are plenty of other great shows on SponStudio that might be a better match.</p>
          <br/>
          <a href="https://www.sponstudio.com/browse">Browse more podcasts</a>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
