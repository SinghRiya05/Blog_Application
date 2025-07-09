import {v2 as cloudinary} from 'cloudinary'
import fs from "fs";
import path from 'path';
import { config } from 'dotenv';

config();



cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary=async(localFilePath)=>{
        try {
            if(!localFilePath) return null;
            //upload the file
           const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type:'auto'
            })
            //file haas been uploaded
            // console.log("file is uploaded on cloudinary",response.url);
            fs.unlinkSync(localFilePath )
            return response;

            
        } catch (error) {
            
            
            fs.unlinkSync(localFilePath) // remove the localy save temp file as the upload operation got failed
        }
    }
    


    export {uploadOnCloudinary};