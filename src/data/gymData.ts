/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  priceNaira: number;
  popular?: boolean;
  bestValue?: boolean;
  tagline: string;
  features: string[];
}

export interface FitnessProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Gym Interior' | 'Equipment' | 'Training Sessions' | 'Fitness Lifestyle' | 'Members Working Out';
  imageUrl: string;
  description?: string;
}

export interface Testimonial {
  name: string;
  source: string;
  rating: number;
  text: string;
  date?: string;
}

export interface GymBusinessConfig {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // international digits only, e.g. 2348050624590
  email: string;
  website: string;
  googleRating: number;
  googleReviewCount: number;
  closingTime: string;
  hoursMondayFriday: string;
  hoursSaturday: string;
  hoursSunday: string;
  promoBannerActive: boolean;
  promoBannerText: string;
}

export const INITIAL_BUSINESS_CONFIG: GymBusinessConfig = {
  name: "EKA FITNESS GYM",
  tagline: "BUILD YOUR STRENGTH. TRANSFORM YOUR LIFE.",
  address: "43 Liasu Road, Egbe",
  landmark: "Located within Ebun Heritage Foundation School",
  city: "Lagos",
  state: "Lagos State",
  postalCode: "102213",
  country: "Nigeria",
  phone: "+2348050624590",
  phoneDisplay: "0805 062 4590",
  whatsappNumber: "2348050624590",
  email: "contact@ekafitness.com",
  website: "ekafitness.com",
  googleRating: 4.8,
  googleReviewCount: 59,
  closingTime: "8:30 PM",
  hoursMondayFriday: "6:00 AM – 8:30 PM",
  hoursSaturday: "7:00 AM – 8:30 PM",
  hoursSunday: "Closed (Special sessions by appointment)",
  promoBannerActive: true,
  promoBannerText: "⚡ Join EKA Fitness Gym this month! Contact us directly on WhatsApp for ongoing package specials & personal training perks.",
};

export const INITIAL_PROGRAMS: FitnessProgram[] = [
  {
    id: "weight-training",
    title: "Weight Training",
    category: "Strength",
    description: "Structured barbell and dumbbell protocols designed to increase raw power, muscular density, and joint stability under expert supervision.",
    highlights: ["Olympic bars & plates", "Free-weight power cages", "Progressive overload coaching"],
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "muscle-building",
    title: "Muscle Building & Hypertrophy",
    category: "Bodybuilding",
    description: "Targeted hypertrophy routines with optimal volume, isolation machines, and time-under-tension techniques for balanced muscle sculpting.",
    highlights: ["Hypertrophy split routines", "Isolation cables & leverage gear", "Nutrition advice guidance"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "weight-loss",
    title: "Weight Loss & Conditioning",
    category: "Fat Loss",
    description: "High-metabolic circuit training combining resistance workouts with interval cardio to burn fat while preserving lean muscle mass.",
    highlights: ["HIIT circuit stations", "Heart-rate zone conditioning", "Sustainable fat burn plans"],
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "personal-training",
    title: "Personal Training",
    category: "1-on-1 Coaching",
    description: "Dedicated one-on-one sessions with our certified fitness coaches to accelerate your individual goals, correct form, and maintain consistency.",
    highlights: ["Custom workout roadmap", "Strict form correction", "Direct accountability coach"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "strength-conditioning",
    title: "Strength & Conditioning",
    category: "Athletics",
    description: "Comprehensive functional training that builds athletic speed, explosive power, mobility, and cardiovascular endurance.",
    highlights: ["Kettlebells & battle ropes", "Plyometric jump platforms", "Core stability foundations"],
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cardio-training",
    title: "Cardio & Endurance",
    category: "Cardio",
    description: "Top-tier motorized treadmills, stationary exercise bikes, and elliptical stations for stamina building and cardiovascular longevity.",
    highlights: ["Multi-incline treadmills", "Heart-rate monitoring", "Stamina & lung endurance"],
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "general-fitness",
    title: "General Fitness & Health",
    category: "Wellness",
    description: "Well-rounded functional movement routines aimed at boosting daily energy, relieving stress, improving posture, and longevity.",
    highlights: ["Full-body mobility", "Stress relief & mental clarity", "All fitness levels welcome"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "beginner-fitness",
    title: "Beginner Fitness Foundation",
    category: "Beginners",
    description: "Gentle, non-intimidating orientation program introducing gym machines, fundamental movement mechanics, and confidence building.",
    highlights: ["Zero-intimidation atmosphere", "Machine safety guidance", "Paced introductory workouts"],
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: "weekly",
    name: "Weekly Pass",
    duration: "Per Week",
    priceNaira: 7500,
    tagline: "Ideal for short-term visitors, trial workouts, and flexible travelers in Lagos.",
    features: [
      "Full gym floor & equipment access",
      "Locker room & changing facilities",
      "Standard cardio & weight machine usage",
      "Trainer on-floor form orientation",
      "No long-term commitment"
    ]
  },
  {
    id: "monthly",
    name: "Monthly Membership",
    duration: "Per Month",
    priceNaira: 25000,
    popular: true,
    tagline: "Our most popular membership plan for consistent weekly workout routines.",
    features: [
      "Unlimited daily gym access during opening hours",
      "Access to all free weights, squat racks & dumbbells",
      "Cardio zone & machine circuit access",
      "Free initial physical fitness assessment",
      "Complimentary workout routine guide",
      "Supportive gym community access"
    ]
  },
  {
    id: "quarterly",
    name: "Quarterly Membership",
    duration: "Every 3 Months",
    priceNaira: 65000,
    tagline: "12 weeks of structured commitment to achieve real physical body transformation.",
    features: [
      "All Monthly Membership perks included",
      "Significant discount vs monthly payment",
      "Monthly body composition progress check",
      "Custom routine adjustment every 4 weeks",
      "Guest pass privilege (1 guest per quarter)"
    ]
  },
  {
    id: "annual",
    name: "Annual Membership",
    duration: "Per Year",
    priceNaira: 220000,
    bestValue: true,
    tagline: "The ultimate lifestyle commitment for serious bodybuilding and lifelong health.",
    features: [
      "Unrestricted 365-day access",
      "Maximum cost savings for regular members",
      "Dedicated member profile & fitness tracking",
      "Priority consultation with head instructors",
      "Freeze privilege (up to 30 days pause)",
      "Official EKA Fitness gym gear pack"
    ]
  }
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Heavy Dumbbell & Free Weights Section",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
    description: "Quality calibrated dumbbells and heavy free-weight racks for progressive hypertrophy."
  },
  {
    id: "gal-2",
    title: "Modern Gym Floor & Training Environment",
    category: "Gym Interior",
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80",
    description: "Clean, spacious training facility designed for intense workouts and focus."
  },
  {
    id: "gal-3",
    title: "Dedicated Barbell Power Rack",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80",
    description: "Olympic barbell stations for squats, bench presses, and military presses."
  },
  {
    id: "gal-4",
    title: "Personal Trainer Guiding Member",
    category: "Training Sessions",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80",
    description: "Hands-on instruction from experienced, supportive trainers."
  },
  {
    id: "gal-5",
    title: "Female Member Deadlifting with Precision",
    category: "Members Working Out",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80",
    description: "Empowering environment welcoming both women and men."
  },
  {
    id: "gal-6",
    title: "Intense Bodybuilder Bicep Curl",
    category: "Training Sessions",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80",
    description: "Serious muscle sculpting and discipline in action."
  },
  {
    id: "gal-7",
    title: "High-Performance Cardio Treadmill Row",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80",
    description: "Top-end treadmills for interval sprints and long endurance runs."
  },
  {
    id: "gal-8",
    title: "Group Workout & Warmup Space",
    category: "Training Sessions",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    description: "Dynamic floor space for core exercises, calisthenics, and conditioning."
  },
  {
    id: "gal-9",
    title: "Athlete Hydration & Post-Workout Focus",
    category: "Fitness Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
    description: "Rest and recovery discipline inside a friendly gym community."
  },
  {
    id: "gal-10",
    title: "Olympic Barbell Weight Plates",
    category: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=1000&q=80",
    description: "Heavy cast-iron and bumper plates for serious strength benchmarks."
  },
  {
    id: "gal-11",
    title: "Functional Battle Ropes & Core Training",
    category: "Members Working Out",
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80",
    description: "Explosive metabolic conditioning for stamina and fat shredding."
  },
  {
    id: "gal-12",
    title: "Weight Room Interior & Mirror Grid",
    category: "Gym Interior",
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
    description: "Full-wall mirrors to monitor lifting posture and technique."
  },
  {
    id: "gal-13",
    title: "Heavy Barbell Deadlift Station",
    category: "Members Working Out",
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1000&q=80",
    description: "Dedicated lifting platforms built for heavy pulls."
  },
  {
    id: "gal-14",
    title: "Coaching Orientation for Beginners",
    category: "Fitness Lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80",
    description: "Every beginner receives friendly, patient instruction."
  },
  {
    id: "gal-15",
    title: "Calisthenics & Upper Body Work",
    category: "Training Sessions",
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1000&q=80",
    description: "Pull-up bars, dip stations, and gymnastics rings for functional athleticism."
  },
  {
    id: "gal-16",
    title: "Core Conditioning & Floor Movement",
    category: "Members Working Out",
    imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80",
    description: "Mat work and mobility drills to protect joints and build abdominal power."
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    name: "Adole Grace",
    source: "Google Review",
    rating: 5,
    text: "So far I have had a really good time at the gym. The staff are welcoming and management always tries to update the gym with new equipment."
  },
  {
    name: "Obayomi Victor",
    source: "Google Review",
    rating: 5,
    text: "It's been nice so far. Amazing trainers and staff. Great community."
  },
  {
    name: "Kelvin Amadi",
    source: "Google Review",
    rating: 5,
    text: "EKA Fitness Gym is well equipped with a nice environment and well-trained instructors."
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    id: "equipment",
    title: "Quality Gym Equipment",
    description: "Continuously updated resistance machines, heavy-duty Olympic barbells, calibrated dumbbells, and high-performance cardio stations."
  },
  {
    id: "staff",
    title: "Welcoming & Courteous Staff",
    description: "A warm, respectful front desk and management that makes every member feel valued from day one."
  },
  {
    id: "instructors",
    title: "Professional Instructors",
    description: "Certified trainers with real coaching experience ready to teach proper form, spot heavy lifts, and guide your routine."
  },
  {
    id: "cleanliness",
    title: "Clean Training Environment",
    description: "Hygienic gym floor, sanitized equipment, clean ventilation, and well-maintained changing areas."
  },
  {
    id: "community",
    title: "Supportive Fitness Community",
    description: "An uplifting, high-energy Nigerian community of members motivating each other toward personal transformation."
  },
  {
    id: "location",
    title: "Convenient Lagos Location",
    description: "Easily accessible at 43 Liasu Road, Egbe, located safely within Ebun Heritage Foundation School with parking."
  }
];

// Helper to format Nigerian Naira
export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

// Helper to generate WhatsApp link
export function createWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
