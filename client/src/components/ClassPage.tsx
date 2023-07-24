import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

interface Class {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  courseId: string;
}

const classData: Class[] = [
  {
    _id: "64b95450d8d577121bbf4632",
    courseId: "64b952d2d8d577121bbf4629",
    description: "This is Class 1 of Course 1",
    title: "Class 1",
    videoUrl: "https://example.com/video1",
  },
  {
    _id: "64b95503d8d577121bbf4634",
    courseId: "64b952d2d8d577121bbf4629",
    description: "This is Class 2 of Course 1",
    title: "Class 2",
    videoUrl: "https://example.com/video1",
  },
];

const ClassPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const selectedClass = classData.find((cls) => cls._id === classId);

  if (!selectedClass) return null;

  return (
    <div>
      <Card title={selectedClass.title}>
        <Text>{selectedClass.description}</Text>
        <Title level={5}>Video:</Title>
        <iframe
          title={selectedClass.title}
          width="560"
          height="315"
          src={selectedClass.videoUrl}
          allowFullScreen
        ></iframe>
      </Card>
    </div>
  );
};

export default ClassPage;
