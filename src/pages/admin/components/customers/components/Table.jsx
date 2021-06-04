import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Input from "antd/es/input";
import Menu from "antd/es/menu";
import notification from "antd/es/notification";
import Skeleton from "antd/es/skeleton";
import Space from "antd/es/space";
import Spin from "antd/es/spin";
import Table from "antd/es/table";
import Highlighter from "react-highlight-words";
import {
  deleteCustomerRestart,
  deleteCustomerStart,
  retrieveCustomersStart,
} from "../../../../../redux/customers/customers.actions";
import {
  selectAllCustomers,
  selectError,
  selectIsActionLoading,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../../../redux/customers/customers.selectors";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { fireAlertWithConfirmation } from "../../../../../components";

export class CustomerTable extends React.Component {
  state = {
    customers: [],
    searchText: "",
    searchedColumn: "",
  };

  componentDidMount() {
    const { retrieveCustomersStart } = this.props;

    retrieveCustomersStart();
  }

  componentDidUpdate(previousProps) {
    const { deleteCustomerRestart, error, isSuccessful } = this.props;

    if (this.props.customers !== previousProps.customers) {
      this.setState({
        customers: this.props.customers,
      });
    }

    if (isSuccessful) {
      deleteCustomerRestart();
      this.openNotificationSuccess();
    }

    if (error !== null) {
      this.openNotificationError(error);
    }
  }

  openNotificationSuccess = () => {
    notification.success({
      message: `Success!`,
      duration: 5,
      description: "You have successfully managed a customer data!",
      placement: "topRight",
    });
  };

  openNotificationError = (message) => {
    notification.error({
      message: `Uh-oh!`,
      duration: 5,
      description: message,
      placement: "topRight",
    });
  };

  updateData = (data) => {
    const { setIsEdit, setCustomer, setVisible } = this.props;

    setIsEdit(true);
    setCustomer(data);
    setVisible(true);
  };

  deleteData = (candidate) => {
    const { deleteCustomerStart } = this.props;

    fireAlertWithConfirmation(
      `Are you sure you want to delete the selected customer? This action can't be UNDONE!`,
      "The selected customer has been successfully deleted!",
      (confirmed) => {
        if (confirmed) {
          deleteCustomerStart(candidate);
        } else {
          return false;
        }
      }
    );
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (this.searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { customers } = this.state;
    const { isActionLoading, isLoading } = this.props;

    const columns = [
      {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
        ...this.getColumnSearchProps("fullName"),
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address"),
      },
      {
        title: "Contact Number",
        dataIndex: "contactNumber",
        key: "contactNumber",
        ...this.getColumnSearchProps("contactNumber"),
      },
      {
        title: "Action",
        key: "action",
        render: (data) => (
          <span>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.updateData(data)}>
                    <EditOutlined /> Update
                  </Menu.Item>
                  <Menu.Item onClick={() => this.deleteData(data)}>
                    <DeleteOutlined /> Delete
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button type="default" icon={<MoreOutlined />} />
            </Dropdown>
          </span>
        ),
      },
    ];
    return (
      <Fragment>
        <Spin spinning={isActionLoading}>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <Table
              columns={columns}
              dataSource={customers && customers}
              pagination={{ defaultPageSize: 7 }}
            />
          )}
        </Spin>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  customers: selectAllCustomers,
  error: selectError,
  isActionLoading: selectIsActionLoading,
  isLoading: selectIsLoading,
  isSuccessful: selectIsSuccessful,
});

const mapDispatchToProps = (dispatch) => ({
  deleteCustomerRestart: () => dispatch(deleteCustomerRestart()),
  deleteCustomerStart: (data) => dispatch(deleteCustomerStart(data)),
  retrieveCustomersStart: () => dispatch(retrieveCustomersStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
