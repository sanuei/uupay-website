Title: Cached Content

Description: Fetched from cache

Source: https://uupay.com/en/docs/terms

---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UUPAY</title>
    <meta
      name="description"
      content="UUPAY - 全球数字支付解决方案，提供虚拟卡、多币种钱包、跨境转账与安全支付服务。UUPAY offers virtual cards, multi-currency wallets, cross-border transfers and secure global payments."
    />

    <link rel="dns-prefetch" href="https://www.clarity.ms" />
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://cdn.adjust.com" />
    <link rel="preconnect" href="https://bot.uupay.com" />
    <script type="text/javascript">
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "uwl0izpor1");
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "UUPAY",
        "url": "https://uupay.com/"
      }
    </script>
    <script type="application/javascript">
      !(function (e, t, r, a, n, o, l, i, s, c, d, h, u, f, m) {
        var p = l + "_q",
          g = l + "_c";
        ((e[l] = e[l] || {}), (e[p] = e[p] || []), (e[g] = e[g] || []));
        for (let t = 0; t < i.length; t++) h(e[l], e[p], i[t]);
        for (let t = 0; t < s.length; t++) u(e[l], e[p], s[t]);
        for (let t = 0; t < c.length; t++) {
          const r = c[t][0],
            a = c[t][1];
          let n;
          e[l][r] = function (...t) {
            return (
              (n = this),
              e[g].push(function () {
                n[d] = new e[l][r](...t);
              }),
              n
            );
          };
          for (let t = 0; t < a.length; t++) {
            const o = a[t];
            e[l][r].prototype[o] = function (...t) {
              e[g].push(function () {
                n[d][o](...t);
              });
            };
          }
        }
        ((f = t.createElement(r)),
          (m = t.getElementsByTagName(r)[0]),
          (f.async = !0),
          (f.src = a),
          (f.onload = function () {
            for (var t = 0; t < e[g].length; t++) e[g][t]();
            e[g] = [];
            for (t = 0; t < e[p].length; t++)
              if (e[p][t][1][0] && e[p][t][1][0][d])
                e[l][e[p][t][0]](e[p][t][1][0][d]);
              else {
                const r = e[p][t][2];
                r
                  ? e[l][e[p][t][0]]
                      .apply(e[l], e[p][t][1])
                      .then((e) => r.resolve(e))
                  : e[l][e[p][t][0]].apply(e[l], e[p][t][1]);
              }
            e[p] = [];
          }),
          m.parentNode.insertBefore(f, m));
      })(
        window,
        document,
        "script",
        "https://cdn.adjust.com/adjust-latest.min.js",
        0,
        0,
        "Adjust",
        [
          "initSdk",
          "getAttribution",
          "getWebUUID",
          "setReferrer",
          "trackEvent",
          "addGlobalCallbackParameters",
          "addGlobalPartnerParameters",
          "removeGlobalCallbackParameter",
          "removeGlobalPartnerParameter",
          "clearGlobalCallbackParameters",
          "clearGlobalPartnerParameters",
          "switchToOfflineMode",
          "switchBackToOnlineMode",
          "stop",
          "restart",
          "gdprForgetMe",
          "disableThirdPartySharing",
          "trackThirdPartySharing",
          "initSmartBanner",
          "showSmartBanner",
          "hideSmartBanner",
        ],
        ["waitForAttribution", "waitForWebUUID"],
        [
          [
            "ThirdPartySharing",
            ["addGranularOption", "addPartnerSharingSetting"],
          ],
        ],
        "__realObj",
        function (e, t, r) {
          e[r] = function () {
            t.push([r, arguments]);
          };
        },
        function (e, t, r) {
          e[r] = function () {
            const e = {};
            return (
              (e.promise = new Promise((t, r) => {
                ((e.resolve = t), (e.reject = r));
              })),
              t.push([r, arguments, e]),
              e.promise
            );
          };
        },
      );
    </script>
    <script type="module" crossorigin src="/assets/index-7eaa8c6c.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-5c443d43.js">
    <link rel="modulepreload" crossorigin href="/assets/vue-48b0c461.js">
    <link rel="modulepreload" crossorigin href="/assets/vue-i18n-421625f2.js">
    <link rel="modulepreload" crossorigin href="/assets/fontawesome-f4801bfa.js">
    <link rel="stylesheet" href="/assets/index-d6d2da49.css">
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.addEventListener("load", function () {
        const langMap = {
          en: "en-US",
          "zh-cn": "zh-CN",
          "zh-tw": "zh-HK",
          ja: "ja-JP",
          ko: "ko-KR",
          de: "de-DE",
          ar: "ar-SA",
          pt: "pt-PT",
          es: "es-ES",
          tr: "tr-TR",
          fr: "fr-FR",
          th: "th-TH",
        };
        const getBoLang = (lang) => langMap[lang] || "en-US";

        const pathLang = window.location.pathname.split("/")[1];
        const savedLang =
          pathLang || localStorage.getItem("language") || "zh-cn";
        const botLang = getBoLang(savedLang);
        const script = document.createElement("script");
        script.defer = true;
        script.src = `https://bot.uupay.com/assets/sc-bot.cjs.js?tenantId=7F3syl7T1rgHni5%2BPW54SOGcONhefVZarLeHRQM3Ag%3D%3D&t=0197f74c-fe1f-70e5-bb2b-ba0ef402644a&lang=${botLang}`;
        script.setAttribute("data-sc-bot-pop-up", "");
        document.body.appendChild(script);
      });
    </script>
    

    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-2TPNR098JM"
    ></script>
    <script async>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-2TPNR098JM");
    </script>
  </body>
</html>


