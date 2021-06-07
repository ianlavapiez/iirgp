import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "antd/es/button";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import Select from "antd/es/select";
import {
  addStockOutRestart,
  addStockOutStart,
  updateStockOutRestart,
  updateStockOutStart,
} from "../../../../../redux/stocks-out/stocks-out.actions";
import {
  selectIsActionLoading,
  selectIsSuccessful,
} from "../../../../../redux/stocks-out/stocks-out.selectors";
import { selectAllCustomers } from "../../../../../redux/customers/customers.selectors";
import { selectAllProducts } from "../../../../../redux/products/products.selectors";
import { fireAlert } from "../../../../../components";

const { Option } = Select;

const StocksOutModal = ({
  addStockOutRestart,
  addStockOutStart,
  customers,
  error,
  isActionLoading,
  isEdit,
  isSuccessful,
  products,
  stocksOut,
  updateStockOutRestart,
  updateStockOutStart,
  visible,
  setIsEdit,
  setVisible,
}) => {
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [productDetails, setProductDetails] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [year, setYear] = useState("");

  const onFinish = (values) => {
    const { quantity } = values;
    const { name, key } = productDetails;
    const id = document.querySelector(".id").value;

    if (parseInt(quantity) <= 0) {
      return fireAlert("Quantity should not be 0.", "warning");
    }

    if (!isEdit) {
      addStockOutStart({
        customer,
        date,
        name,
        month,
        productKey: key,
        quantity,
        year,
      });
    } else {
      updateStockOutStart({
        customer,
        date,
        name,
        id,
        month,
        productKey: key,
        quantity,
        year,
      });
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setVisible(false);
  };

  useEffect(() => {
    if (isSuccessful) {
      setVisible(false);
      setIsEdit(false);
      addStockOutRestart();
      return updateStockOutRestart();
    } else {
      if (error !== null) {
        setVisible(false);
        setIsEdit(false);
      }
    }
  }, [
    addStockOutRestart,
    error,
    isSuccessful,
    updateStockOutRestart,
    setIsEdit,
    setVisible,
  ]);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onCustomerChange = (value) => setCustomer(value);
  const onDateChange = (value, dateString) => {
    setYear(moment(value).year().toString());
    setMonth(moment(value).month().toString());
    setDate(dateString);
  };
  const onProductChange = (value) => setSelectedProduct(value);

  useEffect(() => {
    if (stocksOut) {
      setYear(moment(stocksOut.date).year().toString());
      setMonth(moment(stocksOut.date).month().toString());
    }
  }, [stocksOut]);

  useEffect(() => {
    setProductDetails(
      products.find((product) => product.id === selectedProduct)
    );
  }, [products, selectedProduct]);

  return (
    <Modal
      destroyOnClose
      footer={null}
      title="Manage Stock In Details"
      visible={visible}
      onCancel={handleCancel}
    >
      <Form {...layout} onFinish={onFinish} preserve={false}>
        <Input
          type="hidden"
          readOnly
          value={isEdit ? stocksOut.id : ""}
          name="id"
          className="id"
        />
        <Form.Item
          label="Product Name"
          name="selectedProduct"
          rules={[
            {
              required: true,
              message: "Please select product!",
            },
          ]}
          initialValue={isEdit ? stocksOut.name : ""}
        >
          <Select placeholder="Select a product" onChange={onProductChange}>
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Customer"
          name="customer"
          rules={[
            {
              required: true,
              message: "Please select customer!",
            },
          ]}
          initialValue={isEdit ? stocksOut.customer : ""}
        >
          <Select placeholder="Select a customer" onChange={onCustomerChange}>
            {customers.map((customer) => (
              <Option key={customer.id} value={customer.fullName}>
                {customer.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Stock In Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
          initialValue={isEdit ? moment(stocksOut.date) : ""}
        >
          <DatePicker style={{ width: "100%" }} onChange={onDateChange} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input quantity!",
            },
          ]}
          initialValue={isEdit ? stocksOut.quantity : ""}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 15 }}>
          <Button
            loading={isActionLoading}
            style={{
              borderRadius: 5,
              border: "none",
            }}
            type="primary"
            htmlType="submit"
          >
            {isEdit ? "Update Stock Out" : "Add Stock Out"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  customers: selectAllCustomers,
  isActionLoading: selectIsActionLoading,
  isSuccessful: selectIsSuccessful,
  products: selectAllProducts,
});

const mapDispatchToProps = (dispatch) => ({
  addStockOutRestart: () => dispatch(addStockOutRestart()),
  addStockOutStart: (data) => dispatch(addStockOutStart(data)),
  updateStockOutRestart: () => dispatch(updateStockOutRestart()),
  updateStockOutStart: (data) => dispatch(updateStockOutStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StocksOutModal);
