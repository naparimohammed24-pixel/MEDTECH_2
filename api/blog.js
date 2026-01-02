


export default async function handler(req, res) {
  try {
    const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
    const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

    if (!SPACE_ID || !ACCESS_TOKEN) {
      return res.status(500).json({
        error: "Missing Contentful environment variables"
      });
    }

    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=blogPost&access_token=${ACCESS_TOKEN}&include=2`;

    const response = await fetch(url);
    const data = await response.json();

    // ✅ Videos will now be inside: data.includes.Asset
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
