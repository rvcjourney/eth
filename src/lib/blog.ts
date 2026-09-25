// Blog posts, written to rank for the searches Pune clients actually make.
// Static like the rest of the site content: no database, no CMS.
//
// `keyword` is the search each post targets. It is not printed anywhere; it exists so that
// whoever edits a post can see what it was written to rank for and keep it on topic.

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description and the card summary on the index. Keep under ~155 characters. */
  description: string;
  keyword: string;
  date: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  intro: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-choose-an-interior-designer-in-pune',
    title: 'How to Choose an Interior Designer in Pune',
    description:
      'What to ask, what to look for in a portfolio and which warning signs matter when picking an interior designer in Pune.',
    keyword: 'interior designers in Pune',
    date: '2026-09-25',
    readingMinutes: 6,
    image: '/images/portfolio/opulence-and-elegance/01.jpg',
    imageAlt: 'Living and dining interior with marble flooring by Ethereal Spaces',
    intro:
      'Most people hire an interior designer once or twice in a lifetime, which makes it hard to know what a good one looks like. The work is largely invisible until it is finished, and by then the money is spent. These are the questions worth asking before you sign anything.',
    sections: [
      {
        heading: 'Look at completed work, not only renders',
        paragraphs: [
          'A 3D render shows what a studio can imagine. A photograph of a finished room shows what it can actually deliver. Any studio can produce a beautiful visualisation; far fewer can hand over a space that matches it.',
          'Ask to see both for the same project. The gap between the render and the photograph tells you more about a studio than either image alone. A small gap means the drawings were accurate and the site work was supervised.',
        ],
      },
      {
        heading: 'Ask who is on site, and how often',
        paragraphs: [
          'This is where most interior projects go wrong in Pune. The design is agreed, the contract is signed, and then the studio hands the drawings to a contractor and steps back. False ceilings get built a few inches off, joinery comes back in the wrong finish, and nobody notices until the client does.',
          'Ask directly: who visits the site, how often, and who you call when something looks wrong. A studio that stays involved through ceilings, carpentry and finishes will tell you plainly. One that does not will change the subject.',
        ],
      },
      {
        heading: 'Check that the drawings exist',
        paragraphs: [
          'Before any work begins you should have floor plans, furniture layouts, wall elevations with dimensions, and schedules for materials, finishes and lighting. These are what a carpenter and an electrician actually build from.',
          'If a studio cannot show you the drawing set from a past project, the details on your site will be decided by whoever is holding the tools that day.',
        ],
      },
      {
        heading: 'Questions worth asking at the first meeting',
        list: [
          'Can I see photographs of a completed project, not just renders?',
          'Who supervises the site, and how often do they visit?',
          'What drawings will I receive before work starts?',
          'How are changes during execution costed?',
          'What is included in the quote, and what is billed separately?',
          'Can I speak to a client from a project you finished last year?',
        ],
      },
      {
        heading: 'Warning signs',
        paragraphs: [
          'A quote with a single lump-sum figure and no breakdown makes it impossible to tell what you are paying for, or to compare studios fairly. A designer who agrees to every request without pushing back is unlikely to be thinking about how the space will work in five years. And a studio that cannot name the specific materials it plans to use has not finished designing.',
        ],
      },
    ],
  },
  {
    slug: 'what-shapes-an-interior-design-quote-in-pune',
    title: 'What Shapes an Interior Design Quote in Pune',
    description:
      'Why two interior design quotes for the same flat can differ enormously, and how to read what you are actually being charged for.',
    keyword: 'interior design cost in Pune',
    date: '2026-09-25',
    readingMinutes: 7,
    image: '/images/portfolio/marble-and-walnut-home/01.jpg',
    imageAlt: 'Marble and walnut interior detail by Ethereal Spaces',
    intro:
      'Two studios can quote very different numbers for the same flat and both can be honest. The difference usually sits in what each quote includes, not in one being overpriced. Understanding the variables lets you compare quotes properly instead of picking the lowest.',
    sections: [
      {
        heading: 'Carpentry is usually the largest line',
        paragraphs: [
          'Wardrobes, kitchen units, TV panelling, beds with storage, pooja units and any other built-in joinery typically account for the biggest share of an interior budget. The carcass material alone moves the figure substantially, and so does the hardware inside.',
          'When comparing quotes, check that both specify the same board, the same shutter finish and the same hinges and channels. A quote that just says "wardrobe" is not comparable to one that names the material and brand.',
        ],
      },
      {
        heading: 'Scope, not size, drives the number',
        paragraphs: [
          'A large flat with simple finishes can cost less than a small one with detailed joinery, a layered false ceiling and stone cladding. Square footage is a poor predictor on its own.',
          'What actually moves the figure is how much of the space is being built rather than furnished, and how much of the existing structure is being changed.',
        ],
      },
      {
        heading: 'The variables that change the figure most',
        list: [
          'How much built-in carpentry the design calls for',
          'Board and shutter specification, and the hardware inside',
          'Whether false ceilings are flat or layered, and the lighting within them',
          'Flooring: retaining the existing floor versus laying stone or tile',
          'Whether plumbing or electrical points are being moved',
          'Stone, cladding and feature walls',
          'Whether loose furniture and soft furnishings are in scope',
        ],
      },
      {
        heading: 'Design fee and execution are separate things',
        paragraphs: [
          'Some studios charge a design fee and hand you the drawings to execute yourself. Others quote a turnkey figure covering design, materials, labour and supervision through to handover. Both are legitimate, but comparing one against the other tells you nothing.',
          'Establish which model each quote uses before you compare the totals.',
        ],
      },
      {
        heading: 'Where budgets slip',
        paragraphs: [
          'Changes made after work starts are the usual cause. Moving a socket once the wall is closed, changing a shutter finish after the boards are cut, or adding storage late all carry a cost that was not in the original figure.',
          'This is the argument for spending longer on the drawings. Every decision settled on paper is one that will not be settled expensively on site.',
        ],
      },
      {
        heading: 'Ask for the breakdown',
        paragraphs: [
          'A quote should be itemised by area and by work type, so you can see what the kitchen costs against the bedrooms, and what carpentry costs against civil work. That structure also lets you reduce the budget deliberately, by dropping a specific item rather than asking for a vague discount.',
        ],
      },
    ],
  },
  {
    slug: '2d-drawings-and-3d-renders-explained',
    title: '2D Drawings and 3D Renders: What You See Before Work Begins',
    description:
      'The difference between technical drawings and 3D visualisation, and why a project needs both before the first wall is touched.',
    keyword: '3D interior design Pune',
    date: '2026-09-25',
    readingMinutes: 5,
    image: '/images/portfolio/drawings/bedroom-elevation.webp',
    imageAlt: 'Bedroom elevation drawing with material and lighting schedules',
    intro:
      'Clients often ask for 3D renders and assume that is the design. The renders are what you look at; the 2D drawings are what gets built. A project needs both, and they do entirely different jobs.',
    sections: [
      {
        heading: 'What a 3D render is for',
        paragraphs: [
          'A render answers the question "what will this feel like?" It shows proportion, light, material and colour together, in a way no floor plan can. It is how you discover that the wood you liked on a sample board reads too dark across an entire wall.',
          'That is its real value: it lets you change your mind before anything is cut. Reviewing materials and lighting in a render costs nothing. Discovering the same problem after installation costs a great deal.',
        ],
      },
      {
        heading: 'What 2D drawings are for',
        paragraphs: [
          'The drawing set is the instruction manual for the people doing the work. It carries the dimensions a carpenter cuts to, the positions an electrician wires to, and the finishes a painter mixes.',
          'A complete set includes floor plans and furniture layouts, wall elevations with dimensions, door and joinery details, washroom layouts, and schedules for materials, finishes and lighting.',
        ],
      },
      {
        heading: 'Why renders alone are not enough',
        paragraphs: [
          'A render has no dimensions. Nothing in it tells a carpenter how deep the wardrobe is, how high the loft sits, or where the shutter line falls. Handed only a render, the site team estimates, and estimates vary from person to person.',
          'This is the most common reason a finished room does not look like the image the client approved. It is rarely bad workmanship; it is usually missing information.',
        ],
      },
      {
        heading: 'What to ask for before work starts',
        list: [
          'Floor plan with furniture layout',
          'Wall elevations with dimensions for every built-in item',
          'Door, joinery and washroom details',
          'Electrical layout showing switches, sockets and light positions',
          'False ceiling layout with lighting',
          'Material, finish and lighting schedules',
        ],
      },
      {
        heading: 'The sequence that works',
        paragraphs: [
          'Plan the layout first, agree the palette and materials, then render so you can see the result, then produce the technical drawings from the approved design. Renders made before the layout is settled tend to be redone. Drawings made before the materials are chosen tend to be incomplete.',
        ],
      },
    ],
  },
  {
    slug: 'colour-palettes-that-work-in-pune-homes',
    title: 'Three Colour Palettes That Work in Pune Homes',
    description:
      'Warm neutrals, sage and charcoal, stone and walnut: three palettes suited to Pune light, with notes on where each one works.',
    keyword: 'home interior colour palette',
    date: '2026-09-25',
    readingMinutes: 5,
    image: '/images/portfolio/refined-comfort/01.jpg',
    imageAlt: 'Interior in warm neutral tones by Ethereal Spaces',
    intro:
      'Colour behaves differently in different light. Pune gets strong, warm daylight for most of the year, which flatters some palettes and drains others. These are three we return to, and what each one is good for.',
    sections: [
      {
        heading: 'Warm neutrals',
        paragraphs: [
          'Soft greys warming into clay and deep brown. This palette holds up under strong daylight without looking washed out, and it stays calm under warm artificial light in the evening.',
          'It suits living and dining spaces, and it is forgiving: because the tones sit close together, furniture and art in almost any wood or metal will find a place in it.',
        ],
      },
      {
        heading: 'Sage and charcoal',
        paragraphs: [
          'Pale green-greys against a deep charcoal, with a true green in between. Cooler than warm neutrals, and the most restful of the three.',
          'It works well in bedrooms and in rooms that face strong afternoon sun, where a warm palette can feel heavy. The charcoal gives it enough weight to avoid looking washed out.',
        ],
      },
      {
        heading: 'Stone and walnut',
        paragraphs: [
          'A light stone grey, a mid brown and a deep walnut. The most architectural of the three, and the one that depends most on materials rather than paint.',
          'It suits spaces with real stone or timber and rewards restraint elsewhere: with only three tones, texture does the work that colour would otherwise do.',
        ],
      },
      {
        heading: 'Choosing between them',
        paragraphs: [
          'Start with the light your rooms actually get, not with a picture you liked. A north-facing room takes warmth well; a west-facing room that heats up through the afternoon usually reads better cooler.',
          'Then test properly. Paint a large sample directly on the wall, not on a card, and look at it in the morning, in the afternoon and under your own lights at night. Colours shift more between those three moments than most people expect.',
        ],
      },
      {
        heading: 'Materials matter more than the paint',
        paragraphs: [
          'A palette is not only wall colour. Textured plaster, soft ivory, brushed metal, natural wood and stone each carry the same colour differently, because each one handles light differently.',
          'This is why a palette should be chosen alongside the materials rather than before them. The same brown reads warm in oak and cold in laminate.',
        ],
      },
    ],
  },
  {
    slug: 'restaurant-and-cafe-interior-design-in-pune',
    title: 'Restaurant and Café Interior Design in Pune',
    description:
      'What separates a restaurant interior that works from one that only photographs well: seating density, acoustics, lighting and service flow.',
    keyword: 'restaurant interior designers in Pune',
    date: '2026-09-25',
    readingMinutes: 6,
    image: '/images/portfolio/the-dramatic-vibe/01.jpg',
    imageAlt: 'Restaurant and bar interior by Ethereal Spaces',
    intro:
      'A restaurant interior has to do something a home never does: earn money. Every design decision either helps the covers turn or gets in the way, and the ones that look best in photographs are not always the ones that work at full capacity on a Saturday.',
    sections: [
      {
        heading: 'Seating density decides the economics',
        paragraphs: [
          'The number of covers you can seat comfortably sets the ceiling on what the space can earn. Too few and the rent does not work; too many and guests feel crowded and leave sooner.',
          'This has to be resolved at layout stage, before anything else is decided, because it determines the size of the kitchen, the width of the service routes and the position of everything else.',
        ],
      },
      {
        heading: 'Acoustics are the most common failure',
        paragraphs: [
          'Hard floors, glass, exposed ceilings and bare walls together produce a room where nobody can hold a conversation once it fills up. Guests do not usually complain about acoustics; they just do not come back.',
          'Soft surfaces need to be designed in from the start: upholstery, fabric panels, acoustic treatment above the ceiling line, planting. Added afterwards, they look like an afterthought.',
        ],
      },
      {
        heading: 'Lighting changes through the day',
        paragraphs: [
          'A café that serves breakfast and then becomes a bar at night needs two different lighting schemes in the same room. That means layered, separately controlled circuits rather than one bright setting.',
          'Getting this right also means the space photographs well at any hour, which matters more than most owners expect when guests are the ones taking the photographs.',
        ],
      },
      {
        heading: 'Design for the staff, not only the guests',
        list: [
          'Service routes wide enough to pass with full trays',
          'Server stations near the tables they serve',
          'A kitchen pass that does not open onto the dining room',
          'Bar layout that lets two people work without colliding',
          'Storage close to where stock is actually used',
          'Surfaces that survive daily cleaning',
        ],
      },
      {
        heading: 'Plan for wear',
        paragraphs: [
          'A restaurant takes more physical abuse in a year than a home does in a decade. Chair legs against walls, spills on upholstery, constant cleaning on every surface.',
          'Choosing finishes that age well, and keeping spare material from the original batch for repairs, is what keeps the room looking new in year three rather than tired.',
        ],
      },
    ],
  },
  {
    slug: 'turnkey-interiors-from-site-to-handover',
    title: 'Turnkey Interiors: What Happens Between Design and Handover',
    description:
      'What turnkey interiors actually cover, the order the work runs in, and what to check before you accept handover.',
    keyword: 'turnkey interior contractors in Pune',
    date: '2026-09-25',
    readingMinutes: 6,
    image: '/images/portfolio/site-work/08.jpg',
    imageAlt: 'False ceiling framing during site work by Ethereal Spaces',
    intro:
      '"Turnkey" means you receive a finished space rather than a set of drawings and a list of contractors to chase. The word is used loosely, so it is worth establishing exactly what a given studio includes before you sign.',
    sections: [
      {
        heading: 'What turnkey should cover',
        paragraphs: [
          'Design and drawings, material selection and procurement, all site work through to finishes, coordination of every trade, and supervision until handover. You deal with one party rather than with a carpenter, an electrician, a painter and a stone supplier separately.',
          'What varies between studios is whether loose furniture, soft furnishings, appliances and styling are included. Ask specifically.',
        ],
      },
      {
        heading: 'The order the work runs in',
        list: [
          'Demolition and any civil changes',
          'Plumbing and electrical routing, before walls are closed',
          'False ceiling framing and the lighting inside it',
          'Flooring and stone',
          'Carpentry and joinery installation',
          'Painting and wall finishes',
          'Fixtures, fittings and hardware',
          'Deep clean, snagging and handover',
        ],
      },
      {
        heading: 'Why sequence matters to you',
        paragraphs: [
          'Each stage closes off the one before it. Once the false ceiling is boarded, moving a light means opening it again. Once the flooring is laid, changing the layout means lifting it.',
          'This is why decisions get progressively more expensive as a project advances, and why the drawing stage deserves more of your attention than it usually gets.',
        ],
      },
      {
        heading: 'What to check before you accept handover',
        list: [
          'Every drawer and shutter opens, closes and aligns',
          'Every switch, socket and light works, and is labelled correctly',
          'No water pooling in washrooms or balconies; drainage falls correctly',
          'Paint finish is even under daylight and under artificial light',
          'Skirting, beading and edge banding are continuous with no gaps',
          'Silicone and grout lines are clean',
          'Spare tiles, laminate and paint from the original batch are handed over',
        ],
      },
      {
        heading: 'Snagging is normal',
        paragraphs: [
          'No site finishes without a list. A studio that expects a snag list and works through it methodically is behaving normally; one that treats the list as an accusation is not.',
          'Walk the space slowly, in daylight, with the list in hand. Small defects are easy to fix in the week after handover and awkward to fix six months later.',
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
