import { useState } from "react";
// import HOCComp from "./HOC";



const Validation = () => {
  // Initial form state
  const FormFild = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
  };

  // Corrected typo: setInputFrom → setInputForm
  const [inputForm, setInputForm] = useState(FormFild);

  // Moved useState for errors to top-level of component (hooks can't be inside functions)
  const [error, setError] = useState({});

  // Renamed this from Validation to avoid conflict with component name
  const validateForm = () => {
    let errorList = {};

    if (inputForm.fname === "") {
      errorList.fnameError = "Firstname is Required";
    }

    if (inputForm.lname === "") {
      errorList.lnameError = "Lastname is Required";
    }

    if (inputForm.email === "") {
      errorList.emailError = "Email is Required";
    }

    if (inputForm.password === "") {
      errorList.passError = "Password is Required";
    } else if (inputForm.password.length < 6) {
      // Fixed typo: minimum length is 6, not 5
      errorList.passError = "Password length is minimum 6 characters.";
    }

    if (inputForm.mobile === "") {
      errorList.mobileError = "Mobile is Required";
    } else if (inputForm.mobile.length !== 10) {
      errorList.mobileError = "Mobile Number is Not Valid";
    }

    if (inputForm.gender === "") {
      errorList.genderError = "Gender is Required";
    }

    setError(errorList);

    // If there are errors, return false
    return Object.keys(errorList).length === 0;
  };

  // Handles form field changes
  const handleChanged = (e) => {
    const { name, value } = e.target;

    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submit...", inputForm);
      setInputForm(FormFild); // Reset form after successful submission
    }
  };

  return (
    <>
      <h2>User Form Validation</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="fname"
          value={inputForm.fname}
          onChange={handleChanged}
        />
        {error.fnameError && <div>{error.fnameError}</div>}
        <br />

        <label>Last Name:</label>
        <input
          type="text"
          name="lname"
          value={inputForm.lname}
          onChange={handleChanged}
        />
        {error.lnameError && <div>{error.lnameError}</div>}
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={inputForm.email}
          onChange={handleChanged}
        />
        {error.emailError && <div>{error.emailError}</div>}
        <br />

        <label>Password:</label>
        <input
          type="password" // Changed from "text" to "password" for security
          name="password"
          value={inputForm.password}
          onChange={handleChanged}
        />
        {error.passError && <div>{error.passError}</div>}
        <br />

        <label>Mobile No:</label>
        <input
          type="text"
          name="mobile"
          value={inputForm.mobile}
          onChange={handleChanged}
        />
        {error.mobileError && <div>{error.mobileError}</div>}
        <br />

        <label>Gender:</label>
        {/* Fixed typo: "redio" to "radio", added values for Male/Female */}
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={inputForm.gender === "Male"}
          onChange={handleChanged}
        /> Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={inputForm.gender === "Female"}
          onChange={handleChanged}
        /> Female
        {error.genderError && <div>{error.genderError}</div>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Validation;
