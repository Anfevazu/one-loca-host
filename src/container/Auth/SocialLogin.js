import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Button } from 'antd';
import { TwitterOutlined, FacebookFilled, GoogleOutlined} from '@ant-design/icons';
import { AuthContext } from 'context/AuthProvider';
import firebase, {googleAuthProvider, twitterAuthProvider, facebookAuthProvider, firestore} from '../../firebaseConfig'


const SocialLogin = () => {
  const { signIn, loggedIn } = useContext(AuthContext);
  const [state, setState] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    google: false,

  });
  let dataUser =  {}
  // Auth Facebook
  const saveNewUserFacebook = async (infoUser)  => {
    let userInfo = {
      name: infoUser.additionalUserInfo.profile.name,
      last_name : infoUser.additionalUserInfo.profile.last_name,
      email: infoUser.additionalUserInfo.profile.email,
      id: infoUser.user.uid,
      picture: infoUser.additionalUserInfo?.profile?.picture?.data.url
    }
    dataUser = userInfo
    await firestore.collection("guest").doc(userInfo.id).set(userInfo)
  }
  const handleSocialAuthFacebook = async (key, provider) => {
    setState({
      ...state,
      [key]: true,
    });
    await firebase.auth().signInWithPopup(provider)
    .then(async result =>{
        if(result.additionalUserInfo.isNewUser){
          await saveNewUserFacebook(result)
        }else{
          await handlerExistingUser(result)
        }
        setState({
          ...state,
          [key]: false,
        });
        signIn(dataUser)
    })
    .catch(error => {
      console.log(error)
    })
  };
  // Auth Twitter
  const saveNewUserTwitter = async (infoUser)  => {
    let userInfo = {
      name: infoUser.additionalUserInfo.profile.name.split(" ")[0],
      last_name : infoUser.additionalUserInfo.profile.name.split(" ")[1],
      email: infoUser.additionalUserInfo.profile.email,
      id: infoUser.user.uid,
      picture: infoUser.additionalUserInfo?.profile?.profile_image_url_https
    }
    dataUser = userInfo
    await firestore.collection("guest").doc(userInfo.id).set(userInfo)
  }
  const handleSocialAuthTwitter = async (key, provider) => {
    setState({
      ...state,
      [key]: true,
    });
    await firebase.auth().signInWithPopup(provider)
    .then(async result =>{
        if(result.additionalUserInfo.isNewUser){
          await saveNewUserTwitter(result)
        }else{
          await handlerExistingUser(result)
        }
        setState({
          ...state,
          [key]: false,
        });
        signIn(dataUser)
    })
    .catch(error => {
      console.log(error)
    })
  };
  // Auth Google
  const saveNewUserGoogle = async (infoUser)  => {
    let userInfo = {
      name: infoUser.additionalUserInfo.profile.family_name,
      last_name : infoUser.additionalUserInfo.profile.given_name,
      email: infoUser.additionalUserInfo.profile.email,
      id: infoUser.user.uid,
      picture: infoUser.additionalUserInfo?.profile?.picture
    }
    dataUser = userInfo
    await firestore.collection("guest").doc(userInfo.id).set(userInfo)
  }
  const handleSocialAuthGoogle = async (key, provider) => {
    setState({
      ...state,
      [key]: true,
    });
    await firebase.auth().signInWithPopup(provider)
    .then(async result =>{
        if(result.additionalUserInfo.isNewUser){
          await saveNewUserGoogle(result)
        }else{
          await handlerExistingUser(result)
        }
        setState({
          ...state,
          [key]: false,
        });
        signIn(dataUser)
    })
    .catch(error => {
      console.log(error)
    })
  };

  const handlerExistingUser = async (infoUser) => {
    await firestore.collection("guest").doc(infoUser.user.uid).get()
    .then(async snap  => {
      dataUser =  snap.data()
    })
    .catch(error => {
      console.log(error)
    })
  }

  if (loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div>
      <Row gutter={10}>
          <Button
            loading={state.facebook}
            className="facebook-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuthFacebook('facebook', facebookAuthProvider)}
            icon={<FacebookFilled />}>
            Facebook
          </Button>
      </Row>
      <Row gutter={16}>
          <Button
            loading={state.twitter}
            className="twitter-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuthTwitter('twitter', twitterAuthProvider)}
            icon={<TwitterOutlined />}>
            Twitter
          </Button>
      </Row>
      <Row gutter={16} style={{ marginBottom: '37px' }}>
        <Button
            loading={state.google}
            className="google-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuthGoogle('google', googleAuthProvider)}
            icon={<GoogleOutlined />}
          >
            Google
          </Button>
      </Row>
    </div>
  );
};

export default SocialLogin;
