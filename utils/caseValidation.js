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

const caseDataValidationSchema = Joi.object({
  ssh: Joi.number().required(),
  name: Joi.string().required(),
  socialStatus: Joi.string().valid("poor", "widows", "orphans").required(),
  sector: Joi.string().valid("foundation", "factory").required(),
  approvalStatus: Joi.string().valid("yes", "no", "wating").trim().required(),
  phone: Joi.number().required(),
  cashBenefits: Joi.number().required(),
  bouns: Joi.number(),
  birthdate: Joi.date().required(),
  startDate: Joi.date().required(),
  checkDate: Joi.date().required(),
  description: Joi.string().required(),
  monthlyIncome: Joi.number().required(),
  monthlyOutcome: Joi.number().required(),
  researcher: Joi.string().required().trim(),
  researchOpinion: Joi.string().required(),
  box: Joi.when("ApprovalStatus", {
    is: "yes",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().trim().optional(),
  }),
  boxCount: Joi.when("ApprovalStatus", {
    is: "yes",
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  address: addressSchema.required(),
  dependent: Joi.array().items(dependentSchema),
  file: Joi.when("ApprovalStatus", {
    is: "yes",
    then: fileSchema.required(),
    otherwise: fileSchema.optional(),
  }),
});

module.exports = {
  caseDataValidationSchema,
};
