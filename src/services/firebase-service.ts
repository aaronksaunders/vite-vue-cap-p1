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
  QueryConstraint,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
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

//
// MESSAGES & CONVERSATIONS
interface ConversationInput {
  createdAt: any; //firebase.firestore.Timestamp;
  productId: string;
  sellerId: string;
  buyerId: string;
}

interface Message {
  id?: string;
  text: string;
  createdAt: any; //firebase.firestore.Timestamp;
  senderId: string;
}

interface NewMessage {
  text: string;
  senderId: string;
  createdAt: any; //firebase.firestore.Timestamp;
}

interface Conversation {
  id?: string;
  createdAt: any;
  productId: string;
  sellerId: string;
  buyerId: string;
  messages: Message[];
  sellerMeta?: any;
  buyerMeta?: any;
  productMeta?: any;
}
//
export const currentConversations = ref<Conversation[] | null>(null);
/**
 *
 * @param productId
 * @param sellerId
 * @param messageText
 * @returns
 */
export const initiateConversation = async (
  productId: string,
  sellerId: string,
  //buyerId: string,
  messageText: string
) => {
  try {
    const buyerId = currentUser.value?.uid as string;

    // create conversation
    const conversation: ConversationInput = {
      createdAt: serverTimestamp(),
      productId,
      sellerId,
      buyerId,
    };

    let conversationDocSnap = (
      await getDocs(
        query(
          collection(db, "conversations"),
          where("productId", "==", productId)
        )
      )
    )?.docs[0];
    let conversationRef = conversationDocSnap?.ref;

    // if the conversation hasn't been started, then start it
    if (!conversationDocSnap.exists()) {
      conversationRef = await addDoc(
        collection(db, "conversations"),
        conversation
      );
    }

    const message: NewMessage = {
      text: "Hi, I am interested in your product. " + messageText,
      senderId: buyerId as string,
      createdAt: serverTimestamp(),
    };

    const messageRef = await addDoc(
      collection(conversationRef, "messages"),
      message
    );

    const updatedConversation = await getDoc(conversationRef);

    return {
      data: { id: conversationRef, data: updatedConversation.data() },
    };
  } catch (error) {
    return { error };
  }
};
// HELPER

// function to get conversations for a user
export const getUserConversations = async (): Promise<Conversation[]> => {
  const userId = currentUser.value?.uid as string;

  // const q = query(
  //   collection(db, "conversations"),
  //   (where("buyerId", "==", userId) as any).orWhere("sellerId", "==", userId)
  // ) as any;

  const buyerQuery: QueryConstraint = where(
    "buyerId",
    "==",
    currentUser.value?.uid as string
  );
  const sellerQuery: QueryConstraint = where(
    "sellerId",
    "==",
    currentUser.value?.uid as string
  );

  // const q = compoundQuery(collection(db, 'messages'), [buyerQuery, sellerQuery], 'or');

  const querySnapshotBuyers = await getDocs(
    query(collection(db, "conversations"), buyerQuery)
  );
  const querySnapshotSellers = await getDocs(
    query(collection(db, "conversations"), sellerQuery)
  );

  const a1 = await processConversationSnapshot(querySnapshotBuyers) || [];

  const a2 = await processConversationSnapshot(querySnapshotSellers) || [];

  currentConversations.value = (a1 as []).concat(a2 as []);
  return currentConversations.value as Conversation[];
};

export const getConversationById = (conversationId: string) => {
  return currentConversations.value?.find((c) => c.id === conversationId);
};

const processConversationSnapshot = async (
  querySnapshot: QuerySnapshot<DocumentData>
) => {
  const conversations: Conversation[] = [];

  if (!querySnapshot.empty) {
    return new Promise((resolve) => {
      querySnapshot.forEach(
        async (conv_doc: QueryDocumentSnapshot<DocumentData>) => {
          // get conversation information
          const conversationData = {
            ...conv_doc.data(),
            id: conv_doc.id,
          } as Conversation;

          // get conversation data, expanded
          const [sellerDoc, buyerDoc, productDoc] = await Promise.all([
            getDoc(doc(db, "users", conversationData.sellerId)),
            getDoc(doc(db, "users", conversationData.buyerId)),
            getDoc(doc(db, "someDocs", conversationData.productId)),
          ]);

          // get messages from the collection
          const querySnapshot = await getDocs(
            query(
              collection(conv_doc.ref, "messages"),
              orderBy("createdAt", "desc")
            )
          );

          const messages: { createdAt: any; id: string }[] = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toDate(),
            });
          });

          conversations.push({
            ...conversationData,
            sellerMeta: sellerDoc.data(),
            buyerMeta: buyerDoc.data(),
            productMeta: productDoc.data(),
            createdAt: conversationData.createdAt.toDate(),
            productId: conversationData.productId,
            sellerId: conversationData.sellerId,
            buyerId: conversationData.buyerId,
            messages: messages as any,
          });

          resolve(conversations);
        }
      );
    });
  } else {
    Promise.resolve(conversations);
  }
};
