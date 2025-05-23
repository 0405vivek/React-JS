import { useCallback, useState } from "react";
import Button from "./Button";

const Count = () => {
  const [count, setCount] = useState(0);

  const handleInc = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleDec = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  return (
    <>
      <h1>Count: {count}</h1>
      <Button name="Increment" handleClick={handleInc} />
      <Button name="Decrement" handleClick={handleDec} />
    </>
  );
};

export default Count;
