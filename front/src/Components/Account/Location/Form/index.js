import { Wrapper } from "../../Details/style";
import Button from "../../../Generic/Button";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Form = () => {
  const [address, setAddress] = useState({});
  const [countryCode, setCountryCode] = useState("+998");
  const { _id } = useAuthUser();
  const { billingAddressId } = useParams();
  const getAddressData = (e) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [e.target.name]: e.target.value,
    }));
  };

  const saveData = () => {
    if (billingAddressId) {
      axios.post(
        `http://localhost:8080/address/update/${_id}/${billingAddressId}`,
        {
          ...address,
          phoneNumber: countryCode + address.phoneNumber,
        },
      );
    } else {
      axios.post(`http://localhost:8080/address/create/${_id}`, {
        ...address,
        phoneNumber: countryCode + address.phoneNumber,
      });
    }
  };
  useEffect(() => {
    console.log(22, billingAddressId);
    if (billingAddressId) {
      axios
        .get(
          `http://localhost:8080/address/get-address/${_id}/${billingAddressId}`,
        )
        .then(({ data }) => {
          setAddress(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  return (
    <Wrapper>
      <Wrapper.Title>Billing Address</Wrapper.Title>
      <Wrapper.InfoText>
        The following addresses will be used on the checkout page by default.
      </Wrapper.InfoText>
      <Wrapper.Form>
        <Wrapper.Item>
          <Wrapper.Label>
            First Name
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="firstName"
            onChange={getAddressData}
            value={address.firstName}
            required
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Last Name
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="lastName"
            onChange={getAddressData}
            value={address.lastName}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Country / Region
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="country"
            onChange={getAddressData}
            value={address.country}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Town / City
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="city"
            onChange={getAddressData}
            value={address.city}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Street Address
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            placeholder="House number and street name"
            name="streetAddress"
            onChange={getAddressData}
            value={address.streetAddress}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            {" "}
            <Wrapper.Require></Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="extraAddress"
            placeholder="Appartment, suite, unit, etc. (optional)"
            onChange={getAddressData}
            value={address.extraAddress}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            State
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="state"
            onChange={getAddressData}
            value={address.state}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Zip
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="zip"
            onChange={getAddressData}
            value={address.zip}
          />
        </Wrapper.Item>
        <Wrapper.Item>
          <Wrapper.Label>
            Email address
            <Wrapper.Require>*</Wrapper.Require>
          </Wrapper.Label>
          <Wrapper.Input
            name="emailAddress"
            onChange={getAddressData}
            value={address.emailAddress}
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
              value={countryCode}
              onChange={(e) => setCountryCode(e)}
              options={[
                { label: "+998", value: "+998" },
                { label: "+1", value: "+1" },
                { label: "+7", value: "+7" },
                { label: "+44", value: "+44" },
                { label: "+996", value: "+996" },
                { label: "+38", value: "+38" },
                { label: "+22", value: "+22" },
              ]}
            />
            <Wrapper.Input
              name="phoneNumber"
              onChange={getAddressData}
              value={address.phoneNumber}
            />
          </Wrapper.SelectWr>
        </Wrapper.Item>
      </Wrapper.Form>
      <Button widthBtn={"131px"} heightBtn={"40px"} onClickFunc={saveData}>
        Save Change
      </Button>
    </Wrapper>
  );
};

export default Form;
