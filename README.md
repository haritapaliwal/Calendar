# 🗓 TUF Wall Calendar — Interactive Calendar Component

A premium, interactive wall calendar component built as a Next.js application for the **TUF Frontend Engineering Challenge**.

---

## ✨ Features

### Core Requirements ✅
| Feature | Details |
|---------|---------|
| **Wall Calendar Aesthetic** | Spiral binding, diagonal chevron overlay (matching reference), hero photo per month |
| **Day Range Selector** | Click start → click end; clear visual states for start, end, and in-range days |
| **Integrated Notes** | Monthly notes + range-specific notes, both auto-saved to `localStorage` |
| **Fully Responsive** | Desktop: 2-column (calendar + notes); Mobile: stacked vertically |

### Creative Extras 🎨
- **4 Themes**: ☀️ Light / 🌙 Dark / 🌊 Ocean / 🌅 Warm — full palette swap with smooth CSS transitions
- **Month-adaptive colors**: Each month has its own color theme applied to headers, range highlights, and buttons
- **12 curated hero images**: Beautiful Unsplash landscape photos, one per month
- **Holiday markers**: 30+ Indian national + international holidays shown as emoji badges on dates
  - 🇮🇳 Red badge — National public holiday (e.g. Republic Day, Independence Day, Ambedkar Jayanti)
  - 🪔 Orange badge — Indian festival (e.g. Diwali, Holi, Janmashtami)
  - 🌐 Blue badge — International day (e.g. Good Friday, Christmas, Women's Day)
  - **Hover tooltip** — Hovering over any badge reveals a slide-up pill showing the full holiday name
- **Animated today indicator**: Today's date shows a **pulsing orange glow ring** + a bold **"TODAY"** pill badge — impossible to miss
- **Slide animation**: Calendar grid slides left/right when navigating between months
- **Keyboard navigation**: `←` `→` arrow keys to switch months, `Escape` to clear selection
- **Print stylesheet**: Clean single-column layout when printing
- **Auto-save indicator**: Green "✓ Auto-saved" badge confirms notes are persisted
- **Character counter**: Notes capped at 500 characters with a colour-coded warning near the limit

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **JavaScript** (JSX) |
| Styling | **CSS Modules** + vanilla CSS (no Tailwind, no UI libraries) |
| State | **React hooks** (`useState`, `useEffect`, `useRef`) |
| Persistence | **`localStorage`** (notes survive page refresh) |
| Fonts | **Inter** via Google Fonts |
| Images | **Unsplash** (static CDN URLs, no API key needed) |
| Icons | **Unicode emoji** (zero-dependency icon approach) |

---

## 🚀 Running Locally

```bash
# 1. Navigate to the project directory
cd d:/projects/TUF_project

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

> **Note (Windows):** If `npm` is not on your PATH in PowerShell, open `cmd` instead:
> ```cmd
> set PATH=C:\Program Files\nodejs;%PATH% && npm run dev
> ```

### Build for production:
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
TUF_project/
├── app/
│   ├── layout.js          # Root layout + SEO metadata + Google Fonts
│   ├── page.js            # Home page
│   └── globals.css        # CSS reset + global base styles
│
├── components/Calendar/
│   ├── CalendarApp.jsx    # 🏠 Root orchestrator (themes, keyboard, layout)
│   ├── CalendarHero.jsx   # 📸 Hero image + spiral binding + chevron
│   ├── CalendarHeader.jsx # ◀ ▶ Month navigation + theme switcher
│   ├── CalendarGrid.jsx   # 📅 7-col date grid with slide animation
│   ├── CalendarDay.jsx    # 🗓 Individual day cell (range states, today ring, holiday badge)
│   └── NotesPanel.jsx     # 📝 Monthly/range notes with localStorage
│
├── hooks/
│   ├── useCalendar.js     # Month/year navigation state
│   ├── useDateRange.js    # Start/end date selection logic
│   └── useNotes.js        # Notes CRUD + localStorage persistence
│
├── utils/
│   ├── dateHelpers.js     # Calendar math (grid building, date comparisons)
│   └── holidays.js        # 30+ Indian + international holiday definitions
│
├── data/
│   └── monthImages.js     # Curated Unsplash URLs + per-month color themes
│
└── README.md
```

---

## 🎮 How to Use

1. **Navigate months**: Click `‹` `›` buttons or press **← →** arrow keys
2. **Select a date range**: Click any date (start), then click another date (end)
3. **Clear a range**: Click "✕ Clear" or press **Escape**
4. **Add monthly notes**: Type in the Notes panel → "Monthly" tab (auto-saved)
5. **Add range notes**: Select a range → click "Range ✓" tab → type notes
6. **Switch themes**: Use the dropdown in the header (☀️ Light / 🌙 Dark / 🌊 Ocean / 🌅 Warm)
7. **Jump to today**: Click the "Today" button
8. **View holiday details**: Hover over any emoji badge on a date to see the holiday name tooltip

---

## 📅 Holiday System

Holidays are defined in `utils/holidays.js` and cover both 2025 and 2026. Each entry has a **name** and a **type**:

| Type | Badge | Color | Examples |
|------|-------|-------|---------|
| `national` | 🇮🇳 | Red | Republic Day, Independence Day, Ambedkar Jayanti, Gandhi Jayanti |
| `indian` | 🪔 | Orange | Diwali, Holi, Janmashtami, Navratri, Guru Nanak Jayanti |
| `international` | 🌐 | Blue | Christmas, Good Friday, Women's Day, Labour Day |

> **Hover any badge** on the calendar to see a slide-up tooltip with the full holiday name.

---

## 🖼 Design References

The physical wall calendar aesthetic was implemented using:
- **Spiral binding** — A row of CSS-crafted coil circles along the very top of the card
- **Diagonal chevron** — `clip-path: polygon()` creates the mountain-peak shaped overlay matching the reference image, tinted with the current month's theme colour
- **Month hero photo** — Full-bleed background image in the upper ~40% of the card, unique per month
- **Month/year typography** — Right-aligned text overlaid on the chevron, matching the reference layout
- **Today indicator** — Animated pulsing orange ring (`@keyframes todayPulse`) around the current date number, plus a "TODAY" gradient pill badge below it
- **Holiday badges** — Small circular emoji chips (🇮🇳 / 🪔 / 🌐) positioned in the top-right corner of each holiday date cell; a CSS `opacity` + `transform` slide-up tooltip appears on hover

---

## 📐 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| > 768px | Two-column: calendar (left) + notes panel (right) |
| ≤ 768px | Stacked: calendar on top, notes below |
| ≤ 480px | Compact: reduced padding, full-width card |

---

## 🔄 Changelog

### v1.1.0 — UI Polish Update
- **Today indicator redesigned**: Replaced the tiny orange dot with a **pulsing glow ring** + **"TODAY" pill badge**
- **Holiday badges upgraded**: Replaced plain 5 px dots with **emoji circle badges** (🇮🇳 🪔 🌐) that scale on hover
- **Holiday tooltips added**: Slide-up tooltip on cell hover reveals the full holiday name with a coloured border
- **Next.js upgraded**: From 14 → 16 (latest stable with Turbopack)
- **Windows PATH note added** to README for PowerShell users

### v1.0.0 — Initial Release
- Wall calendar aesthetic with spiral binding and chevron hero
- Day range selector with start / in-range / end visual states
- Monthly + range-specific notes with `localStorage` persistence
- 4 app themes, month-adaptive colours, keyboard navigation
- 30+ holiday markers, slide animation, fully responsive layout

---

*Built with ❤️ for the TUF Frontend Engineering Internship Assessment*
