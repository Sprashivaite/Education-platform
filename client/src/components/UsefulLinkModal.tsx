import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";

interface UsefulLinkModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddLink: (title: string, url: string) => void;
}

const UsefulLinkModal: React.FC<UsefulLinkModalProps> = ({
  visible,
  onCancel,
  onAddLink,
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddLink = () => {
    onAddLink(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <Modal
      title="Добавить полезную ссылку"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="add" type="primary" onClick={handleAddLink}>
          Добавить ссылку
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="URL">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UsefulLinkModal;
