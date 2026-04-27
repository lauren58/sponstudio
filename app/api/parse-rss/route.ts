import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rssUrl = searchParams.get("url");

  if (!rssUrl) {
    return NextResponse.json({ error: "No RSS URL provided" }, { status: 400 });
  }

  try {
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "SponStudio/1.0 (podcast marketplace; contact@sponstudio.com)",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch RSS feed" }, { status: 400 });
    }

    const xml = await response.text();

    // Parse podcast name
    const titleMatch = xml.match(/<channel>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                       xml.match(/<channel>[\s\S]*?<title>(.*?)<\/title>/);
    const name = titleMatch ? titleMatch[1].trim() : null;

    // Parse description
    const descMatch = xml.match(/<channel>[\s\S]*?<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                      xml.match(/<channel>[\s\S]*?<description>([\s\S]*?)<\/description>/);
    const description = descMatch ? descMatch[1].trim().slice(0, 300) : null;

    // Parse cover art
    const imageMatch = xml.match(/<itunes:image[^>]*href="([^"]+)"/) ||
                       xml.match(/<image>[\s\S]*?<url>(.*?)<\/url>/);
    const coverArt = imageMatch ? imageMatch[1].trim() : null;

    // Parse author
    const authorMatch = xml.match(/<itunes:author><!\[CDATA\[(.*?)\]\]><\/itunes:author>/) ||
                        xml.match(/<itunes:author>(.*?)<\/itunes:author>/) ||
                        xml.match(/<managingEditor>(.*?)<\/managingEditor>/);
    const author = authorMatch ? authorMatch[1].trim() : null;

    // Parse category
    const categoryMatch = xml.match(/<itunes:category[^>]*text="([^"]+)"/);
    const category = categoryMatch ? categoryMatch[1].trim() : null;

    // Count episodes
    const episodeCount = (xml.match(/<item>/g) || []).length;

    return NextResponse.json({
      name,
      description,
      coverArt,
      author,
      category,
      episodeCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse RSS feed" }, { status: 500 });
  }
}
