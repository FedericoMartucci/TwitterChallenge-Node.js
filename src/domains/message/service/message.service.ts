import { MessageDTO, MessageInputDTO } from "../dto";

export interface MessageService {
    sendMessage: (userId: string, messageData: MessageInputDTO) => Promise<MessageDTO>;
    getMessages: (userId: string, fromId: string) => Promise<MessageDTO[]>;
}