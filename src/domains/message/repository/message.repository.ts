import { MessageDTO, MessageInputDTO } from "../dto"

export interface MessageRepository {
    create: (userId: string, messageData: MessageInputDTO) => Promise<MessageDTO>
    getByUserId: (toId: string, fromId: string) => Promise<MessageDTO[] | null>
}