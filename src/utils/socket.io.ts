import { io } from "@server";
import { UnauthorizedException } from "./errors";
import jwt from 'jsonwebtoken'
import { Constants } from "./constants";
 //Socket.IO Authentication
 io.use(async (socket, next) => {
     try {
        const token = socket.handshake.query.token;

        if (!token || typeof(token) !== 'string' ) throw new UnauthorizedException('MISSING_TOKEN')

        jwt.verify(token, Constants.TOKEN_SECRET, (err, context) => {
            if (err) throw new UnauthorizedException('INVALID_TOKEN')
        })
         // Ensure that users follow each other
         if (token && /*followEachOther*/) {
             return next();
         }
        throw new Error('Authentication failed');
     } catch (error) {
        socket.disconnect();
        return next(new Error('Authentication error'));
     }
 });

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