import Joi from "joi";

import User from "../models/user.model.js";

const dobSchema = Joi.date()
  .less("now")
  .required()
  .custom((value, helpers) => {
    const birthDate = new Date(value);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 13) {
      return helpers.error("any.custom", {
        message: "User must be at least 13 years old",
      });
    }

    return value;
  })
  .messages({
    "any.custom": "User must be at least 13 years old",
    "date.base": "Date of birth should be a valid date",
    "date.less": "Date of birth must be in the past",
  });

const checkUniqueField = async (field, value, model) => {
  const existingUser = await model.findOne({ where: { [field]: value } });
  if (existingUser) {
    return `This ${field} already exists`;
  }
};

// export const validateUser = async (userData) => {
//     const { username, email, dob } = userData;

//     const { error } = dobSchema.validate(dob);
//     if (error) {
//         console.log(error, "this is dob error");
//         throw new Error(error.details[0].message);
//     }

//     const validateUsername = await checkUniqueField('username', username, User);
//     if (validateUsername) {
//         throw new Error(validateUsername);
//     }

//     const validateEmail = await checkUniqueField('email', email, User);
//     if (validateEmail) {
//         throw new Error(validateEmail);
//     }
// }

export const validateUser = async (userData) => {
  const { username, email, dob } = userData;

  const { error } = dobSchema.validate(dob);
  if (error) {
    console.error("Date of birth validation error:", error);
    throw new Error(error.details[0].message);
  }

  const validateUsername = await checkUniqueField("username", username, User);
  if (validateUsername) {
    throw new Error(validateUsername);
  }

  const validateEmail = await checkUniqueField("email", email, User);
  if (validateEmail) {
    throw new Error(validateEmail);
  }
};
