import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

interface Props {
  severity: 'high' | 'moderate' | 'low' | null
  size?: 'sm' | 'md'
}

const config = {
  high:     { icon: AlertTriangle, bg: 'bg-red-50',    text: 'text-severity-high',     border: 'border-red-200',   key: 'severity_high'     },
  moderate: { icon: AlertCircle,   bg: 'bg-orange-50', text: 'text-severity-moderate', border: 'border-orange-200',key: 'severity_moderate' },
  low:      { icon: CheckCircle,   bg: 'bg-teal-50',   text: 'text-severity-low',      border: 'border-teal-200',  key: 'severity_low'      },
}

export default function SeverityBadge({ severity, size = 'md' }: Props) {
  const { t } = useTranslation()
  if (!severity) return null

  const { icon: Icon, bg, text, border, key } = config[severity]
  const isHigh = severity === 'high'

  return (
    <motion.span
      animate={isHigh ? { scale: [1, 1.03, 1] } : {}}
      transition={isHigh ? { repeat: Infinity, duration: 2 } : {}}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-semibold ${bg} ${text} ${border} ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      }`}
    >
      <Icon size={size === 'sm' ? 12 : 14} />
      {t(`results.${key}`)}
    </motion.span>
  )
}
