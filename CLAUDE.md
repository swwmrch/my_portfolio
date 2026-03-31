# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

macOS desktop-themed portfolio website built with vanilla HTML, CSS, and JavaScript. No build system, no npm, no frameworks — just static files served by Vercel with one serverless function.

## Local Development

Use VS Code with the **Live Server** extension (by Ritwick Dey):
- Right-click `index.html` → **Open with Live Server**
- Runs at `localhost:5500`
- AI chat won't work locally without the `ANTHROPIC_API_KEY` set

There are no build, lint, or test commands.

## Architecture

```
index.html     ← All UI markup (macOS desktop, windows, dock, widgets)
style.css      ← All styles (CSS variables, animations, responsive)
script.js      ← All client-side logic (drag, windows, clock, chat, lang)
api/chat.js    ← Vercel serverless function: proxies POST /api/chat → Anthropic API
vercel.json    ← Routes /api/* to Node.js, everything else served as static
```

### Key Patterns

**Window system** — Windows are `<div class="window">` elements. `script.js` manages open/close/minimize and z-index (active window gets highest). Dragging is handled via `mousedown`/`mousemove`/`mouseup` on the `.titlebar`.

**Desktop item dragging** — Icons/folders on the desktop are also draggable, constrained to stay above the dock.

**Bilingual support** — Every text node has `data-en` and `data-th` attributes. The language toggle in the menubar calls a function that reads those attributes and updates `textContent` for all elements.

**AI chat** — `script.js` sends `POST /api/chat` with `{ message, systemPrompt }`. The `SYSTEM_PROMPT` constant in `script.js` contains March's full bio, skills, and projects — edit this to update what the AI knows. The serverless function uses `claude-sonnet-4-6` with `max_tokens: 300`.

### Deployment

Push to GitHub → Vercel auto-deploys. Requires `ANTHROPIC_API_KEY` environment variable set in Vercel dashboard (Settings → Environment Variables → Redeploy after adding).

### Assets to keep in sync

- `resume.pdf` — must be named exactly `resume.pdf`
- `photo.jpg` — must be named exactly `photo.jpg`
- `certs/` — certificate images as `cert1.jpg`, `cert2.jpg`, etc.

### Customisation touchpoints

- **LinkedIn URL**: search `index.html` for `Add your LinkedIn URL`
- **AI personality**: edit `SYSTEM_PROMPT` in `script.js`
- **Certificate grid**: update the cert grid markup in `index.html` and add images to `certs/`
