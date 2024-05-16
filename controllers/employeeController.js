// import the PrismaClient constructor from the "@prisma/client" node module
import { PrismaClient } from "@prisma/client";
// import the handleResponse helper function from the "handleResponseHelper.js" file
import { handleResponse } from "../helpers/handleResponseHelper.js";

// instantiate a new PrismaClient object
const prisma = new PrismaClient();

// define an asynchronous function named getPlate
export const getEmployee = async (request, response) => {
  try {
    // use the PrismaClient instance to fetch all restaurants from the database
    const restaurantOptions = await prisma.restaurant.findMany();

    // create a new array containing only the restaurantName property of each restaurant
    const restaurantNames = restaurantOptions.map(option => option.restaurantName);

    // use the response object's render method to render the "plate.ejs" view
    // pass an object containing the categoryNames and restaurantNames arrays, and the selectedRestaurant name from the request parameters
    response.render("employee.ejs", {restaurant: restaurantNames});
  }

  // if an error occurs during the execution of the try block, catch it
  catch (error) {
    // log the error to the console
    console.error(error);
  }
}

// define an asynchronous function named postPlate
export const postEmployee = async (request, response) => {
  try {
    // destructure the request body to get the necessary variables
    const { employeeName, employeeFunction, restaurantId } = request.body;

    // use the PrismaClient instance to create a new plate in the database with the data from the request body
    const addPlate = await prisma.employee.create({
      data: {
        employeeName: employeeName,
        employeeFunction: employeeFunction,
        employeePicture: request.file.originalname,
        restaurantId: parseInt(restaurantId),
      }
    });   

    // redirect the user to the add-plate page of the restaurant
    response.redirect("/add-employee");
  }

  // if an error occurs during the execution of the try block, catch it
  catch (error) {
    // use the handleResponse helper function to send a response with status 500 and a custom error message
    console.error(error);
    handleResponse(response, 500, "Error occurred while submitting the plate.");
  }
}