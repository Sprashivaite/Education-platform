import React, { useEffect, useState } from "react";
import { Card, Typography, List } from "antd";
import { Link } from "react-router-dom";
import { getClassesForCourse } from "../api";

const { Title, Text } = Typography;

interface Course {
  _id: string;
  title: string;
  description: string;
}

interface CourseItemProps {
  course: Course;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const [classes, setClasses] = useState<any[]>([]);
  useEffect(() => {
    getClassesForCourse(course._id)
      .then((data) => setClasses(data))
      .catch((error) =>
        console.error("Error fetching classes for course:", error)
      );
  }, [course._id]);
  return (
    <Card title={course.title}>
      <Text>{course.description}</Text>
      <Title level={5}>Classes:</Title>
      {classes.length !== 0 && (
        <List
          dataSource={classes}
          renderItem={({ _id, title }) => (
            <List.Item key={_id}>
              <Link to={`/class/${_id}`}>{title}</Link>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default CourseItem;
