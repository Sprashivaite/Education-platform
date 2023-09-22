import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onGrantAccess: (userId: string) => void;
}

const GrantAccessModal: React.FC<Props> = ({
  visible,
  onCancel,
  onGrantAccess,
}) => {
  const [userId, setUserId] = useState("");

  const handleGrantAccess = () => {
    onGrantAccess(userId);
    onCancel();
  };

  return (
    <Modal
      title="Предоставление доступа пользователю"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Input
        placeholder="Введите идентификатор пользователя"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Button onClick={handleGrantAccess}>Предоставление доступа</Button>
    </Modal>
  );
};

export default GrantAccessModal;
