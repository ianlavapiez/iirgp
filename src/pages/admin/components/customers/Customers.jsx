import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
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

  const componentRef = useRef();

  return (
    <LayoutContainer>
      <ContentContainer>
        <CustomerTitle level={2}>Manage Customers</CustomerTitle>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AddButton
            htmlType="button"
            onClick={() => setIsModalVisible(true)}
            type="primary"
          >
            Add Customer
          </AddButton>
          <ReactToPrint
            trigger={() => <AddButton>Print</AddButton>}
            content={() => componentRef.current}
          />
        </div>
        <CustomerModal
          customer={customer}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
        />
        <CustomerTable
          componentRef={componentRef}
          setCustomer={setCustomer}
          setIsEdit={setIsEdit}
          setVisible={setIsModalVisible}
        />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Customers;
