import { PostDTO } from "@domains/post/dto";
import { CommentRepository } from "./comment.repository";
import { UserDTO } from "@domains/user/dto";
import { CommentDTO, CommentInputDTO } from "../dto";
import { PrismaClient } from "@prisma/client";
import { ReactionType } from "@domains/reaction/dto";

export class CommentRepositoryImpl implements CommentRepository{
    constructor (private readonly db: PrismaClient) {}
    async createComment(user: UserDTO, post: PostDTO, commentInput: CommentInputDTO): Promise<CommentDTO> {
        const comment = await this.db.post.create({
            data: {
                author: {
                    connect: { id: user.id },
                  },
                content: commentInput.comment,
                commentsInfo: {
                    create: {
                        postId: post.id,
                        userId: user.id,
                    },
                },
            },
        })
        return new CommentDTO(comment.id, comment.authorId, post.id, comment.content, comment.createdAt)
    }

    async getByAuthorId (userId: string, authorId: string): Promise<CommentDTO[]>{
        const comments = await this.db.post.findMany({
            where: {
                authorId: authorId,
                commentsInfo: {
                    some: {
                        userId: authorId, 
                    },
                },
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

        const commentIds = comments.map(comment => comment.id);

        const commentInfo = await this.db.commentInfo.findMany({
            where: {
                commentId: {
                    in: commentIds,
                },
            },
        })
        const commentDTOs = comments.map(comment => {
            const matchingCommentInfo = commentInfo.find(ci => ci.commentId === comment.id);
            const postId = matchingCommentInfo ? matchingCommentInfo.postId : '';
            return new CommentDTO(comment.id, comment.authorId, postId, comment.content, comment.createdAt);
          });
        
          return commentDTOs;
    }
} 