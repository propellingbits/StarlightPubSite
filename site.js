/* ═══════════════════════════════════════════════════════════════════════════
   Starlight — shared render-time data.

   Loaded from every page's real <head>, BEFORE support.js, and deliberately
   NOT deferred:

       <script src="./site.js"></script>

   It has to be blocking because page logic classes call SL.contact() inside
   renderVals(), which the runtime can invoke as soon as React boots. PageParts.js
   is deferred — that's correct for analytics, and wrong for this.

   Why this file exists at all: the DC runtime reads a page's logic class from
   the inline <script data-dc-script> element's textContent (support.js:33), so
   that tag can't take a `src`. A plain <script src> in the head can, which is
   the seam this uses.

   Contact details stay base64 in source so a plain-text scraper reading the
   page HTML finds nothing. They used to be pasted into all 13 files, which made
   rotating the number a 13-file edit — the point of keeping one copy here is
   that swapping a burned proxy number or alias is a one-line change.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var d = function (b64) { return atob(b64); };

  var phone        = d('KzEzMTIyMDAxOTky');
  var phoneDisplay = d('KzEgKDMxMikgMjAwLTE5OTI=');
  var emailHello   = d('aGVsbG9AZ2V0c3RhcmxpZ2h0LmFp');
  var emailSupport = d('c3VwcG9ydEBnZXRzdGFybGlnaHQuYWk=');

  window.SL = {
    /** Canonical contact identities. Pages alias these to their own local
     *  names — Terms renders it as `legalEmail`, Careers as `applyEmail`,
     *  Privacy as `privacyEmail` — but there is only one address behind them.
     *  Returns a fresh object so callers can spread and extend it safely. */
    contact: function () {
      return {
        phone: phone,
        phoneDisplay: phoneDisplay,
        phoneHref: 'tel:' + phone,
        smsHref: 'sms:' + phone,
        emailHello: emailHello,
        emailHelloHref: 'mailto:' + emailHello,
        emailSupport: emailSupport,
        emailSupportHref: 'mailto:' + emailSupport
      };
    }
  };
})();
