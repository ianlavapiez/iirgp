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
  addStockInRestart,
  addStockInStart,
  updateStockInRestart,
  updateStockInStart,
} from "../../../../../redux/stocks-in/stocks-in.actions";
import {
  selectIsActionLoading,
  selectIsSuccessful,
} from "../../../../../redux/stocks-in/stocks-in.selectors";
import { selectAllProducts } from "../../../../../redux/products/products.selectors";
import { fireAlert } from "../../../../../components";
import { updateQuantityStart } from "../../../../../redux/products/products.actions";

const { Option } = Select;

const StocksInModal = ({
  addStockInRestart,
  addStockInStart,
  error,
  isActionLoading,
  isEdit,
  isSuccessful,
  products,
  stocksIn,
  updateStockInRestart,
  updateStockInStart,
  updateQuantityStart,
  visible,
  setIsEdit,
  setVisible,
}) => {
  const [date, setDate] = useState(isEdit ? stocksIn.date : "");
  const [month, setMonth] = useState("");
  const [productDetails, setProductDetails] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [year, setYear] = useState("");

  const onFinish = (values) => {
    const { quantity } = values;
    const { name, key, quantity: productQuantity } = productDetails;
    const id = document.querySelector(".id").value;

    if (parseInt(quantity) <= 0) {
      return fireAlert("Quantity should not be 0.", "warning");
    }

    if (!isEdit) {
      const totalQuantity = +productQuantity + +quantity;

      addStockInStart({
        date,
        month,
        name,
        productKey: key,
        quantity,
        year,
      });
      updateQuantityStart({
        id: key,
        quantity: totalQuantity,
      });
    } else {
      if (parseInt(stocksIn.quantity) === parseInt(quantity)) {
        updateStockInStart({
          date,
          id,
          month,
          name,
          productKey: key,
          quantity,
          year,
        });
      } else if (parseInt(stocksIn.quantity) > parseInt(quantity)) {
        const toBeAddedQuantity =
          parseInt(stocksIn.quantity) - parseInt(quantity);
        const storeQuantity = parseInt(productQuantity) - toBeAddedQuantity;

        updateStockInStart({
          date,
          id,
          month,
          name,
          productKey: key,
          quantity,
          year,
        });

        updateQuantityStart({
          id: key,
          quantity: storeQuantity,
        });
      } else {
        const toBeAddedQuantity =
          parseInt(quantity) - parseInt(stocksIn.quantity);
        const storeQuantity = parseInt(productQuantity) + toBeAddedQuantity;

        updateStockInStart({
          date,
          id,
          month,
          name,
          productKey: key,
          quantity,
          year,
        });

        updateQuantityStart({
          id: key,
          quantity: storeQuantity,
        });
      }
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
      addStockInRestart();
      return updateStockInRestart();
    } else {
      if (error !== null) {
        setVisible(false);
        setIsEdit(false);
      }
    }
  }, [
    addStockInRestart,
    error,
    isSuccessful,
    updateStockInRestart,
    setIsEdit,
    setVisible,
  ]);

  useEffect(() => {
    if (isEdit) {
      if (stocksIn.date) {
        setDate(stocksIn.date);
        setYear(moment(stocksIn.date).year().toString());
        setMonth(moment(stocksIn.date).month().toString());
      }
    }
  }, [isEdit, stocksIn]);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onDateChange = (value, dateString) => {
    setYear(moment(value).year().toString());
    setMonth(moment(value).month().toString());
    setDate(dateString);
  };
  const onProductChange = (value) => setSelectedProduct(value);

  useEffect(() => {
    if (stocksIn) {
      setYear(moment(stocksIn.date).year().toString());
      setMonth(moment(stocksIn.date).month().toString());
    }
  }, [stocksIn]);

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
          value={isEdit ? stocksIn.id : ""}
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
          initialValue={isEdit ? stocksIn.selectedProduct : ""}
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
          label="Stock In Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
          initialValue={isEdit ? moment(stocksIn.date) : ""}
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
          initialValue={isEdit ? stocksIn.quantity : ""}
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
            {isEdit ? "Update Stock In" : "Add Stock In"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  isActionLoading: selectIsActionLoading,
  isSuccessful: selectIsSuccessful,
  products: selectAllProducts,
});

const mapDispatchToProps = (dispatch) => ({
  addStockInRestart: () => dispatch(addStockInRestart()),
  addStockInStart: (data) => dispatch(addStockInStart(data)),
  updateStockInRestart: () => dispatch(updateStockInRestart()),
  updateStockInStart: (data) => dispatch(updateStockInStart(data)),
  updateQuantityStart: (data) => dispatch(updateQuantityStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StocksInModal);
