import { IsEnum, IsNotEmpty } from "class-validator"

export enum ReactionType{
    LIKE = 'LIKE',
    RETWEET = 'RETWEET'
}

export class ReactionDTO{
    constructor(id: string, userId: string, postId: string, reactionType: ReactionType, createdAt: Date){
        this.id = id
        this.userId = userId
        this.postId = postId
        this.reactionType = reactionType
        this.createdAt = createdAt
    }

    id: string
    userId: string
    postId: string
    reactionType: ReactionType
    createdAt: Date
}
export class ReactionInputDTO{
    @IsNotEmpty()
    @IsEnum(ReactionType)
    reactionType: ReactionType

    constructor(reactionType: ReactionType){
        this.reactionType = reactionType
    }
}
