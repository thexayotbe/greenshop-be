import React, { useState } from "react";
import { Wrapper } from "./style";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { switchAuthModalVisibility } from "../../../redux/modalSlice";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const getUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsError(false);
  };
  const openNotifications = (type) => {
    notification[type]({
      message: `${type === "success" ? "Success" : "Error"}`,
      description: `${
        type === "success"
          ? "You Logged in successfullys"
          : "Username or password incorrect"
      }`,
    });
  };

  const checkHandler = () => {
    setLoading(true);

    if (userData.email && userData.password) {
      axios
        .post(`http://localhost:8080/auth/login`, userData)
        .then(({ data }) => {
          dispatch(switchAuthModalVisibility());
          navigate("/home");
          openNotifications("success");
          setLoading(false);
          signIn({
            auth: {
              token: data.token,
              type: "Bearer",
            },
            expiresIn: 60 * 60 * 3,
            userState: { ...data.data.user },
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          openNotifications("error");
        });
    } else {
      openNotifications("error");
      setIsError(true);
    }
  };
  return (
    <Wrapper>
      <Wrapper.Title>Enter your username and password to login.</Wrapper.Title>
      <Wrapper.Input
        placeholder={"Email"}
        name={"email"}
        autoComplete={"email"}
        onChange={getUserData}
        error={isError ? "true" : undefined}
      />
      <Wrapper.InputPassword
        placeholder={"Password"}
        autoComplete="current-password"
        name={"password"}
        onChange={getUserData}
        error={isError ? "true" : undefined}
        onKeyDown={(e) => (e.key === "Enter" || e.key === 13) && checkHandler()}
      />
      <Wrapper.Forgot>Forgot Password?</Wrapper.Forgot>
      <Wrapper.Button onClick={checkHandler}>
        {loading ? <LoadingOutlined /> : "Login"}
      </Wrapper.Button>
    </Wrapper>
  );
};

export default LogIn;
