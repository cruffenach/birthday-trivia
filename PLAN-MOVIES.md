# Section 2: Movies — Detailed Plan

## Concept

Cast headshots from a movie are displayed alongside the movie's release year and genre. The player looks at the faces and clues and answers 3 questions:
1. **What is the name of the movie?** (free text input)
2. **What was its original theatrical run box office earnings?** (numeric/currency input)
3. **What is its Rotten Tomatoes score?** (numeric/% input)

This section celebrates Caitlin's lifelong love of movies — from wearing out two VHS copies of The Little Mermaid to seeing Sleepless in Seattle approximately 400 times.

---

## Design Theme: "At the Cinema"

### Visual Language
- **Rose** (`#C47A8A`) as the section accent color — warmth, romance
- Film strip border / sprocket hole decorative element
- Polaroid-style frames around headshots
- Subtle film grain overlay on backgrounds
- Movie ticket stub shapes as decorative accents

### Section Intro Screen
```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │                                            │ │
│ │           R O U N D  2  O F  3             │ │
│ │                                            │ │
│ │              🎬 🎬 🎬                      │ │
│ │                                            │ │
│ │             Movies                         │ │
│ │                                            │ │
│ │   From The Little Mermaid to Sleepless     │ │
│ │   in Seattle (seen approximately 400       │ │
│ │   times), Caitlin has always been a        │ │
│ │   movie girl.                              │ │
│ │                                            │ │
│ │   Look at the cast, the year, and the      │ │
│ │   genre — then name the movie, its         │ │
│ │   box office, and its RT score.            │ │
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
│ │  🎬 MOVIES           Q 2 of 6     300 pts  │ │
│ │  ──────────────────────────────────────    │ │
│ │                                            │ │
│ │   ┌───────┐ ┌───────┐ ┌───────┐           │ │
│ │   │       │ │       │ │       │           │ │
│ │   │ [pic] │ │ [pic] │ │ [pic] │           │ │
│ │   │       │ │       │ │       │           │ │
│ │   └───────┘ └───────┘ └───────┘           │ │
│ │                                            │ │
│ │      1998  ·  Romantic Comedy              │ │
│ │                                            │ │
│ │   ──────────────                           │ │
│ │                                            │ │
│ │   What movie is this?                      │ │
│ │   ┌──────────────────────────────┐         │ │
│ │   │                              │         │ │
│ │   └──────────────────────────────┘         │ │
│ │                                            │ │
│ │   Original theatrical box office:          │ │
│ │   ┌──────────────────────────────┐         │ │
│ │   │ $                            │         │ │
│ │   └──────────────────────────────┘         │ │
│ │                                            │ │
│ │   Rotten Tomatoes score:                   │ │
│ │   ┌──────────────────────────────┐         │ │
│ │   │                            % │         │ │
│ │   └──────────────────────────────┘         │ │
│ │                                            │ │
│ │  ← prev                        next →     │ │
│ │  ──────────────────────────────────────    │ │
│ │  ● ● ○ ○ ○ ○                              │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Headshot Display Design
- 3-4 polaroid-style cards in a row
- White border with slight rotation (±2-3 degrees)
- Subtle drop shadow
- Photos cropped to square or 3:4 ratio
- On mobile: 2×2 grid or horizontal scroll

### Clue Display
- Year displayed prominently in Cormorant small caps
- Genre in Playfair italic
- Separated by a centered dot (·)
- Below the headshot row

---

## Movie List & Research Data

| # | Movie | Year | Genre | Domestic Box Office | RT Score | Key Cast |
|---|-------|------|-------|-------------------|----------|----------|
| 1 | Sleepless in Seattle | 1993 | Romantic Comedy | $126.7M | 74% | Tom Hanks, Meg Ryan, Ross Malinger, Bill Pullman |
| 2 | You've Got Mail | 1998 | Romantic Comedy | $115.8M | 68% | Tom Hanks, Meg Ryan, Greg Kinnear, Parker Posey |
| 3 | 10 Things I Hate About You | 1999 | Teen Romantic Comedy | $38.2M | 72% | Heath Ledger, Julia Stiles, Joseph Gordon-Levitt, Larisa Oleynik |
| 4 | Clueless | 1995 | Teen Comedy | $56.6M | 81% | Alicia Silverstone, Paul Rudd, Brittany Murphy, Stacey Dash |
| 5 | The Departed | 2006 | Crime Thriller | $132.4M | 91% | Leonardo DiCaprio, Matt Damon, Jack Nicholson, Mark Wahlberg |
| 6 | The Sound of Music | 1965 | Musical Drama | $163.2M (adjusted) | 83% | Julie Andrews, Christopher Plummer, Eleanor Parker |

### Research Notes

**Sleepless in Seattle (1993)**
- Director: Nora Ephron
- Domestic gross: $126,680,884
- RT: 74% (Tomatometer), 72% (Audience Score)
- Cast for headshots: Tom Hanks, Meg Ryan, Rosie O'Donnell, Bill Pullman

**You've Got Mail (1998)**
- Director: Nora Ephron
- Domestic gross: $115,821,495
- RT: 68% (Tomatometer)
- Cast for headshots: Tom Hanks, Meg Ryan, Greg Kinnear, Parker Posey

**10 Things I Hate About You (1999)**
- Director: Gil Junger
- Domestic gross: $38,178,166
- RT: 72% (Tomatometer)
- Note: User wrote "12 Things" — title is actually "10 Things I Hate About You"
- Cast for headshots: Heath Ledger, Julia Stiles, Joseph Gordon-Levitt, Larisa Oleynik

**Clueless (1995)**
- Director: Amy Heckerling
- Domestic gross: $56,631,572
- RT: 81% (Tomatometer)
- Cast for headshots: Alicia Silverstone, Paul Rudd, Brittany Murphy, Stacey Dash

**The Departed (2006)**
- Director: Martin Scorsese
- Domestic gross: $132,384,315
- RT: 91% (Tomatometer)
- Cast for headshots: Leonardo DiCaprio, Matt Damon, Jack Nicholson, Mark Wahlberg

**The Sound of Music (1965)**
- Director: Robert Wise
- Original domestic gross: $163,214,076 (note: this is a 1965 figure — adjusted for inflation it's much higher)
- For "original theatrical run" — use the unadjusted 1965 domestic figure
- RT: 83% (Tomatometer)
- Cast for headshots: Julie Andrews, Christopher Plummer, Eleanor Parker

### Box Office Notes
- All figures are domestic (US + Canada) original theatrical run
- The Sound of Music's figure is from its original 1965 run — with re-releases it's much higher
- Players will guess in dollars — provide reasonable rounding

---

## Input Field Design

### Movie Name (Free Text)
- Standard text input
- Placeholder: "Enter movie title..."
- Case-insensitive matching

### Box Office (Currency)
- Numeric input with `$` prefix
- Format with commas as they type (like v1 podium)
- Placeholder: "$0"
- Accept answers in millions for easier entry? Or raw dollars?
- **Decision**: Let players type raw numbers. Show in millions in the display. Accept answers within a reasonable range of the actual figure for partial credit.

### Rotten Tomatoes Score (Percentage)
- Numeric input with `%` suffix
- Range: 0-100
- Simple integer entry

---

## Scoring

### Point Values
Each movie question is worth up to 300 points:
- Movie name: 100 pts (correct/incorrect, text matched)
- Box office: 100 pts (closest within 20% of actual, or host override)
- RT score: 100 pts (exact or within ±5%, or host override)

### Text Matching (Movie Name)
- Case-insensitive
- Strip "The " prefix
- Common variations accepted:
  - "Sleepless in Seattle" = "sleepless in seattle"
  - "10 Things I Hate About You" = "10 things" = "ten things i hate about you"
  - "You've Got Mail" = "youve got mail"
  - "The Sound of Music" = "sound of music"
  - "The Departed" = "departed"
  - "Clueless" (no common variations)

### Numeric Scoring
- **Box office**: Accept answers within $10M of actual (e.g., for $126.7M, accept $116.7M - $136.7M). Or host can use "closest without going over" for Price is Right feel.
- **RT score**: Accept within ±5 percentage points. Exact = full points, within range = partial.

---

## Image Strategy

### Headshot Sourcing
For each movie, need 3-4 recognizable headshots of the main cast. Options:
1. **Movie stills** — screenshots from the actual film (most recognizable)
2. **Publicity photos** — official press photos from the film's release
3. **Red carpet photos** — contemporary photos of the actors (harder to connect to movie)

**Recommendation**: Use movie stills/publicity photos from the era of the film. This makes it a true identification challenge — "I recognize those faces from *that* era."

### Image Requirements
- Square crop or 3:4 ratio
- Clear, recognizable faces
- 200x200px minimum for crisp display
- Named consistently: `sleepless-1.jpg`, `sleepless-2.jpg`, etc.

---

## Display Mode (Movies)

Shows:
- Large headshot grid (bigger photos for projection)
- Year and genre displayed prominently
- 3 sub-question prompts listed
- After advance: correct movie title, box office, RT score revealed
- Rose-themed decorative elements

---

## Evaluation Mode (Movies)

Shows:
- Headshot grid (smaller) + year/genre
- Correct answers
- Each player's answers side by side
- Text match highlighting for movie name
- Numeric comparison for box office and RT score
- Points awarded per sub-question

---

## Implementation Checklist

- [ ] Verify all box office figures and RT scores (web search closer to party date)
- [ ] Source 3-4 headshot images per movie (18-24 images total)
- [ ] Design polaroid-style headshot component
- [ ] Build question layout with headshot grid + 3 inputs
- [ ] Section intro screen with cinema styling
- [ ] Currency input with $ prefix and comma formatting
- [ ] Percentage input with % suffix
- [ ] Text matching logic for movie names
- [ ] Display mode: large-format headshots + questions
- [ ] Evaluation mode: player answer comparison
- [ ] Film strip / cinema decorative elements
