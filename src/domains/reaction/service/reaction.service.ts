import { ReactionDTO, ReactionInputDTO } from "../dto"

export interface ReactionService {
    react: (userId: string, postId: string, reactionType: ReactionInputDTO) => Promise<ReactionDTO>
    deleteReaction: (userId: string, postId: string, reactionType: ReactionInputDTO) => Promise<string>
}