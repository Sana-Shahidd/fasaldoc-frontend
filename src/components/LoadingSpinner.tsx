import { motion } from 'framer-motion'

interface Props {
  size?: number
  color?: string
  label?: string
}

export default function LoadingSpinner({ size = 40, color = '#1B4332', label }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <circle cx="20" cy="20" r="16" fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="4" />
        <path
          d="M 20 4 A 16 16 0 0 1 36 20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.svg>
      {label && <p className="text-sm text-forest-600 font-medium">{label}</p>}
    </div>
  )
}
