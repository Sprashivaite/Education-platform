import React from "react";
import { Modal, Form, Input } from "antd";

interface CourseFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
  };

  return (
    <Modal
      title="Создать курс"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Введите название" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Пожалуйста, введите описание" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseForm;
