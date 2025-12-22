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
├── index.html          # Homepage with WebGL hero animation
├── css/
│   └── style.css       # Main stylesheet with dark mode + WebGL canvas styles
├── js/                 # WebGL animation code
│   ├── noise-functions.js      # 3D Simplex noise GLSL functions
│   ├── spring-deform-shader.js # Vertex/fragment shaders for deformation
│   └── hero-wireframe.js       # Main animation controller with spring physics
├── images/             # All images/artwork
│   ├── favicon.ico     # Browser tab icon (16x16, 32x32, 48x48 multi-resolution)
│   ├── logo.png        # TONOPTIK logo
│   ├── about.jpg       # About page image
│   ├── featured.jpg    # Homepage featured image (fallback if WebGL unsupported)
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

**2025-12-22 - Favicon Addition:**
- Added favicon.ico to images/ directory (multi-resolution: 16x16, 32x32, 48x48)
- Implemented favicon link tags across all 16 HTML pages
- Uses relative paths appropriate for directory level (root vs pages/ vs pages/installations/)
- Browser tabs now display TONOPTIK icon

**2025-12-17 - WebGL Simplified to Static Random:**
- Removed spring physics - deformation is now static (frozen)
- Random peak generation on page load: 8 peaks with random positions/directions/strengths
- Each page refresh = unique 3D abstract form
- Reduced geometry: 100x100 → 50x50 segments (10x fewer vertices, cleaner wireframe)
- Only rotation animates: 3-axis tumbling with slowly changing direction
- Performance: no physics calculations, reduced memory footprint
- Spacing: reduced padding (main: 30px→10px, featured: 20px→0px) to move canvas 40px closer to menu

**2025-12-16 - WebGL Hero Animation:**
- Initial Three.js wireframe implementation on homepage
- Custom GLSL shaders with Perlin noise deformation
- Lazy loading (200ms delay), progressive enhancement, accessibility support
- Files: `js/noise-functions.js`, `js/spring-deform-shader.js`, `js/hero-wireframe.js`
- Canvas element in `index.html`, CSS styles in `css/style.css`

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
- WebGL canvas inversion in dark mode
- Maintains minimalist aesthetic

## WebGL Hero Animation

### Overview

Homepage features a static random 3D wireframe sculpture that rotates in space. Each page load generates a unique abstract form. Only rotation animates - the deformation is frozen, creating clean, predictable performance.

### Technical Specifications

**Rendering:**
- **Library:** Three.js r160 (loaded from CDN)
- **Geometry:** PlaneGeometry 1.5x1.5, 50x50 segments (~2,500 vertices)
- **Material:** ShaderMaterial in wireframe mode
- **Canvas Size:** 800x450px (scales responsively, maintains aspect ratio)
- **Target Performance:** 60fps, GPU-accelerated via WebGL

**Deformation System (Static):**
- **Random Generation:** 8 displacement peaks with random positions, directions, and strengths
- **Peak Positions:** Within 0.2 radius from center
- **Strengths:** 15-35 (30% chance of negative/push)
- **Noise:** 3-octave Perlin noise with static seed offsets
- **Twist:** Static spiral deformation
- **Form:** Unique on every page refresh, frozen during session

**Rotation Animation:**
- **Y-axis:** Main rotation with slowly changing direction
- **X-axis:** Tilting motion (independent direction change)
- **Z-axis:** Subtle roll for organic tumbling
- **Speed:** Varies smoothly using sine/cosine modulation
- **Direction:** Reverses slowly over time for natural movement

**Loading Strategy:**
- **Lazy Loading:** Scripts load after `window.onload` + 200ms delay
- **Progressive Enhancement:** Falls back to static featured image if WebGL unsupported
- **Accessibility:** Respects `prefers-reduced-motion` media query (shows static fallback only)

**Dark Mode:**
- **Implementation:** CSS filter `invert(1)` on canvas element
- **Trigger:** Automatic via `@media (prefers-color-scheme: dark)`
- **Consistency:** Matches site-wide dark mode implementation

**File Structure:**
- `js/noise-functions.js` (~2.7KB) - 3D Simplex noise GLSL implementation
- `js/spring-deform-shader.js` (~3.2KB) - Custom vertex/fragment shaders
- `js/hero-wireframe.js` (~7.4KB) - Random generation and rotation controller
- Total custom code: ~13KB uncompressed
- Three.js library: ~170KB gzipped from CDN

**Browser Support:**
- Requires WebGL support (all modern browsers)
- Gracefully degrades to static image on older browsers
- No JavaScript execution if motion preferences disabled

### Performance Characteristics

- Initial load: Three.js fetched asynchronously, does not block page render
- Memory: ~3-5MB (10x less vertices than original 100x100 grid)
- CPU: Minimal (rotation only, no physics calculations)
- GPU: Static vertex shader deformation, efficient wireframe rendering
- Network: Three.js cached by CDN, custom scripts cached by browser

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties for theming, flexbox layouts, animations
- **JavaScript (Three.js)** - WebGL animation on homepage only
- **Progressive Enhancement** - Site fully functional without JavaScript

### Build/Deploy
- **Git** - Version control
- **GitHub Pages** - Static site hosting
- **GitHub CLI** - Repository management

### Development Tools
- **Python + PIL** - Image processing (HEIC conversion, resizing, cropping)
- **Git** - All deployments via git push

## Future Considerations

### Potential Enhancements
1. SEO optimization and enhanced meta tags
2. Performance optimization:
   - Image lazy loading for gallery pages
   - Further image compression
3. Accessibility improvements (ARIA labels, keyboard navigation)
4. Analytics integration (if desired)
5. WebGL animation enhancements:
   - Additional animation modes or variations
   - User interaction (mouse/touch input)
   - Mobile-optimized version with reduced geometry

### Monitoring
- HTTPS certificate renewal (expires March 13, 2026)
- DNS configuration maintenance
- GitHub Pages service status
