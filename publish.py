#!/usr/bin/env python3
"""
publish.py — turn a designer export into the published site.

    python publish.py "C:/temp/AIBrokerManagementSystem-Aug14.2/Paper Theme v3"
    python publish.py <export-dir> --dry-run     # show what would change

The design tool exports flat `.dc.html` pages that cross-link by those same
names. The published site drops the `.dc` suffix and replaces spaces, so every
internal link has to be rewritten to match. This does that deterministically
instead of by hand.

WHAT IT DOES NOT DO
-------------------
It only handles the mechanical rename + link rewrite. It deliberately does not
touch the head (titles, meta, OG), the shared Nav/Footer components, theme.css,
or site.js — those are maintained here, not in the export. So this is a helper
for re-importing page *content*, not a full build. Re-check the handoff doc's
change list after running it.

WHY THE LINK REWRITE IS FUSSY
-----------------------------
Links appear in two forms and a naive `href="..."` search silently misses the
second one:

    <a href="BrokerOS.dc.html">            markup, double quotes
    { key:'brokeros', href: 'BrokerOS.dc.html' }   JS array in Nav.dc.html

The nav's real links live in that JS array. Rewriting only the markup form
leaves every visible link correct while the primary nav points at files that no
longer exist — which looks fine until someone clicks the nav.
"""

import argparse
import os
import re
import shutil
import sys

# Fetched by dc-import, which builds the URL as "./" + name + ".dc.html"
# (support.js:1426). Renaming these breaks the import silently — an empty
# placeholder plus one console error, no crash.
KEEP_DC_SUFFIX = {"Nav.dc.html", "Footer.dc.html"}

# The landing page is published at the site root.
INDEX_SOURCE = "Starlight Landing.dc.html"

# Unlinked design canvas — not part of the site.
SKIP = {"Colorful Section Explorations.dc.html"}

# Design-canvas documents (wireframes, explorations) declare this in their
# helmet. They are internal artefacts, not pages, and must not be published —
# detected rather than listed so new ones are excluded automatically.
CANVAS_MARKER = re.compile(
    r'<meta\b[^>]*name\s*=\s*["\']design_doc_mode["\'][^>]*content\s*=\s*["\']canvas["\']',
    re.I,
)


def is_canvas_doc(path: str) -> bool:
    with open(path, encoding="utf-8", errors="replace") as fh:
        return bool(CANVAS_MARKER.search(fh.read(4000)))


def published_name(src: str) -> str:
    """About.dc.html -> About.html;  'Blog - X.dc.html' -> Blog-X.html"""
    if src == INDEX_SOURCE:
        return "index.html"
    stem = src[: -len(".dc.html")]
    return stem.replace(" - ", "-").replace(" ", "-") + ".html"


def build_mapping(export_dir: str) -> tuple:
    mapping, skipped = {}, []
    for f in sorted(os.listdir(export_dir)):
        if not f.endswith(".dc.html") or f in KEEP_DC_SUFFIX:
            continue
        if f in SKIP:
            skipped.append((f, "unlinked canvas"))
            continue
        if is_canvas_doc(os.path.join(export_dir, f)):
            skipped.append((f, "design_doc_mode=canvas — internal artefact"))
            continue
        mapping[f] = published_name(f)
    return mapping, skipped


def rewrite_links(text: str, mapping: dict) -> tuple:
    """Replace old filenames with published ones, longest first so a shorter
    name can't match inside a longer one (Blog.dc.html vs Blog - X.dc.html)."""
    count = 0
    for old in sorted(mapping, key=len, reverse=True):
        n = text.count(old)
        if n:
            text = text.replace(old, mapping[old])
            count += n
    return text, count


def verify(site_dir: str) -> list:
    """Case-sensitive link check. Windows resolves 'pricing.html' to
    'Pricing.html' happily; the Linux host serving the site does not. So match
    against exact on-disk names rather than trusting a local page load."""
    on_disk = set(os.listdir(site_dir))
    broken = []
    for f in sorted(on_disk):
        if not f.endswith((".html", ".js")):
            continue
        s = open(os.path.join(site_dir, f), encoding="utf-8", errors="replace").read()
        targets = re.findall(r'href="([^"#:]+\.html)(?:#[^"]*)?"', s)
        targets += re.findall(r"href:\s*'([^'#]+\.html)'", s)   # Nav's JS array
        for t in targets:
            if t not in on_disk:
                broken.append((f, t))
    return broken


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("export_dir", help="folder containing the designer export")
    ap.add_argument("--site-dir", default=".", help="destination (default: cwd)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not os.path.isdir(args.export_dir):
        print(f"error: no such folder: {args.export_dir}")
        return 1

    mapping, skipped = build_mapping(args.export_dir)
    if not mapping:
        print("error: no .dc.html pages found — is that the export folder?")
        return 1

    print(f"{'EXPORT':<38} {'PUBLISHED':<30} LINKS")
    total = 0
    for src, dst in mapping.items():
        text = open(os.path.join(args.export_dir, src), encoding="utf-8").read()
        text, n = rewrite_links(text, mapping)
        total += n
        print(f"{src:<38} {dst:<30} {n}")
        if not args.dry_run:
            with open(os.path.join(args.site_dir, dst), "w",
                      encoding="utf-8", newline="") as fh:
                fh.write(text)

    print(f"\n{len(mapping)} page(s), {total} link(s) rewritten"
          + ("  [dry run — nothing written]" if args.dry_run else ""))

    for f, why in skipped:
        print(f"  not published: {f}  ({why})")
    for f in sorted(KEEP_DC_SUFFIX):
        if os.path.exists(os.path.join(args.export_dir, f)):
            print(f"  kept as-is:    {f}  (fetched by dc-import under this exact name)")

    if args.dry_run:
        return 0

    broken = verify(args.site_dir)
    print(f"\nlink check (case-sensitive): "
          + ("all resolved" if not broken else f"{len(broken)} BROKEN"))
    for f, t in broken:
        print(f"   BROKEN  {f} -> {t}")

    print("\nReminder: this rewrites page content only. Titles, meta/OG tags,")
    print("Nav/Footer, theme.css and site.js are maintained here, not in the")
    print("export — re-apply anything from the handoff doc that this drops.")
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
