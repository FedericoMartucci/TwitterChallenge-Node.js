import { NotFoundException, db } from "@utils"
import { CommentService } from "../service"
import { CommentRepository } from "../repository"
import { CommentDTO, CommentInputDTO } from "../dto"
import { UserDTO } from "@domains/user/dto"
import { UserRepositoryImpl } from "@domains/user/repository"
import { PostRepositoryImpl } from "@domains/post/repository"
import { PostDTO } from "@domains/post/dto"
import { ReactionRepositoryImpl } from "@domains/reaction/repository"
import { ReactionInputDTO, ReactionTypeExtended } from "@domains/reaction/dto"

export class CommentServiceImpl implements CommentService {
    constructor (private readonly repository: CommentRepository) {}
    
    async comment (userId: string, postId: string, commentary: CommentInputDTO): Promise<CommentDTO> {
        const post: PostDTO|null = await new PostRepositoryImpl(db).getById(userId, postId)
        if(!post) throw new NotFoundException('post')
        const user:UserDTO|null = await new UserRepositoryImpl(db).getById(userId)
        await new ReactionRepositoryImpl(db).createReaction(user as UserDTO, post as PostDTO, new ReactionInputDTO('COMMENT' as ReactionTypeExtended))
        return await this.repository.createComment(user as UserDTO, post as PostDTO, commentary)
    }
  }
  