import firebase from 'firebase/app'
import 'firebase/auth'


// const app = firebase.initializeApp({
//     apiKey: process.env.FIREBASE_API_KEY ,
//     authDomain: process.env["FIREBASE_AUTH_DOMAIN "],
//     projectId: process.env["FIREBASE_PROJECT_ID "],
//     storageBucket: process.env["FIREBASE_STORAGE_BUCKET "],
//     messagingSenderId: process.env["FIREBASE_MESSAGING_SENDER_ID "],
//     appId: process.env["FIREBASE_APP_ID "]
// })

const app = firebase.initializeApp({
    apiKey: "AIzaSyBfpOjj-qiDj0bBchciobeVJ_YQrD7SvLM",
    authDomain: "react-example-10ad3.firebaseapp.com",
    projectId: "react-example-10ad3",
    storageBucket: "react-example-10ad3.appspot.com",
    messagingSenderId: "609191692591",
    appId: "1:609191692591:web:ba1c17b3c94c44593079da"
})

export const auth = app.auth()

export default app