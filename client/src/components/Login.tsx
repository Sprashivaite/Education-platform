import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { loginUser } from "../authService";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
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
      const token = await loginUser(username, password);

      localStorage.setItem("jwtToken", token);
      onLogin(token);
      toast.success("Login successful!", { position: "top-right" });
    } catch (error: any) {
      console.error("Login failed:", error.response.data);
      toast.error(error.response.data, {
        position: "top-right",
      });
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
