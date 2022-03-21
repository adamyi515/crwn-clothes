import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {
    getFirestore, doc, getDoc, setDoc,
    collection, writeBatch
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK3mWmYOZ-byQNKS0pwtesXxzdkw-tLMQ",
    authDomain: "crwn-clothing-db-40e7c.firebaseapp.com",
    projectId: "crwn-clothing-db-40e7c",
    storageBucket: "crwn-clothing-db-40e7c.appspot.com",
    messagingSenderId: "807010972324",
    appId: "1:807010972324:web:fdb769e45dc849725fac31"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Setup Google Authentication and how it functions. //////////////////////////////////////
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});


export const auth = getAuth(); // This auth is being tracked within your application IMPORTANT!
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Setting up Firestore database. //////////////////////////////////////
export const db = getFirestore();

/////// Firestore DB methods. (CRUD)
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) return;
    // Check whether there is an actual doc reference in the collection.
    const userDocRef = doc(db, 'users', userAuth.uid); // This defines the SHAPE of an user object document. Does not make any request to firestore DB yet.

    const userSnapshot = await getDoc(userDocRef); // Makes some kind of query to the firestore DB and returns some meta data.

    // If user data DOES NOT exists
    if(!userSnapshot.exists()){
        // create new user data in firestore
        const { displayName, email } = userAuth; // Get the logged in user data (this is from google authenticated data)
        const createdAt = new Date();
        try {
            // Create the Document inside the users collection (user collection info is defined in the userDocRef since its a meta data)
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInfo
            });
        } catch(err){
            console.log(err.message);
        }
    }

    // Check if user data exists
        // return userDocRef
    return userDocRef;
    
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = callback => {
    onAuthStateChanged(auth, callback);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Uploading data into firestore (Products such as Hats, Sneakers, Jeans, Mens, Women)
 - In this section, we're using the "collection" and "writeBatch" methods from the firebase/firestore.
    + This is used to create the collection and then populating the data into the collection in our firestore.
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This method is to import the data into our firestore. The arguments we passed into this method is:
// addCollectionAndDocuments('categories', objectsToAdd); => categories was created as a collection, and each document uses the title of each object.
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collecitonRef = collection(db, collectionKey); // Kind of similar to docRef (this defines the shape of the collection);
    const batch = writeBatch(db);

    // objectsToAdd is an array of objects.
    objectsToAdd.forEach((object) => {
        const docRef = doc(collecitonRef, object.title.toLowerCase()); // Inside the 'categories' collection, create a document. Each document will have
        // title as the document ID. Inside each document, we store the id, imageUrl, name and price.
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('Done');

}