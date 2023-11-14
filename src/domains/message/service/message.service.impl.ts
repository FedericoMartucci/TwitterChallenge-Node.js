import { NotFoundException, UnauthorizedException } from "@utils"
import { MessageDTO, MessageInputDTO } from "../dto"
import { FollowerRepository } from "@domains/follower/repository"
import { MessageService } from "."
import { MessageRepository } from "../repository"



export class MessageServiceImpl implements MessageService {
    constructor (private readonly repository: MessageRepository, private readonly followerRepository: FollowerRepository) {}
    
    async sendMessage (userId: string, messageData: MessageInputDTO): Promise<MessageDTO>{
        // console.log(typeof(userId), userId, typeof(receiverId), receiverId)
        const isUserFollowingReceiver: boolean = await this.followerRepository.isFollowing(messageData.toId, userId)
        const isReceiverFollowingUser: boolean = await this.followerRepository.isFollowing(userId, messageData.toId)

        if (!isUserFollowingReceiver || !isReceiverFollowingUser) throw new UnauthorizedException('user')

        const messageSended: MessageDTO = await this.repository.create(userId, messageData)
        
        return messageSended
    }

    async getMessages (toId: string, fromId: string): Promise<MessageDTO[]>{
        const messages: MessageDTO[] | null = await this.repository.getByUserId(toId, fromId)
        
        if (!messages) throw new NotFoundException('messages')

        return messages
    }
  }