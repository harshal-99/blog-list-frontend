import React, {useEffect}          from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";

import Login                   from "./components/Login";
import SnackBar                from "./components/SnackBar";
import {initializeBlogs}       from "./reducers/blogReducer";
import {useAppDispatch}        from "./hooks";
import {loginFromLocalStorage} from "./reducers/userReducer";
import Signup                  from "./components/Signup";
import Main                    from "./components/Main";
import Blogs                   from "./components/Blog/Blogs";
import BlogPage                from "./components/Blog/BlogPage";

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loginFromLocalStorage())
  }, [dispatch])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main/>}>
            <Route index element={<Blogs/>}/>
            <Route path=":blogId" element={<BlogPage/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </HashRouter>
      <SnackBar/>
    </>
  );
}

export default App;
