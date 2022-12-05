const Sequelize=require("sequelize");
module.exports=new Sequelize("ele","root","",{
    host:"localhost",
    dialect:"mysql"
})