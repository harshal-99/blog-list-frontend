import {BACKEND_URL} from "../utils/config";
import axios         from "axios";

const addUser = async (username: string, password: string) => {
  const response = await axios.post(`${BACKEND_URL}/api/login`, {username, password})
  return response.data
}

const signupUser = async (username: string, password: string, author: string) => {
  const response = await axios.post(`${BACKEND_URL}/api/user`, {username, password, author})
  return response.data
}

const userService = {
  addUser,
  signupUser
}

export default userService
