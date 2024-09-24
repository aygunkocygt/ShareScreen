import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

// Socket.IO sunucu başlatma
export default function SocketHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO server");

    // Socket.IO sunucusu oluşturma
    const io = new Server(res.socket.server, {
      path: "/api/socket", // Path istemci ile eşleşmeli
      cors: {
        origin: "*", // CORS politikası: geliştirirken tüm origin'lere izin
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on("message", (data) => {
        console.log("Received message from client:", data);
      });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    // Socket.IO sunucusunu global olarak ekleyin
    res.socket.server.io = io;
  } else {
    console.log("Socket.IO is already running"); // Bu mesaj sürekli çıkıyorsa istemci tarafında bir sorun olabilir
  }
  res.end();
}
