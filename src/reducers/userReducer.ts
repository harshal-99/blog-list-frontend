import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError}                 from "axios";

import {SnackBarStatus, UserType} from "../types";
import {AppDispatch, AppState}    from "../index";
import userService                from "../service/user.service";
import {setNotification}          from "./notificationReducer";

interface UserReducerState {
  user: UserType
}

const initialState: UserReducerState = {
  user: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload
      window.localStorage.setItem('user', JSON.stringify(action.payload))
    },
    clearUser(state) {
      state.user = null
      window.localStorage.removeItem('user')
    }
  }
})

export const {setUser, clearUser} = userSlice.actions

export const selectUser = (state: AppState) => state.user

export default userSlice.reducer

export const loginUser = (username: string, password: string, cb: () => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user = await userService.addUser(username, password)
      dispatch(setUser(user))
      dispatch(setNotification("User logged in", SnackBarStatus.success, 2000))
      cb()
    } catch (e) {
      if (e instanceof Error) {
        if (e instanceof AxiosError) {
          dispatch(setNotification(e?.response?.data?.error, SnackBarStatus.error, 2000))
        } else {
          dispatch(setNotification(e.message, SnackBarStatus.error, 2000))
        }
      }
    }
  }
}

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(clearUser())
    dispatch(setNotification("User logged out", SnackBarStatus.success, 2000))
  }
}

export const loginFromLocalStorage = () => {
  return async (dispatch: AppDispatch) => {
    const savedUser = window.localStorage.getItem('user')
    if (!savedUser) return
    const user = JSON.parse(savedUser)
    if (user) {
      dispatch(setUser(user))
      dispatch(setNotification("User logged in", SnackBarStatus.success, 2000))
    }
  }
}

export const signUpUser = (username: string, password: string, author: string, cb: () => void) => {
  return async (dispatch: AppDispatch) => {
    const {error} = await userService.signupUser(username, password, author)
    if (error) {
      dispatch(setNotification(error, SnackBarStatus.error, 2000))
    } else {
      dispatch(setNotification("User signed up", SnackBarStatus.success, 2000))
      cb()
    }
  }
}
