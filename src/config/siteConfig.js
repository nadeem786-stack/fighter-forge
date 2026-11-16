/**
 * FIGHTER FORGE - MASTER SITE CONFIGURATION
 * 
 * ALL business-editable values are located in this ONE file.
 * Modify WhatsApp number, products, pricing, sizes, heights, stories,
 * and company details below without touching application code.
 */

export const siteConfig = {
  // ==========================================
  // BUSINESS DETAILS
  // ==========================================
  brandName: "FIGHTER FORGE",
  tagline: "BUILT FOR CHAMPIONS.",
  subTagline: "Premium Boxing Rings & MMA Cages built to BFI and World Boxing standards. Manufactured for fighters, gyms, and pro events with heavy-gauge steel, competition-grade padding, and direct factory pricing.",
  whatsappNumber: "+917838966576", // Official WhatsApp Number: +91 78389 66576
  email: "sales@fighterforge.com",
  phoneDisplay: "+91 78389 66576",
  address: {
    line1: "Fighter Forge Manufacturing Arena",
    line2: "Plot 88, Heavy Industrial Cluster, Phase II",
    city: "New Delhi",
    country: "India",
    pin: "110020"
  },
  socials: {
    instagram: "https://instagram.com/fighterforge",
    youtube: "https://youtube.com/@fighterforge",
    facebook: "https://facebook.com/fighterforge",
    linkedin: "https://linkedin.com/company/fighterforge"
  },
  communityWhatsappGroup: "https://chat.whatsapp.com/invite/FighterForgeInsidersPlaceholder",

  // ==========================================
  // BRAND COLORS & VISUAL TOKENS
  // ==========================================
  colors: {
    fightRed: "#E10B1F",
    deepBlack: "#0A0A0A",
    charcoal: "#1A1A1A",
    pureWhite: "#FFFFFF",
    steelGray: "#8C8C8C",
    forgeGold: "#C9A24B",
    charcoalDark: "#121212",
    charcoalLight: "#262626"
  },

  // ==========================================
  // BRAND COPY & SLOGANS
  // ==========================================
  slogans: [
    "BUILT FOR CHAMPIONS",
    "FORGED FOR THE FIGHT",
    "DISCIPLINE BUILDS CHAMPIONS",
    "THE ARENA STARTS HERE",
    "NO COMPROMISE. NO SHORTCUTS"
  ],

  // ==========================================
  // ELEVATION HEIGHT STANDARDS
  // ==========================================
  elevationStandards: {
    floor: {
      id: "floor",
      name: "Floor-Level",
      heightDescription: "0 ft (Flush ground mounting)",
      badge: "Gym & Sparring",
      badgeColor: "steel",
      description: "Direct ground bolt-down system. Low profile, fast installation, ideal for standard ceiling heights and heavy daily sparring."
    },
    training: {
      id: "1-2ft",
      name: "1–2 ft Elevated",
      heightDescription: "1–2 ft (≈30–60 cm)",
      badge: "Training & Event",
      badgeColor: "red",
      description: "Intermediate elevated arena feel. Superior spectator visibility, rigid steel substructure, ideal for showcase gyms, fight nights, and club competitions."
    },
    pro: {
      id: "3ft",
      name: "3 ft (≈100 cm)",
      heightDescription: "3 ft (≈100 cm) Official Pro Level",
      badge: "PRO COMPETITION HEIGHT",
      badgeColor: "gold",
      isPro: true,
      description: "Official sanctioning-body championship elevation. Engineered with multi-truss acoustic absorption, dual safety stairs, and judges platform mount points."
    }
  },

  // ==========================================
  // STATS (ANIMATED COUNTERS ON HOME)
  // ==========================================
  stats: [
    { label: "Years of Experience", value: 20, suffix: "+", description: "Heavy steel combat arena engineering & fabrication" },
    { label: "Arenas & Pro Championship Builds", value: 120, suffix: "+", description: "Sanctioned MMA & Boxing title fights and pro gyms outfitted" },
    { label: "Structural Steel Grade", value: 100, suffix: "%", description: "Heavy-gauge ISI certified high-tensile steel" },
    { label: "Customer Satisfaction", value: 99.8, suffix: "%", description: "Direct-from-factory warranty & support" }
  ],

  // ==========================================
  // CLIENT LOGOS (MOVING STRIP ON HOMEPAGE)
  // ==========================================
  clients: [
    { name: "APEX COMBAT CLUB", city: "Mumbai", category: "Pro MMA Gym" },
    { name: "IRON FIST BOXING ACADEMY", city: "Delhi NCR", category: "Elite Boxing" },
    { name: "TITAN FIGHT LEAGUE", city: "Bangalore", category: "Championship Promotion" },
    { name: "REDLINE COMBAT SPORTS", city: "Hyderabad", category: "Combat Arena" },
    { name: "STRIKE FORCE ARENA", city: "Pune", category: "Fight Training Center" },
    { name: "VALOR WARRIORS MMA", city: "Chandigarh", category: "Championship Cage" },
    { name: "BLACK BELT SANCTUARY", city: "Goa", category: "Combat Academy" },
    { name: "RUMBLE TITLE FIGHTS", city: "Kolkata", category: "Boxing Promotion" }
  ],

  // ==========================================
  // WHY FIGHTER FORGE (6 FEATURE BLOCKS)
  // ==========================================
  whyUs: [
    {
      icon: "ShieldAlert",
      title: "PRO-GRADE STEEL BUILD",
      description: "Constructed with cold-rolled, heavy-gauge structural steel tubes. Zero wobble, rock-solid anchor posts designed to withstand heavyweight world-class impact."
    },
    {
      icon: "Award",
      title: "COMPETITION-STANDARD SPECS",
      description: "Manufactured strictly adhering to Olympic Boxing, IBA, and Unified Rules of MMA dimensions, rope tensions, and safety clearances."
    },
    {
      icon: "Layers",
      title: "FLOOR & ELEVATED OPTIONS",
      description: "Available from space-saving floor-level setups up to our flagship 3 ft (100 cm) Pro Competition stage with vibration dampening."
    },
    {
      icon: "Palette",
      title: "FULLY CUSTOMIZABLE BRANDING",
      description: "Your gym logo printed high-contrast onto anti-slip canvas, corner pads, vinyl cage rail bumpers, and ring skirts. Own your arena."
    },
    {
      icon: "ShieldCheck",
      title: "SAFE PADDED FINISH",
      description: "High-density bonded EVA foam underlayment and heavy-duty ripstop vinyl cushions protect fighters' joints during heavy throws and takedowns."
    },
    {
      icon: "DollarSign",
      title: "DIRECT-FROM-FACTORY PRICING",
      description: "We manufacture every weld, bolt, canvas, and pad in-house. No reseller markups, no agency margins—pure direct factory value."
    }
  ],

  // ==========================================
  // HOW IT WORKS (4 STEPS)
  // ==========================================
  howItWorks: [
    {
      step: "01",
      title: "CHOOSE YOUR SETUP",
      description: "Select Boxing Ring or MMA Cage, pick your size, and choose floor-level or elevated height (1-2 ft or 3 ft Pro)."
    },
    {
      step: "02",
      title: "ADD TO ENQUIRY CART",
      description: "Bundle multiple arena units or gear items into your enquiry cart with your preferred quantities."
    },
    {
      step: "03",
      title: "SEND ON WHATSAPP",
      description: "Click once to dispatch your exact specifications, gym location, and custom requests directly to our head engineer's WhatsApp."
    },
    {
      step: "04",
      title: "GET PRICE & CONFIRM",
      description: "Receive instant factory pricing, floor-plan CAD blueprints, delivery timeline, and direct manufacturing confirmation."
    }
  ],

  // ==========================================
  // PRODUCT CATALOG: BOXING RINGS
  // ==========================================
  boxingRings: [
    {
      id: "ring-floor-01",
      name: "Floor Boxing Ring",
      category: "floor",
      tagline: "Low-Profile Daily Training & Hard Sparring Ring",
      price: "From ₹1.40 L",
      priceDisplay: "From ₹1.40 L",
      priceNumeric: 140000,
      image: "./assets/ring-floor-01.webp",
      images: ["./assets/ring-floor-01.webp"],
      badge: "POPULAR FOR GYMS",
      elevationType: "Floor-Level",
      elevationHeight: "0 ft (Flush ground frame)",
      sizes: ["12×12 ft", "14×14 ft", "16×16 ft"],
      defaultSize: "14×14 ft",
      sizePrices: {
        "12×12 ft": { priceDisplay: "₹1.40 L", priceNumeric: 140000 },
        "14×14 ft": { priceDisplay: "₹1.50 L", priceNumeric: 150000 },
        "16×16 ft": { priceDisplay: "₹1.70 L", priceNumeric: 170000 }
      },
      specs: [
        "Heavy-duty 4-inch square steel corner posts",
        "4-strand synthetic leather wrapped competition ropes",
        "4 heavy corner cushions (1 Red, 1 Blue, 2 White/Black)",
        "Heavy duty turnbuckles with protective padded sleeves",
        "Anti-slip commercial heavy canvas with grommets",
        "Floor bolt anchoring hardware included"
      ],
      description: "Designed for gyms wanting pro boxing ring authenticity without requiring elevated structural clearance. Features our signature high-tensile 4-rope system and thick padded corner cushions."
    },
    {
      id: "ring-elevated-training-02",
      name: "Elevated Boxing Ring (1–2 ft)",
      category: "elevated",
      tagline: "Showcase Gym & Club Fight Night Elevation (45.72 cm – 60 cm)",
      price: "From ₹2.00 L",
      priceDisplay: "From ₹2.00 L",
      priceNumeric: 200000,
      image: "./assets/ring-elevated-1-2ft.webp",
      images: ["./assets/ring-elevated-1-2ft.webp"],
      badge: "1–2 FT EVENT ELEVATION",
      elevationType: "1–2 ft Elevated (Low 45.72–60 cm)",
      elevationHeight: "1–2 ft (45.72 cm – 60 cm)",
      sizes: ["12×12 ft", "14×14 ft", "16×16 ft", "18×18 ft", "20×20 ft"],
      defaultSize: "16×16 ft",
      sizePrices: {
        "12×12 ft": { priceDisplay: "₹2.00 L", priceNumeric: 200000 },
        "14×14 ft": { priceDisplay: "₹2.20 L", priceNumeric: 220000 },
        "16×16 ft": { priceDisplay: "₹2.40 L", priceNumeric: 240000 },
        "18×18 ft": { priceDisplay: "₹2.60 L", priceNumeric: 260000 },
        "20×20 ft": { priceDisplay: "₹3.10 L", priceNumeric: 310000 }
      },
      specs: [
        "Heavy I-beam steel interlocking subfloor frame",
        "Modular quick-connect steel cross members",
        "30mm sound-dampening acoustic subfloor panels",
        "High-density 25mm EVA shock absorption underlayment",
        "1 set of heavy steel access stairs",
        "Full wraparound branded ring apron skirt"
      ],
      description: "The ideal elevated platform for premium combat gyms and club fight events. Elevates fighters into clear view while keeping structural ceiling requirements accessible."
    },
    {
      id: "ring-elevated-pro-03",
      name: "CHAMPIONSHIP BOXING RING",
      category: "elevated",
      tagline: "Official Championship Arena with BFI and World boxing standards.",
      price: "From ₹2.65 L",
      priceDisplay: "From ₹2.65 L",
      priceNumeric: 265000,
      image: "./assets/ring-championship-3ft.webp",
      images: ["./assets/ring-championship-3ft.webp"],
      badge: "CHAMPIONSHIP ARENA (3 FT)",
      isPro: true,
      elevationType: "3 ft (100 cm) High Pro Level",
      elevationHeight: "3 ft (100 cm Official Pro Height)",
      sizes: ["16×16 ft", "18×18 ft", "20×20 ft", "24×24 ft", "25.6×25.6 ft Competition"],
      defaultSize: "25.6×25.6 ft Competition",
      sizePrices: {
        "16×16 ft": { priceDisplay: "₹2.65 L", priceNumeric: 265000 },
        "18×18 ft": { priceDisplay: "₹2.90 L", priceNumeric: 290000 },
        "20×20 ft": { priceDisplay: "₹3.70 L", priceNumeric: 370000 },
        "24×24 ft": { priceDisplay: "₹3.95 L", priceNumeric: 395000 },
        "25.6×25.6 ft Competition": { priceDisplay: "₹4.25 L", priceNumeric: 425000 }
      },
      specs: [
        "Full 3 ft (100 cm) pro championship clearance",
        "Industrial structural box-truss steel frame",
        "2 sets of welded steel stairs (Red and Blue corners)",
        "2 integrated corner stools (swivel or fold-away)",
        "Heavy acoustic vibration isolation pads on all footing posts",
        "Heavy-duty ring skirts with custom sponsor logo printing",
        "BFI and World Boxing sanctioning standards compliance"
      ],
      description: "Official Championship Arena with BFI and World boxing standards. Built strictly to international championship sanctioning standards with 100 cm elevation, dual fighter staircases, and heavy acoustic dampening."
    }
  ],

  // ==========================================
  // RING ACCESSORIES & REPLACEMENT HARDWARE (10 ITEMS FROM OFFICIAL AFE CATALOG)
  // ==========================================
  boxingRingAccessories: [
    {
      id: "acc-canvas-01",
      number: "01",
      name: "Boxing Ring Canvas",
      category: "accessories",
      price: "₹45 per sq. ft.",
      priceDisplay: "₹45 / sq. ft.",
      priceNumeric: 45,
      image: "./assets/accessories/accessory-01-canvas.jpg",
      badge: "ACC 01 • HEAVY COTTON",
      specs: [
        "Upper canvas is made from heavy cotton for heavy gym and competition use",
        "Alongside canvas is industrial velcro & brass eyelets for attachment of skirt & ring frame",
        "Custom-made for champion-makers: contact for customised sizes, non-slip textures & colours"
      ],
      description: "Upper canvas is made from heavy cotton for heavy use. Alongside canvas is velcro & eyelets for attachment of skirt & ring attachment. Contact for customised sizes & colours."
    },
    {
      id: "acc-skirt-02",
      number: "02",
      name: "Boxing Ring Skirt",
      category: "accessories",
      price: "₹18,000 – ₹25,000",
      priceDisplay: "₹18,000 – ₹25,000",
      priceNumeric: 18000,
      image: "./assets/accessories/accessory-02-skirt.jpg",
      badge: "ACC 02 • SIDE PERIMETER",
      specs: [
        "Side canvas or heavy vinyl skirt designed to cover the elevated ring platform from all sides",
        "Prevents visibility of under-ring structural steel and creates a clean broadcast-ready aesthetic",
        "Customized in size, color, and sponsor/academy branding to fit 1-2 ft or 3 ft arena platforms"
      ],
      description: "Side canvas or skirt to cover the ring from the sides. Custom-made for champion-makers with custom size and color options."
    },
    {
      id: "acc-rope-spacer-03",
      number: "03",
      name: "Rope Spacer",
      category: "accessories",
      price: "₹2,000 [8 pieces]",
      priceDisplay: "₹2,000 (8 pcs)",
      priceNumeric: 2000,
      image: "./assets/accessories/accessory-03-rope-spacer.jpg",
      badge: "ACC 03 • SET OF 8 PCS",
      specs: [
        "Extra thick heavy-duty vertical spacer strap with grommets placed every 12 inches",
        "Complete with tie-down lash cords for positive non-slip attachment",
        "Locks the 4 ring ropes at uniform regulation distances to prevent boxer rope entanglement"
      ],
      description: "Extra thick with grommets every 12 inches. Complete with tie-down lash cord. Price: ₹2,000 for set of 8 pieces."
    },
    {
      id: "acc-metal-wire-04",
      number: "04",
      name: "Metal Ring Rope Wire",
      category: "accessories",
      price: "₹30,000",
      priceDisplay: "₹30,000",
      priceNumeric: 30000,
      image: "./assets/accessories/accessory-04-wire.jpg",
      badge: "ACC 04 • COMPETITION STANDARD",
      specs: [
        "Metal rope wire engineered with 6mm thick high-tensile multi-strand iron/steel core",
        "2mm protective seamless outer sleeve coating for superior corrosion resistance and grip",
        "Provided strictly as per national and international competition boxing standards"
      ],
      description: "Metal rope wire with 6mm thick iron wire & 2mm sleeve coating. Provided as per competition standards."
    },
    {
      id: "acc-corner-pads-05",
      number: "05",
      name: "Corner Pads",
      category: "accessories",
      price: "₹8,000 [4 pcs (1 Red, 1 Blue, 2 White)]",
      priceDisplay: "₹8,000 (Set of 4)",
      priceNumeric: 8000,
      image: "./assets/accessories/corner-pad-01-red-front.jpg",
      images: [
        "./assets/accessories/corner-pad-01-red-front.jpg",
        "./assets/accessories/corner-pad-02-blue-front.jpg",
        "./assets/accessories/corner-pad-03-white-front.jpg",
        "./assets/accessories/corner-pad-04-red-side.png",
        "./assets/accessories/corner-pad-05-red-back.png",
        "./assets/accessories/corner-pad-06-red-buckle.jpg",
        "./assets/accessories/corner-pad-07-red-zipper.jpg",
        "./assets/accessories/corner-pad-08-blue-side.png",
        "./assets/accessories/corner-pad-09-blue-back.png",
        "./assets/accessories/corner-pad-10-blue-buckle.jpg",
        "./assets/accessories/corner-pad-11-white-side.png",
        "./assets/accessories/corner-pad-12-white-back.png"
      ],
      badge: "ACC 05 • STRAIGHT FIT (4 PCS) • 12 VIEWS",
      specs: [
        "Vinyl coated heavy-duty leatherette with triangular shape engineered to fit ring corner posts cleanly",
        "High-density soft shock cushion foam core for athlete impact safety during championship competition",
        "Dual heavy-duty quick-release buckle straps and industrial zipper backing for rapid, slip-free assembly",
        "Official regulation 4-pad set: 1 Red Corner, 1 Blue Corner, and 2 White Neutral Corners with Fighter Forge branding"
      ],
      description: "Heavy-duty vinyl coated triangular corner pads engineered to fit standard boxing ring corner posts. Includes quick-release security buckle straps and zipper closure. Set of 4 includes 1 Red, 1 Blue, and 2 White pads."
    },
    {
      id: "acc-bent-corner-pads-06",
      number: "06",
      name: "Special Bent Corner Pads",
      category: "accessories",
      price: "₹8,000 [4 pcs (1 Red, 1 Blue, 2 White)]",
      priceDisplay: "₹8,000 (Set of 4)",
      priceNumeric: 8000,
      image: "./assets/accessories/accessory-06-bent-corner-pads.jpg",
      badge: "ACC 06 • BENT UPPER PROTECTION",
      specs: [
        "Special bent corner pads crafted with extended upper protection curvature to provide safety for boxers",
        "Shields fighters from hard corner post tops and upper turnbuckle clamps",
        "Set of 4: 2 white, 1 red & 1 blue with heavy-duty back mounting straps"
      ],
      description: "Special bent corner pads are made with upper protection to provide safety for boxers. Set of 4 (2 white, 1 red & 1 blue)."
    },
    {
      id: "acc-buckle-cover-07",
      number: "07",
      name: "Buckle Cover",
      category: "accessories",
      price: "₹6,500 [16 pieces (4 red, 4 blue, 4 white, 4 additional)]",
      priceDisplay: "₹6,500 (16 pcs)",
      priceNumeric: 6500,
      image: "./assets/accessories/accessory-07-buckle-covers.jpg",
      badge: "ACC 07 • SET OF 16 PCS",
      specs: [
        "Rope buckle cover designed to protect the metal turnbuckles between boxing ring ropes & corner posts",
        "Shock-absorbing foam cushion easily attached to ropes and turnbuckles with hook & loop (Velcro) fasteners",
        "Complete 16-piece set: 4 red, 4 blue, 4 white, and 4 additional neutral/black covers"
      ],
      description: "Rope buckle cover is to protect the buckle between boxing ring & the pole. The cushion can be easily attached to the ropes with hook & loop fastener. 16 pieces (4 red, 4 blue, 4 white, 4 additional)."
    },
    {
      id: "acc-turnbuckle-08",
      number: "08",
      name: "Turn Buckle",
      category: "accessories",
      price: "₹2,000 [16 pcs]",
      priceDisplay: "₹2,000 (16 pcs)",
      priceNumeric: 2000,
      image: "./assets/accessories/accessory-08-turnbuckle.jpg",
      badge: "ACC 08 • HEAVY M.S. (16 PCS)",
      specs: [
        "Fabricated from high-tensile Mild Steel (MS) material for superior tension endurance",
        "Features eye-to-eye / eye-to-hook positive locking attachment for ring rope cables",
        "Full 16-piece set to rig all four corners across all four regulation rope tiers"
      ],
      description: "Made of MS material, we use eye to eye hook attachment. Complete set of 16 pieces for full ring rigging."
    },
    {
      id: "acc-rope-cover-09",
      number: "09",
      name: "Ring Rope Cover Hand Stitch",
      category: "accessories",
      price: "₹25,000 [8 Red/White + 8 Blue/White (16 total)]",
      priceDisplay: "₹25,000 (16 covers)",
      priceNumeric: 25000,
      image: "./assets/accessories/accessory-09-rope-cover-handstitch.jpg",
      badge: "ACC 09 • HAND-STITCHED PREMIUM",
      specs: [
        "Ring rope cover hand stitched throughout are the most premium, durable rope covers available",
        "Laminated with high-density shock foam structure over the wire to prevent skin friction burns",
        "Supplied as 16 total pieces: 8 Red/White covers + 8 Blue/White covers for championship visual styling"
      ],
      description: "Ring rope cover hand stitched throughout are the most premium rope covers. They come laminated with foam structure over the wire. Set of 16 (8 Red/White covers + 8 Blue/White covers)."
    },
    {
      id: "acc-ring-stairs-10",
      number: "10",
      name: "Ring Stairs",
      category: "accessories",
      price: "₹7,000",
      priceDisplay: "₹7,000 / unit",
      priceNumeric: 7000,
      image: "./assets/accessories/accessory-10-ring-stairs.jpg",
      badge: "ACC 10 • HEAVY STEEL & WOOD",
      specs: [
        "Constructed from high-grade structural stainless / tubular steel frame with solid wooden base treads",
        "Non-slip step surface engineered for athletes with wet canvas shoes and ringside medical staff",
        "Available in championship Blue corner, Red corner, or neutral White finish"
      ],
      description: "Made of high grade stainless steel, wooden base. Built for competition and training elevated rings. Price: ₹7,000 per unit."
    }
  ],

  // ==========================================
  // PRODUCT CATALOG: MMA CAGES
  // ==========================================
  mmaCages: [
    {
      id: "cage-floor-01",
      name: "Floor MMA Cage (Octagon)",
      category: "floor",
      tagline: "Heavy-Gauge 8-Sided Daily Sparring Octagon",
      price: "From ₹1.45 L",
      priceDisplay: "From ₹1.45 L",
      priceNumeric: 145000,
      image: "./assets/cage-floor-level.jpg",
      images: ["./assets/cage-floor-level.jpg"],
      badge: "PRO GYM FAVORITE",
      elevationType: "Floor-Level",
      elevationHeight: "0 ft (Flush ground frame)",
      shapes: ["Octagon (8-Sided)"],
      sizes: ["14 ft Diameter", "16 ft Diameter", "18 ft Diameter", "20 ft Diameter"],
      defaultSize: "16 ft Diameter",
      sizePrices: {
        "14 ft Diameter": { priceDisplay: "₹1.45 L", priceNumeric: 145000 },
        "16 ft Diameter": { priceDisplay: "₹1.75 L", priceNumeric: 175000 },
        "18 ft Diameter": { priceDisplay: "₹2.00 L", priceNumeric: 200000 },
        "20 ft Diameter": { priceDisplay: "₹2.50 L", priceNumeric: 250000 }
      },
      specs: [
        "Heavy steel tubular fence panel frames (6 ft fence height)",
        "Vinyl-coated heavy 9-gauge steel chainlink mesh (anti-catch)",
        "8 high-density foam upright post cushions with vinyl covers",
        "Heavy-duty secure latching steel access door",
        "Heavy ground anchor locking flanges",
        "Complete mat and canvas underlay system available"
      ],
      description: "The workhorse cage of top MMA fight camps. Mounts flush to the gym floor, delivering zero-sag fence panels and heavy vinyl coating that protects fighters' knuckles and toes during wall grappling."
    },
    {
      id: "cage-elevated-training-02",
      name: "Elevated MMA Cage (1–2 ft)",
      category: "elevated",
      tagline: "Tournament & Fight Night Octagon with Elevated Visibility",
      price: "From ₹2.35 L",
      priceDisplay: "From ₹2.35 L",
      priceNumeric: 235000,
      image: "./assets/cage-elevated-1-2ft.jpg",
      images: ["./assets/cage-elevated-1-2ft.jpg"],
      badge: "1–2 FT ARENA CAGE",
      elevationType: "1–2 ft Low / Semi-Elevated",
      elevationHeight: "1–2 ft (30 cm – 60 cm)",
      shapes: ["Octagon (8-Sided)"],
      sizes: ["16 ft Diameter", "18 ft Diameter", "20 ft Diameter", "24 ft Diameter"],
      defaultSize: "20 ft Diameter",
      sizePrices: {
        "16 ft Diameter": { priceDisplay: "₹2.35 L", priceNumeric: 235000 },
        "18 ft Diameter": { priceDisplay: "₹2.80 L", priceNumeric: 280000 },
        "20 ft Diameter": { priceDisplay: "₹3.10 L", priceNumeric: 310000 },
        "24 ft Diameter": { priceDisplay: "₹3.95 L", priceNumeric: 395000 }
      },
      specs: [
        "Interlocking structural steel floor framework",
        "Rigid tongue-and-groove acoustic wooden subfloor panels",
        "Seamless anti-tear vinyl mat with custom center logo",
        "1 access door with double fail-safe lock mechanism",
        "1 heavy steel stairway with non-slip treads",
        "Full 360-degree perimeter tension cabling"
      ],
      description: "Elevate your promotion or training academy. Engineered for quick assembly and structural stability, giving spectators an unobstructed view of brutal wall work and takedowns."
    },
    {
      id: "cage-elevated-pro-03",
      name: "Pro Championship MMA Cages",
      category: "elevated",
      tagline: "Unified Rules UFC-Grade Championship Octagon Platform",
      price: "From ₹3.60 L",
      priceDisplay: "From ₹3.60 L",
      priceNumeric: 360000,
      image: "./assets/cage-pro-competition-arena-1.jpg",
      images: [
        "./assets/cage-pro-competition-arena-1.jpg",
        "./assets/cage-pro-competition-3d-2.jpg"
      ],
      badge: "PRO CHAMPIONSHIP CAGES",
      isPro: true,
      elevationType: "Platform height 3ft (90 cm) to 4ft (120 cm)",
      elevationHeight: "Platform height 3ft (90 cm) to 4ft (120 cm)",
      shapes: ["Octagon (8-Sided)"],
      sizes: ["20 ft High Octagon", "24 ft High Octagon", "28 ft Professional Octagon", "30 ft Competition Octagon"],
      defaultSize: "24 ft High Octagon",
      sizePrices: {
        "20 ft High Octagon": { priceDisplay: "₹3.60 L", priceNumeric: 360000 },
        "24 ft High Octagon": { priceDisplay: "₹4.40 L", priceNumeric: 440000 },
        "28 ft Professional Octagon": { priceDisplay: "₹5.00 L", priceNumeric: 500000 },
        "30 ft Competition Octagon": { priceDisplay: "₹5.50 L", priceNumeric: 550000 }
      },
      specs: [
        "Platform height 3ft (90 cm) to 4ft (120 cm) championship elevation clearance",
        "Dual heavy security doors (Fighter entry & Medic/Cutman entry)",
        "2 steel entrance staircases with safety handrails",
        "Ultra-heavy 100x100mm structural steel corner uprights",
        "Heavy acoustic subfloor dampening with zero reverberation",
        "Full vinyl perimeter skirts with sponsor print readiness",
        "Full certification report for sanctioning athletic commissions"
      ],
      description: "The definitive championship arena octagon. Manufactured for televised combat promotions and world-class MMA arenas demanding uncompromising safety, structural rigidity, and broadcast-ready aesthetics."
    },
    {
      id: "cage-hexagon-04",
      name: "Hexagon MMA Training Cage (Floor / Raised)",
      category: "floor",
      tagline: "Compact 6-Sided Training Cage for Space-Constrained Academies",
      price: "From ₹1.20 L",
      priceDisplay: "From ₹1.20 L",
      priceNumeric: 120000,
      image: "./assets/cage-hexagon-fighterforge.jpg",
      images: ["./assets/cage-hexagon-fighterforge.jpg"],
      badge: "COMPACT FOOTPRINT",
      elevationType: "Floor-Level (0 cm Ground)",
      elevationHeight: "0–1 ft",
      shapes: ["Hexagon (6-Sided)"],
      sizes: ["12 ft Hexagon", "14 ft Hexagon", "16 ft Hexagon", "18 ft Hexagon"],
      defaultSize: "14 ft Hexagon",
      sizePrices: {
        "12 ft Hexagon": { priceDisplay: "₹1.20 L", priceNumeric: 120000 },
        "14 ft Hexagon": { priceDisplay: "₹1.45 L", priceNumeric: 145000 },
        "16 ft Hexagon": { priceDisplay: "₹1.75 L", priceNumeric: 175000 },
        "18 ft Hexagon": { priceDisplay: "₹2.00 L", priceNumeric: 200000 }
      },
      specs: [
        "Space-saving 6-panel geometry",
        "Quick-latch pin connection system for fast installation",
        "Heavy 9-gauge smooth vinyl dip mesh",
        "6 thick bumper pads with gym color customization",
        "Single outward-opening access door",
        "Optimized for cage grappling drilling"
      ],
      description: "Ideal for martial arts academies that need cage wall training but have limited square footage. Fast to erect and easy to relocate."
    }
  ],

  // ==========================================
  // STORIES / BLOG FOR ATHLETES, RINGS & SEO
  // ==========================================
  stories: [
    {
      id: "pro-elevation-standard-3ft",
      slug: "why-3ft-elevated-boxing-rings-are-pro-gold-standard",
      title: "Why 3 ft (100 cm) Elevated Rings are the Gold Standard for Championship Boxing",
      category: "Ring Engineering",
      author: "Vikram Rathore, Lead Arena Structural Engineer",
      date: "October 24, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      excerpt: "From spectator eye-line physics to judge sightlines and subfloor shock acoustics, discover why sanctioning bodies require 100 cm elevation for title fights.",
      content: `
When a world-class fighter steps onto an elevated canvas, milliseconds and millimeters matter. In professional boxing, the height of the platform is far from an aesthetic choice—it is a tightly regulated structural standard.

### 1. The Physics of Spectator & Judge Eye-Levels
A 3 ft (approximately 100 cm) platform raises the ring canvas precisely into the natural horizontal eye-level of ringside judges and medics sitting in arena seating. When judges view footwork from below, subtle shifts in balance, pivot slips, and low blows become unmistakably visible.

### 2. Acoustic Absorption and Canvas Rebound
Fighter Forge 3 ft Pro Competition rings incorporate an acoustic vibration-dampening box truss. When two heavyweights clash, standard timber platforms amplify the vibration, causing canvas bounce that fatigues ankle tendons. Our dual-layer subfloor with industrial elastomer dampers absorbs impact while returning firm traction.

### 3. Safety Clearances and Corner Rigidity
At 100 cm elevation, structural corner posts must resist over 2,200 kg of lateral rope tension. Fighter Forge builds with cold-rolled industrial square steel and heavy base gussets, guaranteeing zero post deflection when fighters lean hard on the ropes.
      `,
      tags: ["Boxing Rings", "Pro Arena", "Engineering", "Championship Specs"]
    },
    {
      id: "cage-geometry-octagon-vs-hexagon",
      slug: "octagon-vs-hexagon-engineering-cage-geometry",
      title: "Octagon vs Hexagon: Engineering Cage Geometry for Fighter Safety and Flow",
      category: "Cage Standards",
      author: "Coach Aryan Sen, Combat Sports Director",
      date: "October 18, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop",
      excerpt: "How wall angles impact takedown defense, corner trapping, and fighter safety. A complete breakdown for gym owners planning their cage installation.",
      content: `
Choosing the right cage geometry is one of the most critical investments an MMA gym owner makes. While the Octagon remains the worldwide standard made famous by the UFC, 6-sided Hexagons have carved out a strategic training role.

### The Octagon (135° Angles)
The 8-sided geometry creates wide 135-degree interior angles. This prevents fighters from getting trapped in tight 90-degree corners, forcing continuous circular movement, lateral pivoting, and technical wall-walks. It mimics the exact arena dimensions fighters face in professional bouts.

### The Hexagon (120° Angles)
For gyms with space constraints under 600 sq ft, the 6-sided cage allows an effective training radius with fewer modular sections. The slightly tighter 120-degree angles are exceptional for teaching takedown containment and corner cutting during sparring drills.

### Mesh Tension and Vinyl Dipping
Regardless of shape, wire gauge makes or breaks safety. Fighter Forge utilizes heavy 9-gauge steel wire dipped in smooth, medical-grade vinyl. This eliminates burrs that cause cuts during takedown drives and ensures zero finger-snag.
      `,
      tags: ["MMA Cages", "Cage Geometry", "Gym Planning", "Fighter Safety"]
    },
    {
      id: "pro-fight-gym-equipment-blueprint",
      slug: "from-gym-to-glory-choosing-arena-grade-equipment",
      title: "From Gym to Glory: The Blueprint for Choosing Elite Combat Sports Equipment",
      category: "Athletes & Fight Science",
      author: "Devraj Chauhan, Strength & Combat Conditioning",
      date: "October 12, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Elite athletes don't train on wobbling equipment. Learn how top-tier gyms build training environments that forge national and world champions.",
      content: `
A fight gym is defined by its steel. When fighters enter an arena, confidence comes from familiarity with professional-grade surfaces.

### 1. Eliminating Wobble
Cheap imported rings shake on every step. That vibration ruins rhythm and telegraphs movement. Fighter Forge interlocking structural cross-beams eliminate 98% of sway, creating an unwavering stage.

### 2. High-Density EVA Foam vs Cheap Polyethylene
Standard foam bottoms out within six months under heavy sparring, exposing plywood beneath. Fighter Forge specifies 25mm to 30mm high-density cross-linked EVA foam that maintains shock absorption for years.

### 3. The Psychology of Custom Branding
When fighters see their team insignia emblazoned sharply across the canvas and corner pads, pride and discipline surge. Our dye-sublimated non-slip vinyls maintain grip even when drenched in sweat.
      `,
      tags: ["Gym Blueprint", "Combat Athletes", "Pro Gear", "Discipline"]
    },
    {
      id: "inside-the-steel-manufacturing",
      slug: "inside-the-steel-what-separates-fighter-forge-manufacturing",
      title: "Inside the Steel: What Separates Fighter Forge from Commercial Clones",
      category: "Ring Engineering",
      author: "Fighter Forge Fabrication Lab",
      date: "October 05, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop",
      excerpt: "A behind-the-scenes look at our laser cutting, precision robotic welding, high-tensile turnbuckles, and zero-compromise quality tests.",
      content: `
We founded Fighter Forge with one rule: **No Compromise. No Shortcuts.**

Every weld in our New Delhi manufacturing facility is executed to structural architectural standards. We don't use hollow sheet-metal tubes that dent when a 90kg fighter crashes into them. We use certified structural tubing, heavy gusset plates, and electrostatically powder-coated finishes that resist sweat corrosion for a lifetime.

When you purchase Fighter Forge, you deal directly with the engineers who cut, weld, and inspect your arena.
      `,
      tags: ["Manufacturing", "Steel Fabrication", "Quality Control", "Made In India"]
    },
    {
      id: "upcoming-combat-gear-ergonomics",
      slug: "upcoming-gear-science-behind-fighter-forge-boxing-gloves",
      title: "Upcoming Combat Gear: The Science Behind Fighter Forge Ergonomic Gloves & Armor",
      category: "Arena News & Events",
      author: "Fighter Forge R&D Team",
      date: "September 28, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1509563459871-33161a0eb649?q=80&w=1200&auto=format&fit=crop",
      excerpt: "A preview of our upcoming pro sparring gloves, shin guards, and combat duffels—engineered with multi-layered shock dissipation foam.",
      content: `
After outfitting hundreds of fight gyms with rings and cages, our fighters demanded gear forged with the same brutal standard.

Coming soon from Fighter Forge:
- **Pro Sparring Boxing Gloves (12oz, 14oz, 16oz):** Anatomical fist alignment with triple-density injection foam and reinforced wrist stability.
- **MMA Competition Gloves:** Ergonomic curve to minimize eye poke risk while maximizing thumb articulation for submissions.
- **Heavy Combat Duffel Bags:** Military-grade ripstop fabric with ventilated wet gear compartments.

Join our Insider WhatsApp Group or submit your gear design ideas below to get early prototype testing access!
      `,
      tags: ["Combat Gear", "Boxing Gloves", "Coming Soon", "Gear R&D"]
    }
  ],

  // ==========================================
  // COMING SOON GEAR & COMMUNITY INITIATIVES
  // ==========================================
  upcomingGear: {
    title: "GEAR LOCKER: COMING SOON",
    subtitle: "BOXING GLOVES & MORE COMBAT GEAR",
    description: "We are finalizing our pro-grade sparring gloves, fight shorts, shin armor, and heavy combat bags. Built with genuine leather, high-density multi-layer foam, and the Fighter Forge shield.",
    categories: [
      { name: "Pro Boxing Gloves (12oz, 14oz, 16oz)", status: "Prototype Testing" },
      { name: "MMA Pro Sparring & Fight Gloves", status: "Design Finalized" },
      { name: "Heavy Combat Duffels & Gear Bags", status: "Materials Sourcing" },
      { name: "Muay Thai & MMA Shin Guards", status: "Engineering Phase" }
    ]
  },

  // ==========================================
  // EVENT RENTALS (NATIONWIDE INDIA - IPBL & PRO MMA)
  // ==========================================
  eventRentals: {
    badge: "NATIONWIDE EVENT RENTALS",
    title: "RENT BOXING RINGS & MMA CAGES FOR EVENTS IN INDIA",
    tagline: "Official Arena Rental Partner for IPBL (India Pro Boxing League) & Pro MMA Events",
    description: "We provide competition-standard Boxing Rings and MMA Cages on rental for professional events across India—including IPBL (India Pro Boxing League), state championships, and mid-pro to UFC-level fight promotions. Complete package includes structural steel arena, shock-absorbing platform, on-site setup crew, and teardown.",
    features: [
      "Official IPBL (India Pro Boxing League) standard rings",
      "Unified Rules 20ft & 24ft Elevated Championship MMA Octagons",
      "Full professional setup, leveling & dismantle crew included",
      "Custom sponsor branding available for canvas, skirts & corner pads",
      "Heavy acoustic subfloor dampening for zero camera bounce",
      "Nationwide express logistics & on-time event dispatch across India"
    ],
    supportedEvents: [
      "IPBL (India Pro Boxing League)",
      "Pro MMA Fight Nights & Title Fights",
      "State & National Boxing Tournaments",
      "Broadcast, OTT & Televised Combat Shows",
      "Collegiate & Invitational Fight Galas"
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { siteConfig };
}

