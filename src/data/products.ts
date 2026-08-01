import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'aur-001',
    name: 'LÉON Double-Breasted Cashmere Coat',
    subtitle: '100% Loro Piana Double-Faced Cashmere',
    category: 'Outerwear',
    categoryType: 'outerwear',
    price: 1850,
    originalPrice: 2100,
    colors: [
      { name: 'Oatmeal Beige', hex: '#D2C4B4' },
      { name: 'Midnight Obsidian', hex: '#1C1D21' },
      { name: 'Camel Tan', hex: '#B8860B' }
    ],
    sizes: ['36 (XS)', '38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    description: 'Sculpted from unlined double-faced Loro Piana cashmere, the Léon Coat embodies architectural minimalism. Features horn-button fastenings, hand-finished blind stitched seams, and dropped shoulders for effortless drape.',
    materials: '100% Loro Piana Italian Cashmere, Horn Buttons',
    details: [
      'Hand-stitched double-face seamless construction',
      'Relaxed tailored fit with deep side pockets',
      'Wide peak lapel and back vent movement slit',
      'Made in Florence, Italy'
    ],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Dry clean only with specialist wool care. Store on a contoured coat hanger.',
    sustainabilityNote: 'Ethically sourced Mongolian cashmere certified by the Sustainable Fibre Alliance (SFA). Zero water waste dyeing process.',
    fitNotes: 'Generous silhouette designed for winter layering. Size down for a closer fit.',
    inStock: 8,
    isBestseller: true,
    isNewArrival: true,
    transparentImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-002',
    name: 'LUMIÈRE Bias-Cut Mulberry Silk Shirt',
    subtitle: '19mm Heavyweight Silk Crêpe de Chine',
    category: 'Knitwear & Tops',
    categoryType: 'top',
    price: 520,
    colors: [
      { name: 'Raw Alabaster', hex: '#F5F5F0' },
      { name: 'Sage Linen', hex: '#8A9A86' },
      { name: 'Charcoal Silk', hex: '#2B2C2E' }
    ],
    sizes: ['34 (XXS)', '36 (XS)', '38 (S)', '40 (M)', '42 (L)'],
    description: 'An understated fluid silhouette in 19-momme organic Mulberry silk. Features mother-of-pearl buttons, a concealed French placket, and lengthened cuffs designed to extend softly over the wrists.',
    materials: '100% Pure Mulberry Silk, Natural Shell Buttons',
    details: [
      'Bias-cut pattern for seamless body fluid movement',
      'Hand-carved mother-of-pearl buttons',
      'French seams throughout for zero skin friction',
      'Ethically dyed in Como, France'
    ],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Hand wash cold with silk detergent or eco dry clean. Cool iron inside out.',
    sustainabilityNote: 'OEKO-TEX Standard 100 certified, non-toxic organic botanical dyes.',
    fitNotes: 'Fluid drape with subtle waist tapers. Fits true to size.',
    inStock: 14,
    isBestseller: true,
    transparentImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-003',
    name: 'ÉLANCE Architectural Column Silk Gown',
    subtitle: 'Heavyweight Heavy Silk Satin with Fluid Drape',
    category: 'Dresses & Skirts',
    categoryType: 'dress',
    price: 1450,
    colors: [
      { name: 'Champagne Gold', hex: '#E6D7B8' },
      { name: 'Noir Eclipse', hex: '#111111' },
      { name: 'Emerald Moss', hex: '#1B3B2B' }
    ],
    sizes: ['36 (XS)', '38 (S)', '40 (M)', '42 (L)'],
    description: 'Designed with a high halter neckline and open back cowl, the Élance gown falls into a monolithic minimalist column drape. Engineered to sculpt effortlessly without restrictive inner boning.',
    materials: '100% Heavy Mulberry Silk Satin, Silk Crepe Lining',
    details: [
      'Hand-draped bias neck slit with delicate trailing silk ribbon',
      'Concealed Japanese YKK zipper on lower side',
      'Weighted hemline for graceful walking movement',
      'Handcrafted in Paris Atelier'
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Specialist dry clean only. Steam softly on silk setting.',
    sustainabilityNote: 'Zero-waste pattern design utilizes 98% of fabric yield.',
    fitNotes: 'Sculpted bust with floor-length length. High heel hem adjustment recommended.',
    inStock: 5,
    isNewArrival: true,
    transparentImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-004',
    name: 'ATELIER Pleated Wide-Leg Wool Trousers',
    subtitle: 'Super 130s Virgin Wool Twill',
    category: 'Trousers',
    categoryType: 'bottom',
    price: 680,
    colors: [
      { name: 'Stone Grey', hex: '#8C8D8A' },
      { name: 'Jet Charcoal', hex: '#1E1E20' },
      { name: 'Warm Taupe', hex: '#A39281' }
    ],
    sizes: ['36 (28")', '38 (30")', '40 (32")', '42 (34")', '44 (36")'],
    description: 'Cut with deep double inverted front pleats and a high-waisted silhouette. Tailored from crease-resistant Super 130s Italian virgin wool with extended waistband tabs.',
    materials: '100% Super 130s Italian Virgin Wool, Cupro Lining',
    details: [
      'Double forward front pleats for fluid volume',
      'Adjustable side waistband buttons',
      'Hand-stitched blind hem with extra 4cm drop allowance',
      'Made in Biella, Italy'
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Dry clean only. Press with damp cloth.',
    sustainabilityNote: 'Responsible Wool Standard (RWS) certified, non-mulesed wool.',
    fitNotes: 'High-rise waist with wide leg opening. Runs true to tailored sizing.',
    inStock: 12,
    isBestseller: true,
    transparentImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-005',
    name: 'MAISON Oversized Fine Gauge Cashmere Turtleneck',
    subtitle: 'Grade-A Inner Mongolian Cashmere 2-Ply',
    category: 'Knitwear & Tops',
    categoryType: 'top',
    price: 740,
    colors: [
      { name: 'Ivory Cream', hex: '#EAE6DF' },
      { name: 'Camel Tan', hex: '#B8860B' },
      { name: 'Slate Gray', hex: '#4A5056' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'An archetype of tactile comfort. Knitted in 12-gauge 2-ply long-staple cashmere with ribbed cuffs and hem, designed to maintain structure over years of wear.',
    materials: '100% Grade-A Mongolian Cashmere',
    details: [
      'Ultra-soft 12-gauge seamless knit construction',
      'Non-restrictive roll-neck fold collar',
      'Pill-resistant long staple yarn treatment',
      'Crafted in Scotland'
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Hand wash cold or gentle wool cycle in mesh bag. Dry flat on towels.',
    sustainabilityNote: 'GOTS certified organic cashmere fibers with traceable herder cooperatives.',
    fitNotes: 'Relaxed oversized fit with dropped shoulder seams.',
    inStock: 9,
    isNewArrival: true,
    transparentImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-006',
    name: 'NOIR Sculpted Wool Tuxedo Blazer',
    subtitle: 'Italian Grain de Poudre Wool with Satin Lapels',
    category: 'Tailoring',
    categoryType: 'outerwear',
    price: 1280,
    colors: [
      { name: 'Pitch Black', hex: '#0B0B0C' },
      { name: 'Off White Satin', hex: '#F0EFEA' }
    ],
    sizes: ['36 (XS)', '38 (S)', '40 (M)', '42 (L)'],
    description: 'Precision tailored jacket featuring structured canvas shoulders, silk satin peak lapels, and a subtle hourglass nipped waist. Inspired by classic masculine tailoring reinterpreted for modern elegance.',
    materials: '100% Grain de Poudre Virgin Wool, Silk Satin Trim',
    details: [
      'Traditional horsehair chest canvas internal floating structure',
      'Silk satin jet pockets and covered single button closure',
      'Fully lined in 100% breathable cupro silk',
      'Handcrafted in Milan'
    ],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Specialist dry clean only. Hang on shoulder-padded wooden hanger.',
    sustainabilityNote: 'Low environmental impact wool finishing without harsh chemical solvents.',
    fitNotes: 'Tailored sharp shoulder structure with nipped waist. Fits true to size.',
    inStock: 6,
    isBestseller: true,
    transparentImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-007',
    name: 'SORA Japanese Selvedge Raw Denim Trousers',
    subtitle: '14oz Okayama Shuttle Loom Cotton Denim',
    category: 'Trousers',
    categoryType: 'bottom',
    price: 460,
    colors: [
      { name: 'Deep Indigo Selvedge', hex: '#1C2841' },
      { name: 'Natural Unbleached Cotton', hex: '#ECE8DF' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Woven on vintage 1950s shuttle looms in Okayama, Japan. Features pink selvedge ID line, solid copper hand-rivets, and a mid-rise straight leg cut that molds uniquely to the wearer over time.',
    materials: '100% Organic Japanese Cotton Selvedge Denim',
    details: [
      '14oz unsanforized heavy shuttle loom denim',
      'Custom copper button fly and hidden back pocket rivets',
      'Embossed vegetable-tanned leather waistband patch',
      'Woven in Kojima, Japan'
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Wash inside out in cold water after 6 months of initial wear. Line dry outdoors.',
    sustainabilityNote: 'Zero synthetic elastane, 100% biodegradable organic cotton and indigo plant dye.',
    fitNotes: 'Rigid initial structure that softens perfectly with wear.',
    inStock: 15,
    transparentImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-008',
    name: 'L’ATELIER Calfskin Minimalist Shoulder Tote',
    subtitle: 'Full-Grain Tuscan Nappa Leather',
    category: 'Accessories',
    categoryType: 'accessory',
    price: 980,
    colors: [
      { name: 'Earthy Espresso', hex: '#3B2F2F' },
      { name: 'Cognac Saddle', hex: '#8B4513' },
      { name: 'Minimal Onyx', hex: '#151515' }
    ],
    sizes: ['One Size (40cm x 32cm x 15cm)'],
    description: 'Seamless geometric silhouette cut from a single piece of full-grain Tuscan calfskin. Unlined suede interior with detachable zippered leather pouch and magnetic closure.',
    materials: '100% Tuscan Full-Grain Nappa Leather',
    details: [
      'Hand-painted finished edges with Italian leather edge dye',
      'Debossed subtle AURA gold foil logo at interior rim',
      'Included detachable zippered key & phone pouch',
      'Handcrafted in Scandicci, Italy'
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Apply organic leather balm twice yearly. Store in included cotton dust bag.',
    sustainabilityNote: 'Vegetable-tanned leather certified by the Consorzio Vera Pelle Italiana.',
    fitNotes: 'Spacious dimensions fits 15" laptop and everyday essentials effortlessly.',
    inStock: 10,
    isBestseller: true,
    transparentImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aur-009',
    name: 'VALENTIN Hand-Finished Calfskin Loafers',
    subtitle: 'Blake-Stitched Italian Aniline Calfskin',
    category: 'Accessories',
    categoryType: 'accessory',
    price: 620,
    colors: [
      { name: 'Oxblood Mahogany', hex: '#4A0E17' },
      { name: 'Jet Black Calf', hex: '#111111' }
    ],
    sizes: ['39 (EU 6)', '40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    description: 'Sleek penny loafer shape burnished by hand to achieve depth of patina. Constructed with Blake welt stitching for maximum flexibility and lightweight walking ease.',
    materials: '100% Aniline French Calfskin, Leather Sole with Rubber Heel Cap',
    details: [
      'Hand-patinated finish applied in layered coats',
      'Cushioned leather footbed with memory arch support',
      'Blake stitched construction allows resoling for lifetime wear',
      'Made in Montegranaro, Italy'
    ],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop'
    ],
    careInstructions: 'Use beeswax shoe polish and cedar shoe trees after each wear.',
    sustainabilityNote: 'LWG Gold-rated tannery source with zero chrome discharge.',
    fitNotes: 'Classic Italian last with sleek toe box. Fits true to size.',
    inStock: 7,
    isNewArrival: true,
    transparentImage: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop'
  }
];
