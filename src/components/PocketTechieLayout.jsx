import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PocketTechieCharacter, breathingAnimation } from './PocketTechieCharacter';

const buttons = ['Feed', 'Play', 'Twitter', 'Goon', 'Music', 'Customize'];

const techBroPhrasesEating = [
  'Mmm, delicious slop',
  'Best shawarma ever',
  'Fuel for coding',
  'Nom nom nom'
];

const edgyTechBroPhrases = [
  "Let me post this on X",
  "Your code is inefficient",
  "I only code in assembly",
  "That's not how I would do it",
  "I've been coding since I was 5",
  "Your stack is outdated",
  "I could optimize that in 5 minutes",
  "That's not production-ready",
  "I only use Vim",
  "Your architecture is wrong",
  "I wrote a better version in my sleep",
  "That's not scalable",
  "Your code has too many dependencies",
  "I only use functional programming",
  "That's not performant enough",
  "I could refactor that blindfolded",
  "Your code doesn't follow best practices",
  "I only code in Rust",
  "That's not enterprise-grade"
];

const denialPhrases = [
  "I'm not hungry",
  "I don't want it",
  "No thanks",
  "Not right now",
  "Maybe later",
  "I'm busy",
  "Leave me alone"
];

// Image assets for customize frame
const imgVector1 = "http://localhost:3845/assets/0d5a63f06eee711f3972fcd6e9f4a1427cb25941.svg";
const imgEllipse1 = "http://localhost:3845/assets/d097efe00552d9a3456f963ca695a8076b240f13.svg";
const imgVector2 = "http://localhost:3845/assets/26c7719bb9d92731ce3055e92b1d37a1d8571ca9.svg";
const imgVector3 = "http://localhost:3845/assets/8a2c262f9100bfda14ef71e8e4c03c4c5d9513bc.svg";
const imgVector4 = "http://localhost:3845/assets/84801a260bbed1c4d882d0bb1fa76a358ca9b4e9.svg";
const imgLine4 = "http://localhost:3845/assets/99622ff410e7a611e65f47d4c548cff696d42e10.svg";
const imgLine3 = "http://localhost:3845/assets/10f66c7daa211410217d5a25de67aead86225402.svg";
const imgLine1 = "http://localhost:3845/assets/e46d0242724737d5c5aee8cde45e7536c46173f4.svg";
const imgFrame4 = "http://localhost:3845/assets/d09e52d0b8dca382bbfc36c43c8ffc67eca2a1bd.svg";
const imgFrame5 = "http://localhost:3845/assets/14ab375a0ebd0b37be9eda36da0c88b5332f0bd5.svg";
// Pants assets
const imgPants = "http://localhost:3845/assets/dc81a2a82586d97192c74931c016725d5a44908e.svg";
const imgBrownPants = "http://localhost:3845/assets/765c44061e3a406d8eab3bfc6d24ae3de1c7862b.svg";

// Helper function to render pants - used in both customize and normal modes
const renderPants = (pantsType) => {
  if (pantsType === 'pants') {
    return (
      <motion.div 
        className="absolute left-[161px] top-[398px] z-[50] w-[54.5px] h-[46px]" 
        data-node-id="15:441"
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-[-4.35%_-3.67%]">
          <img alt="" className="block max-w-none size-full" src={imgPants} />
        </div>
      </motion.div>
    );
  } else if (pantsType === 'brownPants') {
    return (
      <motion.div 
        className="absolute left-[161px] top-[398px] z-[50] w-[54.5px] h-[46px]" 
        data-node-id="15:441"
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-[-4.35%_-3.67%]">
          <img alt="" className="block max-w-none size-full" src={imgBrownPants} />
        </div>
      </motion.div>
    );
  }
  return null;
};

// Helper function to render dialogue text with word wrapping
const renderDialogueText = (dialogueText) => {
  if (!dialogueText) return null;
  
  const words = dialogueText.split(' ');
  // Smart word wrapping - split long phrases into multiple lines
  const maxCharsPerLine = 15;
  const lines = [];
  let currentLine = '';
  
  words.forEach((word, index) => {
    if (currentLine === '') {
      currentLine = word;
    } else if ((currentLine + ' ' + word).length <= maxCharsPerLine) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
    
    // Push last word
    if (index === words.length - 1) {
      lines.push(currentLine);
    }
  });
  
  // Limit to 3 lines max
  const displayLines = lines.slice(0, 3);
  
  return (
    <div className="flex flex-col justify-center items-center w-full h-full" style={{ transform: 'translateX(8px)' }}>
      {displayLines.map((line, index) => (
        <p key={index} className="text-gray-700 text-[12px] font-medium text-center leading-tight break-words w-full" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {line}
        </p>
      ))}
    </div>
  );
};

export const PocketTechieLayout = () => {
  const [showShawarma, setShowShawarma] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueText, setDialogueText] = useState('');
  const [armsSwapped, setArmsSwapped] = useState(false);
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);
  const [shirtType, setShirtType] = useState('none'); // 'none', 'kalshi', 'nyc', 'twitter', 'gooner'
  const [pantsType, setPantsType] = useState('none'); // 'none', 'pants'
  const [canClickCharacter, setCanClickCharacter] = useState(true);

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
        setArmsSwapped(false); // Reset arms when dialogue ends
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
      setArmsSwapped(false); // Reset arms when feed button is clicked
    } else if (button === 'Customize') {
      setIsCustomizeMode(true);
    } else if (button === 'Back') {
      setIsCustomizeMode(false);
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

        {isCustomizeMode ? (
          /* Customize Mode View */
          <>
            {/* Back Button */}
            <div className="absolute left-[12px] top-[118px] z-10" data-node-id="4:273">
              <button
                onClick={(e) => handleButtonClick('Back', e)}
                className="relative inline-grid place-items-start cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                data-node-id="9:319"
              >
                <div className="bg-[#1c5b8f] border-[3.639px] border-black border-solid h-[20.839px] rounded-[6.786px] w-[74px] relative" data-node-id="9:320">
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_8.482px_6.333px_-2.827px_inset_rgba(255,255,255,0.5)]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="font-['Nunito',sans-serif] font-bold text-[12.131px] text-center text-white tracking-[-0.4852px]" data-node-id="9:323">
                    Back
                  </p>
                </div>
              </button>
            </div>

            {/* Character Component - Same as normal mode */}
            <PocketTechieCharacter 
              isFeeding={false}
              onCharacterClick={() => {
                // Character clicked in customize mode - show edgy tech bro phrase
                if (canClickCharacter && !showDialogue) {
                  const randomEdgyPhrase = edgyTechBroPhrases[Math.floor(Math.random() * edgyTechBroPhrases.length)];
                  setDialogueText(randomEdgyPhrase);
                  setShowDialogue(true);
                  setCanClickCharacter(false);
                  
                  // Prevent spam - re-enable after dialogue disappears + 1 second cooldown
                  setTimeout(() => {
                    setCanClickCharacter(true);
                  }, 4000); // 3 seconds for dialogue + 1 second cooldown
                }
              }}
              pantsType={pantsType}
              shirtType={shirtType}
            />
            
            {/* Left Arrow Buttons */}
            <div 
              className="absolute h-[204px] left-[45px] top-[234px] w-[25px]" 
              data-node-id="15:332"
            >
              {/* Top/Middle section - controls shirts */}
              <div 
                className="absolute top-0 left-0 right-0 h-[136px] cursor-pointer"
                onClick={() => {
                  // Cycle through: none -> kalshi -> nyc -> twitter -> gooner -> none
                  if (shirtType === 'none') {
                    setShirtType('kalshi');
                  } else if (shirtType === 'kalshi') {
                    setShirtType('nyc');
                  } else if (shirtType === 'nyc') {
                    setShirtType('twitter');
                  } else if (shirtType === 'twitter') {
                    setShirtType('gooner');
                  } else {
                    setShirtType('none');
                  }
                }}
              />
              {/* Bottom section - controls pants */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[68px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Cycle through pants: none -> pants -> brownPants -> none
                  let newPantsType;
                  if (pantsType === 'none') {
                    newPantsType = 'pants';
                  } else if (pantsType === 'pants') {
                    newPantsType = 'brownPants';
                  } else {
                    newPantsType = 'none';
                  }
                  console.log('Pants clicked, changing from', pantsType, 'to', newPantsType);
                  setPantsType(newPantsType);
                }}
              />
              <div className="absolute bottom-0 left-[-10.18%] right-[-16%] top-0 pointer-events-none">
                <img alt="" className="block max-w-none size-full" src={imgFrame4} />
              </div>
            </div>
            
            {/* Pants - rendered in customize mode */}
            {renderPants(pantsType)}
            
            {/* Speech Bubble Dialogue - appears when character is clicked */}
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
                    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none overflow-hidden" style={{ padding: '8px 12px 12px 16px', maxWidth: '100px', maxHeight: '80px', width: '100%', height: '100%' }}>
                      {renderDialogueText(dialogueText)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Right Arrow Buttons */}
            <div 
              className="absolute flex h-[204px] items-center justify-center left-[289px] top-[234px] w-[25px]"
            >
              {/* Top/Middle section - controls shirts */}
              <div 
                className="absolute top-0 left-0 right-0 h-[136px] cursor-pointer z-10"
                onClick={() => {
                  // Cycle through in reverse order: none -> gooner -> twitter -> nyc -> kalshi -> none
                  if (shirtType === 'none') {
                    setShirtType('gooner');
                  } else if (shirtType === 'gooner') {
                    setShirtType('twitter');
                  } else if (shirtType === 'twitter') {
                    setShirtType('nyc');
                  } else if (shirtType === 'nyc') {
                    setShirtType('kalshi');
                  } else {
                    setShirtType('none');
                  }
                }}
              />
              {/* Bottom section - controls pants */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[68px] cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  // Cycle through pants in reverse: none -> brownPants -> pants -> none
                  let newPantsType;
                  if (pantsType === 'none') {
                    newPantsType = 'brownPants';
                  } else if (pantsType === 'brownPants') {
                    newPantsType = 'pants';
                  } else {
                    newPantsType = 'none';
                  }
                  console.log('Pants clicked (right), changing from', pantsType, 'to', newPantsType);
                  setPantsType(newPantsType);
                }}
              />
              <div className="flex-none rotate-[180deg] scale-y-[-100%] pointer-events-none">
                <div className="h-[204px] relative w-[25px]" data-node-id="15:333">
                  <div className="absolute bottom-0 left-[-10.18%] right-[-16%] top-0">
                    <img alt="" className="block max-w-none size-full" src={imgFrame5} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Normal Mode View */
          <>
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
              isFeeding={armsSwapped}
              pantsType={pantsType}
              shirtType={shirtType}
              onCharacterClick={() => {
                if (showShawarma) {
                  // Randomly decide to accept or deny (70% chance to accept, 30% to deny)
                  const willAccept = Math.random() > 0.3;
                  
                  if (willAccept) {
                    // Swap arms immediately when character accepts food
                    setArmsSwapped(true);
                    // Character "eats" - show dialogue and hide shawarma
                    // Randomly select an eating phrase
                    const randomPhrase = techBroPhrasesEating[Math.floor(Math.random() * techBroPhrasesEating.length)];
                    setDialogueText(randomPhrase);
                    setShowDialogue(true);
                    setShowShawarma(false);
                    // Timeout is handled in useEffect to ensure proper cleanup
                  } else {
                    // Character denies food - show denial message
                    const randomDenial = denialPhrases[Math.floor(Math.random() * denialPhrases.length)];
                    setDialogueText(randomDenial);
                    setShowDialogue(true);
                    setShowShawarma(false);
                    setArmsSwapped(false); // Don't swap arms when denied
                    // Timeout is handled in useEffect to ensure proper cleanup
                  }
                } else {
                  // Character clicked when not feeding - show edgy tech bro phrase
                  if (canClickCharacter && !showDialogue) {
                    const randomEdgyPhrase = edgyTechBroPhrases[Math.floor(Math.random() * edgyTechBroPhrases.length)];
                    setDialogueText(randomEdgyPhrase);
                    setShowDialogue(true);
                    setCanClickCharacter(false);
                    
                    // Prevent spam - re-enable after dialogue disappears + 1 second cooldown
                    setTimeout(() => {
                      setCanClickCharacter(true);
                    }, 4000); // 3 seconds for dialogue + 1 second cooldown
                  }
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

            {/* Pants - rendered in normal mode (persists from customize mode) */}
            {renderPants(pantsType)}

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
                    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none overflow-hidden" style={{ padding: '8px 12px 8px 16px', maxWidth: '100px', maxHeight: '80px', width: '100%', height: '100%' }}>
                      {renderDialogueText(dialogueText)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

