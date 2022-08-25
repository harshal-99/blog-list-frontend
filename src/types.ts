export type LoginUserDto = {
  username: string
  password: string
}

export enum SnackBarStatus {
  success = "success",
  error = "error",
  empty = ''
}

export type SnackBarProps = {
  message: string
  status: SnackBarStatus
  open: boolean
  hideAfter: number
}

export type UserType = {
  name: string
  username: string
  token: string
  id: string
} | null

export type BlogType = {
  id: string
  title: string
  author: string
  content: string
  likes: number
  userId: string
  comments: []
} | null


export type CommentType = {
  userId: string
  blogId: string
  comment: string
  id: string
  date: Date
}

export type BlogComments = {
  blogId: string
  comments: CommentType[]
}
