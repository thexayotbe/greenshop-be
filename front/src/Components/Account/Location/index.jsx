import React, { useState } from "react";
import { Wrapper } from "../Details/style";
import Button from "../../Generic/Button";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
const Location = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState();
  const goToAddress = (value) => {
    navigate(`/account/location/${value}`);
  };
  return (
    <div>
      {addresses ? (
        addresses.map((value) => {
          return (
            <Wrapper.Addresses>
              <Wrapper.AddressItem>
                <Wrapper.AddressTitle>{value}</Wrapper.AddressTitle>
                <Button onClickFunc={() => goToAddress(value)}>
                  Go to Address
                </Button>
              </Wrapper.AddressItem>
            </Wrapper.Addresses>
          );
        })
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
          <Button onClickFunc={() => navigate("/account/location/new-address")}>
            Create Now
          </Button>
        </Empty>
      )}
    </div>
  );
};

export default Location;
