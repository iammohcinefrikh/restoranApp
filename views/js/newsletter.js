// get the form element by its ID
const newsletterForm = document.getElementById("newsletter-form");
// get the input element within the form by its ID
const newsletterFormInput = document.getElementById("newsletter-form-input");

// define a regular expression for validating email addresses
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

// add an event listener to the form for the 'submit' event
newsletterForm.addEventListener("submit", (event) => {
  // prevent the default form submission behavior
  event.preventDefault();

  // check if the input value is empty or if it doesn't match the email regex
  if (newsletterFormInput.value === "" || !emailRegex.test(newsletterFormInput.value)) {
    // if the input is invalid, alert the user
    alert("Enter a valid email address and try again.");
  } 
  
  else {
    // if the input is valid, submit the form
    newsletterForm.submit();
  }
});
