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
  deleteProductRestart,
  deleteProductStart,
  retrieveProductsStart,
} from "../../../../../redux/products/products.actions";
import {
  selectAllProducts,
  selectError,
  selectIsActionLoading,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../../../redux/products/products.selectors";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { fireAlertWithConfirmation } from "../../../../../components";

export class ProductsTable extends React.Component {
  state = {
    products: [],
    searchText: "",
    searchedColumn: "",
  };

  componentDidMount() {
    const { retrieveProductsStart } = this.props;

    retrieveProductsStart();
  }

  componentDidUpdate(previousProps) {
    const { deleteProductRestart, error, isSuccessful } = this.props;

    if (this.props.products !== previousProps.products) {
      this.setState({
        products: this.props.products,
      });
    }

    if (isSuccessful) {
      deleteProductRestart();
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
      description: "You have successfully managed a product data!",
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
    const { setIsEdit, setProduct, setVisible } = this.props;

    setIsEdit(true);
    setProduct(data);
    setVisible(true);
  };

  deleteData = (data) => {
    const { deleteProductStart } = this.props;

    fireAlertWithConfirmation(
      `Are you sure you want to delete the selected product? This action can't be UNDONE!`,
      "The selected product has been successfully deleted!",
      (confirmed) => {
        if (confirmed) {
          deleteProductStart(data);
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
    const { products } = this.state;
    const { isActionLoading, isLoading } = this.props;

    const columns = [
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Size/Color",
        dataIndex: "sizeColor",
        key: "sizeColor",
        ...this.getColumnSearchProps("sizeColor"),
      },
      {
        title: "Stock Number",
        dataIndex: "stockNumber",
        key: "stockNumber",
        ...this.getColumnSearchProps("stockNumber"),
      },
      {
        title: "Current Cost per Unit",
        dataIndex: "currentCost",
        key: "currentCost",
        ...this.getColumnSearchProps("currentCost"),
      },
      {
        title: "Selling Price",
        dataIndex: "sellingPrice",
        key: "sellingPrice",
        ...this.getColumnSearchProps("sellingPrice"),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        ...this.getColumnSearchProps("quantity"),
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
              dataSource={products && products}
              pagination={{ defaultPageSize: 7 }}
            />
          )}
        </Spin>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isActionLoading: selectIsActionLoading,
  isLoading: selectIsLoading,
  isSuccessful: selectIsSuccessful,
  products: selectAllProducts,
});

const mapDispatchToProps = (dispatch) => ({
  deleteProductRestart: () => dispatch(deleteProductRestart()),
  deleteProductStart: (data) => dispatch(deleteProductStart(data)),
  retrieveProductsStart: () => dispatch(retrieveProductsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
