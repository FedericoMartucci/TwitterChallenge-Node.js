export interface FollowerRepository{
    followById: (userId: any) => Promise<void>;
    unfollowById: (userId: any) => Promise<void>;
    getById: (userId: any) => Promise<void>;
}