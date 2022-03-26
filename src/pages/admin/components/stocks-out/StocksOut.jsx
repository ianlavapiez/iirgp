import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
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
  const componentRef = useRef();

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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AddButton
            htmlType="button"
            onClick={() => setIsModalVisible(true)}
            type="primary"
          >
            Stock Out
          </AddButton>
          <ReactToPrint
            trigger={() => <AddButton>Print</AddButton>}
            content={() => componentRef.current}
          />
        </div>
        <StocksOutModal
          stocksOut={stocksOut}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <StocksOutTable
          componentRef={componentRef}
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
