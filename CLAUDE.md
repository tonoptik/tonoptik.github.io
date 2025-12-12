# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is the website project for **TONOPTIK**, an art studio specializing in new media, audiovisual, light, and sound art with an emphasis on minimalist aesthetics and experimentation.

### Current Website Reference

The existing website is hosted on Blogger at http://www.tonoptik.com/ and serves as the reference for content and design direction.

**Site Structure:**
- **installations** - Portfolio of installation artworks (REDUKTOR, ELEMENTARY, INSTINKT 2, etc.)
- **video** - Video art pieces
- **tracks** - Audio/music tracks
- **about** - Studio information and exhibition history

### Design Philosophy

The website reflects TONOPTIK's artistic philosophy with a timeless minimalist approach:
- Ultra-minimalist white aesthetic
- Clean, sparse layouts
- Gray text palette (#999999, #727272, #4c4c4c on white)
- Sans-serif typography
- No decorative elements - focus on the artwork itself

### Studio Information

TONOPTIK is a laureate of the Spanish MADATAC Award, won a special prize from Cyland MediaArt Lab (2020), and received Honorary Mention from Share Prize XV. Recent exhibitions include Athens International Airport (2025), iLightSingapore Festival (2025), and Istanbul International Theater Festival (2024).

## Repository & Hosting

- **Repository:** https://github.com/tonoptik/tonoptik.github.io
- **Live URL:** https://tonoptik.github.io (GitHub Pages)
- **Custom Domain:** tonoptik.com (to be configured later)

## Project Structure

```
website/
├── index.html          # Homepage
├── css/
│   └── style.css       # Main stylesheet
├── images/             # All images/artwork
│   └── works/          # Artwork images
├── pages/
│   ├── installations.html
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

### Common Commands
```bash
git status                    # Check changes
git add .                     # Stage all changes
git commit -m "message"       # Commit
git push                      # Deploy to GitHub Pages
```

## Current State

**Status:** Core content migration complete, website fully deployed
**Last Updated:** 2025-12-13

### Completed:
- GitHub CLI installed and authenticated as `tonoptik`
- Repository created: https://github.com/tonoptik/tonoptik.github.io
- Website structure built (HTML/CSS matching Blogger design)
- Content migrated from Blogger:
  - Logo and about page image
  - All 11 installation artwork images (reduktor, elementary, instinkt, instinkt2, space_invaders, percept, 55845u, leuchtkraft, zikaden, portal, medialab)
  - 10 YouTube video embeds
  - 3 music releases (Practical, Daten, Punkt Vorbote)
  - Full bio and exhibition list
- All commits pushed to GitHub
- GitHub Pages confirmed live at https://tonoptik.github.io

### Live Site:
**URL:** https://tonoptik.github.io

### Pages Status:
| Page | Status | Content |
|------|--------|---------|
| `index.html` | Basic | Needs featured content |
| `pages/installations.html` | Complete | All 11 installations |
| `pages/video.html` | Complete | 10 video embeds |
| `pages/tracks.html` | Complete | 3 releases with netlabel links |
| `pages/about.html` | Complete | Bio + exhibitions |

### Pending Tasks:
1. Add homepage featured content
2. Create individual detail pages for each installation (optional)
3. Configure custom domain (tonoptik.com) when ready
4. Fine-tune CSS to match Blogger styling exactly (if needed)

### Resume Prompt for Next Session:
```
Continue TONOPTIK website. Add featured content to homepage and consider creating individual detail pages for installations.
```
