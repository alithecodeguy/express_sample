const mysql = require("mysql");

//MySQL details
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "<your-mysql-user>",
  password: "<your-mysql-password>",
  database: "kitchen",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err));
});

module.exports = mysqlConnection;
