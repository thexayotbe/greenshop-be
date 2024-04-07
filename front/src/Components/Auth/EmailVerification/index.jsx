import React from "react";
import { useSelector } from "react-redux";
import { Modal, Space, Input, Typography } from "antd";
import { Wrapper } from "./style";
const { Title } = Typography;

export const EmailVerification = () => {
  const { emailVerificationModalVisibility } = useSelector(
    (state) => state.modal,
  );

  return (
    <div>
      <Modal
        title="Email Verification"
        open={emailVerificationModalVisibility}
        footer={false}
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid red",
          background: "red",
        }}
      >
        <Space direction="vertical">
          <Title level={5}></Title>
          <Input.OTP
            style={{
              display: "flex",
              justifyContent: "center",
              width: "300px",
              height: "100px",
            }}
          />
        </Space>
      </Modal>
    </div>
  );
};
