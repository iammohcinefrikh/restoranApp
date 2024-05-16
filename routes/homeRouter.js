// import the 'express' module to create an Express application
import express from "express";
// import the 'getHome' function from the homeController.js file located in the controllers directory
import { getHome } from "../controllers/homeController.js";

// create a new router object to handle routing
const router = express.Router();

// define a route for the GET request to the root path ("/")
// when a GET request is made to the root path, the "getHome" function will be called
router.get("/", getHome);

// export the router object as the default export of this module
// this allows it to be imported and used in other files
export default router;