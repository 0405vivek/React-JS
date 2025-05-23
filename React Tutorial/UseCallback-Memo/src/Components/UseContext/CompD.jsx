import { useContext } from "react";
import { userContext } from "./CompA";


const CompD = () => {

    let user = useContext(userContext);
    return (
        <>
            <h1> Comp D</h1>
            <p>{user.age}</p>
        </>
    )
};

export default CompD;