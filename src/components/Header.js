import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
       navigate("/error");
    });
    
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid: uid,email:email,displayName:displayName,photoURL:photoURL}));
          navigate("/browse");
        } else {
           dispatch(removeUser());
           navigate("/");
        }
      });
   
      return () => unsubscribe();

},[])

const handleGptSearchClick = () => {
  //Toggle GPT Search
  dispatch(toggleGptSearchView())
}

  return (
    <div className='absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img className='w-44' alt='logo' src={LOGO} />
      { user && (  <div className='flex p-3'>
          <button onClick={handleGptSearchClick} className='py-2 px-4 mx-4 my-2 rounded-lg bg-purple-800 text-white'>GPT Search</button>
          <img className='w-12 h-12' alt='usericon' src={user?.photoURL}/>
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>
)}
    </div>
  )
}

export default Header