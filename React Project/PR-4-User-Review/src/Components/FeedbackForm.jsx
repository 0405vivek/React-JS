import React, { useState } from "react";
import InputText from "./InputText";
import "./feedback.css"

const FeedbackForm = () => {
  const inputField = {
    username: "",
    email: "",
    message: "",
    rating: 0,
  };

  const [inputForm, setInputForm] = useState(inputField);
  const [errors, setErrors] = useState({});
  const [feedbackList, setFeedbackList] = useState([]); 

  const handleChanged = (field, value) => {
    setInputForm({
      ...inputForm,
      [field]: value,
    });
  };

  const validate = () => {
    let errorList = {};

    if (inputForm.username.trim() === "") {
      errorList.username = " Please enter your name to continue!";
    }
    if (inputForm.email.trim() === "") {
      errorList.email = " We need your email to stay in touch!";
    }
    if (inputForm.message.trim() === "") {
      errorList.message = " Your feedback is valuable - please share your thoughts!";
    }
    if (inputForm.rating === 0) {
      errorList.rating = " Please rate your experience (click 1-5 stars)!";
    }

    setErrors(errorList);
    return Object.keys(errorList).length === 0;
  };

  const handleRatingChange = (rating) => {
    setInputForm({ ...inputForm, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted Feedback:", inputForm);
      setFeedbackList([...feedbackList, inputForm]); 
      setInputForm(inputField); 
      setErrors({});
    }
  };

  return (
    <>
      <h1>WE VALUE YOUR FEEDBACK!</h1>
      <form onSubmit={handleSubmit}>
        <InputText
          label="User Name"
          type="text"
          name="username"
          value={inputForm.username}
          onChange={(e) => handleChanged("username", e.target.value)}
          error={errors.username}
        />
        <InputText
          label="Email"
          type="email"
          name="email"
          value={inputForm.email}
          onChange={(e) => handleChanged("email", e.target.value)}
          error={errors.email}
        />
        <InputText
          label="How can we improve our service?"
          name="message"
          isTextArea
          rows={4}
          value={inputForm.message}
          onChange={(e) => handleChanged("message", e.target.value)}
          error={errors.message}
        />

        <div className="rating-group">
          <label>Your Rating:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`star ${inputForm.rating >= star ? "selected" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
          {errors.rating && <div className="error">{errors.rating}</div>}
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      {/* Display Feedback Cards */}
      <h2>Submitted Feedbacks</h2>
      <div className="feedback-cards">
        {feedbackList.map((feedback, index) => (
          <div className="feedback-card" key={index}>
            <h3>{feedback.username}</h3>
            <p>
              <strong>Email:</strong> {feedback.email}
            </p>
            <p>
              <strong>Message:</strong> {feedback.message}
            </p>
            <p>
              <strong>Rating:</strong>
              <span className="gold-stars">{"★".repeat(feedback.rating)}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeedbackForm;
