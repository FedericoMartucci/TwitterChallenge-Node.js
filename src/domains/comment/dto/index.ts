import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CommentInputDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(240)
    comment: string;

    constructor(comment: string){
        this.comment = comment;
    }

}

export class CommentDTO{
    id: string
    authorId: string
    postId: string | undefined
    comment: string
    createdAt: Date

    constructor (id: string, authorId: string, comment: string, createdAt: Date) {
        this.id = id
        this.authorId = authorId
        this.comment = comment
        this.createdAt = createdAt
    }
}