import React, { useState } from 'react';

const Tickbox = ({ count, setItems, change}) => {
  const [tickedBoxes, setTickedBoxes] = useState([0]); // First box is ticked by default

  const handleTick = (index) => {
    const newTickedBoxes = [...tickedBoxes];

    if (newTickedBoxes.includes(index)) {
      // If box is already ticked, remove it from the array
      const tickedIndex = newTickedBoxes.indexOf(index);
      newTickedBoxes.splice(tickedIndex, 1);
    } else {
      // If box is not ticked, add it to the array
      newTickedBoxes.push(index);
    }

    setTickedBoxes(newTickedBoxes);
  };

  const handleSubmit = () => {
    change();
    setItems([...tickedBoxes]);
  };

  return (
    <div className="p-4">
    {[...Array(count)].map((_, index) => (
      <label key={index} className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={tickedBoxes.includes(index)}
          onChange={() => handleTick(index)}
          className="mr-2"
        />
        {`Data ${index + 1}`}
      </label>
    ))}
    <button
      onClick={handleSubmit}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Submit
    </button>
  </div>
  );
};

export default Tickbox;
