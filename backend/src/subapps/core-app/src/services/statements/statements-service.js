const { funcWrapper } = require("../../../../../utils");
const { statementsSQLQueries } = require("./statements-service.sql");
const { mySQLdb } = require("../../../../../integrations");
const { returnMessage } = require("../return-message-service");
const service = "Estado de cuenta";
const services = "Estados de cuenta";

exports.getStatements = async () => {
  
  const fn = async () => {
    const statementsResultset = await mySQLdb.query(statementsSQLQueries.getStatements);
    if (!statementsResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return statementsResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services), 200);
};

exports.getStatement = async(member_id) => {
  const fn = async () => {
    const statementsResultset = await mySQLdb.query(statementsSQLQueries.getStatement, [
      member_id
    ]);

    if (!statementsResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return statementsResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services.toLowerCase()), 200);
};

exports.getSummary = async() => {
  const fn = async () => {
    const statementsResultset = await mySQLdb.query(statementsSQLQueries.getSummary);

    if (!statementsResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return statementsResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services.toLowerCase()), 200);
};

exports.addStatement = async (statement) => {
  const fn = async () => {
    const statementsResultset = await mySQLdb.query(statementsSQLQueries.createStatement, [
      statement.member_id,
      statement.entry_amount,
      new Date(statement.entry_date),
    ]);

    if (statementsResultset.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(0, service.toLowerCase()));
    }

    return { id: statementsResultset.insertId, ...statement };
  };

  return await funcWrapper.ExecFnAsync(fn, returnMessage(1, service), 201);
};

exports.updateStatement = async (statement, statement_id) => {
  const fn = async () => {
    const statementsResultset = await mySQLdb.query(statementsSQLQueries.updateStatement, [
      statement_id, /** Statement ID */
      statement.member_id,
      statement.entry_amount,
      new Date(statement.entry_date),
    ]);

    if (statementsResultset.ResultSetHeader?.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(3, service.toLowerCase()));
    }

    return { id: statement_id, ...statement };
  };

  return await funcWrapper.ExecFnAsync(fn, returnMessage(4, service.toLowerCase()), 201);
};

exports.deleteStatement = async (statement_id) => {
  const fn = async () => {
    const statementsResultset = await mySQLdb.query(statementsSQLQueries.deleteStatement, [
      statement_id
    ]);

    if (statementsResultset.ResultSetHeader?.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(8, service.toLowerCase()), 404);
    }

    return statement_id;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(9, service), 200);
}
