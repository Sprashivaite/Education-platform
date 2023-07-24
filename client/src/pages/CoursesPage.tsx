import React, { useEffect, useState } from "react";
import { List } from "antd";
import CourseItem from "../components/CourseItem";
import { getCourses } from "../api";
import { toast } from "react-toastify";

interface Course {
  id: number;
  title: string;
  description: string;
  classes: string[];
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .catch((error) => toast.error(error));
  }, []);
  return (
    <div>
      <h1>Список курсов</h1>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
        dataSource={courses}
        renderItem={(course) => <CourseItem course={course} />}
      />
    </div>
  );
};

export default CoursesPage;
