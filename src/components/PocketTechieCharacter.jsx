import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Image assets - local files
const imgVector1 = "/assets/body.svg";
const imgEllipse1 = "/assets/head.svg";
const imgVector3 = "/assets/arm.svg";
const imgVector4 = "/assets/leaf.svg";
const imgLine4 = "/assets/chin-line.svg";
const imgLine3 = "/assets/mouth-line.svg";
const imgLine1 = "/assets/eyebrow.svg";
// Shirt assets
const imgVector5 = "/assets/shirt-kalshi.svg";
const imgImage6 = "/assets/kalshi-logo.png";
const imgGroup14 = "/assets/shirt-nyc.svg";
const imgImage8 = "/assets/nyc-logo.png";
const imgVector5Twitter = "/assets/shirt-twitter.svg";
const imgImage9 = "/assets/twitter-logo.png";
const imgVector5Gooner = "/assets/shirt-gooner.svg";
const imgVector5Femcel = "/assets/shirt-femcel.svg";
const imgImage11 = "/assets/femcel-image.png";
const imgVector5New = "/assets/shirt-new.svg";
const imgImage14 = "/assets/new-shirt-image.png";
const imgVector5Figma = "/assets/shirt-figma.svg";
const imgImage18 = "/assets/badge-figma.png";
// Glasses asset
const imgGlasses = "/assets/glasses.svg";
// Headphones asset
const imgHeadphones = "/assets/headphones.svg";
// Old man hair asset
const imgOldManHair = "/assets/old-man-hair.svg";
// Bowtie asset
const imgBowtie = "/assets/bowtie.svg";
// Spikey hair asset
const imgSpikeyHair = "/assets/spikey-hair.svg";
// Medium hair asset
const imgMediumHair = "/assets/medium-hair.svg";
// Bowl cut hair asset
const imgBowlCutHair = "/assets/bowl-cut-hair.svg";

// Export breathing animation so it can be shared with other components
export const breathingAnimation = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const PocketTechieCharacter = ({ onCharacterClick, isFeeding = false, isPlaying = false, isCoding = false, isListeningMusic = false, isGooning = false, foodType = 'shawarma', pantsType = 'none', shirtType = 'none', glassesType = 'none', hairType = 'none' }) => {
  // Code lines for typing animation
  const codeLines = [
    "const hello = 'world';",
    "function getData() {",
    "if (user.isActive) {",
    "return await fetch();",
    "const result = data.map()",
    "console.log('debug');",
    "let count = 0;",
    "export default App;"
  ];

  // State for typing animation
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (!isCoding) {
      setDisplayedCode('');
      setCharIndex(0);
      setCurrentLineIndex(0);
      return;
    }

    const currentLine = codeLines[currentLineIndex];
    
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentLine.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 150); // Typing speed: 150ms per character (slower)
      
      return () => clearTimeout(timeout);
    } else {
      // Line is complete, wait then move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex((currentLineIndex + 1) % codeLines.length);
        setCharIndex(0);
        setDisplayedCode('');
      }, 2500); // Pause before next line (longer pause)
      
      return () => clearTimeout(timeout);
    }
  }, [isCoding, charIndex, currentLineIndex]);

  // Idle animation variants
  // Combine isFeeding, isPlaying, and isCoding for holding items (not isListeningMusic - arms stay normal)
  const isHoldingItem = isFeeding || isPlaying || isCoding;

  const headBobAnimation = {
    y: [0, -2, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Music headbob animation - more pronounced up and down movement
  const musicHeadbobAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const armSwayAnimation = {
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const rightArmSwayAnimation = {
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const blinkAnimation = {
    scaleY: [1, 0.1, 1],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut"
    }
  };

  // Music notes animation - pop up and fade out
  const musicNoteAnimation = {
    y: [0, -40, -60],
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.8],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeOut"
    }
  };

  const musicNoteAnimationDelayed = {
    y: [0, -40, -60],
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.8],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeOut",
      delay: 0.9
    }
  };

  const bowlVerticalAnimation = {
    y: [0, 3, -3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Sporadic button-pressing animation for playing gameboy
  const buttonPressingAnimation = {
    x: [0, -3, 2, -2, 3, -1, 2, 0, -2, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.1, 0.2, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1]
    }
  };

  // Gooning animation - eyes shift right slowly, pause, then return
  const gooningAnimation = {
    x: [0, 10, 10, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      times: [0, 0.25, 0.75, 1] // Slow shift (25%), pause (50%), return (25%)
    }
  };

  return (
    <>
      {/* Clickable area covering the character */}
      <div
        className="absolute left-[103px] top-[226px] w-[145px] h-[230px] z-[25] cursor-pointer"
        onClick={onCharacterClick}
        style={{ backgroundColor: 'transparent' }}
      />
      
      {/* Character Container - Center Right 124px left*/}
      <motion.div 
        className="absolute left-[132px] top-[226px] w-[110px] h-[110px] z-20" 
        data-node-id="1:16"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
      >
        <div className="absolute inset-[-4.55%]">
          <img alt="Character head" className="block max-w-none w-full h-full" src={imgEllipse1} />
        </div>
      </motion.div>

      {/* Glasses - positioned to align with head - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[116px] top-[223px] w-[133px] h-[88px] z-[25]" 
        data-node-id="33:618"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: glassesType === 'glasses' ? 1 : 0, pointerEvents: glassesType === 'glasses' ? 'auto' : 'none' }}
      >
        <div className="absolute bottom-0 left-0 right-[-0.77%] top-[-1.14%]">
          <img alt="Glasses" className="block max-w-none w-full h-full" src={imgGlasses} />
        </div>
      </motion.div>

      {/* Old Man Hair - positioned to align with head - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[173px] top-[253px] w-[123px] h-[28px] z-[25]" 
        data-node-id="70:19"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: hairType === 'oldmanhair' ? 1 : 0, pointerEvents: hairType === 'oldmanhair' ? 'auto' : 'none' }}
      >
        <div className="absolute bottom-[-2.65%] left-0 right-[-0.4%] top-0">
          <img alt="Old Man Hair" className="block max-w-none w-full h-full" src={imgOldManHair} />
        </div>
      </motion.div>

      {/* Bowtie - positioned near neck/chin - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[195px] top-[218px] w-[60px] h-[50px] z-[25]" 
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: hairType === 'bowtie' ? 1 : 0, pointerEvents: hairType === 'bowtie' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-0">
          <img alt="Bowtie" className="block max-w-none w-full h-full" src={imgBowtie} />
        </div>
      </motion.div>

      {/* Spikey Hair - positioned on top of head - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[130px] top-[203px] w-[113px] h-[68px] z-[25]" 
        data-node-id="78:54"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: hairType === 'spikeyhair' ? 1 : 0, pointerEvents: hairType === 'spikeyhair' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-11.5%_-5.95%_-13.41%_-7.83%]">
          <img alt="Spikey Hair" className="block max-w-none w-full h-full" src={imgSpikeyHair} />
        </div>
      </motion.div>

      {/* Medium Hair - positioned on top of head - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[106px] top-[203px] w-[163px] h-[118px] z-[25]" 
        data-node-id="78:64"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: hairType === 'mediumhair' ? 1 : 0, pointerEvents: hairType === 'mediumhair' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-1.77%_-0.7%_-1.42%_-2.35%]">
          <img alt="Medium Hair" className="block max-w-none w-full h-full" src={imgMediumHair} />
        </div>
      </motion.div>

      {/* Bowl Cut Hair - positioned on top of head - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[130px] top-[223px] w-[113px] h-[58px] z-[25]" 
        data-node-id="78:72"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: hairType === 'bowlcuthair' ? 1 : 0, pointerEvents: hairType === 'bowlcuthair' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-0.76%_-0.42%_-2.36%_-0.42%]">
          <img alt="Bowl Cut Hair" className="block max-w-none w-full h-full" src={imgBowlCutHair} />
        </div>
      </motion.div>

      {/* Headphones - positioned to align with head - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[110px] top-[200px] w-[155px] h-[100px] z-[26]" 
        data-node-id="40:867"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ opacity: isListeningMusic ? 1 : 0, pointerEvents: isListeningMusic ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-2.17%_-2.6%_-4.33%_-2.6%]">
          <img alt="Headphones" className="block max-w-none w-full h-full" src={imgHeadphones} />
        </div>
      </motion.div>

      {/* Music Notes - appear when listening to music */}
      {isListeningMusic && (
        <>
          {/* Left side music note 1 */}
          <motion.div
            className="absolute left-[105px] top-[250px] z-[27] pointer-events-none"
            animate={musicNoteAnimation}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </motion.div>

          {/* Left side music note 2 */}
          <motion.div
            className="absolute left-[95px] top-[260px] z-[27] pointer-events-none"
            animate={musicNoteAnimationDelayed}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </motion.div>

          {/* Right side music note 1 */}
          <motion.div
            className="absolute left-[245px] top-[250px] z-[27] pointer-events-none"
            animate={musicNoteAnimationDelayed}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </motion.div>

          {/* Right side music note 2 */}
          <motion.div
            className="absolute left-[255px] top-[260px] z-[27] pointer-events-none"
            animate={musicNoteAnimation}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </motion.div>
        </>
      )}

      {/* Code Display - appears when coding */}
      {isCoding && displayedCode && (
        <motion.div
          className="absolute left-[120px] top-[190px] z-[27] pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gray-900 text-green-400 px-3 py-2 rounded-md shadow-lg font-mono text-xs whitespace-nowrap">
            {displayedCode}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>
      )}

      {/* Character Details */}
      {/* Left arm */}
      <motion.div 
        key={`left-arm-${isHoldingItem ? 'swapped' : 'normal'}`}
        className={`absolute h-[72.995px] w-[29.207px] z-[30] ${isHoldingItem ? 'flex items-center justify-center' : ''}`}
        data-node-id="1:21"
        animate={(isPlaying || isCoding) ? buttonPressingAnimation : (isHoldingItem ? rightArmSwayAnimation : armSwayAnimation)}
        style={{ 
          transformOrigin: 'top center',
          scaleY: isHoldingItem ? -1 : 1,
          top: isHoldingItem ? '395px' : '331px',
          left: isHoldingItem ? '216.207px' : '133px' //Animation
        }}
        transition={{ duration: 0 }}
      >
        {isHoldingItem ? (
          <div className="flex-none rotate-[220deg] scale-y-[-100%]">
            <div className="h-[72.995px] relative w-[29.207px]">
              <div className="absolute inset-[-1.24%_-6.72%_-2.74%_-6.85%]">
                <img alt="Left arm" className="block max-w-none w-full h-full" src={imgVector3} />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-[-1.24%_-6.72%_-2.74%_-6.85%]">
            <img alt="Left arm" className="block max-w-none w-full h-full" src={imgVector3} />
          </div>
        )}
      </motion.div>

      {/* Right arm */}
      <motion.div 
        key={`right-arm-${isHoldingItem ? 'swapped' : 'normal'}`}
        className={`absolute h-[72.995px] w-[29.207px] z-[30] ${isHoldingItem ? '' : 'flex items-center justify-center'}`}
        animate={(isPlaying || isCoding) ? buttonPressingAnimation : (isHoldingItem ? armSwayAnimation : rightArmSwayAnimation)}
        style={{ 
          transformOrigin: 'top center',
          scaleY: isHoldingItem ? -1 : 1,
          top: isHoldingItem ? '395px' : '331px',
          left: isHoldingItem ? '133px' : '216.207px' //Animation
        }}
        transition={{ duration: 0 }}
      >
        {isHoldingItem ? (
          <div className="flex-none rotate-[150deg] scale-y-[-100%] scale-x-[-100%]">
            <div className="h-[72.995px] relative w-[29.207px]">
              <div className="absolute inset-[-1.24%_-6.72%_-2.74%_-6.85%]">
                <img alt="Right arm" className="block max-w-none w-full h-full" src={imgVector3} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="h-[72.995px] relative w-[29.207px]" data-node-id="1:22">
              <div className="absolute inset-[-1.24%_-6.72%_-2.74%_-6.85%]">
                <img alt="Right arm" className="block max-w-none w-full h-full" src={imgVector3} />
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Gray oval behind body */}
      <motion.div 
        className="absolute left-[138px] top-[420px] w-[100px] h-[45px] z-0"
        style={{ 
          backgroundColor: 'rgba(128, 128, 128, 0.23)',
          borderRadius: '50%'
        }}
      />

      {/* Body Container - synchronized animation */}
      <motion.div 
        className="absolute left-[161px] top-[328px] z-10"
        animate={breathingAnimation}
      >
        {/* Body/center element */}
        <div 
          className="absolute h-[116px] w-[54.5px]" 
          data-node-id="1:19"
        >
          <div className="absolute inset-[-2.95%_-3.67%_-1.72%_-3.67%]">
            <img alt="Character body" className="block max-w-none w-full h-full" src={imgVector1} />
          </div>
        </div>

        {/* Shirts - always rendered for animation sync, controlled by opacity */}
        <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:338" style={{ opacity: shirtType === 'kalshi' ? 1 : 0, pointerEvents: shirtType === 'kalshi' ? 'auto' : 'none' }}>
          <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:339">
            <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgVector5} />
            </div>
          </div>
          <div className="absolute h-[14px] left-[6.25px] top-[26px] w-[42px]" data-name="image 6" data-node-id="15:340">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
          </div>
        </div>

        <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:427" style={{ opacity: shirtType === 'nyc' ? 1 : 0, pointerEvents: shirtType === 'nyc' ? 'auto' : 'none' }}>
          <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:366">
            <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup14} />
            </div>
          </div>
          <div className="absolute h-[36px] left-[7.75px] top-[15px] w-[39px]" data-name="image 8" data-node-id="15:386">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage8} />
          </div>
        </div>

        <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:402" style={{ opacity: shirtType === 'twitter' ? 1 : 0, pointerEvents: shirtType === 'twitter' ? 'auto' : 'none' }}>
          <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:403">
            <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgVector5Twitter} />
            </div>
          </div>
          <div className="absolute h-[31px] left-[11.75px] top-[13px] w-[31px]" data-name="image 9" data-node-id="15:436">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage9} />
          </div>
        </div>

        <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:460" style={{ opacity: shirtType === 'gooner' ? 1 : 0, pointerEvents: shirtType === 'gooner' ? 'auto' : 'none' }}>
          <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:460">
            <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgVector5Gooner} />
            </div>
          </div>
          <div className="absolute left-[27.25px] top-[15px] translate-x-[-50%] pointer-events-none" data-node-id="15:478">
            <p className="font-['Comic_Sans_MS',sans-serif] text-[12px] text-center text-white leading-tight mb-0">#1</p>
            <p className="font-['Comic_Sans_MS',sans-serif] text-[12px] text-center text-white leading-tight">Gooner</p>
          </div>
        </div>

        <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="33:692" style={{ opacity: shirtType === 'femcel' ? 1 : 0, pointerEvents: shirtType === 'femcel' ? 'auto' : 'none' }}>
          <div className="absolute h-[76.5px] w-[54.5px]">
            <div className="absolute inset-[-4.93%_-3.67%_-2.55%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgVector5Femcel} />
            </div>
          </div>
          <div className="absolute h-[28px] left-[9.75px] top-[11px] w-[35px]" data-name="image 11" data-node-id="33:700">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage11} />
          </div>
          <div className="absolute left-[27.25px] top-[41px] translate-x-[-50%] pointer-events-none">
            <p className="font-['Comic_Sans_MS',sans-serif] text-[07px] text-center text-black leading-tight">#1 femcel</p>
          </div>
        </div>

        <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="33:691" style={{ opacity: shirtType === 'new' ? 1 : 0, pointerEvents: shirtType === 'new' ? 'auto' : 'none' }}>
          <div className="absolute h-[76.5px] w-[54.5px]">
            <div className="absolute inset-[-4.93%_-3.67%_-2.55%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgVector5New} />
            </div>
          </div>
          <div className="absolute h-[35px] left-[7.75px] top-[21px] w-[39px]" data-name="image 14" data-node-id="39:765">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage14} />
          </div>
        </div>

        <div className="absolute top-[2px] left-0 w-[54.5px] h-[78.5px] z-20" data-node-id="43:960" style={{ opacity: shirtType === 'figma' ? 1 : 0, pointerEvents: shirtType === 'figma' ? 'auto' : 'none' }}>
          <div className="absolute h-[78.5px] w-[54.5px]">
            <div className="absolute inset-[-4.93%_-3.67%_-2.55%_-3.67%]">
              <img alt="" className="block max-w-none size-full" src={imgVector5Figma} />
            </div>
          </div>
          <div className="absolute h-[26px] left-[6.25px] rounded-[2px] top-[25px] w-[42px]" data-name="image 18" data-node-id="43:959">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[2px] size-full" src={imgImage18} />
          </div>
        </div>
      </motion.div>

      {/* Leaf on top of body - always rendered for animation sync */}
      <motion.div 
        className="absolute left-[174px] top-[393px] w-[30px] h-[30px] z-[30]"
        data-node-id="2:187"
        animate={breathingAnimation}
        style={{ opacity: pantsType === 'none' ? 1 : 0, pointerEvents: pantsType === 'none' ? 'auto' : 'none' }}
      >
        <div className="absolute inset-[-10.39%_-17.35%_-22.96%_-16.73%]">
          <img alt="" className="block max-w-none w-full h-full" src={imgVector4} />
        </div>
      </motion.div>

      {/* Chin Length */}
      <motion.div 
        className="absolute h-0 left-[167px] top-[323px] w-[19px] z-20" 
        data-node-id="1:29"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine4} />
        </div>
      </motion.div>
      
      {/* Mouth Length */}
      <motion.div 
        className="absolute h-0 left-[156px] top-[316px] w-[55px] z-20" 
        data-node-id="1:27"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine3} />
        </div>
      </motion.div>

      {/* Eyebrow Left 133px left*/}
      <motion.div 
        className="absolute h-0 left-[141px] w-[34px] z-20" 
        data-node-id="1:24"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ 
          top: (isPlaying || isCoding) ? '296px' : '286px'
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine1} />
        </div>
      </motion.div>
      
      {/* Eyes Left Vertical Dimension 137px left*/}
      <motion.div 
        className="absolute bg-black rounded-[50px] w-[5px] z-20 overflow-hidden" 
        data-node-id="1:32"
        animate={{
          y: isListeningMusic ? musicHeadbobAnimation.y : headBobAnimation.y,
          scaleY: blinkAnimation.scaleY,
          x: isGooning ? gooningAnimation.x : 0,
          transition: {
            y: isListeningMusic ? musicHeadbobAnimation.transition : headBobAnimation.transition,
            scaleY: blinkAnimation.transition,
            x: isGooning ? gooningAnimation.transition : { duration: 0 }
          }
        }}
        style={{ 
          height: '11px', 
          transformOrigin: 'center',
          left: (isPlaying || isCoding) ? '158px' : (isHoldingItem ? '155px' : '145px'),
          top: (isPlaying || isCoding) ? '293px' : '283px'
        }}
      />
      
      {/* Right Eyebrow */}
      <motion.div 
        className="absolute h-0 left-[188px] w-[34px] z-20" 
        data-node-id="1:37"
        animate={isListeningMusic ? musicHeadbobAnimation : headBobAnimation}
        style={{ 
          top: (isPlaying || isCoding) ? '296px' : '286px'
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine1} />
        </div>
      </motion.div>
      
      {/* Right Eye */}
      <motion.div 
        className="absolute bg-black rounded-[50px] w-[5px] z-20 overflow-hidden" 
        data-node-id="1:38"
        animate={{
          y: isListeningMusic ? musicHeadbobAnimation.y : headBobAnimation.y,
          scaleY: blinkAnimation.scaleY,
          x: isGooning ? gooningAnimation.x : 0,
          transition: {
            y: isListeningMusic ? musicHeadbobAnimation.transition : headBobAnimation.transition,
            scaleY: blinkAnimation.transition,
            x: isGooning ? gooningAnimation.transition : { duration: 0 }
          }
        }}
        style={{ 
          height: '11px', 
          transformOrigin: 'center',
          left: (isPlaying || isCoding) ? '204px' : (isHoldingItem ? '201px' : '191px'),
          top: (isPlaying || isCoding) ? '293px' : '283px'
        }}
      />

      {/* Blue glow behind gameboy - appears when playing */}
      {isPlaying && (
        <motion.div 
          className="absolute left-[155px] top-[300px] z-[22] pointer-events-none"
          style={{ transform: 'translateX(-50%)' }}
          animate={{
            ...bowlVerticalAnimation,
            opacity: [0.6, 1, 1],
            scale: [1, 1.1, 1]
          }}
          transition={{
            opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            y: bowlVerticalAnimation.transition
          }}
        >
          <div 
            className="w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0) 100%)',
              filter: 'blur(8px)'
            }}
          />
        </motion.div>
      )}

      {/* Food Bowl / Gameboy / Macbook - appears when feeding, playing, or coding */}
      {isHoldingItem && (
        <motion.div 
          className="absolute pointer-events-none"
          style={{ 
            left: foodType === 'macbook' ? '140px' : '155px',
            top: foodType === 'macbook' ? '290px' : '300px',
            transform: 'translateX(-50%)',
            zIndex: foodType === 'macbook' ? 35 : 25
          }}
          animate={bowlVerticalAnimation}
        >
          <img 
            src={foodType === 'gameboy' ? '/backofgameboy.png' : foodType === 'macbook' ? '/MacbookFront.png' : foodType === 'ipod' ? '/ipod.png' : `/${foodType}.png`}
            alt={foodType === 'shawarma' ? 'Shawarma bowl' : foodType === 'ramen' ? 'Ramen bowl' : foodType === 'gameboy' ? 'Gameboy' : foodType === 'macbook' ? 'Macbook' : foodType === 'ipod' ? 'iPod' : 'Item'} 
            className={foodType === 'macbook' ? 'w-24 h-24 object-contain' : 'w-16 h-16 object-contain'}
            draggable={false}
          />
        </motion.div>
      )}
    </>
  );
};

