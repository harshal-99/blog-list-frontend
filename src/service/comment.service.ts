import axios         from "axios";
import {UserType}    from "../types";
import {BACKEND_URL} from "../utils/config";

const getComments = async (blogId: string) => {
  const response = await axios.get(`${BACKEND_URL}/api/blogs/${blogId}/comments`);
  return response.data
}

const createComment = async (comment: string, user: UserType, blogId: string) => {
  const response = await axios.post(`${BACKEND_URL}/api/blogs/${blogId}/comments`, {comment}, {
    headers: {
      Authorization: `Bearer ${user!.token}`
    }
  })
  return response.data
}

const commentService = {
  getComments,
  createComment
}

export default commentService;
