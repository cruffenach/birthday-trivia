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
    intro: 'Caitlin and Collin have seen an extraordinary number of Broadway shows together — Hamilton, Wicked, Dear Evan Hansen, and so many more. She cries at every single one.',
    instructions: 'Listen to each clip. Name the song, the musical, and the year it debuted on Broadway.'
  },
  {
    id: 'movies',
    name: 'Movies',
    round: 2,
    color: '#C47A8A',
    icon: '🎬',
    intro: 'From wearing out two VHS copies of The Little Mermaid to seeing Sleepless in Seattle approximately 400 times, Caitlin has always been a movie girl.',
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
        badge: 'THE HOTTEST TOY!',
        name: 'Super Soaker 50',
        description: 'The water gun that changed summers forever',
        price: 10
      },
      {
        type: 'car',
        badge: 'A BRAND NEW CAR!',
        name: '1991 Honda Accord DX',
        description: 'The best-selling car in America that year',
        price: 12400
      },
      {
        type: 'home',
        badge: 'A NEW HOME!',
        name: 'Average new home in Arizona',
        description: 'A brand new house in the Grand Canyon State',
        price: 92000
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
        badge: 'THE HOTTEST TOY!',
        name: 'Mighty Morphin Power Rangers Megazord',
        description: 'The must-have action figure of Christmas 1993',
        price: 25
      },
      {
        type: 'car',
        badge: 'A BRAND NEW CAR!',
        name: '1993 Honda Accord DX',
        description: 'The best-selling car in America that year',
        price: 13500
      },
      {
        type: 'home',
        badge: 'A NEW HOME!',
        name: 'Average new home in Arizona',
        description: 'A brand new house in the Grand Canyon State',
        price: 97000
      }
    ]
  },
  {
    id: 'pir3',
    year: 1995,
    age: 9,
    items: [
      {
        type: 'toy',
        badge: 'THE HOTTEST TOY!',
        name: 'Beanie Babies',
        description: 'The stuffed animals that started a collecting craze',
        price: 5
      },
      {
        type: 'car',
        badge: 'A BRAND NEW CAR!',
        name: '1995 Honda Accord DX',
        description: 'The best-selling car in America — three-peat',
        price: 14800
      },
      {
        type: 'home',
        badge: 'A NEW HOME!',
        name: 'Average new home in Arizona',
        description: 'A brand new house in the Grand Canyon State',
        price: 109000
      }
    ]
  },
  {
    id: 'pir4',
    year: 1997,
    age: 11,
    items: [
      {
        type: 'toy',
        badge: 'THE HOTTEST TOY!',
        name: 'Tamagotchi',
        description: 'The virtual pet that needed constant attention',
        price: 18
      },
      {
        type: 'car',
        badge: 'A BRAND NEW CAR!',
        name: '1997 Toyota Camry CE',
        description: 'The best-selling car in America that year',
        price: 15748
      },
      {
        type: 'home',
        badge: 'A NEW HOME!',
        name: 'Average new home in Arizona',
        description: 'A brand new house in the Grand Canyon State',
        price: 120000
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
        badge: 'THE HOTTEST TOY!',
        name: 'Pokémon Trading Cards Starter Set',
        description: 'Gotta catch \'em all — the craze that swept every schoolyard',
        price: 10
      },
      {
        type: 'car',
        badge: 'A BRAND NEW CAR!',
        name: '1999 Toyota Camry CE',
        description: 'The best-selling car in America — again',
        price: 16278
      },
      {
        type: 'home',
        badge: 'A NEW HOME!',
        name: 'Average new home in Arizona',
        description: 'A brand new house in the Grand Canyon State',
        price: 130000
      }
    ]
  }
];
