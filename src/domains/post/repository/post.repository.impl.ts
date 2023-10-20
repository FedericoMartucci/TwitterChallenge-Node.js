import { PrismaClient } from '@prisma/client'

import { CursorPagination } from '@types'

import { PostRepository } from '.'
import { CreatePostInputDTO, PostDTO } from '../dto'
import { ReactionType } from '@domains/reaction/dto'

export class PostRepositoryImpl implements PostRepository {
  constructor (private readonly db: PrismaClient) {}

  async create (userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    const post = await this.db.post.create({
      data: {
        authorId: userId,
        ...data
      }
    })
    return new PostDTO(post)
  }

  async getAllByDatePaginated (userId: string, options: CursorPagination): Promise<PostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        OR: [
          {
            author: {
              isPrivate: false,
            },
          },
          {
            author: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
        isComment: false,
      },
      cursor: options.after ? { id: options.after } : (options.before) ? { id: options.before } : undefined,
      skip: options.after ?? options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'asc'
        }
      ]
    })
    return posts.map(post => new PostDTO(post))
  }

  async delete (postId: string): Promise<void> {
    await this.db.post.delete({
      where: {
        id: postId
      }
    })
  }

  async getById (userId: string, postId: string): Promise<PostDTO | null> {
    const post = await this.db.post.findUnique({
      where: {
        OR:[
          {
            authorId : userId,
          },
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
            author: {
              isPrivate: false,
            },
          },
        ],
        id: postId,
        isComment: false,
      }
    })
    return (post != null) ? new PostDTO(post) : null
  }

  async getByAuthorId (userId: string, authorId: string): Promise<PostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        isComment: false,
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
        ],
      },
    })
    return posts.map(post => new PostDTO(post))
  }
}


