import React, { useEffect, useState } from "react";
import Dropdown from "antd/es/dropdown";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import notification from "antd/es/notification";
import Title from "antd/es/typography/Title";
import {
  DownOutlined,
  InboxOutlined,
  SettingOutlined,
  TeamOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { fireAlert } from "../../components";
import {
  HeaderContainer,
  LayoutContainer,
  UserButtonContainer,
} from "./Admin.styles";
import Customers from "./components/customers/Customers";
import Products from "./components/products/Products";
import StocksIn from "./components/stocks-in/StocksIn";

const { Sider } = Layout;

const AdminPage = ({ history, user }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("customers");

  useEffect(() => {
    if (history.location.state && history.location.state.user === "admin") {
      return;
    } else {
      fireAlert("Unauthorized login.", "warning");
      return history.push("/login");
    }
  }, [history]);

  const logout = () => {
    return history.push({
      pathname: "/login",
      state: {
        user: "",
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>Sign Out</Menu.Item>
    </Menu>
  );

  const openNotificationSuccess = () => {
    notification.success({
      message: `Success!`,
      duration: 5,
      description: "You have successfully logged out!",
      placement: "topRight",
    });
  };

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  useEffect(() => {
    if (user === null) {
      openNotificationSuccess();
      return history.push("/admin/login");
    }
  }, [history, user]);

  return (
    <LayoutContainer>
      <HeaderContainer className="header">
        <Title
          style={{
            color: "white",
          }}
          level={3}
        >
          Administration Panel
        </Title>
        <Dropdown overlay={menu}>
          <UserButtonContainer
            style={{
              backgroundColor: "#001628",
              color: "white",
              width: 150,
            }}
            icon={<SettingOutlined />}
          >
            Settings
          </UserButtonContainer>
        </Dropdown>
      </HeaderContainer>
      <Layout>
        <Sider
          className="site-layout-background"
          collapsed={collapsed}
          collapsible
          onCollapse={onCollapse}
          width={250}
        >
          <Menu
            defaultSelectedKeys={["customers"]}
            defaultOpenKeys={["customers"]}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="customers"
              icon={<TeamOutlined />}
              onClick={() => setSelectedKey("customers")}
            >
              Customers
            </Menu.Item>
            <Menu.Item
              key="products"
              icon={<InboxOutlined />}
              onClick={() => setSelectedKey("products")}
            >
              Products
            </Menu.Item>
            <Menu.Item
              key="stocksIn"
              icon={<DownOutlined />}
              onClick={() => setSelectedKey("stocksIn")}
            >
              Stock In
            </Menu.Item>
            <Menu.Item
              key="stocksOut"
              icon={<UpOutlined />}
              onClick={() => setSelectedKey("stocksOut")}
            >
              Stock Out
            </Menu.Item>
          </Menu>
        </Sider>
        {selectedKey === "customers" ? <Customers /> : null}
        {selectedKey === "products" ? <Products /> : null}
        {selectedKey === "stocksIn" ? <StocksIn /> : null}
      </Layout>
    </LayoutContainer>
  );
};

export default AdminPage;
