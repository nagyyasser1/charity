const fs = require("fs");
const path = require("path");

function removeFileInUploads(fileName) {
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

module.exports = removeFileInUploads;
