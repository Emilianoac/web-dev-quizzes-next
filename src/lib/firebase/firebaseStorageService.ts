import {initAdmin} from "./firebase-admin";
import {getStorage, getDownloadURL} from "firebase-admin/storage";
import {Bucket} from "@google-cloud/storage";

interface FileUploaderProps {
  file: Blob,
  basepath: string;
  name: string;
}

class FileUploader {
  async upload({file, basepath ,name} : FileUploaderProps, bucket: Bucket) {
    try {
      const fileType = file.type.split("/")[1];
      const fileName = `${name}.${fileType}`;
      const filePath = `${basepath}/${fileName}`;
  
      const newFile = bucket.file(filePath);

      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);

      await newFile.save(buffer);
      const url = await getDownloadURL(newFile);

      return {
        name: fileName,
        url: url,
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error uploading file: ${error.message}`);
      } else {
        throw new Error("Error uploading file: Unknown error");
      }
    }
  }
}

class FileDeleter {
  async delete(filePath: string, bucket: Bucket) {
    const deletedImage = bucket.file(filePath);
    await deletedImage.delete();
  }
}

class FirebaseStorageService {
  private uploader = new FileUploader();
  private deleter = new FileDeleter();
  private bucket;

  constructor() {
    initAdmin();
    const storage = getStorage();
    this.bucket = storage.bucket();
  }

  async uploadFile({ file, basepath, name }: FileUploaderProps) {
    try {
      return await this.uploader.upload({file, basepath, name}, this.bucket);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error uploading file: ${error.message}`);
      } else {
        throw new Error("Error uploading file: Unknown error");
      }
    }
  }

  async deleteFile(filePath: string) {
    try {
      await this.deleter.delete(filePath, this.bucket);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting file: ${error.message}`);
      } else {
        throw new Error("Error deleting file: Unknown error");
      }
    }
  }
}

export default FirebaseStorageService;
