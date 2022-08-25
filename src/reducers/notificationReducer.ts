import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SnackBarStatus}             from "../types";
import {AppDispatch, AppState}      from "../index";

interface NotificationReducerInterface {
  status: SnackBarStatus
  message: string
  open: boolean
  hideAfter: number
}

const initialState: NotificationReducerInterface = {
  status: SnackBarStatus.empty,
  message: "",
  open: false,
  hideAfter: 2000,
}

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<{ message: string, status: SnackBarStatus, hideAfter: number | null }>) {
      state.message = action.payload.message
      state.status = action.payload.status
      state.open = true
      state.hideAfter = action.payload.hideAfter ? action.payload.hideAfter : initialState.hideAfter
    },
    clearStatus(state, action) {
      state.open = false
      state.message = ""
      state.status = SnackBarStatus.empty
    }
  }
})

export const {setStatus, clearStatus} = notificationSlice.actions

export const selectNotification = (state: AppState) => state.notification

export default notificationSlice.reducer

let id: any

export const setNotification = (message: string, status: SnackBarStatus, hideAfter: number | null = 2000) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus({message, status, hideAfter}))
    if (id) clearTimeout(id)
    id = setTimeout(() => {
      dispatch(clearStatus({}))
    }, hideAfter ? hideAfter : initialState.hideAfter)
  }
}
