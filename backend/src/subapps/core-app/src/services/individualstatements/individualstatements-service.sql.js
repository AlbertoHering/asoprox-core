var moment = require('moment');
var now = moment();

exports.individualstatementsSQLQueries = {
  getIndividualStatement:   "CALL getStatement(?);",
  createIndividualStatement: "CALL crudIndividualStatement(0, ?, ?, ?, ?, ?, 1, 0);",
  updateIndividualStatement: "CALL crudIndividualStatement(?, ?, ?, ?, ?, ?, ?, 0);",
  deleteIndividualStatement: "CALL crudIndividualStatement(?, '', '', '', 0, '" + now.format('YYYY-MM-DD').toString() + "', 0, 1);",
};
