# Baseline — Genomics for a Healthier Tomorrow

The official static website for **Baseline** (formerly Centre for Genomic Sciences / CGS), built out of the Precision Medicine Lab (PML) and Project MOCCA heritage in Peshawar, Pakistan.

Designed to be elegant, warm, accessible, and fast, following strict editorial and animation standards:
- **Approach**: Approachable, clear medical guidance without intimidating clinical jargon or high overseas fees.
- **Palette**: Deep Royal Purple (`#5e2292`), Dark Charcoal (`#141413`), and Warm Unbleached Paper (`#faf9f5`).
- **Motion**: Physics-informed micro-interactions based on Emil Kowalski's *Animations on the Web* (`/web-animation-design`) with full reduced-motion accessibility.
- **Anti-Slop**: Built under the `/antislop-ui` standard (zero emojis, zero fake status dots, zero perpetual loops, zero generic gradients, real verified metrics).
- **Zero Build Dependencies**: Pure HTML5, CSS3, and vanilla JavaScript ready to deploy directly onto GitHub Pages.

---

## Directory Structure

```
website/
├── index.html        # Main landing page with full semantic HTML5 & Schema.org JSON-LD
├── 404.html          # Reassuring branded 404 error page for GitHub Pages routing
├── style.css         # Complete stylesheet with GPU-accelerated motion & responsive design
├── main.js           # Progressive enhancement, scroll reveals, tab switching & form hints
├── robots.txt        # Search engine crawler permissions
├── sitemap.xml       # Standard XML sitemap for SEO indexing
├── README.md         # Deployment & configuration documentation
└── assets/           # High-resolution brand marks & logos
    ├── logo-purple.png    # Primary purple monogram & wordmark
    ├── logo.jpg           # Monogram logo
    ├── logo-wordmark.png  # Black horizontal wordmark
    └── logo.svg           # Scalable vector logo
```

---

## Fast Handoff: Deploying to GitHub Pages

Since you are uploading to GitHub yourself, follow these quick steps:

1. **Commit and push** the contents of the `website/` folder to your GitHub repository (either on the `main` branch or a `gh-pages` branch).
2. On your repository page on GitHub, click **Settings** (top tab).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or your branch) and the folder (`/ (root)`).
   - Click **Save**.
5. Within 1–2 minutes, your site will be live at `https://<your-username>.github.io/<your-repo>/`.

---

## 2-Minute Final Customizations

Before launch, there are two placeholders you can replace with your live endpoints:

### 1. Your Operational WhatsApp Number
Search for `923000000000` in `index.html` and `404.html` and replace it with your clinical team's actual phone number in international format (e.g. `923123456789`).

### 2. Free Contact Form Email Endpoint (Formspree)
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form (e.g. "Baseline Patient Inquiries") and point it to your email address (`info@baseline.pk`).
3. Copy your unique 8-character Form ID (e.g., `xpzvbqlk`).
4. In `index.html` (around line 700), replace `your-form-id` with your actual ID:
   ```html
   <form class="simple-form" id="consultation-form" action="https://formspree.io/f/YOUR_ACTUAL_ID" method="POST">
   ```

### 3. Custom Domain (Optional)
If you wish to point `baseline.pk` to GitHub Pages:
1. In the GitHub **Settings** → **Pages** tab, enter `baseline.pk` into the **Custom domain** field.
2. In your DNS provider (e.g. PKNIC / Cloudflare), add an `A` record pointing to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) or a `CNAME` record pointing to `<your-username>.github.io`.

---

## Technical Highlights

- **Local Peshawar Differentiation**: Clear highlights for local EDTA/buccal swab collection, 4–6 week turnaround (vs. 10–14 weeks overseas), and all-inclusive PKR 120,000 Exome pricing.
- **Hardware-Accelerated Animation**: All animations use `transform` and `opacity` with `will-change` properties to avoid layout thrashing and dropped frames.
- **Accordion Micro-Interactions**: Native `<details>` tags enhanced with CSS Grid height interpolation (`grid-template-rows: 0fr -> 1fr`) and JavaScript closure interceptor for silky open/close transitions.
- **Rich Social Previews**: Pre-configured OpenGraph and Twitter card meta tags ensure beautiful preview banners whenever links are shared on WhatsApp or LinkedIn.
