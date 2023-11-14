import { SignupInputDTO } from '../../../domains/auth/dto'
import { PrismaClient } from '@prisma/client'
import { CursorPagination, OffsetPagination } from '../../../types'
import { ExtendedUserDTO, UserDTO, UserViewDTO } from '../dto'
import { UserRepository } from './user.repository'

export class UserRepositoryImpl implements UserRepository {
  constructor (private readonly db: PrismaClient) {}

  async create (data: SignupInputDTO): Promise<UserDTO> {
    return await this.db.user.create({
      data
    }).then(user => new UserDTO(user))
  }

  async getUserViewById (userId: any): Promise<UserViewDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId
      },
      include: {
        follows: true,
      },
    })
    if(!user)
      return null

    if(user.follows.filter(follows => follows.followedId === userId).length !== 0)
      return new UserViewDTO({
        id: user.id,
        name: user.name,
        username: user.username,
        followsYou: true,
        profilePicture: user.profilePicture})

    return new UserViewDTO({
        id: user.id,
        name: user.name,
        username: user.username,
        followsYou: false,
        profilePicture: user.profilePicture})
  }

  async getById (userId: any): Promise<UserDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId
      },
    })
    
    return user? new UserDTO(user) : null
  }

  async delete (userId: any): Promise<void> {
    await this.db.user.delete({
      where: {
        id: userId
      }
    })
  }

  async getRecommendedUsersPaginated (options: OffsetPagination): Promise<UserViewDTO[]> {
    const users = await this.db.user.findMany({
      take: options.limit ? options.limit : undefined,
      skip: options.skip ? options.skip : undefined,
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
    return users.map(user => new UserViewDTO(user))
  }

  async getByEmailOrUsername (email?: string, username?: string): Promise<ExtendedUserDTO | null> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email
          },
          {
            username
          }
        ]
      }
    })
    return user ? new ExtendedUserDTO(user) : null
  }

  async getUsersByUsername (userId: string, username: string, options: CursorPagination): Promise<UserViewDTO[]|null>{
    const users = await this.db.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      cursor: options.after ? { id: options.after } : (options.before) ? { id: options.before } : undefined,
      skip: options.after ?? options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
    })
    return users !== null? users.map(user => new UserViewDTO(user)) : null
  }

  async isExistingId (userId: any): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId
      }
    })
    return user ? true : false
  }
  async updatePrivacy(userId: any, isPrivate: boolean): Promise<void>{
    await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        isPrivate: isPrivate,
      },
    })
  }
  async updateProfilePicture (userId: string, downloadURL: string): Promise<void>{
    await this.db.user.update({
      where:{
        id: userId,
      },
      data: {
        profilePicture: downloadURL
      },
    })
  }
}
