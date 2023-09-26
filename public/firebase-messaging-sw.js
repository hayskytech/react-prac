importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});