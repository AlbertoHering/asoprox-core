exports.individualstatementsSQLQueries = {
  getIndividualStatement:    "CALL getStatement(?, ?);",
  createIndividualStatement: "CALL crudIndividualStatement(0, ?, ?, ?, ?);",
  updateIndividualStatement: "CALL crudIndividualStatement(?, ?, ?, ?, ?);",
  deleteIndividualStatement: "CALL crudIndividualStatement(?, ?, ?, 0, 0);",
  getDateRange: "CALL getDateRange();"
};
