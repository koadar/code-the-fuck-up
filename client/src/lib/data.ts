// Hot Rants data
export const hotRants = [
  {
    title: "MICROSERVICES MADE ME HATE LIFE",
    excerpt: "When your \"simple app\" becomes a distributed system nightmare with 37 different services that all hate each other...",
    timeAgo: "3 DAYS AGO",
    heatCount: 437,
    author: {
      name: "Burnout Dev",
      image: "https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
      username: "burnout_dev"
    }
  },
  {
    title: "THEY SAID IT WAS AGILE, WE GOT WHIPLASH",
    excerpt: "Our \"Agile transformation\" turned into a dystopian nightmare of daily standups and zero actual improvements...",
    timeAgo: "5 DAYS AGO",
    heatCount: 891,
    author: {
      name: "Scrum Survivor",
      image: "https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
      username: "scrum_survivor"
    }
  },
  {
    title: "GIT BLAME IS MY THERAPIST",
    excerpt: "When you inherit legacy code that looks like it was written by a sleep-deprived monkey with a keyboard...",
    timeAgo: "1 WEEK AGO",
    heatCount: 563,
    author: {
      name: "Legacy Warrior",
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
      username: "legacy_warrior"
    }
  }
];

// Tech Lies data
export const techLies = [
  {
    title: "THE TECH INFLUENCER LIED AND I BELIEVED IT",
    content: "That LinkedIn guru who claims they \"learned to code in 3 weeks\" and now makes $300k? Yeah, they're selling you a course that will make you neither rich nor a developer.",
    likes: 438
  },
  {
    title: "I PUT 'BLOCKCHAIN' ON MY RESUME AND GOT HIRED",
    content: "A confession and exposé on how clueless recruiters and buzzword-obsessed managers are destroying tech hiring with their meaningless keyword bingo.",
    likes: 756
  }
];

// Cringe Gallery data
export const cringeGallery = [
  {
    title: "\"I TURNED DOWN GOOGLE TO BECOME A THOUGHT LEADER\"",
    description: "This LinkedIn warrior claims they rejected Google to pursue their \"passion\" of creating generic motivational content.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    submittedBy: "truth_bomber"
  },
  {
    title: "\"RESUME LISTS 17 PROGRAMMING LANGUAGES AFTER 6-WEEK BOOTCAMP\"",
    description: "This fresh bootcamp grad claims expert-level knowledge in 17 programming languages, frameworks, and \"the entire AWS stack.\"",
    image: "https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=800",
    submittedBy: "hiring_manager"
  },
  {
    title: "\"HUSTLE-BRO POSTS 100 DAYS OF CODE THREAD WITH NO ACTUAL CODE\"",
    description: "This \"developer advocate\" posted 100 daily motivational quotes and zero lines of actual code in their \"coding journey.\"",
    image: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=800",
    submittedBy: "actual_coder"
  }
];

// Dev Stories data
export const devStories = [
  {
    title: "WHY EVERY DEV SHOULD BREAK PRODUCTION AT LEAST ONCE",
    content: `
      <p>I deleted our production database on my third day. Not a backup. THE database.</p>
      <p>It happened during a "simple schema update." I ran the migration script locally, thought everything was fine, and decided to run it on prod without a backup because I was "confident" and wanted to "move fast."</p>
      <p>Twenty minutes later, the CTO was standing over my desk, both of us staring at the screen. Customer calls were flooding in. The company was losing thousands per minute.</p>
      <p>But here's the fucking plot twist: That catastrophe made me a better engineer than any bootcamp, tutorial, or senior mentoring ever could.</p>
      <p>1. I learned to ALWAYS have backups<br>
      2. I learned how systems are actually connected<br>
      3. I learned crisis management<br>
      4. I learned humility</p>
      <p>Breaking production is the best education you'll never want to pay for.</p>
    `,
    timeAgo: "2 days ago",
    likes: 347,
    comments: 42,
    author: {
      name: "Production Destroyer",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
      username: "prod_destroyer"
    }
  }
];

// Features data
export const features = [
  {
    id: "rage-mode",
    title: "RAGE COMMENT MODE",
    description: "Add profanity-laced reactions to any tech article. Toggle safe mode for SFW environments when your boss walks by.",
    icon: "ri-chat-angry-fill",
    buttonText: "TOGGLE RAGE MODE →"
  },
  {
    id: "resume-builder", 
    title: "REAL RESUME BUILDER",
    description: "Creates a CV that's 80% sarcasm, 20% truth, 100% relatable. Perfect for jobs you want but don't deserve.",
    icon: "ri-file-damage-fill",
    buttonText: "BUILD A TRUTHFUL LIE →"
  },
  {
    id: "linkedin-filter",
    title: "LINKEDIN FILTER",
    description: "Auto-generates sarcastic reactions to buzzword-heavy posts. Bullshit filtering at its finest.",
    icon: "ri-filter-off-fill",
    buttonText: "ACTIVATE CRINGE DETECTOR →"
  },
  {
    id: "deploy-or-die",
    title: "\"DEPLOY OR DIE\" BUTTON",
    description: "Push for a random motivational or dev-spiral quote. Click enough times and something might break.",
    icon: "ri-rocket-fill",
    buttonText: "PRESS AT YOUR OWN RISK →"
  },
  {
    id: "fuckup-generator",
    title: "DAILY FUCK-UP GENERATOR",
    description: "Confessions from devs about their biggest mistakes. Feel better about your own coding disasters.",
    icon: "ri-error-warning-fill",
    buttonText: "GENERATE CATASTROPHE →"
  },
  {
    id: "confession-booth",
    title: "CODE CONFESSION BOOTH",
    description: "Anonymously submit your dev sins. Pushed to prod without tests? We won't judge (but we might laugh).",
    icon: "ri-ghost-fill",
    buttonText: "CONFESS YOUR SINS →"
  }
];

// Anti-Guru data
export const antiGurus = [
  {
    title: "BECOME A 10X DEVELOPER BY JUST SAYING YOU ARE",
    description: "The definitive guide to convincing everyone you're a coding genius without writing a single line of good code.",
    image: "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "How to use meaningless jargon to sound smart",
      "Creating a GitHub profile that looks active but isn't",
      "Advanced LinkedIn humble-bragging techniques",
      "Template for writing Medium articles without substance"
    ],
    price: "$999",
    originalPrice: "$1999",
    buttonText: "WASTE MONEY"
  },
  {
    title: "CRYPTO MASTERY: HOW TO LOSE MONEY WITH CONFIDENCE",
    description: "Learn the art of investing in projects with zero utility, terrible teams, and pretty logos. Poverty guaranteed.",
    image: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    features: [
      "How to FOMO into coins at their all-time high",
      "Ignoring red flags in whitepapers while focusing on buzzwords",
      "Advanced Twitter shilling techniques",
      "How to leverage your house to go all-in on meme coins"
    ],
    price: "0.25 BTC",
    originalPrice: "0.5 BTC",
    buttonText: "LIGHT MONEY ON FIRE"
  }
];
