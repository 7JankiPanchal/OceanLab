const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=LAPTOP-59KHB4MQ;Database=WasteClassifier;Trusted_Connection=Yes;"
};

console.log("Trying to connect...");

sql.connect(config)
    .then(() => {
        console.log("Connected to SQL Server");
    })
    .catch(err => {
        console.log("Database connection error:", err);
    });

module.exports = sql;