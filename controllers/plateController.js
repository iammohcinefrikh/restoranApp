// import the PrismaClient constructor from the "@prisma/client" node module
import { PrismaClient } from "@prisma/client";
// import the handleResponse helper function from the "handleResponseHelper.js" file
import { handleResponse } from "../helpers/handleResponseHelper.js";

// instantiate a new PrismaClient object
const prisma = new PrismaClient();

// define an asynchronous function named getPlate
export const getPlate = async (request, response) => {
  try {
    // use the PrismaClient instance to fetch all categories from the database
    const categoryOptions = await prisma.category.findMany();

    // sort the array of categories by their categoryId property in ascending order
    categoryOptions.sort((a, b) => a.categoryId - b.categoryId);

    // create a new array containing only the categoryName property of each category
    const categoryNames = categoryOptions.map(option => option.categoryName);

    // use the response object's render method to render the "plate.ejs" view
    // pass an object containing the categoryNames and restaurantNames arrays, and the selectedRestaurant name from the request parameters
    response.render("plate.ejs", {category: categoryNames});
  }

  // if an error occurs during the execution of the try block, catch it
  catch (error) {
    // log the error to the console
    console.error(error);
  }
}

// define an asynchronous function named postPlate
export const postPlate = async (request, response) => {
  try {
    // destructure the request body to get the necessary variables
    const { plateName, platePrice, plateDescription, categoryId } = request.body;

    // use the PrismaClient instance to create a new plate in the database with the data from the request body
    const addPlate = await prisma.plate.create({
      data: {
        plateName: plateName,
        platePrice: parseInt(platePrice),
        plateDescription: plateDescription,
        platePicture: request.file.originalname,
        categoryId: parseInt(categoryId),
      }
    });

    // use the PrismaClient instance to create a new serve in the database with the restaurantId and plateId
    await prisma.serve.create({
      data: {
        restaurantId: 1, // Assuming the restaurant with ID 1 exists
        plateId: addPlate.plateId // The ID of the newly created plate
      }
    });
      

    // redirect the user to the add-plate page of the restaurant
    response.redirect("/add-plate");
  }

  // if an error occurs during the execution of the try block, catch it
  catch (error) {
    // use the handleResponse helper function to send a response with status 500 and a custom error message
    console.error(error);
    handleResponse(response, 500, "Error occurred while submitting the plate.");
  }
}