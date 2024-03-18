import React, { useState } from "react";
import { Wrapper } from "./style";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/icons/logoFull.svg";
import shop from "../../assets/icons/shop.svg";
import login from "../../assets/icons/login.svg";
import search from "../../assets/icons/search.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "../Generic/styles";
import { Badge, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { switchAuthModalVisibility } from "../../redux/modalSlice";
import { UserOutlined } from "@ant-design/icons";
import Links from "./Links";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuToggle, setMenuToggle] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  return (
    <Container>
      <Wrapper>
        <Wrapper.Navbar>
          <Wrapper.Logo src={logo} onClick={() => navigate("/")} />
          <Links />
          <Wrapper.Btns>
            <Wrapper.Icon src={search} />
            <Badge count={0}>
              <Wrapper.Icon src={shop} onClick={() => navigate("/shop-card")} />
            </Badge>
            {isAuthed ? (
              <Wrapper.ProfileBtn onClick={() => navigate("/account")}>
                <UserOutlined />
              </Wrapper.ProfileBtn>
            ) : (
              <Wrapper.LoginBtn
                onClick={() => dispatch(switchAuthModalVisibility())}
              >
                <Wrapper.Icon src={login} /> Login
              </Wrapper.LoginBtn>
            )}
            <MenuOutlined
              className="icon"
              onClick={() => setMenuToggle(true)}
            />
            <Modal
              open={menuToggle}
              width={900}
              footer={false}
              title="Site Menu"
              onCancel={() => setMenuToggle(false)}
            >
              <Links mobile={true} />
              <Wrapper.LoginBtn
                mobile={true}
                onClick={() => {
                  setMenuToggle(false);
                  dispatch(switchAuthModalVisibility());
                }}
              >
                <Wrapper.Icon src={login} /> Login
              </Wrapper.LoginBtn>
            </Modal>
          </Wrapper.Btns>
        </Wrapper.Navbar>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default Navbar;
