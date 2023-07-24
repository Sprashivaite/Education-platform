import React from "react";
import { PageHeader } from "antd";
import RegisterForm from "../components/RegisterForm";

const RegistrationPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="Registration Page" />
      <RegisterForm />
    </div>
  );
};

export default RegistrationPage;
