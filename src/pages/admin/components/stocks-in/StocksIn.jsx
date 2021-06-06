import React, { useState } from "react";
import {
  AddButton,
  ContentContainer,
  LayoutContainer,
  StocksTitle,
} from "./StocksIn.styles";
import StocksInModal from "./components/Modal";
import StocksInTable from "./components/Table";

const StocksIn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [stocksIn, setStocksIn] = useState();

  return (
    <LayoutContainer>
      <ContentContainer>
        <StocksTitle level={2}>Manage Stocks In</StocksTitle>
        <AddButton
          htmlType="button"
          onClick={() => setIsModalVisible(true)}
          type="primary"
        >
          Stock In
        </AddButton>
        <StocksInModal
          stocksIn={stocksIn}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <StocksInTable
          setStocksIn={setStocksIn}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
        />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default StocksIn;
