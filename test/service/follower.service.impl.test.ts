import { CreatePostInputDTO, PostDTO } from "../../src/domains/post/dto";
import { FollowerService, FollowerServiceImpl } from "../../src/domains/follower/service"
import { ForbiddenException, NotFoundException } from "../../src/utils";
import { FollowerRepositoryTestImpl } from "../mocks/follower.repository.test.impl";

const followerService: FollowerService = new FollowerServiceImpl(new FollowerRepositoryTestImpl())