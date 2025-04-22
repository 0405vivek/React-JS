const Events = () => {
  const [Count, setCount] = useState(0);

  const Incrimant = () => {
    setCount(Count + 1);
  };

  const Decrement = () => {
    if (Count > 0) {
      setCount(Count - 1);
    } else {
      alert("Your Count is 0....... ");
    }
  };

  const Reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>Count : {Count}</h1>
      <button onClick={Decrement}>Decremnat</button>
      <button className="reset" onClick={Reset}>
        Reset
      </button>
      <button onClick={Incrimant}>Incrimant</button>
    </div>
  );
};

export default Events;
