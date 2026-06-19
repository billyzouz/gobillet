export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  classType: string;
  rating: number;
  reassurances: string[];
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  image: string;
  amenities: string[];
  reassurances: string[];
}

export interface PackageOffer {
  id: string;
  title: string;
  location: string;
  durationDays: number;
  price: number;
  flightsIncluded: boolean;
  hotelStars: number;
  rating: number;
  image: string;
  highlights: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  category: 'vols' | 'sejours' | 'hotels' | 'all';
  description: string;
  startPrice: number;
}

export const FLIGHTS_DATA: Flight[] = [
  {
    id: "f1",
    airline: "Saudia",
    airlineLogo: "SV",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "DXB",
    toName: "Dubaï International",
    departureTime: "11:25",
    arrivalTime: "19:50",
    duration: "6h 25m",
    stops: 0,
    price: 420,
    classType: "Économique",
    rating: 4.8,
    reassurances: ["Bagage en soute 23kg inclus", "Restauration chaude à bord", "Garantie OpenSaudi incluse"]
  },
  {
    id: "f2",
    airline: "Air France",
    airlineLogo: "AF",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "JFK",
    toName: "New York John F. Kennedy",
    departureTime: "08:15",
    arrivalTime: "10:45",
    duration: "8h 30m",
    stops: 0,
    price: 380,
    classType: "Économique",
    rating: 4.6,
    reassurances: ["Bagage cabine + accessoire", "Divertissement à bord", "Remboursable avec frais"]
  },
  {
    id: "f3",
    airline: "Turkish Airlines",
    airlineLogo: "TK",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "IST",
    toName: "Istanbul Grand Airport",
    departureTime: "14:10",
    arrivalTime: "18:40",
    duration: "3h 30m",
    stops: 0,
    price: 195,
    classType: "Économique",
    rating: 4.7,
    reassurances: ["2 bagages en soute de 23kg", "Repas gastronomique turc", "Modification flexible"]
  },
  {
    id: "f4",
    airline: "Emirates",
    airlineLogo: "EK",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "DXB",
    toName: "Dubaï International",
    departureTime: "15:35",
    arrivalTime: "00:15",
    duration: "6h 40m",
    stops: 0,
    price: 590,
    classType: "Économique Premium",
    rating: 4.9,
    reassurances: ["Bagage de 30kg inclus", "Siège spacieux ergonomique", "Assistance Premium 24/7"]
  },
  {
    id: "f5",
    airline: "EgyptAir",
    airlineLogo: "MS",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "CAI",
    toName: "Le Caire Sphinx",
    departureTime: "09:45",
    arrivalTime: "14:15",
    duration: "4h 30m",
    stops: 0,
    price: 290,
    classType: "Économique",
    rating: 4.4,
    reassurances: ["Bagage en soute inclus", "Thé et repas chauds", "Modification possible"]
  },
  {
    id: "f6",
    airline: "Royal Air Maroc",
    airlineLogo: "AT",
    fromCode: "ORY",
    fromName: "Paris Orly",
    toCode: "RAK",
    toName: "Marrakech Menara",
    departureTime: "12:30",
    arrivalTime: "14:45",
    duration: "3h 15m",
    stops: 0,
    price: 135,
    classType: "Économique",
    rating: 4.5,
    reassurances: ["Bagage incluse", "Service de bord chaleureux"]
  },
  {
    id: "f7",
    airline: "Qatar Airways",
    airlineLogo: "QR",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "DPS",
    toName: "Bali Denpasar",
    departureTime: "21:55",
    arrivalTime: "17:35",
    duration: "13h 40m",
    stops: 1,
    price: 780,
    classType: "Économique",
    rating: 4.9,
    reassurances: ["Meilleure compagnie au monde", "Escale à Doha", "Annulation flexible"]
  },
  {
    id: "f8",
    airline: "Thai Airways",
    airlineLogo: "TG",
    fromCode: "CDG",
    fromName: "Paris Charles de Gaulle",
    toCode: "BKK",
    toName: "Bangkok Suvarnabhumi",
    departureTime: "13:30",
    arrivalTime: "06:00",
    duration: "11h 30m",
    stops: 0,
    price: 680,
    classType: "Économique",
    rating: 4.6,
    reassurances: ["Bagage 23kg", "Vol direct de nuit"]
  }
];

export const HOTELS_DATA: Hotel[] = [
  {
    id: "h1",
    name: "The Address Downtown Dubai",
    stars: 5,
    location: "Dubaï, Émirats Arabes Unis",
    pricePerNight: 280,
    rating: 4.9,
    reviewsCount: 840,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600",
    amenities: ["Vue Burj Khalifa", "Infinity Pool", "Spa & Centre de Bien-être", "6 Restaurants gastronomiques", "Navette aéroport VIP"],
    reassurances: ["Annulation gratuite", "Thé de bienvenue offert", "Tarif garanti OpenSaudi"]
  },
  {
    id: "h2",
    name: "Conrad Istanbul Bosphorus",
    stars: 5,
    location: "Istanbul, Turquie",
    pricePerNight: 160,
    rating: 4.8,
    reviewsCount: 612,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=600",
    amenities: ["Vue Panoramique Bosphore", "Piscines Intérieure & Extérieure", "Spa de luxe", "Près de la place Taksim", "Wi-Fi Très Haut Débit"],
    reassurances: ["Paiement flexible à l'hôtel", "Petit-déjeuner inclus"]
  },
  {
    id: "h3",
    name: "La Mamounia Palace Hotel",
    stars: 5,
    location: "Marrakech, Maroc (Médina)",
    pricePerNight: 450,
    rating: 4.9,
    reviewsCount: 1420,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600",
    amenities: ["Jardins historiques de 8 hectares", "Spa de renommée mondiale", "Piscine chauffée monumentale", "Salons marocains traditionnels", "Service majordome"],
    reassurances: ["Annulation sans frais", "Thé à la menthe et gâteaux de bienvenue", "Garantie Atout France"]
  },
  {
    id: "h4",
    name: "COMO Shambhala Bali Estate",
    stars: 5,
    location: "Ubud, Bali, Indonésie",
    pricePerNight: 310,
    rating: 4.9,
    reviewsCount: 228,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
    amenities: ["Source d'eau naturelle privée", "Retraite de yoga & méditation", "Piscines naturelles dans la forêt", "Cuisine bio-énergétique", "Chambres de luxe en bambou"],
    reassurances: ["Espace bien-être illimité inclus", "Paiement 100% sécurisé"]
  },
  {
    id: "h5",
    name: "The Giza Grand Marriott Pyramids",
    stars: 5,
    location: "Gizeh, Le Caire, Égypte",
    pricePerNight: 140,
    rating: 4.7,
    reviewsCount: 459,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&q=80&w=600",
    amenities: ["Vue légendaire sur les pyramides de Gizeh", "Immense piscine de style resort", "Plusieurs restaurants à thème", "Boutique d'art traditionnel", "Sécurité renforcée"],
    reassurances: ["Accès VIP pour le spectacle son et lumière", "Annulation gratuite"]
  },
  {
    id: "h6",
    name: "The Park Hyatt Tokyo Skyline",
    stars: 5,
    location: "Shinjuku, Tokyo, Japon",
    pricePerNight: 490,
    rating: 4.9,
    reviewsCount: 789,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600",
    amenities: ["Rooftop Bar culte", "Piscine couverte au 47ème étage", "Club de remise en forme de pointe", "Navette de luxe vers les gares", "Wi-Fi de poche gratuit"],
    reassurances: ["Remboursement garanti", "Service de conciergerie multilingue"]
  }
];

export const PACKAGES_DATA: PackageOffer[] = [
  {
    id: "p1",
    title: "Évasion de Luxe à Dubaï & Safari Désert",
    location: "Dubaï, EAU",
    durationDays: 6,
    price: 699,
    flightsIncluded: true,
    hotelStars: 5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600",
    highlights: ["Vol direct A/R avec Saudia / Emirates inclus", "Hôtel 5★ au cœur de la Marina", "Safari 4x4 premium dans les dunes rutilantes avec dîner barbecue", "Montée prioritaire Burj Khalifa incluse"]
  },
  {
    id: "p2",
    title: "Splendeurs du Bosphore & Histoire Ottoman",
    location: "Istanbul, Turquie",
    durationDays: 5,
    price: 349,
    flightsIncluded: true,
    hotelStars: 5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=600",
    highlights: ["Vol direct inclus avec Turkish Airlines", "Hôtel de standing avec vue bosphore", "Croisière privée au coucher du soleil", "Visites guidées : Sainte-Sophie & Palais de Topkapi"]
  },
  {
    id: "p3",
    title: "Trésors Mystiques d'Ubud & Plages de Seminyak",
    location: "Bali, Indonésie",
    durationDays: 10,
    price: 1199,
    flightsIncluded: true,
    hotelStars: 5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
    highlights: ["Vols A/R d'une compagnie de premier rang", "Hôtel en villa de luxe nichée avec piscine privée", "Transferts privés chauffeur inclus tout le séjour", "Soin Spa thermal de 2h compris pour deux"]
  },
  {
    id: "p4",
    title: "Rêve des Pharaons & Merveilles Pyramides",
    location: "Le Caire, Égypte",
    durationDays: 7,
    price: 549,
    flightsIncluded: true,
    hotelStars: 4,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&q=80&w=600",
    highlights: ["Vol direct compris avec EgyptAir", "Hôtel de charme avec vue splendide sur les pyramides", "Guide égyptologue certifié pour vos demi-journées", "Entrée privilégiée au Grand Musée Égyptien"]
  }
];

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: "d1",
    name: "Dubaï",
    country: "Émirats Arabes Unis",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "La démesure du futur au milieu du désert, entre îles artificielles et boutiques de luxe.",
    startPrice: 420
  },
  {
    id: "d2",
    name: "Istanbul",
    country: "Turquie",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "Le pont majestueux entre Orient et Occident, chargé d'histoire, de mosquées bleues et de palais.",
    startPrice: 195
  },
  {
    id: "d3",
    name: "Marrakech",
    country: "Maroc",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "La magie colorée de la médina, les riads emmitouflés de calme et l'effervescence de Jemaa el-Fna.",
    startPrice: 135
  },
  {
    id: "d4",
    name: "Bangkok",
    country: "Thaïlande",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "Canaux bouillonnants, temples bouddhistes étincelants de mille feux et street food enivrante.",
    startPrice: 680
  },
  {
    id: "d5",
    name: "New York",
    country: "États-Unis",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "La skyline mythique, Times Square, Broadway et Central Park au gré des saisons.",
    startPrice: 380
  },
  {
    id: "d6",
    name: "Tokyo",
    country: "Japon",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "Le futurisme absolu de Shibuya s'alliant à la douceur contemplative des parcs de cerisiers.",
    startPrice: 490
  },
  {
    id: "d7",
    name: "Le Caire",
    country: "Égypte",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "Les pyramides millénaires de Gizeh dominant le cours majestueux du Nil éternel.",
    startPrice: 140
  },
  {
    id: "d8",
    name: "Bali",
    country: "Indonésie",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
    category: "all",
    description: "Rizières en terrasses d’Ubud, falaises côtières spectaculaires et spiritualité hindoue.",
    startPrice: 780
  }
];

export const POURQUOI_ITEMS = [
  {
    id: "grid-1",
    title: "Le monde à portée de clic",
    description: "Des milliers de destinations, compagnies aériennes reconnues et hôtels d'exception partout dans le monde, réunis sur une seule plateforme intuitive.",
    badge: "Couverture mondiale",
    iconName: "Globe"
  },
  {
    id: "grid-2",
    title: "Réservez au bon moment",
    description: "Nos outils intelligents comparent les options et vous orientent pour dénicher le bon billet au prix le plus bas, quand c'est le plus stratégique.",
    badge: "Algorithme de prix",
    iconName: "TrendingDown"
  },
  {
    id: "grid-3",
    title: "Vol, séjour et hôtel réunis",
    description: "Composez votre voyage sur-mesure de A à Z : combinez transports et hébergements d'un seul jet sans jamais quitter notre interface moderne.",
    badge: "Tout-en-un",
    iconName: "Maximize"
  },
  {
    id: "grid-4",
    title: "Réservez en toute sérénité",
    description: "Profitez d'un paiement 100% sécurisé et de la solidité légale d'OpenSaudi, agence agréée IATA et Atout France garantissant vos séjours.",
    badge: "Totale confiance",
    iconName: "ShieldCheck"
  }
];

export const UNIVERSITY_SLOGANS = {
  vols: "Le bon vol, au bon moment.",
  sejours: "Le bon séjour, au bon moment.",
  hotels: "La bonne adresse, au bon moment.",
  global: "Le bon billet, au bon moment."
};

export const REASSURANCES = [
  {
    title: "Paiement 100% Sécurisé",
    desc: "Transactions cryptées SSL. Cartes Bancaires, Visa, Mastercard et PayPal acceptés.",
    icon: "ShieldCheck"
  },
  {
    title: "Garantie OpenSaudi",
    desc: "Solidité d'une agence accréditée IATA, membre certifié Atout France (IM075190024).",
    icon: "Award"
  },
  {
    title: "Support Client Dédié 7j/7",
    desc: "Nos experts francophones vous accompagnent par chat et ligne téléphonique non surtaxée.",
    icon: "Headphones"
  },
  {
    title: "Totale Transparence",
    desc: "Tarifs nets, clairs, affichés taxes incluses avec zéro frais ajouté en surprise.",
    icon: "Coins"
  }
];
