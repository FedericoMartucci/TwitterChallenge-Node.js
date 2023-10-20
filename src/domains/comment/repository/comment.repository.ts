import { PostDTO } from '@domains/post/dto'
import { CommentDTO, CommentInputDTO } from '../dto'
import { UserDTO } from '@domains/user/dto'

export interface CommentRepository {
    createComment: (user: UserDTO, post: PostDTO, reactionType: CommentInputDTO) => Promise<CommentDTO>
    getByAuthorId: (userId: string, authorId: string) => Promise<CommentDTO[]>
}