// import the 'express' module, which is a fast, unopinionated, minimalist web framework for Node.js
import express from "express";
// import the 'postNewsletter' function from the newsletterController.js file located in the controllers directory
import { postNewsletter } from "../controllers/newsletterController.js";

// create a new instance of the express router to handle different HTTP routes
const router = express.Router();

// define a POST route for '/subscribe-to-newsletter'
// when a POST request is made to this path, the 'postNewsletter' function will handle it
router.post("/subscribe-to-newsletter", postNewsletter);

// export the router as the default export of this module
// this allows it to be imported and used in the main server file or other modules
export default router;