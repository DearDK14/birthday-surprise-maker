# VelvetWishes — Magical Purple Birthday Surprise Website Creator

An independent, fully functional, responsive birthday-surprise web application inspired by the user experience of digital greeting gifts, crafted with a rich **purple & lavender** aesthetic.

![VelvetWishes](https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Key Features

1. **Brand & Purple Design System**:
   - Palette: Primary Purple (`#7C3AED`), Deep Purple (`#4C1D95`), Dark Purple (`#2E1065`), Lavender (`#C4B5FD`), Soft Background (`#F5F0FF`), Pale Purple (`#EDE9FE`), Accent Gold (`#F6C969`).
   - Smooth glassmorphism, floating starry particles, and serif typography (Playfair Display + Plus Jakarta Sans).

2. **Landing Page**:
   - Sticky navbar with responsive mobile drawer.
   - Hero section with interactive mockup preview switch.
   - "How It Works" 3-step guide.
   - Interactive Experience cards with instant preview.
   - Live Countdown clock demo.
   - Accordion FAQ.
   - Footer with legal dialogs (Privacy Policy, Terms of Service, About, Contact).

3. **7-Step Creation Wizard**:
   - **Step 1: Choose Experience** — Select between *Birthday Letter* and *Birthday Party*.
   - **Step 2: Personal Details** — Recipient name, sender name, birthday date, relationship, optional nickname with real-time validation.
   - **Step 3: Birthday Message** — Rich title, body, closing, and signature, with one-click inspiration templates (*Romantic*, *Best Friend*, *Sweet Family*, *Playful*) and live card preview.
   - **Step 4: Photo Memories** — Drag & drop photo uploader (JPG, PNG, WebP up to 10MB) with thumbnail previews, custom captions, reordering controls, and deletion.
   - **Step 5: Background Melody** — Built-in legal Web Audio ambient synthesizers (*Velvet Lullaby*, *Birthday Serenade*, *Starlight Dreams*, *Twilight Chimes*) with preview, volume, mute, and custom audio file upload support.
   - **Step 6: Theme Customization** — 4 distinct atmospheres (*Purple Dreams*, *Midnight Magic*, *Lavender Garden*, *Golden Celebration*), typography pairings, and animation intensity.
   - **Step 7: Review & Publish** — Full data summary, instant interactive full-screen preview, and seamless publishing.

4. **Interactive Recipient Experiences**:
   - **Birthday Letter**:
     * Full-screen lavender/deep purple ambient background with floating stars.
     * 3D animated sealed envelope with gold wax seal.
     * Click to open flap, triggering letter unfold, music playback, and purple/gold confetti.
     * Personalized letter card with sender's signature.
     * Photo memories gallery with lightbox enlargement and keyboard navigation.
     * Celebratory ending with replay button.
   - **Birthday Party**:
     * 3D-styled birthday cake with frosting, candle sticks, and wicks.
     * Click *"Light Up the Cake"* to ignite flickering flames with glowing auras.
     * *"Make a Wish & Blow Out Candles"* with realistic smoke wisp animations and sound.
     * Transitions smoothly into the personalized letter and photo memories.
     * Confetti burst and replay controls.

5. **Universal Cross-Device Sharing**:
   - Unique unguessable public slug (`vw_...`).
   - Instant QR Code generator with one-click image download for real greeting cards.
   - One-click copy link with feedback toast.
   - Quick sharing to WhatsApp and Telegram.
   - **Dual Persistence Architecture**:
     * Cloud-ready for Supabase (`supabase/schema.sql` included).
     * Standalone compressed URL state fallback using `lz-string` (`/#gift/:slug?d=...`), ensuring shared links open and work on any phone or computer immediately without backend prerequisites.

---

## 🚀 Running the Project

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🗄️ Backend Setup (Optional Supabase)

To enable cloud PostgreSQL persistence:
1. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
2. Execute the SQL migration located in `supabase/schema.sql` in your Supabase SQL Editor.
3. If left unconfigured, the application runs in self-contained resilient mode with full cross-device URL state and local storage.
