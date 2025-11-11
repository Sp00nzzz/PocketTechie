import { motion } from 'framer-motion';
import { useChatStore } from '../store/useChatStore';

const moodEmojis = {
  jealous: '😠',
  clingy: '😍',
  gaslight: '😏',
  dismissive: '😑'
};

const moodLabels = {
  jealous: 'Jealous',
  clingy: 'Clingy',
  gaslight: 'Gaslight',
  dismissive: 'Dismissive'
};

export const StatusBar = () => {
  const { currentMood } = useChatStore();
  
  // Calculate heart states based on mood (1 full, 4 broken for toxic effect)
  const hearts = [true, false, false, false, false];
  
  return (
    <div className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-emo-text">Toxic BF</span>
          <div className="flex items-center gap-2">
            <span className="text-xl">{moodEmojis[currentMood]}</span>
            <span className="text-sm text-emo-text">{moodLabels[currentMood]}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {hearts.map((isFull, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {isFull ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#ef4444"
                    stroke="#dc2626"
                    strokeWidth="1"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#f3f4f6"
                    stroke="#d1d5db"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.6"
                  />
                  <line x1="2" y1="2" x2="22" y2="22" stroke="#dc2626" strokeWidth="1.5" opacity="0.5" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


