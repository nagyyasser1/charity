const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { CustomError } = require("../middleware/errorHandler");

function handleFileUpload(file) {
  const uniqueFileName = `${uuidv4()}${path.extname(file.name)}`;
  file.mv(path.join(__dirname, "../uploads", uniqueFileName), (err) => {
    if (err) {
      throw new CustomError(400, "file didn't save!");
    }
  });
  return uniqueFileName;
}

module.exports = handleFileUpload;
