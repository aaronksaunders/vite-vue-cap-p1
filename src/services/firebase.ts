import { alertController } from "@ionic/vue";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { firestoreDefaultConverter, globalFirestoreOptions } from 'vuefire'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyC7XBiaPpX3tbmsO7oofWsNYK7ZP3fkkzU",
  authDomain: "new-web-project-45936.firebaseapp.com",
  databaseURL: "https://new-web-project-45936.firebaseio.com",
  projectId: "new-web-project-45936",
  storageBucket: "new-web-project-45936.appspot.com",
  messagingSenderId: "882846816313",
  appId: "1:882846816313:web:4bb4f96fa6c29e5cfcd5e8",
});

console.log(firebaseApp);

// used for the firestore refs
export const db = getFirestore(firebaseApp);



globalFirestoreOptions.converter = {
  // the default converter just returns the data: (data) => data
  toFirestore: firestoreDefaultConverter.toFirestore,
  fromFirestore: (snapshot, options) => {
    const data = firestoreDefaultConverter.fromFirestore(snapshot, options)
    // if the document doesn't exist, return null
    if (!data) return null
    // add anything custom to the returned object
    data.metadata = snapshot.metadata
    return data
  },
}

/**
 * 
 * @param subHeader 
 * @param message 
 * @returns 
 */
export const anErrorAlert = async (subHeader: string, message: string) => {
  const alert = await alertController.create({
    header: "Error Alert",
    subHeader,
    message,
    buttons: ["OK"],
  });

  await alert.present();
  return;
};



export interface PlayerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  team: string;
  number: string;
}

export interface PlayerInputInterface extends Omit<PlayerInterface, "id"> {}


export interface TeamInterface {
  id?: string;
  name: string;
}
