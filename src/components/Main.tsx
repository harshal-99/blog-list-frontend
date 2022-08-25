import Container from "@mui/material/Container";
import React     from "react";

import BlogForm              from "./Blog/BlogForm";
import {useAppSelector}      from "../hooks";
import {selectUser}          from "../reducers/userReducer";
import NavBar                from "./NavBar";
import {Outlet} from "react-router-dom";

const Main = () => {
  const {user} = useAppSelector(selectUser)

  return (
    <>
      <NavBar/>
      <Container>
        {user &&   <BlogForm/>}
        <Outlet/>
      </Container>
    </>
  )
}

export default Main
