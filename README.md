# March's Portfolio

macOS desktop-themed portfolio with AI chat, draggable windows, live clock, and bilingual support.

## Project Structure

```
march-portfolio/
├── index.html        ← Desktop UI
├── style.css         ← All styles
├── script.js         ← Interactions (drag, windows, clock, chat)
├── api/
│   └── chat.js       ← Vercel serverless function (Claude API proxy)
├── vercel.json       ← Vercel config
├── resume.pdf        ← ⚠️ ADD YOUR RESUME HERE
├── photo.jpg         ← ⚠️ ADD YOUR PHOTO HERE
└── certs/            ← ⚠️ ADD CERTIFICATE IMAGES HERE (optional)
```

## Setup Locally

1. Open the folder in VS Code
2. Install VS Code extension: **Live Server** (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. The portfolio opens in your browser at `localhost:5500`

> Note: The AI chat won't work locally without the API key setup below.

## Files to Add

- `resume.pdf` — your resume, named exactly `resume.pdf`
- `photo.jpg` — your photo (square works best), named exactly `photo.jpg`
- `certs/` folder — add certificate images as `cert1.jpg`, `cert2.jpg`, etc.

## Deploy to Vercel

### Step 1 — Push to GitHub
```bash
# In your project folder
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/swwmrch/portfolio.git
git push -u origin main
```

### Step 2 — Connect to Vercel
1. Go to vercel.com → Log in with GitHub
2. Click **Add New Project**
3. Import your `portfolio` repo
4. Click **Deploy** (no build settings needed)

### Step 3 — Add API Key
1. In Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: your API key from console.anthropic.com
3. Click **Save** → **Redeploy**

## Customise

- **LinkedIn**: Open `index.html`, find `Add your LinkedIn URL` and replace with your URL
- **Certificates**: Add images to `certs/` folder and update the cert grid in `index.html`
- **Chat personality**: Edit `SYSTEM_PROMPT` in `script.js` to update what the AI knows about you

## Get Your Anthropic API Key

1. Go to console.anthropic.com
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy it — paste into Vercel environment variables
