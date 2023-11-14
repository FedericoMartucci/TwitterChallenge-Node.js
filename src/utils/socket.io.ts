import { io } from "@server";
import { UnauthorizedException } from "./errors";
import jwt from 'jsonwebtoken'
import { Constants } from "./constants";
import { Socket } from "socket.io";
import { MessageService, MessageServiceImpl } from "@domains/message";
import { FollowerRepositoryImpl } from "@domains/follower/repository";
import { MessageRepositoryImpl } from "@domains/message/repository";
import { db } from "./database";

interface SocketIO extends Socket {
    userId?: string
  }

const messageService: MessageService = new MessageServiceImpl(new MessageRepositoryImpl(db), new FollowerRepositoryImpl(db))

 //Socket.IO Authentication
 io.use(async (socket: SocketIO, next) => {
     try {
        const token = socket.handshake.query.token;

        if (!token || typeof(token) !== 'string' ) throw new UnauthorizedException('MISSING_TOKEN')

        jwt.verify(token, Constants.TOKEN_SECRET, (err, context) => {
            if (err || context === undefined || typeof context === 'string'){
                throw new UnauthorizedException('INVALID_TOKEN')
            } else {
                socket.userId = context.userId
                next()
            }
        })
     } catch (error) {
        socket.disconnect();
        return next(new Error('Authentication error'));
     }
 });

 io.on('connection', (socket: SocketIO) => {
    if (!socket.userId) return socket.disconnect()
    console.log('The user ' + socket.userId + ' is connected.')
  
    socket.on('getMessages', async (receiverId) => {
      if (!socket.userId) return
      const messages = await messageService.getMessages(receiverId, socket.userId)
      socket.emit('messages', messages)
    })
  
    socket.on('sendMessage', async (messageData) => {
      if (!socket.userId) return
      console.log(messageData)
      const parsedData = JSON.parse(messageData)
      console.log(parsedData.receiverId)
      const message = await messageService.sendMessage(socket.userId, parsedData.content)
      io.emit("newMessage", message)
    })
  })