import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import nodenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";
import cookieSeccion from "cookie-session";
import passport from "passport";
nodenv.config();

const app: Application = express();

// Middlewares
app.use(router);
app.use(express.urlencoded());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  cookieSeccion({
    name: "cookie",
    keys: ["xayot"],
    maxAge: 100 * 60 * 60 * 24 * 3,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT, async () => {
  await mongoose.connect(
    `mongodb+srv://mamajonovxayot0:${process.env.MONGODB_PW}@xayotbek.gau92x8.mongodb.net/users`,
  );

  console.log(`Server is running on port ${process.env.PORT} `);
});
