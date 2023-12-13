import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Input, Typography, Upload } from "antd";
import GrantAccessModal from "../../components/GrantAccessModal";
import {
  getClassById,
  addClassComment,
  grantAccessToClass,
  updateClass,
  addLinkToClass,
  addFile,
  getVideo,
} from "./service";
import EditClassModal from "../../components/EditClassModal";
import UsefulLinkModal from "../../components/UsefulLinkModal";
import SERVER_BASE_URL from "../../config";
import { UploadOutlined } from "@ant-design/icons";

export interface Class {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoPath: string;
  courseId: string;
  comments: { text: string }[];
  usefulLinks: [
    {
      title: string;
      url: string;
      isFile: boolean;
    }
  ];
  files: string[];
}

const { Title, Text } = Typography;

const ClassPage: FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<Class | null>(null);
  const [commentText, setCommentText] = useState("");
  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false);
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
  useEffect(() => {
    fetchClass();
  }, []);

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

  const handleGrantAccess = async (userId: string) => {
    try {
      if (!classId) return;
      await grantAccessToClass(userId, classId);
    } catch (error) {
      console.error(error);
    }
  };

  const showGrantAccessConfirmation = () => {
    setShowGrantAccessModal(true);
  };

  const handleUpdate = async (editedClass: Class) => {
    if (!classId) return;
    await updateClass(classId, editedClass);
    fetchClass();
  };

  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const handleEditClass = () => {
    setShowEditClassModal(true);
  };
  const [showLinkModal, setShowLinkModal] = useState(false);
  const handleAddLink = async (title: string, url: string) => {
    try {
      if (!classId) return;
      await addLinkToClass(classId, title, url);
      fetchClass();
    } catch (error) {
      console.error(error);
    }
  };

  const [uploading, setUploading] = useState(false);

  const beforeUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    if (!classId) return;

    setUploading(true);
    addFile(classId, formData);
    setUploading(false);
    fetchClass();
    return false;
  };

  const [videoUrl, setVideoUrl] = useState("");
  const [render, setRender] = useState(0);

  useEffect(() => {
    async function fetchVideoUrl() {
      try {
        console.log(classData?.videoPath);
        console.log(classId);
        if (!classData?.videoPath || !classId) return;

        const videoObjectUrl = await getVideo(classId, classData?.videoPath);

        if (videoObjectUrl) {
          setVideoUrl(videoObjectUrl);
          setRender(+new Date());
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchVideoUrl();
  }, [classData, classId]);

  if (!classData) return null;

  return (
    <div>
      <Card title={classData.title}>
        {classId && (
          <EditClassModal
            classId={classId}
            visible={showEditClassModal}
            onCancel={() => setShowEditClassModal(false)}
            onSubmit={handleUpdate}
            classToEdit={classData}
          />
        )}
        <GrantAccessModal
          visible={showGrantAccessModal}
          onCancel={() => setShowGrantAccessModal(false)}
          onGrantAccess={handleGrantAccess}
        />

        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <Button style={{ display: "block" }} onClick={handleEditClass}>
            Редактировать занятие
          </Button>
          <Button onClick={showGrantAccessConfirmation}>
            Предоставление доступа
          </Button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Text strong>{classData.description}</Text>
        </div>
        <Title level={5}>Видео:</Title>
        <video width="560" height="315" controls key={render}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={{ display: "flex", gap: "100px", marginTop: "50px" }}>
          <div>
            <h3>Комментарии:</h3>
            <ul style={{ border: "1px solid #d5d5d5", padding: "10px 40px" }}>
              {classData.comments?.map((comment, index) => (
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
          </div>
          <div>
            <h3>Полезные ссылки:</h3>
            <Button onClick={() => setShowLinkModal(true)}>
              Добавить полезную ссылку
            </Button>

            <div>
              <ul style={{ border: "1px solid #d5d5d5", padding: "10px 40px" }}>
                {classData.usefulLinks?.map(({ title, url }) =>
                  title ? (
                    <li key={url}>
                      <a key={url} href={url}>
                        {title}
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <UsefulLinkModal
              visible={showLinkModal}
              onCancel={() => setShowLinkModal(false)}
              onAddLink={handleAddLink}
            />
          </div>
          <div>
            <h3>Полезные файлы:</h3>
            <Upload fileList={[]} beforeUpload={beforeUpload}>
              {uploading ? (
                "Загрузка..."
              ) : (
                <Button icon={<UploadOutlined />} disabled={uploading}>
                  Выберите файл
                </Button>
              )}
            </Upload>

            <div>
              <ul style={{ border: "1px solid #d5d5d5", padding: "10px 40px" }}>
                {classData.files?.map((item) =>
                  item ? (
                    <li key={item}>
                      <a
                        key={item}
                        href={`${SERVER_BASE_URL}/api/classes/${classId}/${item}`}
                      >
                        {item}
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <UsefulLinkModal
              visible={showLinkModal}
              onCancel={() => setShowLinkModal(false)}
              onAddLink={handleAddLink}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ClassPage;
