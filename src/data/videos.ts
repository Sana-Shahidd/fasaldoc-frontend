export type VideoCategory = 'all' | 'disease' | 'pesticide' | 'irrigation' | 'organic' | 'general'

export interface VideoItem {
  id: string
  title: string
  titleUr: string
  description: string
  category: Exclude<VideoCategory, 'all'>
  duration: string
  youtubeSearch: string
  color: string
  emoji: string
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Wheat Rust Disease: Identification & Control',
    titleUr: 'گندم کی زنگ بیماری: پہچان اور کنٹرول',
    description: 'Learn to identify yellow, brown, and black rust in wheat and apply effective fungicide treatments.',
    category: 'disease',
    duration: '10 min',
    youtubeSearch: 'wheat rust disease identification control treatment Pakistan',
    color: '#f59e0b',
    emoji: '🌾',
  },
  {
    id: 'v2',
    title: 'Cotton Leaf Curl Virus: Prevention Tips',
    titleUr: 'کپاس لیف کرل وائرس: احتیاطی تدابیر',
    description: 'Understand CLCuV symptoms, whitefly management, and resistant cotton varieties.',
    category: 'disease',
    duration: '8 min',
    youtubeSearch: 'cotton leaf curl virus CLCuV whitefly control Pakistan',
    color: '#ec4899',
    emoji: '🌿',
  },
  {
    id: 'v3',
    title: 'Early vs Late Blight in Potatoes',
    titleUr: 'آلو کی ارلی اور لیٹ بلائٹ میں فرق',
    description: 'Visual guide to distinguishing early and late blight and applying the right fungicide.',
    category: 'disease',
    duration: '12 min',
    youtubeSearch: 'potato early late blight identification fungicide treatment',
    color: '#8b5cf6',
    emoji: '🥔',
  },
  {
    id: 'v4',
    title: 'Safe Pesticide Application Techniques',
    titleUr: 'کیڑا مار دوائی کے محفوظ استعمال کا طریقہ',
    description: 'Complete guide on PPE, sprayer calibration, dosage measurement, and safe disposal.',
    category: 'pesticide',
    duration: '15 min',
    youtubeSearch: 'pesticide application safety equipment PPE farmer guide',
    color: '#f97316',
    emoji: '⚗️',
  },
  {
    id: 'v5',
    title: 'Mancozeb Usage: Dosage & Timing Guide',
    titleUr: 'مینکوزیب استعمال: مقدار اور وقت کی رہنمائی',
    description: 'How to mix and apply Mancozeb fungicide correctly for maximum effectiveness.',
    category: 'pesticide',
    duration: '9 min',
    youtubeSearch: 'mancozeb fungicide dosage mixing application guide',
    color: '#06b6d4',
    emoji: '🧪',
  },
  {
    id: 'v6',
    title: 'Neem Oil as Natural Pesticide',
    titleUr: 'نیم کا تیل: قدرتی کیڑا مار دوا',
    description: 'How to make and apply neem oil spray for aphids, whitefly, and fungal diseases.',
    category: 'organic',
    duration: '7 min',
    youtubeSearch: 'neem oil spray natural pesticide homemade aphids fungal',
    color: '#10b981',
    emoji: '🌱',
  },
  {
    id: 'v7',
    title: 'Composting Techniques for Soil Health',
    titleUr: 'مٹی کی صحت کے لیے کمپوسٹ بنانے کا طریقہ',
    description: 'Step-by-step guide to making high-quality compost that boosts soil fertility.',
    category: 'organic',
    duration: '13 min',
    youtubeSearch: 'composting techniques soil health organic fertilizer farm',
    color: '#84cc16',
    emoji: '♻️',
  },
  {
    id: 'v8',
    title: 'Drip Irrigation: Installation & Benefits',
    titleUr: 'ڈرپ آبپاشی: نصب اور فوائد',
    description: 'Save 50% water and reduce disease with drip irrigation. Learn setup and maintenance.',
    category: 'irrigation',
    duration: '11 min',
    youtubeSearch: 'drip irrigation installation benefits small farm water saving',
    color: '#3b82f6',
    emoji: '💧',
  },
  {
    id: 'v9',
    title: 'Water Management in Rice Fields',
    titleUr: 'چاول کے کھیتوں میں پانی کا انتظام',
    description: 'Alternate wetting and drying techniques for rice to save water and increase yield.',
    category: 'irrigation',
    duration: '10 min',
    youtubeSearch: 'rice water management alternate wetting drying AWD irrigation',
    color: '#0ea5e9',
    emoji: '🍚',
  },
  {
    id: 'v10',
    title: 'Crop Rotation Best Practices',
    titleUr: 'فصل بدلنے کے بہترین طریقے',
    description: 'How rotating crops breaks disease cycles, improves soil and boosts long-term yield.',
    category: 'general',
    duration: '14 min',
    youtubeSearch: 'crop rotation best practices soil health disease prevention',
    color: '#1b4332',
    emoji: '🔄',
  },
  {
    id: 'v11',
    title: 'Integrated Pest Management (IPM) for Farmers',
    titleUr: 'کسانوں کے لیے مربوط کیڑا انتظام',
    description: 'Combine biological, cultural, and chemical methods to minimize pesticide use.',
    category: 'general',
    duration: '16 min',
    youtubeSearch: 'integrated pest management IPM farmers biological chemical',
    color: '#d97706',
    emoji: '🐛',
  },
  {
    id: 'v12',
    title: 'Apple Scab: Symptoms and Treatment',
    titleUr: 'سیب کی اسکیب بیماری: علامات اور علاج',
    description: 'Complete guide to managing apple scab with timing of fungicide sprays.',
    category: 'disease',
    duration: '8 min',
    youtubeSearch: 'apple scab disease symptoms fungicide spray schedule',
    color: '#ef4444',
    emoji: '🍎',
  },
]

export const CATEGORIES: { key: VideoCategory; label: string; labelUr: string }[] = [
  { key: 'all',       label: 'All',        labelUr: 'سب'           },
  { key: 'disease',   label: 'Diseases',   labelUr: 'بیماریاں'    },
  { key: 'pesticide', label: 'Pesticides', labelUr: 'کیڑا مار'    },
  { key: 'irrigation',label: 'Irrigation', labelUr: 'آبپاشی'      },
  { key: 'organic',   label: 'Organic',    labelUr: 'قدرتی'       },
  { key: 'general',   label: 'General',    labelUr: 'عمومی'       },
]
