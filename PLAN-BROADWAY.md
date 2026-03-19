# Section 1: Broadway — Detailed Plan

## Concept

A ~10-second snippet of a famous Broadway song plays. The player listens and answers 3 questions:
1. **Name of the song** (free text input)
2. **What musical is it from?** (free text input)
3. **Year of the show's Broadway debut** (numeric input)

This section celebrates Caitlin and Collin's love of Broadway — they've seen an extraordinary number of shows together.

---

## Design Theme: "Opening Night"

### Visual Language
- **Gold** (`#D4A853`) as the section accent color — stage lights, marquee glow
- Subtle spotlight/radial gradient behind the audio player
- Marquee-style lettering for the section title
- Curtain texture or drape shape as a decorative border element
- Star/sparkle accents

### Section Intro Screen
```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │                                            │ │
│ │           R O U N D  1  O F  3             │ │
│ │                                            │ │
│ │              ✦ ✦ ✦                         │ │
│ │                                            │ │
│ │            Broadway                        │ │
│ │                                            │ │
│ │   Caitlin and Collin have seen an           │ │
│ │   extraordinary number of Broadway         │ │
│ │   shows together. She cries at every       │ │
│ │   single one.                              │ │
│ │                                            │ │
│ │   Listen to each clip and name the         │ │
│ │   song, the show, and the year it          │ │
│ │   debuted on Broadway.                     │ │
│ │                                            │ │
│ │   ┌──────────────────────┐                 │ │
│ │   │    Begin Round →     │                 │ │
│ │   └──────────────────────┘                 │ │
│ │                                            │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Question Screen Layout
```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │  ✦ BROADWAY          Q 3 of 19    300 pts  │ │
│ │  ──────────────────────────────────────    │ │
│ │                                            │ │
│ │   ┌────────────────────────────────┐       │ │
│ │   │         ♫  ▶  PLAY            │       │ │
│ │   │     ━━━━━━●━━━━━━━  0:07      │       │ │
│ │   └────────────────────────────────┘       │ │
│ │                                            │ │
│ │   Name of the song:                        │ │
│ │   ┌──────────────────────────────┐         │ │
│ │   │                              │         │ │
│ │   └──────────────────────────────┘         │ │
│ │                                            │ │
│ │   What musical is it from?                 │ │
│ │   ┌──────────────────────────────┐         │ │
│ │   │                              │         │ │
│ │   └──────────────────────────────┘         │ │
│ │                                            │ │
│ │   Year of Broadway debut:                  │ │
│ │   ┌──────────────────────────────┐         │ │
│ │   │                              │         │ │
│ │   └──────────────────────────────┘         │ │
│ │                                            │ │
│ │  ← prev                        next →     │ │
│ │  ──────────────────────────────────────    │ │
│ │  ● ● ● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Audio Player Design
- Rounded rectangle container with dark background (`#1a1a2e`) — like a theater screen
- Gold accent border
- Large play/pause button (▶ / ⏸) centered
- Waveform visualization or simple progress bar
- Duration display (e.g., "0:10")
- Audio auto-stops at the clip endpoint
- Replay button to hear it again
- Subtle gold glow animation while playing

### Input Fields
- Styled to match garden party aesthetic (cream background, slate border)
- Free text for song name and musical name
- Numeric-only for year (4-digit, restricted to reasonable range 1940-2025)
- Each field has a subtle label above it

---

## Final Show Selection (5 Shows)

Narrowed from 19 to 5. Selected for: recognizable songs, time span (1945–2015), personal meaning, and good trivia difficulty. Presented in non-chronological play order to prevent pattern-guessing.

| Play Order | Musical | Song | Broadway Debut Year | Why Included |
|------------|---------|------|---------------------|-------------|
| 1 | Wicked | "Defying Gravity" | 2003 | Caitlin & Collin have seen it together. Cultural landmark. |
| 2 | South Pacific | "Some Enchanted Evening" | 1949 | First Broadway song Caitlin ever learned. Deeply personal. |
| 3 | Hamilton | "Alexander Hamilton" | 2015 | Modern classic. Unmistakable opening. |
| 4 | Carousel | "You'll Never Walk Alone" | 1945 | Grandma used to show her this one. Beautiful melody. |
| 5 | Rent | "Seasons of Love" | 1996 | "525,600 minutes" — instant recognition. |

### Notes
- **Non-chronological order**: 2003 → 1949 → 2015 → 1945 → 1996. No one can pattern-match.
- **Audio clips will be self-recorded** by the host. Each ~10 seconds.
- **Year range**: 70 years of Broadway (1945–2015) — good spread of difficulty.
- All debut years to be verified via `RESEARCH-ASSIGNMENT.md`.

---

## Audio Strategy

### Option A: Self-Recorded (Recommended for Private Party)
- Record ~10s clips of each song on piano or humming
- Adds personal charm to the game
- No copyright concerns

### Option B: Cast Recording Snippets
- Use ~10s clips from official cast recordings
- Fair use argument for private, non-commercial party game
- Better audio quality and recognition

### Option C: MIDI/Instrumental
- Use MIDI renditions of each song
- Clearly recognizable but legally safe
- Can be generated with free tools

### Technical Implementation
- Audio files stored in `assets/audio/` as MP3 (smallest size, universal support)
- Each clip is 8-12 seconds
- HTML5 `<audio>` element with custom controls
- JavaScript handles play/pause, progress, auto-stop
- Preload next clip when advancing

---

## Scoring

### Point Values
All Broadway questions are worth equal points (to keep it simple). Suggested: **100 points per correct sub-answer**, so each question is worth up to 300 points.

### Text Matching (for Song Name & Musical Name)
- Case-insensitive comparison
- Strip common prefixes: "The ", "A "
- Strip punctuation
- Allow common abbreviations: "Les Mis" = "Les Misérables"
- Levenshtein distance threshold for close spellings
- Host can manually override in evaluation mode

### Year Matching
- Exact match only
- ±1 year could be a partial credit option (host's call)

---

## Display Mode (Broadway)

The display version shows:
- Large audio player (auto-plays the clip)
- Question number and section header
- The 3 sub-question prompts listed (no input fields)
- After host advances past the question: shows the correct answer
- Gold-themed decorative elements

---

## Evaluation Mode (Broadway)

Shows each clip with:
- Song name, musical, year (correct answers)
- Each player's answers side by side
- Color coding: exact match = green, close match = yellow, wrong = neutral
- Points awarded displayed

---

## Implementation Checklist

- [ ] Research and verify all Broadway debut years
- [ ] Select the most recognizable song for each show
- [ ] Source or create ~10s audio clips for all 19 songs
- [ ] Design audio player component (HTML/CSS/JS)
- [ ] Build question layout with 3 input fields
- [ ] Section intro screen with theatrical styling
- [ ] Text matching logic for song/musical names
- [ ] Display mode: large-format audio + questions
- [ ] Evaluation mode: player answer comparison grid
- [ ] Timeline dots for 19 questions (gold themed)
- [ ] Transitions between questions (curtain-rise animation?)
