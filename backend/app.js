require("dotenv").config();

const express = require("express");
const databaseConnection = require("./databaseConnection/databaseConnection");
const app = express();
const fabricRoutes = require("./routes/route");
const cors = require('cors');

const port = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());
 
app.use('/api/v1', fabricRoutes); 

 
const start = async () => {
  try {
    await databaseConnection(process.env.MONGO);
    app.listen(port, () => {
      console.log(`Connected to PORT:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(); 
 