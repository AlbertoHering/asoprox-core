var moment = require('moment');
var now = moment();

exports.usersSQLQueries = {
  getUsers:   "CALL getMember(0);",
  getUser:    "CALL getMember(?);",
  createUser: "CALL crudMember(0, ?, ?, ?, ?, ?, 1, 0);",
  updateUser: "CALL crudMember(?, ?, ?, ?, ?, ?, ?, 0);",
  deleteUser: "CALL crudMember(?, '', '', '', 0, '" + now.format('YYYY-MM-DD').toString() + "', 0, 1);",
};
