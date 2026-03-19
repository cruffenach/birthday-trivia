# Caitlin's 40th Birthday Trivia v2 — Master Plan

## Overview

A static web application (GitHub Pages) for Caitlin Ruffenach's 40th birthday party on **March 21, 2026**. This is a complete rebuild with 3 themed trivia sections, individual play (each person plays solo), and a host evaluation/leaderboard system.

**Key differences from v1:**
- Individual players (not teams) — each person enters their name + an emoji
- 3 themed sections instead of 40 chronological questions
- Each section has a distinct presentation style and media (audio, images)
- Two live modes: **Player Mode** and **Display Mode**
- Host evaluation screen with leaderboard visualization

---

## Architecture

### Core Constraint: Fully Stateless

Same as v1 — zero server-side state. All answers encoded in URL hash fragments. Hosted on GitHub Pages. No build tools, no npm, no bundlers. Plain HTML/CSS/JS.

### Three Modes of Operation

#### 1. Player Mode (`index.html`)
- Player enters their **name** and selects an **emoji** to represent them
- Navigates through all 3 sections sequentially
- Each section has its own themed presentation
- At the end, generates a URL encoding all their answers
- Player copies the link and texts it to the host

#### 2. Display Mode (`display.html`)
- A "big screen" view for a shared display/projector
- Shows the current question in a clean, large format
- No answer inputs — just the question/media presented beautifully
- Host advances through questions manually
- Everyone in the room can see what question is active

#### 3. Evaluation Mode (`results.html`)
- Host pastes newline-separated player URLs into a textarea
- System decodes all player answers
- Shows each question with the correct answer and all player responses
- Bottom area: animated leaderboard showing rankings
- Supports re-visiting — bookmarkable URL with all answers encoded

### URL Encoding Scheme

**Player answering mode:**
```
index.html#name=Caitlin&emoji=🎭&a=songname|musical|year,songname|musical|year,...;moviename|boxoffice|rtscore,...;price,price,...
```

Each section's answers are separated by `;`. Within a section, each question group's answers are separated by `,`. Sub-answers within a question group use `|`.

**Evaluation mode (bookmarkable):**
```
results.html#p=<base64-encoded-json-array-of-player-data>
```

---

## Visual Design

### Inheriting the "Garden Party Stationery" Aesthetic

The party design language remains the same — warm cream backgrounds, dusty slate blue accents, botanical elements. But each section gets its own thematic flavor layered on top.

### Color Palette (unchanged from v1)
- **Cream/ivory** (`#F7F3ED`) — primary background
- **Dusty slate blue** (`#6B7FA3`) — primary accent, borders, headers
- **Warm gold** (`#D4A853`) — crest, highlights
- **Rose** (`#C47A8A`) — botanical accent
- **Sage** (`#7A9B6D`) — botanical accent

### Section Theme Colors
- **Broadway** — `#D4A853` (warm gold / stage lights)
- **Movies** — `#C47A8A` (rose / cinema romance)
- **Price is Right** — `#7A9B6D` (sage / money green)

### Typography (same Google Fonts)
- **Cormorant Garamond** (600, small caps, letter-spaced) — headers
- **Playfair Display** (italic) — narrative text, section titles
- **Cormorant Garamond** (400/500) — body, questions, answers

### Signature Elements
- Slate blue border frame on every screen
- "40" floral crest on title/results screens
- Section-specific decorative touches (see section plans)

---

## Game Structure

### Flow

```
┌─────────────────┐
│   Welcome        │  Player enters name + picks emoji
│   Screen         │
└────────┬────────┘
         │
┌────────▼────────┐
│  Section Intro   │  "BROADWAY" — section title + brief intro
│  (Broadway)      │
└────────┬────────┘
         │
┌────────▼────────┐
│  Broadway Q1     │  Audio clip plays, 3 sub-questions
│  Broadway Q2     │  (Song Name, Musical, Year)
│  ...             │
│  Broadway QN     │
└────────┬────────┘
         │
┌────────▼────────┐
│  Section Intro   │  "MOVIES" — section title + brief intro
│  (Movies)        │
└────────┬────────┘
         │
┌────────▼────────┐
│  Movies Q1       │  Cast headshots + year + genre, 3 sub-questions
│  Movies Q2       │  (Movie Name, Box Office, RT Score)
│  ...             │
│  Movies QN       │
└────────┬────────┘
         │
┌────────▼────────┐
│  Section Intro   │  "THE PRICE IS RIGHT" — section title + brief intro
│  (Price is Right) │
└────────┬────────┘
         │
┌────────▼────────┐
│  PIR Q1          │  Item description + year, closest without going over
│  PIR Q2          │
│  ...             │
│  PIR Q5          │
└────────┬────────┘
         │
┌────────▼────────┐
│  Submit          │  URL generated, copy link
│  Screen          │
└────────┘
```

### Sections Summary

| Section | # Questions | Media | Sub-Qs per Question | Answer Types |
|---------|------------|-------|---------------------|--------------|
| Broadway | 5 shows | Audio clip (~10s, self-recorded) | 3: Song Name (text input), Musical (text input), Year (numeric) | Free text + numeric |
| Movies | 6 movies | Cast headshots (4 per movie) | 3: Movie Name (text input), Box Office (numeric/currency), RT Score (numeric/%) | Free text + numeric |
| Price is Right | 5 years × 3 items = 15 items | Descriptive text + optional images | 1: Price (numeric/currency) | Numeric |

### Total Question Count
- Broadway: 5 shows × 3 = 15 sub-answers
- Movies: 6 movies × 3 = 18 sub-answers
- Price is Right: 15 items × 1 = 15 sub-answers
- **Total: 48 sub-answers per player**

---

## Section Details (Brief — Full Plans Separate)

### Section 1: Broadway
**Theme**: Stage lights, curtain red/gold, theatrical
**Mechanic**: A ~10-second audio snippet of a famous song plays. Player answers:
1. Name of the song (free text)
2. What musical is it from? (free text)
3. Year of the show's Broadway debut (numeric)

**Shows**: South Pacific, Chicago, Cabaret, My Fair Lady, Bye Bye Birdie, Peter Pan, Book of Mormon, Hamilton, Dear Evan Hansen, Wicked, &Juliet, Les Mis, Brigadoon, Carousel, Spring Awakening, Rent, The Lion King, Avenue Q, Rodgers and Hammerstein's Cinderella

**Audio**: Needs sourced/hosted audio clips. Could use short snippets from YouTube Audio Library or similar royalty-free sources, or self-recorded clips.

**Design opportunities**: Curtain reveal animation, spotlight effect on the audio player, stage-light glow, playback visualizer.

**Full plan**: `PLAN-BROADWAY.md`

### Section 2: Movies
**Theme**: Cinema, romance, warm film grain
**Mechanic**: Cast headshots displayed alongside a year and genre. Player answers:
1. What is the name of the movie? (free text)
2. What was its original theatrical run box office earnings? (numeric/currency)
3. What is its Rotten Tomatoes score? (numeric/%)

**Movies**: Sleepless in Seattle, You've Got Mail, 10 Things I Hate About You, Clueless, The Departed, The Sound of Music

**Images**: Headshots of 3-4 main cast members per movie (need to source).

**Design opportunities**: Film strip border, movie poster aesthetic, polaroid-style headshot cards, film grain overlay.

**Full plan**: `PLAN-MOVIES.md`

### Section 3: Price is Right
**Theme**: Classic game show, retro, bright
**Mechanic**: For each of Caitlin's milestone ages (5, 7, 9, 11, 13 — years 1991, 1993, 1995, 1997, 1999), show 3 items:
- The most popular Christmas gift for children that year
- The most popular car sold that year
- The average price of a new home in Arizona that year

Player guesses the price — closest without going over wins.

**Design opportunities**: Price is Right podium display (reuse from v1), showcase showdown animation, "come on down" entrance, dollar-sign confetti, retro game show styling.

**Full plan**: `PLAN-PRICE-IS-RIGHT.md`

---

## Player Mode — Detailed Design

### Welcome Screen
```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │                                            │ │
│ │              [floral crest]                │ │
│ │                  40                        │ │
│ │                                            │ │
│ │           C A I T L I N ' S                │ │
│ │                                            │ │
│ │          Birthday Trivia                   │ │
│ │                                            │ │
│ │           ──────────────                   │ │
│ │                                            │ │
│ │         Your name:                         │ │
│ │    ┌──────────────────────┐                │ │
│ │    │                      │                │ │
│ │    └──────────────────────┘                │ │
│ │                                            │ │
│ │         Pick your emoji:                   │ │
│ │    🌸 🌺 🎭 🎬 🎪 🌟 💫 🦋               │ │
│ │    🎂 🎁 🍰 🌻 🌷 🪻 💐 🎀               │ │
│ │                                            │ │
│ │    ┌──────────────────────┐                │ │
│ │    │       Let's Go!      │                │ │
│ │    └──────────────────────┘                │ │
│ │                                            │ │
│ │          March 21, 2026                    │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Section Intro Screen
Each section gets a full-screen intro with:
- Section number ("ROUND 1 OF 3")
- Section title in Playfair italic
- Brief thematic description
- Section-specific decorative element
- "Begin" button

### Question Screens
Each question fills the viewport. Sub-questions are stacked vertically below the media/prompt. Navigation: prev/next buttons + timeline dots (grouped by section with section colors).

### Submit Screen
- "All answers in!" with crest
- Shows player name + emoji
- Copy Link button
- "Text this link to the host"
- Count of unanswered items

---

## Display Mode — Detailed Design

A stripped-down, large-format view for projection. Shows:
- Section header + question number
- The question content (audio player for Broadway, images for Movies, item description for PIR)
- The 3 sub-questions listed (but no input fields)
- Clean typography, extra-large for readability across a room
- Host advances with spacebar or click

No player identity, no answers, no scoring — purely presentational.

---

## Evaluation Mode — Detailed Design

### Input Screen
```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │              [floral crest]                │ │
│ │                  40                        │ │
│ │            R E S U L T S                   │ │
│ │                                            │ │
│ │  Paste player links (one per line):        │ │
│ │  ┌──────────────────────────────────┐      │ │
│ │  │ https://...#name=Collin&emoji=... │      │ │
│ │  │ https://...#name=Sarah&emoji=... │      │ │
│ │  │ https://...#name=Mike&emoji=...  │      │ │
│ │  │                                  │      │ │
│ │  └──────────────────────────────────┘      │ │
│ │                                            │ │
│ │  Found 3 players: Collin 🎭 Sarah 🌸 Mike 🎬│
│ │                                            │ │
│ │    ┌──────────────────────┐                │ │
│ │    │     Begin Reveal →   │                │ │
│ │    └──────────────────────┘                │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Question Review Screen
For each question:
- Show the question/media
- Show the correct answer
- Show each player's answer with their emoji, color-coded (correct = green, wrong = red/neutral)
- For text answers: fuzzy matching (case-insensitive, common misspellings)
- For Price is Right: closest-without-going-over logic

### Leaderboard (Bottom Area)
- Animated bar chart / podium display
- Each player represented by their emoji + name
- Bars grow as scores accumulate through the reveal
- Final screen: full leaderboard with rankings, confetti for winner

---

## File Structure

```
birthday-trivia/
├── index.html              # Player mode (welcome + all sections + submit)
├── display.html            # Display mode (question-only view for projector)
├── results.html            # Evaluation mode (paste links + review + leaderboard)
├── style.css               # Shared design system
├── app.js                  # Player mode logic
├── display.js              # Display mode logic
├── results.js              # Evaluation mode logic
├── questions.js            # All question data + correct answers
├── assets/
│   ├── audio/              # Broadway song clips (~10s each)
│   │   ├── south-pacific.mp3
│   │   ├── chicago.mp3
│   │   └── ...
│   └── images/             # Movie headshots, PIR item images
│       ├── movies/
│       │   ├── sleepless-cast.jpg
│       │   └── ...
│       └── pir/
│           └── ...
├── design-reference.png    # Party bar menu (copy from v1)
├── design-reference-2.jpeg # Party dinner menu (copy from v1)
├── PLAN.md                 # This file
├── PLAN-BROADWAY.md        # Section 1 detailed plan
├── PLAN-MOVIES.md          # Section 2 detailed plan
├── PLAN-PRICE-IS-RIGHT.md  # Section 3 detailed plan
├── RESEARCH.md             # Sourced data for all questions
└── CLAUDE.md               # Project manifest for AI assistant
```

---

## Implementation Phases

### Phase 0: Planning (current)
- [x] Master plan (this document)
- [ ] Section 1 plan: `PLAN-BROADWAY.md`
- [ ] Section 2 plan: `PLAN-MOVIES.md`
- [ ] Section 3 plan: `PLAN-PRICE-IS-RIGHT.md`
- [ ] Research all factual data: `RESEARCH.md`

### Phase 1: Foundation
- [ ] `style.css` — design system (colors, typography, frame, section themes)
- [ ] `questions.js` — data structure with all questions + answers
- [ ] `index.html` — HTML skeleton (welcome + section containers + submit)
- [ ] `app.js` — state management, URL encoding/decoding, navigation

### Phase 2: Broadway Section
- [ ] Audio player component (play/pause, ~10s clips)
- [ ] Song name + musical + year input fields
- [ ] Section intro screen with theatrical styling
- [ ] Source/create audio clips

### Phase 3: Movies Section
- [ ] Cast headshot grid display
- [ ] Movie name + box office + RT score inputs
- [ ] Film-themed decorative styling
- [ ] Source cast headshot images

### Phase 4: Price is Right Section
- [ ] Item description cards with year grouping
- [ ] Price podium input (reuse/adapt from v1)
- [ ] Game show retro styling
- [ ] Research all prices

### Phase 5: Display Mode
- [ ] `display.html` + `display.js`
- [ ] Large-format question display
- [ ] Host navigation (spacebar/click advance)
- [ ] Section-themed backgrounds

### Phase 6: Evaluation Mode
- [ ] `results.html` + `results.js`
- [ ] Multi-player URL parsing
- [ ] Question-by-question review with player answers
- [ ] Fuzzy text matching for free-text answers
- [ ] Leaderboard visualization (animated bars)
- [ ] Winner screen with confetti

### Phase 7: Polish
- [ ] Section transition animations
- [ ] Audio/image preloading
- [ ] Mobile/iPad optimization
- [ ] Edge cases (empty answers, tied scores)
- [ ] Full end-to-end testing
- [ ] Deploy to GitHub Pages

---

## Resolved Decisions

1. **Broadway audio**: Self-recorded clips by the host (~10s each). 5 clips needed.
2. **Broadway count**: Narrowed from 19 to 5 shows (Wicked, South Pacific, Hamilton, Carousel, Rent).
3. **Movie headshots**: Host will source these. Exact actors + characters specified in `PLAN-MOVIES.md`.
4. **Research**: A separate Claude instance with web search will fill out `RESEARCH-ASSIGNMENT.md` with verified data.

## Remaining Open Questions

1. **Scoring for text inputs**: How strict? Current plan: case-insensitive fuzzy match + host override.
2. **Display mode sync**: Independent control (not synced with player mode). Host advances manually.
3. **Price is Right scoring**: Classic "closest without going over" — but what if everyone goes over? Host decides.
4. **Emoji selection**: Curate a list of ~16-24 cute emojis, or let players type any emoji?
