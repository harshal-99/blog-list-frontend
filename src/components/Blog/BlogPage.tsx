import {useParams}      from "react-router-dom";
import {useAppSelector} from "../../hooks";
import Card             from "@mui/material/Card";
import CardContent      from "@mui/material/CardContent";
import Typography       from "@mui/material/Typography";
import Box              from "@mui/material/Box";
import CardActions      from "@mui/material/CardActions";
import Comments         from "../Comment/Comments";
import CommentForm      from "../Comment/CommentForm";

const BlogPage = () => {
  const {blogId} = useParams()
  const blog = useAppSelector(state => state.blogs.blogs.find(blog => blog!.id === blogId))
  if (!blogId) return null

  if (!blog) return <div>Loading</div>
  return (
    <>
      <Card>
        <CardContent>
          <Box style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
            <Typography variant="h3" component="h3">{blog.title}</Typography>
            <Typography variant="subtitle1" component="p">{blog.author}</Typography>
          </Box>
          <Typography variant="body2" component="p">{blog.likes} likes</Typography>
          <Typography variant="body2" component="p">{blog.content}</Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
      <CommentForm blogId={blogId}/>
      <Comments blogId={blog.id}/>
    </>
  )
}

export default BlogPage;
