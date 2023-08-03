import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Input, Typography, Modal, Form, Row, Col } from "antd";
import GrantAccessModal from "../../components/GrantAccessModal";
import {
  getClassById,
  addClassComment,
  addLinkToFile,
  grantAccessToClass,
} from "./service";

export interface Class {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  courseId: string;
  comments: { text: string }[];
  usefulLinks: [
    {
      title: string;
      url: string;
      isFile: boolean;
    }
  ];
}

const { Title, Text } = Typography;
const { confirm } = Modal;

const ClassPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<Class | null>(null);
  const [commentText, setCommentText] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        if (!classId) return;
        const fetchedClass = await getClassById(classId);
        if (!fetchedClass) return;
        setClassData(fetchedClass);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClass();
  }, [classId]);

  const handleAddComment = async () => {
    try {
      if (!classId) return;
      const updatedClass = await addClassComment(classId, commentText);
      if (!updatedClass) return;
      setClassData(updatedClass);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFileLink = async () => {
    try {
      if (!classId) return;
      await addLinkToFile(classId, newLinkTitle, newLinkUrl);
      setNewLinkTitle("");
      setNewLinkUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGrantAccess = async (userId: string) => {
    try {
      if (!classId) return;
      await grantAccessToClass(classId, userId);
    } catch (error) {
      console.error(error);
    }
  };

  const showGrantAccessConfirmation = () => {
    confirm({
      title: "Предоставление доступа",
      content: "Хотите ли вы предоставить доступ к этому классу?",
      onOk: () => setShowGrantAccessModal(true),
    });
  };

  if (!classData) return null;

  return (
    <div>
      <Card title={classData.title}>
        <Text>{classData.description}</Text>
        <Title level={5}>Видео:</Title>
        <iframe
          title={classData.title}
          width="100%"
          height="315"
          src={classData.videoUrl}
          allowFullScreen
        ></iframe>
        <ul>
          {classData.comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
        <div>
          <Input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button onClick={handleAddComment}>Добавить комментарий</Button>
        </div>
        <div>
          <h3>Полезные ссылки:</h3>
          {classData.usefulLinks.map((link, index) => (
            <div key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
              {link.isFile && (
                <iframe
                  title={link.title}
                  width="100%"
                  height="315"
                  src={link.url}
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
        {/* {classData.createdBy === "currentUserId" && (
          <Button onClick={showGrantAccessConfirmation}>Предоставление доступа</Button>
        )} */}
        <div>
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Link Title">
                  <Input
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Link URL">
                  <Input
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button onClick={handleAddFileLink}>
                    Добавить ссылку на файл
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      <GrantAccessModal
        visible={showGrantAccessModal}
        onCancel={() => setShowGrantAccessModal(false)}
        onGrantAccess={handleGrantAccess}
      />
    </div>
  );
};
export default ClassPage;
