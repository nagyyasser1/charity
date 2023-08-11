function buildQuery(queryParameters) {
  const query = {};

  const operatorsMap = {
    SSH: "$eq",
    FirstName: "$eq",
    MidName: "$eq",
    LastName: "$eq",
    SocialStatus: "$eq",
    Sector: "$eq",
    ApprovalStatus: "$eq",
    Phone: "$eq",
    CashBenefits: "$eq",
    Box: "$eq",
    CheckDate: "$eq",
    StartDate: "$eq",
    Birthdate: "$eq",
    Description: "$eq",
    Town: "$eq",
    Street: "$eq",
    MonthlyIncome: "$eq",
    MonthlyOutcome: "$eq",
    Researcher: "$eq",
    ResearchOpinion: "$eq",
    name: "$eq",
    gender: "$eq",
    birthdate: "$eq",
    description: "$eq",
    study: "$eq",
    disabled: "$eq",
    Dependent: "$elemMatch",
  };
  for (const key in queryParameters) {
    if (key in operatorsMap) {
      const operator = operatorsMap[key];
      const value = queryParameters[key];

      if (Array.isArray(value)) {
        query[key] = { $elemMatch: value };
      } else if (operator === "$eq") {
        query[key] = value;
      } else {
        query[key] = { [operator]: parseInt(value) };
      }
    }
  }

  return query;
}

module.exports = buildQuery;
