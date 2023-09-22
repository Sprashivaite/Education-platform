import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { addVideo } from "../pages/ClassPage/service";

interface CreateClassModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateClass: (classData: { title: string; description: string }) => void;
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({
  visible,
  onCancel,
  onCreateClass,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onCreateClass(values);
      form.resetFields();
    } catch (error) {
      console.error("Ошибка при создании класса:", error);
    }
  };

  return (
    <Modal
      open={visible}
      title="Создать занятие"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Создать
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="title"
          label="Название"
          rules={[
            { required: true, message: "Пожалуйста, введите название занятия" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите описание класса",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateClassModal;
