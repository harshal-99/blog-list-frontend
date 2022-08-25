import React         from "react";
import {CommentType} from "../../types";
import Card          from "@mui/material/Card";
import CardContent   from "@mui/material/CardContent";

const Comment: React.FC<{ comment: CommentType }> = ({comment}) => {
  return (
    <Card style={{marginTop: "0.4rem"}}>
      <CardContent>
        {comment.comment}
      </CardContent>
    </Card>
  )
}

export default Comment
