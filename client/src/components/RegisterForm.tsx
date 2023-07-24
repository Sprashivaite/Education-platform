import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("/auth/register", values);
      toast.success("Registration successful!", { position: "top-right" });
    } catch (error: any) {
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
            message: "Пожалуйста, введите ваше имя пользователя",
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
