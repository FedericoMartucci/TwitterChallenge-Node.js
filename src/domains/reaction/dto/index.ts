import { IsEnum, IsNotEmpty } from "class-validator"

export enum ReactionType{
    LIKE = 'LIKE',
    RETWEET = 'RETWEET'
}
export enum ReactionTypeExtended{
    LIKE = 'LIKE',
    RETWEET = 'RETWEET',
    COMMENT = 'COMMENT'
}

export class ReactionDTO{
    constructor(id: string, userId: string, postId: string, reactionType: ReactionTypeExtended, createdAt: Date){
        this.id = id
        this.userId = userId
        this.postId = postId
        this.reactionType = reactionType
        this.createdAt = createdAt
    }

    id: string
    userId: string
    postId: string
    reactionType: ReactionTypeExtended
    createdAt: Date
}
export class ReactionInputDTO{
    @IsNotEmpty()
    @IsEnum(ReactionType)
    reactionType: ReactionTypeExtended

    constructor(reactionType: ReactionTypeExtended){
        this.reactionType = reactionType
    }
}