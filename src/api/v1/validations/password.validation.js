import Joi from "joi";

const passwordSchema = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
  .required()
  .messages({
    "string.base": "Password should be of alphanumeric type",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of {#limit}",
    "string.max": "Password should have a maximum length of {#limit}",
    "any.required": "Password is required",
  });

export const validatePassword = (password) => {
  const { error } = passwordSchema.validate(password);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
