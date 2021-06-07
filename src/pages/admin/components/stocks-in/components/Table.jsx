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
  deleteStockInRestart,
  deleteStockInStart,
  retrieveStockInsStart,
} from "../../../../../redux/stocks-in/stocks-in.actions";
import {
  selectAllStockIns,
  selectError,
  selectIsActionLoading,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../../../redux/stocks-in/stocks-in.selectors";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { fireAlertWithConfirmation } from "../../../../../components";

export class StocksInTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    stocksIn: [],
  };

  componentDidMount() {
    const { retrieveStockInsStart } = this.props;

    retrieveStockInsStart();
  }

  componentDidUpdate(previousProps) {
    const { deleteStockInRestart, error, isSuccessful } = this.props;

    if (this.props.stocksIn !== previousProps.stocksIn) {
      this.setState({
        stocksIn: this.props.stocksIn,
      });
    }

    if (isSuccessful) {
      deleteStockInRestart();
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
      description: "You have successfully managed a stock in data!",
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
    const { setIsEdit, setStocksIn, setVisible } = this.props;

    setIsEdit(true);
    setStocksIn(data);
    setVisible(true);
  };

  deleteData = (data) => {
    const { deleteStockInStart } = this.props;

    fireAlertWithConfirmation(
      `Are you sure you want to delete the selected stock in details? This action can't be UNDONE!`,
      "The selected stock in details has been successfully deleted!",
      (confirmed) => {
        if (confirmed) {
          deleteStockInStart(data);
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
    const { stocksIn } = this.state;
    const { isActionLoading, isLoading } = this.props;

    const columns = [
      {
        title: "Product Name",
        dataIndex: "selectedProduct",
        key: "selectedProduct",
        ...this.getColumnSearchProps("selectedProduct"),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        ...this.getColumnSearchProps("date"),
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
              dataSource={stocksIn && stocksIn}
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
  stocksIn: selectAllStockIns,
});

const mapDispatchToProps = (dispatch) => ({
  deleteStockInRestart: () => dispatch(deleteStockInRestart()),
  deleteStockInStart: (data) => dispatch(deleteStockInStart(data)),
  retrieveStockInsStart: () => dispatch(retrieveStockInsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StocksInTable);
