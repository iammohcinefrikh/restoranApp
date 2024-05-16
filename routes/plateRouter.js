// import the 'express' module to create router handlers
import express from "express";
// import 'multer' for handling multipart/form-data, which is primarily used for uploading files
import multer from "multer";

// import the 'getPlate' and 'postPlate' functions from the plateController.js in the controllers directory
import { getPlate, postPlate } from "../controllers/plateController.js";

// set up the storage configuration for multer, which determines where and how files should be saved
const storage = multer.diskStorage({
  // 'destination' is a function that determines the folder where files should be stored
  destination: function (request, file, cb) {
    // Files will be stored in the 'views/img/' directory
    cb(null, "views/img/");
  },
  // 'filename' is a function that determines the name of the file within the destination
  filename: function (request, file, cb) {
    // the file will keep its original name when saved
    cb(null, file.originalname);
  }
});

// create a new router instance to handle routes
const router = express.Router();
// create a multer instance with the specified storage configuration
const upload = multer({ storage: storage });

// define a GET route for '/add-plate' which will execute the 'getPlate' function when accessed
router.get("/add-plate", getPlate);
// define a POST route for '/post-plate' which will execute the 'postPlate' function when accessed
// 'upload.single("plateImage")' is a middleware that processes a single file upload from the field named 'plateImage'
router.post("/post-plate", upload.single("plateImage"), postPlate);

// export the router as the default export of this module
export default router;
