const Joi = require("joi");

const dependentSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().integer().min(0),
  gender: Joi.string().valid("male", "female").required(),
  birthdate: Joi.date().required(),
  description: Joi.string(),
  study: Joi.bool().required(),
  disabled: Joi.bool().required(),
});

const fileSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.binary().encoding("base64").required(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "application/pdf")
    .required(),
});

const caseDataValidationSchema = Joi.object({
  SSH: Joi.number().required(),
  FirstName: Joi.string().trim().required(),
  MidName: Joi.string().trim().required(),
  LastName: Joi.string().trim().required(),
  SocialStatus: Joi.string().valid("poor", "widows", "orphans").required(),
  Sector: Joi.string().valid("foundation", "factory", "special").required(),
  ApprovalStatus: Joi.string().valid("yes", "no", "wating").required(),
  Phone: Joi.string().length(11).required(),
  CashBenefits: Joi.number().required(),
  Box: Joi.number().default(1),
  CheckDate: Joi.date().required(),
  StartDate: Joi.date().required(),
  Birthdate: Joi.date().required(),
  Description: Joi.string().required(),
  Town: Joi.string().trim().required(),
  Street: Joi.string().trim().required(),
  MonthlyIncome: Joi.number().required(),
  MonthlyOutcome: Joi.number().required(),
  File: Joi.when("ApprovalStatus", {
    is: "yes",
    then: fileSchema.required(),
    otherwise: fileSchema.optional(),
  }),
  Dependent: Joi.array().items(dependentSchema),
  Researcher: Joi.string().required(),
  ResearchOpinion: Joi.string().required(),
});

module.exports = {
  caseDataValidationSchema,
};
