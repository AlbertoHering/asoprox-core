var moment = require('moment');
var now = moment(new Date());

exports.usersSQLQueries = {
  getUsers:     "CALL getMember(0);",
  getUser:      "CALL getMember(?);",
  getUsersList: "CALL getMember(-1);",
  createUser:   "CALL crudMember(0, ?, ?, ?, ?, ?, ?, 1, 0);",
  updateUser:   "CALL crudMember(?, ?, ?, ?, ?, ?, ?, ?, 0);",
  deleteUser:   "CALL crudMember(?, '', '', '', 0, '" + now.format('YYYY-MM-DD').toString() + "', ?, 0, 1);",
  getTypes: "SELECT `admin_id`, `type` FROM `admins` ORDER BY `type` ASC;"
};
