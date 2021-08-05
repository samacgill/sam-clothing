import firebase from "firebase/app";
// import these separately as quite large
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBsOge-xY3cEx6HjD2L5KXlG3CfhGH-Ixg",
  authDomain: "sam-shopping-db.firebaseapp.com",
  projectId: "sam-shopping-db",
  storageBucket: "sam-shopping-db.appspot.com",
  messagingSenderId: "876316879215",
  appId: "1:876316879215:web:42082ee97c2a1889d3e09a",
  measurementId: "G-BPV82LR26Y",
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // let userRef = firestore.collection("users").doc("DmergPQKGGKj7Wo88cxc");
  // const userRef = firestore.doc("users/DmergPQKGGKj7Wo88cxc");
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // const collRef = firestore.collection("users");
  // console.log(collRef);

  // the documentRef methods are .set(), .get(), .update() and .delete()
  // can also add to collection using collectionRef object and .add() method
  //documentRef.get() returns a documentSnapshot object
  //collectionRef.get() returns a querySnapshot object

  const snapShot = await userRef.get();
  // console.log(snapShot);
  // getting userRef creates new 'exists' field, which is false if user not there. so we create.
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // function returns userRef, which we can use to set state
  return userRef;
};

//temporary utility function to populate firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  //firebase can only make one call at a time so need to batch documents
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    //gives new empty document with random id
    const newDocRef = collectionRef.doc();
    //fill with object
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};
//converting to an object rather than the array that comes back from Firestore
export const ConvertCollectionsSnapshotToMap = (collections) => {
  const transoformedCcollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  //transoforming from array into object with collection title as key
  return transoformedCcollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
