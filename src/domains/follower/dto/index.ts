export class FollowDTO {
    constructor (id:string, followerId:string, followedId:string, createdAt:Date) {
        this.id = id
        this.followerId = followerId
        this.followedId = followedId
        this.createdAt = createdAt
    }
  
    id: string
    followerId: string | undefined
    followedId: string | undefined
    createdAt: Date
}