"""Annotate MFA screenshots with highlights and arrows."""
from PIL import Image, ImageDraw, ImageFont
import math

def draw_arrow(draw, start, end, color, width=3):
    """Draw an arrow from start to end."""
    draw.line([start, end], fill=color, width=width)
    angle = math.atan2(end[1] - start[1], end[0] - start[0])
    arrow_len = 15
    arrow_angle = math.pi / 6
    x1 = end[0] - arrow_len * math.cos(angle - arrow_angle)
    y1 = end[1] - arrow_len * math.sin(angle - arrow_angle)
    x2 = end[0] - arrow_len * math.cos(angle + arrow_angle)
    y2 = end[1] - arrow_len * math.sin(angle + arrow_angle)
    draw.polygon([end, (x1, y1), (x2, y2)], fill=color)

try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
except:
    font = ImageFont.load_default()

highlight_color = (220, 50, 50)  # Red

# --- Image 1: mfa-completed.png (TACC Accounts page with MFA selected) ---
img1 = Image.open("images/mfa-completed.png")
draw1 = ImageDraw.Draw(img1)

# "Multi-factor Auth" in the sidebar is at roughly y=310-340, x=10-160
draw1.rectangle([8, 305, 168, 340], outline=highlight_color, width=3)

# Arrow pointing to it from above-left
draw_arrow(draw1, (55, 270), (55, 305), highlight_color, width=3)
draw1.text((20, 252), "Click here", fill=highlight_color, font=font)

img1.save("images/mfa-ss.png")
print("Annotated mfa-completed.png -> saved as mfa-ss.png")

# --- Image 2: User Portal manage account page ---
img2 = Image.open("images/user-portal-manage-account.png")
draw2 = ImageDraw.Draw(img2)

# Highlight "Manage Account" in the left sidebar
draw2.rectangle([8, 262, 148, 295], outline=highlight_color, width=3)
draw2.text((5, 298), "Step 1: Click here", fill=highlight_color, font=font)

# Highlight "Manage Multi-factor Authentication" button
draw2.rectangle([618, 265, 835, 298], outline=highlight_color, width=3)
draw2.text((620, 300), "Step 2: Then click here", fill=highlight_color, font=font)

# Arrow from sidebar to the button
draw_arrow(draw2, (300, 310), (618, 282), highlight_color, width=3)

img2.save("images/user-portal-manage-account.png")
print("Annotated user-portal-manage-account.png")
