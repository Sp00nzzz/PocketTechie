import { motion } from 'framer-motion';
import { useChatStore } from '../store/useChatStore';

const actions = [
  { id: 'feed', label: 'Feed' },
  { id: 'play', label: 'Play' },
  { id: 'diary', label: 'Diary' },
  { id: 'razor', label: 'Razor' },
  { id: 'music', label: 'Music' }
];

export const ActionButtons = () => {
  const { sendUserMessage } = useChatStore();
  
  const handleAction = (actionId) => {
    const actionResponses = {
      feed: "I'm not hungry. Are you trying to make me fat?",
      play: "I don't feel like it. You always want to do things I don't want to do.",
      diary: "My diary is private. Why are you so nosy?",
      razor: "That's not funny. You know I don't like jokes about that.",
      music: "Fine, but only if it's my music. Your taste is terrible."
    };
    
    sendUserMessage(actionResponses[actionId] || "Whatever.");
  };
  
  return (
    <div className="flex flex-col gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={action.id}
          onClick={() => handleAction(action.id)}
          className="w-full px-6 py-3 bg-gradient-to-b from-blue-500 to-blue-600 text-white font-medium rounded-lg border border-blue-700 shadow-md hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {action.label}
        </motion.button>
      ))}
    </div>
  );
};


