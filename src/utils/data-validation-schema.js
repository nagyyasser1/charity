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

const monthlyCaseSchema = Joi.object({
  socialStatus: Joi.string().valid("poor", "widows", "orphans").required(),
  sector: Joi.string().valid("foundation", "factory").required(),
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
  cashBenefits: Joi.number().required(),
  bouns: Joi.number(),
  birthdate: Joi.date().required(),
  startDate: Joi.date().required(),
  checkResearchDate: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.date().required(),
    otherwise: Joi.date().optional(),
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
    otherwise: Joi.string().optional(),
  }),
  researchOpinion: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  boxCount: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  dependents: Joi.array().items(dependentSchema),
});

const roofCaseSchema = Joi.object({
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
  cost: Joi.number().required(),
  date: Joi.date().required(),
  startDate: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.date().required(),
    otherwise: Joi.date().optional(),
  }),
  endDate: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.date().required(),
    otherwise: Joi.date().optional(),
  }),
  description: Joi.string().required(),
  researcher: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().optional(),
  }),
  img1: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  img2: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  file: Joi.when("approvalStatus", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});

const loanCaseSchema = Joi.object({
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
  isUrgent: Joi.bool().required(),
  cost: Joi.number().required(),
  description: Joi.string().required(),
  researcher: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  numOfPaidMonths: Joi.number().required(),
  slideCount: Joi.number().required(),
  paid: Joi.number().required(),
  rest: Joi.number().required(),
  finished: Joi.bool().required(),
  file: Joi.string().required(),
});

const debtCaseSchema = Joi.object({
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
  isUrgent: Joi.bool().required(),
  debtAmount: Joi.number().required(),
  paidAmount: Joi.number().required(),
  restAmount: Joi.number().required(),
  amountFromFoundation: Joi.number().required(),
  paidFromFoundation: Joi.number().required(),
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
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
  isUrgent: Joi.bool().required(),
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
  status: Joi.string().required(),
});

const furnitureCaseShema = Joi.object({
  name: Joi.string().required(),
  researcher: Joi.string().required(),
  researchDate: Joi.date().required(),
  helpDate: Joi.date().required(),
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
  products: Joi.array().items(deviceSchema).required(),
});

const operationCaseShema = Joi.object({
  approvalStatus: Joi.string().valid("yes", "no", "waiting").trim().required(),
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

const productSchema = Joi.object({
  category: Joi.string().required(),
  status: Joi.string().required(),
  countInStock: Joi.number().required(),
});

const benefitProduct = Joi.object({
  category: Joi.string().required(),
  status: Joi.string().required(),
});

const benefitSchema = Joi.object({
  ssh: Joi.number().required(),
  name: Joi.string().required(),
  time: Joi.date().required(),
  desc: Joi.string(),
  products: Joi.array().items(benefitProduct).required(),
});

const dealSchema = Joi.object({
  sector: Joi.string().required(),
  dealType: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string().required(),
  count: Joi.number().required(),
  price: Joi.number().required(),
  totalPrice: Joi.number().required(),
  date: Joi.date().required(),
  desc: Joi.number(),
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
  productSchema,
  benefitSchema,
  dealSchema,
};
