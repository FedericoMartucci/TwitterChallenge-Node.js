import { NotFoundException } from '@utils/errors'
import { CursorPagination, OffsetPagination } from 'types'
import { ProfilePictureDTO, UserDTO, UserViewDTO } from '../dto'
import { UserRepository } from '../repository'
import { UserService } from './user.service'
import { getPreSignedURL, setPreSignedURL } from '@utils/aws'

require('dotenv').config();

export class UserServiceImpl implements UserService {
  constructor (private readonly repository: UserRepository) {}

  async getUser (userId: any): Promise<UserViewDTO> {
    const user = await this.repository.getUserViewById(userId)
    if (!user) throw new NotFoundException('user')
    return user
  }

  async getUserRecommendations (userId: any, options: OffsetPagination): Promise<UserViewDTO[]> {
    // TODO: make this return only users followed by users the original user follows
    return await this.repository.getRecommendedUsersPaginated(options)
  }

  async getUsersByUsername (userId: string, username: string, options: CursorPagination): Promise<UserViewDTO[]>{
    const user = await this.repository.getUsersByUsername(userId, username, options)
    if (!user) throw new NotFoundException('user')
    return user
  }

  async deleteUser (userId: any): Promise<void> {
    await this.repository.delete(userId)
  }

  async setUserPrivacy (userId: any, isPrivate: boolean): Promise<void>{
    await this.repository.updatePrivacy(userId, isPrivate)
  }

  async setUserProfilePicture (userId: any, data: ProfilePictureDTO): Promise<string>{
    const preSignedURL: string = setPreSignedURL(userId, data.name, data.extension)
    const downloadURL: string = getPreSignedURL(userId, data.name, data.extension)
    await this.repository.updateProfilePicture(userId, downloadURL)
    return preSignedURL
  }
}
