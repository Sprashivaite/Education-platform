import React from "react";
import { PageHeader } from "antd";
import RegisterForm from "../../components/RegisterForm";
import "./style.css";

const RegistrationPage: React.FC = () => {
  return (
    <div className="regPage">
      <PageHeader title="Страница регистрации" />
      <RegisterForm />
    </div>
  );
};

export default RegistrationPage;
