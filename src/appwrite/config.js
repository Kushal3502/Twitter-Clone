import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class AppwriteService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ name, userId, content, featuredImage }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { name, userId, content, featuredImage }
      );
    } catch (error) {
      console.log("Appwrite :: createPost :: ", error);
    }
  }

  async updatePost(id, { content, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        { content, featuredImage }
      );
    } catch (error) {
      console.log("Appwrite :: updatePost :: ", error);
    }
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost :: ", error);
    }
  }

  async getPost(id) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: getPost :: ", error);
    }
  }

  async getUserPosts(userId) {
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: getUserPosts :: ", error);
    }
  }

  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
      // return true;
    } catch (error) {
      console.log("Appwrite :: getAllPosts :: ", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile :: ", error);
    }
  }

  async deleteFile(id) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, id);
    } catch (error) {
      console.log("Appwrite :: deleteFile :: ", error);
    }
  }

  getFilePreview(id) {
    return this.storage.getFilePreview(conf.appwriteBucketId, id);
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
