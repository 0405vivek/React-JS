import { useRef } from "react";
const RefHooks = ()=>{

const InputRef = useRef()
const InputRef1 = useRef()

const handelClick = ()=>{
    console.log(InputRef.current.value)
}
    return(
        <>
            <h2>Recat Js</h2>
            <input type="text" ref={InputRef}/>
            <button onClick={handelClick}>Submit</button>
        </>
    )
}

export default RefHooks