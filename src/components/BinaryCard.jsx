import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SwipeIndicators from './SwipeIndicators';

/**
 * BinaryCard Component
 * 
 * A swipeable card for binary (yes/no) questions using Framer Motion
 * Features:
 * - Drag left/right for binary questions
 * - Rotation transform based on x position
 * - Opacity transform during drag
 * - Exit animations in swipe direction
 * - 100px swipe threshold
 */
function BinaryCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { category, text, options } = question;
  const [exitX, setExitX] = useState(0);
  
  // Motion values for tracking drag position
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    
    // Binary questions: Left = No, Right = Yes
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swiped right
        setExitX(1000);
        setTimeout(() => onAnswer(options.right), 200);
      } else {
        // Swiped left
        setExitX(-1000);
        setTimeout(() => onAnswer(options.left), 200);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Negative space where progress was */}
      <div className="mb-6 h-12"></div>

      {/* Card Container with Swipe Indicators */}
      <div className="relative">
        {/* Swipe Indicators for Binary Questions */}
        <SwipeIndicators x={x} />

        {/* Swipeable Question Card */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-8 min-h-[400px] flex flex-col justify-between cursor-grab active:cursor-grabbing border border-gray-200"
          style={{
            x,
            rotate,
            opacity,
            boxShadow: '6px 6px 12px rgba(0, 0, 0, 0.08), -6px -6px 12px rgba(255, 255, 255, 0.5)'
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={exitX !== 0 ? { x: exitX } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block bg-zillow-blue text-white text-sm font-semibold px-4 py-2 rounded-full">
            {category}
          </span>
        </div>

        {/* Question Text */}
        <div className="flex-grow flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            {text}
          </h2>
        </div>

        {/* Interactive Buttons */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4 text-center">
            Swipe left or right • Or tap below
          </p>
          
          {/* Fallback Buttons for Accessibility */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setExitX(-1000);
                setTimeout(() => onAnswer(options.left), 200);
              }}
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
            >
              <div className="text-3xl mb-2">←</div>
              <p className="text-sm font-medium">{options.left}</p>
            </button>
            <button
              onClick={() => {
                setExitX(1000);
                setTimeout(() => onAnswer(options.right), 200);
              }}
              className="text-center p-4 bg-gray-50 rounded-lg hover:bg-zillow-blue hover:text-white transition-all duration-200 active:scale-95 cursor-pointer border-2 border-transparent hover:border-zillow-blue"
            >
              <div className="text-3xl mb-2">→</div>
              <p className="text-sm font-medium">{options.right}</p>
            </button>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

BinaryCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['binary']).isRequired,
    options: PropTypes.shape({
      left: PropTypes.string.isRequired,
      right: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default BinaryCard;
