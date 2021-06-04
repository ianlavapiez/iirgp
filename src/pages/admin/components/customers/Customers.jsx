import React, { useState } from "react";
import {
  AddButton,
  CustomerTitle,
  ContentContainer,
  LayoutContainer,
} from "./Customers.styles";
import CustomerModal from "./components/Modal";
import CustomerTable from "./components/Table";

const Customers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState();

  return (
    <LayoutContainer>
      <ContentContainer>
        <CustomerTitle level={2}>Manage Customers</CustomerTitle>
        <AddButton
          htmlType="button"
          onClick={() => setIsModalVisible(true)}
          type="primary"
        >
          Add Customer
        </AddButton>
        <CustomerModal
          customer={customer}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <CustomerTable
          setCustomer={setCustomer}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
        />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Customers;
