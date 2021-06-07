import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AddButton,
  ContentContainer,
  LayoutContainer,
  StocksTitle,
} from "./StocksOut.styles";
import StocksOutModal from "./components/Modal";
import StocksOutTable from "./components/Table";
import { retrieveCustomersStart } from "../../../../redux/customers/customers.actions";
import { retrieveProductsStart } from "../../../../redux/products/products.actions";

const StocksOut = ({ retrieveCustomersStart, retrieveProductsStart }) => {
  useEffect(() => {
    retrieveCustomersStart();
    retrieveProductsStart();
  }, [retrieveCustomersStart, retrieveProductsStart]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [stocksOut, setStocksOut] = useState();

  return (
    <LayoutContainer>
      <ContentContainer>
        <StocksTitle level={2}>Manage Stock Out</StocksTitle>
        <AddButton
          htmlType="button"
          onClick={() => setIsModalVisible(true)}
          type="primary"
        >
          Stock Out
        </AddButton>
        <StocksOutModal
          stocksOut={stocksOut}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <StocksOutTable
          setStocksOut={setStocksOut}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
        />
      </ContentContainer>
    </LayoutContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  retrieveCustomersStart: () => dispatch(retrieveCustomersStart()),
  retrieveProductsStart: () => dispatch(retrieveProductsStart()),
});

export default connect(null, mapDispatchToProps)(StocksOut);
