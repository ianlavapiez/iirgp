import styled from "styled-components";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Text from "antd/es/typography/Text";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled(Form)`
  width: 100%;
  padding: 2rem;
`;

export const HeaderText = styled(Text)`
  text-align: center;
`;

export const Image = styled.img`
  height: 200px;
  width: auto;
  margin-bottom: 1rem;

  @media screen and (max-width: 495px) {
    height: 150px;
  }

  @media screen and (max-width: 380px) {
    height: 120px;
  }
`;

export const InputContainer = styled(Input)`
  padding: 0.7rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

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

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  width: 40vw;
  padding: 1rem;

  @media screen and (max-width: 1110px) {
    width: 70vw;
  }

  @media screen and (max-width: 660px) {
    width: 90vw;
  }
`;
