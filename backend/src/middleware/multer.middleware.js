import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  // Define the file filter 
const fileFilter = (req, file, cb) => {
  // Allowed MIME types for images, audio, and video
  const allowedMimeTypes = [
      "image/jpeg", "image/png", "image/gif",   // Images
      "audio/mpeg", "audio/wav",                // Audio
      "video/mp4", "video/avi", "video/mkv",     // Video
      "application/pdf" 
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);  // File is allowed
  } else {
      cb(new Error("Invalid file type. Only images, audio, and video are allowed."), false); // Reject the file
  }
};
export const upload = multer({ 
    storage, 
    fileFilter,
})