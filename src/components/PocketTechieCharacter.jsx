import { motion } from 'framer-motion';

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

// Export breathing animation so it can be shared with other components
export const breathingAnimation = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const PocketTechieCharacter = ({ onCharacterClick, isFeeding = false, foodType = 'shawarma', pantsType = 'none', shirtType = 'none' }) => {
  // Idle animation variants

  const headBobAnimation = {
    y: [0, -2, 0],
    transition: {
      duration: 2.5,
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

  const bowlVerticalAnimation = {
    y: [0, 3, -3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
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
        animate={headBobAnimation}
      >
        <div className="absolute inset-[-4.55%]">
          <img alt="Character head" className="block max-w-none w-full h-full" src={imgEllipse1} />
        </div>
      </motion.div>

      {/* Character Details */}
      {/* Left arm */}
      <motion.div 
        key={`left-arm-${isFeeding ? 'swapped' : 'normal'}`}
        className={`absolute h-[72.995px] w-[29.207px] z-[30] ${isFeeding ? 'flex items-center justify-center' : ''}`}
        data-node-id="1:21"
        animate={isFeeding ? rightArmSwayAnimation : armSwayAnimation}
        style={{ 
          transformOrigin: 'top center',
          scaleY: isFeeding ? -1 : 1,
          top: isFeeding ? '395px' : '331px',
          left: isFeeding ? '216.207px' : '133px'
        }}
        transition={{ duration: 0 }}
      >
        {isFeeding ? (
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
        key={`right-arm-${isFeeding ? 'swapped' : 'normal'}`}
        className={`absolute h-[72.995px] w-[29.207px] z-[30] ${isFeeding ? '' : 'flex items-center justify-center'}`}
        animate={isFeeding ? armSwayAnimation : rightArmSwayAnimation}
        style={{ 
          transformOrigin: 'top center',
          scaleY: isFeeding ? -1 : 1,
          top: isFeeding ? '395px' : '331px',
          left: isFeeding ? '133px' : '216.207px'
        }}
        transition={{ duration: 0 }}
      >
        {isFeeding ? (
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

        {/* Shirt - positioned relative to body container */}
        {shirtType === 'kalshi' && (
          <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:338">
            <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:339">
              <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
                <img alt="" className="block max-w-none size-full" src={imgVector5} />
              </div>
            </div>
            <div className="absolute h-[14px] left-[6.25px] top-[26px] w-[42px]" data-name="image 6" data-node-id="15:340">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
            </div>
          </div>
        )}

        {shirtType === 'nyc' && (
          <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:427">
            <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:366">
              <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <div className="absolute h-[36px] left-[7.75px] top-[15px] w-[39px]" data-name="image 8" data-node-id="15:386">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage8} />
            </div>
          </div>
        )}

        {shirtType === 'twitter' && (
          <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:402">
            <div className="absolute h-[76.5px] w-[54.5px]" data-node-id="15:403">
              <div className="absolute inset-[-4.47%_-3.67%_-2.61%_-3.67%]">
                <img alt="" className="block max-w-none size-full" src={imgVector5Twitter} />
              </div>
            </div>
            <div className="absolute h-[31px] left-[11.75px] top-[13px] w-[31px]" data-name="image 9" data-node-id="15:436">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage9} />
            </div>
          </div>
        )}

        {shirtType === 'gooner' && (
          <div className="absolute top-[2px] left-0 w-[54.5px] h-[76.5px] z-20" data-node-id="15:460">
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
        )}
      </motion.div>

      {/* Leaf on top of body - only show when not wearing pants */}
      {pantsType === 'none' && (
        <motion.div 
          className="absolute left-[174px] top-[393px] w-[30px] h-[30px] z-[30]"
          data-node-id="2:187"
          animate={breathingAnimation}
        >
          <div className="absolute inset-[-10.39%_-17.35%_-22.96%_-16.73%]">
            <img alt="" className="block max-w-none w-full h-full" src={imgVector4} />
          </div>
        </motion.div>
      )}

      {/* Chin Length */}
      <motion.div 
        className="absolute h-0 left-[167px] top-[323px] w-[19px] z-20" 
        data-node-id="1:29"
        animate={headBobAnimation}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine4} />
        </div>
      </motion.div>
      
      {/* Mouth Length */}
      <motion.div 
        className="absolute h-0 left-[156px] top-[316px] w-[55px] z-20" 
        data-node-id="1:27"
        animate={headBobAnimation}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine3} />
        </div>
      </motion.div>

      {/* Eyebrow Left 133px left*/}
      <motion.div 
        className="absolute h-0 left-[141px] top-[286px] w-[34px] z-20" 
        data-node-id="1:24"
        animate={headBobAnimation}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine1} />
        </div>
      </motion.div>
      
      {/* Eyes Left Vertical Dimension 137px left*/}
      <motion.div 
        className="absolute bg-black rounded-[50px] top-[283px] w-[5px] z-20 overflow-hidden" 
        data-node-id="1:32"
        animate={{
          y: headBobAnimation.y,
          scaleY: blinkAnimation.scaleY,
          transition: {
            y: headBobAnimation.transition,
            scaleY: blinkAnimation.transition
          }
        }}
        style={{ 
          height: '11px', 
          transformOrigin: 'center',
          left: isFeeding ? '155px' : '145px'
        }}
      />
      
      {/* Right Eyebrow */}
      <motion.div 
        className="absolute h-0 left-[188px] top-[286px] w-[34px] z-20" 
        data-node-id="1:37"
        animate={headBobAnimation}
      >
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <img alt="" className="block max-w-none w-full h-full" src={imgLine1} />
        </div>
      </motion.div>
      
      {/* Right Eye */}
      <motion.div 
        className="absolute bg-black rounded-[50px] top-[283px] w-[5px] z-20 overflow-hidden" 
        data-node-id="1:38"
        animate={{
          y: headBobAnimation.y,
          scaleY: blinkAnimation.scaleY,
          transition: {
            y: headBobAnimation.transition,
            scaleY: blinkAnimation.transition
          }
        }}
        style={{ 
          height: '11px', 
          transformOrigin: 'center',
          left: isFeeding ? '201px' : '191px'
        }}
      />

      {/* Food Bowl - appears when feeding */}
      {isFeeding && (
        <motion.div 
          className="absolute left-[155px] top-[300px] z-[25] pointer-events-none"
          style={{ transform: 'translateX(-50%)' }}
          animate={bowlVerticalAnimation}
        >
          <img 
            src={`/${foodType}.png`}
            alt={foodType === 'shawarma' ? 'Shawarma bowl' : 'Ramen bowl'} 
            className="w-16 h-16 object-contain"
            draggable={false}
          />
        </motion.div>
      )}
    </>
  );
};

