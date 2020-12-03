import firebase from 'firebase/app';
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
     apiKey: "AIzaSyAfp5-10jqkjkLSfA7MgJJE3NCQ7wu0zmg",
     authDomain: "crm-pu.firebaseapp.com",
     databaseURL: "https://crm-pu.firebaseio.com",
     projectId: "https://crm-pu.firebaseio.com",
     storageBucket: "crm-pu.appspot.com",
     messagingSenderId: "860932799013",
     appId: "1:860932799013:web:cb516286b3a716b6a4ddcc",
});
const messaging = initializedFirebaseApp.messaging();

export { messaging, firebase};