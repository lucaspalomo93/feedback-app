import { useContext } from 'react';
import { FeedbackItemType } from '../data/FeedbackData';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackList = () => {
  const { feedback } = useContext(FeedbackContext);
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback</p>;
  }
  return (
    <div className='feedbac-list'>
      {feedback.map((f: FeedbackItemType) => {
        return (
          <FeedbackItem
            key={f.id}
            feedbackItem={f}
          />
        );
      })}
    </div>
  );
};

export default FeedbackList;
