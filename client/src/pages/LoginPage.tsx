import React from "react";
import { PageHeader } from "antd";
import Login from "../components/Login";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div>
      <PageHeader title="Login Page" />
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
