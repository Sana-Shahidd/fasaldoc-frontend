import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Heart, MessageSquare, Send, MapPin, Leaf, Filter } from 'lucide-react'
import { useUserId } from '../hooks/useUserId'

type PostCategory = 'all' | 'disease' | 'weather' | 'tips'

interface Reply {
  id: string
  userId: string
  username: string
  text: string
  timestamp: string
}

interface Post {
  id: string
  userId: string
  username: string
  region: string
  text: string
  timestamp: string
  likes: number
  likedByUser: boolean
  category: Exclude<PostCategory, 'all'>
  replies: Reply[]
  emoji: string
}

const SEED: Post[] = [
  {
    id: 'p1', userId: 'u_ahmad', username: 'Ahmad Khan', region: 'Lahore, Punjab',
    text: 'میرے گندم کے کھیت میں پیلی زنگ کی علامات تھیں۔ فصل ڈاک نے 94% یقین کے ساتھ wheat rust بتایا۔ مینکوزیب لگانے کے بعد ایک ہفتے میں فرق محسوس ہوا۔ اللہ کا شکر! 🌾',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), likes: 23, likedByUser: false,
    category: 'disease', emoji: '🌾',
    replies: [
      { id: 'r1', userId: 'u_bilal', username: 'Bilal Ahmed', text: 'جزاک اللہ بھائی، بہت کام آئی یہ ایپ', timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString() },
    ]
  },
  {
    id: 'p2', userId: 'u_sara', username: 'Sara Malik', region: 'Faisalabad, Punjab',
    text: 'Tip for better scans: Take photos in morning light with the leaf on a white paper background. My accuracy went from 78% to 95%! 📸 Hope this helps.',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), likes: 41, likedByUser: false,
    category: 'tips', emoji: '📸',
    replies: [
      { id: 'r2', userId: 'u_rashid', username: 'Rashid Ali', text: 'Great tip! Will try this tomorrow.', timestamp: new Date(Date.now() - 4 * 3600000).toISOString() },
      { id: 'r3', userId: 'u_nadia', username: 'Nadia Hussain', text: 'Works perfectly, thanks Sara!', timestamp: new Date(Date.now() - 3 * 3600000).toISOString() },
    ]
  },
  {
    id: 'p3', userId: 'u_karim', username: 'Karim Baloch', region: 'Quetta, Balochistan',
    text: 'Powdery mildew on my grapes was destroying the crop. FasalDoc identified it instantly. Applied copper-based spray and things are looking much better after 10 days! Great app for farmers 🍇',
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), likes: 18, likedByUser: false,
    category: 'disease', emoji: '🍇',
    replies: []
  },
  {
    id: 'p4', userId: 'u_zainab', username: 'Zainab Qureshi', region: 'Hyderabad, Sindh',
    text: 'منهنجي ٽماٽر جي فصل تي ڪارا داغ پيا آهن. فصل ڊاڪ چيو bacterial spot آهي. ڪاپر اسپري شروع ڪيو آهي، اميد آهي ٺيڪ ٿي ويندا 🙏',
    timestamp: new Date(Date.now() - 12 * 3600000).toISOString(), likes: 9, likedByUser: false,
    category: 'disease', emoji: '🍅',
    replies: [
      { id: 'r4', userId: 'u_ali', username: 'Ali Hassan', text: 'پاڻي مٿان نه ڏيو، هيٺان ڏيو - بيماري گهٽ پکڙبي', timestamp: new Date(Date.now() - 10 * 3600000).toISOString() },
    ]
  },
  {
    id: 'p5', userId: 'u_nawaz', username: 'Nawaz Sharif', region: 'Multan, Punjab',
    text: 'کپاہ دے پودیاں تے سفید مکھیاں نے حملہ کیتا اے۔ Imidacloprid لگایا اے۔ کوئی ہور مشورہ دے سکدا اے؟ تجربہ کاراں دی مدد چاہیدی اے 🙏',
    timestamp: new Date(Date.now() - 18 * 3600000).toISOString(), likes: 14, likedByUser: false,
    category: 'tips', emoji: '🌿',
    replies: [
      { id: 'r5', userId: 'u_asif', username: 'Asif Mehmood', text: 'نیم دا تیل وی ورتو، قدرتی اے تے اثر وی کردا اے', timestamp: new Date(Date.now() - 16 * 3600000).toISOString() },
    ]
  },
  {
    id: 'p6', userId: 'u_fatima', username: 'Fatima Zahra', region: 'Islamabad',
    text: 'Weather warning: Heavy rains expected this week in Punjab. Good time to apply preventive fungicide before rains arrive. Better to be safe than sorry! ☔',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), likes: 67, likedByUser: false,
    category: 'weather', emoji: '☔',
    replies: []
  },
  {
    id: 'p7', userId: 'u_ijaz', username: 'Ijaz Ahmed', region: 'Gujranwala, Punjab',
    text: 'Crop rotation is the best investment I made. After rotating wheat-cotton-wheat for 3 years, my disease incidence dropped by 60% and I saved a lot on fungicides. Highly recommend! 🔄',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), likes: 89, likedByUser: false,
    category: 'tips', emoji: '🔄',
    replies: []
  },
]

const STORAGE_KEY = 'fasaldoc_community_posts'

function loadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /**/ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
  return SEED
}

function savePosts(posts: Post[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)) } catch { /**/ }
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const CAT_COLORS: Record<string, string> = {
  disease: 'bg-red-50 text-red-600 border-red-100',
  weather: 'bg-blue-50 text-blue-600 border-blue-100',
  tips:    'bg-teal-50 text-teal-600 border-teal-100',
}

export default function Community() {
  const { t } = useTranslation()
  const userId = useUserId()
  const [posts, setPosts] = useState<Post[]>(loadPosts)
  const [filter, setFilter] = useState<PostCategory>('all')
  const [newText, setNewText] = useState('')
  const [newCat, setNewCat] = useState<Exclude<PostCategory, 'all'>>('tips')
  const [replyTarget, setReplyTarget] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const visible = filter === 'all' ? posts : posts.filter(p => p.category === filter)

  function toggleLike(id: string) {
    setPosts(prev => {
      const next = prev.map(p =>
        p.id === id
          ? { ...p, likes: p.likedByUser ? p.likes - 1 : p.likes + 1, likedByUser: !p.likedByUser }
          : p
      )
      savePosts(next)
      return next
    })
  }

  function submitPost() {
    if (!newText.trim()) return
    const post: Post = {
      id: `p${Date.now()}`,
      userId,
      username: t('community.you'),
      region: '',
      text: newText.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      likedByUser: false,
      category: newCat,
      replies: [],
      emoji: newCat === 'disease' ? '🌿' : newCat === 'weather' ? '☀️' : '💡',
    }
    setPosts(prev => {
      const next = [post, ...prev]
      savePosts(next)
      return next
    })
    setNewText('')
  }

  function submitReply(postId: string) {
    if (!replyText.trim()) return
    setPosts(prev => {
      const next = prev.map(p => {
        if (p.id !== postId) return p
        const reply: Reply = {
          id: `r${Date.now()}`, userId, username: t('community.you'),
          text: replyText.trim(), timestamp: new Date().toISOString(),
        }
        return { ...p, replies: [...p.replies, reply] }
      })
      savePosts(next)
      return next
    })
    setReplyText('')
    setReplyTarget(null)
  }

  return (
    <div className="min-h-screen bg-earth-50 pb-28 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-600 text-white px-5 md:px-8 pt-12 md:pt-8 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Users size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t('community.title')}</h1>
            <p className="text-forest-200 text-xs">{posts.length} {t('community.members')}</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 -mt-3">
        <div className="max-w-3xl mx-auto space-y-4">
        {/* New post card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 shadow-card"
        >
          <textarea
            ref={textareaRef}
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder={t('community.post_placeholder')}
            rows={3}
            dir="auto"
            className="w-full text-sm text-gray-800 placeholder-gray-400 resize-none outline-none bg-earth-50 rounded-2xl px-4 py-3 border border-earth-100 focus:border-forest-300 transition-colors"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              {(['disease', 'weather', 'tips'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setNewCat(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors capitalize ${
                    newCat === c
                      ? 'bg-forest-800 text-white border-forest-800'
                      : 'bg-earth-50 text-gray-500 border-earth-200'
                  }`}
                >
                  {t(`community.cat_${c}`)}
                </button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={submitPost}
              disabled={!newText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-forest-800 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-opacity"
            >
              <Send size={14} />
              {t('community.post_btn')}
            </motion.button>
          </div>
        </motion.div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['all', 'disease', 'weather', 'tips'] as PostCategory[]).map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filter === c
                  ? 'bg-forest-800 text-white border-forest-800 shadow-soft'
                  : 'bg-white text-gray-500 border-earth-200'
              }`}
            >
              <Filter size={11} />
              {c === 'all' ? t('community.filter_all') : t(`community.cat_${c}`)}
            </button>
          ))}
        </div>

        {/* Posts */}
        <AnimatePresence>
          {visible.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-3xl p-4 shadow-card"
            >
              {/* Post header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-200 to-forest-400 flex items-center justify-center text-lg shadow-soft">
                    {post.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-forest-900 text-sm">{post.username}</p>
                    {post.region && (
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} /> {post.region}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${CAT_COLORS[post.category]}`}>
                    {t(`community.cat_${post.category}`)}
                  </span>
                  <span className="text-xs text-gray-400">{timeAgo(post.timestamp)}</span>
                </div>
              </div>

              {/* Post text */}
              <p className="text-sm text-gray-700 leading-relaxed mb-3" dir="auto">{post.text}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-earth-50">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    post.likedByUser ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  <motion.div whileTap={{ scale: 1.3 }} animate={post.likedByUser ? { scale: [1, 1.3, 1] } : {}}>
                    <Heart size={16} fill={post.likedByUser ? 'currentColor' : 'none'} />
                  </motion.div>
                  {post.likes}
                </button>
                <button
                  onClick={() => setReplyTarget(replyTarget === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-forest-600 font-medium transition-colors"
                >
                  <MessageSquare size={16} />
                  {post.replies.length > 0 ? post.replies.length : t('community.reply')}
                </button>
              </div>

              {/* Replies */}
              <AnimatePresence>
                {(replyTarget === post.id || post.replies.length > 0) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pl-3 border-l-2 border-earth-100 space-y-2">
                      {post.replies.map(r => (
                        <div key={r.id} className="bg-earth-50 rounded-xl px-3 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Leaf size={12} className="text-forest-400" />
                              <span className="text-xs font-semibold text-forest-800">{r.username}</span>
                            </div>
                            <span className="text-xs text-gray-400">{timeAgo(r.timestamp)}</span>
                          </div>
                          <p className="text-xs text-gray-700" dir="auto">{r.text}</p>
                        </div>
                      ))}

                      {replyTarget === post.id && (
                        <div className="flex gap-2 items-center mt-2">
                          <input
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && submitReply(post.id)}
                            placeholder={t('community.reply_placeholder')}
                            dir="auto"
                            className="flex-1 text-xs bg-earth-50 border border-earth-200 rounded-xl px-3 py-2 outline-none focus:border-forest-300 transition-colors"
                          />
                          <button
                            onClick={() => submitReply(post.id)}
                            disabled={!replyText.trim()}
                            className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center disabled:opacity-40"
                          >
                            <Send size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="text-center py-16">
            <Users size={48} className="text-earth-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">{t('community.empty')}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
