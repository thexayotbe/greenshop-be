import React from "react";
import { Wrapper } from "../style";

const Links = ({ mobile }) => {
  return (
    <Wrapper.Links mobile={mobile}>
      <Wrapper.Link>Home</Wrapper.Link>
      <Wrapper.Link>Shop</Wrapper.Link>
      <Wrapper.Link>Plant Care</Wrapper.Link>
      <Wrapper.Link>Blogs</Wrapper.Link>
    </Wrapper.Links>
  );
};

export default Links;
