import { SignupInputDTO } from '@domains/auth/dto'
import { CursorPagination, OffsetPagination } from '@types'
import { ExtendedUserDTO, UserDTO, UserViewDTO } from '../dto'

export interface UserRepository {
  create: (data: SignupInputDTO) => Promise<UserDTO>
  delete: (userId: string) => Promise<void>
  getRecommendedUsersPaginated: (options: OffsetPagination) => Promise<UserViewDTO[]>
  getUserViewById: (userId: string) => Promise<UserViewDTO | null>
  getById: (userId: string) => Promise<UserDTO | null>
  getByEmailOrUsername: (email?: string, username?: string) => Promise<ExtendedUserDTO | null>
  getUsersByUsername: (userId: string, username: string, options: CursorPagination) => Promise<UserViewDTO[]|null>
  isExistingId: (userId: any) => Promise<boolean>
  updatePrivacy: (userId: any, isPrivate: boolean) => Promise<void>
  updateProfilePicture: (userId: string, downloadURL: string) => Promise<void>
}
