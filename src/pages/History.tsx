import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { History as HistoryIcon, Leaf, TrendingUp } from 'lucide-react'
import { fetchHistory } from '../api/client'
import { useUserId } from '../hooks/useUserId'
import type { ScanRecord } from '../types/api'
import SeverityBadge from '../components/SeverityBadge'
import LoadingSpinner from '../components/LoadingSpinner'

function severityFromConfidence(c: number): 'high' | 'moderate' | 'low' {
  if (c >= 0.85) return 'high'
  if (c >= 0.65) return 'moderate'
  return 'low'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function History() {
  const { t } = useTranslation()
  const userId = useUserId()
  const [scans, setScans] = useState<ScanRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHistory(userId)
      .then(r => setScans(r.scans))
      .catch(() => setError(t('errors.network')))
      .finally(() => setLoading(false))
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">
      <div className="bg-forest-800 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        <div className="flex items-center gap-2.5">
          <HistoryIcon size={22} />
          <h1 className="text-xl font-bold">{t('history.title')}</h1>
        </div>
        {scans.length > 0 && (
          <p className="text-forest-200 text-sm mt-1 flex items-center gap-1.5">
            <TrendingUp size={14} />
            {scans.length} scan{scans.length !== 1 ? 's' : ''} recorded
          </p>
        )}
      </div>

      <div className="px-5 md:px-8 -mt-4">
        <div className="max-w-5xl mx-auto">
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-4 mt-4 text-center">
            <p className="text-severity-high text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <AnimatePresence>
          {!loading && scans.map((scan, i) => (
            <motion.div
              key={scan.scan_id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl p-4 shadow-card flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                <Leaf size={22} className="text-forest-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-forest-900 text-sm truncate">{scan.disease_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(scan.timestamp)}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t('history.confidence', { val: (scan.confidence * 100).toFixed(0) })}
                </p>
              </div>

              <SeverityBadge severity={severityFromConfidence(scan.confidence)} size="sm" />
            </motion.div>
          ))}
        </AnimatePresence>
        </div>

        {!loading && !error && scans.length === 0 && (
          <div className="text-center py-20">
            <Leaf size={48} className="text-earth-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">{t('history.empty')}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
