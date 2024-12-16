import { useState } from 'react';
import './App.css';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import Header from './components/Header';
import FeedbackData, { FeedbackItemType } from './data/FeedbackData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';

function App() {
  const [feedback, setFeedback] = useState<FeedbackItemType[]>(FeedbackData);

  const deleteFeedback = (id: number) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((f) => f.id !== id));
    }
  };

  const addFeedback = (feedbackItem: FeedbackItemType) => {
    setFeedback([...feedback, feedbackItem]);
  };

  return (
    <BrowserRouter>
      <Header text={'hello World'} />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          ></Route>
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </div>
      <AboutIconLink />
    </BrowserRouter>
  );
}

export default App;
