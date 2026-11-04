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
    ("hayawin", "hy-agv250", "hayawin-hy-agv250", ["https://image.chukouplus.com/upload/C_329/file/20221022/6fb42edba08e40b915cb5144c53ab742.png"]),
    ("hayawin", "hy-sc460", "hayawin-hy-sc460", ["https://image.chukouplus.com/upload/C_329/file/20220923/f5b59a523ac3965197e23a7416ffef0b.png"]),
    ("hayawin", "hy-x3", "hayawin-hy-x3", ["https://image.chukouplus.com/upload/C_329/file/20220923/36fb0d2dd16ca25356ed9e5dfae1cdd1.png"]),
    ("hayawin", "hy-330cm", "hayawin-hy-330cm", ["https://image.chukouplus.com/themes/simplebootx/Upload/W_537/upload/5f4471df59ecb.jpg"]),
    ("hayawin", "hy-1-2tcvy", "hayawin-hy-1-2tcvy", ["https://image.chukouplus.com/themes/simplebootx/Upload/W_537/upload/5f3f2eab9567d.jpg"]),
    ("hayawin", "hy-460bf", "hayawin-hy-460bf", ["https://image.chukouplus.com/themes/simplebootx/Upload/W_537/upload/5f3f2eab953a0.jpg"]),
    ("hayawin", "hy-250uld", "hayawin-hy-250uld", ["https://image.chukouplus.com/themes/simplebootx/Upload/W_537/upload/5f3f2eab9508c.jpg"]),
    ("hayawin", "hy-250ld", "hayawin-hy-250ld", ["https://image.chukouplus.com/themes/simplebootx/Upload/W_537/upload/5f3f2eab94cd3.jpg"]),
    ("hayawin", "ys-ld", "hayawin-ys-ld", ["https://image.chukouplus.com/upload/C_329/file/20220921/7a5177235334dcd9b55282e5b3bb0452.png"]),
    ("hayawin", "ys-uld", "hayawin-ys-uld", ["https://image.chukouplus.com/upload/C_329/file/20220922/af1c76e4c1986f73bb1741e32144f1f6.png"]),
    ("hayawin", "ys-ngok-uld", "hayawin-ys-ngok-uld", ["https://image.chukouplus.com/upload/C_329/file/20220922/679f76c38607f90485a5f5e3c3e81da9.png"]),
    ("hayawin", "ys-uld-s", "hayawin-ys-uld-s", ["https://image.chukouplus.com/upload/C_329/file/20220922/17c4c95e455b80b98271ae82c6ccd643.png"]),
    ("hayawin", "ys-ldz250", "hayawin-ys-ldz250", ["https://image.chukouplus.com/upload/C_329/file/20220923/8043bb00629f99093167319b3bbccb3a.png"]),
    ("hayawin", "ys-vld460", "hayawin-ys-vld460", ["https://image.chukouplus.com/upload/C_329/file/20220921/cc641090414f59046c5ab80db4f673a4.png"]),
    ("hayawin", "ys-bbd460c", "hayawin-ys-bbd460c", ["https://image.chukouplus.com/upload/C_329/file/20220921/93d7aa86901d1f24b9b42097112a1bde.png"]),
    ("hayawin", "ys-bbu460c", "hayawin-ys-bbu460c", ["https://image.chukouplus.com/upload/C_329/file/20220922/55c04c6bd52945345fff9512bedf10c8.png"]),
    ("hayawin", "ys-e950", "hayawin-ys-e950", ["https://image.chukouplus.com/upload/C_329/file/20220922/3af3fc09fe0e49f2b10310cc6023e021.png"]),
    ("hayawin", "ys-lcv460", "hayawin-ys-lcv460", ["https://image.chukouplus.com/upload/C_329/file/20220922/7ecc3a71e920d49d9000f60877dafafe.png"]),
    ("hayawin", "ys-cd460", "hayawin-ys-cd460", ["https://image.chukouplus.com/upload/C_329/file/20220922/ca91bf426ef900d0b28137a6c2fb48ea.png"]),
    ("hayawin", "ys-tu460", "hayawin-ys-tu460", ["https://image.chukouplus.com/upload/C_329/file/20220922/7f6964be7532d521a601c02ccf65797e.png"]),
    ("hayawin", "ys-15dscvd", "hayawin-ys-15dscvd", ["https://image.chukouplus.com/upload/C_329/file/20220922/288df74da8d03cad5f453c4ef3b71abb.png"]),
    ("hayawin", "ys-cv460", "hayawin-ys-cv460", ["https://image.chukouplus.com/upload/C_329/file/20220912/e34f3ec117751a14a2092d1485804ec7.png"]),
    ("hayawin", "ys-tcv460", "hayawin-ys-tcv460", ["https://image.chukouplus.com/upload/C_329/file/20220913/46ab401a9347143659f3a705a87aeebf.png"]),
    ("hayawin", "ys-rcv460", "hayawin-ys-rcv460", ["https://image.chukouplus.com/upload/C_329/file/20220913/1dd66578d62bfee0dfd2241acb82f3c1.png"]),
    ("hayawin", "ys-bf250b", "hayawin-ys-bf250b", ["https://image.chukouplus.com/upload/C_329/file/20220922/0f3d80c3c4e63ac6addb1ac7ddf6de56.png"]),
    ("hayawin", "ys-bf460a", "hayawin-ys-bf460a", ["https://image.chukouplus.com/upload/C_329/file/20220922/c6ea1e764caca35b53b35f3032fd442e.png"]),
    ("hayawin", "ys-bf460", "hayawin-ys-bf460", ["https://image.chukouplus.com/upload/C_329/file/20220922/cbe69240b1d01cff5e74b817175a7c08.png"]),
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

# Hayawin logo for the manufacturer grids
try:
    logo = download("https://image.chukouplus.com/upload/C_329/file/20220907/617b17e53309420a1328ee4ebf4d77c9.png").convert("RGBA")
    box = logo.getbbox()
    if box:
        logo = logo.crop(box)
    logo.thumbnail((480, 160))
    logo.save(root / "brands" / "hayawin.png", optimize=True)
    print("ok   logo", logo.size)
except Exception as e:
    print("miss logo:", e)
    failed.append("logo")

print("failed:", failed or "none")
sys.exit(1 if len(failed) == len(IMAGES) else 0)
