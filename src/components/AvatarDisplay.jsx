import { motion } from 'framer-motion';
import { useChatStore } from '../store/useChatStore';

export const AvatarDisplay = () => {
  const { currentMood } = useChatStore();
  
  // Mood-based animations - more pronounced and character-appropriate
  const moodVariants = {
    jealous: { 
      scale: [1, 1.08, 0.98, 1.05, 1],
      rotate: [0, -3, 3, -2, 0],
      x: [0, -2, 2, 0],
      transition: { 
        duration: 1.2, 
        repeat: Infinity, 
        repeatDelay: 1.5,
        ease: "easeInOut"
      }
    },
    clingy: {
      scale: [1, 1.15, 1.05, 1.12, 1],
      y: [0, -5, 0],
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatDelay: 0.8,
        ease: "easeInOut"
      }
    },
    gaslight: {
      x: [0, -4, 4, -3, 3, 0],
      rotate: [0, -1, 1, 0],
      opacity: [1, 0.95, 1, 0.98, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatDelay: 1,
        ease: "easeInOut"
      }
    },
    dismissive: {
      opacity: [1, 0.6, 0.8, 0.7, 1],
      scale: [1, 0.95, 1],
      y: [0, 2, 0],
      transition: { 
        duration: 2.5, 
        repeat: Infinity, 
        repeatDelay: 2,
        ease: "easeInOut"
      }
    }
  };
  
  // Mouth animation based on mood
  const mouthVariants = {
    jealous: {
      d: ["M 80 120 Q 100 115, 120 120", "M 80 120 Q 100 118, 120 120", "M 80 120 Q 100 115, 120 120"],
      transition: { duration: 0.8, repeat: Infinity }
    },
    clingy: {
      d: ["M 80 120 Q 100 130, 120 120", "M 80 120 Q 100 125, 120 120", "M 80 120 Q 100 130, 120 120"],
      transition: { duration: 1, repeat: Infinity }
    },
    gaslight: {
      d: ["M 80 120 Q 100 125, 120 120", "M 85 120 Q 100 125, 115 120", "M 80 120 Q 100 125, 120 120"],
      transition: { duration: 1.2, repeat: Infinity }
    },
    dismissive: {
      d: ["M 80 120 Q 100 120, 120 120", "M 80 120 Q 100 120, 120 120"],
      transition: { duration: 2, repeat: Infinity }
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative"
        variants={moodVariants}
        animate={currentMood}
        initial={false}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 200 200"
          className="drop-shadow-2xl"
        >
          {/* Head */}
          <ellipse
            cx="100"
            cy="80"
            rx="60"
            ry="70"
            fill="#2d2d2d"
            stroke="#1a1a1a"
            strokeWidth="2"
          />
          
          {/* Hair covering eyes - emo style, more dramatic */}
          <path
            d="M 45 55 Q 35 35, 45 25 Q 55 15, 75 20 Q 100 15, 125 20 Q 145 15, 155 25 Q 165 35, 155 55 L 155 105 Q 145 115, 125 110 Q 100 115, 75 110 Q 55 115, 45 105 Z"
            fill="#1a1a1a"
          />
          
          {/* Hair texture/details */}
          <path
            d="M 50 50 Q 45 40, 50 30"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 150 50 Q 155 40, 150 30"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          
          {/* Mouth - animated based on mood */}
          <motion.path
            d="M 80 120 Q 100 125, 120 120"
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            variants={mouthVariants}
            animate={currentMood}
            initial={false}
          />
          
          {/* Body - t-shirt */}
          <rect
            x="70"
            y="140"
            width="60"
            height="50"
            rx="5"
            fill="#dc2626"
            stroke="#1a1a1a"
            strokeWidth="2"
          />
          
          {/* Stripes on shirt - 4 horizontal stripes */}
          <line x1="70" y1="152" x2="130" y2="152" stroke="#1a1a1a" strokeWidth="3" />
          <line x1="70" y1="165" x2="130" y2="165" stroke="#1a1a1a" strokeWidth="3" />
          <line x1="70" y1="178" x2="130" y2="178" stroke="#1a1a1a" strokeWidth="3" />
          <line x1="70" y1="191" x2="130" y2="191" stroke="#1a1a1a" strokeWidth="3" />
          
          {/* Arms - slightly animated */}
          <motion.line 
            x1="70" 
            y1="160" 
            x2="50" 
            y2="180" 
            stroke="#2d2d2d" 
            strokeWidth="8" 
            strokeLinecap="round"
            animate={currentMood === 'clingy' ? { 
              y2: [180, 175, 180],
              transition: { duration: 1, repeat: Infinity }
            } : {}}
          />
          <motion.line 
            x1="130" 
            y1="160" 
            x2="150" 
            y2="180" 
            stroke="#2d2d2d" 
            strokeWidth="8" 
            strokeLinecap="round"
            animate={currentMood === 'clingy' ? { 
              y2: [180, 175, 180],
              transition: { duration: 1, repeat: Infinity, delay: 0.2 }
            } : {}}
          />
          
          {/* Legs */}
          <line x1="85" y1="190" x2="85" y2="200" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" />
          <line x1="115" y1="190" x2="115" y2="200" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
};

