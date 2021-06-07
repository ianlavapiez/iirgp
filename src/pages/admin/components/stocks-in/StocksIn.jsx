import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AddButton,
  ContentContainer,
  LayoutContainer,
  StocksTitle,
} from "./StocksIn.styles";
import StocksInModal from "./components/Modal";
import StocksInTable from "./components/Table";
import { retrieveProductsStart } from "../../../../redux/products/products.actions";

const StocksIn = ({ retrieveProductsStart }) => {
  useEffect(() => {
    retrieveProductsStart();
  }, [retrieveProductsStart]);

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

const mapDispatchToProps = (dispatch) => ({
  retrieveProductsStart: () => dispatch(retrieveProductsStart()),
});

export default connect(null, mapDispatchToProps)(StocksIn);
