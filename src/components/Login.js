import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm) {
      // SignUp Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: "https://occ-0-1492-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABStlS0MPUGcy6Ovyeia-3ddnnXNb2Lri4P4H4QCFuR_yaGs0umyqHUDOZcOBKF8MFUGHX07txAW70z7wq_S9AKGQ_MixrLQ.png?r=a4b"
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse")
          }).catch((error) => {
            setErrorMessage(errorMessage)
          });

          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage)
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        navigate("/browse")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage("User not found")
      });
    }
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img 
          src = "https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt = "background"
        />
      </div>
      <form 
        onSubmit = {(e) => e.preventDefault()}
        className = 'w-3/12 absolute bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
      >
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input ref = {name}  type = "text" placeholder="Full Name" className = "p-4 my-4 w-full bg-gray-700"/>}
        <input
          ref = {email} 
          type = "text" 
          placeholder="Email address" 
          className = "p-4 my-4 w-full bg-gray-700"
        />
        <input 
          ref = {password}
          type = "password" 
          placeholder="password" 
          className = "p-4 my-4 w-full bg-gray-700"
        />

        <p className='text-red-500 font-bold text-lg py-2'>
          {errorMessage}
        </p>

        <button className = "p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className = "py-4 cursor-pointer" onClick={toggleSignInForm}> 
          { isSignInForm ? "New to Netflix? Sign Up Now": "Already registered? Sign In now " }
        </p>
      </form>
    </div>
  )
}

export default Login
