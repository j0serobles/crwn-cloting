import firebase from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/auth'; 

const config = {
        apiKey: "AIzaSyCpfhbAr19TZFvJxizHwtK6M1es-pDLRkI",
        authDomain: "crwn-db-28ff3.firebaseapp.com",
        databaseURL: "https://crwn-db-28ff3.firebaseio.com",
        projectId: "crwn-db-28ff3",
        storageBucket: "crwn-db-28ff3.appspot.com",
        messagingSenderId: "837814003145",
        appId: "1:837814003145:web:f441c2d5daa933a9627418",
        measurementId: "G-93XF9226L8"
      };

      //Create the user profile in database for the authenticated user,  if it does not exist
      export const createUserProfileDocument = async ( userAuth, additionalData) => {
        if (!userAuth) return; 

       const userRef  = firestore.doc(`users/${userAuth.uid}`);
       const snapShot = await userRef.get();

       if (!snapShot.exists) {
         const { displayName, email } = userAuth; 
         const createdAt = new Date();
       
       try{
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         })
       }
       catch (error) {
         console.log('Error occurred creating user.', error.message); 
       }
       
      }


       return userRef;

      }

firebase.initializeApp(config);

export const auth      = firebase.auth(); 
export const firestore = firebase.firestore();
const  provider        = new firebase.auth.GoogleAuthProvider(); 

provider.setCustomParameters( { prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider); 
export default firebase;
