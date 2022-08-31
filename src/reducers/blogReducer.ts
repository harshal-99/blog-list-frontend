import {createSlice, PayloadAction}         from "@reduxjs/toolkit";
import {BlogType, SnackBarStatus, UserType} from "../types";
import {AppDispatch, AppState}              from "../index";
import blogService                          from "../service/blog.service";
import {setNotification}                    from "./notificationReducer";
import {AxiosError}                         from "axios";

export interface BlogReducerState {
  blogs: {
    [key: string]: BlogType
  },
  blogIds: string[]
}

const initialState: BlogReducerState = {
  blogs: {},
  blogIds: []
}

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<BlogType[]>) {
      action.payload.forEach(blog => {
        if (state.blogIds.indexOf(blog!.id) === -1) {
          state.blogs[blog!.id] = blog
          state.blogIds.push(blog!.id)
        }
      })
    },
    addNewBlog(state, action: PayloadAction<BlogType>) {
      if (state.blogIds.indexOf(action.payload!.id) === -1) {
        state.blogs[action.payload!.id] = action.payload
        state.blogIds.push(action.payload!.id)
      }
    },
    updateLike(state, action: PayloadAction<{ id: string, likes: number }>) {
      state.blogs[action.payload!.id]!.likes = action.payload.likes
    },
    deleteBlog(state, action: PayloadAction<{ id: string }>) {
      delete state.blogs[action.payload.id]
      state.blogIds = state.blogIds.filter(id => id !== action.payload.id)
    }
  }
})

export const {setBlogs, deleteBlog, addNewBlog, updateLike} = blogSlice.actions

export const selectBlogIds = (state: AppState) => state.blogs.blogIds

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
