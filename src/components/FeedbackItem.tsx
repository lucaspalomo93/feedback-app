import { FaTimes } from "react-icons/fa";
import { FeedbackItemType } from "../data/FeedbackData";
import Card from "./shared/Card";

interface FeedbackItemProps {
  feedbackItem: FeedbackItemType;
  handleDelete: (id: number) => void;
}

const FeedbackItem = ({ feedbackItem, handleDelete }: FeedbackItemProps) => {
  return (
    <Card>
      <div className="num-display">{feedbackItem.rating}</div>
      <button
        onClick={() => feedbackItem.id && handleDelete(feedbackItem.id)}
        className="close"
      >
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{feedbackItem.text}</div>
    </Card>
  );
};

export default FeedbackItem;
