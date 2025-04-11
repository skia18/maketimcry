import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const moodImages = {
  neutral: '/images/neutral.png',
  happy: '/images/happy.png',
  sad: '/images/sad.png',
  angry: '/images/angry.png',
  crying: '/images/crying.png'
}

type Moodvariants = 'neutral' | 'happy' | 'sad' | 'angry' | 'crying'

export default function MoodFace({ mood }: { mood: Moodvariants }) {
  const [currentMood, setCurrentMood] = useState(mood)

  useEffect(() => {
    setCurrentMood(mood)
  }, [mood])

  return (
    <div className="flex size-full items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentMood}
          src={moodImages[currentMood]}
          alt={`${currentMood} face`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="size-64 rounded-2xl object-cover shadow-lg"
        />
      </AnimatePresence>
    </div>
  )
}
