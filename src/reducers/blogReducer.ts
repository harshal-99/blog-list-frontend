import {createSlice, PayloadAction}         from "@reduxjs/toolkit";
import {BlogType, SnackBarStatus, UserType} from "../types";
import {AppDispatch, AppState}              from "../index";
import blogService                          from "../service/blog.service";
import {setNotification}                    from "./notificationReducer";
import {AxiosError}                         from "axios";

export interface BlogReducerState {
  blogs: BlogType[]
}

const initialState: BlogReducerState = {
  blogs: []
}

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload
    },
    addNewBlog: (state, action: PayloadAction<BlogType>) => {
      state.blogs.push(action.payload)
    },
    updateLike(state, action: PayloadAction<{ id: string, likes: number }>) {
      state.blogs.forEach(blog => {
        if (blog!.id !== action.payload.id) return
        blog!.likes = action.payload.likes
      })
    },
    deleteBlog(state, action: PayloadAction<{ id: string }>) {
      state.blogs = state.blogs.filter(blog => blog!.id !== action.payload.id)
    }
  }
})

export const {setBlogs, deleteBlog, addNewBlog, updateLike} = blogSlice.actions

export const selectBlogs = (state: AppState) => state.blogs

export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch: AppDispatch) => {
    const blogs = await blogService.getAllBlogs()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = ({title, content}: { title: string, content: string }, user: UserType) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newBlog = await blogService.createBlog({title, content}, user)
      dispatch(addNewBlog(newBlog))
      dispatch(setNotification("New blog created", SnackBarStatus.success, 2000))
    } catch (e) {
      if (e instanceof Error) {
        if (e instanceof AxiosError) {
          let error = e?.response?.data?.error[0]
          dispatch(setNotification(`${error.param} is too short`, SnackBarStatus.error, 2000))
        } else {
          dispatch(setNotification(e.message, SnackBarStatus.error, 2000))
        }
      }
    }
  }
}

export const updateBlogLike = (bolg: BlogType, user: UserType) => {
  return async (dispatch: AppDispatch) => {
    const updatedBlog = await blogService.updateLike(bolg, user)
    dispatch(updateLike(updatedBlog))
  }
}

export const deleteSingleBlog = (bolg: BlogType, user: UserType) => {
  return async (dispatch: AppDispatch) => {
    await blogService.deleteBlog(bolg, user)
    dispatch(deleteBlog({id: bolg!.id}))
    dispatch(setNotification(`Blog ${bolg!.title} deleted`, SnackBarStatus.success))
  }
}
