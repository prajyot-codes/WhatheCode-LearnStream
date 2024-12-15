import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {

        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        else console.warn(`File not found at file path${localFilePath}`);
        
        return null;
    }
}

// basically in the end we are exporting the uploadonCloudinary function which returns 
// a basic response which we send back 

export {uploadOnCloudinary}