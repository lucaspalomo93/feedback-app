import { createContext, ReactNode, useEffect, useState } from 'react';
import { FeedbackItemType } from '../data/FeedbackData';

interface FeedbackEditInterface {
  item: FeedbackItemType;
  edit: boolean;
}

interface State {
  feedback: FeedbackItemType[];
  feedbackEdit: FeedbackEditInterface;
  isLoading: boolean;
  setFeedback: (feedback: FeedbackItemType[]) => void;
  deleteFeedback: (id: string) => void;
  addFeedback: (feedbackItem: FeedbackItemType) => void;
  editFeedback: (item: FeedbackItemType) => void;
  updateFeedbackItem: (id: string, updItem: FeedbackItemType) => void;
  setFeedbackEdit: React.Dispatch<React.SetStateAction<FeedbackEditInterface>>;
}

const initialState: State = {
  feedback: [],
  feedbackEdit: {
    item: {
      rating: 0,
      text: 'ej',
    },
    edit: false,
  },
  isLoading: false,
  setFeedback: () => {},
  deleteFeedback: () => {},
  addFeedback: () => {},
  editFeedback: () => {},
  updateFeedbackItem: () => {},
  setFeedbackEdit: () => initialState.feedbackEdit,
};

const FeedbackContext = createContext<State>(initialState);

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(initialState.feedback);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {
      rating: 0,
      text: 'ej',
    },
    edit: false,
  });
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };
  const deleteFeedback = async (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`http://localhost:5000/feedback/${id}`, {
        method: 'DELETE',
      });
      setFeedback(feedback.filter((f) => f.id !== id));
    }
  };
  const addFeedback = async (feedbackItem: FeedbackItemType) => {
    const response = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackItem),
    });
    console.log('response...', response);
    const data = await response.json();
    setFeedbackEdit({ ...feedbackEdit, edit: false });
    setFeedback([...feedback, data]);
  };
  const editFeedback = (item: FeedbackItemType) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  const updateFeedbackItem = async (id: string, updItem: FeedbackItemType) => {
    const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });
    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        setFeedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedbackItem,
        setFeedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
