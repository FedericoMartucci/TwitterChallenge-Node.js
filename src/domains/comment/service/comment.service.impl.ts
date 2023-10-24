import { NotFoundException, db } from "@utils"
import { CommentService } from "../service"
import { CommentRepository } from "../repository"
import { CommentDTO, CommentInputDTO } from "../dto"
import { UserDTO } from "@domains/user/dto"
import { UserRepositoryImpl } from "@domains/user/repository"
import { PostRepositoryImpl } from "@domains/post/repository"
import { PostDTO } from "@domains/post/dto"
import { ReactionRepositoryImpl } from "@domains/reaction/repository"
import { ReactionInputDTO, ReactionType } from "@domains/reaction/dto"

const postRepository: PostRepositoryImpl = new PostRepositoryImpl(db)
const userRepository: UserRepositoryImpl = new UserRepositoryImpl(db)

export class CommentServiceImpl implements CommentService {
    constructor (private readonly repository: CommentRepository) {
    }
    
    async comment (userId: string, postId: string, commentary: CommentInputDTO): Promise<CommentDTO> {
        const post: PostDTO|null = await postRepository.getById(userId, postId)
        if(!post) throw new NotFoundException('post')

        const user:UserDTO|null = await userRepository.getById(userId)
        if(!user) throw new NotFoundException('user')

        return await this.repository.createComment(user, post as PostDTO, commentary)
    }

    async getCommentsByAuthorId (userId: string, authorId: string): Promise<CommentDTO[]>{
        const comments = await this.repository.getByAuthorId(userId, authorId)
        if(!comments.length) throw new NotFoundException('comments')
        return comments
    }
  }
  