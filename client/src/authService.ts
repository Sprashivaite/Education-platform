import axios from "axios";
import SERVER_BASE_URL from "./config";

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}/auth/login`, {
      username,
      password,
    });

    return response.data.token;
  } catch (error) {
    throw error;
  }
};
