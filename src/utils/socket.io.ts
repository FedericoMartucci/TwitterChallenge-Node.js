import { io } from "@server";

io.use(async (socket, next) => {
    try {
      // Implement user authentication using JWT or other methods
      // Ensure that users follow each other
    //   if (authenticated && followEachOther) {
        return next();
    //   }
      throw new Error('Authentication failed');
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });