import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import {
  addProductRestart,
  addProductStart,
  updateProductRestart,
  updateProductStart,
} from "../../../../../redux/products/products.actions";
import {
  selectIsActionLoading,
  selectIsSuccessful,
} from "../../../../../redux/products/products.selectors";
import { fireAlert } from "../../../../../components";

const ProductModal = ({
  addProductRestart,
  addProductStart,
  product,
  error,
  isActionLoading,
  isEdit,
  isSuccessful,
  updateProductRestart,
  updateProductStart,
  visible,
  setIsEdit,
  setVisible,
}) => {
  const onFinish = (values) => {
    const { currentCost, name, sellingPrice, sizeColor, stockNumber } = values;
    const id = document.querySelector(".id").value;

    if (parseInt(currentCost) >= parseInt(sellingPrice)) {
      return fireAlert(
        "Current Cost per Unit should not be greater than or equal to Selling Price.",
        "warning"
      );
    }

    if (!isEdit) {
      addProductStart({
        currentCost,
        name,
        sellingPrice,
        sizeColor,
        stockNumber,
      });
    } else {
      updateProductStart({
        currentCost,
        id,
        name,
        sellingPrice,
        sizeColor,
        stockNumber,
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
      addProductRestart();
      return updateProductRestart();
    } else {
      if (error !== null) {
        setVisible(false);
        setIsEdit(false);
      }
    }
  }, [
    addProductRestart,
    error,
    isSuccessful,
    updateProductRestart,
    setIsEdit,
    setVisible,
  ]);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <Modal
      destroyOnClose
      footer={null}
      title="Manage Product Details"
      visible={visible}
      onCancel={handleCancel}
    >
      <Form {...layout} onFinish={onFinish} preserve={false}>
        <Input
          type="hidden"
          readOnly
          value={isEdit ? product.id : ""}
          name="id"
          className="id"
        />
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
          initialValue={isEdit ? product.name : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Size/Color"
          name="sizeColor"
          rules={[
            {
              required: false,
            },
          ]}
          initialValue={isEdit ? product.sizeColor : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stock Number"
          name="stockNumber"
          rules={[
            {
              required: true,
              message: "Please input stock number!",
            },
          ]}
          initialValue={isEdit ? product.stockNumber : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Current Cost per Unit"
          name="currentCost"
          rules={[
            {
              required: true,
              message: "Please input current cost per unit!",
            },
          ]}
          initialValue={isEdit ? product.currentCost : ""}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Selling Price"
          name="sellingPrice"
          rules={[
            {
              required: true,
              message: "Please input selling price!",
            },
          ]}
          initialValue={isEdit ? product.sellingPrice : ""}
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
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  isActionLoading: selectIsActionLoading,
  isSuccessful: selectIsSuccessful,
});

const mapDispatchToProps = (dispatch) => ({
  addProductRestart: () => dispatch(addProductRestart()),
  addProductStart: (data) => dispatch(addProductStart(data)),
  updateProductRestart: () => dispatch(updateProductRestart()),
  updateProductStart: (data) => dispatch(updateProductStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
