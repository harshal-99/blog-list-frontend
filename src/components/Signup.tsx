import React, {useState} from "react";
import {useNavigate}     from "react-router-dom";
import Paper             from "@mui/material/Paper";
import Box               from "@mui/material/Box";
import Typography        from "@mui/material/Typography";
import TextField         from "@mui/material/TextField";
import Button            from "@mui/material/Button";

import {useAppDispatch} from "../hooks";
import {signUpUser}     from "../reducers/userReducer";
import classes          from './Login.module.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit: React.EventHandler<React.FormEvent> = (event) => {
    event.preventDefault()
    dispatch(signUpUser(username, password, name, () => navigate('/login', {replace: true})))
  }

  return (
    <div className={classes.container}>
      <Paper elevation={3} variant="elevation" square style={{width: "30rem", height: "25rem"}}>
        <Box onSubmit={handleSubmit} component="form" className={classes.form}>
          <Typography variant="h5" component="h2">
            Signup Form
          </Typography>
          <TextField label="Username" value={username}
                     variant="filled"
                     onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="Name" value={name}
                     variant="filled"
                     onChange={(e) => setName(e.target.value)}/>
          <TextField label="Password" value={password}
                     variant="filled"
                     onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary">Signup</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Signup;
