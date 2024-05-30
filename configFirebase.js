import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyC8SbOhtFYnAqxcRJr-g8oJrj7ZazHtlRQ",
  authDomain: "projeto-vagas-estacio.firebaseapp.com",
  projectId: "projeto-vagas-estacio",
  storageBucket: "projeto-vagas-estacio.appspot.com",
  messagingSenderId: "585574760175",
  appId: "1:585574760175:web:b5f0e0666b60ed9dec651a",
  measurementId: "G-EFLB4T5SGE"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();