import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course } from "../../components/CourseItem";
import { getClassesForCourse, getCourseById } from "./service";

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

  return (
    <div>
      {course ? (
        <div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <h3>Классы:</h3>
          <ul>
            {classes?.map((c) => (
              <li key={c._id}>
                <p>{c.title}</p>
                <p>{c.videoUrl}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Загрузка деталей курса...</p>
      )}
    </div>
  );
};

export default CoursePage;
