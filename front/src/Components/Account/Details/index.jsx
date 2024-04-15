import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "./style";
import Button from "../../Generic/Button";
import foto from "../../../assets/icons/photo.svg";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
const Details = () => {
  const { _id } = useAuthUser();
  const [userData, setUserData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };

  const handleLabelClick = () => {
    inputRef.current.click();
  };
  const getUserData = (e) => {
    setUserData((previesData) => ({
      ...previesData,
      [e.target.name]: e.target.value,
    }));
  };
  const getPasswordData = (e) => {
    setPasswordData((previesData) => ({
      ...previesData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    axios.get(`http://localhost:8080/user/get/${_id}`).then(({ data }) => {
      setUserData(data.data);
    });
  }, []);

  const updateUser = () => {
    axios
      .post(`http://localhost:8080/user/update/${_id}`, {
        ...userData,
        password: passwordData,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Wrapper>
      <Wrapper.Title>Personal Information</Wrapper.Title>
      <Wrapper.Form>
        <Wrapper.Item>
          <Wrapper.Label>
            First Name
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            value={userData.firstName}
            name="firstName"
            onChange={getUserData}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Last Name
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            value={userData.lastName}
            name="lastName"
            onChange={getUserData}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Email address
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            value={userData.email}
            name="email"
            onChange={getUserData}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Phone Number
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.SelectWr>
            <Wrapper.Select
              defaultValue={"+998"}
              options={[
                { label: "+998", value: "+998" },
                { label: "+1", value: "+1" },
                { label: "+7", value: "+7" },
                { label: "+44", value: "+44" },
                { label: "+996", value: "+996" },
                { label: "+38", value: "+38" },
                { label: "+22", value: "+22" },
              ]}
              s
            />
            <Wrapper.Input
              value={userData.phoneNumber}
              name="phoneNumber"
              onChange={getUserData}
            />
          </Wrapper.SelectWr>
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Username
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            value={userData.username}
            name="username"
            onChange={getUserData}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Photo
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.FotoWr>
            <Wrapper.Foto
              width={50}
              height={50}
              src={preview ? preview : foto}
            />
            <Wrapper.FotoInput
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              ref={inputRef}
            />

            <Wrapper.LabelImg onClick={handleLabelClick} preview={preview}>
              {preview ? "Change" : "Select"}
            </Wrapper.LabelImg>

            <Wrapper.BtnRemove onClick={() => setPreview(null)}>
              Remove
            </Wrapper.BtnRemove>
          </Wrapper.FotoWr>
        </Wrapper.Item>
      </Wrapper.Form>
      <Wrapper.Title>Password change</Wrapper.Title>
      <Wrapper.Form column>
        <Wrapper.Item>
          <Wrapper.Label>Current password</Wrapper.Label>
          <Wrapper.Password
            value={passwordData.currentPassword}
            name="currentPassword"
            onChange={getPasswordData}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>New password</Wrapper.Label>
          <Wrapper.Password
            value={passwordData.newPassword}
            name="newPassword"
            onChange={getPasswordData}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>Confirm new password</Wrapper.Label>
          <Wrapper.Password
            value={passwordData.passwordConfirm}
            name="passwordConfirm"
            onChange={getPasswordData}
          />
        </Wrapper.Item>
      </Wrapper.Form>
      <Button widthBtn={"131px"} heightBtn={"40px"} onClickFunc={updateUser}>
        Save Change
      </Button>
    </Wrapper>
  );
};

export default Details;
