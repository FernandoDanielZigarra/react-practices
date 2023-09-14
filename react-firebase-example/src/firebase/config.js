import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyChVFHRyFMb9y8J1blG1qoDKmlreqbiZEw",
  authDomain: "react-firebase-example-66176.firebaseapp.com",
  projectId: "react-firebase-example-66176",
  storageBucket: "react-firebase-example-66176.appspot.com",
  messagingSenderId: "432097683170",
  appId: "1:432097683170:web:ee3f3605ecf13a7ec0a0bb",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Upload a file to firebase storage
 * @param {File} file
 * @return {Promise<string>}
 */
export async function uploadFile(file) {
  try {
    const storageRef = ref(storage, `images/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function allFiles() {
  const allImagesUrls = [];
  try {
    const listRef = ref(storage, "images/");
    const { items } = await listAll(listRef);
    for (let index = 0; index < items.length; index++) {
      const url = await getDownloadURL(items[index]);
      allImagesUrls.push(url);
    }
    return allImagesUrls;
  } catch (error) {
    console.log(error);
  }
}
