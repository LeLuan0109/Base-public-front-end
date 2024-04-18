
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCj4RBdashyNlWhzWoBuknH73DIGpRauxg",
    authDomain: "sls-project-5e7d6.firebaseapp.com",
    projectId: "sls-project-5e7d6",
    storageBucket: "sls-project-5e7d6.appspot.com",
    messagingSenderId: "192892038583",
    appId: "1:192892038583:web:fbb99ec3628550da88cc32",
    measurementId: "G-8PWC8BLD7H"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
