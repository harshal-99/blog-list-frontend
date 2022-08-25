import Box                              from "@mui/material/Box";
import Paper                            from "@mui/material/Paper";
import TextField                        from "@mui/material/TextField";
import React, {useState}                from "react";
import Button                           from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createNewBlog}                  from "../../reducers/blogReducer";
import {selectUser}                     from "../../reducers/userReducer";
import Typography                       from "@mui/material/Typography";
import {useLocation}                    from "react-router-dom";
import {TextareaAutosize}               from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const {user} = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const showForm = location.pathname === "/"

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTitle('')
    setContent('')
    dispatch(createNewBlog({title, content}, user))
  }

  if (!showForm) return null
  return (
    <Paper elevation={3} variant="elevation" square>
      <Box component="form" onSubmit={handleFormSubmit}
           style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h4" component="h5">
          Create new blog
        </Typography>
        <TextField label="Title" variant="filled" value={title}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
        <TextareaAutosize placeholder="Content" value={content}

                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </Box>
    </Paper>
  )
}

export default BlogForm
