import config from "../config/config";
import { Client, ID, Storage, Databases, Query} from "appwrite";

export class Database{


    client = new Client()
    databases;
    buckets;
    constructor(){
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectId)

        this.databases = new Databases(this.client)
        this.buckets = new Storage(this.client)
    }

    // Create new Post
    async creatPost({title, slug, articleBody, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    articleBody,
                    featuredImage,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite database service :: creatPost', error) 
        }

    }

    // Updata existing Post
    async upDatePost(slug, {title, articleBody, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    articleBody,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite database service :: upDatePost', error) 
            
        }
    }

    // Delete the Post
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log('Appwrite database service :: deletePost', error)
            return false
        }
    }

    // Query for a Post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log('Appwrite database service :: getPost', error)
            return false
        }
    }

    // Query for multiple Posts
    // async getPosts(queries = []){
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDataBaseId,
                config.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('Appwrite database service :: getPosts', error)
            return false
        }
    }

    // ########Methods for  Pictur/File 

    // Upload File
    async uploadFile(file){
        try {
            return await this.buckets.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite database service :: uploadFile', error)
            return false
        }
    }

    // Deleting the File
    async deleteFile(fileId){
        try {
            const result =  await this.buckets.deleteFile(
                config.appWriteBucketId,
                fileId
            )

            console.log('The result of deletion file is', result)
            return result
            
            return true
        } catch (error) {
            console.log('Appwrite database service :: deleteFile', error)
            return false
        }
    }

    // Getting file Preview
    getFilePreview(fileId){
        return this.buckets.getFileView(
            config.appWriteBucketId,
            fileId
        )
    }


}

const databaseService = new Database()
export default databaseService