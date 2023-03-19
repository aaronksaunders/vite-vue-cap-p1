// firebase imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  getDoc,
  collection,
  query,
  getDocs,
  serverTimestamp,
  connectFirestoreEmulator,
  orderBy,
  doc,
  where,
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
import {
  getDownloadURL,
  getStorage,
  ref as fbStorageRef,
  uploadBytes,
  connectStorageEmulator,
} from "firebase/storage";
import { ref } from "vue";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// connect the application to the emulator
if (location.hostname === "localhost" || location.hostname === "192.168.1.56") {

  // Point to the Storage emulator running on localhost.
  connectFirestoreEmulator(db, "localhost", 8080);

  // auth emulator
  connectAuthEmulator(getAuth(), "http://localhost:9099");

  // Point to the Storage emulator running on localhost.
  connectStorageEmulator(storage, "localhost", 9199);
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
export const getAllSomeDocs = async (userId?: string) => {
  try {
    let queryResponse = null;
    if (userId) {
      queryResponse = await getDocs(
        query(
          collection(db, "someDocs"),
          orderBy("created_at", "desc"),
          where("owner.id", "==", userId)
        )
      );
    } else {
      queryResponse = await getDocs(
        query(collection(db, "someDocs"), orderBy("created_at", "desc"))
      );
    }

    const cleanArray = queryResponse.docs.map((d) => {
      return {
        ...d.data(),
        created_at: d.data().created_at.toDate(),
        id: d.id,
      };
    });
    return { data: cleanArray };
  } catch (error) {
    return { error };
  }
};

export const saveSomeDoc = async (data: any) => {
  // Save a document with the name of the image and its URL in Firestore
  const currentUser = getAuth().currentUser;
  const newImageDocRef = await addDoc(collection(db, "someDocs"), {
    ...data,
    created_at: serverTimestamp(),
    owner: {
      id: currentUser?.uid,
      name: currentUser?.displayName || currentUser?.email,
    },
  });

  if (newImageDocRef?.id) {
    const newDoc = await getDoc(newImageDocRef);
    return {
      data: { ...newDoc.data(), id: newDoc.id },
    };
  } else {
    return { error: new Error("document not created") };
  }
};

export const getSomeDocById = async (id: string) => {
  try {
    const response = await getDoc(doc(collection(db, "someDocs"), id));
    if (!response.exists()) throw Error("Document Not Found");

    return { data: { ...response.data(), id: response.id } };
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
  return await signOut(getAuth());
};

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

///
/// STORAGE
// Function to upload image and save document in Firestore
export const uploadImageAndSaveDocument = async (file: File) => {
  try {
    // Create a reference to the image file in Firebase Storage
    const storageRef = fbStorageRef(storage, file.name.replaceAll(",", "."));

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    // Save a document with the name of the image and its URL in Firestore
    const imagesCollectionRef = collection(db, "images");
    const newImageDocRef = await addDoc(imagesCollectionRef, {
      name: file.name,
      url: downloadURL,
    });
    console.log("New image document ID: ", newImageDocRef.id);

    // Alternatively, if you want to save the document with a custom ID:
    // const newImageDocRef = doc(imagesCollectionRef, customId);
    // await setDoc(newImageDocRef, { name: file.name, url: downloadURL });

    return { data: { name: file.name, url: downloadURL } };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
