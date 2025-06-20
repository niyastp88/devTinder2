const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  }
};

const validateEditProfileData = (req) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedUpdates.includes(field)
  );
  return isEditAllowed;
};
module.exports = { validateSignupData, validateEditProfileData };
