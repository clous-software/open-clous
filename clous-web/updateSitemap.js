const fs = require("fs");
const axios = require("axios");

// Ruta del sitemap en la carpeta 'public'
const sitemapPath = "./public/sitemap.xml";

// Obtiene la fecha actual en formato ISO
const currentDate = new Date().toISOString().split("T")[0];

// Lista de rutas para el sitemap
const urls = [
  { loc: "https://www.clous.app/", changefreq: "daily", priority: 1.0 },
  { loc: "https://www.clous.app/cloush", changefreq: "daily", priority: 0.9 },
  { loc: "https://www.clous.app/startup", changefreq: "daily", priority: 0.8 },
  { loc: "https://www.clous.app/hrteams", changefreq: "daily", priority: 0.8 },
  {
    loc: "https://www.clous.app/enterprise",
    changefreq: "daily",
    priority: 0.8,
  },
  { loc: "https://www.clous.app/team", changefreq: "daily", priority: 0.9 },
  {
    loc: "https://www.clous.app/partners",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    loc: "https://www.clous.app/mission",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    loc: "https://www.clous.app/editorial",
    changefreq: "daily",
    priority: 0.9,
  },
  { loc: "https://www.clous.app/blog", changefreq: "daily", priority: 0.7 },
  {
    loc: "https://www.clous.app/news-room",
    changefreq: "weekly",
    priority: 0.7,
  },
  { loc: "https://www.clous.app/guides", changefreq: "weekly", priority: 0.7 },
  {
    loc: "https://www.clous.app/hr-talks",
    changefreq: "weekly",
    priority: 0.7,
  },
  { loc: "https://www.clous.app/contact", changefreq: "daily", priority: 0.9 },
  {
    loc: "https://www.clous.app/disclaimer",
    changefreq: "monthly",
    priority: 0.5,
  },
  { loc: "https://www.clous.app/terms", changefreq: "monthly", priority: 0.5 },
  {
    loc: "https://www.clous.app/privacy",
    changefreq: "monthly",
    priority: 0.5,
  },
  // Agrega más URLs estáticas según sea necesario
];

const apiUrl1 = "https://server-editorial-7813ebef7135.herokuapp.com/api/news/list";
const apiUrl2 = "https://server-editorial-7813ebef7135.herokuapp.com/api/blog/list";
const apiUrl3 = "https://server-editorial-7813ebef7135.herokuapp.com/api/guide/list";
const apiUrl4 = "https://server-editorial-7813ebef7135.herokuapp.com/api/hrtalks/list";

axios.all([axios.get(apiUrl1), axios.get(apiUrl2)])
  .then(axios.spread((response1, response2) => {
    const newsPosts = response1.data;
    const blogPosts = response2.data.blogs; // Se asume que 'blogs' es el array de blogs
    const guidePosts = response1.data;
    const hrtalksPosts = response1.data;

    // Generar sitemap para las noticias
    const newsSitemap = generateSitemap(newsPosts, 'news-room');
    // Generar sitemap para los blogs
    const blogSitemap = generateSitemap(blogPosts, 'blog');
    // Generar sitemap para los guide articles
    const guideSitemap = generateSitemap(guidePosts, 'guides');
    // Generar sitemap para los hrt articles
    const hrtalksSitemap = generateSitemap(hrtalksPosts, 'hr-talks');

    // Combinar los sitemaps
    const combinedSitemap = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${newsSitemap}
${blogSitemap}
${guideSitemap}
${hrtalksSitemap}
${generateStaticUrls()}
</urlset>`;

    // Escribir el sitemap combinado en el archivo
    fs.writeFileSync(sitemapPath, combinedSitemap);

  }))
  .catch((error) => {
    console.error("Error al obtener datos de las APIs:", error.message);
  });

// Función para generar el sitemap para un conjunto de publicaciones (ya sean noticias o blogs)
function generateSitemap(posts, type) {
  const currentDate = new Date().toISOString().split("T")[0];
  return `
${posts.map((post) => `
<url>
<loc>https://www.clous.app/${type}/${post.slug}</loc>
<lastmod>${currentDate}</lastmod>
<changefreq>daily</changefreq>
<priority>0.7</priority>
<title>${post.title}</title>
</url>`).join("\n")}
`;
}

// Función para generar las URL estáticas
function generateStaticUrls() {
  return `
${urls.map((url) => `
<url>
<loc>${url.loc}</loc>
<lastmod>${currentDate}</lastmod>
<changefreq>${url.changefreq}</changefreq>
<priority>${url.priority}</priority>
</url>`).join("\n")}
`;
}
