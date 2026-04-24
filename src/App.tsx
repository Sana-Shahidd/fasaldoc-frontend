import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import SideNav from './components/SideNav'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import Results from './pages/Results'
import Treatment from './pages/Treatment'
import Shops from './pages/Shops'
import History from './pages/History'
import Settings from './pages/Settings'
import Community from './pages/Community'
import Videos from './pages/Videos'

const HIDE_NAV  = ['/treatment']
const HIDE_CHAT = ['/treatment']

export default function App() {
  const location = useLocation()
  const hideNav  = HIDE_NAV.some(p => location.pathname.startsWith(p))
  const hideChat = HIDE_CHAT.some(p => location.pathname.startsWith(p))

  return (
    <div className="flex min-h-screen bg-earth-50">
      <SideNav />
      <div className="flex-1 md:ml-64 relative min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"                    element={<Home />}      />
            <Route path="/results"             element={<Results />}   />
            <Route path="/treatment/:labelKey" element={<Treatment />} />
            <Route path="/shops"               element={<Shops />}     />
            <Route path="/history"             element={<History />}   />
            <Route path="/settings"            element={<Settings />}  />
            <Route path="/community"           element={<Community />} />
            <Route path="/videos"              element={<Videos />}    />
          </Routes>
        </AnimatePresence>

        {!hideNav  && <BottomNav />}
        {!hideChat && <ChatBot />}
      </div>
    </div>
  )
}
