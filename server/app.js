/** @format */

import express from "express";
import dotenv from "dotenv";
import DataBase from "./database/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const start = async () => {
  try {
    await DataBase.sync();
    await DataBase.authenticate();
    app.listen(PORT, () => console.log("Server Work " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
