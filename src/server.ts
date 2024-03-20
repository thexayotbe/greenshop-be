import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import nodenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";

nodenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(router);

app.listen(process.env.PORT, async () => {
  await mongoose.connect(
    `mongodb+srv://mamajonovxayot0:${process.env.MONGODB_PW}@xayotbek.gau92x8.mongodb.net/users`,
  );
  console.log(`Server is running on port ${process.env.PORT} `);
});
