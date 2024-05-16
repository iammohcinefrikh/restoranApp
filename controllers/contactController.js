// import the PrismaClient constructor from the @prisma/client package.
import { PrismaClient } from "@prisma/client";

// instantiate a new PrismaClient object to interact with the database.
const prisma = new PrismaClient();

// import the handleResponse helper function from the "handleResponseHelper.js" file
import { handleResponse } from "../helpers/handleResponseHelper.js";

// import the nodemailer module
import nodemailer from "nodemailer";

// export the getContact function, which is an async function that handles requests for the contact page.
export const getContact = async (request, response) => {
  try {
    // retrieve the unique restaurant data from the database where the restaurantId is 1.
    const restaurantData = await prisma.restaurant.findUnique({
      where: {
        restaurantId: 1 // This assumes there is a restaurant with the ID of 1 in the database.
      }
    });

    // render the 'contact.ejs' template file, passing the restaurant data to the template.
    response.render("contact.ejs", {restaurant: restaurantData});
  }
  // if an error occurs during the execution of the try block, catch it here.
  catch (error) {
    // output the error to the console.
    console.error(error);
  }
}

// define an asynchronous function named postContact
export const postContact = async (request, response) => {
  try {
    // destructure the request body to get the necessary variables
    const { contactName, contactEmail, contactSubject, contactMessage } = request.body;
    
    // create a transporter object using the createTransport method of nodemailer
    let mailTransporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // define the email message details
    let emailMessage = {
      from: `Restoran Mailer <${process.env.EMAIL_ADDRESS}>`,
      to: `Restoran Support <${contactEmail}>`,
      subject: "A new message from the contact us form",
      text: `You have a new message from the contact form:
      
      Name: ${contactName}
      Email: ${contactEmail}
      Subject: ${contactSubject}
      Message: ${contactMessage}`,
      html: `<p>You have a new message from the contact form:<p>
      
      <p><b>Name:</b> ${contactName}</p>
      <p><b>Email:</b> ${contactEmail}</p><br>
      <p><b>Subject:</b> ${contactSubject}</p>
      <p><b>Message:</b> ${contactMessage}</p>`
    };

    // use the sendMail method of the transporter object to send the email
    mailTransporter.sendMail(emailMessage, (error, info) => {
      if (error) {
          // if an error occurs, log the error and send a response with an error message
          console.log("Error occurred: " + error.message);
          return handleResponse(response, "error", "An error occurred, please try again later.");
      }
    });

    // redirect the user to the contact page
    response.redirect("/contact");
  }

  // if an error occurs during the execution of the try block, catch it and log it to the console
  catch (error) {
    console.error(error);
  }
}