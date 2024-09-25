"use client";
import { useEffect, useRef } from "react";
import flvjs from 'flv.js';
import { Card, CardContent } from "@/components/ui/card";

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
      <Card className="w-1/2 h-auto p-6 bg-gradient-to-r from-[#180e13] to-[#14151c] border border-gray-800 mb-5">
        <CardContent>
          <div className="space-y-4">
            <h1 className="block text-xl font-bold text-white">
              Room Information (OBS)
            </h1>
            <label className="block text-xs font-medium text-white">
              Server : {process.env.NEXT_PUBLIC_RTMP_TEXT}
            </label>
            <label className="block text-xs font-medium text-white">
              Stream Key : {streamKey}
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Video başlangıçta GIF gösterir, yayın başladığında FLV'yi gösterir */}
      <video ref={videoRef} controls autoPlay className="w-1/2 h-auto max-w-screen-lg "/>
    </>
  );
}
