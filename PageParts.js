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
  var LINKEDIN_PARTNER_ID = "9933420";

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

  // ── LinkedIn Insight Tag ────────────────────────────────────────────────
  // Conversion tracking and retargeting audiences for LinkedIn campaigns.
  // Both globals are set because the vendor snippet sets both: the library
  // reads the array, and the scalar is kept for compatibility.
  //
  // The vendor's <noscript> fallback pixel is deliberately omitted. Every page
  // here is rendered by the DC runtime, so a visitor without JavaScript sees a
  // blank page — there is no visit to measure, and the tag cannot fire anyway.
  window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

  if (!window.lintrk) {
    window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = [];
  }

  var li = document.createElement("script");
  li.async = true;
  li.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  document.head.appendChild(li);
})();
