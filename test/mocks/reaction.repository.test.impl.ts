import { ReactionRepository } from "../../src/domains/reaction/repository"
import { PostDTO } from "../../src/domains/post/dto";
import { ReactionInputDTO, ReactionDTO, ReactionType } from "../../src/domains/reaction/dto";
import { UserDTO } from "../../src/domains/user/dto";

export class ReactionRepositoryTestImpl implements ReactionRepository{
    async createReaction (user: UserDTO, post: PostDTO, reactionType: ReactionInputDTO): Promise<ReactionDTO>{
        return new ReactionDTO("reactionId", user.id, post.id, reactionType.reactionType, new Date());
    }
    async delete (reactionId: string): Promise<void>{}
    async getById (userId: string, postId: string, reactionType: ReactionInputDTO): Promise<ReactionDTO | null>{
<<<<<<< HEAD
        return postId === 'already-reacted-postId'? new ReactionDTO("reactionId", userId, postId, reactionType.reactionType, new Date()) : null
=======
        return userId === 'non-existing-reaction'? null : new ReactionDTO("reactionId", userId, postId, reactionType.reactionType, new Date())
>>>>>>> 1868bb6fc14db0eafe2793685febe65d40cd53b0
    }
    async getByAuthorId (userId: string, authorId: string): Promise<ReactionDTO[]>{
        const reactions: ReactionDTO[] = [
            {id: "reactionId1", userId: "userId", postId: "postId1", reactionType: ReactionType.LIKE, createdAt: new Date()},
            {id: "reactionId2", userId: "userId", postId: "postId2", reactionType: ReactionType.RETWEET, createdAt: new Date()},
            {id: "reactionId3", userId: "userId", postId: "postId3", reactionType: ReactionType.LIKE, createdAt: new Date()},
            {id: "reactionId4", userId: "userId", postId: "postId4", reactionType: ReactionType.RETWEET, createdAt: new Date()}
        ]
        return reactions.filter(reaction => reaction.userId === userId)
    }

}