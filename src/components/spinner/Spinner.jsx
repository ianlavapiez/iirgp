import React from "react";
import Spin from "antd/es/spin";
import { SpinnerContainer } from "./Spinner.styles";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Spin size="large" />
    </SpinnerContainer>
  );
};

export default Spinner;
