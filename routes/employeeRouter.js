// import the express module for routing.
import express from "express";
// import the multer module for handling file uploads.
import multer from "multer";

// import the getEmployee and postEmployee functions from the employeeController.
import { getEmployee, postEmployee } from "../controllers/employeeController.js";

// set up the storage configuration for multer, which determines where and how files are saved.
const storage = multer.diskStorage({
  // define the destination directory for uploaded files.
  destination: function (request, file, cb) {
    cb(null, "views/img/");
  },
  // define how the filename is determined for uploaded files.
  filename: function (request, file, cb) {
    cb(null, file.originalname); // Use the original file name.
  }
});

// create a new router instance to handle routes.
const router = express.Router();
// create an upload instance with the defined storage configuration.
const upload = multer({ storage: storage });

// define a GET route for '/add-employee' that will execute the getEmployee function.
router.get("/add-employee", getEmployee);
// define a POST route for '/post-employee' that will handle single file uploads with the field name 'employeeImage' and execute the postEmployee function.
router.post("/post-employee", upload.single("employeeImage"), postEmployee);

// export the router as the default export of this module.
export default router;
