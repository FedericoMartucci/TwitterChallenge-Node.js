import { PrismaClient } from '@prisma/client'

import { ReactionRepository } from '.'
import { ReactionDTO, ReactionInputDTO, ReactionType } from '../dto'
import { UserDTO } from '../../../domains/user/dto'
import { PostDTO } from '../../../domains/post/dto'

export class ReactionRepositoryImpl implements ReactionRepository {
  constructor (private readonly db: PrismaClient) {}

  async createReaction (user: UserDTO, post: PostDTO, reactionType: ReactionInputDTO): Promise<ReactionDTO> {
    const reaction = await this.db.reaction.create({
       data: {
        reactionType: reactionType.reactionType,
        user: {
            connect: { id: user.id },
          },
        post: {
            connect: { id: post.id },
          },
       }
    })
    return new ReactionDTO(reaction.id, reaction.userId, reaction.postId, reaction.reactionType as ReactionType, reaction.createdAt)
  }

  async delete (reactionId: string): Promise<void> {
    await this.db.reaction.delete({
      where: {
        id: reactionId
      }
    })
  }

  async getById (userId: string, postId: string, reactionType: ReactionInputDTO): Promise<ReactionDTO | null> {
    const reaction = await this.db.reaction.findFirst({
      where: {
        userId: userId,
        postId: postId,
        reactionType: reactionType.reactionType,
      },
    })
    return reaction !== null? new ReactionDTO(reaction.id, reaction.userId, reaction.postId, reaction.reactionType as ReactionType, reaction.createdAt) : null
  }

  async getByAuthorId (userId: string, authorId: string): Promise<ReactionDTO[]>{
    const reactions = await this.db.reaction.findMany({
        where: {
            userId: authorId,
            OR: [
                  {
                    user: {
                      followers: {
                        some: {
                          followerId: userId,
                        },
                      },
                    },
                  },
                  {
                    userId: userId,
                  },
                  {
                    user: {
                      isPrivate: false,
                    },
                  },
                ],
        },
    })
    return reactions.map(reactions => new ReactionDTO(reactions.id, reactions.userId, reactions.postId, reactions.reactionType as ReactionType, reactions.createdAt))
}

}
