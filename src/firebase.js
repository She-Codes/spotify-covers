import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCIoTqVGjth3Y8a5a2oBto_MJ0yol7ATqE",
  authDomain: "spotify-covers.firebaseapp.com",
  projectId: "spotify-covers",
  storageBucket: "spotify-covers.appspot.com",
  messagingSenderId: "890021918075",
  appId: "1:890021918075:web:0c7f75bc18ec80e61db9de"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()