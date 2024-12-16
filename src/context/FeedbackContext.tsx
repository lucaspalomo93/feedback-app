import { createContext, ReactNode, useState } from 'react';
import { FeedbackItemType } from '../data/FeedbackData';
import { v4 as uuidv4 } from 'uuid';

interface State {
  feedback: FeedbackItemType[];
  setFeedback: (feedback: FeedbackItemType[]) => void;
  deleteFeedback: (id: string) => void;
  addFeedback: (feedbackItem: FeedbackItemType) => void;
}

const initialState: State = {
  feedback: [{ id: '1', rating: 10, text: 'Example review' }],
  setFeedback: () => {},
  deleteFeedback: () => {},
  addFeedback: () => {},
};

const FeedbackContext = createContext<State>(initialState);

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const [feedback, setFeedback] = useState(initialState.feedback);
  const deleteFeedback = (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((f) => f.id !== id));
    }
  };
  const addFeedback = (feedbackItem: FeedbackItemType) => {
    feedbackItem.id = uuidv4();
    setFeedback([...feedback, feedbackItem]);
  };

  return (
    <FeedbackContext.Provider
      value={{ feedback, setFeedback, deleteFeedback, addFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
