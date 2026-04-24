export interface OnlineShop {
  id: string
  name: string
  tagline: string
  emoji: string
  color: string
  homeUrl: string
  searchUrl: (query: string) => string
  cashOnDelivery: boolean
  deliveryDays: string
}

export const ONLINE_SHOPS: OnlineShop[] = [
  // ── Pakistani stores ──────────────────────────────────────────────────────
  {
    id: 'daraz',
    name: 'Daraz',
    tagline: 'Pakistan\'s largest online store',
    emoji: '🛒',
    color: '#FF6000',
    homeUrl: 'https://www.daraz.pk',
    searchUrl: q => `https://www.daraz.pk/catalog/?q=${encodeURIComponent(q)}`,
    cashOnDelivery: true,
    deliveryDays: '2–5 days',
  },
  {
    id: 'kisaan',
    name: 'Kissan Store',
    tagline: 'Agriculture marketplace for farmers',
    emoji: '🌾',
    color: '#1b4332',
    homeUrl: 'https://kissanstore.pk',
    searchUrl: q => `https://kissanstore.pk/?s=${encodeURIComponent(q)}`,
    cashOnDelivery: true,
    deliveryDays: '3–7 days',
  },
  {
    id: 'agristore',
    name: 'AgriStore.pk',
    tagline: 'Dedicated agri chemicals & seeds',
    emoji: '🧪',
    color: '#2d6a4f',
    homeUrl: 'https://agristore.pk',
    searchUrl: q => `https://agristore.pk/?s=${encodeURIComponent(q)}`,
    cashOnDelivery: true,
    deliveryDays: '3–6 days',
  },
  {
    id: 'olx',
    name: 'OLX Pakistan',
    tagline: 'Buy locally at lower prices',
    emoji: '📦',
    color: '#3d4f58',
    homeUrl: 'https://www.olx.com.pk',
    searchUrl: q => `https://www.olx.com.pk/items/q-${encodeURIComponent(q)}`,
    cashOnDelivery: false,
    deliveryDays: 'Pickup / local',
  },

  // ── South Asian agri specialists ─────────────────────────────────────────
  {
    id: 'bighaat',
    name: 'BigHaat',
    tagline: 'Trusted agri-input marketplace',
    emoji: '🌱',
    color: '#f59e0b',
    homeUrl: 'https://www.bighaat.com',
    searchUrl: q => `https://www.bighaat.com/search?q=${encodeURIComponent(q)}&type=product`,
    cashOnDelivery: true,
    deliveryDays: '4–8 days',
  },
  {
    id: 'agriplex',
    name: 'Agriplex',
    tagline: 'Quality crop-protection inputs',
    emoji: '🔬',
    color: '#16a34a',
    homeUrl: 'https://www.agriplex.in',
    searchUrl: q => `https://www.agriplex.in/search?q=${encodeURIComponent(q)}`,
    cashOnDelivery: true,
    deliveryDays: '3–7 days',
  },
  {
    id: 'dehaat',
    name: 'DeHaat',
    tagline: 'End-to-end farmer services',
    emoji: '🚜',
    color: '#15803d',
    homeUrl: 'https://www.dehaat.com',
    searchUrl: q => `https://www.dehaat.com/search?q=${encodeURIComponent(q)}`,
    cashOnDelivery: true,
    deliveryDays: '3–6 days',
  },

  // ── Wholesale / international ─────────────────────────────────────────────
  {
    id: 'alibaba',
    name: 'Alibaba',
    tagline: 'Bulk wholesale — best prices',
    emoji: '🏭',
    color: '#FF6A00',
    homeUrl: 'https://www.alibaba.com',
    searchUrl: q => `https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(q + ' pesticide Pakistan')}`,
    cashOnDelivery: false,
    deliveryDays: '7–20 days',
  },
  {
    id: 'aliexpress',
    name: 'AliExpress',
    tagline: 'International shipping to Pakistan',
    emoji: '✈️',
    color: '#e62e04',
    homeUrl: 'https://www.aliexpress.com',
    searchUrl: q => `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(q)}`,
    cashOnDelivery: false,
    deliveryDays: '15–30 days',
  },
]
