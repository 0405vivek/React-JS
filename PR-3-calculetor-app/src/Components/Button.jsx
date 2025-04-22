

import { useState } from "react";
import './Button.css'; 

const Button = () => {
  const [list] = useState(['.',0,1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/']);
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEvaluate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="button-grid">
        {list.map((item, index) => (
          <button onClick={() => handleClick(item)} key={index}>
            {item}
          </button>
        ))}
        <button onClick={handleEvaluate}>=</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Button;
