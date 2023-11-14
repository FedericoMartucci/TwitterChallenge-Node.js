import { io } from "@server";
import { UnauthorizedException } from "./errors";
import jwt from 'jsonwebtoken'
import { Constants } from "./constants";
import { Socket } from "socket.io";

interface SocketIO extends Socket {
    userId?: string
  }

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
         // Ensure that users follow each other
         
        throw new Error('Authentication failed');
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
      const messages = await messageService.getMessages(socket.userId, receiverId)
      socket.emit('messages', messages)
    })
  
    socket.on('sendMessage', async (messageData) => {
      if (!socket.userId) return
      console.log(messageData)
      const parsedData = JSON.parse(messageData)
      console.log(parsedData.receiverId)
      const message = await messageService.sendMessage(socket.userId, parsedData.receiverId, parsedData.content)
      io.emit("newMessage", message)
    })
  })

 // Handling chat events
//  io.on('connection', (socket) => {
//      socket.on('message', async (messageData) => {
//        try {
//          // Save the message to the database using Prisma
//         //  const message = await prisma.message.create({
//         //    data: {
//         //      fromId: socket.user.id,
//         //      toId: messageData.to,
//         //      text: messageData.text,
//         //    },
        
//          });
  
// //         // Emit the message to the recipient
//          io.to(messageData.to).emit('message', messageData);
//        } catch (error) {
//          // Handle errors
//        }
//      });
//    });