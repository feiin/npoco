
var questions = [
    {
        type:"input",
        name:"database.host",
        message:"your mysql server address (default:localhost)",
        default:"localhost"
    },
    {
        type:"input",
        name:"schemaName",
        message:"your db schema name: ",
        validate:function(value){
            if(!value){
                return false;
            }
            return true;
        }
    },
    {
        type:"input",
        name:"database.password",
        message:"please input you mysql root password:"
    },
    {
        type:"input",
        name:"connectionStringName",
        message:"web.config/app.config connectionstring name: ",
        default:"PetaPocoDb"
    },

    {
        type:"input",
        name:"repoName",
        message:"generate options: repoName common className: ",
        default:"PetaPocoDb"
    },
    {
        type:"confirm",
        name:"generateCommon",
        message:"generate options: should generate common class :",
        default:true
    },
    {
        type:"input",
        name:"namespace",
        message:"generate options: class's namespace :",
        default:"NPoco"
    },
    {
        type:"input",
        name:"classPrefix",
        message:"generate options:  generate class with prefix,default null :",
        default:""
    },
    {
        type:"input",
        name:"classSuffix",
        message:"generate options:  generate class with suffix,default null :",
        default:""
    },
    {
        type:"input",
        name:"includeViews",
        message:"generate options: should generate with views? :",
        default:false
    },
    {
        type:"confirm",
        name:"trackModifiedColumns",
        message:"generate options: should track modified columns?:",
        default:false
    },{
        type:"confirm",
        name:"generatePocos",
        message:"generate options: should generate poco classes?:",
        default:true
    },{
        type:"confirm",
        name:"generateOperations",
        message:"generate options: should generate operations? :",
        default:true
    }
    ,{
        type:"confirm",
        name:"generate3TierArchitecture",
        message:"generate options: should generate 3-Tier architecture code(with DAL,BLL)? :",
        default:false
    }
    ,{
        type:"input",
        name:"generateFileName",
        message:"generate options: generate code file name  :",
        default:"Database.cs"
    }
];

module.exports = questions;