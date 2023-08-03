import axios from "axios";
import { toast } from "react-toastify";
import SERVER_BASE_URL from "../../config";

export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string; userId: string } | undefined> => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/auth/login`, {
      username,
      password,
    });
    localStorage.setItem("jwtToken", response.data.token);
    toast.success("Вход в систему успешный!");

    return response.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
