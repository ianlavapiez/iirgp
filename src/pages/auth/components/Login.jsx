import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  emailSignInStart,
  signOutStart,
  userRestart,
} from "../../../redux/user/user.actions";
import {
  selectCurrentUser,
  selectError,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../redux/user/user.selectors";
import Form from "antd/es/form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  ButtonContainer,
  Container,
  FormContainer,
  HeaderText,
  Image,
  InputContainer,
  LoginButton,
  LoginContainer,
} from "./Login.styles";
import { fireAlert } from "../../../components";
import IIRGPLogo from "../../../assets/main-logo.png";

const Login = ({
  emailSignInStart,
  error,
  idNumberSignInStart,
  history,
  isLoading,
  isSuccessful,
  signOutStart,
  user,
  userRestart,
}) => {
  const onFinish = ({ email, password }) => {
    emailSignInStart(email, password);
  };

  useEffect(() => {
    if (isSuccessful) {
      if (user !== null) {
        fireAlert(`Welcome, ${user.displayName}!`, "success");

        userRestart();

        return history.push({
          pathname: "/admin",
          state: {
            user: "admin",
          },
        });
      }
    } else {
      if (error !== null) {
        return fireAlert(error, "warning");
      }
    }
  }, [error, history, isSuccessful, signOutStart, user, userRestart]);

  return (
    <Container>
      <LoginContainer>
        <Image alt="IIRGP Logo" src={IIRGPLogo} />
        <HeaderText>Welcome, please login your account!</HeaderText>
        <FormContainer className="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputContainer
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <InputContainer
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <ButtonContainer>
              <LoginButton
                className="login-form-button"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Log in
              </LoginButton>
            </ButtonContainer>
          </Form.Item>
        </FormContainer>
      </LoginContainer>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isLoading: selectIsLoading,
  isSuccessful: selectIsSuccessful,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  signOutStart: () => dispatch(signOutStart()),
  userRestart: () => dispatch(userRestart()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Login);
