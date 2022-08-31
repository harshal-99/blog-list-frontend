import {CommentType, SnackBarStatus, UserType} from "../types";
import {createSlice, PayloadAction}            from "@reduxjs/toolkit";
import {AppDispatch, AppState}                 from "../index";
import commentService                          from "../service/comment.service";
import {setNotification}                       from "./notificationReducer";

interface CommentReducerState {
  comments: {
    [key: string]: CommentType
  }
  commentIds: string[]
}

const initialState: CommentReducerState = {
  comments: {},
  commentIds: []
}

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<CommentType[]>) {
      action.payload.forEach(comment => {
        state.comments[comment.id] = comment
        if (state.commentIds.indexOf(comment.id) === -1)
          state.commentIds.push(comment.id)
      })
    },
    addComment(state, action: PayloadAction<CommentType>) {
      state.comments[action.payload.id] = action.payload
      state.commentIds.push(action.payload.id)
    }
  }
})

export const {setComments, addComment} = commentSlice.actions

export default commentSlice.reducer

export const selectComments = (state: AppState) => state.comments

export const addCommentsToStore = (blogId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const comments = await commentService.getComments(blogId)
      dispatch(setComments(comments))
    } catch (e) {
      console.log(e)
    }
  }
}

export const createNewComment = (comment: string, user: UserType, blogId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newComment = await commentService.createComment(comment, user, blogId)
      dispatch(addComment(newComment))
      dispatch(setNotification("New comment created", SnackBarStatus.success, 2000))
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setNotification(e.message, SnackBarStatus.error, 2000))
      }
    }
  }
}
