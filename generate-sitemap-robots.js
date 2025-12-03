import fs from "fs";
import path from "path";

const MAIN_URL = "https://www.uupay.cc";
const BOT_URL = "https://bot.uupay.cc";

const languages = ["zh-cn", "en", "zh-tw"];
const pages = ["/"];

// ===== 自动扫描博客文章 =====
const blogDir = path.resolve("src/blog");
let posts = [];

if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    posts = files
        .filter((f) => f.endsWith(".md") || f.endsWith(".vue"))
        .map((f) => `/blog/${f.replace(/\.(md|vue)$/, "")}`);
}

// ===== 生成 sitemap =====
function buildSitemap(baseUrl) {
    let xml = '';
    xml += `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    const allPages = pages.concat(posts);

    allPages.forEach((page) => {
        languages.forEach((lang) => {
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}/${lang}${page}</loc>\n`;

            languages.forEach((altLang) => {
                xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${baseUrl}/${altLang}${page}" />\n`;
            });

            xml += `    <changefreq>daily</changefreq>\n`;
            xml += `  </url>\n`;
        });
    });

    xml += `</urlset>\n`;
    return xml;
}

// ===== 主站 robots.txt =====
function buildMainRobots() {
    return `User-agent: *
Allow: /

Sitemap: ${MAIN_URL}/sitemap.xml
`;
}

// ===== bot 子域的 robots.txt =====
function buildBotRobots() {
    return `User-agent: *
Allow: /auth/sign-in

Sitemap: ${BOT_URL}/sitemap.xml
`;
}

// ===== 输出 =====
const publicDir = path.resolve("public");

// 主站文件输出
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemap(MAIN_URL));
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildMainRobots());

// bot 子域输出文件夹
const botDir = path.join(publicDir, "bot");
if (!fs.existsSync(botDir)) fs.mkdirSync(botDir);

fs.writeFileSync(path.join(botDir, "sitemap.xml"), buildSitemap(BOT_URL));
fs.writeFileSync(path.join(botDir, "robots.txt"), buildBotRobots());

console.log("✅ 主站 & bot 子域 sitemap / robots 生成完毕");
