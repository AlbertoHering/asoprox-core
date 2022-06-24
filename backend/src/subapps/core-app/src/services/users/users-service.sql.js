exports.usersSQLQueries = {
  getUsers:
    "SELECT `users`.id, `users`.email, `users`.personal_email, `users`.full_name, " +
    "`users`.initial_date, `users`.employee_type_id, `options`.`option` AS `employee_type_name`, "
    +"`users`.country_id, `users`.dob, `users`.emergency_contact_name, `users`.emergency_contact_phone, " +
    "`users`.emergency_contact_relationship, `users`.employee_status, " +
    "`users`.employee_status_reason, `users`.partner_id, `users`.job_title_id, " +
    "`users`.inactive FROM `users` LEFT JOIN `options` "
    +"ON (`options`.`id` = `users`.`employee_type_id`) " +
    "WHERE `users`.inactive = 0 ORDER BY full_name ASC ",
  getUsersByProject: "SELECT `users`.`id`, `users`.`full_name` "
      +"FROM `users` "
      +"  LEFT JOIN `user_projects` "
      +"    ON (`users`.`id` = `user_projects`.`user_id`) "
      +"WHERE inactive = 0 "
      +"AND CASE WHEN 0 < ? THEN `user_projects`.`project_id` = ? ELSE 1 = 1 END "
      +"GROUP BY `users`.`id` "
      +"ORDER BY full_name ASC ",
  getManagers: "SELECT `users`.`id`, `users`.`full_name` "
      +"FROM `users` "
      +"  LEFT JOIN `user_projects` "
      +"    ON (`users`.`id` = `user_projects`.`user_id`) "
      +"WHERE `users`.`inactive` = 0 "
      +"AND `user_projects`.`job_title_id` = 3 "
      +"AND CASE WHEN 0 < ? "
      /** IMPORTANT: Next line should be removed once the app is ready to go into PROD -AH */
      +"AND EXISTS(SELECT 1 FROM `users` LEFT JOIN `user_projects` ON (`users`.`id` = `user_projects`.`user_id`) WHERE `users`.`inactive` = 0 AND `user_projects`.`job_title_id` = 3 AND `user_projects`.`project_id` = ?) "
      +"THEN `user_projects`.`project_id` = ? ELSE 1 = 1 END "
      +"GROUP BY `users`.`id` "
      +"ORDER BY full_name ASC ",
  getReporters: "SELECT "
      +"  `users`.`id`, "
      +"  `users`.`full_name` "
      +"FROM `users` "
      +"WHERE `users`.`id` IN (SELECT "
      +"    `report_to` "
      +"  FROM `users` "
      +"  GROUP BY `report_to`) "
      +"ORDER BY `users`.`full_name` ASC ",
  createUser:
    "INSERT INTO `users` " +
    "(email, personal_email, full_name, initial_date, employee_type_id, " +
    "country_id, dob, emergency_contact_name, emergency_contact_phone, " +
    "emergency_contact_relationship, employee_status, " +
    "partner_id, job_title_id) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  updateUser:
    "UPDATE `users` SET " +
    "email = ?, personal_email = ?, full_name = ?, initial_date = ?, " +
    "employee_type_id = ?, country_id = ?, dob = ?, " +
    "emergency_contact_name = ?, emergency_contact_phone = ?, " +
    "emergency_contact_relationship = ?, employee_status = ?, " +
    "partner_id = ?, job_title_id = ?, employee_status_reason = ? " +
    "WHERE id = ?",
  deleteUser: "UPDATE `users` SET inactive = 1 WHERE id = ?",
};
