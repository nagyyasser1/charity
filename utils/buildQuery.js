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
  };

  for (const key in queryParameters) {
    if (key in operatorsMap) {
      const operator = operatorsMap[key];
      const value = queryParameters[key];

      if (operator === "$eq") {
        query[key] = value;
      } else {
        query[key] = { [operator]: parseInt(value) };
      }
    }
  }

  return query;
}

module.exports = buildQuery;
