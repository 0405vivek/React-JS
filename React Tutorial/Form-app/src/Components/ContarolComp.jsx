
import { useState } from "react";

const ContarolComp = () => {

    const styleObj = {border: "1px dashed red", padding: "20px"}

    let [fname, setFname] = useState("");
    let [email, setEmail] = useState("");

    const handelFname =(e)=>{
        setFname(e.target.value)
    }
    const handelEmail =(e)=>{
        setEmail(e.target.value)
    }

    const handleSubmit =(e)=>{
        e.preventDefault();

        console.log("Form Submit..............");
        console.log("Fname ==>" , fname);
        console.log("Email ==>" , email);
        
        setFname = ""
        setEmail = ""
    }
    

  return (
    <>
      <h2>Control Form</h2>

      <form style={styleObj}  onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="fname" value={fname} onChange={handelFname} />
        <br />
        <br />
        <label >Email:</label>
        <input type="email" name="email" value={email} onChange={handelEmail} />
        <br />
        <br />
        <button >Submit</button>
      </form>
    </>
  );
};

export default ContarolComp;