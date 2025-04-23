const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database.js'); 
const authRoutes = require('./routes/authRoutes.js');


const app = express();
const port = 3000;

const corsOptions = {
    origin: "*",
}

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });
