const { funcWrapper } = require("../../../../../utils");
const { usersSQLQueries } = require("./users-service.sql");
const { mySQLdb } = require("../../../../../integrations");
const { returnMessage } = require("../return-message-service");
const service = "Miembro Asociado";
const services = "Miembros Asociados";

exports.getUsers = async () => {
  
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getUsers);
    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return usersResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services), 200);
};

exports.getUsersList = async () => {
  
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getUsersList);
    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return usersResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services), 200);
};

exports.getUser = async(user_id) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getUser, [
      user_id
    ]);

    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return usersResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services.toLowerCase()), 200);
};

exports.addUser = async (user) => {
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.createUser, [
      user.full_name,
      user.email,
      user.personal_email || null,
      user.id,
      new Date(user.initial_date),
      user.admin
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
      user_id, /** Member ID */
      user.full_name,
      user.email,
      user.personal_email || null,
      user.id,
      new Date(user.initial_date),
      user.admin,
      user.account_access ? 1:0
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

exports.getTypes = async () => {
  
  const fn = async () => {
    const usersResultset = await mySQLdb.query(usersSQLQueries.getTypes);
    if (!usersResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return usersResultset;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services), 200);
};