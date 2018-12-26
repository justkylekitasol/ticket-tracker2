import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAbGZSvE-d9u-fRWN6mllxa8zD3-ipcgrg",
  authDomain: "ticket-tracker-39440.firebaseapp.com",
  databaseURL: "https://ticket-tracker-39440.firebaseio.com",
  projectId: "ticket-tracker-39440",
  storageBucket: "ticket-tracker-39440.appspot.com",
  messagingSenderId: "419896913792"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;