import axios from "axios";
import { toast } from "react-toastify";
import SERVER_BASE_URL from "../../config";

export const regUser = async (
  username: string,
  password: string
): Promise<{ token: string; userId: string } | undefined> => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/auth/register`, {
      username,
      password,
    });
    toast.success("Регистрация прошла успешно!");

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
