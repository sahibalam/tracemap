import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });

app.use(
  "/api/auth",
  authRoutes
);
const PORT =
  process.env.PORT || 5001;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});