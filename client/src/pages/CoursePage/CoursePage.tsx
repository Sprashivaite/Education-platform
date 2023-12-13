import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Course } from "../../components/CourseItem";
import {
  addClassToCourse,
  getClassesForCourse,
  getCourseById,
} from "./service";
import { Button, List } from "antd";
import CreateClassModal from "../../components/CreateClassModal";

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await getCourseById(courseId || "");
        if (!fetchedCourse) return;
        setCourse(fetchedCourse);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [courseId]);

  const [classes, setClasses] = useState<any[]>();
  useEffect(() => {
    if (!courseId) return;
    getClassesForCourse(courseId)
      .then((data) => setClasses(data))
      .catch((error) =>
        console.error("Ошибка при получении классов для курса:", error)
      );
  }, [courseId]);

  const [showCreateClassModal, setShowCreateClassModal] = useState(false);

  const handleCreateClass = async (classData: {
    title: string;
    description: string;
  }) => {
    try {
      if (!courseId) return;
      const newClass = await addClassToCourse(courseId, classData);
      if (newClass) {
        setCourse((prevCourse) => ({
          ...prevCourse!,
          classes: [...prevCourse!.classes, newClass],
        }));
      }
      window.location.reload();
      setShowCreateClassModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {course ? (
        <div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <h3>Занятия:</h3>
          <ul>
            <List
              dataSource={classes}
              renderItem={({ _id, title }) => (
                <List.Item key={_id}>
                  <Link to={`/class/${_id}`}>{title}</Link>
                </List.Item>
              )}
            />
          </ul>
          <Button onClick={() => setShowCreateClassModal(true)}>
            Добавить занятие
          </Button>

          <CreateClassModal
            visible={showCreateClassModal}
            onCancel={() => setShowCreateClassModal(false)}
            onCreateClass={handleCreateClass}
          />
        </div>
      ) : (
        <p>Загрузка деталей курса...</p>
      )}
    </div>
  );
};

export default CoursePage;
