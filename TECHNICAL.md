# TONOPTIK Website - Technical Documentation

Technical specifications, design details, and implementation history for the TONOPTIK website.

## Design Philosophy

The website reflects TONOPTIK's artistic philosophy with a timeless minimalist approach:
- Ultra-minimalist white aesthetic with automatic dark mode support
- Clean, sparse layouts
- Gray text palette (#999999, #727272, #4c4c4c on white)
- Sans-serif typography
- No decorative elements - focus on the artwork itself

### Dark Mode Implementation

**Approach:** Automatic system preference detection - no manual toggle

**Technical Details:**
- CSS media query: `@media (prefers-color-scheme: dark)`
- Background: Pure black (#000000)
- Text colors: Inverted grays
  - Primary: #b3b3b3 (inverted from #4c4c4c)
  - Secondary: #8d8d8d (inverted from #727272)
  - Tertiary: #666666 (inverted from #999999)
- Logo: Automatic inversion using `filter: invert(1)`
- Artwork/photos: No inversion - remain unchanged
- Implementation: Zero JavaScript - pure CSS solution
- Border colors: Adapt to black in dark mode

## Project Structure

```
website/
├── index.html          # Homepage with featured image
├── css/
│   └── style.css       # Main stylesheet with dark mode support
├── images/             # All images/artwork
│   ├── logo.png        # TONOPTIK logo
│   ├── about.jpg       # About page image
│   ├── featured.jpg    # Homepage featured image
│   └── works/          # Artwork and album cover images
│       ├── *-original.jpg  # Original high-res images (archival)
│       └── *.jpg/png   # Gallery thumbnails (640x360px)
├── pages/
│   ├── installations.html      # Gallery of all installations
│   ├── installations/          # Individual detail pages
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
│   ├── video.html              # Video works gallery
│   ├── tracks.html             # Music releases
│   └── about.html              # Bio and exhibitions
├── CNAME                       # Custom domain configuration
├── CLAUDE.md                   # Operational documentation
└── TECHNICAL.md                # This file - technical details
```

## Pages Overview

### Main Navigation Pages

| Page | Status | Content |
|------|--------|---------|
| `index.html` | Complete | Homepage with featured artwork |
| `pages/installations.html` | Complete | Gallery of 11 installations with 640x360px thumbnails |
| `pages/video.html` | Complete | 10 video works with YouTube embeds |
| `pages/tracks.html` | Complete | 3 music releases with album covers and netlabel links |
| `pages/about.html` | Complete | Studio bio and exhibition history |

### Installation Detail Pages

Each installation has a dedicated page with full descriptions, technical specs, videos, and exhibition history:

1. **REDUKTOR** - `pages/installations/reduktor.html`
   - Minimalist kinetic light installation
   - Updated 2025-12-16 with new detail photo and video

2. **ELEMENTARY** - `pages/installations/elementary.html`
   - Light and sound installation

3. **INSTINKT 2** - `pages/installations/instinkt2.html`
   - Second iteration of INSTINKT series

4. **Space invaders from Antarctica** - `pages/installations/space-invaders.html`
   - Interactive audiovisual installation

5. **INSTINKT** - `pages/installations/instinkt.html`
   - Original INSTINKT installation

6. **PERCEPT** - `pages/installations/percept.html`
   - Perceptual audiovisual work

7. **55.845u** - `pages/installations/55845u.html`
   - Iron-themed installation

8. **LEUCHTKRAFT** - `pages/installations/leuchtkraft.html`
   - Light-focused installation

9. **ZIKADEN** - `pages/installations/zikaden.html`
   - Sound and light work

10. **PORTAL** - `pages/installations/portal.html`
    - Immersive portal installation

11. **MEDIALAB** - `pages/installations/medialab.html`
    - Media lab project

## Image Standards

### Gallery Thumbnails
- **Dimensions:** Exactly 640x360 pixels (16:9 aspect ratio)
- **Format:** JPG (quality 95) or PNG
- **Location:** `images/works/`
- **Naming:** Lowercase with hyphens (e.g., `space-invaders.jpg`)

### Original Images
- **Storage:** `images/works/*-original.jpg` or `.heic`
- **Purpose:** Archival, source for thumbnail generation
- **Not used directly on website**

## Hosting & Infrastructure

### GitHub Pages
- **Repository:** https://github.com/tonoptik/tonoptik.github.io
- **Branch:** `main`
- **Build:** Automatic on push
- **Deployment:** 1-2 minutes after push

### Custom Domain Configuration
- **Primary URL:** https://tonoptik.com
- **WWW URL:** https://www.tonoptik.com (redirects to primary)
- **DNS Provider:** GoDaddy
- **DNS Records:**
  - 4 A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  - CNAME for www: tonoptik.github.io
- **HTTPS:** Enforced, certificate expires March 13, 2026

## Content Migration History

### From Blogger (Completed 2025-12-14)
- Logo and branding images
- Homepage featured image
- All 11 installation gallery thumbnails
- 10 additional installation detail photos
- 3 album cover images (Practical, Daten, Punkt Vorbote)
- 10 YouTube video embeds
- 3 music releases with netlabel links
- Full studio bio and exhibition list
- Individual installation pages with:
  - Full concept descriptions
  - Technical specifications
  - Equipment lists
  - Exhibition history
  - YouTube/Vimeo embeds

### Recent Updates

**2025-12-16 - Gallery Standardization:**
- Standardized all 11 installation thumbnails to 640x360px (16:9)
- Ensures uniform grid display on installations page
- Images: reduktor.jpg, elementary.png, instinkt2.jpg, space_invaders.jpg, instinkt.jpg, percept.jpg, 55845u.jpg, leuchtkraft.jpg, zikaden.jpg, portal.png, medialab.jpg

**2025-12-16 - REDUKTOR Updates:**
- Added new detail photo from IMG_3083.HEIC (converted, cropped)
- Reorganized page layout: photo → concept → video → hardware
- Updated YouTube embed to current video

**2025-12-16 - Dark Mode:**
- Pure CSS implementation with system preference detection
- Logo inversion for visibility
- No JavaScript required
- Maintains minimalist aesthetic

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties for theming, flexbox layouts
- **No JavaScript** - Pure HTML/CSS site

### Build/Deploy
- **Git** - Version control
- **GitHub Pages** - Static site hosting
- **GitHub CLI** - Repository management

### Development Tools
- **Python + PIL** - Image processing (HEIC conversion, resizing, cropping)
- **Git** - All deployments via git push

## Future Considerations

### Potential Enhancements
1. Interactive features or animations (if desired)
2. SEO optimization and enhanced meta tags
3. Performance optimization:
   - Image lazy loading
   - Further compression
   - CDN integration
4. Accessibility improvements (ARIA labels, keyboard navigation)
5. Analytics integration (if desired)

### Monitoring
- HTTPS certificate renewal (expires March 13, 2026)
- DNS configuration maintenance
- GitHub Pages service status
