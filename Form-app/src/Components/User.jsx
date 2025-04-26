import { useState, useEffect } from "react";
import "./style.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiArrowRight, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

const User = () => {
  const FormField = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
  };

  const [inputForm, setInputForm] = useState(FormField);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formTilt, setFormTilt] = useState({ x: 0, y: 0 });

  // Parallax tilt effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setFormTilt({
      x: (x - 0.5) * 10,
      y: (y - 0.5) * 10
    });
  };

  const handleMouseLeave = () => {
    setFormTilt({ x: 0, y: 0 });
  };

  const validateForm = () => {
    let errorList = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!inputForm.fname.trim()) {
      errorList.fnameError = "First name is required";
    }

    if (!inputForm.lname.trim()) {
      errorList.lnameError = "Last name is required";
    }

    if (!inputForm.email.trim()) {
      errorList.emailError = "Email is required";
    } else if (!emailRegex.test(inputForm.email)) {
      errorList.emailError = "Please enter a valid email";
    }

    if (!inputForm.password) {
      errorList.passError = "Password is required";
    } else if (inputForm.password.length < 6) {
      errorList.passError = "Password must be at least 6 characters";
    }

    if (!inputForm.mobile) {
      errorList.mobileError = "Mobile number is required";
    } else if (!/^\d{10}$/.test(inputForm.mobile)) {
      errorList.mobileError = "Please enter a valid 10-digit number";
    }

    if (!inputForm.gender) {
      errorList.genderError = "Gender selection is required";
    }

    setError(errorList);
    return Object.keys(errorList).length === 0;
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    
    if (error[`${name}Error`]) {
      setError({
        ...error,
        [`${name}Error`]: ""
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      setTimeout(() => {
        console.log("Form Submitted:", inputForm);
        setIsSubmitting(false);
        setIsSuccess(true);
        setInputForm(FormField);
        
        setTimeout(() => setIsSuccess(false), 3000);
      }, 1500);
    } else {
      setIsSubmitting(false);
      // Shake animation when validation fails
      document.querySelector(".form-card").classList.add("shake");
      setTimeout(() => {
        document.querySelector(".form-card").classList.remove("shake");
      }, 500);
    }
  };

  return (
    <div className="form-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div 
        className="form-card"
        animate={{
          rotateX: formTilt.y,
          rotateY: -formTilt.x,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <div className="form-header">
          <motion.h2 
            className="form-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Create Account
          </motion.h2>
          <motion.p 
            className="form-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join our community today
          </motion.p>
        </div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring" }}
            >
              <FiCheck className="success-icon" />
              <span>Registration successful! Welcome aboard!</span>
              <div className="confetti">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="confetti-piece" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-row">
            <motion.div 
              className={`form-group ${activeField === 'fname' ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="form-label">
                <FiUser className="input-icon" />
                <span>First Name</span>
              </label>
              <input
                type="text"
                name="fname"
                value={inputForm.fname}
                onChange={handleChanged}
                onFocus={() => setActiveField('fname')}
                onBlur={() => setActiveField(null)}
                className={`form-input ${error.fnameError ? 'input-error' : ''}`}
                placeholder=" "
              />
              <div className="input-highlight"></div>
              <AnimatePresence>
                {error.fnameError && (
                  <motion.div 
                    className="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FiX className="error-icon" /> {error.fnameError}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className={`form-group ${activeField === 'lname' ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="form-label">
                <FiUser className="input-icon" />
                <span>Last Name</span>
              </label>
              <input
                type="text"
                name="lname"
                value={inputForm.lname}
                onChange={handleChanged}
                onFocus={() => setActiveField('lname')}
                onBlur={() => setActiveField(null)}
                className={`form-input ${error.lnameError ? 'input-error' : ''}`}
                placeholder=" "
              />
              <div className="input-highlight"></div>
              <AnimatePresence>
                {error.lnameError && (
                  <motion.div 
                    className="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FiX className="error-icon" /> {error.lnameError}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div 
            className={`form-group ${activeField === 'email' ? 'active' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="form-label">
              <FiMail className="input-icon" />
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={inputForm.email}
              onChange={handleChanged}
              onFocus={() => setActiveField('email')}
              onBlur={() => setActiveField(null)}
              className={`form-input ${error.emailError ? 'input-error' : ''}`}
              placeholder=" "
            />
            <div className="input-highlight"></div>
            <AnimatePresence>
              {error.emailError && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FiX className="error-icon" /> {error.emailError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className={`form-group ${activeField === 'password' ? 'active' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="form-label">
              <FiLock className="input-icon" />
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputForm.password}
              onChange={handleChanged}
              onFocus={() => setActiveField('password')}
              onBlur={() => setActiveField(null)}
              className={`form-input ${error.passError ? 'input-error' : ''}`}
              placeholder=" "
            />
            <div className="input-highlight"></div>
            <AnimatePresence>
              {error.passError && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FiX className="error-icon" /> {error.passError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className={`form-group ${activeField === 'mobile' ? 'active' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="form-label">
              <FiPhone className="input-icon" />
              <span>Mobile No</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={inputForm.mobile}
              onChange={handleChanged}
              onFocus={() => setActiveField('mobile')}
              onBlur={() => setActiveField(null)}
              className={`form-input ${error.mobileError ? 'input-error' : ''}`}
              placeholder=" "
              maxLength="10"
            />
            <div className="input-highlight"></div>
            <AnimatePresence>
              {error.mobileError && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FiX className="error-icon" /> {error.mobileError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="form-group radio-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="form-label">Gender</label>
            <div className="radio-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={inputForm.gender === "Male"}
                  onChange={handleChanged}
                  className="radio-input"
                />
                <span className="radio-custom">
                  <span className="radio-inner"></span>
                </span>
                <span>Male</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={inputForm.gender === "Female"}
                  onChange={handleChanged}
                  className="radio-input"
                />
                <span className="radio-custom">
                  <span className="radio-inner"></span>
                </span>
                <span>Female</span>
              </label>
            </div>
            <AnimatePresence>
              {error.genderError && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FiX className="error-icon" /> {error.genderError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Register Now</span>
                <FiArrowRight className="arrow-icon" />
              </>
            )}
          </motion.button>
        </form>

        <motion.div 
          className="form-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Already have an account? <a href="#">Sign In</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default User;