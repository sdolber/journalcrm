import React, { useContext } from 'react'
import App from 'next/app'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import Layout from '../components/Layout';
import {AuthContext, AuthProvider} from '../hooks/AuthContext';

let firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
else {
  firebaseApp = firebase.apps[0];
}

class JournalApp extends App {
  render() {

    const {signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      signInAnonymously,
      signOut,
      setError,
      user,
      error} = this.props;


    const { Component, pageProps } = this.props

    return (
      <>      
        {
          user ?
          <>
            <AuthContext.Provider value={user}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthContext.Provider>
          </>
          :
          <>
            <button onClick={signInWithGoogle}>Sign in with google</button>
          </>
        }
      </>
      );
  }
}

const firebaseAppAuth = firebaseApp.auth();

/** See the signature above to find out the available providers */
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(JournalApp);
