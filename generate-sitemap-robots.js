import fs from "fs";
import path from "path";

const BASE_URL = "https://uupay.com";
const languages = ["zh-cn", "en", "zh-tw", "th"];
const pages = ["/"]; // 首页等静态页面

// 手动维护第三方博客 URL（去掉域名，保留路径）
const externalPosts = [
    "/zh-cn/blog",
    "/en/blog",
    "/zh-tw/blog",
    "/th/blog",
    // 如果有更多博客 URL，可以继续添加
];

// 生成 sitemap.xml
function buildSitemap() {
    let xml = '';
    xml += `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    const allPages = pages.concat(externalPosts);

    allPages.forEach((page) => {
        // 检查 URL 是否已经包含语言前缀
        const hasLangPrefix = /^\/(zh-cn|en|zh-tw|th)\//.test(page);

        languages.forEach((lang) => {
            const loc = hasLangPrefix ? `${BASE_URL}${page}` : `${BASE_URL}/${lang}${page}`;
            xml += `  <url>\n`;
            xml += `    <loc>${loc}</loc>\n`;

            // 多语言 alternate 标签
            languages.forEach((altLang) => {
                const altLoc = hasLangPrefix
                    ? `${BASE_URL}${page.replace(/^\/(zh-cn|en|zh-tw|th)\//, `/${altLang}/`)}`
                    : `${BASE_URL}/${altLang}${page}`;
                xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}" />\n`;
            });

            xml += `    <changefreq>daily</changefreq>\n`;
            xml += `  </url>\n`;
        });
    });

    xml += `</urlset>\n`;
    return xml;
}

// 生成 robots.txt
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
console.log("📄 文章列表:", externalPosts);
