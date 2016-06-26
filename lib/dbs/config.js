
var config = {
    classPrefix:"",
    classSuffix:"",
    tablePrefix:"",
    schemaName:"",
    includeViews:false,
    repoName:"PetaPocoDb",
    namespace:"NPoco",
    connectionStringName:"PetaPocoDb",
    trackModifiedColumns:false,
    generatePocos:true,
    generateOperations:true,
    generateCommon:true,
    generateFileName:'Database.cs',
    dalNamespace:"DAL",
    bllNamespace:"BLL",
    generate3TierArchitecture:false,
    generateModelWithSingleFile:true,
    dataContract:false,
    outPath:'./',
    database: {
        protocol: "mysql",
        query: { pool: true },
        host: "localhost",
        database: "information_schema",
        user: "root",
        password: ""
    }
};

module.exports = config;