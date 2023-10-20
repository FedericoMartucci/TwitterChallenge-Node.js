import { PostDTO } from "@domains/post/dto";
import { CommentRepository } from "./comment.repository";
import { UserDTO } from "@domains/user/dto";
import { CommentDTO, CommentInputDTO } from "../dto";
import { PrismaClient } from "@prisma/client";
import { ReactionType, ReactionTypeExtended } from "@domains/reaction/dto";

export class CommentRepositoryImpl implements CommentRepository{
    constructor (private readonly db: PrismaClient) {}
    async createComment(user: UserDTO, post: PostDTO, commentInput: CommentInputDTO): Promise<CommentDTO> {
        const comment = await this.db.post.create({
            data: {
                author: {
                    connect: { id: user.id },
                  },
                content: commentInput.comment,
                isComment: true,
            }
        })
        return new CommentDTO(comment.id, comment.authorId, comment.content, comment.createdAt)
    }

    async getByAuthorId (userId: string, authorId: string): Promise<CommentDTO[]>{
        const comments = await this.db.post.findMany({
            where: {
                isComment: true,
                authorId: authorId,
                OR: [
                    {
                    author: {
                        followers: {
                        some: {
                            followerId: userId,
                        },
                        },
                    },
                    },
                    {
                        authorId: userId,
                    },
                    {
                        author: {
                          isPrivate: false,
                        },
                    },
                ],
            },
        })
        return comments.map(comments => new CommentDTO(comments.id, comments.authorId, comments.content, comments.createdAt))
    }
} 