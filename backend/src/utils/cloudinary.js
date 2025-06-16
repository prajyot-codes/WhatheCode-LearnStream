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
const uploadMultipleFilesOnCloudinary = async (filePaths) => {
  try {
      // Validate input
      if (!Array.isArray(filePaths) || filePaths.length === 0) {
          throw new Error("No files provided for upload.");
      }

      // Use the existing `uploadOnCloudinary` for each file
      const uploadPromises = filePaths.map((path) => uploadOnCloudinary(path));

      // Wait for all uploads to complete
      const responses = await Promise.all(uploadPromises);

      // Filter out any null responses (if `uploadOnCloudinary` returns null for failed uploads)
      const successfulUploads = responses.filter((res) => res !== null);

      // If no uploads succeeded, throw an error
      if (successfulUploads.length === 0) {
          throw new Error("All file uploads failed.");
      }

      // Return successful uploads
      return successfulUploads;

  } catch (error) {
      // Log and propagate the error for the caller
      console.error(`Error in uploadMultipleFiles: ${error.message}`);
      throw error;
  }
};
const deleteMediaFromCloudinary = async (publicId) => {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.log(error);
      throw new Error("failed to delete assest from cloudinary");
    }
  };

// basically in the end we are exporting the uploadonCloudinary function which returns 
// a basic response which we send back 

export {uploadOnCloudinary,uploadMultipleFilesOnCloudinary,deleteMediaFromCloudinary}