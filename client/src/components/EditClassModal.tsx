import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { Class } from "../pages/ClassPage/ClassPage";
import { Store } from "antd/lib/form/interface";
import { addVideo } from "../pages/ClassPage/service";
import { UploadOutlined } from "@ant-design/icons";

interface EditClassModalProps {
  classId: string;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (editedClass: Class) => void;
  classToEdit: Class | null;
}

const EditClassModal: React.FC<EditClassModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  classToEdit,
  classId,
}) => {
  const [form] = Form.useForm();

  const handleEditSubmit = async () => {
    try {
      const editedClassData = await form.validateFields();
      onSubmit(editedClassData);
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const [uploading, setUploading] = useState(false);

  const beforeUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    addVideo(classId, formData);

    setUploading(false);
    return false;
  };

  return (
    <Modal
      open={visible}
      title="Edit Class"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleEditSubmit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} initialValues={classToEdit as Store}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Пожалуйста, введите название занятия" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Пожалуйста, введите описание занятия" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="videoPath">
          <Upload fileList={[]} beforeUpload={beforeUpload}>
            {uploading ? (
              "Загрузка..."
            ) : (
              <Button icon={<UploadOutlined />} disabled={uploading}>
                Выберите видео
              </Button>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClassModal;
