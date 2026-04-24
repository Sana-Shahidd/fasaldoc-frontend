import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Scan, History, Settings, Users, BookOpen, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

const tabs = [
  { to: '/',          icon: Scan,     key: 'home'      },
  { to: '/community', icon: Users,    key: 'community' },
  { to: '/videos',    icon: BookOpen, key: 'videos'    },
  { to: '/history',   icon: History,  key: 'history'   },
  { to: '/settings',  icon: Settings, key: 'settings'  },
]

export default function SideNav() {
  const { t } = useTranslation()

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-earth-100 flex-col z-40">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-earth-100">
        <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center">
          <Leaf size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-forest-900 text-sm leading-none">{t('app_name')}</p>
          <p className="text-gray-400 text-xs mt-1 leading-none">{t('tagline')}</p>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {tabs.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive ? 'bg-forest-50 text-forest-800' : 'text-gray-500 hover:bg-earth-50 hover:text-forest-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </motion.div>
                <span>{t(`nav.${key}`)}</span>
                {isActive && (
                  <motion.div
                    layoutId="side-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-forest-800"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-earth-100">
        <p className="text-xs text-gray-400">FasalDoc v1.0</p>
      </div>
    </nav>
  )
}
