import React from "react";
import Result from "antd/es/result";
import { LoginButton } from "./404.styles";

const FourOFourPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <LoginButton
          onClick={() => (window.location.href = "/")}
          type="primary"
        >
          Back to Login
        </LoginButton>
      }
    />
  );
};

export default FourOFourPage;
