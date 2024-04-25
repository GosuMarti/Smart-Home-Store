import React from "react";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const isAlphanumeric = (value) => {
  return /^[a-zA-Z0-9]*$/.test(value);
};

const isAlphabetic = (value) => {
  return /^[a-zA-Z]*$/.test(value);
};

// Function to check if a string contains only numeric characters
const isNumeric = (value) => {
  return /^[0-9]*$/.test(value);
};

// Function to check if a string is a valid email address
const isValidEmail = (value) => {
  // This is a simple email validation regex, you might need a more complex one depending on your requirements
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

// Function to check if a password meets complexity requirements (e.g., minimum length, contains uppercase, lowercase, and numbers)
const isStrongPassword = (value) => {
  // Example of a strong password regex: at least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
};

export {
  isNotEmpty,
  isAlphanumeric,
  isAlphabetic,
  isNumeric,
  isValidEmail,
  isStrongPassword,
};
