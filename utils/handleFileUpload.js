const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { CustomError } = require("../middleware/system/errorHandler");
const cloudinary = require("../config/cloudinary");

function handleFileUploadLocal(file) {
  const uniqueFileName = `${uuidv4()}${path.extname(file.name)}`;
  file.mv(path.join(__dirname, "../uploads", uniqueFileName), (err) => {
    if (err) {
      throw new CustomError(400, "file didn't save!");
    }
  });
  return uniqueFileName;
}

// Assuming cloudinary is properly imported or required

function handleFileUploadOnCloudinary(file) {
  return new Promise((resolve, reject) => {
    const fileStream = cloudinary.uploader.upload_stream(
      {
        folder: "charityOrganization",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    fileStream.write(file.data);
    fileStream.end();
  });
}

module.exports = {
  handleFileUploadLocal,
  handleFileUploadOnCloudinary,
};
