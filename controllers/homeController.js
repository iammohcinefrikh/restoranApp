// import the PrismaClient constructor from the Prisma Client library
import { PrismaClient } from "@prisma/client";

// instantiate a new PrismaClient object to interact with the database
const prisma = new PrismaClient();

// export an asynchronous function called 'getHome' which handles requests and responses
export const getHome = async (request, response) => {
  try {
    // retrieve multiple records from the 'plate' table, including related 'category' data
    const platesData = await prisma.plate.findMany({
      include: {
        category: true, // this ensures that the related category data is fetched along with plates data
      },
    });

    // retrieve a single record from the 'restaurant' table where the 'restaurantId' is 1
    const restaurantData = await prisma.restaurant.findUnique({
      where: {
        restaurantId: 1 // the condition to find the specific restaurant
      }
    });
    
    // retrieve multiple records from the 'employee' table without any conditions
    const employeeData = await prisma.employee.findMany();

    // render the 'index.ejs' view template, passing the retrieved data as variables
    response.render("index.ejs", {plates: platesData, restaurant: restaurantData, employee: employeeData});
  }
  catch (error) {
    // if an error occurs during the database operations, log the error to the console
    console.error(error);
  }
}