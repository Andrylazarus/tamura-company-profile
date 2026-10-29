"""One-off: download manufacturer product photos and make site-ready images.

Run by .github/workflows/fetch-images.yml (GitHub's servers can reach the
manufacturer sites). Writes:
  public/images/products/<brand>/<slug>.png   large photo for the product page
  public/images/catalog/<id>.webp             640 px card thumbnail
"""
import io
import sys
import urllib.request
from pathlib import Path

from PIL import Image

P = "https://connect.na.panasonic.com/hubfs/"
H = "https://connect.na.panasonic.com/hs-fs/hubfs/"
IMAGES = [
    # (brand, slug, catalog id, [urls to try, best first])
    ("panasonic", "npm-gp-l", "panasonic-npm-gp-l", [
        H + "PCONA%20-%20Panasonic%20Connect/PIVS/Professional%20Displays%20-%20Product%20Images/PCONA%20-%20PIVS%20-%20Displays/SF%20-%20Electronics%20Assembly%20-%20Screen%20Printers%20-%20Product%20-%20NPM-GP-L%20Next-Generation%20Printer/NPM-GP-L%20Next-Generation%20Printer.png?width=1400&name=NPM-GP-L%20Next-Generation%20Printer.png",
        H + "PCONA%20-%20Panasonic%20Connect/PIVS/Professional%20Displays%20-%20Product%20Images/PCONA%20-%20PIVS%20-%20Displays/SF%20-%20Electronics%20Assembly%20-%20Screen%20Printers%20-%20Product%20-%20NPM-GP-L%20Next-Generation%20Printer/NPM-GP-L%20Next-Generation%20Printer.png?width=584&height=390&name=NPM-GP-L%20Next-Generation%20Printer.png",
    ]),
    ("panasonic", "spv", "panasonic-spv", [
        P + "PCONA%20-%20United%20States/SF%20-%20Smart%20Factory/PCONA%20-%20SF%20-%20Electronics%20Assembly/SF%20-%20Electronics%20Assembly%20-%20Screen%20Printers%20-%20Product%20-%20SPV%20Screen%20Printer/SPV%20Screen%20Printer.png",
        H + "PCONA%20-%20Panasonic%20Connect/PCONA%20-%20SF%20-%20Electronics%20Assembly/SF%20-%20Electronics%20Assembly%20-%20Screen%20Printers%20-%20Product%20-%20SPV%20Screen%20Printer/SPV%20Screen%20Printer.png?width=584&height=390&name=SPV%20Screen%20Printer.png",
    ]),
    ("panasonic", "spv-dc", "panasonic-spv-dc", [
        P + "PCONA%20-%20United%20States/SF%20-%20Smart%20Factory/PCONA%20-%20SF%20-%20Electronics%20Assembly/SF%20-%20Electronics%20Assembly%20-%20Screen%20Printers%20-%20Product%20-%20SPV-DC%20Screen%20Printer/SPV-DC%20Screen%20Printer.png",
        H + "PCONA%20-%20Panasonic%20Connect/PCONA%20-%20SF%20-%20Electronics%20Assembly/SF%20-%20Electronics%20Assembly%20-%20Screen%20Printers%20-%20Product%20-%20SPV-DC%20Screen%20Printer/SPV-DC%20Screen%20Printer.png?width=584&height=390&name=SPV-DC%20Screen%20Printer.png",
    ]),
    ("panasonic", "npm-gh", "panasonic-npm-gh", [
        P + "PCONA%20-%20United%20States/SF%20-%20Smart%20Factory/SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20NPM-GH%20Autonomous%20Labor%20Saving%20Machine/PA_Surface-Mount-SMT-NPM-GH.jpg",
    ]),
    ("panasonic", "npm-gw", "panasonic-npm-gw", [
        P + "PCONA%20-%20United%20States/SF%20-%20Smart%20Factory/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-GW/SF_Surface-Mount-SMT-NPM-GH_1440x1440.jpg",
    ]),
    ("panasonic", "npm-w2", "panasonic-npm-w2", [
        H + "PCONA%20-%20Panasonic%20Connect/SF%20-%20Smart%20Factory/SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-W2%20Versatile%20Platform/NPM-W2%20Versatile%20Platform.png?width=1400&name=NPM-W2%20Versatile%20Platform.png",
        H + "PCONA%20-%20Panasonic%20Connect/SF%20-%20Smart%20Factory/SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-W2%20Versatile%20Platform/NPM-W2%20Versatile%20Platform.png?width=584&height=390&name=NPM-W2%20Versatile%20Platform.png",
    ]),
    ("panasonic", "npm-d3a", "panasonic-npm-d3a", [
        H + "PCONA%20-%20Panasonic%20Connect/PCONA%20-%20SF%20-%20Electronics%20Assembly/PCONA%20-%20SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-D3A%20High%20Volume%20Placer/NPM-D3A.png?width=1400&name=NPM-D3A.png",
        H + "PCONA%20-%20Panasonic%20Connect/PCONA%20-%20SF%20-%20Electronics%20Assembly/PCONA%20-%20SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-D3A%20High%20Volume%20Placer/NPM-D3A.png?width=584&height=390&name=NPM-D3A.png",
    ]),
    ("panasonic", "npm-tt2", "panasonic-npm-tt2", [
        H + "PCONA%20-%20Panasonic%20Connect/SF%20-%20Smart%20Factory/SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-TT2%20Twin%20Tray%20Assembly%20Platform/NPM-TT2%20Twin%20Tray%20Assembly%20Platform.png?width=1400&name=NPM-TT2%20Twin%20Tray%20Assembly%20Platform.png",
        H + "PCONA%20-%20Panasonic%20Connect/SF%20-%20Smart%20Factory/SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20NPM-TT2%20Twin%20Tray%20Assembly%20Platform/NPM-TT2%20Twin%20Tray%20Assembly%20Platform.png?width=584&height=390&name=NPM-TT2%20Twin%20Tray%20Assembly%20Platform.png",
    ]),
    ("panasonic", "am100", "panasonic-am100", [
        P + "PCONA%20-%20United%20States/SF%20-%20Smart%20Factory/PCONA%20-%20SF%20-%20Electronics%20Assembly/PCONA%20-%20SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20AM100%20Single-beam,%20Single-head%20Placement/AM100%20Single-beam%2c%20Single-head%20Placement.png",
        H + "PCONA%20-%20Panasonic%20Connect/PCONA%20-%20SF%20-%20Electronics%20Assembly/PCONA%20-%20SF%20-%20Electronics%20Assembly%20-%20SMT/SF%20-%20Electronics%20Assembly%20-%20SMT%20-%20Product%20-%20AM100%20Single-beam,%20Single-head%20Placement/AM100%20Single-beam%2c%20Single-head%20Placement.png?width=584&height=390&name=AM100%20Single-beam%2c%20Single-head%20Placement.png",
    ]),
    ("kic", "sps-smart-profiler", "kic-sps-smart-profiler", [
        "https://kicthermal.com/wp-content/uploads/2023/04/sps-smart-profiler@2x.png",
    ]),
    ("kic", "profiler-x5", "kic-profiler-x5", [
        "https://kicthermal.com/wp-content/uploads/2023/04/x5-profiler@2x.png",
    ]),
]

UA = {"User-Agent": "Mozilla/5.0 (compatible; tamura-site-image-fetch)"}


def download(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return Image.open(io.BytesIO(r.read()))


def on_white(im):
    im = im.convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im)
    return bg.convert("RGB")


def trim(im, pad=0.04):
    # crop to the machine (anything not near-white), keep a little margin
    grey = im.convert("L").point(lambda p: 255 if p < 245 else 0)
    box = grey.getbbox()
    if not box:
        return im
    w, h = im.size
    px, py = int(w * pad), int(h * pad)
    return im.crop((max(0, box[0] - px), max(0, box[1] - py), min(w, box[2] + px), min(h, box[3] + py)))


root = Path(__file__).resolve().parent.parent / "public" / "images"
failed = []
for brand, slug, cid, urls in IMAGES:
    im = None
    for url in urls:
        try:
            im = download(url)
            print(f"ok   {slug}: {im.size} from {url[:90]}")
            break
        except Exception as e:  # try the next URL
            print(f"miss {slug}: {e}")
    if im is None:
        failed.append(slug)
        continue
    photo = trim(on_white(im))
    big = photo.copy()
    big.thumbnail((1400, 1400))
    out = root / "products" / brand / f"{slug}.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)
    big.save(out, "JPEG", quality=86, optimize=True, progressive=True)
    # card thumbnail: 640 x 428 white canvas, machine centred
    thumb = Image.new("RGB", (640, 428), (255, 255, 255))
    t = photo.copy()
    t.thumbnail((600, 390))
    thumb.paste(t, ((640 - t.width) // 2, (428 - t.height) // 2))
    thumb.save(root / "catalog" / f"{cid}.webp", "WEBP", quality=84)

print("failed:", failed or "none")
sys.exit(1 if len(failed) == len(IMAGES) else 0)
