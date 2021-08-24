// importScripts("https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.5.2/firebase-messaging.js");
// const firebaseConfig = {
//      apiKey: "AIzaSyAfp5-10jqkjkLSfA7MgJJE3NCQ7wu0zmg",
//      authDomain: "crm-pu.firebaseapp.com",
//      databaseURL: "https://crm-pu.firebaseio.com",
//      projectId: "https://crm-pu.firebaseio.com",
//      storageBucket: "crm-pu.appspot.com",
//      messagingSenderId: "860932799013",
//      appId: "1:860932799013:web:cb516286b3a716b6a4ddcc",
// };
// let app = firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function(payload) {
//      const promiseChain = clients
//           .matchAll({
//                type: "window",
//                includeUncontrolled: true,
//           })
//           .then((windowClients) => {
//                for (let i = 0; i < windowClients.length; i++) {
//                     const windowClient = windowClients[i];
//                     windowClient.postMessage(payload);
//                }
//           })
//           .then(() => {
//                return registration.showNotification("my notification title");
//           });
//      return promiseChain;
// });
// self.addEventListener("notificationclick", function(event) {
//      // console.log(event);
// });


importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      // console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      // console.log('Service worker registration failed, error:', err);
    });
}

firebase.initializeApp({
  apiKey: "AIzaSyAfp5-10jqkjkLSfA7MgJJE3NCQ7wu0zmg",
    authDomain: "crm-pu.firebaseapp.com",
    databaseURL: "https://crm-pu.firebaseio.com",
    projectId: "crm-pu",
    storageBucket: "crm-pu.appspot.com",
    messagingSenderId: "860932799013",
    appId: "1:860932799013:web:cb516286b3a716b6a4ddcc",
    measurementId: "G-NQZSCEBQET"
})

this.addEventListener('notificationclick', function(event) {
  let data = event.notification.data.FCM_MSG.data
  let url = data.ReminderID ? `${data.url}/${data.ReminderID}` : data.url;
  // console.log(url)
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});

const initMessaging = firebase.messaging()