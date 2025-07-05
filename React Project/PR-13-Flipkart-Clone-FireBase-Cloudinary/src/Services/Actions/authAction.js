import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../Server/firebasedb";

// Action Types
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";

// Action Creators
const signInSuccess = (user) => {
  const userData = { email: user.email, uid: user.uid };
  localStorage.setItem("authUser", JSON.stringify(userData)); // ✅ Save to localStorage
  return {
    type: SIGN_IN_SUCCESS,
    payload: userData,
  };
};

const signOutSuccess = () => {
  localStorage.removeItem("authUser"); // ✅ Remove from localStorage
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

const signInFail = (error) => ({
  type: SIGN_IN_FAIL,
  payload: error,
});

// Email/Password Sign In
export const signINAsync = ({ email, password }) => async (dispatch) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    dispatch(signInSuccess(result.user));
  } catch (err) {
    dispatch(signInFail(err.message));
  }
};

// Email/Password Sign Up
export const signUpAsync = ({ email, password }) => async (dispatch) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(signInSuccess(result.user));
  } catch (err) {
    dispatch(signInFail(err.message));
  }
};

// Google Sign In
export const googleSignInAsync = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    dispatch(signInSuccess(result.user));
  } catch (err) {
    dispatch(signInFail(err.message));
  }
};

// Sign Out
export const signOutAsync = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(signOutSuccess());
  } catch (err) {
    dispatch(signInFail(err.message));
  }
};

// Firebase Auth State Listener (used on refresh)
export const checkAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signInSuccess(user));
    } else {
      dispatch(signOutSuccess());
    }
  });
};
