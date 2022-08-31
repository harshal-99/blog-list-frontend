import React from "react";

import Blog             from "./Blog";
import {selectBlogIds}  from "../../reducers/blogReducer";
import {useAppSelector} from "../../hooks";

const Blogs = React.memo(() => {
  const blogIds = useAppSelector(selectBlogIds)
  if (!blogIds) return <div>Loading</div>
  return (
    <>
      {blogIds.map(id => <Blog key={id} blogId={id}/>)}
    </>
  )
})

export default Blogs
