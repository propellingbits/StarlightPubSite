/* ═══════════════════════════════════════════════════════════════════════════
   Starlight — page-level scripts shared by every page.

   Loaded from each page's real <head> with:
       <script src="./PageParts.js" defer></script>

   `defer` keeps it off the critical path: it runs after parsing, before
   DOMContentLoaded, and neither tracker blocks render.

   NOTE — the footer used to be fetched here and injected into
   #footer-container. That could never work: the container lived inside <x-dc>,
   and the runtime replaces that whole subtree on boot (support.js:166), so the
   injected markup was always discarded. It also left the footer's 32
   `style-hover` attributes inert, since those are compiled by the DC runtime
   rather than being real HTML. The footer is now a proper Design Component —
   see Footer.dc.html and the <dc-import name="Footer"> on each page.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var GA_ID = "G-3NNPMHP6Y3";
  var CLARITY_ID = "y20gthhmip";

  // ── Google Analytics ────────────────────────────────────────────────────
  // dataLayer and gtag() must exist before gtag.js finishes loading; the tag
  // replays anything queued once it arrives.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);

  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(ga);

  // ── Microsoft Clarity ───────────────────────────────────────────────────
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
})();
