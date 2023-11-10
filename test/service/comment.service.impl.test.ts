import { CreatePostInputDTO, PostDTO } from "../../src/domains/post/dto";
import { CommentService, CommentServiceImpl } from "../../src/domains/comment/service"
import { ForbiddenException, NotFoundException } from "../../src/utils";
import { CommentRepositoryTestImpl } from "../mocks/comment.repository.test.impl";

const commentService: CommentService = new CommentServiceImpl(new CommentRepositoryTestImpl())