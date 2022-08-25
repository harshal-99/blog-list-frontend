import Paper                            from "@mui/material/Paper";
import Box                              from "@mui/material/Box";
import Typography                       from "@mui/material/Typography";
import TextField                        from "@mui/material/TextField";
import React, {useState}                from "react";
import Button                           from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createNewComment}               from "../../reducers/commentReducer";
import {selectUser}                     from "../../reducers/userReducer";

const CommentForm: React.FC<{ blogId: string }> = ({blogId}) => {
  const [comment, setComment] = useState('')
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(selectUser)
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setComment('')
    dispatch(createNewComment(comment, user, blogId))
  }

  return (
    <Paper elevation={3} square>
      <Box component="form" onSubmit={handleFormSubmit}
           style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "0.4rem"}}>
        <Typography variant="h5" component="h6">
          Create new comment
        </Typography>
        <TextField label="Comment" variant="filled" value={comment}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}/>
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </Box>
    </Paper>
  )
}

export default CommentForm;
