---
name: add-av-video
description: Add a YouTube video to the TONOPTIK av / live page (pages/av-live.html) and ship it end-to-end — commit, push, open a PR, and merge it automatically. Use whenever the user gives a YouTube link (youtu.be/... or youtube.com/watch?v=...) and asks to add it to the av/live page, or says "add this video". Handles fetching the real video title, inserting the embed, and the full git → PR → merge flow.
---

# Add AV / Live video

Adds a video to `pages/av-live.html` and ships it live without asking for confirmation at each step.

## Inputs

- **YouTube URL** (required) — `https://youtu.be/<ID>` or `https://www.youtube.com/watch?v=<ID>`. Extract the 11-char `<ID>`.
- **Title** (optional) — if the user gives one, use it. Otherwise fetch it (see below).
- **Position** (optional) — default is the **top** of the list, right after `<h1>av / live</h1>`. Only put it elsewhere if the user asks.

## Steps

1. **Get the video title.** If the user didn't give one, fetch it via the oEmbed endpoint (avoids YouTube's bot page / redirects):
   - WebFetch `https://www.youtube.com/oembed?url=https://youtu.be/<ID>&format=json` and read the `title` field.

2. **Prepare the branch.** Work on `claude/tonoptik-av-live-video-ytrhpd`. If its previous PR was already merged, restart from `main`:
   ```
   git fetch origin main -q
   git checkout -B claude/tonoptik-av-live-video-ytrhpd origin/main
   ```

3. **Insert the embed** into `pages/av-live.html`. Match the exact existing markup — one `embed-container` div with the iframe, followed by a `video-title` paragraph:
   ```html
   <div class="embed-container">
       <iframe width="560" height="315" src="https://www.youtube.com/embed/<ID>" frameborder="0" allowfullscreen></iframe>
   </div>
   <p class="video-title"><TITLE></p>
   ```
   For "top" placement, insert this block immediately after `<h1>av / live</h1>` and before the first existing `embed-container`.

4. **Commit and push:**
   ```
   git add pages/av-live.html
   git commit -m "Add <short description> video to av/live page"
   git push -u origin claude/tonoptik-av-live-video-ytrhpd
   ```

5. **Open a PR** into `main` (`mcp__github__create_pull_request`, owner `tonoptik`, repo `tonoptik.github.io`).

6. **Merge it automatically** with squash (`mcp__github__merge_pull_request`, `merge_method: "squash"`). Do this without waiting for extra confirmation — the whole point of this skill is edit → commit → push → PR → merge in one go.

7. Tell the user it's merged. GitHub Pages redeploys from `main` in 1–2 minutes; the video appears at https://tonoptik.com/pages/av-live.html.

## Notes

- Commit messages must not mention Claude/Anthropic (per repo CLAUDE.md).
- Video embeds use the ultra-minimalist existing pattern — don't add extra styling or attributes.
- If the exact same video ID is already present in the page, skip and tell the user instead of duplicating it.
