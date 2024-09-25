"use client";
import { useEffect, useRef } from "react";
import flvjs from 'flv.js';


export default function StreamerComponent({ streamKey }: { streamKey: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let rtmpUrl = process.env.NEXT_PUBLIC_RTMP_URL;
    let flvPlayer: flvjs.Player | null = null;

    if (flvjs.isSupported() && videoRef.current) {
      // FLV.js player'ını oluşturuyoruz
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: `${rtmpUrl}/live/${streamKey}.flv`,
        isLive: true,
      });

      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();

      // Yayın başladığında FLV kaynağını oynatmaya başlar
      flvPlayer.play().then(() => {
        console.log("Yayın başladı.");
      }).catch(error => {
        console.error("Yayın başlatılamadı:", error);
      });
    }

    return () => {
      if (flvPlayer) {
        flvPlayer.destroy();
        flvPlayer = null;
      }
    };
  }, [streamKey]);

  return (
    <>
      <video ref={videoRef} controls autoPlay className="w-1/2 h-auto max-w-screen-lg" />
    </>
  );
}
