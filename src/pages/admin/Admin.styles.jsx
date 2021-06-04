import styled from "styled-components";
import Button from "antd/es/button";
import Layout, { Header } from "antd/es/layout/layout";

export const UserButtonContainer = styled(Button)`
  margin-top: -10px;
`;

export const HeaderContainer = styled(Header)`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
`;

export const LayoutContainer = styled(Layout)`
  height: 100vh;
`;
