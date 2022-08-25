import Snackbar             from "@mui/material/Snackbar";
import React                from "react";
import Alert                from "@mui/material/Alert";
import {useAppSelector}     from "../hooks";
import {selectNotification} from "../reducers/notificationReducer";

const SnackBar = () => {
  const notification = useAppSelector(selectNotification)
  const severity = notification.status === 'success' ? 'success' : 'error';

  return (
    <Snackbar open={notification.open} autoHideDuration={notification.hideAfter}>
      <Alert severity={severity}>{notification.message}</Alert>
    </Snackbar>
  )
}

export default SnackBar;
