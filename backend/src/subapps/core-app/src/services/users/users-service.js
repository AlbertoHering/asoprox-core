const { funcWrapper } = require("../../../../../utils");
const { usersSQLQueries } = require("./users-service.sql");
const { mySQLdb } = require("../../../../../integrations");
const { returnMessage } = require("../return-message-service");
const service = "User";
const services = "Users";

exports.getUsers = async () => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getUsers);

    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return usersResultset;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services), 200);
};

exports.getUsersByProject = async(project_id) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getUsersByProject, [
      project_id,
      project_id
    ]);

    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return usersResultset;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services.toLowerCase()), 200);
};

exports.getManagers = async (project_id) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getManagers, [
      project_id,
      project_id,
      project_id
    ]);

    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, "managers"), 404);
    }

    return usersResultset;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, "Managers"), 200);
};

exports.getReporters = async () => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getReporters);

    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, "reporters"), 404);
    }

    return usersResultset;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, "Reporters"), 200);
};

exports.addUser = async (user) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.createUser, [
      user.email,
      user.personal_email || null,
      user.full_name,
      new Date(user.initial_date),
      user.employee_type_id,
      user.country_id,
      user.dob ? new Date(user.dob) : null,
      user.emergency_contact_name || null,
      user.emergency_contact_phone || null,
      user.emergency_contact_relationship || null,
      user.employee_status,
      user.partner_id || null,
      user.job_title_id,
    ]);

    if (usersResultset.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(0, service.toLowerCase()));
    }

    return { id: usersResultset.insertId, ...user };
  };

  return await funcWrapper.ExecFnAsync(fn, returnMessage(1, service), 201);
};

exports.updateUser = async (user, user_id) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.updateUser, [
      user.email,
      user.personal_email || null,
      user.full_name,
      new Date(user.initial_date),
      user.employee_type_id,
      user.country_id,
      user.dob ? new Date(user.dob) : null,
      user.emergency_contact_name || null,
      user.emergency_contact_phone || null,
      user.emergency_contact_relationship || null,
      user.employee_status,
      user.partner_id || null,
      user.job_title_id,
      user.employee_status_reason || null,
      user_id,
    ]);

    if (usersResultset.ResultSetHeader?.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(3, service.toLowerCase()));
    }

    return { id: user_id, ...user };
  };

  return await funcWrapper.ExecFnAsync(fn, returnMessage(4, service.toLowerCase()), 201);
};

exports.deleteUser = async (user_id) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.deleteUser, [
      user_id
    ]);


    if (usersResultset.ResultSetHeader?.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(8, service.toLowerCase()), 404);
    }

    return user_id;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(9, service), 200);
}
