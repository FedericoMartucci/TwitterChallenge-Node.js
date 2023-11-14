export class MessageDTO{
    constructor (message: MessageDTO) {
        this.id = message.id
        this.fromId = message.fromId
        this.toId = message.toId
        this.text = message.text
        this.createdAt = message.createdAt
    }

        id: string
        text: string
        fromId: string
        toId: string
        createdAt: Date
}

export class MessageInputDTO {
    constructor (message: MessageInputDTO) {
        this.toId = message.toId
        this.text = message.text
    }

    text: string
    toId: string
}