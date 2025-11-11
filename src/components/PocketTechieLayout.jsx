import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PocketTechieCharacter } from './PocketTechieCharacter';

const buttons = ['Feed', 'Play', 'Twitter', 'Computer', 'Music'];

const techBroPhrases = [
  'Back to coding',
  'Time to ship',
  "Let's deploy",
  'Back to grind',
  'Time to merge',
  "Let's build",
  'Ship it',
  'Back to terminal',
  'Time to commit',
  "Let me fix this bug",
  'Back to IDE',
  'Time to refactor',
  "Let's optimize",
  'Back to stack',
  'Time to push',
  "Let's scale",
  'Back to PR',
  "Let's iterate"
];

export const PocketTechieLayout = () => {
  const [showShawarma, setShowShawarma] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueText, setDialogueText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (showShawarma) {
        // Get position relative to the container
        const container = document.querySelector('.relative.max-w-\\[400px\\]');
        if (container) {
          const rect = container.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left - 24, // Center the image (w-12 = 48px / 2 = 24px)
            y: e.clientY - rect.top - 24
          });
        }
      }
    };

    if (showShawarma) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [showShawarma]);

  // Handle speech bubble timeout - ensure it stays visible for exactly 3 seconds
  useEffect(() => {
    if (showDialogue) {
      const timer = setTimeout(() => {
        setShowDialogue(false);
        setDialogueText('');
      }, 3000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showDialogue]);

  const handleButtonClick = (button, event) => {
    if (button === 'Feed') {
      // Get initial position at click location
      const container = document.querySelector('.relative.max-w-\\[400px\\]');
      if (container) {
        const rect = container.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left - 24,
          y: event.clientY - rect.top - 24
        });
      }
      setShowShawarma(true);
    }
  };

  return (
    <div className="bg-[#c7c7c7] min-h-screen relative w-full overflow-hidden" data-node-id="1:17">
      {/* Container with max-width to maintain design proportions */}
      <div className="relative max-w-[400px] mx-auto min-h-screen">
        {/* Header Section */}
        <div className="absolute top-[17px] left-[20px] z-10" data-node-id="1:41">
          <p className="font-['Inter',sans-serif] font-normal text-[18.769px] text-black whitespace-nowrap">
            pocket techie
          </p>
          <p className="font-['Inter',sans-serif] font-normal text-[10px] text-black whitespace-nowrap mt-[3px]" data-node-id="1:42">
            v. 1.0
          </p>
        </div>
        
        <div className="absolute top-[22px] right-[20px] z-10" data-node-id="1:44">
          <p className="font-['Inter',sans-serif] font-normal text-[10.859px] text-black whitespace-nowrap text-right">
            by immike_wing
          </p>
        </div>

        {/* Left Sidebar - Action Buttons */}
        <div className="absolute left-[7px] top-[118px] flex flex-col gap-[6.066px] z-10" data-node-id="1:78">
          {buttons.map((button, index) => (
            <button
              key={button}
              onClick={(e) => handleButtonClick(button, e)}
              className="relative inline-grid place-items-start cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              data-node-id={`1:${50 + index * 5}`}
            >
              <div className="bg-[#1c5b8f] border-[3.639px] border-black border-solid h-[20.839px] rounded-[6.786px] w-[74px] relative" data-node-id={`1:${51 + index * 5}`}>
                <div className="absolute inset-0 pointer-events-none shadow-[0px_8.482px_6.333px_-2.827px_inset_rgba(255,255,255,0.5)]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="font-['Nunito',sans-serif] font-bold text-[12.131px] text-center text-white tracking-[-0.4852px]" data-node-id={`1:${53 + index * 5}`}>
                  {button}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Character Component */}
        <PocketTechieCharacter 
          onCharacterClick={() => {
            if (showShawarma) {
              // Character "eats" - show dialogue and hide shawarma
              // Randomly select a tech bro phrase
              const randomPhrase = techBroPhrases[Math.floor(Math.random() * techBroPhrases.length)];
              setDialogueText(randomPhrase);
              setShowDialogue(true);
              setShowShawarma(false);
              // Timeout is handled in useEffect to ensure proper cleanup
            } else {
              setShowShawarma(false);
            }
          }} 
        />

        {/* Shawarma Image - appears when Feed is clicked and follows cursor */}
        <AnimatePresence>
          {showShawarma && (
            <motion.div
              className="absolute z-30 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: mousePosition.x,
                y: mousePosition.y
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                scale: { type: "spring", stiffness: 500, damping: 30 },
                opacity: { type: "spring", stiffness: 500, damping: 30 },
                x: { duration: 0 },
                y: { duration: 0 }
              }}
              style={{
                left: 0,
                top: 0
              }}
            >
              <img 
                src="/shawarma.png" 
                alt="Shawarma" 
                className="w-12 h-12 object-contain"
                draggable={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Speech Bubble Dialogue - appears when character eats */}
        <AnimatePresence>
          {showDialogue && (
            <motion.div
              className="absolute left-[200px] top-[150px] z-40"
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20
              }}
            >
              <div className="relative inline-block" style={{ lineHeight: 0 }}>
                {/* Speech bubble using Figma vector */}
                <img 
                  src="http://localhost:3845/assets/5bb2c43a4f34b62e901baac45d760579bfbd2b9c.svg"
                  alt="Speech bubble"
                  className="block"
                  style={{ 
                    width: '100px', 
                    height: 'auto', 
                    display: 'block',
                    verticalAlign: 'top'
                  }}
                  onLoad={(e) => {
                    // Lock height based on natural aspect ratio to prevent stretching
                    const img = e.target;
                    if (img.naturalWidth && img.naturalHeight) {
                      const aspectRatio = img.naturalWidth / img.naturalHeight;
                      img.style.height = `${200 / aspectRatio}px`;
                      img.style.width = '120px';
                    }
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none" style={{ padding: '8px', transform: 'translateY(-8px)' }}>
                  {dialogueText && (() => {
                    const words = dialogueText.split(' ');
                    if (words.length > 2) {
                      // Split into two lines for longer phrases
                      const midPoint = Math.ceil(words.length / 2);
                      const firstLine = words.slice(0, midPoint).join(' ');
                      const secondLine = words.slice(midPoint).join(' ');
                      return (
                        <>
                          <p className="text-gray-700 text-sm font-medium text-center">{firstLine}</p>
                          <p className="text-gray-700 text-sm font-medium text-center">{secondLine}</p>
                        </>
                      );
                    } else {
                      // Single line or two words
                      return words.map((word, index) => (
                        <p key={index} className="text-gray-700 text-sm font-medium text-center">{word}</p>
                      ));
                    }
                  })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

