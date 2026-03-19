# Section 3: Price is Right — Detailed Plan

## Concept

Channel the classic TV game show. For each of Caitlin's milestone childhood ages (5, 7, 9, 11, 13 — corresponding to years 1991, 1993, 1995, 1997, 1999), present 3 items:
1. **The most popular Christmas gift for children that year**
2. **The most popular car sold that year**
3. **The average price of a new home in Arizona that year**

The player guesses the price for each item. Scoring uses **closest without going over** — just like the real show.

This connects to Caitlin's childhood: sick days were spent on the second floor of her mom's pediatric office, watching The Price is Right and yelling guesses at the TV.

---

## Design Theme: "Come On Down!"

### Visual Language
- **Sage green** (`#7A9B6D`) as section accent — money, retro game show
- Retro/70s game show aesthetic layered on the garden party base
- Price tags, dollar signs, starburst shapes
- The LED podium display from v1 (adapted and enhanced)
- Bright, fun energy — this is the most playful section

### Section Intro Screen
```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │                                            │ │
│ │           R O U N D  3  O F  3             │ │
│ │                                            │ │
│ │              $ $ $                         │ │
│ │                                            │ │
│ │        The Price is Right                  │ │
│ │                                            │ │
│ │   On sick days, little Caitlin would       │ │
│ │   curl up on the second floor of her       │ │
│ │   mom's pediatric office and watch         │ │
│ │   The Price is Right, yelling guesses      │ │
│ │   at the TV.                               │ │
│ │                                            │ │
│ │   Now it's your turn. Guess the price      │ │
│ │   — closest without going over wins.       │ │
│ │                                            │ │
│ │   ┌──────────────────────┐                 │ │
│ │   │    Begin Round →     │                 │ │
│ │   └──────────────────────┘                 │ │
│ │                                            │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Question Screen Layout — Year Group
Each year gets a header card, then 3 items within that year.

```
┌────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────┐ │
│ │  $ PRICE IS RIGHT    Q 4 of 15    200 pts  │ │
│ │  ──────────────────────────────────────    │ │
│ │                                            │ │
│ │      ╔════════════════════════════╗        │ │
│ │      ║  1993 — Caitlin was 7      ║        │ │
│ │      ╚════════════════════════════╝        │ │
│ │                                            │ │
│ │   A BRAND NEW CAR!                         │ │
│ │   The best-selling car in America          │ │
│ │   in 1993                                  │ │
│ │                                            │ │
│ │   ┌──────────────────────────────────┐     │ │
│ │   │  ┌────────────────────────────┐  │     │ │
│ │   │  │   $  12,500                │  │     │ │
│ │   │  └────────────────────────────┘  │     │ │
│ │   └──────────────────────────────────┘     │ │
│ │        tap to enter your guess             │ │
│ │                                            │ │
│ │  ← prev                        next →     │ │
│ │  ──────────────────────────────────────    │ │
│ │  ● ● ● ● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○          │ │
│ └────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

### Podium Display (Enhanced from v1)
- Team color replaced with sage green as the podium color
- Dark inner screen with cyan LED numbers
- `$` prefix always visible
- Comma formatting as player types
- Subtle glow animation when focused
- "A BRAND NEW CAR!" / "A NEW HOME!" / item name displayed above in game-show style

---

## Items & Research Data

### Year: 1991 (Caitlin was 5)

| Item Type | Item | Price | Source Notes |
|-----------|------|-------|-------------|
| Christmas Gift | Super Nintendo Entertainment System (SNES) | $199 | Launched August 1991 at $199. THE hot gift that Christmas. |
| Best-Selling Car | Honda Accord | ~$13,270 (base DX) | Best-selling car in US in 1991. MSRP for base DX sedan. |
| AZ Home Price | Average new home in Arizona | ~$92,000 | Based on Census Bureau / FHFA data for Arizona median new home price. |

### Year: 1993 (Caitlin was 7)

| Item Type | Item | Price | Source Notes |
|-----------|------|-------|-------------|
| Christmas Gift | Mighty Morphin Power Rangers Megazord | ~$30 | The must-have toy of Christmas 1993. Massive shortage. |
| Best-Selling Car | Ford Taurus | ~$15,940 (base GL) | Best-selling car in US in 1993. MSRP for base GL sedan. |
| AZ Home Price | Average new home in Arizona | ~$98,000 | |

### Year: 1995 (Caitlin was 9)

| Item Type | Item | Price | Source Notes |
|-----------|------|-------|-------------|
| Christmas Gift | Beanie Babies (original collection) | ~$5 each (retail) | Beanie Babies mania began in 1995. Original retail was $5. |
| Best-Selling Car | Ford Taurus | ~$17,445 (base GL) | Best-selling car again in 1995. |
| AZ Home Price | Average new home in Arizona | ~$108,000 | |

### Year: 1997 (Caitlin was 11)

| Item Type | Item | Price | Source Notes |
|-----------|------|-------|-------------|
| Christmas Gift | Tamagotchi | ~$15-$18 | Virtual pet craze of 1997. Original retail around $15-$18. |
| Best-Selling Car | Toyota Camry | ~$18,218 (base CE) | Best-selling car in US in 1997 (first year Camry took the crown). |
| AZ Home Price | Average new home in Arizona | ~$120,000 | |

### Year: 1999 (Caitlin was 13)

| Item Type | Item | Price | Source Notes |
|-----------|------|-------|-------------|
| Christmas Gift | Pokémon Games/Cards (Pokémon Yellow) | ~$29.99 | Pokémon Yellow released in US Oct 1999. THE gift of that Christmas. |
| Best-Selling Car | Toyota Camry | ~$19,158 (base CE) | Best-selling car in US in 1999. |
| AZ Home Price | Average new home in Arizona | ~$132,000 | |

### Research Status
- **Christmas gifts**: Well-documented in pop culture history. Need to verify specific retail prices.
- **Best-selling cars**: MSRP data available from automotive archives. Need to confirm base model prices.
- **Arizona home prices**: Need Census Bureau / FHFA / NAR data for Arizona-specific average new home prices in each year.

**IMPORTANT**: All prices need to be verified with web research before finalizing. The figures above are approximations from general knowledge and need fact-checking.

---

## Question Flow

15 questions total, organized as 5 year-groups of 3:

```
1991 — Caitlin was 5
  Q1:  Super Nintendo (SNES)           $199
  Q2:  Honda Accord (base DX)          $13,270
  Q3:  New home in Arizona             $92,000

1993 — Caitlin was 7
  Q4:  Power Rangers Megazord          $30
  Q5:  Ford Taurus (base GL)           $15,940
  Q6:  New home in Arizona             $98,000

1995 — Caitlin was 9
  Q7:  Beanie Babies (retail price)    $5
  Q8:  Ford Taurus (base GL)           $17,445
  Q9:  New home in Arizona             $108,000

1997 — Caitlin was 11
  Q10: Tamagotchi                      $18
  Q11: Toyota Camry (base CE)          $18,218
  Q12: New home in Arizona             $120,000

1999 — Caitlin was 13
  Q13: Pokémon Yellow                  $29.99
  Q14: Toyota Camry (base CE)          $19,158
  Q15: New home in Arizona             $132,000
```

---

## Scoring

### Closest Without Going Over (Classic PIR Rules)
- Each item has a correct price
- Player's guess must be ≤ the actual price
- Among all players, the closest guess without going over wins the points
- If everyone goes over, no one gets points for that item (or the closest over gets it — host's call)

### Point Values
- Suggested: **200 points per item** (all equal, 15 items × 200 = 3,000 possible)
- Or vary by difficulty: toys = 100, cars = 200, homes = 300

### In Evaluation Mode
- Show all players' guesses sorted
- Highlight the winner (closest without going over)
- Show the actual price
- Dramatic reveal — show guesses first, then reveal actual price

---

## Design Details

### Year Header Card
- Styled like a game show card
- Bold year number
- "Caitlin was [age]" subtitle
- Sage green accent border
- Slight retro feel (rounded corners, starburst accent)

### Item Presentation
For each item, display:
1. **Item type badge**: "A BRAND NEW CAR!" / "THE HOTTEST TOY!" / "A NEW HOME!"
   - Styled in game-show uppercase with excitement
   - Different icon/color for each type
2. **Item description**: What the item is
3. **Optional image**: Photo of the item (toy, car, house)
4. **Price podium**: The LED-style input from v1

### Item Type Badges
```
🚗  A BRAND NEW CAR!        → sage green badge
🎁  THE HOTTEST TOY!        → gold badge
🏠  A NEW HOME IN ARIZONA!  → rose badge
```

### Podium Input (Reused from v1)
```css
/* Adapted from v1 — team color replaced with sage green */
.podium-display {
  background: var(--sage);  /* was: var(--team-color) */
}
```
- Dark inner screen
- Cyan LED-style numbers (`#40e0d0`)
- `$` prefix
- Comma formatting
- Glow animation on focus

---

## Display Mode (Price is Right)

Shows:
- Year header card (large)
- Item type badge + description
- Optional item image
- "What's the price?" prompt
- After advance: actual price revealed with game-show fanfare styling
- Sage green themed decorations
- Fun: could add a "come on down!" animation on section intro

---

## Evaluation Mode (Price is Right)

Shows:
- Item name + actual price
- All players' guesses in a horizontal bar chart
- Actual price line drawn on the chart
- Players who went over: greyed out / struck through
- Winner highlighted (closest without going over)
- Points awarded

### Evaluation Visualization
```
Actual Price: $199
──────────────────────────────────────
🎭 Collin      $150  ██████████████▓░░░░  ← Winner!
🌸 Sarah       $180  █████████████████░░
🎬 Mike        $250  ████████████████████████  OVER
🦋 Lisa        $100  ████████░░░░░░░░░░░
──────────────────────────────────────
                              $199 ↑
```

---

## Image Strategy

### Toy Images
- Photos of the actual toys from that era
- SNES console, Power Rangers Megazord, Beanie Baby, Tamagotchi, Pokémon Yellow box
- Can source from product photography / press images

### Car Images
- Stock photos or press images of the specific year/model
- 1991 Honda Accord, 1993 Ford Taurus, 1995 Ford Taurus, 1997 Toyota Camry, 1999 Toyota Camry

### Home Images
- Generic Arizona suburban home from the 1990s
- Could use the same image for all 5 years (it's about the price, not the specific house)
- Or find era-appropriate real estate listing photos

---

## Fun Enhancements

### "Come On Down!" Animation
- On section intro: player name + emoji slides in from the side
- Game show audience cheering sound effect (optional)
- Starburst background animation

### Price Reveal
- In evaluation mode, reveal the actual price with a dramatic animation
- Number counts up from 0 to the actual price
- Green flash for closest-without-going-over winner
- Red X for anyone who went over

### Showcase Showdown Feel
- The final item in each year group could get extra dramatic treatment
- Homes are the "big ticket" items — give them extra visual weight

---

## Implementation Checklist

- [ ] Research and verify all 15 prices with sources
  - [ ] 5 Christmas toys with original retail prices
  - [ ] 5 best-selling cars with base MSRP
  - [ ] 5 Arizona average new home prices
- [ ] Design year header card component
- [ ] Design item type badges (car, toy, home)
- [ ] Adapt podium display from v1 (sage green theme)
- [ ] Build question layout with item description + podium
- [ ] Section intro screen with game show styling
- [ ] Source item images (toys, cars, homes — optional)
- [ ] Closest-without-going-over scoring logic
- [ ] Display mode: large-format item + price prompt
- [ ] Evaluation mode: horizontal bar chart with player guesses
- [ ] Price reveal animation
- [ ] Timeline dots for 15 questions (sage green themed)
- [ ] Year group transitions
