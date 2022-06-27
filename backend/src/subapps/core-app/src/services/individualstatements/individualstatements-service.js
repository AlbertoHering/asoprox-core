const { funcWrapper } = require("../../../../../utils");
const { individualstatementsSQLQueries } = require("./individualstatements-service.sql");
const { mySQLdb } = require("../../../../../integrations");
const { returnMessage } = require("../return-message-service");
const service = "Estado de cuenta";
const services = "Estados de cuenta";

exports.getIndividualStatements = async () => {
  
  const fn = async () => {
    const individualstatementsResultset = await mySQLdb.query(individualstatementsSQLQueries.getIndividualStatement);
    if (!individualstatementsResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return individualstatementsResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services), 200);
};

exports.getIndividualStatement = async(member_id) => {
  const fn = async () => {
    const individualstatementsResultset = await mySQLdb.query(individualstatementsSQLQueries.getIndividualStatement, [
      member_id
    ]);

    if (!individualstatementsResultset.length) {
      funcWrapper.throwError(returnMessage(6, services.toLowerCase()), 404);
    }

    return individualstatementsResultset[0];
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(5, services.toLowerCase()), 200);
};

exports.addIndividualStatement = async (individualstatement) => {
  const fn = async () => {
    const individualstatementsResultset = await mySQLdb.query(individualstatementsSQLQueries.createIndividualStatement, [
      individualstatement.member_id,
      individualstatement.entry_amount,
      new Date(individualstatement.entry_date),
    ]);

    if (individualstatementsResultset.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(0, service.toLowerCase()));
    }

    return { id: individualstatementsResultset.insertId, ...individualstatement };
  };

  return await funcWrapper.ExecFnAsync(fn, returnMessage(1, service), 201);
};

exports.updateIndividualStatement = async (individualstatement, individualstatement_id) => {
  const fn = async () => {
    const individualstatementsResultset = await mySQLdb.query(individualstatementsSQLQueries.updateIndividualStatement, [
      individualstatement_id, /** IndividualStatement ID */
      individualstatement.member_id,
      individualstatement.entry_amount,
      new Date(individualstatement.entry_date),
    ]);

    if (individualstatementsResultset.ResultSetHeader?.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(3, service.toLowerCase()));
    }

    return { id: individualstatement_id, ...individualstatement };
  };

  return await funcWrapper.ExecFnAsync(fn, returnMessage(4, service.toLowerCase()), 201);
};

exports.deleteIndividualStatement = async (individualstatement_id) => {
  const fn = async () => {
    const individualstatementsResultset = await mySQLdb.query(individualstatementsSQLQueries.deleteIndividualStatement, [
      individualstatement_id
    ]);

    if (individualstatementsResultset.ResultSetHeader?.affectedRows < 1) {
      funcWrapper.throwError(returnMessage(8, service.toLowerCase()), 404);
    }

    return individualstatement_id;
  };
  return await funcWrapper.ExecFnAsync(fn, returnMessage(9, service), 200);
}
