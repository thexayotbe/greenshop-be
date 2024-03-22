import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import nodenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

nodenv.config();

const app: Application = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: "http://localhost:8080/oauth/google/callback",
    },
    (accessToken, refreshToken, profile: Profile, done) => {
      // Use the profile information (e.g., profile.id, profile.displayName) to create or update a user in your database
      // Call done() with the user object when done
      return done(null, profile);
    },
  ),
);
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Middlewares
app.use(passport.initialize());
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
