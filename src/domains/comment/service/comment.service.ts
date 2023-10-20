import { CommentInputDTO, CommentDTO } from '../dto'

export interface CommentService {
  comment: (userId: string, postId: string, comment: CommentInputDTO) => Promise<CommentDTO>
  getCommentsByAuthorId: (userId: string, authorId: string) => Promise<CommentDTO[]>
}