// import the express module
import express from "express";
import { promises as fs } from "fs";
import os from "os";

// import routers for different routes
import homeRouter from "./routes/homeRouter.js";
import aboutRouter from "./routes/aboutRouter.js";
import contactRouter from "./routes/contactRouter.js";

import newsletterRouter from "./routes/newsletterRouter.js";
import plateRouter from "./routes/plateRouter.js";
import employeeRouter from "./routes/employeeRouter.js";

// create a new express application instance
const app = express();

// middleware to parse JSON bodies
app.use(express.json());
// middleware to parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));
// middleware to serve static files from "views" directory
app.use(express.static("views"));
// set the view engine to ejs
app.set("view engine", "ejs");

// error handling middleware
app.use((error, request, response, next) => {
  // if the error is a SyntaxError
  if (error instanceof SyntaxError) {
    // send a response with status 400 and a JSON object containing error details
    return response.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message: "Invalid request syntax."
    });
  }
  // if the error is not a SyntaxError, pass control to the next middleware function
  else {
    next();
  }
});

// middleware to log request details including IP, OS name, and architecture
app.use(async (request, response, next) => {
  const logEntry = `
Time: ${new Date().toISOString()}
IP Address: ${request.ip}
OS Name: ${os.type()}
OS Version: ${os.version()}
Machine Architecture: ${os.arch()}
Method: ${request.method}
URL: ${request.originalUrl}
Headers: ${JSON.stringify(request.headers)}
Body: ${JSON.stringify(request.body)}

-------------------------
  `;

  try {
    await fs.appendFile("appLogs.txt", logEntry);
  } 
  
  catch (error) {
    console.error("Error writing to log file: ", error);
  }

  next();
});

// use the imported routers
app.use(homeRouter);
app.use(contactRouter);
app.use(aboutRouter);

app.use(newsletterRouter);
app.use(plateRouter);
app.use(employeeRouter);

// middleware to handle 404 errors
app.use((request, response) => {
  // render the 404.ejs view
  response.render("404.ejs");
});

// the port number is either the one set in the environment variables or 8080
const PORT = process.env.PORT || 8080;

// start the server and listen on the specified port
app.listen(PORT, () => {
  // log a message to the console once the server starts listening
  console.log("Server Listening on port: ", PORT);
});
