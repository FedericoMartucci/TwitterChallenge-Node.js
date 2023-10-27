import { ExtendedPostDTO } from '@domains/post/dto'
import { CommentInputDTO, CommentDTO } from '../dto'

export interface CommentService {
  comment: (userId: string, postId: string, comment: CommentInputDTO) => Promise<CommentDTO>
  getCommentsByAuthorId: (userId: string, authorId: string) => Promise<CommentDTO[]>
  getCommentsByPostId: (userId: string, postId: string, options: { limit?: number, before?: string, after?: string }) => Promise<ExtendedPostDTO[]>
}