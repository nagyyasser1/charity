const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

function removeFileInUploadsLocal(fileName) {
  const uploadsFolderPath = path.join(__dirname, "../uploads");

  const filePath = path.join(uploadsFolderPath, fileName);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.log("File not found:", fileName);
    }
  } catch (error) {
    console.error("Error while removing the file:", error);
  }
}

async function removeFileFromCloudinary(public_id) {
  try {
    console.log("public_id", public_id);
    const result = await cloudinary.uploader.destroy(`${public_id}`);

    console.log("File deleted:", result);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

module.exports = {
  removeFileInUploadsLocal,
  removeFileFromCloudinary,
};
