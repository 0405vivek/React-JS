import { createContext } from "react";
import CompB from "./CompB";

export const userContext = createContext();

const CompA = () => {
  let user = {
    name: "John Peter",
    age: 25,
    email: "john@test.in",
  };
  return (
    <>
      <userContext.Provider value={user}>
        <h1> Comp A</h1>
        <CompB  />
      </userContext.Provider>
    </>
  );
};

export default CompA;