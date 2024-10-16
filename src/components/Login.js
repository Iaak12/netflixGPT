import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {


    const[errorMessage, setErrorMessage] = useState(null);
    const[isSignInForm, setIsSignInForm] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const  name = useRef(null);
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

      if(message) return;

      //Sign In or Sign Up 
      if(!isSignInForm){

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/v2/D5603AQHQLMO3HXq5mg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725811168311?e=1734566400&v=beta&t=KYn69WfUb9Cz6a1menGjQdLnv3S8dFQAmAdVhOvlygI"
      }).then(() => {
        const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({uid: uid,email:email,displayName:displayName,photoURL:photoURL}));
        
       navigate("/browse");

      }).catch((error) => {
        setErrorMessage(error.message);
      });
      })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
       setErrorMessage(errorCode+"-"+ errorMessage);
      });
      }

      else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
         // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate("/browse");
            })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage);
              });
          }
      
            };


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
                    <input ref={name} type='name' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
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