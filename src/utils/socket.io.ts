import { io } from "@server";
import { UnauthorizedException } from "./errors";
import jwt from 'jsonwebtoken'
import { Constants } from "./constants";
import { Socket } from "socket.io";
import { MessageService, MessageServiceImpl } from "@domains/message";
import { FollowerRepositoryImpl } from "@domains/follower/repository";
import { MessageRepositoryImpl } from "@domains/message/repository";
import { db } from "./database";
import { MessageInputDTO } from "../domains/message/dto"

interface SocketIO extends Socket {
    userId?: string
  }

const messageService: MessageService = new MessageServiceImpl(new MessageRepositoryImpl(db), new FollowerRepositoryImpl(db))

 //Socket.IO Authentication Middleware
 io.use(async (socket: SocketIO, next) => {
     try {
        const token = socket.handshake.query.token;
        if (!token || typeof(token) !== 'string' ) throw new UnauthorizedException('MISSING_TOKEN')
        jwt.verify(token, Constants.TOKEN_SECRET, (err, context) => {
            if (err || context === undefined || typeof context === 'string') throw new UnauthorizedException('INVALID_TOKEN')
            else {
                socket.userId = context.userId
                next()
            }
        })
     } catch (error) {
        socket.disconnect()
        return next(new Error('Authentication error'))
     }
 });

 io.on('connection', (socket: SocketIO) => {
  try{
    if (!socket.userId) throw new Error('Connection error')
    socket.on('sendMessage', async (messageData: MessageInputDTO) => {
      if (!socket.userId) throw new Error('Connection error')
      try{
        const message = await messageService.sendMessage(messageData)
        io.emit("newMessage", {from: message.fromId, to: message.toId, text: message.text, username: messageData.username})
      } catch (error) {
        console.log(error)
      }
    })
  } catch (error) {
    socket.disconnect()
    return error
  } 
})