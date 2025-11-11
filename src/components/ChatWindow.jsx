import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { useChatStore } from '../store/useChatStore';

export const ChatWindow = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { messages, isTyping, sendUserMessage } = useChatStore();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendUserMessage(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-emo-surface rounded-2xl border border-emo-accent/10 shadow-xl overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-emo-bg to-emo-surface">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            className="flex justify-start mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2">
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-emo-accent/10 p-4 bg-emo-surface">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-emo-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emo-accent focus:ring-offset-2 text-emo-text bg-emo-bg"
            disabled={isTyping}
          />
          <motion.button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-2 bg-emo-accent text-white rounded-lg font-medium hover:bg-emo-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
};

