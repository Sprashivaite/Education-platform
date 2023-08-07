import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { Class } from "../pages/ClassPage/ClassPage";

const { Text } = Typography;

export interface Course {
  _id: string;
  title: string;
  description: string;
  classes: Class[];
}

interface CourseItemProps {
  course: Course;
  onUpdateCourse: (courseId: string, updatedCourse: Partial<Course>) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <Card title={<Link to={`/course/${course._id}`}>{course.title}</Link>}>
      <Text>{course.description}</Text>
    </Card>
  );
};

export default CourseItem;
