import Paper             from "@mui/material/Paper";
import Box               from "@mui/material/Box";
import Typography        from "@mui/material/Typography";
import TextField         from "@mui/material/TextField";
import Button            from "@mui/material/Button";
import React, {useState} from "react";
import {useNavigate}     from "react-router-dom";

import classes          from './Login.module.css'
import {useAppDispatch} from "../hooks";
import {loginUser}      from "../reducers/userReducer";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(loginUser(username, password, () => navigation('/', {replace: true})))
  }

  return (
    <div className={classes.container}>
      <Paper elevation={3} variant="elevation" square style={{width: "30rem", height: "25rem"}}>
        <Box onSubmit={handleLogin} component="form" className={classes.form}>
          <Typography variant="h5" component="h2">
            Login Form
          </Typography>
          <TextField label="Username" value={username}
                     variant="filled"
                     onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="Password" value={password}
                     variant="filled"
                     onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Login
