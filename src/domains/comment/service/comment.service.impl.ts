import { NotFoundException, db } from "../../../utils"
import { CommentService } from "../service"
import { CommentRepository } from "../repository"
import { CommentDTO, CommentInputDTO } from "../dto"
import { UserDTO } from "../../../domains/user/dto"
import { UserRepository, UserRepositoryImpl } from "../../../domains/user/repository"
import { PostRepository, PostRepositoryImpl } from "../../../domains/post/repository"
import { ExtendedPostDTO, PostDTO } from "../../../domains/post/dto"
import { CursorPagination } from "../../../types"

export class CommentServiceImpl implements CommentService {
    constructor (private readonly repository: CommentRepository, private readonly userRepository: UserRepository, private readonly postRepository: PostRepository) {
    }
    
    async comment (userId: string, postId: string, commentary: CommentInputDTO): Promise<CommentDTO> {
        const post: PostDTO|null = await this.postRepository.getById(userId, postId)
        if(!post) throw new NotFoundException('post')

        const user:UserDTO|null = await this.userRepository.getById(userId)
        if(!user) throw new NotFoundException('user')

        return await this.repository.createComment(userId, postId, commentary)
    }

    async getCommentsByPostId (userId: string, postId: string, options: CursorPagination): Promise<ExtendedPostDTO[]>{
        const comments = await this.repository.getByPostId(userId, postId, options)
        if(!comments.length) throw new NotFoundException('comments')

        return comments
    }

    async getCommentsByAuthorId (userId: string, authorId: string): Promise<CommentDTO[]>{
        const comments = await this.repository.getByAuthorId(userId, authorId)
        if(!comments.length) throw new NotFoundException('comments')
        return comments
    }
  }

  