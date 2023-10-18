import { ConflictException, NotFoundException, db } from "@utils"
import { ReactionService } from "../service"
import { ReactionRepository } from "../repository"
import { ReactionDTO, ReactionInputDTO } from "../dto"
import { UserDTO } from "@domains/user/dto"
import { UserRepositoryImpl } from "@domains/user/repository"
import { PostRepositoryImpl } from "@domains/post/repository"
import { PostDTO } from "@domains/post/dto"

export class ReactionServiceImpl implements ReactionService {
    constructor (private readonly repository: ReactionRepository) {}
    
    async react (userId: string, postId: string, reactionType: ReactionInputDTO): Promise<ReactionDTO> {
        const post: PostDTO|null = await new PostRepositoryImpl(db).getById(userId, postId)
        const isAlreadyReacted: ReactionDTO|null = await this.repository.getById(userId, postId, reactionType)

        if(post === null) throw new NotFoundException('post')
        if(isAlreadyReacted) throw new ConflictException('ALREADY_REACTED_WITH_' + reactionType.reactionType)

        const user:UserDTO|null = await new UserRepositoryImpl(db).getById(userId)

        return await this.repository.createReaction(user as UserDTO, post as PostDTO, reactionType)
    }
  
    async deleteReaction (userId: string, postId: string, reactionType: ReactionInputDTO): Promise<string> {
        const reaction: ReactionDTO|null = await this.repository.getById(userId, postId, reactionType)

        if (reaction === null) throw new NotFoundException('reaction')

        await this.repository.delete(reaction.id)
        return reaction.id
    }
  }
  