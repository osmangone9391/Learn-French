# LireFacile - French Story Reader

A web application for learning French through graded, interactive short stories with bilingual glossaries, natural audio, spaced repetition (SRS), comprehension quizzes, and server-backed personalized story generation.

---

## Architecture & Request Flow

```
+-----------------------------------------------------------------------------------+
| Browser (Client - React 19 SPA)                                                    |
|                                                                                   |
| 1. On open "Create my story" -> GET /api/story-quota                              |
|    - Displays "Stories left today: N" badge                                       |
|    - Shows privacy disclaimer (no personal data)                                  |
| 2. On click "Generate Story" -> POST /api/generate-story (Phase 1: step=draft)   |
|    - Sends user topic, CEFR level, length, style, and up to 8 saved Box 1-2 words |
| 3. On draft response -> POST /api/generate-story (Phase 2: step=vocab)            |
|    - Annotates all word tokens with grammar tags & authentic English + Bangla     |
| 4. Client runs validateStory() for parity checks                                  |
|    - Automatic 1-time retry if quality check fails                                |
| 5. Preview dialog allows user to review story, edit meanings, or report issues    |
| 6. User clicks "Save to My Library" -> Persisted offline in browser localStorage   |
+-----------------------------------------+-----------------------------------------+
                                          |
                        HTTP (JSON payload <= 10 KB)
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| Server (Express.js on Node / Netlify Serverless Functions)                        |
|                                                                                   |
| - Checks Kill Switch (AI_STORIES_ENABLED != "false")                              |
| - Checks Turnstile Bot Token (if TURNSTILE_SECRET_KEY is configured)               |
| - Enforces Rate Limits (User: 3/day via anon ID & IP hash; Global: 100/day)       |
| - Sanitizes inputs & wraps them strictly as DATA in boundary tags                 |
| - Calls Google Gemini API using server-side GEMINI_API_KEY                        |
| - Increments anonymous daily counters on completion                               |
| - Logs only daily integer counts & error categories (NO story text / topics)      |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
| Google Gemini API (gemini-2.5-flash / official Google GenAI SDK)                  |
| Documentation: https://ai.google.dev/gemini-api/docs/models/gemini                 |
| - Server holds the single private key in GEMINI_API_KEY                           |
| - Client web browser NEVER receives or holds any API key                          |
+-----------------------------------------------------------------------------------+
```

### Why Generation is Split into Two Server Calls
Story generation takes 15–35 seconds when generating long French prose, aligned sentence translations, multiple-choice quizzes, and a comprehensive 80+ word vocabulary dictionary with grammatical tags (gender, number, tense, person, lemma) and bilingual definitions.
- **Phase 1 (Draft)**: Generates French title, subtitle, paragraphs, sentence-aligned translations, and 3-question quiz in ~4–7 seconds.
- **Phase 2 (Vocabulary)**: Takes the verified French paragraphs and annotates the exact word tokens in ~6–10 seconds.
- **Result**: Neither request exceeds the 10-second serverless execution limits on Netlify Starter / Vercel Hobby free tiers, avoids gateway timeouts, provides informative step-by-step progress to the user, and supports instant cancellation via `AbortController`.

### Rate Limit & Counter Storage
- **Selected Platform**: Local file-backed storage (`./data/daily-counters.json`) with in-memory caching and atomic writes for Node/Express/Docker/Cloud Run, plus pluggable support for Netlify Blobs.
- **Netlify Blobs Official Free Tier Limits**: 100,000 read operations/month, 25,000 write operations/month, 5 GB storage.
- **Cloudflare KV Official Free Tier Limits**: 100,000 read operations/day, 1,000 write operations/day, 1 GB storage.
- **Privacy Guarantee**: No story topics, generated texts, or personal information are stored on the server. Counters track only daily integer totals and error categories. Client IP addresses are hashed using SHA-256 with salt.

---

## Operator Checklist

Before making this application public, complete the following operator tasks:

### 1. Mandatory Legal & Billing Warning: EEA / UK / Switzerland Users
> ⚠️ **CRITICAL GOOGLE GEMINI TERMS NOTICE**
> Under Google's official Gemini API terms of service, **paid services are strictly required** if your application is made accessible to users in the European Economic Area (EEA), Switzerland, or the United Kingdom.
>
> Official Terms & Pricing References:
> - Terms of Service: https://ai.google.dev/terms
> - Pricing & Regional Availability: https://ai.google.dev/pricing
>
> **Action Required Before Sharing the Link Publicly**:
> 1. In your [Google Cloud Console](https://console.cloud.google.com/), link a billing account to the project that owns your Gemini API key.
> 2. **Set strict per-day quota caps** in Google Cloud Console (`APIs & Services` -> `Gemini API` -> `Quotas`).
>    *Warning*: Do NOT rely solely on billing budget alerts. Budget alerts send notification emails after spending occurs, but **they do not halt API requests**. Quota caps enforce a hard ceiling that prevents surprise bills.
> 3. Verify that your application's `GLOBAL_DAILY_STORY_CAP` (default: 100) and `USER_DAILY_STORY_LIMIT` (default: 3) are configured to match your desired budget.

---

### 2. Environment Variables Configuration

| Variable Name | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | *None* | Your private Gemini API key from Google AI Studio / Google Cloud. Never commit this to Git or expose it to client code. |
| `GEMINI_MODEL` | No | `gemini-2.5-flash` | The model identifier. Recommended fast production model from [Google documentation](https://ai.google.dev/gemini-api/docs/models/gemini). |
| `AI_STORIES_ENABLED` | No | `true` | Emergency Kill Switch. Set to `"false"` to immediately disable story generation without stopping the website. |
| `USER_DAILY_STORY_LIMIT`| No | `3` | Maximum stories allowed per day per browser and per IP address. |
| `GLOBAL_DAILY_STORY_CAP`| No | `100` | Maximum stories allowed per day across all users combined. When hit, pauses generation until the next UTC day. |
| `PORT` | No | `3000` | HTTP port for the Node/Express server. |
| `TURNSTILE_SECRET_KEY` | No | *None* | Cloudflare Turnstile secret key for bot verification (optional, disabled by default). |
| `VITE_TURNSTILE_SITE_KEY`| No | *None* | Cloudflare Turnstile public site key (optional, disabled by default). |

---

### 3. Step-by-Step Instructions to Set Up Environment Variables

#### Option A: Hosting on Node / Docker / Cloud Run / VPS
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and paste your Gemini API key:
   ```env
   GEMINI_API_KEY="AIzaSyYourSecretKeyHere"
   AI_STORIES_ENABLED="true"
   USER_DAILY_STORY_LIMIT="3"
   GLOBAL_DAILY_STORY_CAP="100"
   ```
3. Start the application:
   ```bash
   npm run build
   npm start
   ```

#### Option B: Hosting on Netlify
1. Go to your Site settings in Netlify dashboard: **Site configuration** -> **Environment variables**.
2. Click **Add a variable** -> **Add a single variable**.
3. Create `GEMINI_API_KEY` with your secret key. Set the scope to **Functions** or **All scopes**.
4. Create `AI_STORIES_ENABLED` = `true`.
5. Create `USER_DAILY_STORY_LIMIT` = `3`.
6. Create `GLOBAL_DAILY_STORY_CAP` = `100`.
7. Trigger a new deploy.

#### Option C: Optional Cloudflare Turnstile Setup (Bot Protection)
1. Sign in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Turnstile**.
2. Click **Add widget**, name it `LireFacile`, and add your domain (or `localhost`).
3. Set widget mode to **Managed** or **Non-interactive**.
4. Copy the **Site Key** and **Secret Key**.
5. Set `TURNSTILE_SECRET_KEY="0x4AAAAAA..."` in your server environment variables.
6. Set `VITE_TURNSTILE_SITE_KEY="0x4AAAAAA..."` in your client environment variables.

---

### 4. How to Rotate or Delete the Gemini API Key

If you ever suspect your API key was leaked, or if you rotate credentials periodically:

1. **Delete or Rotate in Google AI Studio**:
   - Go to [Google AI Studio API Keys](https://aistudio.google.com/app/apikey).
   - Find your existing key and click **Delete** (trash icon) to instantly revoke it.
   - Click **Create API key** to generate a new key.
2. **Update Your Server Host**:
   - In your host's environment settings (Netlify, Cloud Run, VPS `.env`), update `GEMINI_API_KEY` with the new value.
   - Redeploy or restart the server (`npm restart` or restart the container).
3. **Emergency Disable (Kill Switch)**:
   - If an unexpected spike occurs, set `AI_STORIES_ENABLED="false"` in your environment variables.
   - The server will immediately reject all generation calls with `503 Service Unavailable` ("Story creation is temporarily unavailable") without calling Gemini or spending quota.

---

## Local Development & Testing

```bash
# Install dependencies
npm install

# Run full-stack dev server (Express + Vite middlewares on http://localhost:3000)
npm run dev

# Run static type checks
npm run lint

# Validate static curated stories against grammar and schema rules
npm run validate:stories

# Build production assets
npm run build
```
