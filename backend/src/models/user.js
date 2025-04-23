const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database.js');

const User = sequelize.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty: {
                msg: "Nama tidak boleh kosong"
            },
            len:{
                args: [3,50],
                msg: "Panjang nama harus 3-50 karakter"
            }
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})

module.exports = User;