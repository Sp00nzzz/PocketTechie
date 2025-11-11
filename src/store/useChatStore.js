import { create } from 'zustand';
import { responses, welcomeMessages } from '../data/responses';

export const useChatStore = create((set, get) => ({
  messages: [],
  currentMood: 'jealous',
  isTyping: false,
  initialized: false,
  
  setMood: (mood) => {
    set({ currentMood: mood });
    // Add a mood change message
    const moodMessages = {
      jealous: "Fine, I'm just going to be honest about how I feel.",
      clingy: "I just want to be closer to you, that's all.",
      gaslight: "I think you're misunderstanding the situation.",
      dismissive: "Whatever. I don't care anymore."
    };
    get().addMessage({
      id: Date.now(),
      text: moodMessages[mood],
      sender: 'assistant',
      timestamp: new Date()
    });
  },
  
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },
  
  sendUserMessage: (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    get().addMessage(userMessage);
    
    // Show typing indicator
    set({ isTyping: true });
    
    // Simulate typing delay
    setTimeout(() => {
      const { currentMood } = get();
      const moodResponses = responses[currentMood];
      const genericResponses = [
        "Hmm, interesting.",
        "I see.",
        "Okay.",
        "Right.",
        "Sure.",
        "Whatever you say.",
        "If you say so.",
        "I guess."
      ];
      
      // Randomly pick from mood-specific or generic responses
      const allResponses = [...moodResponses, ...genericResponses];
      const randomResponse = allResponses[Math.floor(Math.random() * allResponses.length)];
      
      get().addMessage({
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'assistant',
        timestamp: new Date()
      });
      
      set({ isTyping: false });
    }, 1000 + Math.random() * 1000);
  },
  
  initializeChat: () => {
    const { initialized } = get();
    if (initialized) return;
    
    set({ initialized: true });
    const welcomeMessage = welcomeMessages[get().currentMood];
    
    setTimeout(() => {
      get().addMessage({
        id: Date.now(),
        text: welcomeMessage,
        sender: 'assistant',
        timestamp: new Date()
      });
    }, 500);
  }
}));

