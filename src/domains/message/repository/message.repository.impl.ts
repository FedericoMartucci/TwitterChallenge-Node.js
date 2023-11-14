import { PrismaClient } from "@prisma/client";
import { MessageRepository } from ".";
import { MessageDTO, MessageInputDTO } from "../dto";

export class MessageRepositoryImpl implements MessageRepository {
    constructor (private readonly db: PrismaClient) {}
    
    async create(userId: string, messageData: MessageInputDTO): Promise<MessageDTO> {
        const message = await this.db.message.create({
            data: {
                from: {
                    connect: { id: userId },
                },
                to: {
                    connect: { id: messageData.toId },
                },
                text: messageData.text,
                
            },
        })

        return new MessageDTO({id: message.id, fromId: message.fromId, toId: message.toId, text: message.text, createdAt: message.createdAt})
    }

    async getByUserId (toId: string, fromId: string): Promise<MessageDTO[] | null> {
        const messages = await this.db.message.findMany({
            where: {
                fromId: fromId,
                toId: toId,
            },
        })

        return !messages ? null : messages.map(message => new MessageDTO({id: message.id, fromId: message.fromId, toId: message.toId, text: message.text, createdAt: message.createdAt}))
    }
}