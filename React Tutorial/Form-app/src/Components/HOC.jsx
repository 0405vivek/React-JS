import LinearColor from "./Loder";

const HOCComp = (Component) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <LinearColor />;
    } else {
      return <Component {...props} />;
    }
  };
};

export default HOCComp;
