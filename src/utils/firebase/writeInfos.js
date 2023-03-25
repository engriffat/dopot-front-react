import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseInit.js"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState } from '../../recoilState';


export async function addproj(inputs) {
    inputs.addressCreator=getRecoil(addressState)
    inputs.address=(Math.random() + 1).toString(36).substring(7);//dovrebbe essere l'address del contratto
    console.log(inputs)
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


export async function addFavorites(address) {
  var addressLogged=getRecoil(addressState)
  try {
    const docRef = await addDoc(collection(db, "favorites"), {addressUser: addressLogged, addressContract: address});
    console.log("Document written with ID: ", docRef.id);
    alert("Aggiunto ai preferiti!")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function addInvestment(address, numTier) {
  var addressLogged=getRecoil(addressState)
  try {
    const docRef = await addDoc(collection(db, "investment"), {addressUser: addressLogged, addressContract: address, tier: numTier});
    console.log("Document written with ID: ", docRef.id);
    alert("Investimento avvenuto con successo!")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}