import { UserDTO } from "@domains/user/dto";
import { FollowDTO } from "../dto";

export interface FollowerRepository{
    followByUsers: (follower:UserDTO, followed:UserDTO) => Promise<FollowDTO>;
    unfollowById: (followId: string) => Promise<void>;
    getFollowId: (follower:UserDTO, followed:UserDTO) => Promise<string|undefined>;
    isFollowing: (userId: string, ownId: string) => Promise<boolean>;
}