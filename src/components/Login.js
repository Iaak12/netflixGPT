import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';

const Login = () => {


    const[errorMessage, setErrorMessage] = useState(null);
    const[isSignInForm, setIsSignInForm] = useState(true);

    const email = useRef(null);
    const password = useRef(null);


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //validate the form data
        
        // console.log(email.current.value);
        // console.log(password.current.value);
        
        
      const message =  checkValidData(email.current.value, password.current.value);
      setErrorMessage(message);
      
    }


  return (


    <div>
        <Header/>
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg' alt='backgroundimg'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80' >
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {
                !isSignInForm && (
                    <input type='name' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
                )
            }
            <input ref={email} type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
            <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
            <p className='text-red-700 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered Sign In now.."}</p>
        </form>
        </div>
  )
}

export default Login