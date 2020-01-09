import React, { useContext } from 'react'
import App from 'next/app'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'node-fetch';
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

const authLink = setContext((_, {headers, ...context}) => {
  const token = localStorage.getItem('auth:token');
  return {
    headers: {
      ...headers,
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
    ...context,
  };
});

const httpLink = createHttpLink({
  fetch: fetch,
  uri: 'https://us-central1-journalcrm.cloudfunctions.net/services/graphql'
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  dataIdFromObject: o => o.id,
  cache: new InMemoryCache(),
});

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
      <ApolloProvider client={client}>      
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
            <Layout>
              <button onClick={signInWithGoogle}>Sign in with google</button>
            </Layout>
          </>
        }
      </ApolloProvider>
      );
  }
}

const firebaseAppAuth = firebaseApp.auth();
firebaseAppAuth.onAuthStateChanged(async (user) => {
  if (user) {
      const idToken = await user.getIdTokenResult();
      console.log("User signed in: ", idToken.token);
      localStorage.setItem("auth:token", idToken.token)
  }
});

/** See the signature above to find out the available providers */
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(JournalApp);
