import PropTypes from 'prop-types';
import BinaryCard from './BinaryCard';
import MultiChoiceCard from './MultiChoiceCard';

/**
 * SwipeCard Component
 * 
 * A routing component that delegates to specific card types:
 * - BinaryCard for binary (yes/no) questions with left/right swipes
 * - MultiChoiceCard for multi-choice questions with 8-directional swipes
 */
function SwipeCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { type } = question;
  
  // Delegate to appropriate card component based on question type
  if (type === 'multiChoice') {
    return (
      <MultiChoiceCard
        question={question}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        onAnswer={onAnswer}
      />
    );
  }

  // Default to binary card
  return (
    <BinaryCard
      question={question}
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      onAnswer={onAnswer}
    />
  );
}

SwipeCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['binary', 'multiChoice']).isRequired,
    options: PropTypes.object.isRequired,
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default SwipeCard;
