import axios from "axios";
import SERVER_BASE_URL from "./config";

export const getCourses = async () => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/api/courses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClassesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/api/courses/${courseId}/classes`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
