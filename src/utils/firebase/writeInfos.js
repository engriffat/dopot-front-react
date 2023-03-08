import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseInit.js"
import { blobToBase64 } from "../base64utils.js";
export async function addproj(inputs) {
    try {
        convertToBase64(inputs).then(async (result) => {
          const docRef = await addDoc(collection(db, "progetti"), result);
        console.log("Document written with ID: ", docRef.id);
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


async function convertToBase64(input) {

  var tInput=input
  // Funzione per la conversione in base64
  function  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  const promises = [];

  // Itera l'input e converte i file in base64
  for (const key in input) {
    if (key.endsWith("ListFiles")) {
      const fileList = input[key];
      const newFileList = {};
      for (const fileKey in fileList) {
        const file = fileList[fileKey];
        if (file instanceof File) {
          promises.push(
          convertFileToBase64(file).then((base64) => {
            tInput[key] = {base64};
            console.log(tInput)
          }));
        }
      }

      input[key] = newFileList;
    }
  }

  await Promise.all(promises);

  // Ritorna l'input con i file convertiti
  return tInput;
}