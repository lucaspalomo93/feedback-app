import { createContext, ReactNode, useState } from 'react';
import { FeedbackItemType } from '../data/FeedbackData';
import { v4 as uuidv4 } from 'uuid';

interface FeedbackEditInterface {
  item: FeedbackItemType;
  edit: boolean;
}

interface State {
  feedback: FeedbackItemType[];
  feedbackEdit: FeedbackEditInterface;
  setFeedback: (feedback: FeedbackItemType[]) => void;
  deleteFeedback: (id: string) => void;
  addFeedback: (feedbackItem: FeedbackItemType) => void;
  editFeedback: (item: FeedbackItemType) => void;
  updateFeedbackItem: (id: string, updItem: FeedbackItemType) => void;
}

const initialState: State = {
  feedback: [{ id: '1', rating: 10, text: 'Example review' }],
  feedbackEdit: {
    item: {
      rating: 0,
      text: 'ej',
    },
    edit: false,
  },
  setFeedback: () => {},
  deleteFeedback: () => {},
  addFeedback: () => {},
  editFeedback: () => {},
  updateFeedbackItem: () => {},
};

const FeedbackContext = createContext<State>(initialState);

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const [feedback, setFeedback] = useState(initialState.feedback);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {
      rating: 0,
      text: 'ej',
    },
    edit: false,
  });
  const deleteFeedback = (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((f) => f.id !== id));
    }
  };
  const addFeedback = (feedbackItem: FeedbackItemType) => {
    setFeedbackEdit({ ...feedbackEdit, edit: false });
    feedbackItem.id = uuidv4();
    setFeedback([...feedback, feedbackItem]);
  };
  const editFeedback = (item: FeedbackItemType) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const updateFeedbackItem = (id: string, updItem: FeedbackItemType) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        setFeedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedbackItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
