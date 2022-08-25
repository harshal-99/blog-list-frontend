import React, {useEffect}                   from "react";
import Container                            from "@mui/material/Container";
import {useAppDispatch, useAppSelector}     from "../../hooks";
import {addCommentsToStore, selectComments} from "../../reducers/commentReducer";
import {CommentType}                        from "../../types";
import Comment                              from "./Comment";

const Comments: React.FC<{ blogId: string }> = ({blogId}) => {
  const dispatch = useAppDispatch()
  const {comments} = useAppSelector(selectComments)
  useEffect(() => {
    dispatch(addCommentsToStore(blogId))
  }, [blogId, dispatch])

  const commentsToRender: CommentType[] = []

  for (let i in comments) {
    if (blogId === comments[i].blogId) {
      commentsToRender.push(comments[i])
    }
  }

  return (
    <Container>
      {commentsToRender.map(comment => <Comment key={comment.id} comment={comment}/>)}
    </Container>
  )
}
export default Comments
