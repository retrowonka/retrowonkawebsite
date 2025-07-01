const container = document.getElementById('blog-container');
const urlParams = new URLSearchParams(window.location.search);
const singlePost = urlParams.get('post');

// Load just one if specified, otherwise all
const postFiles = singlePost ? [singlePost] : [
  'post7.md',
  'post6.md',
  'post5.md',
  'post4.md',
  'post3.md',
  'post2.md',
  'post1.md'
];

postFiles.forEach(file => {
  fetch(`posts/${file}`)
    .then(res => res.text())
    .then(md => {
      let frontmatter = {};
      let body = md;

      // ✅ Fix: manually parse frontmatter
      if (md.startsWith('---')) {
        const parts = md.split('---');
        const fm = parts[1].trim().split('\n');
        body = parts.slice(2).join('---').trim(); // Everything after the second ---

        fm.forEach(line => {
          const [key, ...rest] = line.split(':');
          if (key && rest.length) {
            frontmatter[key.trim()] = rest.join(':').trim();
          }
        });
      }

      const post = document.createElement('div');
      post.className = 'blog-post';
      post.innerHTML = `
        <div class="post-image">
          <img src="${frontmatter.image || ''}" alt="${frontmatter.title || ''}">
        </div>
        <div class="post-content">
          <h2 class="post-title">${frontmatter.title || 'Untitled Post'}</h2>
          <p class="post-date">${frontmatter.date || ''}</p>
          ${marked.parse(body)}
        </div>
      `;
      container.appendChild(post);
    })
    .catch(err => {
      console.error(`Error loading ${file}:`, err);
    });
});