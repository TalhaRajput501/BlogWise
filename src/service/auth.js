import config from "../config/config.js";
import {Client, Account, ID} from 'appwrite'

export class AuthService{

    client = new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)
        this.account = new Account(this.client)
    }

    // Creating new account
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // login the user if account create
                return this.login({email, password})
            }else{
                return userAccount
            }
        } catch (error) { 
            console.log('Appwrite auth service :: createAccount', error)
        }
    }
    

    // Logic for Logging In 
    async login({email, password}){
        console.log('Trying to login with:', email, password) // Check this

        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log('Appwrite auth service :: loginService', error)
            return error
        }
    }

    // Logic to check if user Logged In or not
    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log('Appwrite auth service :: getCurrentUser', error)
            console.log('it mean user in not logged in ')
        }
        
        return null;
    }

    // Logic for logout
    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite auth service :: logOut', error)
        }
    }
}

const authService = new AuthService()

export default authService
