# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is the website project for **TONOPTIK**, an art studio specializing in new media, audiovisual, light, and sound art with an emphasis on minimalist aesthetics and experimentation.

### Website Overview

The TONOPTIK website is now live at https://tonoptik.com, migrated from the original Blogger site. The new site maintains the original content and design direction while using GitHub Pages for hosting.

**Site Structure:**
- **installations** - Portfolio of installation artworks (REDUKTOR, ELEMENTARY, INSTINKT 2, etc.)
- **video** - Video art pieces
- **tracks** - Audio/music tracks
- **about** - Studio information and exhibition history

### Design Philosophy

The website reflects TONOPTIK's artistic philosophy with a timeless minimalist approach:
- Ultra-minimalist white aesthetic with automatic dark mode support
- Clean, sparse layouts
- Gray text palette (#999999, #727272, #4c4c4c on white)
- Sans-serif typography
- No decorative elements - focus on the artwork itself

**Dark Mode Features:**
- Automatically follows system preference via CSS `@media (prefers-color-scheme: dark)`
- Pure black background (#000000) with inverted gray text colors
- Logo automatically inverts (CSS filter) for visibility
- All artwork/photography images remain unchanged (no inversion)
- Zero JavaScript implementation - pure CSS solution
- No manual toggle required

### Studio Information

TONOPTIK is a laureate of the Spanish MADATAC Award, won a special prize from Cyland MediaArt Lab (2020), and received Honorary Mention from Share Prize XV. Recent exhibitions include Athens International Airport (2025), iLightSingapore Festival (2025), and Istanbul International Theater Festival (2024).

## Repository & Hosting

- **Repository:** https://github.com/tonoptik/tonoptik.github.io
- **Live URL:** https://tonoptik.com (custom domain) | https://www.tonoptik.com (with redirect)
- **GitHub Pages URL:** https://tonoptik.github.io (redirects to custom domain)

## Project Structure

```
website/
├── index.html          # Homepage with featured image
├── css/
│   └── style.css       # Main stylesheet
├── images/             # All images/artwork
│   ├── featured.jpg    # Homepage featured image
│   └── works/          # Artwork and album cover images
├── pages/
│   ├── installations.html
│   ├── installations/  # Individual installation detail pages
│   │   ├── reduktor.html
│   │   ├── elementary.html
│   │   ├── instinkt2.html
│   │   ├── space-invaders.html
│   │   ├── instinkt.html
│   │   ├── percept.html
│   │   ├── 55845u.html
│   │   ├── leuchtkraft.html
│   │   ├── zikaden.html
│   │   ├── portal.html
│   │   └── medialab.html
│   ├── video.html
│   ├── tracks.html
│   └── about.html
└── CLAUDE.md
```

## Development Workflow

### Making Changes
1. Edit HTML/CSS files directly
2. Commit: `git add . && git commit -m "description"`
3. Push: `git push`
4. Changes go live within minutes

### Adding New Artwork
1. Save image to `images/works/`
2. Create or update relevant HTML page
3. Commit and push

### Updating Gallery Images
**IMPORTANT: Follow this exact workflow to avoid broken images on the live site**

**Gallery Image Standard:** All installation gallery thumbnails must be **640x360 pixels** (16:9 ratio)

1. **Prepare the new image:**
   - Save original as `*-original.jpg` or `*-original.heic` in `images/works/` (for archival)
   - Convert HEIC to JPG if needed:
   ```bash
   python -c "from PIL import Image; from pillow_heif import register_heif_opener; register_heif_opener(); img = Image.open(r'D:\art\tonoptik\website\images\works\ARTWORK-original.heic'); img.convert('RGB').save(r'D:\art\tonoptik\website\images\works\ARTWORK.jpg', 'JPEG', quality=95)"
   ```
   - Crop and resize to 640x360:
   ```bash
   python -c "from PIL import Image; img = Image.open(r'D:\art\tonoptik\website\images\works\ARTWORK-original.jpg'); width, height = img.size; target_ratio = 640/360; crop_height = int(width / target_ratio); top = (height - crop_height) // 2; cropped = img.crop((0, top, width, top + crop_height)); resized = cropped.resize((640, 360), Image.Resampling.LANCZOS); resized.save(r'D:\art\tonoptik\website\images\works\ARTWORK.jpg', 'JPEG', quality=95)"
   ```

2. **Commit image BEFORE updating HTML:**
   ```bash
   git add images/works/ARTWORK.jpg
   git commit -m "Add ARTWORK gallery thumbnail"
   git push
   ```

3. **Then update HTML pages:**
   - Edit `pages/installations.html` or detail pages
   - Reference the thumbnail: `../images/works/ARTWORK.jpg`
   - Commit and push HTML changes

**Common mistakes to avoid:**
- DO NOT update HTML to reference an image before committing the image file
- DO NOT use original full-size images (3000+ px) directly in gallery
- DO NOT skip the resize step - maintain 640x360 standard
- DO NOT use varying heights - all gallery images must be exactly 640x360

### Common Commands
```bash
git status                    # Check changes
git add .                     # Stage all changes
git commit -m "message"       # Commit
git push                      # Deploy to GitHub Pages
```

## Current State

**Status:** Website fully complete with custom domain configured and live
**Last Updated:** 2025-12-16

### Recent Updates:
- **Gallery Image Standardization (2025-12-16):**
  - All 11 installation gallery thumbnails standardized to 640x360 pixels (16:9 ratio)
  - Ensures uniform grid display on installations page
  - Images: reduktor.jpg, elementary.png, instinkt2.jpg, space_invaders.jpg, instinkt.jpg, percept.jpg, 55845u.jpg, leuchtkraft.jpg, zikaden.jpg, portal.png, medialab.jpg

- **REDUKTOR Page Updates (2025-12-16):**
  - New detail photo from IMG_3083.HEIC (converted and cropped from bottom by 15%)
  - Reorganized layout: photo → conception text → video → hardware components
  - Updated YouTube embed to https://www.youtube.com/embed/I1hpcSXRXTk

### Completed:
- GitHub CLI installed and authenticated as `tonoptik`
- Repository created: https://github.com/tonoptik/tonoptik.github.io
- Website structure built (HTML/CSS matching Blogger design)
- Content migrated from Blogger:
  - Logo and about page image
  - Homepage featured image
  - All 11 installation artwork images + 10 additional detail images
  - 3 album cover images (Practical, Daten, Punkt Vorbote)
  - 10 YouTube video embeds on video page
  - 3 music releases with netlabel links
  - Full bio and exhibition list
- Individual detail pages with complete Blogger content:
  - Full descriptions and concept explanations
  - YouTube and Vimeo video embeds
  - Technical specifications and equipment lists
  - Exhibition history and awards
  - Hardware/software details
- All commits pushed to GitHub
- GitHub Pages confirmed live at https://tonoptik.github.io
- Custom domain configured and live:
  - GoDaddy DNS configured with 4 A records pointing to GitHub Pages IPs (185.199.108.153, 109, 110, 111)
  - CNAME record for www subdomain pointing to tonoptik.github.io
  - Old Blogger DNS records removed
  - GitHub Pages custom domain configured via API
  - CNAME file created and pushed to repository
  - HTTPS certificate approved and enforced (expires March 13, 2026)
  - DNS propagation confirmed working
- Dark mode implementation:
  - Automatic system preference detection via CSS media query
  - Pure black (#000000) background with inverted gray text
  - Logo inverts automatically for visibility
  - Artwork images remain unchanged
  - Zero JavaScript - pure CSS solution using `@media (prefers-color-scheme: dark)`

### Live Site:
**Primary URL:** https://tonoptik.com
**WWW URL:** https://www.tonoptik.com (redirects to primary)
**GitHub Pages URL:** https://tonoptik.github.io (redirects to custom domain)

### Pages Status:
| Page | Status | Content |
|------|--------|---------|
| `index.html` | Complete | Featured image from Blogger |
| `pages/installations.html` | Complete | All 11 installations with links to detail pages |
| `pages/installations/*.html` | Complete | 11 individual installation detail pages |
| `pages/video.html` | Complete | 10 video embeds |
| `pages/tracks.html` | Complete | 3 releases with album covers and netlabel links |
| `pages/about.html` | Complete | Bio + exhibitions |

### Installation Detail Pages:
1. REDUKTOR - `pages/installations/reduktor.html`
2. ELEMENTARY - `pages/installations/elementary.html`
3. INSTINKT 2 - `pages/installations/instinkt2.html`
4. Space invaders from Antarctica - `pages/installations/space-invaders.html`
5. INSTINKT - `pages/installations/instinkt.html`
6. PERCEPT - `pages/installations/percept.html`
7. 55.845u - `pages/installations/55845u.html`
8. LEUCHTKRAFT - `pages/installations/leuchtkraft.html`
9. ZIKADEN - `pages/installations/zikaden.html`
10. PORTAL - `pages/installations/portal.html`
11. MEDIALAB - `pages/installations/medialab.html`

### Optional Future Enhancements:
1. Add more interactive features or animations (if desired)
2. SEO optimization and meta tags
3. Performance optimization (image compression, lazy loading, etc.)
4. Monitor HTTPS certificate renewal (currently expires March 13, 2026)

### Resume Prompt for Next Session:
```
TONOPTIK website is fully complete and live at https://tonoptik.com with custom domain configured. All Blogger content has been migrated including installations, videos, tracks, and about pages. The site uses GitHub Pages hosting with HTTPS enforced. DNS is configured via GoDaddy with proper A records and CNAME for www subdomain. Dark mode automatically follows system preference using pure CSS (no JavaScript). HTTPS certificate expires March 13, 2026.

Recent work (2025-12-16): All 11 installation gallery thumbnails standardized to 640x360 pixels (16:9 ratio) for uniform display. REDUKTOR page updated with new detail photo, reorganized layout, and new YouTube video embed.
```

### Important Notes:
- Do not include info about Claude Code, Claude, or Sonnet in commit notes
- All gallery images must be exactly 640x360 pixels