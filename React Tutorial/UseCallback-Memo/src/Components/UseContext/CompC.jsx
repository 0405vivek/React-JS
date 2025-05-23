import { useContext } from "react";
import { userContext } from "./CompA";
import CompD from "./CompD";

const CompC = () => {
    let user = useContext(userContext)

    return (
        <>
            <h1> Comp C</h1>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <CompD />
        </>
    )
};

export default CompC;