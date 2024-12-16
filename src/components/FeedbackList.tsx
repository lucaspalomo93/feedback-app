import { useContext } from 'react';
import { FeedbackItemType } from '../data/FeedbackData';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';

const FeedbackList = () => {
  const { feedback, isLoading } = useContext(FeedbackContext);
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback</p>;
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedbac-list'>
      {feedback.map((f: FeedbackItemType) => {
        return <FeedbackItem key={f.id} feedbackItem={f} />;
      })}
    </div>
  );
};

export default FeedbackList;
