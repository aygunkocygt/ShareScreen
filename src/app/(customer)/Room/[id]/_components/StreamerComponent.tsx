"use client";
import { useEffect, useRef } from "react";
import flvjs from 'flv.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StreamerComponent({ streamKey }: { streamKey: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let rtmpUrl = process.env.NEXT_PUBLIC_RTMP_URL;
    let flvPlayer: flvjs.Player | null = null;

    if (flvjs.isSupported()) {
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: `${rtmpUrl}/live/${streamKey}.flv`
      });
      flvPlayer.attachMediaElement(videoRef.current as HTMLVideoElement);
      flvPlayer.load();
      flvPlayer.play().catch(error => console.error("Playback error:", error));
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
    <>
    <Card className="w-full max-w-md p-6 bg-gradient-to-r from-[#180e13] to-[#14151c] border border-gray-800 mb-5">
    <CardHeader>
          <CardTitle>Room Information (OBS)</CardTitle>
        </CardHeader>
    <CardContent>
          <div className="space-y-4">
             <label htmlFor="name" className="block text-sm font-medium text-white">
              Server : {process.env.NEXT_PUBLIC_RTMP_TEXT}
              </label>
              <label htmlFor="name" className="block text-sm font-medium text-white">
              Stream Key : {streamKey}
              </label>
             
            </div>
            </CardContent>
      </Card>
    <video ref={videoRef} controls autoPlay />
  
    </>
    
    </>
  );
}
