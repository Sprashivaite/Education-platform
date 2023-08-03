import React, { FC, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../pages/LoginPage/service";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      if (!data) return;
      onLogin(data?.token);
      navigate("/courses");
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
            message: "Пожалуйста, введите свое имя пользователя",
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
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
