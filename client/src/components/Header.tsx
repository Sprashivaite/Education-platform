import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
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
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Главная страница</Link>
        </Menu.Item>
        {jwtToken ? (
          <>
            <Menu.Item key="courses">
              <Link to="/courses">Курсы</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={onLogout}>
              Выход из системы
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">Вход в систему</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Регистрация</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
