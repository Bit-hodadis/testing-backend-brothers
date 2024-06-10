import {
  uploadString,
  getDownloadURL,
  ref as storageReference,
} from "firebase/storage";
import { storage } from "config/firebase";

export default function useFirebaseClient() {
  const uploadImages = async (file, path) => {
    const singleImageUpload = async (file: any) => {
      const base64String = file.split(",")[1];
      const name = file.split(",")[0];
      const getStorageReference = storageReference(
        storage,
        `${path}/${name}${Date.now()}`
      );

      const upload = await uploadString(
        getStorageReference,
        base64String,
        "base64"
      );

      const url = await getDownloadURL(getStorageReference);
      return url;
    };

    try {
      const url = await singleImageUpload(file);
      return url;

      // const urls = await Promise.all(
      //   files.map(async (e: any) => {
      //     const url = await singleImageUpload(e);
      //     return url;
      //   })
      // );
      // return { urls, error: null };
    } catch (error) {
      return { url: null, error };
    }
  };

  return {
    uploadImages,
  };
}
