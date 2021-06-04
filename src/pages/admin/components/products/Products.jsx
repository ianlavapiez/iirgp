import React, { useState } from "react";
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

  return (
    <LayoutContainer>
      <ContentContainer>
        <ProductTitle level={2}>Manage Products</ProductTitle>
        <AddButton
          htmlType="button"
          onClick={() => setIsModalVisible(true)}
          type="primary"
        >
          Add Product
        </AddButton>
        <ProductModal
          product={product}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <ProductTable
          setProduct={setProduct}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
        />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Products;
