"use client";
import { useEffect, useRef } from "react";
import flvjs from 'flv.js';

export default function ViewerComponent({ streamKey }: { streamKey: string }) {
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
      <video ref={videoRef} controls autoPlay />
    </>
  );
}
