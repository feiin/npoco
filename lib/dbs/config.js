
var config = {
    classPrefix:"",
    classSuffix:"",
    schemaName:"",
    includeViews:false,
    database: {
        protocol: "mysql",
        query: { pool: true },
        host: "localhost",
        database: "information_schema",
        user: "root",
        password: "123"
    }
};

module.exports = config;