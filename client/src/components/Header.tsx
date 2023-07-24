import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

interface HeaderProps {
  jwtToken: string | null;
  onLogout: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({ jwtToken, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        {jwtToken ? (
          <>
            <Menu.Item key="courses">
              <Link to="/courses">Courses</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Button type="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
