import axios, {AxiosError}                from "axios";
import {BlogType, LoginUserDto, UserType} from "../types";
import {BACKEND_URL}                      from "../utils/config";


const getUserFromLocalStorage = () => {
  const stringUser = window.localStorage.getItem("user")
  if (!stringUser) return null
  return JSON.parse(stringUser)
}

const login = async (loginUserDto: LoginUserDto) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/login`, loginUserDto)
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e?.response?.data;
    }
    throw e
  }
}

const getAllBlogs = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/blogs`)
  return response.data;
}

const createBlog = async (blog: { title: string, content: string }, user: UserType) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/blogs`, {...blog}, {
      headers: {
        Authorization: `Bearer ${user!.token}`
      }
    })
    return response.data
  } catch (e) {
    throw e
  }
}

const updateLike = async (blog: BlogType, user: UserType) => {
  if (!blog) return
  try {
    const response = await axios.put(`${BACKEND_URL}/api/blogs/${blog.id}`, {...blog, likes: blog.likes + 1}, {
      headers: {
        Authorization: `Bearer ${user!.token}`
      }
    })
    return response.data
  } catch (e) {
    throw e
  }
}

const deleteBlog = async (blog: BlogType, user: UserType) => {
  if (!blog) return
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/blogs/${blog.id}`, {
      headers: {
        Authorization: `Bearer ${user!.token}`
      }
    })
    return response.status === 200
  } catch (e) {
    throw e
  }
}


const blogService = {
  login,
  getAllBlogs,
  getUserFromLocalStorage,
  createBlog,
  updateLike,
  deleteBlog,
}

export default blogService;
