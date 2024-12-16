import React, { useContext, useEffect, useState } from 'react';
import FeedbackContext from '../context/FeedbackContext';

interface RatingSelectProps {
  select: (rating: number) => void;
}

const RatingSelect = ({ select }: RatingSelectProps) => {
  const { feedbackEdit } = useContext(FeedbackContext);
  const [selected, setSelected] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.currentTarget.value; // Obtén directamente el valor del evento
    setSelected(newValue); // Actualiza el estado
    select(newValue);
  };

  useEffect(() => {
    setSelected(feedbackEdit.item.rating);
  }, [feedbackEdit]);

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ul className='rating'>
      {nums.map((num) => {
        return (
          <li key={num}>
            <input
              type='radio'
              id={`num${num}`}
              name='rating'
              value={num}
              onChange={handleChange}
              checked={selected === num}
            />
            <label htmlFor={`num${num}`}>{num}</label>
          </li>
        );
      })}
    </ul>
  );
};

export default RatingSelect;
