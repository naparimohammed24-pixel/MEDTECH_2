const SPACE_ID = "wh2jduuotak5";
const ACCESS_TOKEN = "-LgprZeoLtz64wCTTjVdFx1RrWA5C11ZtEk4UdrNW7g";
const CONTENT_TYPE = "blogPost";

const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=${CONTENT_TYPE}&access_token=${ACCESS_TOKEN}&include=2`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("blog");
    container.innerHTML = "";

    // Build asset map
    const assets = {};
    if (data.includes && data.includes.Asset) {
      data.includes.Asset.forEach(asset => {
        assets[asset.sys.id] = asset.fields.file.url;
      });
    }

    data.items.forEach(item => {
      const title = item.fields.title || "No title";

      // If your blog post links a video field
      let videoHTML = "";
      if (item.fields.video && assets[item.fields.video.sys.id]) {
        videoHTML = `
          <video controls width="100%">
            <source src="https:${assets[item.fields.video.sys.id]}" type="video/mp4">
          </video>
        `;
      }

      container.innerHTML += `
        <div class="post">
          <h2>${title}</h2>
          ${videoHTML}
        </div>
      `;
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("blog").innerHTML = "Failed to load blog.";
  });
