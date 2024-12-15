import { FeedbackItemType } from '../data/FeedbackData';
import FeedbackItem from './FeedbackItem';

interface FeedbackListProps {
  feedback: FeedbackItemType[];
  handleDelete: (id:number) => void;
}
const FeedbackList = ({ feedback, handleDelete }: FeedbackListProps) => {
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
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default FeedbackList;
