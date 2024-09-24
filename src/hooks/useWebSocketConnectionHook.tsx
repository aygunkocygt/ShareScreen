import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

// WebSocket Hook
const useWebSocketConnectionHook = (cb: (data: any) => void, event: string) => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // WebSocket bağlantısı oluşturma
    const socket = io({
      transports: ["websocket"], // WebSocket transportunu kullan
      path: "/api/socket", // Sunucu ile aynı path
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on(event, (data) => {
      cb(data); // Gelen veriyi callback fonksiyonuna gönder
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err); // Bağlantı hatası çıktısını göster
    });

    socketRef.current = socket;

    return () => {
      socketRef.current?.disconnect(); // Component unmount olduğunda socket bağlantısını kapat
    };
  }, [event]);

  const emitEvent = (event: string, data: any) => {
    socketRef.current?.emit(event, data); // Mesaj gönderme fonksiyonu
  };

  return { emitEvent }; // Emit fonksiyonunu döndür
};

export default useWebSocketConnectionHook;
