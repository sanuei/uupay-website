import fs from "fs";
import path from "path";

const BASE_URL = "https://www.uupay.cc";
const languages = ["zh-cn", "en", "zh-tw"];
const pages = ["/"]; // 首页等静态页面

// 🔹 自动扫描博客文章目录
const blogDir = path.resolve("src/blog"); // 根据你实际存放文章的目录改
let posts = [];

if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    // 假设每个文件名即文章 slug
    posts = files
        .filter((f) => f.endsWith(".md") || f.endsWith(".vue"))
        .map((f) => `/blog/${f.replace(/\.(md|vue)$/, "")}`);
}

// 🔹 生成 sitemap.xml
function buildSitemap() {
    let xml = '';
    xml += `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    const allPages = pages.concat(posts);

    allPages.forEach((page) => {
        languages.forEach((lang) => {
            xml += `  <url>\n`;
            xml += `    <loc>${BASE_URL}/${lang}${page}</loc>\n`;

            // 多语言 alternate 标签
            languages.forEach((altLang) => {
                xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}/${altLang}${page}" />\n`;
            });

            xml += `    <changefreq>daily</changefreq>\n`;
            xml += `  </url>\n`;
        });
    });

    xml += `</urlset>\n`;
    return xml;
}

// 🔹 生成 robots.txt
function buildRobots() {
    return `User-agent: *
Disallow:

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

// 输出路径
const publicDir = path.resolve("public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemap());
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobots());

console.log("✅ sitemap.xml & robots.txt 已生成在 public/ 目录");
console.log("📄 文章列表:", posts);
