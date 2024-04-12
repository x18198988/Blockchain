

const(createPool) = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'MYSQL@123',
    database: 'test',
    connectionLimit: 10
});

