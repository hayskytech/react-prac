import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBVDHEGhWyTSlInM1j8amla1EPq8356BX4",
  authDomain: "muslimawaaz-432c1.firebaseapp.com",
  databaseURL: "https://muslimawaaz-432c1.firebaseio.com",
  projectId: "muslimawaaz-432c1",
  storageBucket: "muslimawaaz-432c1.appspot.com",
  messagingSenderId: "642204247107",
  appId: "1:642204247107:web:4a2bde5529880182fbe0f6",
  measurementId: "G-6T47JPB0TE"
};
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = async () => {
  return getToken(messaging, { vapidKey: 'BMflMpyzPEMAfBNGNtzMDS1AwXpKoqkPLIgAzYcAdWx_Um2gENxYVbBtttiO7K6WsPqGJKBLKbhEFNGwdB8PtcY' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });