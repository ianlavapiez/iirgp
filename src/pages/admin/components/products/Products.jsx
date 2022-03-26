import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  AddButton,
  ProductTitle,
  ContentContainer,
  LayoutContainer,
} from "./Products.styles";
import ProductModal from "./components/Modal";
import ProductTable from "./components/Table";

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [product, setProduct] = useState();

  const componentRef = useRef();

  return (
    <LayoutContainer>
      <ContentContainer>
        <ProductTitle level={2}>Manage Products</ProductTitle>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AddButton
            htmlType="button"
            onClick={() => setIsModalVisible(true)}
            type="primary"
          >
            Add Product
          </AddButton>
          <ReactToPrint
            trigger={() => <AddButton>Print</AddButton>}
            content={() => componentRef.current}
          />
        </div>
        <ProductModal
          product={product}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <ProductTable
          componentRef={componentRef}
          setProduct={setProduct}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
        />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Products;
