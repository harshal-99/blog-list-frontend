import React from "react";

import Blog             from "./Blog";
import {selectBlogs}    from "../../reducers/blogReducer";
import {useAppSelector} from "../../hooks";

const Blogs = React.memo(() => {
  const {blogs} = useAppSelector(selectBlogs)
  if (!blogs) return <div>Loading</div>
  return (
    <>
      {blogs.map(blog => <Blog key={blog!.id} blog={blog}/>)}
    </>
  )
})

export default Blogs
