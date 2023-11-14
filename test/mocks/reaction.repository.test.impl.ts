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
        return postId === 'not-reacted-post-id'? null : new ReactionDTO("reactionId", userId, postId, reactionType.reactionType, new Date())
    }
    async getByAuthorId (userId: string, authorId: string): Promise<ReactionDTO[]>{
        const reactions: ReactionDTO[] = [
            {id: "reactionId1", userId: "authorId", postId: "postId1", reactionType: ReactionType.LIKE, createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "reactionId2", userId: "authorId", postId: "postId2", reactionType: ReactionType.RETWEET, createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "reactionId3", userId: "authorId", postId: "postId3", reactionType: ReactionType.LIKE, createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "reactionId4", userId: "authorId", postId: "postId4", reactionType: ReactionType.RETWEET, createdAt: new Date('2023-11-13T13:37:31.056Z')}
        ]
        return reactions.filter(reaction => reaction.userId === authorId)
    }

}