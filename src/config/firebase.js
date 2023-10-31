
import firebase from"firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore" 
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAyIMATrxOX_NM43c8AdZPHO_04M3_jOmY",
  authDomain: "file-management-system-62d4a.firebaseapp.com",
  projectId: "file-management-system-62d4a",
  storageBucket: "file-management-system-62d4a.appspot.com",
  messagingSenderId: "996058249112",
  appId: "1:996058249112:web:437e775c6894133060dded"
};

// Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);

export default fire;