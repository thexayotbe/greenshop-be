import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import nodenv from "dotenv";
import router from "./routes";

nodenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
