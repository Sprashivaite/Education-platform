import axios from "axios";
import SERVER_BASE_URL from "../../config";
import { Class } from "./ClassPage";
import { toast } from "react-toastify";

export const getClassById = async (
  classId: string
): Promise<Class | undefined> => {
  try {
    const userId = localStorage.getItem("jwtToken");
    const response = await axios.get<Class>(
      `${SERVER_BASE_URL}/api/classes/${classId}`,
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

export const updateClass = async (classId: string, updatedData: Class) => {
  try {
    const userId = localStorage.getItem("jwtToken");
    const response = await axios.put(
      `${SERVER_BASE_URL}/api/classes/${classId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    toast.success("Занятие изменено!");
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
    toast.success("Комментарий добавлен!");
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
    const token = localStorage.getItem("jwtToken");
    const response = await axios.post(
      `${SERVER_BASE_URL}/api/users/${userId}/grant-access/${classId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    toast.success("Доступ предоставлен успешно");

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addLinkToClass = async (
  classId: string,
  title: string,
  url: string
) => {
  try {
    const userId = localStorage.getItem("jwtToken");

    const response = await axios.post(
      `${SERVER_BASE_URL}/api/classes/${classId}/links`,
      {
        title,
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    toast.success("Ссылка успешно добавлена!");
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

    const response = await axios.post(
      `${SERVER_BASE_URL}/api/classes/${classId}/links/files`,
      { title, url },
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    toast.success("Ссылка на файл успешно добавлена!");
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addVideo = async (classId: string, videoFile: FormData) => {
  try {
    const userId = localStorage.getItem("jwtToken");

    const response = await axios.post(
      `${SERVER_BASE_URL}/api/classes/${classId}/video`,
      videoFile,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Видео успешно загружено");
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addFile = async (classId: string, file: FormData) => {
  try {
    const userId = localStorage.getItem("jwtToken");

    const response = await axios.post(
      `${SERVER_BASE_URL}/api/classes/${classId}/file`,
      file,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Файл успешно загружен");
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
