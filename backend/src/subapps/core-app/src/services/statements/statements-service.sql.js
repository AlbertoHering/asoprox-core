var moment = require('moment');
var now = moment(new Date());

exports.statementsSQLQueries = {
  getStatements:   "CALL getStatement(0, 0);",
  getStatement:    "CALL getStatement(?, 0);",
  getSummary:      "CALL getStatement(0, 1);",
  createStatement: "CALL crudStatement(0, ?, ?, ?, ?, ?, 1, 0);",
  updateStatement: "CALL crudStatement(?, ?, ?, ?, ?, ?, ?, 0);",
  deleteStatement: "CALL crudStatement(?, '', '', '', 0, '" + now.format('YYYY-MM-DD').toString() + "', 0, 1);",
};
