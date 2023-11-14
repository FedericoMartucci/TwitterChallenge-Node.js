import { MessageRepository } from "../../src/domains/message/repository"
import { MessageDTO, MessageInputDTO } from "../../src/domains/message/dto";

export class MessageRepositoryTestImpl implements MessageRepository {
    async create (userId: string, messageData: MessageInputDTO): Promise<MessageDTO>{
        return new MessageDTO({id: 'messageId', fromId: userId, toId: messageData.toId, text: messageData.text, createdAt: new Date('2023-11-13T13:37:31.056Z')})
    }

    async getByUserId (toId: string, fromId: string): Promise<MessageDTO[] | null>{
        const messages: MessageDTO[] = [
            {id: 'messageId1', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: 'messageId2', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: 'messageId3', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: 'messageId4', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
        ]

        return fromId !== 'not-found-messages-fromId'? messages : null
    }

}