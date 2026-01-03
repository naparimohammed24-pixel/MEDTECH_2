

     export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
    const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

    // 🔴 HARD CHECK (important)
    if (!SPACE_ID || !ACCESS_TOKEN) {
      return res.status(500).json({
        error: "Missing Contentful environment variables",
        spaceId: SPACE_ID || null,
        token: ACCESS_TOKEN ? "FOUND" : null
      });
    }

    if (!slug) {
      return res.status(400).json({ error: "Missing slug" });
    }

    const url =
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries` +
      `?content_type=blogPost&fields.slug=${slug}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
     }
