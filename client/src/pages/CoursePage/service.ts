import axios from "axios";
import { Course } from "../../components/CourseItem";
import SERVER_BASE_URL from "../../config";
import { toast } from "react-toastify";
import { Class } from "../ClassPage/ClassPage";

export const getCourseById = async (
  courseId: string
): Promise<Course | undefined> => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<Course>(
      `${SERVER_BASE_URL}/api/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addClass = async (
  courseId: string
): Promise<Course | undefined> => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<Course>(
      `${SERVER_BASE_URL}/api/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const getClassesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/api/classes/${courseId}/classes`
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addClassToCourse = async (
  courseId: string,
  classData: {
    title: string;
    description: string;
  }
) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.post<Class>(
      `${SERVER_BASE_URL}/api/classes/${courseId}/classes`,
      classData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
