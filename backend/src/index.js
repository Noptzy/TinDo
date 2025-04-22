const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('../src/config/database.js');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
