import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAfp5-10jqkjkLSfA7MgJJE3NCQ7wu0zmg",
    authDomain: "crm-pu.firebaseapp.com",
    databaseURL: "https://crm-pu.firebaseio.com",
    projectId: "crm-pu",
    storageBucket: "crm-pu.appspot.com",
    messagingSenderId: "860932799013",
    appId: "1:860932799013:web:cb516286b3a716b6a4ddcc",
    measurementId: "G-NQZSCEBQET"
};
let app = firebase.initializeApp(firebaseConfig);

export const onMessageListener = () =>
  new Promise((resolve) => {
    firebase.messaging.onMessage((payload) => {
        console.log('payload2', payload)
      resolve(payload);
    });
});

// const installations = app.installations();
// installations.getToken(/* forceRefresh= */ true);
// console.warn('123455', installations.getToken(/* forceRefresh= */ true))
export default firebase 