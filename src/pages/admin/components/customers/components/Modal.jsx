import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import TextArea from "antd/es/input/TextArea";
import {
  addCustomerRestart,
  addCustomerStart,
  updateCustomerRestart,
  updateCustomerStart,
} from "../../../../../redux/customers/customers.actions";
import {
  selectIsActionLoading,
  selectIsSuccessful,
} from "../../../../../redux/customers/customers.selectors";

const CustomerModal = ({
  addCustomerRestart,
  addCustomerStart,
  customer,
  error,
  isActionLoading,
  isEdit,
  isSuccessful,
  updateCustomerRestart,
  updateCustomerStart,
  visible,
  setIsEdit,
  setVisible,
}) => {
  const onFinish = (values) => {
    const { address, contactNumber, fullName } = values;
    const id = document.querySelector(".id").value;

    if (!isEdit) {
      addCustomerStart({ address, contactNumber, fullName });
    } else {
      updateCustomerStart({ address, contactNumber, fullName, id });
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
      addCustomerRestart();
      return updateCustomerRestart();
    } else {
      if (error !== null) {
        setVisible(false);
        setIsEdit(false);
      }
    }
  }, [
    addCustomerRestart,
    error,
    isSuccessful,
    updateCustomerRestart,
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
      title="Manage Customer Details"
      visible={visible}
      onCancel={handleCancel}
    >
      <Form {...layout} onFinish={onFinish} preserve={false}>
        <Input
          type="hidden"
          readOnly
          value={isEdit ? customer.id : ""}
          name="id"
          className="id"
        />
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input full name!",
            },
          ]}
          initialValue={isEdit ? customer.fullName : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input address!",
            },
          ]}
          initialValue={isEdit ? customer.address : ""}
        >
          <TextArea cols={3} rows={3} />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please input contact number!",
            },
          ]}
          initialValue={isEdit ? customer.contactNumber : ""}
        >
          <Input />
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
            {isEdit ? "Update Customer" : "Add Customer"}
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
  addCustomerRestart: () => dispatch(addCustomerRestart()),
  addCustomerStart: (data) => dispatch(addCustomerStart(data)),
  updateCustomerRestart: () => dispatch(updateCustomerRestart()),
  updateCustomerStart: (data) => dispatch(updateCustomerStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModal);
