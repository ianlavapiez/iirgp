import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
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
  const componentRef = useRef();

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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AddButton
            htmlType="button"
            onClick={() => setIsModalVisible(true)}
            type="primary"
          >
            Stock In
          </AddButton>
          <ReactToPrint
            trigger={() => <AddButton>Print</AddButton>}
            content={() => componentRef.current}
          />
        </div>
        <StocksInModal
          stocksIn={stocksIn}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <StocksInTable
          componentRef={componentRef}
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
