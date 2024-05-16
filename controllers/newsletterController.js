// import the PrismaClient from the Prisma client library
import { PrismaClient } from "@prisma/client";

// import the nodemailer library for sending emails
import nodemailer from "nodemailer";

// import the handleResponse function from your helper file
import { handleResponse } from "../helpers/handleResponseHelper.js";

// create a new instance of the PrismaClient
const prisma = new PrismaClient();

// define the postNewsletter function, which is an asynchronous function
export const postNewsletter = async (request, response) => {
  try {
    // extract the clientEmail from the request body
    const { clientEmail } = request.body;

    // check if a client with the given email already exists in the database
    const existingClient = await prisma.client.findUnique({
      where: {
        clientEmail: clientEmail
      }
    });

    // if the client already exists, return an error response
    if (existingClient) {
      return handleResponse(response, 500, "You are already subscribed to the newsletter.");
    }

    // create a new mail transporter using nodemailer
    let mailTransporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // define the email message
    let emailMessage = {
      from: `Restoran Mailer <${process.env.EMAIL_ADDRESS}>`,
      to: `Recipient <${clientEmail}>`,
      subject: "Thank you for subscribing to the newsletter",
      text: "Thank you! Your subscription has been confirmed. You've been added to our list and will hear from us soon.",
      html: `<h4>Thank you!</h4>
      <p>Your subscription has been confirmed. You've been added to our list and will hear from us soon.</p>`
    };

    // send the email
    mailTransporter.sendMail(emailMessage, (error, info) => {
      // If there's an error, log it and return an error response
      if (error) {
          console.log("Error ocurred: " + error.message);
          return handleResponse(response, 500, "Error occurred while subscribing to the newsletter");
      }
    });

    // if there's no error, create a new client in the database with the given email
    const addClient = await prisma.client.create({
      data: {
        clientEmail
      }
    });

    // create a new subscription in the database for the client
    await prisma.subscribe.create({
      data: {
        clientId: addClient.clientId,
        restaurantId: 1
      }
    })
    
    // redirect the client to the page they came from
    response.redirect(request.headers.referer.replace("http://localhost:8080", ""));
  }
  
  // if there's an error in the try block, catch it and return an error response
  catch (error) {
    handleResponse(response, 500, "Error occurred while subscribing to the newsletter");
  }
}