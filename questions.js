/* ============================================
   Caitlin's 40th Birthday Trivia v2
   Question Data — Updated with verified research
   ============================================ */

var SECTIONS = [
  {
    id: 'broadway',
    name: 'Broadway',
    round: 1,
    color: '#D4A853',
    icon: '✦',
    intro: 'Broadway has been in Caitlin\x27s life forever — as a performer, a devoted audience member, and the person who turned Collin into a Broadway fan. Let\x27s see how well you know the Great White Way.',
    instructions: 'Listen to each clip. Name the song, the musical, and the year it debuted on Broadway.'
  },
  {
    id: 'movies',
    name: 'Movies',
    round: 2,
    color: '#C47A8A',
    icon: '🎬',
    intro: 'Caitlin has always loved movies. But that sweet spot of 90s love-conquers-all mega rom-coms is where it all started. How well do you know some of Caitlin\x27s favorite movies?',
    instructions: 'Look at the cast, the year, and the genre — then name the movie, its box office gross, and its Rotten Tomatoes score.'
  },
  {
    id: 'pir',
    name: 'The Price is Right',
    round: 3,
    color: '#7A9B6D',
    icon: '$',
    intro: 'On sick days, little Caitlin would curl up on the second floor of her mom\'s pediatric office and watch The Price is Right, yelling guesses at the TV.',
    instructions: 'Guess the price — closest without going over wins.'
  }
];

var BROADWAY = [
  {
    id: 'b1',
    audio: 'assets/audio/wicked.m4a',
    song: 'What Is This Feeling?',
    musical: 'Wicked',
    year: 2003,
    fun_fact: 'Caitlin, Charlotte, and Collin saw Wicked together in New York — and now our house is full of Wicked everything. Wicked everything.'
  },
  {
    id: 'b2',
    audio: 'assets/audio/les-mis.m4a',
    song: 'I Dreamed a Dream',
    musical: 'Les Misérables',
    year: 1987,
    fun_fact: 'Les Mis opened on Broadway March 12, 1987 at the Broadway Theatre. It\'s the longest-running musical in West End history and has been seen by over 150 million people in 50+ countries. Susan Boyle\'s 2009 audition of this song became the most-watched YouTube video of the year.'
  },
  {
    id: 'b3',
    audio: 'assets/audio/hamilton.m4a',
    song: 'Satisfied',
    musical: 'Hamilton',
    year: 2015,
    fun_fact: 'Hamilton opened August 6, 2015 at the Richard Rodgers Theatre. Lin-Manuel Miranda first performed an early version of the opening number at the White House in 2009. Obama laughed when he said it was about Alexander Hamilton. Six years later it won 11 Tonys.'
  },
  {
    id: 'b4',
    audio: 'assets/audio/book-of-mormon.m4a',
    song: 'Hello!',
    musical: 'The Book of Mormon',
    year: 2011,
    fun_fact: 'The Book of Mormon opened March 24, 2011 at the Eugene O\'Neill Theatre. It won 9 of its 14 Tony nominations including Best Musical. Trey Parker and Matt Stone wrote it in secret for years — when they announced the project, almost no one believed it would work.'
  },
  {
    id: 'b5',
    audio: 'assets/audio/rent.m4a',
    song: 'Seasons of Love',
    musical: 'Rent',
    year: 1996,
    fun_fact: '"525,600 minutes" — the real number of minutes in a non-leap year. Rent opened on Broadway April 29, 1996 and ran 5,123 performances. Jonathan Larson tragically died the night before its first preview. He never saw his masterpiece open.'
  }
];

var MOVIES = [
  {
    id: 'm1',
    poster: 'assets/images/movies/clueless-poster.png',
    cast: [
      { actor: 'Alicia Silverstone', image: 'assets/images/movies/clueless-silverstone.png' },
      { actor: 'Paul Rudd', image: 'assets/images/movies/clueless-rudd.png' },
      { actor: 'Brittany Murphy', image: 'assets/images/movies/clueless-murphy.png' },
      { actor: 'Stacey Dash', image: 'assets/images/movies/clueless-dash.png' }
    ],
    year: 1995,
    genre: 'Teen Comedy',
    title: 'Clueless',
    box_office: 57,
    rt_score: 82,
    fun_fact: 'Years after his formative performance in Clueless, Caitlin would run into Paul Rudd at Planet Hollywood in Las Vegas. He still looked exactly the same.'
  },
  {
    id: 'm2',
    poster: 'assets/images/movies/departed-poster.png',
    cast: [
      { actor: 'Leonardo DiCaprio', image: 'assets/images/movies/departed-dicaprio.png' },
      { actor: 'Matt Damon', image: 'assets/images/movies/departed-damon.png' },
      { actor: 'Jack Nicholson', image: 'assets/images/movies/departed-nicholson.png' },
      { actor: 'Mark Wahlberg', image: 'assets/images/movies/departed-wahlberg.png' }
    ],
    year: 2006,
    genre: 'Crime Thriller',
    title: 'The Departed',
    box_office: 132,
    rt_score: 91,
    fun_fact: 'Martin Scorsese finally won his first Best Director Oscar for this film. Jack Nicholson improvised constantly — including pulling out a gun during a scene, which genuinely terrified DiCaprio.'
  },
  {
    id: 'm3',
    poster: 'assets/images/movies/sleepless-poster.png',
    cast: [
      { actor: 'Tom Hanks', image: 'assets/images/movies/sleepless-hanks.png' },
      { actor: 'Meg Ryan', image: 'assets/images/movies/sleepless-ryan.png' },
      { actor: 'Bill Pullman', image: 'assets/images/movies/sleepless-pullman.png' },
      { actor: 'Rosie O\'Donnell', image: 'assets/images/movies/sleepless-odonnell.png' }
    ],
    year: 1993,
    genre: 'Romantic Comedy',
    title: 'Sleepless in Seattle',
    box_office: 127,
    rt_score: 75,
    fun_fact: 'Tom Hanks and Meg Ryan share roughly 2 minutes of screen time together in the entire film. They don\'t speak to each other until the final scene atop the Empire State Building.'
  },
  {
    id: 'm4',
    poster: 'assets/images/movies/10things-poster.png',
    cast: [
      { actor: 'Heath Ledger', image: 'assets/images/movies/10things-ledger.png' },
      { actor: 'Julia Stiles', image: 'assets/images/movies/10things-stiles.png' },
      { actor: 'Joseph Gordon-Levitt', image: 'assets/images/movies/10things-jgl.png' },
      { actor: 'Larisa Oleynik', image: 'assets/images/movies/10things-oleynik.png' }
    ],
    year: 1999,
    genre: 'Teen Romantic Comedy',
    title: '10 Things I Hate About You',
    box_office: 38,
    rt_score: 71,
    fun_fact: 'Based on Shakespeare\'s The Taming of the Shrew. Heath Ledger\'s singing-and-dancing scene on the bleachers was done in one take — the marching band wasn\'t told what was happening.'
  },
  {
    id: 'm5',
    poster: 'assets/images/movies/soundofmusic-poster.png',
    cast: [
      { actor: 'Julie Andrews', image: 'assets/images/movies/soundofmusic-andrews.png' },
      { actor: 'Christopher Plummer', image: 'assets/images/movies/soundofmusic-plummer.png' },
      { actor: 'Eleanor Parker', image: 'assets/images/movies/soundofmusic-parker.png' },
      { actor: 'Richard Haydn', image: 'assets/images/movies/soundofmusic-haydn.png' }
    ],
    year: 1965,
    genre: 'Musical Drama',
    title: 'The Sound of Music',
    box_office: 163,
    rt_score: 83,
    fun_fact: 'Christopher Plummer famously disliked the film, calling it "The Sound of Mucus." Despite this, it became the highest-grossing film of 1965 and held the all-time record until The Godfather.'
  },
  {
    id: 'm6',
    poster: 'assets/images/movies/youvegotmail-poster.png',
    cast: [
      { actor: 'Tom Hanks', image: 'assets/images/movies/youvegotmail-hanks.png' },
      { actor: 'Meg Ryan', image: 'assets/images/movies/youvegotmail-ryan.png' },
      { actor: 'Greg Kinnear', image: 'assets/images/movies/youvegotmail-kinnear.png' },
      { actor: 'Parker Posey', image: 'assets/images/movies/youvegotmail-posey.png' }
    ],
    year: 1998,
    genre: 'Romantic Comedy',
    title: "You've Got Mail",
    box_office: 116,
    rt_score: 69,
    fun_fact: 'Nora Ephron directed both this and Sleepless in Seattle — making it the second Hanks-Ryan pairing. The AOL "You\'ve Got Mail" sound effect was used so many times during filming that the crew started groaning.'
  }
];

var PRICE_IS_RIGHT = [
  {
    id: 'pir1',
    year: 1991,
    age: 5,
    items: [
      {
        type: 'toy',
        badge: 'THE HOTTEST TOY\!',
        name: 'Super Nintendo (SNES)',
        image: 'assets/images/pir/super-nintendo.png',
        description: 'The #1 Christmas gift of 1991',
        price: 199.95,
        fun_fact: 'Lonnie Johnson, a NASA engineer, invented the Super Soaker by accident while working on a heat pump. Larami sold 27 million of them at $10 each in the first three years.'
      }
    ]
  },
  {
    id: 'pir2',
    year: 1993,
    age: 7,
    items: [
      {
        type: 'toy',
        badge: 'THE HOTTEST TOY\!',
        name: 'Samantha American Girl Doll',
        image: 'assets/images/pir/samantha.png',
        description: 'This was Caitlin\x27s American Girl doll. Now Charlotte is carrying on the tradition.',
        price: 65,
        fun_fact: 'Samantha was Caitlin\x27s American Girl doll. Samantha, Kirsten, and Molly were the original three dolls, launched in 1986 — the same year Caitlin was born.'
      }
    ]
  },
  {
    id: 'pir3',
    year: 1995,
    age: 9,
    items: [
      {
        type: 'home',
        badge: 'A NEW HOME\!',
        name: 'Average new home in Arizona',
        image: 'assets/images/pir/house.png',
        description: 'A brand new house in the Grand Canyon State',
        price: 79700,
        fun_fact: 'That same house in Arizona today would cost you about $450,000. The 90s were a different time.'
      }
    ]
  },
  {
    id: 'pir4',
    year: 1997,
    age: 11,
    items: [
      {
        type: 'car',
        badge: 'A BRAND NEW CAR\!',
        name: '1997 Toyota Camry CE',
        image: 'assets/images/pir/camry.png',
        description: 'The best-selling car in America that year — and Caitlin\x27s ride most of the time',
        price: 16608,
        fun_fact: 'Years later, a blue Toyota Camry would become the car Charlotte spent her childhood in. That, and the Mazda minivan — affectionately known as "The Ban."'
      }
    ]
  },
  {
    id: 'pir5',
    year: 1999,
    age: 13,
    items: [
      {
        type: 'toy',
        badge: 'A BRAND NEW CD\!',
        name: "No Doubt Concert Ticket",
        image: 'assets/images/pir/no-doubt.png',
        description: "Caitlin's first concert was No Doubt. What did a ticket cost?",
        price: 22.50,
        fun_fact: "Caitlin went to her very first concert with her dad and her best friend Amanda — No Doubt on the Tragic Kingdom tour. She was thirteen. Gwen Stefani was on that stage and it was everything."
      }
    ]
  }
];
