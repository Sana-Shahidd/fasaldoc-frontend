import { useEffect, useState, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Star, Navigation, Package, RefreshCw,
  Locate, CheckCircle, XCircle, AlertCircle,
  ShoppingCart, Truck, Clock, ExternalLink, Globe, Search,
} from 'lucide-react'
import { fetchShops, fetchProducts } from '../api/client'
import { useStore } from '../store/store'
import type { Shop, ProductResult } from '../types/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { ONLINE_SHOPS } from '../data/online-shops'

type ShopMode = 'physical' | 'online' | 'both'

// Up to 1000 km — backend now accepts le=1000000
const API_MAX_RADIUS = 1_000_000

const RADII = [
  { label: '5 km',    value: 5_000     },
  { label: '25 km',   value: 25_000    },
  { label: '100 km',  value: 100_000   },
  { label: '500 km',  value: 500_000   },
  { label: '1000 km', value: 1_000_000 },
]

// Platform brand colours for product cards
const PLATFORM_COLORS: Record<string, string> = {
  daraz:     '#FF6000',
  kisaan:    '#1b4332',
  agristore: '#2d6a4f',
  bighaat:   '#f59e0b',
  agriplex:  '#16a34a',
  dehaat:    '#15803d',
}

// Build a Google Maps search URL for agri shops near a GPS point
function googleMapsAgriSearch(lat: number, lng: number, medicine: string): string {
  const q = encodeURIComponent(`زرعی دکان agricultural shop ${medicine} pesticide`)
  return `https://www.google.com/maps/search/${q}/@${lat},${lng},13z`
}

function formatDist(m: number | null): string {
  if (m == null) return ''
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`
}

export default function Shops() {
  const { t } = useTranslation()
  const navState    = useLocation().state as { medicines?: string[] } | null
  const storeCoords = useStore(s => s.lastLocation)

  const medicines: string[] = navState?.medicines ?? []

  // ── Mode tabs ──
  const [mode, setMode] = useState<ShopMode>('physical')

  // ── Physical shops ──
  const [shops, setShops]         = useState<Shop[]>([])
  const [coords, setCoords]       = useState<{ lat: number; lng: number } | null>(storeCoords)
  const [radius, setRadius]       = useState(25_000)
  const [gpsState, setGpsState]   = useState<'idle' | 'loading' | 'ok' | 'denied'>('idle')
  const [shopState, setShopState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [actualRadius, setActualRadius] = useState<number | null>(null)

  // ── Online product search ──
  const [products, setProducts]         = useState<ProductResult[]>([])
  const [productState, setProductState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const productStarted = useRef(false)

  /* ── GPS ── */
  const requestGps = useCallback(() => {
    if (!navigator.geolocation) { setGpsState('denied'); return }
    setGpsState('loading')
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGpsState('ok')
      },
      () => setGpsState('denied'),
      { timeout: 12000, enableHighAccuracy: true },
    )
  }, [])

  // Auto-request GPS on mount
  useEffect(() => {
    if (coords) { setGpsState('ok'); return }
    requestGps()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Physical shop search with auto-expand cascade to 1000 km ── */
  const loadShops = useCallback(async (c: { lat: number; lng: number }, startRadius: number) => {
    setShopState('loading')
    setStatusMsg(null)
    setShops([])

    // Cascade: try the selected radius, then expand progressively up to 1000 km
    const cascade = Array.from(
      new Set([startRadius, 25_000, 100_000, 500_000, 1_000_000])
    ).sort((a, b) => a - b).filter(r => r >= startRadius)

    for (let i = 0; i < cascade.length; i++) {
      const tryRadius = Math.min(cascade[i], API_MAX_RADIUS)
      if (i > 0) {
        setStatusMsg(
          `No shops at ${cascade[i - 1] / 1000} km — expanding to ${tryRadius / 1000} km…`
        )
      }
      try {
        const res = await fetchShops(c.lat, c.lng, medicines, tryRadius)
        if (res.shops.length > 0) {
          setShops(res.shops)
          setActualRadius(res.actual_radius ?? tryRadius)
          setStatusMsg(null)
          setShopState('ok')
          return
        }
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status
        if (status === 422) continue
        setShopState('error')
        setStatusMsg(null)
        return
      }
    }

    setShops([])
    setActualRadius(API_MAX_RADIUS)
    setStatusMsg(null)
    setShopState('ok')
  }, [medicines]) // eslint-disable-line react-hooks/exhaustive-deps

  // Run physical search whenever coords or radius changes
  useEffect(() => {
    if (coords) loadShops(coords, radius)
  }, [coords, radius]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Online product search ── */
  const loadProducts = useCallback(async () => {
    if (medicines.length === 0) { setProductState('ok'); return }
    setProductState('loading')
    try {
      const res = await fetchProducts(medicines)
      setProducts(res.products)
      setProductState('ok')
    } catch {
      setProductState('error')
    }
  }, [medicines])

  // Start product search when user visits online/both tab (once per page load)
  useEffect(() => {
    if ((mode === 'online' || mode === 'both') && !productStarted.current) {
      productStarted.current = true
      loadProducts()
    }
  }, [mode, loadProducts])

  const matchedShops = shops.filter(s => s.stocks_medicine != null)
  const sortedShops  = [
    ...shops.filter(s => s.stocks_medicine != null),
    ...shops.filter(s => s.stocks_medicine == null),
  ]

  const searchQuery = medicines.length > 0
    ? medicines[0]
    : 'agricultural pesticide fertilizer'

  const showPhysical = mode === 'physical' || mode === 'both'
  const showOnline   = mode === 'online'   || mode === 'both'

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">

      {/* ── Header ── */}
      <div className="bg-forest-800 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        {/* GPS status row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{t('shops.title')}</h1>
            {gpsState === 'loading' && (
              <p className="text-forest-200 text-xs mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-wheat-400 animate-pulse inline-block" />
                Acquiring GPS…
              </p>
            )}
            {gpsState === 'ok' && coords && (
              <p className="text-forest-200 text-xs mt-1 flex items-center gap-1">
                <CheckCircle size={11} className="text-teal-300" />
                Location found
                {actualRadius != null && (
                  <span className="ml-1">
                    · searched {actualRadius >= 1000 ? `${actualRadius / 1000} km` : `${actualRadius} m`}
                  </span>
                )}
              </p>
            )}
            {gpsState === 'denied' && (
              <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                <XCircle size={11} /> Location access denied
              </p>
            )}
          </div>

          {showPhysical && (
            <button
              onClick={requestGps}
              disabled={gpsState === 'loading'}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {gpsState === 'loading' ? <LoadingSpinner size={12} color="#fff" /> : <Locate size={13} />}
              {gpsState === 'loading' ? 'Locating…' : 'Update GPS'}
            </button>
          )}
        </div>

        {/* Medicine badges */}
        {medicines.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-xs text-forest-300 self-center">Looking for:</span>
            {medicines.map(m => (
              <span key={m} className="flex items-center gap-1 px-2.5 py-1 bg-white/15 rounded-full text-xs font-medium">
                <Package size={10} /> {m}
              </span>
            ))}
          </div>
        )}

        {/* ── Mode Tabs ── */}
        <div className="flex gap-2 mt-4">
          {([
            { id: 'physical' as ShopMode, label: t('shops.tab_physical'), icon: <MapPin size={13} /> },
            { id: 'online'   as ShopMode, label: t('shops.tab_online'),   icon: <ShoppingCart size={13} /> },
            { id: 'both'     as ShopMode, label: t('shops.tab_both'),     icon: <Globe size={13} /> },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                mode === tab.id
                  ? 'bg-white text-forest-800'
                  : 'bg-forest-700 text-forest-100 hover:bg-forest-600'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Radius selector — only for physical/both ── */}
        {showPhysical && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {RADII.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setRadius(value)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  radius === value
                    ? 'bg-white/90 text-forest-800'
                    : 'bg-forest-700 text-forest-100 hover:bg-forest-600'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => coords && loadShops(coords, radius)}
              disabled={!coords || shopState === 'loading'}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-forest-700 text-forest-100 disabled:opacity-50 hover:bg-forest-600"
            >
              <RefreshCw size={12} className={shopState === 'loading' ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        )}
      </div>

      <div className="px-5 md:px-8 -mt-4">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* ── Auto-expand status banner ── */}
          <AnimatePresence>
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-wheat-100 border border-wheat-200 rounded-2xl"
              >
                <LoadingSpinner size={16} />
                <p className="text-sm text-wheat-700">{statusMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════════════════════
              SECTION 1 — Physical Shops (GPS-based)
              Shown in "Physical Shops" and "Both" tabs
          ═══════════════════════════════════════════════ */}
          {showPhysical && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-forest-700" />
                <h2 className="font-bold text-forest-900">Nearby Shops</h2>
                {shopState === 'loading' && <LoadingSpinner size={14} />}
                {shopState === 'ok' && shops.length > 0 && (
                  <span className="ml-auto text-xs text-gray-400">
                    {shops.length} found
                    {matchedShops.length > 0 && (
                      <span className="text-severity-low font-medium"> · {matchedShops.length} with your medicine</span>
                    )}
                  </span>
                )}
              </div>

              {/* GPS loading / denied states */}
              {gpsState === 'loading' && !coords && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-10 shadow-card text-center">
                  <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
                    <Locate size={28} className="text-forest-600 animate-pulse" />
                  </div>
                  <p className="font-semibold text-forest-900 mb-1">Finding your location</p>
                  <p className="text-gray-400 text-sm">Allow location access when prompted</p>
                </motion.div>
              )}

              {gpsState === 'denied' && !coords && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-card text-center">
                  <AlertCircle size={40} className="text-severity-moderate mx-auto mb-3" />
                  <p className="font-semibold text-forest-900 mb-1">Location access denied</p>
                  <p className="text-gray-500 text-sm mb-5">Enable location in your browser or tap below.</p>
                  <button onClick={requestGps}
                    className="flex items-center gap-2 mx-auto px-5 py-3 bg-forest-800 text-white rounded-2xl font-semibold text-sm">
                    <Navigation size={16} /> Try again
                  </button>
                </motion.div>
              )}

              {/* Google Maps search card — always visible when GPS is ready */}
              {coords && gpsState === 'ok' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-3 rounded-3xl overflow-hidden border-2 border-forest-200 bg-white shadow-card"
                >
                  <div className="bg-forest-800 px-4 py-2.5 flex items-center gap-2">
                    <span className="text-lg">🗺️</span>
                    <div>
                      <p className="text-white text-xs font-bold">Search on Google Maps</p>
                      <p className="text-forest-200 text-[10px]">Google knows shops OSM doesn't — tap to find real agri stores near you</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-wrap gap-2">
                    {(medicines.length > 0 ? medicines.slice(0, 3) : ['pesticide fertilizer']).map(med => (
                      <a
                        key={med}
                        href={googleMapsAgriSearch(coords.lat, coords.lng, med)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-forest-800 text-white rounded-xl text-xs font-semibold hover:bg-forest-700 transition-colors"
                      >
                        <Navigation size={12} />
                        Find "{med.split(' ')[0]}" near me
                      </a>
                    ))}
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent('زرعی دکان agri pesticide shop')}/@${coords.lat},${coords.lng},12z`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 bg-earth-100 text-forest-800 rounded-xl text-xs font-semibold hover:bg-earth-200 transition-colors border border-forest-200"
                    >
                      <MapPin size={12} />
                      All agri shops nearby
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Loading spinner */}
              {shopState === 'loading' && !statusMsg && (
                <div className="flex flex-col items-center py-10 gap-3 bg-white rounded-3xl shadow-card">
                  <LoadingSpinner size={32} label="Searching nearby shops…" />
                </div>
              )}

              {/* Error */}
              {shopState === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex items-center gap-3">
                  <XCircle size={20} className="text-severity-high flex-shrink-0" />
                  <div>
                    <p className="text-severity-high text-sm font-medium">Could not reach the server</p>
                    <p className="text-xs text-red-400 mt-0.5">Check your connection and refresh.</p>
                  </div>
                </div>
              )}

              {/* Shop cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <AnimatePresence>
                  {shopState === 'ok' && sortedShops.map((shop, i) => {
                    const matched = shop.stocks_medicine != null
                    return (
                      <motion.div
                        key={shop.place_id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ delay: Math.min(i * 0.04, 0.25) }}
                        className={`bg-white rounded-3xl p-5 shadow-card border-2 ${
                          matched ? 'border-teal-200' : 'border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            matched ? 'bg-teal-50' : 'bg-earth-100'
                          }`}>
                            <MapPin size={18} className={matched ? 'text-severity-low' : 'text-gray-400'} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-semibold text-forest-900 text-sm truncate">{shop.name}</h3>
                              {matched && <CheckCircle size={13} className="text-severity-low flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{shop.address}</p>
                            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                              {shop.distance_m != null && (
                                <span className="flex items-center gap-1 text-xs text-forest-600 font-medium">
                                  <Navigation size={10} /> {formatDist(shop.distance_m)}
                                </span>
                              )}
                              {shop.rating != null && (
                                <span className="flex items-center gap-1 text-xs text-wheat-600 font-medium">
                                  <Star size={10} fill="currentColor" /> {shop.rating.toFixed(1)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Opens shop in Google Maps */}
                          <a
                            href={shop.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 bg-forest-50 text-forest-800 rounded-2xl text-xs font-bold border border-forest-200 hover:bg-forest-100 transition-colors"
                          >
                            <Navigation size={15} />
                            Go
                          </a>
                        </div>

                        {matched && (
                          <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-teal-50 rounded-2xl border border-teal-100">
                            <Package size={13} className="text-severity-low flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-severity-low truncate">{shop.stocks_medicine}</p>
                              <p className="text-[10px] text-teal-500">Recommended medicine available</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* No shops found — explain why and offer Google Maps as the real solution */}
              {shopState === 'ok' && shops.length === 0 && coords && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-card">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm">No shops in database</p>
                      <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
                        Most Pakistani agri shops are not registered on OpenStreetMap.
                        Use Google Maps below — it has real shops from your area.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(medicines.length > 0 ? medicines.slice(0, 3) : ['pesticide']).map(med => (
                      <a
                        key={med}
                        href={googleMapsAgriSearch(coords.lat, coords.lng, med)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-forest-800 text-white rounded-2xl text-xs font-bold hover:bg-forest-700 transition-colors"
                      >
                        <Navigation size={13} />
                        Search "{med.split(' ')[0]}" on Google Maps
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              SECTION 2 — Online Stores
              Shown in "Online Stores" and "Both" tabs
              Part A: actual product search results (new)
              Part B: direct store search links (existing, unchanged)
          ═══════════════════════════════════════════════ */}
          {showOnline && (
            <div>
              {/* ── Part A: Actual product availability search ── */}
              <div className="flex items-center gap-2 mb-3">
                <Search size={16} className="text-forest-700" />
                <h2 className="font-bold text-forest-900">Available Online</h2>
                {productState === 'loading' && <LoadingSpinner size={14} />}
                {productState === 'ok' && products.length > 0 && (
                  <span className="ml-auto text-xs text-gray-400">{products.length} products found</span>
                )}
              </div>

              {productState === 'loading' && (
                <div className="flex flex-col items-center py-10 gap-3 bg-white rounded-3xl shadow-card">
                  <LoadingSpinner size={32} label="Searching online stores…" />
                </div>
              )}

              {productState === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <XCircle size={20} className="text-severity-high flex-shrink-0" />
                    <p className="text-severity-high text-sm font-medium">Could not search online stores</p>
                  </div>
                  <button
                    onClick={loadProducts}
                    className="flex-shrink-0 px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-semibold"
                  >
                    Retry
                  </button>
                </div>
              )}

              {productState === 'ok' && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  <AnimatePresence>
                    {products.map((product, i) => (
                      <motion.div
                        key={product.url}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.05, 0.3) }}
                        className="bg-white rounded-3xl p-4 shadow-card flex flex-col"
                      >
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                            className="w-full h-28 object-contain rounded-2xl mb-3 bg-gray-50"
                          />
                        )}
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: PLATFORM_COLORS[product.platform_id] ?? '#555' }}
                          >
                            {product.platform}
                          </span>
                          {product.in_stock && (
                            <span className="text-[10px] font-medium px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">
                              In Stock
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-forest-900 line-clamp-2 flex-1">
                          {product.name}
                        </p>
                        {product.price && (
                          <p className="text-base font-bold text-forest-700 mt-1">{product.price}</p>
                        )}
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {product.delivery_days && (
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-earth-100 text-gray-600 rounded-full">
                              <Clock size={9} /> {product.delivery_days}
                            </span>
                          )}
                          {product.cash_on_delivery && (
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">
                              <Truck size={9} /> Cash on delivery
                            </span>
                          )}
                        </div>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-between w-full px-3 py-2.5 rounded-2xl text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: PLATFORM_COLORS[product.platform_id] ?? '#1b4332' }}
                        >
                          <span>Buy Now</span>
                          <ExternalLink size={12} />
                        </a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {productState === 'ok' && products.length === 0 && medicines.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl p-6 shadow-card text-center mb-6">
                  <ShoppingCart size={36} className="text-earth-200 mx-auto mb-2" />
                  <p className="font-medium text-gray-600 text-sm">No matching products found on these stores</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Use the manual search links below to browse yourself.
                  </p>
                </motion.div>
              )}

              {/* ── Part B: Existing store search links — UNCHANGED ── */}
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart size={16} className="text-forest-700" />
                <h2 className="font-bold text-forest-900">Order Online</h2>
                <span className="text-xs text-gray-400 ml-auto">Delivered to your door</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ONLINE_SHOPS.map((store, i) => (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="bg-white rounded-3xl p-4 shadow-card flex flex-col"
                  >
                    {/* Store header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ backgroundColor: store.color + '18' }}
                      >
                        {store.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-forest-900 text-sm leading-tight">{store.name}</p>
                        <p className="text-xs text-gray-400 leading-tight mt-0.5 truncate">{store.tagline}</p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-earth-100 text-gray-600 rounded-full">
                        <Clock size={9} /> {store.deliveryDays}
                      </span>
                      {store.cashOnDelivery && (
                        <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">
                          <Truck size={9} /> Cash on delivery
                        </span>
                      )}
                    </div>

                    {/* Search buttons for each medicine */}
                    <div className="space-y-2 mt-auto">
                      {medicines.length > 0 ? (
                        medicines.slice(0, 2).map(med => (
                          <a
                            key={med}
                            href={store.searchUrl(med)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full px-3 py-2.5 rounded-2xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: store.color }}
                          >
                            <span className="truncate mr-2">Search: {med.split(' ')[0]}</span>
                            <ExternalLink size={12} className="flex-shrink-0" />
                          </a>
                        ))
                      ) : (
                        <a
                          href={store.searchUrl(searchQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full px-3 py-2.5 rounded-2xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: store.color }}
                        >
                          <span>Browse Agri Products</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-xs text-gray-400 text-center mt-4 px-4">
                Online prices and availability may vary. Always verify product authenticity before purchase.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
