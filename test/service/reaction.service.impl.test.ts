import { CreatePostInputDTO, PostDTO } from "../../src/domains/post/dto";
import { ReactionService, ReactionServiceImpl } from "../../src/domains/reaction/service"
import { ForbiddenException, NotFoundException } from "../../src/utils";
import { ReactionRepositoryTestImpl } from "../mocks/reaction.repository.test.impl";

const reactionService: ReactionService = new ReactionServiceImpl(new ReactionRepositoryTestImpl())