import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, Clock, ExternalLink, BookOpen } from 'lucide-react'
import { VIDEOS, CATEGORIES, type VideoCategory, type VideoItem } from '../data/videos'

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const { i18n } = useTranslation()
  const isRtl = ['ur', 'pa', 'sd'].includes(i18n.language?.slice(0, 2))

  const categoryColors: Record<string, string> = {
    disease:   'bg-red-50 text-red-600 border-red-100',
    pesticide: 'bg-orange-50 text-orange-600 border-orange-100',
    irrigation:'bg-blue-50 text-blue-600 border-blue-100',
    organic:   'bg-emerald-50 text-emerald-600 border-emerald-100',
    general:   'bg-forest-50 text-forest-700 border-forest-100',
  }

  function openVideo() {
    const q = encodeURIComponent(video.youtubeSearch)
    window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank', 'noopener')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-float transition-shadow"
    >
      {/* Thumbnail */}
      <div
        className="relative h-36 flex items-center justify-center cursor-pointer select-none"
        style={{ background: `linear-gradient(135deg, ${video.color}22, ${video.color}44)` }}
        onClick={openVideo}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-float"
          style={{ background: video.color + '22', border: `2px solid ${video.color}44` }}
        >
          {video.emoji}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          style={{ background: `${video.color}33` }}
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-float">
            <PlayCircle size={32} style={{ color: video.color }} fill={video.color} strokeWidth={0} />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
          <Clock size={10} />
          {video.duration}
        </div>
        {/* Category badge */}
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${categoryColors[video.category]}`}>
          {video.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-forest-900 text-sm leading-snug mb-1">
          {isRtl ? video.titleUr : video.title}
        </h3>
        {isRtl && (
          <p className="text-xs text-forest-600 leading-snug mb-2" dir="rtl">{video.titleUr}</p>
        )}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{video.description}</p>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={openVideo}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-forest-800 text-white rounded-2xl text-sm font-semibold hover:bg-forest-700 transition-colors"
        >
          <ExternalLink size={14} />
          Watch on YouTube
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Videos() {
  const { t, i18n } = useTranslation()
  const isRtl = ['ur', 'pa', 'sd'].includes(i18n.language?.slice(0, 2))
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all')

  const filtered = activeCategory === 'all'
    ? VIDEOS
    : VIDEOS.filter(v => v.category === activeCategory)

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-600 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t('videos.title')}</h1>
            <p className="text-forest-200 text-xs">{t('videos.subtitle')}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-3">
          <div className="bg-white/10 rounded-2xl px-3 py-2 text-center flex-1">
            <p className="text-white font-bold text-lg">{VIDEOS.length}</p>
            <p className="text-forest-200 text-xs">Videos</p>
          </div>
          <div className="bg-white/10 rounded-2xl px-3 py-2 text-center flex-1">
            <p className="text-white font-bold text-lg">Free</p>
            <p className="text-forest-200 text-xs">Always</p>
          </div>
          <div className="bg-white/10 rounded-2xl px-3 py-2 text-center flex-1">
            <p className="text-white font-bold text-lg">4</p>
            <p className="text-forest-200 text-xs">Languages</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 -mt-3">
        <div className="max-w-6xl mx-auto space-y-4">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pt-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeCategory === cat.key
                  ? 'bg-forest-800 text-white border-forest-800 shadow-soft'
                  : 'bg-white text-gray-500 border-earth-200 hover:border-forest-200'
              }`}
            >
              {isRtl ? cat.labelUr : cat.label}
            </button>
          ))}
        </div>

        {/* Note card */}
        <div className="bg-wheat-100 border border-wheat-200 rounded-2xl px-4 py-3 flex items-start gap-2">
          <span className="text-lg">📺</span>
          <p className="text-xs text-wheat-600 leading-relaxed">
            {t('videos.youtube_note')}
          </p>
        </div>

        {/* Video grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
