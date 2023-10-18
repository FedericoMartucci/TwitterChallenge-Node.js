import { PostDTO } from '@domains/post/dto'
import { ReactionDTO, ReactionInputDTO } from '../dto'
import { UserDTO } from '@domains/user/dto'

export interface ReactionRepository {
  react: (user: UserDTO, post: PostDTO, reactionType: ReactionInputDTO) => Promise<ReactionDTO>
  delete: (reactionId: string) => Promise<void>
  getById: (userId: string, postId: string, reactionType: ReactionInputDTO) => Promise<ReactionDTO | null>
}