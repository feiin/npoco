
var config = {
    classPrefix:"",
    classSuffix:"",
    schemaName:"",
    includeViews:false,
    repoName:"PetaPocoDb",
    connectionStringName:"PetaPocoDb",
    trackModifiedColumns:false,
    generatePocos:true,
    generateOperations:true,
    generateCommon:true,
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