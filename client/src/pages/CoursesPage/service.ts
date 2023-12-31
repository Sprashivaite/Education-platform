import axios from "axios";
import { Course } from "../../components/CourseItem";
import SERVER_BASE_URL from "../../config";
import { CourseData } from "./types";
import { toast } from "react-toastify";

export const getCourses = async () => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/api/courses`);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const createCourse = async (courseData: CourseData) => {
  const userId = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/courses`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const updateCourse = async (
  courseId: string,
  updatedCourse: Partial<Course>
): Promise<Course | undefined> => {
  try {
    const userId = localStorage.getItem("jwtToken");
    const response = await axios.put(
      `${SERVER_BASE_URL}/api/courses/${courseId}`,
      updatedCourse,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
