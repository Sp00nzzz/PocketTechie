import { motion } from 'framer-motion';
import { useChatStore } from '../store/useChatStore';

export const MessageBubble = ({ message }) => {
  const { currentMood } = useChatStore();
  const isUser = message.sender === 'user';
  
  const bubbleVariants = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  // Different colors based on mood for assistant messages
  const moodColors = {
    jealous: 'bg-red-50 border-red-200 text-red-900',
    clingy: 'bg-pink-50 border-pink-200 text-pink-900',
    gaslight: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    dismissive: 'bg-gray-100 border-gray-300 text-gray-700'
  };
  
  const assistantColor = isUser ? '' : moodColors[currentMood];
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
    >
      <div
        className={`max-w-[75%] md:max-w-[60%] px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-emo-accent text-white rounded-tr-sm'
            : `${assistantColor} rounded-tl-sm border`
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <span className="text-xs opacity-60 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </motion.div>
  );
};

