const Joi = require("joi");

const dependentSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0),
  gender: Joi.string().valid("male", "female").required(),
  birthdate: Joi.date().required(),
  description: Joi.string(),
  study: Joi.bool().required(),
  studyLevel: Joi.string()
    .trim()
    .valid("primary", "secondary", "high", "university")
    .required(),
  disabled: Joi.bool().required(),
});

const fileSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.binary().encoding("base64").required(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "application/pdf")
    .required(),
});

const addressSchema = Joi.object({
  town: Joi.string().trim(),
  street: Joi.string().trim(),
});

const boxSchema = Joi.object({
  num: Joi.number().default(1),
  id: Joi.string().trim(),
});

const caseDataValidationSchema = Joi.object({
  SSH: Joi.string().required().length(14).trim(),
  Name: Joi.string().required(),
  SocialStatus: Joi.string().valid("poor", "widows", "orphans").required(),
  Sector: Joi.string().valid("foundation", "factory").required(),
  ApprovalStatus: Joi.string().valid("yes", "no", "wating").required(),
  Phone: Joi.string().length(11).required().trim(),
  CashBenefits: Joi.string().required().trim(),
  Bouns: Joi.number(),
  Birthdate: Joi.date().required(),
  StartDate: Joi.date().required(),
  CheckDate: Joi.date().required(),
  Description: Joi.string().required(),
  MonthlyIncome: Joi.string().required().trim(),
  MonthlyOutcome: Joi.string().required().trim(),
  Researcher: Joi.string().required().trim(),
  ResearchOpinion: Joi.string().required(),
  Box: boxSchema.optional(),
  Address: addressSchema.required(),
  Dependent: Joi.array().items(dependentSchema),
  File: Joi.when("ApprovalStatus", {
    is: "yes",
    then: fileSchema.required(),
    otherwise: fileSchema.optional(),
  }),
});

module.exports = {
  caseDataValidationSchema,
};
