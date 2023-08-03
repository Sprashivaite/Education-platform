import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { regUser } from "../pages/RegistrationPage/service";

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await regUser(username, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      initialValues={{ username: "", password: "" }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя пользователя",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
