import axios from "axios";
import { Response } from "express";
import querystring from "querystring";
import { IRequest } from "../types/requestTypes";
import { IGoogleUser } from "../types/userTypes";
const consent_rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

export default {
  googleSetup: (res: Response) => {
    const options = {
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    return res.redirect(`${consent_rootUrl}?${querystring.stringify(options)}`);
  },
  googleGetToken: async (code: string) => {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      grant_type: "authorization_code",
    };
    return await axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  googleGetUser: async ({
    access_token,
    id_token,
    res,
  }: {
    access_token: string;
    id_token: string;
    res: Response;
  }) => {
    console.log("accesstoken", access_token);
    console.log("idtoken", id_token);
    const response = await axios
      .get<IGoogleUser>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      )
      .catch((error: any) => {
        console.error("GOOGLE AUTH ERROR", error);
        return res.redirect(`http://localhost:3000?error=${error.message}`);
      });
    return response?.data;
  },
};
