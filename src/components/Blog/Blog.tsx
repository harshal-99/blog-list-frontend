import React                     from "react";
import Card                      from "@mui/material/Card";
import CardContent               from "@mui/material/CardContent";
import Typography                from "@mui/material/Typography";
import Box                       from "@mui/material/Box";
import CardActions               from "@mui/material/CardActions";
import Button                    from "@mui/material/Button";
// @ts-ignore
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';

import {useAppDispatch, useAppSelector}   from "../../hooks";
import classes                            from "./Blog.module.css"
import {BlogType}                         from "../../types";
import {deleteSingleBlog, updateBlogLike} from "../../reducers/blogReducer";
import {selectUser}                       from "../../reducers/userReducer";
import {Link}                             from "react-router-dom";

const Blog: React.FC<{
  blog: BlogType
}> =
  React.memo(({blog,}) => {
    const {user} = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const handleUpdateLike = async () => {
      dispatch(updateBlogLike(blog, user))
    }

    const handleBlogDelete = async () => {
      dispatch(deleteSingleBlog(blog, user))
    }

    if (!blog) return null
    const isAuthor = blog.userId === user?.id

    return (
      <Card>
        <CardContent>
          <Box style={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant="h5" component="h2">
              <Link to={`/${blog.id}`}>{blog.title}</Link>
            </Typography>
            <Typography variant="h6" component="h6">{blog.author}</Typography>
          </Box>
          <Box className={classes.maxwidth}>
            <Typography variant="body2" component="p">{blog.content}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box className={classes["flex-center"]}>
            <Box className={classes["flex-center"]}>
              <Typography className={classes["margin-lr"]} variant="body2"
                          component="p">{blog.likes} likes</Typography>
              {user &&
								<Button className={classes["margin-lr"]} onClick={handleUpdateLike} type="button" variant="contained"
								        color="primary"><FavoriteBorderTwoToneIcon/> Like</Button>}
            </Box>
            {user && isAuthor &&
							<Button onClick={handleBlogDelete} className={classes["margin-lr"]} type="button" variant="contained"
							        color="warning">Delete</Button>}
          </Box>
        </CardActions>
      </Card>
    )
  })

export default Blog
