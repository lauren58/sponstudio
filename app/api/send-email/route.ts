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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
