import { Question, QuestWorld } from '../types';

export const QUEST_WORLDS: QuestWorld[] = [
  {
    id: 'science',
    title: 'Science Lab & Nature',
    description: 'Explore atoms, ecosystems, plants, and human biology!',
    icon: 'FlaskConical',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    stages: [
      { stageNumber: 1, title: 'Cells & Living Organisms', unlocked: true, stars: 0, highScore: 0 },
      { stageNumber: 2, title: 'Forces, Energy & Motion', unlocked: false, stars: 0, highScore: 0 },
      { stageNumber: 3, title: 'States of Matter & Atoms', unlocked: false, stars: 0, highScore: 0 },
    ],
  },
  {
    id: 'space',
    title: 'Cosmic Space Station',
    description: 'Journey through planets, galaxies, black holes, and stars!',
    icon: 'Rocket',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    stages: [
      { stageNumber: 1, title: 'Solar System Neighbors', unlocked: true, stars: 0, highScore: 0 },
      { stageNumber: 2, title: 'Stars & Supernovas', unlocked: false, stars: 0, highScore: 0 },
      { stageNumber: 3, title: 'Black Holes & Galaxies', unlocked: false, stars: 0, highScore: 0 },
    ],
  },
  {
    id: 'history',
    title: 'Time Traveler History',
    description: 'Discover Ancient Egypt, great inventions, and world wonders!',
    icon: 'Hourglass',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    stages: [
      { stageNumber: 1, title: 'Ancient Civilizations & Pyramids', unlocked: true, stars: 0, highScore: 0 },
      { stageNumber: 2, title: 'World Explorers & Silk Road', unlocked: false, stars: 0, highScore: 0 },
      { stageNumber: 3, title: 'Inventions That Changed the World', unlocked: false, stars: 0, highScore: 0 },
    ],
  },
  {
    id: 'math',
    title: 'Math Mountain & Logic',
    description: 'Master fractions, geometry, algebra puzzles, and word problems!',
    icon: 'Calculator',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800',
    stages: [
      { stageNumber: 1, title: 'Fractions, Decimals & Ratios', unlocked: true, stars: 0, highScore: 0 },
      { stageNumber: 2, title: 'Geometry & Angles Adventure', unlocked: false, stars: 0, highScore: 0 },
      { stageNumber: 3, title: 'Algebraic Equations & Patterns', unlocked: false, stars: 0, highScore: 0 },
    ],
  },
];

export const FALLBACK_QUESTIONS: Record<string, Question[]> = {
  'science-1': [
    {
      question: "What is the powerhouse of the cell that generates chemical energy?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Cell Wall"],
      correctIndex: 1,
      explanation: "Mitochondria are known as the powerhouses of the cell because they produce ATP energy!",
      funFact: "Your muscle cells have thousands of mitochondria because they need huge amounts of energy!"
    },
    {
      question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correctIndex: 2,
      explanation: "Plants take in carbon dioxide and sunlight to create their food (glucose) and release oxygen.",
      funFact: "Trees are Earth's natural lungs, producing oxygen for us to breathe every single day."
    },
    {
      question: "What is the hardest natural substance found on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correctIndex: 2,
      explanation: "Diamond is formed under extreme heat and pressure deep within the Earth and is the hardest mineral known.",
      funFact: "Diamonds are made entirely of carbon atoms tightly bonded together!"
    },
    {
      question: "Which blood cells fight off germs, bacteria, and infections in our body?",
      options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
      correctIndex: 1,
      explanation: "White blood cells are the soldiers of our immune system that destroy harmful invaders.",
      funFact: "When you get a cut or infection, your body quickly produces millions of extra white blood cells."
    },
    {
      question: "What temperature does pure water freeze at in Celsius?",
      options: ["100°C", "0°C", "32°C", "-10°C"],
      correctIndex: 1,
      explanation: "Pure water turns into solid ice at 0 degrees Celsius (32 degrees Fahrenheit).",
      funFact: "Water is one of the few substances on Earth that expands when it freezes into ice!"
    }
  ],
  'science-2': [
    {
      question: "What law states that for every action, there is an equal and opposite reaction?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravity"],
      correctIndex: 2,
      explanation: "Newton's Third Law of Motion explains why rockets launch upward when hot gas pushes downward!",
      funFact: "This is how a skateboarder moves forward when pushing backward with their foot."
    },
    {
      question: "What type of energy is stored in a stretched rubber band?",
      options: ["Kinetic Energy", "Potential Energy", "Thermal Energy", "Electrical Energy"],
      correctIndex: 1,
      explanation: "Potential energy is stored energy ready to be released into motion.",
      funFact: "When you let go, that potential energy instantly transforms into kinetic energy (motion)!"
    },
    {
      question: "Which subatomic particle carries a negative electrical charge?",
      options: ["Proton", "Neutron", "Electron", "Nucleus"],
      correctIndex: 2,
      explanation: "Electrons orbit rapidly around the nucleus of an atom and carry a negative electrical charge.",
      funFact: "Electricity flowing through wires is actually trillions of electrons moving together!"
    },
    {
      question: "What is the speed of light in a vacuum approximately?",
      options: ["300,000 km per second", "3,000 km per second", "340 meters per second", "150 million km per hour"],
      correctIndex: 0,
      explanation: "Light travels at about 300,000 kilometers per second—fast enough to circle Earth 7.5 times in one second!",
      funFact: "Sunlight takes about 8 minutes and 20 seconds to travel all the way to Earth."
    },
    {
      question: "What force keeps all planets in orbit around the Sun?",
      options: ["Magnetism", "Gravity", "Friction", "Air Resistance"],
      correctIndex: 1,
      explanation: "Gravity is the invisible force of attraction between massive objects like the Sun and planets.",
      funFact: "Without gravity, Earth would float off into the cold dark emptiness of deep space!"
    }
  ],
  'space-1': [
    {
      question: "Which planet in our solar system is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Saturn"],
      correctIndex: 2,
      explanation: "Mars appears red because its soil contains abundant iron oxide, which is essentially rust!",
      funFact: "Mars has the largest volcano in the solar system, Olympus Mons, which is three times taller than Mount Everest."
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Saturn", "Jupiter", "Neptune", "Earth"],
      correctIndex: 1,
      explanation: "Jupiter is a gas giant so huge that more than 1,300 Earths could fit inside it.",
      funFact: "Jupiter's famous Great Red Spot is a giant storm bigger than Earth that has been raging for hundreds of years."
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      correctIndex: 0,
      explanation: "Mercury is the closest planet to the Sun and experiences extreme temperature swings.",
      funFact: "Despite being closest to the Sun, Venus is actually the hottest planet due to its thick runaway greenhouse effect."
    },
    {
      question: "How many moons does planet Earth have?",
      options: ["None", "One", "Two", "Four"],
      correctIndex: 1,
      explanation: "Earth has exactly one natural satellite called the Moon.",
      funFact: "The Moon causes ocean tides on Earth because of its gravitational pull."
    },
    {
      question: "What galaxy is our Solar System located in?",
      options: ["Andromeda", "Milky Way", "Sombrero", "Triangulum"],
      correctIndex: 1,
      explanation: "We live in the Milky Way Galaxy, a giant spiral galaxy containing over 100 billion stars.",
      funFact: "If you looked at the Milky Way from the outside, it would look like a spinning pinwheel of sparkling stars."
    }
  ],
  'history-1': [
    {
      question: "Which ancient civilization built the famous Great Pyramids and Sphinx?",
      options: ["Ancient Greeks", "Ancient Romans", "Ancient Egyptians", "Ancient Mayans"],
      correctIndex: 2,
      explanation: "Ancient Egyptians built magnificent pyramids along the Nile River over 4,500 years ago as tombs for Pharaohs.",
      funFact: "The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years!"
    },
    {
      question: "Along which famous river did the ancient Mesopotamian civilization flourish?",
      options: ["Nile River", "Tigris and Euphrates", "Amazon River", "Yangtze River"],
      correctIndex: 1,
      explanation: "Mesopotamia, often called the cradle of civilization, grew between the Tigris and Euphrates rivers in the Middle East.",
      funFact: "The word Mesopotamia actually means 'land between the rivers' in ancient Greek."
    },
    {
      question: "What writing system did Ancient Egyptians use, consisting of pictorial symbols?",
      options: ["Cuneiform", "Hieroglyphics", "Alphabet", "Calligraphy"],
      correctIndex: 1,
      explanation: "Hieroglyphics was a complex writing system carved into temple walls and papyrus scrolls using sacred pictures.",
      funFact: "The famous Rosetta Stone helped modern historians finally decode Egyptian hieroglyphics in 1822."
    },
    {
      question: "Which ancient empire built the Colosseum in Rome for gladiator games?",
      options: ["Roman Empire", "Persian Empire", "Ottoman Empire", "British Empire"],
      correctIndex: 0,
      explanation: "Ancient Romans engineered massive stone amphitheaters like the Colosseum that could seat 50,000 spectators.",
      funFact: "Romans invented a special type of concrete so durable that many of their buildings still stand today!"
    },
    {
      question: "Who was the famous queen of Ancient Egypt known for her alliance with Julius Caesar?",
      options: ["Nefertiti", "Cleopatra VII", "Hatshepsut", "Ankhesenamun"],
      correctIndex: 1,
      explanation: "Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt and was renowned for her brilliant intellect.",
      funFact: "Cleopatra spoke nearly nine different languages and was well-versed in mathematics, philosophy, and astronomy."
    }
  ],
  'math-1': [
    {
      question: "What is 3/4 converted into a percentage?",
      options: ["50%", "75%", "25%", "80%"],
      correctIndex: 1,
      explanation: "Three-quarters (3 ÷ 4) equals 0.75, which is 75% when multiplied by 100.",
      funFact: "Fractions and percentages are just different ways of showing parts of a whole!"
    },
    {
      question: "If a triangle has angles measuring 60° and 70°, what is the third angle?",
      options: ["40°", "50°", "60°", "90°"],
      correctIndex: 1,
      explanation: "The sum of all angles in any triangle is always 180°. 180 - (60 + 70) = 50°.",
      funFact: "This triangle is called an acute scalene triangle because all angles are under 90° and all sides have different lengths."
    },
    {
      question: "What is the value of x if 5x + 3 = 18?",
      options: ["x = 2", "x = 3", "x = 4", "x = 5"],
      correctIndex: 1,
      explanation: "Subtract 3 from both sides (5x = 15), then divide by 5 to get x = 3.",
      funFact: "Algebra comes from an Arabic word 'al-jabr' written by mathematician Al-Khwarizmi in the 9th century!"
    },
    {
      question: "What is the area of a rectangle with a length of 8 cm and width of 5 cm?",
      options: ["13 sq cm", "40 sq cm", "26 sq cm", "20 sq cm"],
      correctIndex: 1,
      explanation: "Area of a rectangle is length times width (8 × 5 = 40 square centimeters).",
      funFact: "Area measures the flat surface space inside a 2D shape."
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "14"],
      correctIndex: 2,
      explanation: "12 multiplied by itself (12 × 12) equals 144.",
      funFact: "A number multiplied by itself gives you the square!"
    }
  ]
};
