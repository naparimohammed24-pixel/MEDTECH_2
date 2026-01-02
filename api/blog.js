

const SPACE_ID = "wh2jduuotak5";
const ACCESS_TOKEN = "-LgprZeoLtz64wCTTjVdFx1RrWA5C11ZtEk4UdrNW7g"; // Delivery API key
const CONTENT_TYPE = "blog"; // change if your API ID is different

const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=${CONTENT_TYPE}&access_token=${ACCESS_TOKEN}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("blog");

    if (!data.items.length) {
      container.innerHTML = "<p>No blog posts found.</p>";
      return;
    }

    data.items.forEach(item => {
      const title = item.fields.title || "No title";
      const body = item.fields.body || "";

      container.innerHTML += `
        <div class="post">
          <h2>${title}</h2>
          <p>${body}</p>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("blog").innerHTML = "Failed to load blog.";
  });
