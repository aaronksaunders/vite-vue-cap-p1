import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
// import './theme/variables.css';

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

const firebaseApp = initializeApp({
  projectId: "testem2",
});

const db = getFirestore(firebaseApp);
console.log("db", db);

// connect the application to the emulator
if (location.hostname === "localhost") {
  // Point to the Storage emulator running on localhost.
  connectFirestoreEmulator(db, "localhost", 8080);
}

(async () => {
  try {
    // added documents...
    const resp1 = await addDoc(collection(db, "someDocs"), {
      name: "This is a new document in cleared database",
      created_at: serverTimestamp(),
    });
    console.log("addDoc resp", resp1);

    // retrieving documents...
    const resp2 = await getDocs(
      query(collection(db, "someDocs"), orderBy("created_at", "desc"))
    );

    const cleanArray = resp2.docs.map((d) => {
      return {
        name: d.data().name,
        created_at: d.data().created_at.toDate(),
      };
    });
    console.log(cleanArray);
  } catch (error) {
    console.log("error", error);
  }
})();

import router from "./router";

const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(() => {
  app.mount("#app");
});
