"""Generates the app icons (PNG) without external libraries.
Usage: python3 tools/make_icons.py
"""
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(__file__), "..", "icons")

# Lightning bolt polygon in 0..1 coordinates
BOLT = [(0.58, 0.10), (0.26, 0.56), (0.47, 0.56), (0.40, 0.90), (0.74, 0.42), (0.53, 0.42), (0.62, 0.10)]


def inside(px, py, poly):
    c = False
    j = len(poly) - 1
    for i in range(len(poly)):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if (yi > py) != (yj > py) and px < (xj - xi) * (py - yi) / (yj - yi) + xi:
            c = not c
        j = i
    return c


def lerp(a, b, t):
    return tuple(int(a[k] + (b[k] - a[k]) * t) for k in range(3))


def render(size, pad=0.0):
    top, bot = (42, 71, 94), (23, 26, 33)
    bolt_hi, bolt_lo = (102, 192, 244), (26, 159, 255)
    ss = 3  # Supersampling
    scale = 1 - 2 * pad
    rows = []
    for y in range(size):
        row = bytearray([0])
        for x in range(size):
            bg = lerp(top, bot, y / size)
            hits = 0
            for sy in range(ss):
                for sx in range(ss):
                    u = ((x + (sx + 0.5) / ss) / size - pad) / scale
                    v = ((y + (sy + 0.5) / ss) / size - pad) / scale
                    if inside(u, v, BOLT):
                        hits += 1
            a = hits / (ss * ss)
            bc = lerp(bolt_hi, bolt_lo, y / size)
            # blend bolt colour over background
            col = lerp(bg, bc, a)
            row += bytes(col)
        rows.append(bytes(row))
    raw = b"".join(rows)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, size, pad in [
        ("apple-touch-icon.png", 180, 0.06),
        ("icon-192.png", 192, 0.06),
        ("icon-512.png", 512, 0.06),
        ("icon-maskable-512.png", 512, 0.16),
    ]:
        with open(os.path.join(OUT, name), "wb") as f:
            f.write(render(size, pad))
        print("wrote", name)
