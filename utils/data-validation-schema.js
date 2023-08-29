const Joi = require("joi");

const addressSchema = Joi.object({
  town: Joi.string().trim().required(),
  street: Joi.string().trim().required(),
});

const info = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  address: addressSchema.required(),
});

// validate basic info should be in any case in the system
const basicCaseDataSchema = Joi.object({
  ssh: Joi.number().required(),
  info: info.required(),
});

const dependentSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid("male", "female").required(),
  birthdate: Joi.date().required(),
  description: Joi.string(),
  study: Joi.bool().required(),
  disabled: Joi.bool().required(),
});

// Validate Monthy Case Data
const monthlyCaseSchema = Joi.object({
  socialStatus: Joi.string().valid("poor", "widows", "orphans").required(),
  sector: Joi.string().valid("foundation", "factory").required(),
  approvalStatus: Joi.string().valid("yes", "no", "wating").trim().required(),
  cashBenefits: Joi.number().required(),
  bouns: Joi.number(),
  birthdate: Joi.date().required(),
  startDate: Joi.date().required(),
  checkResearchDate: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.date().required(),
    otherwise: Joi.number().optional(),
  }),
  description: Joi.string().required(),
  monthlyIncome: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  monthlyOutcome: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  researcher: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().required().trim(),
    otherwise: Joi.number().optional(),
  }),
  researchOpinion: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.number().optional(),
  }),
  boxCount: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  dependents: Joi.array().items(dependentSchema),
});

const roofCaseSchema = Joi.object({
  status: Joi.string().valid("wating", "yes", "no"), // update
  cost: Joi.number().required(),
  date: Joi.date().required(),
  startDate: Joi.when("status", {
    //update
    is: "yes",
    then: Joi.date().required(),
    otherwise: Joi.date().optional(),
  }),
  endDate: Joi.when("status", {
    //update
    is: "yes",
    then: Joi.date().required(),
    otherwise: Joi.date().optional(),
  }),
  description: Joi.string().required(),
  researcher: Joi.when("status", {
    is: "yes",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().optional(),
  }),
  img1: Joi.when("status", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  img2: Joi.when("status", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  file: Joi.when("status", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});

// قرض updated
const loanCaseSchema = Joi.object({
  isUrgent: Joi.bool().required(),
  cost: Joi.number().required(),
  description: Joi.string().required(),
  researcher: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  numOfPaidMonths: Joi.number().required(),
  slideCount: Joi.number().required(),
  paid: Joi.number().required(),
  finished: Joi.bool().required(),
});

// دين
const debtCaseSchema = Joi.object({
  debtAmount: Joi.number().required(),
  paidAmount: Joi.number().required(),
  restAmount: Joi.number().required(),
  amountFromFoundation: Joi.number().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  finished: Joi.bool().required(),
  researcher: Joi.string().required(),
  debtMan: Joi.string().required(),
  debtManPhone: Joi.number().required(),
  address: Joi.string().required(),
  file: Joi.string().required(),
});

const treatmentCaseShema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  researcher: Joi.string().required(),
  startDate: Joi.date().required(),
  monthly: Joi.bool().required(),
  description: Joi.string().required(),
  finished: Joi.bool().required(),
});

const deviceSchema = Joi.object({
  category: Joi.string().required(),
  price: Joi.number().required(),
});

const furnitureCaseShema = Joi.object({
  devices: Joi.array().items(deviceSchema).required(),
  totalPrice: Joi.number().required(),
});

const operationCaseShema = Joi.object({
  isUrgent: Joi.bool().required(),
  doctorName: Joi.string().required(),
  doctorPhone: Joi.number().required(),
  doctorAddress: Joi.string().required(),
  operationName: Joi.string().required(),
  date: Joi.date().required(),
  operationSuccess: Joi.bool().required(),
  description: Joi.string().required(),
  operationCost: Joi.number().required(),
  costFromFoundation: Joi.number().required(),
  researcher: Joi.string().required(),
  file: Joi.string().required(),
});

module.exports = {
  basicCaseDataSchema,
  monthlyCaseSchema,
  roofCaseSchema,
  loanCaseSchema,
  debtCaseSchema,
  treatmentCaseShema,
  furnitureCaseShema,
  operationCaseShema,
};
