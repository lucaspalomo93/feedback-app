import { FaTimes } from 'react-icons/fa';
import { FeedbackItemType } from '../data/FeedbackData';
import Card from './shared/Card';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

interface FeedbackItemProps {
  feedbackItem: FeedbackItemType;
}

const FeedbackItem = ({ feedbackItem }: FeedbackItemProps) => {
  const { deleteFeedback } = useContext(FeedbackContext);
  return (
    <Card>
      <div className='num-display'>{feedbackItem.rating}</div>
      <button
        onClick={() => feedbackItem.id && deleteFeedback(feedbackItem.id)}
        className='close'
      >
        <FaTimes color='purple' />
      </button>
      <div className='text-display'>{feedbackItem.text}</div>
    </Card>
  );
};

export default FeedbackItem;
