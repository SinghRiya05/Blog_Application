import multer from "multer";

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // file name
  },
});

// Multer middleware
export const upload = multer({ storage: storage });
