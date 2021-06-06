import styled from "styled-components";
import Button from "antd/es/button";
import Layout, { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

export const AddButton = styled(Button)`
  width: 15vw;
  text-align: center;
  margin: 10px;
`;

export const ContentContainer = styled(Content)`
  display: flex;
  flex-direction: column;
`;

export const LayoutContainer = styled(Layout)`
  padding: 24px;
`;

export const StocksTitle = styled(Title)`
  padding-left: 14px;
`;
