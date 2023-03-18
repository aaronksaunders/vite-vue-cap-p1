// firebase imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  getDocs,
  serverTimestamp,
  connectFirestoreEmulator,
  orderBy,
} from "firebase/firestore";
import {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ref } from "vue";

const firebaseApp = initializeApp({
  projectId: "testem2",
  apiKey: "AIzaSyArxK6Bm6vYycLvCsXXdpk7CCzHOLQ6PpM",
});

export const db = getFirestore(firebaseApp);

// connect the application to the emulator
if (location.hostname === "localhost") {
  // Point to the Storage emulator running on localhost.
  connectFirestoreEmulator(db, "localhost", 8080);

  // auth emulator
  connectAuthEmulator(getAuth(), "http://localhost:9099");
}

// (async () => {
//   try {
//     // added documents...
//     const resp1 = await addDoc(collection(db, "someDocs"), {
//       name: "This is a new document in cleared database",
//       created_at: serverTimestamp(),
//     });
//     console.log("addDoc resp", resp1);

//     // retrieving documents...
//     const resp2 = await getDocs(
//       query(collection(db, "someDocs"), orderBy("created_at", "desc"))
//     );

//     const cleanArray = resp2.docs.map((d) => {
//       return {
//         name: d.data().name,
//         created_at: d.data().created_at.toDate(),
//       };
//     });
//     console.log(cleanArray);
//   } catch (error) {
//     console.log("error", error);
//   }
// })();

/// DATA FUNCTIONS
/**
 * get all documents from someDocs collection
 */
export const getAllSomeDocs = async () => {
  try {

    const resp2 = await getDocs(
      query(collection(db, "someDocs"), orderBy("created_at", "desc"))
    );

    const cleanArray = resp2.docs.map((d) => {
      return {
        name: d.data().name,
        created_at: d.data().created_at.toDate(),
      };
    });
    return { data: cleanArray };
  } catch (error) {
    return { error };
  }
};

/// AUTH FUNCTIONS
export const currentUser = ref<User | null>(null);

export const initializeFirebase = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in
        currentUser.value = user;
      } else {
        // User is signed out
        currentUser.value = null;
      }

      resolve(currentUser.value);
    });
  });
};

/**
 * 
 * @returns 
 */
export const firebaseSignOut = async () => {
    return await signOut(getAuth())
}
 

/**
 * creates user in database and adds display name
 */
export const firebaseSignUp = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    await updateProfile(resp.user, {
      displayName: displayName,
    });

    return { data: resp.user };
  } catch (error) {
    return { error };
  }

  return null;
};

/**
 *
 * signs in the user
 *
 * @param email
 * @param password
 * @returns
 */
export const firebaseSignIn = async (email: string, password: string) => {
  try {
    const resp = await signInWithEmailAndPassword(getAuth(), email, password);

    return { data: resp.user };
  } catch (error) {
    return { error };
  }
};
