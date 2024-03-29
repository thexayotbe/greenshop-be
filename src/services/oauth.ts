import axios from "axios";
import { Response } from "express";
import querystring from "querystring";
import { IGoogleUser } from "../types/userTypes";
import queryStringify from "../utils/queryStringify";
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
  facebookSetUp: (res: Response) => {
    const options = {
      client_id: process.env.FACEBOOK_APP_ID,
      redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
      scope: "email",
    };
    const url = `https://www.facebook.com/v13.0/dialog/oauth?${queryStringify(
      options,
    )}`;
    return res.redirect(url);
  },
  facebookGetToken: async (code: string) => {
    const values = {
      code,
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
    };
    return await axios.get(
      `https://graph.facebook.com/v13.0/oauth/access_token?${queryStringify(
        values,
      )}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      },
    );
  },
  facebookGetUser: async (access_token: string, res: Response) => {
    const response = await axios
      .get(
        `https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`,
      )
      .then((res) => res.data)
      .catch((error: any) =>
        res.redirect(`http://localhost:3000?error=${error.message}`),
      );
    return response;
  },
};
