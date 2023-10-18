import { PostDTO } from "@domains/post/dto";
import { CommentRepository } from "./comment.repository";
import { UserDTO } from "@domains/user/dto";
import { CommentDTO, CommentInputDTO } from "../dto";
import { PrismaClient } from "@prisma/client";

export class CommentRepositoryImpl implements CommentRepository{
    constructor (private readonly db: PrismaClient) {}
    async createComment(user: UserDTO, post: PostDTO, commentInput: CommentInputDTO): Promise<CommentDTO> {
        const comment = await this.db.post.create({
            data: {
                author: {
                    connect: { id: user.id },
                  },
                content: commentInput.comment
            }
        })
        return new CommentDTO(comment.id, comment.authorId, post.id, comment.content, comment.createdAt)
    }
} 