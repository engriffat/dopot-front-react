function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

function fileToBase64(data) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (data instanceof File)
      reader.readAsDataURL(data);  
    else {
      const utf8 = new TextEncoder().encode(data);  
      resolve(window.btoa(utf8));
      return;
    }
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function filelistToBase64(fileList) {
  const base64Array = [];
  for (const file of fileList) {
    try {
      const base64 = await fileToBase64(file);
      base64Array.push(base64.split(',')[1]);
    } catch (error) {
      console.error(error);
    }
  }
  return base64Array;
}

export  {blobToBase64, fileToBase64, filelistToBase64};