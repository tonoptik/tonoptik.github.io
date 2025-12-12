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

**Status:** Initial setup complete, building website
**Next:** Create HTML/CSS, migrate content from Blogger
