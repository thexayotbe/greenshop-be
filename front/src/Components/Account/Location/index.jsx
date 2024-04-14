import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import Button from "../../Generic/Button";
import { Wrapper } from "../Details/style";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const Location = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState();
  const { _id } = useAuthUser();

  const goToAddress = (value) => {
    navigate(`/account/location/${value}`);
  };
  const addNewAddress = () => {
    navigate("/account/location/new-address");
  };
  const deleteAddress = (id) => {
    axios
      .delete(`http://localhost:8080/address/delete/${_id}/${id}`)
      .then((response) => {
        setAddresses(addresses.filter((value) => value._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/address/get-addresses/${_id}`)
      .then(({ data }) => {
        setAddresses(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {addresses ? (
        <Wrapper.Addresses>
          {addresses.map((value) => {
            return (
              <Wrapper.AddressItem>
                <Wrapper.AddressTitle>
                  {value.streetAddress}
                </Wrapper.AddressTitle>
                <Wrapper.Buttons>
                  <EditOutlined
                    onClick={() => goToAddress(value._id)}
                    style={{ color: "blue" }}
                  />

                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => deleteAddress(value._id)}
                  />
                </Wrapper.Buttons>
              </Wrapper.AddressItem>
            );
          })}
          <Button
            widthBtn={"100%"}
            margin={"50px 0"}
            onClickFunc={addNewAddress}
          >
            Add New Address
          </Button>
        </Wrapper.Addresses>
      ) : (
        <Empty
          style={{
            width: "900px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 100,
          }}
          description={<span>There is no any addresses</span>}
        >
          <Button onClickFunc={addNewAddress}>Create Now</Button>
        </Empty>
      )}
    </div>
  );
};

export default Location;
