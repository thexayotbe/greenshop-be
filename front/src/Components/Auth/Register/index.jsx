import React, { useState } from "react";
import { Wrapper } from "../Login/style";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import {
  switchAuthModalVisibility,
  switchEmailVerificationModalVisibility,
} from "../../../redux/modalSlice";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { Space } from "antd";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailVerify, setEmailVerify] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getUserDate = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsError(false);
  };
  const getCode = (e) => {
    setUserData({ ...userData, userVerificationCode: e });
  };
  const openNotifications = (type) => {
    notification[type]({
      message: `${type === "success" ? "Success" : "Error"}`,
      description: `${
        type === "success"
          ? "You Signed in successfully"
          : "Please cheack all inputs and passwords"
      }`,
    });
  };
  const emailVerificationSend = (type) => {
    notification[type]({
      message: `success`,
      description: `We have send code to your email`,
    });
  };
  const addUserHandler = () => {
    setLoading(true);
    let dataStatus = Object.values(userData).every((value) => value);
    console.log(userData);
    if (dataStatus) {
      axios
        .post(`http://localhost:8080/auth/register`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setEmailVerify(true);
          emailVerificationSend("success");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          openNotifications("error");
        });
    } else {
      setLoading(false);
      setIsError(true);
      openNotifications("error");
    }
  };
  const verifyUser = () => {
    axios
      .post("http://localhost:8080/auth/verify-email", userData)
      .then((response) => {
        // setEmailVerify(true);
        // emailVerificationSend("success");
        dispatch(switchAuthModalVisibility());
        setLoading(false);
        openNotifications("success");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        openNotifications("error");
      });
  };
  const resendEmail = () => {
    axios
      .post("http://localhost:8080/auth/resend-email", userData)
      .then((response) => {
        emailVerificationSend("success");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        openNotifications("error");
      });
  };

  return (
    <Wrapper>
      <Wrapper.Title>Enter your email and password to register.</Wrapper.Title>

      <Wrapper.Input
        placeholder={"Username"}
        name={"username"}
        onChange={getUserDate}
        value={userData.username}
        error={isError ? "true" : undefined}
      />
      <Wrapper.Input
        placeholder={"Enter your email address"}
        autoComplete={"emai"}
        name={"email"}
        onChange={getUserDate}
        value={userData.email}
        error={isError ? "true" : undefined}
      />
      <Wrapper.InputPassword
        placeholder={"Password"}
        autoComplete="current-password"
        name={"password"}
        onChange={getUserDate}
        value={userData.password}
        error={isError ? "true" : undefined}
      />
      <Wrapper.InputPassword
        placeholder={"Confirm Password"}
        autoComplete="current-password"
        name={"passwordConfirm"}
        value={getUserDate.passwordConfirm}
        onChange={getUserDate}
        error={isError ? "true" : undefined}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === 13) && addUserHandler()
        }
      />
      {emailVerify && (
        <Space direction="horizontal">
          <Wrapper.Input.OTP
            style={{
              display: "flex",
              justifyContent: "center",
              width: "210px",
              height: "100px",
            }}
            name={"userVerificationCode"}
            onChange={getCode}
            value={getUserDate.userVerificationCode}
          />
          <Wrapper.SendCode
            style={{ width: 80, background: "#46a358" }}
            onClick={resendEmail}
          >
            Resend Code
          </Wrapper.SendCode>
        </Space>
      )}
      <Wrapper.Button onClick={emailVerify ? verifyUser : addUserHandler}>
        {loading ? <LoadingOutlined /> : "Register"}
      </Wrapper.Button>
    </Wrapper>
  );
};

export default SignIn;
