import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, RotateCcw, ZoomIn } from 'lucide-react'

interface Props {
  open: boolean
  onCapture: (file: File) => void
  onClose: () => void
}

export default function CameraModal({ open, onCapture, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [flash, setFlash] = useState(false)

  async function startStream(mode: 'environment' | 'user') {
    // Stop existing stream
    streamRef.current?.getTracks().forEach(t => t.stop())
    setReady(false)
    setError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => setReady(true)
      }
    } catch {
      setError('Camera access denied. Please allow camera permission in your browser.')
    }
  }

  useEffect(() => {
    if (open) {
      startStream(facingMode)
    } else {
      streamRef.current?.getTracks().forEach(t => t.stop())
      setReady(false)
      setError(null)
    }
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  function flipCamera() {
    const next = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(next)
    startStream(next)
  }

  function capture() {
    if (!videoRef.current || !canvasRef.current || !ready) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')!.drawImage(video, 0, 0)

    // Flash effect
    setFlash(true)
    setTimeout(() => setFlash(false), 200)

    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' })
      streamRef.current?.getTracks().forEach(t => t.stop())
      onCapture(file)
      onClose()
    }, 'image/jpeg', 0.92)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col"
        >
          {/* Flash overlay */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white z-10 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-12 pb-4 z-10">
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <X size={20} className="text-white" />
            </button>
            <p className="text-white text-sm font-medium">Point at the leaf</p>
            <button onClick={flipCamera} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <RotateCcw size={18} className="text-white" />
            </button>
          </div>

          {/* Video */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Viewfinder overlay */}
            {ready && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 relative">
                  {/* Corner markers */}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-8 h-8`}>
                      <div className={`absolute w-full h-0.5 bg-white ${i < 2 ? 'top-0' : 'bottom-0'}`} />
                      <div className={`absolute h-full w-0.5 bg-white ${i % 2 === 0 ? 'left-0' : 'right-0'}`} />
                    </div>
                  ))}
                  <ZoomIn size={20} className="text-white/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <div className="bg-black/70 rounded-3xl p-6 text-center">
                  <p className="text-white text-sm mb-4">{error}</p>
                  <button onClick={onClose} className="px-4 py-2 bg-white text-black rounded-xl text-sm font-semibold">Close</button>
                </div>
              </div>
            )}

            {/* Loading */}
            {!ready && !error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/60 text-sm">Starting camera...</div>
              </div>
            )}
          </div>

          {/* Capture button */}
          <div className="flex items-center justify-center py-10 z-10">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={capture}
              disabled={!ready}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-float disabled:opacity-40"
            >
              <div className="w-16 h-16 rounded-full border-4 border-forest-800 flex items-center justify-center">
                <Camera size={28} className="text-forest-800" />
              </div>
            </motion.button>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
