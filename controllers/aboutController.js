// import the PrismaClient constructor from the @prisma/client library.
import { PrismaClient } from "@prisma/client";

// create an instance of PrismaClient.
const prisma = new PrismaClient();

// export the getAbout function, which is an asynchronous function.
export const getAbout = async (request, response) => {
  try {
    // retrieve the unique restaurant data from the database where the restaurantId is 1.
    const restaurantData = await prisma.restaurant.findUnique({
      where: {
        restaurantId: 1
      }
    });

    // retrieve all employee data from the database.
    const employeeData = await prisma.employee.findMany();

    // render the "about.ejs" template file, passing in the restaurant and employee data.
    response.render("about.ejs", {restaurant: restaurantData, employee: employeeData});
  }
  // catch any errors that occur during the database query execution.
  catch (error) {
    // log the error to the console.
    console.error(error);
  }
}