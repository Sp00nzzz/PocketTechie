import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PocketTechieCharacter, breathingAnimation } from './PocketTechieCharacter';

const buttons = ['Feed', 'Play', 'Code', 'Goon', 'Music', 'Customize'];

const techBroPhrasesEating = [
  'Mmm, delicious slop',
  'Fuel for coding',
  'Nom nom nom',
  'I love my slop bowl', 
];

const edgyTechBroPhrases = [
  "Let me post this on X",
  "Gooning times",
  "Fuck my stupid chungus life",
  "I'm going to make it into YC bro",
  "yeah i predicted cluely downfall",
  "a16z will invest in me trust",
  "what is your problem?",
  "i'm just here to code"
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

const lockingInPhrases = [
  "I'm locking in",
  "No time for games",
  "Gotta focus",
  "Work mode activated",
  "Too busy grinding",
  "Not now, coding",
  "In the zone rn"
];

// Image assets for customize frame - local files
const imgVector1 = "/assets/body.svg";
const imgEllipse1 = "/assets/head.svg";
const imgVector2 = "/assets/vector2.svg";
const imgVector3 = "/assets/arm.svg";
const imgVector4 = "/assets/leaf.svg";
const imgLine4 = "/assets/chin-line.svg";
const imgLine3 = "/assets/mouth-line.svg";
const imgLine1 = "/assets/eyebrow.svg";
const imgFrame4 = "/assets/frame-left.svg";
const imgFrame5 = "/assets/frame-right.svg";
// Pants assets
const imgPants = "/assets/pants.svg";
const imgBrownPants = "/assets/brown-pants.svg";

// Helper function to render pants - used in both customize and normal modes
// Always renders all pants for animation sync, controls visibility with opacity
const renderPants = (pantsType) => {
  return (
    <>
      <motion.div 
        className="absolute left-[161px] top-[398px] z-20 w-[54.5px] h-[46px]" 
        data-node-id="15:441"
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity: pantsType === 'pants' ? 1 : 0, pointerEvents: pantsType === 'pants' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-4.35%_-3.67%]">
          <img alt="" className="block max-w-none size-full" src={imgPants} />
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute left-[161px] top-[398px] z-20 w-[54.5px] h-[46px]" 
        data-node-id="15:441"
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity: pantsType === 'brownPants' ? 1 : 0, pointerEvents: pantsType === 'brownPants' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-4.35%_-3.67%]">
          <img alt="" className="block max-w-none size-full" src={imgBrownPants} />
        </div>
      </motion.div>
    </>
  );
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
  const [showItem, setShowItem] = useState(false); // Show food, gameboy, or macbook
  const [itemType, setItemType] = useState('shawarma'); // 'shawarma', 'ramen', 'gameboy', 'macbook', or 'ipod'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueText, setDialogueText] = useState('');
  const [isFeeding, setIsFeeding] = useState(false); // Arms swapped for feeding
  const [isPlaying, setIsPlaying] = useState(false); // Arms swapped for playing
  const [isCoding, setIsCoding] = useState(false); // Arms swapped for coding
  const [isListeningMusic, setIsListeningMusic] = useState(false); // Headbob for listening to music
  const [isGooning, setIsGooning] = useState(false); // Eyes shift right for gooning
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);
  const [shirtType, setShirtType] = useState('none'); // 'none', 'kalshi', 'nyc', 'twitter', 'gooner', 'femcel', 'new', 'figma'
  const [pantsType, setPantsType] = useState('none'); // 'none', 'pants'
  const [glassesType, setGlassesType] = useState('none'); // 'none', 'glasses'
  const [canClickCharacter, setCanClickCharacter] = useState(true);
  const [characterName, setCharacterName] = useState('Name');
  const [tempName, setTempName] = useState('Name'); // Temporary name while editing
  const [hasTyped, setHasTyped] = useState(false); // Track if user has typed
  const [gameType, setGameType] = useState('asteroids'); // 'asteroids' or 'snake'
  const [happiness, setHappiness] = useState(1); // Happiness level 1-4 (correlates with hearts)
  const [streak, setStreak] = useState(0); // Interaction streak counter
  const [xp, setXp] = useState(0); // Experience points
  const [level, setLevel] = useState(1); // Character level
  const [showParticles, setShowParticles] = useState(false); // Show particle effects
  const [showLevelUp, setShowLevelUp] = useState(false); // Show level up notification
  const [achievements, setAchievements] = useState([]); // Unlocked achievements
  const [totalInteractions, setTotalInteractions] = useState(0); // Total interactions count

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (showItem) {
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

    if (showItem) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [showItem]);

  // Handle speech bubble timeout - longer duration for playing/coding/music (5 seconds), shorter for feeding (3 seconds)
  useEffect(() => {
    if (showDialogue) {
      const duration = (isPlaying || isCoding || isListeningMusic) ? 5000 : 3000; // 5 seconds for playing/coding/music, 3 seconds for feeding
      const timer = setTimeout(() => {
        setShowDialogue(false);
        setDialogueText('');
        setIsFeeding(false); // Reset feeding arms when dialogue ends
        setIsPlaying(false); // Reset playing arms when dialogue ends
        setIsCoding(false); // Reset coding arms when dialogue ends
        setIsListeningMusic(false); // Reset music headbob when dialogue ends
      }, duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showDialogue, isPlaying, isCoding, isListeningMusic]);

  // Handle playing animation timeout - 4 seconds max
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 4000); // 4 seconds for playing gameboy
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isPlaying]);

  // Handle XP leveling system
  useEffect(() => {
    const xpNeeded = level * 100; // 100 XP per level
    if (xp >= xpNeeded) {
      setLevel(level + 1);
      setXp(xp - xpNeeded);
      setShowLevelUp(true);
      setShowParticles(true);
      
      // Hide level up notification after 2 seconds
      setTimeout(() => {
        setShowLevelUp(false);
      }, 2000);
      
      // Hide particles after 1 second
      setTimeout(() => {
        setShowParticles(false);
      }, 1000);
    }
  }, [xp, level]);

  // Handle interaction rewards
  const handleInteraction = (type, accepted = true) => {
    if (accepted) {
      setTotalInteractions(totalInteractions + 1);
      setStreak(streak + 1);
      
      // Award XP based on interaction type
      let xpGain = 10;
      if (type === 'feed') xpGain = 15;
      if (type === 'play') xpGain = 20;
      if (type === 'code') xpGain = 25;
      if (type === 'music') xpGain = 20;
      
      setXp(xp + xpGain);
      
      // Increase happiness (max 4)
      if (happiness < 4) {
        setHappiness(Math.min(4, happiness + 1));
      }
      
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 800);
      
      // Check for achievements
      checkAchievements();
    } else {
      // Reset streak on rejection
      setStreak(0);
      // Decrease happiness (min 1)
      if (happiness > 1) {
        setHappiness(Math.max(1, happiness - 1));
      }
    }
  };

  // Achievement system
  const checkAchievements = () => {
    const newAchievements = [];
    
    if (totalInteractions >= 10 && !achievements.includes('first_steps')) {
      newAchievements.push('first_steps');
    }
    if (streak >= 5 && !achievements.includes('on_fire')) {
      newAchievements.push('on_fire');
    }
    if (level >= 5 && !achievements.includes('power_user')) {
      newAchievements.push('power_user');
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  const handleButtonClick = (button, event) => {
    if (button === 'Feed') {
      // Randomly choose between shawarma and ramen
      const randomFood = Math.random() > 0.5 ? 'shawarma' : 'ramen';
      setItemType(randomFood);
      
      // Get initial position at click location
      const container = document.querySelector('.relative.max-w-\\[400px\\]');
      if (container) {
        const rect = container.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left - 24,
          y: event.clientY - rect.top - 24
        });
      }
      setShowItem(true);
      setIsFeeding(false); // Reset any previous holding animation
      setIsPlaying(false); // Reset any previous holding animation
      setIsCoding(false); // Reset any previous holding animation
    } else if (button === 'Play') {
      // Show gameboy
      setItemType('gameboy');
      
      // Get initial position at click location
      const container = document.querySelector('.relative.max-w-\\[400px\\]');
      if (container) {
        const rect = container.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left - 24,
          y: event.clientY - rect.top - 24
        });
      }
      setShowItem(true);
      setIsFeeding(false); // Reset any previous holding animation
      setIsPlaying(false); // Reset any previous holding animation
      setIsCoding(false); // Reset any previous holding animation
    } else if (button === 'Code') {
      // Show macbook
      setItemType('macbook');
      
      // Get initial position at click location
      const container = document.querySelector('.relative.max-w-\\[400px\\]');
      if (container) {
        const rect = container.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left - 24,
          y: event.clientY - rect.top - 24
        });
      }
      setShowItem(true);
      setIsFeeding(false); // Reset any previous holding animation
      setIsPlaying(false); // Reset any previous holding animation
      setIsCoding(false); // Reset any previous holding animation
    } else if (button === 'Music') {
      // Show iPod
      setItemType('ipod');
      
      // Get initial position at click location
      const container = document.querySelector('.relative.max-w-\\[400px\\]');
      if (container) {
        const rect = container.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left - 24,
          y: event.clientY - rect.top - 24
        });
      }
      setShowItem(true);
      setIsFeeding(false); // Reset any previous holding animation
      setIsPlaying(false); // Reset any previous holding animation
      setIsCoding(false); // Reset any previous holding animation
      setIsListeningMusic(false); // Reset any previous music animation
    } else if (button === 'Goon') {
      // Only allow goon action if no other animations are active
      if (isFeeding || isPlaying || isCoding || isGooning || showItem) {
        return; // Don't do anything if other animations are active
      }
      
      // Trigger gooning animation - eyes shift right slowly, pause, then return
      setIsGooning(true);
      
      // Play Concrete.mp3 audio at 25% volume for 1.5 seconds (until eyes reach right)
      const audio = new Audio('/Concrete.mp3');
      audio.volume = 0.25;
      audio.play();
      
      // Stop audio after 1.5 seconds (when eyes reach fully right)
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 1500);
      
      // Show dialogue when eyes fully reach the right (after 1.5 seconds - 25% of 6 seconds)
      setTimeout(() => {
        setDialogueText('You sick freak');
        setShowDialogue(true);
      }, 1500);
      
      // Hide dialogue after 3 seconds
      setTimeout(() => {
        setShowDialogue(false);
        setDialogueText('');
      }, 4500);
      
      // After 6 seconds total (slow shift + pause + return), reset
      setTimeout(() => {
        setIsGooning(false);
      }, 6000);
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

        {/* Status Frame - shows Name and mood */}
        <div className="absolute left-[7px] top-[67px] w-[357px] h-[71px] z-10" data-node-id="40:887">
          <div className="absolute h-[71px] left-0 rounded-[10px] top-0 w-[357px]" data-node-id="22:498" style={{ backgroundImage: "linear-gradient(180.932deg, rgba(0, 0, 0, 0) 30.641%, rgba(0, 0, 0, 0.2) 92.251%), linear-gradient(90deg, rgb(217, 217, 217) 0%, rgb(217, 217, 217) 100%)" }} />
          
          {/* Dynamic Hearts based on happiness level */}
          {[1, 2, 3, 4].map((heartNum) => (
            <motion.div 
              key={heartNum}
              className="absolute h-[17.238px] w-[18.477px] top-[41px]" 
              style={{ left: `${229.15 + (heartNum - 1) * 32.07}px` }}
              animate={happiness >= heartNum ? { scale: [1, 1.2, 1] } : {}}
              transition={happiness >= heartNum ? { duration: 0.3 } : {}}
            >
              <div className="absolute inset-[-19.79%_-18.39%_-32.24%_-18.4%]">
                <img alt="" className="block max-w-none size-full" src={happiness >= heartNum ? "/assets/heart-filled.svg" : "/assets/heart-outline.svg"} />
              </div>
            </motion.div>
          ))}
          
          <div className="absolute left-[7px] size-[25px] top-[39px]" data-node-id="40:903">
            <img alt="" className="block max-w-none size-full" src="/assets/annoyed-face.svg" />
          </div>
          <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[9px] not-italic text-[12px] text-black text-nowrap top-[14px] whitespace-pre" data-node-id="40:904">
            {characterName} Lv.{level}
          </p>
          <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[39px] not-italic text-[10px] text-black text-nowrap top-[45px] whitespace-pre" data-node-id="40:905">
            {happiness === 4 ? 'Ecstatic' : happiness === 3 ? 'Happy' : happiness === 2 ? 'Content' : 'Annoyed'}
          </p>
          
          {/* XP Bar */}
          <div className="absolute left-[210px] top-[14px] w-[100px] h-[12px] bg-gray-300 rounded-full overflow-hidden border-2 border-black">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              animate={{ width: `${(xp / (level * 100)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="absolute font-['Inter',sans-serif] font-normal text-[8px] text-black left-[315px] top-[15px]">
            {xp}/{level * 100} XP
          </p>
          
        </div>

        {isCustomizeMode ? (
          /* Customize Mode View */
          <>
            {/* Back Button */}
            <div className="absolute left-[12px] top-[155px] z-10" data-node-id="4:273">
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
              isPlaying={false}
              isCoding={false}
              isListeningMusic={false}
              isGooning={isGooning}
              foodType={itemType}
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
              glassesType={glassesType}
            />
            
            {/* Left Arrow Buttons */}
            <div 
              className="absolute h-[204px] left-[45px] top-[234px] w-[25px]" 
              data-node-id="15:332"
            >
              {/* Top section - controls glasses */}
              <div 
                className="absolute top-0 left-0 right-0 h-[45px] cursor-pointer z-10"
                onClick={() => {
                  // Toggle glasses: none -> glasses -> none
                  setGlassesType(glassesType === 'none' ? 'glasses' : 'none');
                }}
              />
              {/* Middle section - controls shirts */}
              <div 
                className="absolute top-[45px] left-0 right-0 h-[91px] cursor-pointer z-10"
                onClick={() => {
                  // Cycle through: none -> kalshi -> nyc -> twitter -> gooner -> femcel -> new -> figma -> none
                  if (shirtType === 'none') {
                    setShirtType('kalshi');
                  } else if (shirtType === 'kalshi') {
                    setShirtType('nyc');
                  } else if (shirtType === 'nyc') {
                    setShirtType('twitter');
                  } else if (shirtType === 'twitter') {
                    setShirtType('gooner');
                  } else if (shirtType === 'gooner') {
                    setShirtType('femcel');
                  } else if (shirtType === 'femcel') {
                    setShirtType('new');
                  } else if (shirtType === 'new') {
                    setShirtType('figma');
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
            
            {/* Name Input Field - below character in customize mode */}
            <div className="absolute left-[53px] top-[470px] w-[173.197px] h-[34.445px] z-10" data-node-id="40:945">
              <div className="absolute border-black border-[3.639px] border-solid h-[34.445px] left-0 rounded-[3px] top-0 w-[173.197px]" data-node-id="33:637" style={{ backgroundImage: "linear-gradient(180.932deg, rgba(0, 0, 0, 0) 30.641%, rgba(0, 0, 0, 0.2) 92.251%), linear-gradient(90deg, rgb(28, 91, 143) 0%, rgb(28, 91, 143) 100%)" }} />
              <input
                type="text"
                value={tempName}
                onChange={(e) => {
                  const newValue = e.target.value;
                  // If user hasn't typed yet and starts typing, clear the "Name" placeholder
                  if (!hasTyped && tempName === 'Name') {
                    setTempName(newValue === 'Name' ? '' : newValue);
                    setHasTyped(true);
                  } else {
                    setTempName(newValue);
                  }
                }}
                onFocus={() => {
                  // Clear "Name" when user focuses if they haven't typed yet
                  if (!hasTyped && tempName === 'Name') {
                    setTempName('');
                  }
                }}
                onBlur={() => {
                  // If user leaves empty and hasn't typed, restore "Name"
                  if (!hasTyped && tempName === '') {
                    setTempName('Name');
                  }
                }}
                maxLength={20}
                className="absolute h-[19.888px] left-[68px] rounded-[1.732px] top-[8px] w-[100px] bg-[#4083ba] text-white text-[10px] px-2 outline-none border-none"
                data-node-id="33:644"
                style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 27.928%, rgba(255, 255, 255, 0.2) 90.507%), linear-gradient(90deg, rgb(64, 131, 186) 0%, rgb(64, 131, 186) 100%)" }}
              />
              <p className="absolute font-['Nunito:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-49.6px)] text-[12.593px] text-center text-nowrap text-white top-[9px] tracking-[-0.5037px] translate-x-[-50%] whitespace-pre pointer-events-none" data-node-id="33:642">
                His name:
              </p>
            </div>

            {/* Finish Button - to the right of name input */}
            <div className="absolute left-[243px] top-[470px] z-10">
              <button
                onClick={(e) => {
                  // Confirm the name change
                  setCharacterName(tempName);
                  // Provide visual feedback
                  e.currentTarget.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }, 100);
                }}
                className="relative inline-grid place-items-start cursor-pointer hover:opacity-90 active:scale-95 transition-all"
              >
                <div className="bg-[#1c5b8f] border-[3.639px] border-black border-solid h-[34.445px] rounded-[3px] w-[74px] relative">
                  <div className="absolute inset-0 pointer-events-none shadow-[0px_8.482px_6.333px_-2.827px_inset_rgba(255,255,255,0.5)]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="font-['Nunito',sans-serif] font-bold text-[12.131px] text-center text-white tracking-[-0.4852px]">
                    Finish
                  </p>
                </div>
              </button>
            </div>
            
            {/* Speech Bubble Dialogue - appears when character is clicked */}
            <AnimatePresence>
              {showDialogue && !isCoding && !isListeningMusic && (
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
                  <div className="relative inline-block" style={{ lineHeight: 0, width: '120px', height: '100px' }}>
                    {/* Speech bubble using Figma vector */}
                    <img 
                      src="/assets/speech-bubble.svg"
                      alt="Speech bubble"
                      className="block absolute inset-0"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        display: 'block',
                        verticalAlign: 'top'
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
              {/* Top section - controls glasses */}
              <div 
                className="absolute top-0 left-0 right-0 h-[45px] cursor-pointer z-10"
                onClick={() => {
                  // Toggle glasses: none -> glasses -> none (same as left side)
                  setGlassesType(glassesType === 'none' ? 'glasses' : 'none');
                }}
              />
              {/* Middle section - controls shirts */}
              <div 
                className="absolute top-[45px] left-0 right-0 h-[91px] cursor-pointer z-10"
                onClick={() => {
                  // Cycle through in reverse order: none -> figma -> new -> femcel -> gooner -> twitter -> nyc -> kalshi -> none
                  if (shirtType === 'none') {
                    setShirtType('figma');
                  } else if (shirtType === 'figma') {
                    setShirtType('new');
                  } else if (shirtType === 'new') {
                    setShirtType('femcel');
                  } else if (shirtType === 'femcel') {
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
            <div className="absolute left-[7px] top-[155px] flex flex-col gap-[6.066px] z-10" data-node-id="1:78">
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
              isFeeding={isFeeding}
              isPlaying={isPlaying}
              isCoding={isCoding}
              isListeningMusic={isListeningMusic}
              isGooning={isGooning}
              foodType={itemType}
              pantsType={pantsType}
              shirtType={shirtType}
              glassesType={glassesType}
              onCharacterClick={() => {
                if (showItem) {
                  // Macbook and iPod are always accepted, others have 70% chance to accept
                  const willAccept = (itemType === 'macbook' || itemType === 'ipod') ? true : Math.random() > 0.3;
                  
                  if (willAccept) {
                    // Swap arms immediately when character accepts item
                    // Set appropriate animation based on item type
                    if (itemType === 'gameboy') {
                      setIsPlaying(true);
                      setIsFeeding(false);
                      setIsCoding(false);
                      setIsListeningMusic(false);
                      // Randomly choose between asteroids and snake
                      setGameType(Math.random() > 0.5 ? 'asteroids' : 'snake');
                      // Don't show dialogue for playing gameboy
                      setShowItem(false);
                      handleInteraction('play', true);
                      return;
                    } else if (itemType === 'macbook') {
                      setIsCoding(true);
                      setIsFeeding(false);
                      setIsPlaying(false);
                      setIsListeningMusic(false);
                      handleInteraction('code', true);
                    } else if (itemType === 'ipod') {
                      setIsListeningMusic(true);
                      setIsFeeding(false);
                      setIsPlaying(false);
                      setIsCoding(false);
                      handleInteraction('music', true);
                    } else {
                      setIsFeeding(true);
                      setIsPlaying(false);
                      setIsCoding(false);
                      setIsListeningMusic(false);
                      handleInteraction('feed', true);
                    }
                    // Character accepts item - show dialogue and hide item
                    // Randomly select an eating phrase
                    const randomPhrase = techBroPhrasesEating[Math.floor(Math.random() * techBroPhrasesEating.length)];
                    setDialogueText(randomPhrase);
                    setShowDialogue(true);
                    setShowItem(false);
                    // Timeout is handled in useEffect to ensure proper cleanup
                  } else {
                    // Character denies item - show denial message
                    // Use different phrases for gameboy vs other items
                    const randomDenial = itemType === 'gameboy' 
                      ? lockingInPhrases[Math.floor(Math.random() * lockingInPhrases.length)]
                      : denialPhrases[Math.floor(Math.random() * denialPhrases.length)];
                    setDialogueText(randomDenial);
                    setShowDialogue(true);
                    setShowItem(false);
                    setIsFeeding(false); // Don't swap arms when denied
                    setIsPlaying(false); // Don't swap arms when denied
                    setIsCoding(false); // Don't swap arms when denied
                    setIsListeningMusic(false); // Don't swap arms when denied
                    handleInteraction('rejected', false);
                    // Timeout is handled in useEffect to ensure proper cleanup
                  }
                } else {
                  // Character clicked when not feeding - show edgy tech bro phrase
                  // Don't show dialogue if playing gameboy
                  if (canClickCharacter && !showDialogue && !isPlaying) {
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

            {/* Game Animation - appears when playing gameboy */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  className="absolute left-[140px] top-[150px] w-[100px] h-[80px] z-40 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Game screen background */}
                  <div className="absolute inset-0 bg-black rounded-sm border-2 border-gray-600" />
                  
                  {gameType === 'asteroids' ? (
                    <>
                      {/* Spaceship */}
                      <motion.div
                        className="absolute bottom-[10px] w-0 h-0"
                        animate={{
                          left: [10, 30, 60, 80, 60, 30, 10],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderBottom: '10px solid white',
                        }}
                      />
                      
                      {/* Bullets */}
                      <motion.div
                        className="absolute left-[48px] w-[2px] h-[4px] bg-white"
                        animate={{
                          y: [-10, -70],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Asteroid 1 */}
                      <motion.div
                        className="absolute left-[20px] w-[8px] h-[8px] bg-gray-400 rounded-sm"
                        animate={{
                          y: [0, 80],
                          rotate: [0, 180]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Asteroid 2 */}
                      <motion.div
                        className="absolute left-[60px] w-[10px] h-[10px] bg-gray-500 rounded-sm"
                        animate={{
                          y: [-20, 80],
                          rotate: [0, -180]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 0.5
                        }}
                      />
                      
                      {/* Asteroid 3 */}
                      <motion.div
                        className="absolute left-[35px] w-[6px] h-[6px] bg-gray-300 rounded-sm"
                        animate={{
                          y: [-30, 80],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 1
                        }}
                      />
                    </>
                  ) : (
                    <>
                      {/* Snake Game */}
                      {/* Snake Head */}
                      <motion.div
                        className="absolute w-[5px] h-[5px] bg-green-400"
                        animate={{
                          x: [10, 30, 50, 70, 85, 85, 65, 45, 25, 10, 10],
                          y: [10, 10, 10, 10, 10, 30, 50, 50, 50, 30, 10]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Snake Body Segment 1 */}
                      <motion.div
                        className="absolute w-[5px] h-[5px] bg-green-500"
                        animate={{
                          x: [10, 10, 30, 50, 70, 85, 85, 65, 45, 25, 10],
                          y: [10, 10, 10, 10, 10, 10, 30, 50, 50, 50, 30]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Snake Body Segment 2 */}
                      <motion.div
                        className="absolute w-[5px] h-[5px] bg-green-500"
                        animate={{
                          x: [10, 10, 10, 30, 50, 70, 85, 85, 65, 45, 25],
                          y: [10, 10, 10, 10, 10, 10, 10, 30, 50, 50, 50]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Snake Body Segment 3 */}
                      <motion.div
                        className="absolute w-[5px] h-[5px] bg-green-600"
                        animate={{
                          x: [10, 10, 10, 10, 30, 50, 70, 85, 85, 65, 45],
                          y: [10, 10, 10, 10, 10, 10, 10, 10, 30, 50, 50]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Food/Apple */}
                      <motion.div
                        className="absolute w-[5px] h-[5px] bg-red-500 rounded-sm"
                        style={{
                          left: '45px',
                          top: '35px'
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Item Image - appears when Feed or Play is clicked and follows cursor */}
            <AnimatePresence>
              {showItem && (
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
                    src={itemType === 'macbook' ? '/Macbook.png' : itemType === 'ipod' ? '/ipod.png' : `/${itemType}.png`}
                    alt={itemType === 'shawarma' ? 'Shawarma' : itemType === 'ramen' ? 'Ramen' : itemType === 'gameboy' ? 'Gameboy' : itemType === 'macbook' ? 'Macbook' : 'iPod'} 
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
              {showDialogue && !isCoding && !isListeningMusic && (
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
                  <div className="relative inline-block" style={{ lineHeight: 0, width: '120px', height: '100px' }}>
                    {/* Speech bubble using Figma vector */}
                    <img 
                      src="/assets/speech-bubble.svg"
                      alt="Speech bubble"
                      className="block absolute inset-0"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        display: 'block',
                        verticalAlign: 'top'
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

        {/* Particle Effects */}
        <AnimatePresence>
          {showParticles && (
            <>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: '200px',
                    top: '300px',
                    background: ['#fbbf24', '#60a5fa', '#34d399', '#f87171'][i % 4],
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>


        {/* Floating XP Indicators */}
        <AnimatePresence>
          {showParticles && (
            <motion.div
              className="absolute left-[200px] top-[250px] z-50 pointer-events-none"
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -50, opacity: 0, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-green-500 font-bold text-xl drop-shadow-lg">
                +XP
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

