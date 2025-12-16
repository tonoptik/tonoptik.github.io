# CLAUDE.md

This file provides operational guidance for working with the TONOPTIK website repository.

## Quick Reference

- **Live Site:** https://tonoptik.com
- **Repository:** https://github.com/tonoptik/tonoptik.github.io
- **Technical Details:** See [TECHNICAL.md](TECHNICAL.md) for design specs, architecture, and implementation history
- **Hosting:** GitHub Pages (deploys automatically on push to `main`)

## Project Overview

TONOPTIK is an art studio specializing in new media, audiovisual, light, and sound art. This repository contains the studio's portfolio website featuring:
- **installations** - 11 installation artworks with detail pages
- **video** - Video art pieces with embeds
- **tracks** - Music releases with album covers
- **about** - Studio bio and exhibition history

**Design:** Ultra-minimalist aesthetic (white/black) with automatic dark mode support. See [TECHNICAL.md](TECHNICAL.md#design-philosophy) for design philosophy.

## Development Workflows

### Making Changes

Standard workflow for content/style updates:

```bash
# 1. Edit HTML/CSS files
# 2. Stage and commit
git add .
git commit -m "description"
# 3. Push to deploy
git push
# Changes go live in 1-2 minutes
```

### Adding New Artwork

```bash
# 1. Add image to images/works/
# 2. Update or create HTML page
# 3. Commit and push
```

### Updating Gallery Images

**CRITICAL:** Gallery thumbnails must be exactly **640x360 pixels** (16:9 ratio) for uniform display.

**Standard workflow to avoid broken images:**

1. **Prepare image:**
   - Save original as `*-original.jpg` or `*-original.heic` in `images/works/`

   - Convert HEIC if needed:
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

3. **Then update HTML:**
   - Edit `pages/installations.html` or detail pages
   - Reference: `../images/works/ARTWORK.jpg`
   - Commit and push

**Common mistakes to avoid:**
- ❌ Updating HTML before committing image file
- ❌ Using full-size images (3000+ px) directly in gallery
- ❌ Skipping resize step or using wrong dimensions
- ❌ Using varying dimensions (must be exactly 640x360)

### Common Commands

```bash
git status                    # Check current changes
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push                      # Deploy to GitHub Pages
git log --oneline -10         # View recent commits
```

## Current State

**Status:** Website fully operational and live
**Last Updated:** 2025-12-16

### Recent Work

**2025-12-16:**
- Gallery image standardization (all thumbnails now 640x360px)
- REDUKTOR page updates (new photo, reorganized layout, updated video)
- Dark mode implementation (automatic system preference detection)

### Key Features in Production

✅ Custom domain with HTTPS (expires March 13, 2026)
✅ 11 installation artworks with detail pages
✅ Automatic dark mode (pure CSS)
✅ Video and music galleries
✅ All content migrated from Blogger

See [TECHNICAL.md](TECHNICAL.md#content-migration-history) for complete implementation history.

## Repository Information

### Hosting & DNS
- **GitHub Pages:** Deploys from `main` branch automatically
- **Custom Domain:** tonoptik.com (configured via GoDaddy DNS)
- **HTTPS:** Enforced, certificate auto-renewed by GitHub

See [TECHNICAL.md](TECHNICAL.md#hosting--infrastructure) for DNS configuration details.

### File Organization

```
website/
├── index.html              # Homepage
├── css/style.css           # All styles + dark mode
├── images/
│   ├── works/              # Gallery thumbnails (640x360) + originals
│   └── *.jpg/png           # Logo, featured, about images
├── pages/
│   ├── installations.html  # Gallery
│   ├── installations/      # 11 detail pages
│   ├── video.html
│   ├── tracks.html
│   └── about.html
├── CNAME                   # Domain config
├── CLAUDE.md               # This file - operations
└── TECHNICAL.md            # Technical details & specs
```

## Important Guidelines

### Commit Messages
- ❌ Do not include references to Claude Code, Claude, or Sonnet
- ✅ Use clear, descriptive messages focused on changes

### Image Standards
- Gallery thumbnails: Exactly 640x360 pixels (16:9)
- Original images: Archive as `*-original.jpg` in `images/works/`
- See [TECHNICAL.md](TECHNICAL.md#image-standards) for detailed specifications

### Design Consistency
- Maintain ultra-minimalist aesthetic
- Gray text palette: #999999, #727272, #4c4c4c
- Dark mode: automatic (no manual controls)
- See [TECHNICAL.md](TECHNICAL.md#design-philosophy) for full design guidelines

## Resume Prompt for Next Session

```
TONOPTIK website live at https://tonoptik.com. GitHub Pages hosting with custom domain and HTTPS. All Blogger content migrated. Site features 11 installations, videos, tracks, and about pages. Dark mode automatically follows system preference (pure CSS). Gallery images standardized to 640x360px. HTTPS cert expires March 13, 2026.

Recent updates (2025-12-16): Gallery standardization complete, REDUKTOR page updated, dark mode implemented.

Docs: CLAUDE.md (operations), TECHNICAL.md (specs/history).
```
