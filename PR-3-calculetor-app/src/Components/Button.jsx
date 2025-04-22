

import { useState } from "react";
import './Button.css'; 

const Button = () => {
  const [list] = useState(['+', '-', '*', '/',,9,8,7,6,5,4,3,2,1,0,'.' ]);
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
    <>
    <header>
    <h1>Calculator APP</h1>
    </header>
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="button-grid">
      <button onClick={handleClear} className="clear-button">Clear</button>
        {list.map((item, index) => (
          <button onClick={() => handleClick(item)} key={index}>
            {item}
          </button>
        ))}
        <button className="eq-btn" onClick={handleEvaluate}>=</button>
      </div>
    </div>
    </>
  );
};

export default Button;
