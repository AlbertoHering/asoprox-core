exports.authSQLQueries = {
  authenticateUser:
    "SELECT `id`, `full_name`, `email`, `personal_email` FROM `users` WHERE `email` = ? and " +
    "`employee_status` = 1 and `inactive` = 0",
  getUserPolicies: "SELECT DISTINCT `policies`.`code` "
    +"  FROM        `user_policies` "
    +"   LEFT JOIN  `policies` ON (`policies`.`id` = `user_policies`.`policy_id`) "
    +"  WHERE       `user_policies`.`user_id` = ? "
    +"    AND       `user_policies`.`policy_id` IN ( "
    +"                SELECT `id` FROM `policies` WHERE `inactive`=0 "
    +"              ) "
};
