import styled from "styled-components";
import Button from "antd/es/button";

export const LoginButton = styled(Button)`
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  background-color: black;
  border-color: black;

  &:focus {
    background-color: black;
    border-color: black;
    color: white;
  }

  &:hover {
    background-color: white;
    color: black;
    border-color: black;
  }
`;
