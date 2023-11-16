import { ForbiddenException, NotFoundException, UnauthorizedException } from "../../../utils"
import { MessageDTO, MessageInputDTO } from "../dto"
import { FollowerRepository } from "../../follower/repository"
import { MessageService } from "."
import { MessageRepository } from "../repository"



export class MessageServiceImpl implements MessageService {
    constructor (private readonly repository: MessageRepository, private readonly followerRepository: FollowerRepository) {}
    
    async sendMessage (messageData: MessageInputDTO): Promise<MessageDTO>{
        const isUserFollowingReceiver: boolean = await this.followerRepository.isFollowing(messageData.to, messageData.from)
        const isReceiverFollowingUser: boolean = await this.followerRepository.isFollowing(messageData.from, messageData.to)

        if (!isUserFollowingReceiver || !isReceiverFollowingUser) throw new ForbiddenException()

        const messageSended: MessageDTO = await this.repository.create(messageData.from, messageData)
        
        return messageSended
    }

    async getMessages (toId: string, fromId: string): Promise<MessageDTO[]>{
        const messages: MessageDTO[] | null = await this.repository.getByUserId(toId, fromId)
        
        if (!messages) throw new NotFoundException('messages')

        return messages
    }
  }