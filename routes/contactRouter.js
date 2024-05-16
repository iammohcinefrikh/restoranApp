// import the express module to create router handlers.
import express from "express";
// import the getContact and postContact functions from the contactController.
import { getContact, postContact } from "../controllers/contactController.js";

// create a new router object to handle route paths.
const router = express.Router();

// define a GET route for the '/contact' path which will invoke the getContact function.
router.get("/contact", getContact);
// define a POST route for the '/contact-us' path which will invoke the postContact function.
router.post("/contact-us", postContact);

// export the router as the default export of this module.
export default router;