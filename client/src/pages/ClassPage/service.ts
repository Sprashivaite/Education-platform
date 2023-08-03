import axios from "axios";
import SERVER_BASE_URL from "../../config";
import { Class } from "./ClassPage";
import { toast } from "react-toastify";

export const getClassById = async (
  classId: string
): Promise<Class | undefined> => {
  try {
    const response = await axios.get<Class>(
      `${SERVER_BASE_URL}/api/classes/${classId}`
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addClassComment = async (
  classId: string,
  text: string
): Promise<Class | undefined> => {
  try {
    const userId = localStorage.getItem("jwtToken");
    const response = await axios.post<Class>(
      `${SERVER_BASE_URL}/api/classes/${classId}/comments`,
      { text },
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

export const grantAccessToClass = async (
  userId: string,
  classId: string
): Promise<any> => {
  try {
    const response = await axios.post<any>(
      `${SERVER_BASE_URL}/api/users/${userId}/grant-access/${classId}`
    );
    toast.success("Доступ предоставлен успешно");

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addLinkToClass = async (classId: string, link: string) => {
  try {
    const userId = localStorage.getItem("jwtToken");

    const response = await axios.post(
      `${SERVER_BASE_URL}/api/classes/${classId}/links`,
      {
        link,
      },
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

export const addLinkToFile = async (
  classId: string,
  title: string,
  url: string
) => {
  try {
    const userId = localStorage.getItem("jwtToken");
    toast.success("Ссылка на файл успешно добавлена!");

    const response = await axios.post(
      `${SERVER_BASE_URL}/api/classes/${classId}/links/files`,
      { title, url },
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
