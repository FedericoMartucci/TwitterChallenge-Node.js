import { ExtendedPostDTO } from '@domains/post/dto'
import { CommentDTO, CommentInputDTO } from '../dto'
import { CursorPagination } from '@types'

export interface CommentRepository {
    createComment: (userId: string, postId: string, reactionType: CommentInputDTO) => Promise<CommentDTO>
    getByAuthorId: (userId: string, authorId: string) => Promise<CommentDTO[]>
    getByPostId: (userId: string, postId: string, options: CursorPagination) => Promise<ExtendedPostDTO[]>
}