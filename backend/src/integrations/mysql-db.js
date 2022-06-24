const mysql = require('mysql2');

let promisePool = {};
exports.init = async (connection) => {
  const pool = await mysql.createPool({
    host: connection.host,
    user: connection.user,
    database: connection.database,
    password: connection.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  promisePool = pool.promise();
  console.log('MYSQL pool was initialized');
};

exports.query = async (sql, params = []) => {
  const connection = await promisePool.getConnection()
  try {
    connection.config.namedPlaceholders = true;
    const [rows] = await connection.execute(sql, params);
    connection.release();

    return rows
  } catch (error) {
    connection.release();
    console.error(error);
    throw new Error(error);
  }
};
