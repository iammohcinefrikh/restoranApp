// export handleResponse helper
export const handleResponse = (response, statusCode, responseMessage) => {
  response.status(statusCode).send(responseMessage);
}