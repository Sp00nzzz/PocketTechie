import { motion } from 'framer-motion';

// Image assets from Figma
const imgVector1 = "http://localhost:3845/assets/0d5a63f06eee711f3972fcd6e9f4a1427cb25941.svg";
const imgEllipse1 = "http://localhost:3845/assets/d097efe00552d9a3456f963ca695a8076b240f13.svg";
const imgVector2 = "http://localhost:3845/assets/26c7719bb9d92731ce3055e92b1d37a1d8571ca9.svg";
const imgVector3 = "http://localhost:3845/assets/8a2c262f9100bfda14ef71e8e4c03c4c5d9513bc.svg";
const imgVector4 = "http://localhost:3845/assets/84801a260bbed1c4d882d0bb1fa76a358ca9b4e9.svg";
const imgLine4 = "http://localhost:3845/assets/99622ff410e7a611e65f47d4c548cff696d42e10.svg";
const imgLine3 = "http://localhost:3845/assets/10f66c7daa211410217d5a25de67aead86225402.svg";
const imgLine1 = "http://localhost:3845/assets/e46d0242724737d5c5aee8cde45e7536c46173f4.svg";

export const PocketTechieCharacter = ({ onCharacterClick }) => {
  // Idle animation variants
  const breathingAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

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
        className="absolute h-[72.995px] left-[133px] top-[331px] w-[29.207px] z-10" 
        data-node-id="1:21"
        animate={armSwayAnimation}
        style={{ transformOrigin: 'top center' }}
      >
        <div className="absolute inset-[-1.24%_-6.72%_-2.74%_-6.85%]">
          <img alt="Left arm" className="block max-w-none w-full h-full" src={imgVector2} />
        </div>
      </motion.div>

      {/* Right arm */}
      <motion.div 
        className="absolute flex h-[72.995px] items-center justify-center left-[216.207px] top-[331px] w-[29.207px] z-10"
        animate={rightArmSwayAnimation}
        style={{ transformOrigin: 'top center' }}
      >
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[72.995px] relative w-[29.207px]" data-node-id="1:22">
            <div className="absolute inset-[-1.24%_-6.72%_-2.74%_-6.85%]">
              <img alt="Right arm" className="block max-w-none w-full h-full" src={imgVector3} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gray oval behind body */}
      <motion.div 
        className="absolute left-[138px] top-[420px] w-[100px] h-[45px] z-0"
        style={{ 
          backgroundColor: 'rgba(128, 128, 128, 0.23)',
          borderRadius: '50%'
        }}
      />

      {/* Body and Leaf Container - synchronized animation */}
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

        {/* Leaf on top of body */}
        <div 
          className="absolute left-[13px] top-[65px] w-[30px] h-[30px] z-[15]" 
          data-node-id="2:187"
        >
          <div className="absolute inset-[-10.39%_-17.35%_-22.96%_-16.73%]">
            <img alt="" className="block max-w-none w-full h-full" src={imgVector4} />
          </div>
        </div>
      </motion.div>

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
        className="absolute bg-black left-[145px] rounded-[50px] top-[283px] w-[5px] z-20 overflow-hidden" 
        data-node-id="1:32"
        animate={{
          y: headBobAnimation.y,
          scaleY: blinkAnimation.scaleY,
          transition: {
            y: headBobAnimation.transition,
            scaleY: blinkAnimation.transition
          }
        }}
        style={{ height: '11px', transformOrigin: 'center' }}
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
        className="absolute bg-black left-[191px] rounded-[50px] top-[283px] w-[5px] z-20 overflow-hidden" 
        data-node-id="1:38"
        animate={{
          y: headBobAnimation.y,
          scaleY: blinkAnimation.scaleY,
          transition: {
            y: headBobAnimation.transition,
            scaleY: blinkAnimation.transition
          }
        }}
        style={{ height: '11px', transformOrigin: 'center' }}
      />
    </>
  );
};

