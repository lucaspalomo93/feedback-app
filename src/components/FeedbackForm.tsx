import React, { useContext, useState } from 'react';
import Button from './Button';
import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  const { addFeedback } = useContext(FeedbackContext);
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(10);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (text === '') {
      setBtnDisabled(true);
      setMessage('');
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('Text must be at least 10 characters');
    } else {
      setMessage('');
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      addFeedback(newFeedback);
      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating: number) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button isDisabled={btnDisabled} version='primary' type='submit'>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
