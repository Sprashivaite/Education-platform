import React from "react";
import { PageHeader } from "antd";
import Login from "../../components/Login";
import "./style.css";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="loginPage">
      <PageHeader title="Страница входа" />
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
