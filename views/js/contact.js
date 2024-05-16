// access the form element by its ID to handle its submission
const contactForm = document.getElementById("contact-us-form");
// access the name input field within the form by its ID
const nameInput = document.getElementById("contact-us-form-name-input");
// access the email input field within the form by its ID
const emailInput = document.getElementById("contact-us-form-email-input");
// access the subject input field within the form by its ID
const subjectInput = document.getElementById("contact-us-form-subject-input");
// access the message input field within the form by its ID
const messageInput = document.getElementById("contact-us-form-message-input");

// add an event listener to the form for the 'submit' event
contactForm.addEventListener("submit", (event) => {
  // prevent the default form submission to validate inputs first
  event.preventDefault();

  // check if the name input field is empty
  if (nameInput.value === "") {
    // if the name input is empty, show an alert and stop the form submission
    return alert("Please enter your name.");
  }
  // check if the email input field is empty or doesn't match the regex pattern
  else if (emailInput.value === "" || !emailRegex.test(emailInput.value)) {
    // if the email input is invalid, show an alert and stop the form submission
    return alert("Please enter a valid email address.");
  }
  // check if the subject input field is empty
  else if (subjectInput.value === "") {
    // if the subject input is empty, show an alert and stop the form submission
    return alert("Please enter a subject.");
  }
  // check if the message input field is empty
  else if (messageInput.value === "") {
    // if the message input is empty, show an alert and stop the form submission
    return alert("Please enter your message.");
  }
  // if all inputs are valid, allow the form to be submitted
  else {
    contactForm.submit();
  }
});