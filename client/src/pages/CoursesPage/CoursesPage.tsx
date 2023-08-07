import { FC, useEffect, useState } from "react";
import CourseItem, { Course } from "../../components/CourseItem";
import CourseForm from "../../components/CourseForm";
import { getCourses, createCourse, updateCourse } from "./service";
import { Button, List } from "antd";

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getCourses().then((data) => setCourses(data));
  }, []);

  const [visible, setVisible] = useState(false);
  const handleCreateCourse = (values: any) => {
    createCourse({ ...values });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdateCourse = async (
    courseId: string,
    updatedCourse: Partial<Course>
  ) => {
    try {
      const response = await updateCourse(courseId, updatedCourse);
      console.log("Обновление курса:", response);
    } catch (error) {
      console.error("Ошибка при обновлении курса:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Создать курс
      </Button>
      <CourseForm
        visible={visible}
        onCreate={handleCreateCourse}
        onCancel={handleCancel}
      />
      <h1>Список курсов</h1>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
        dataSource={courses}
        renderItem={(course) => (
          <CourseItem course={course} onUpdateCourse={handleUpdateCourse} />
        )}
      />
    </>
  );
};

export default CoursesPage;
