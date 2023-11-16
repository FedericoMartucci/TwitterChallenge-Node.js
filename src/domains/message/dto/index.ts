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
        this.text = message.text
        this.from = message.from
        this.to = message.to
        this.username = message.username
    }

    text: string
    from: string
    to: string
    username: string
}