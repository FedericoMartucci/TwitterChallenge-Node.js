import { MessageDTO, MessageInputDTO } from "../dto";

export interface MessageService {
    sendMessage: (messageData: MessageInputDTO) => Promise<MessageDTO>;
    getMessages: (toId: string, fromId: string) => Promise<MessageDTO[]>;
}