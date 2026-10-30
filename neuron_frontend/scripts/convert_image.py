import sys
from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def convert(src, dst):
    img = Image.open(src).convert('RGBA')
    w, h = img.size
    arr = np.array(img)
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
    
    threshold = 245
    while queue:
        x, y = queue.popleft()
        if visited[y, x]:
            continue
        visited[y, x] = True
        r, g, b = arr[y, x, :3]
        if int(r) >= threshold and int(g) >= threshold and int(b) >= threshold:
            for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
                if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
                    nr, ng, nb = arr[ny, nx, :3]
                    if int(nr) >= 235 and int(ng) >= 235 and int(nb) >= 235 and abs(int(nr)-int(ng)) < 10 and abs(int(ng)-int(nb)) < 10:
                        queue.append((nx, ny))
                        
    alpha = np.full((h, w), 255, dtype=np.uint8)
    bg_mask = visited & (arr[:, :, 0] >= 235) & (arr[:, :, 1] >= 235) & (arr[:, :, 2] >= 235)
    alpha[bg_mask] = 0
    mask_img = Image.fromarray(alpha)
    smooth_mask = mask_img.filter(ImageFilter.GaussianBlur(radius=0.7))
    arr[:, :, 3] = np.array(smooth_mask)
    res = Image.fromarray(arr)
    res.save(dst, 'PNG')
    print(f"Successfully saved transparent PNG: {dst}")

if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else r'C:\Users\KAUSHIK\.gemini\antigravity-ide\brain\ad200dfb-03dd-424e-898b-d4edecb0a836\insurance_risk_hero_1791529523243.jpg'
    dst = sys.argv[2] if len(sys.argv) > 2 else r'd:\Projects\Neuron Wealth Advisory\neuron_frontend\public\images\insurance-risk.png'
    convert(src, dst)
