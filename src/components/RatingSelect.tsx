import React, { useState } from "react";

interface RatingSelectProps {
  select: (rating: number) => void;
}

const RatingSelect = ({ select }: RatingSelectProps) => {
  const [selected, setSelected] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(+e.currentTarget.value);
    select(selected);
  };

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ul className="rating">
      {nums.map((num) => {
        return (
          <li>
            <input
              type="radio"
              id={`num${num}`}
              name="rating"
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
