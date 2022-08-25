import AppBar                           from "@mui/material/AppBar";
import Toolbar                          from "@mui/material/Toolbar";
import classes                          from "../App.module.css";
import Button                           from "@mui/material/Button";
import {logoutUser, selectUser}         from "../reducers/userReducer";
import React                            from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useNavigate}                    from "react-router-dom";

const NavBar = () => {
  const {user} = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <AppBar position="static">
      <Toolbar className={classes["nav-items"]}>

        {user &&
					<Button variant="contained"
					        color="error"
					        onClick={() => {
                    dispatch(logoutUser())
                  }}>
						Logout
					</Button>}
        {!user &&
					<>
						<Button variant="contained" color="primary" onClick={() => navigate('/login')}>
							Login
						</Button>
						<Button variant="contained" color="primary" onClick={() => navigate('/signup')}>
							Sign up
						</Button>
					</>}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
