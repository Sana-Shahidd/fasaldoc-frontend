import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Scan, History, Settings, Users, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const tabs = [
  { to: '/',           icon: Scan,      key: 'home'      },
  { to: '/community',  icon: Users,     key: 'community' },
  { to: '/videos',     icon: BookOpen,  key: 'videos'    },
  { to: '/history',    icon: History,   key: 'history'   },
  { to: '/settings',   icon: Settings,  key: 'settings'  },
]

export default function BottomNav() {
  const { t } = useTranslation()

  return (
    <nav className="fixed bottom-0 inset-x-0 md:hidden bg-white/95 backdrop-blur-md border-t border-earth-100 safe-bottom z-40">
      <div className="flex">
        {tabs.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                isActive ? 'text-forest-800' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`relative p-1.5 rounded-xl transition-colors ${isActive ? 'bg-forest-50' : ''}`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-forest-800"
                    />
                  )}
                </motion.div>
                <span className="text-[10px] leading-tight">{t(`nav.${key}`)}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
