import { memo } from "react";

const Button = memo(({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  );
});

export default Button;
