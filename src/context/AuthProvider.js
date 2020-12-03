import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import  { firestore } from '../firebaseConfig'
export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(()=>{
    if(localStorage.getItem('user')){
      let us = JSON.parse(localStorage.getItem('user'))
      firestore.collection("guest").doc(us.id).get()
      .then(async snap  => {
        await localStorage.setItem("user", JSON.stringify(snap.data()))
        await setUser(snap.data());
        await setLoggedIn(true);
        })
      .catch(error => {
        console.log(error)
      })
    }else{
      setLoggedIn(false);
    }
  },[])

  const signIn = (params) => {
    localStorage.setItem("user", JSON.stringify(params))
    setUser(params);
    setLoggedIn(true);
    history.push(`/`);
  };

  const signUp = (params) => {
    setUser(params);
    setLoggedIn(true);
    history.push(`/`);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
