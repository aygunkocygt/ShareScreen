import db from "@/db/db";
import getSession from "@/hooks/getSession";  // Oturum bilgisini almak için
import ViewerComponent from "./_components/ViewerComponent";
import StreamerComponent from "./_components/StreamerComponent";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Dinamik metadata fonksiyonu
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Veritabanından oda bilgilerini çekiyoruz
  const room = await db.room.findUnique({
    where: { id: params.id },
    include: { createdBy: true },
  });

  if (!room) {
    return {
      title: "Room Not Found",
      description: "The room you are looking for does not exist.",
    };
  }

  return {
    title: `${room.name} - Share Screen`,
    description: `Join the room ${room.name} for live screen sharing. Created by ${room.createdBy.email}.`,
  };
}

export default async function RoomDetail({ params: { id } }: { params: { id: string } }) {
  // Odayı veritabanından bulma
  const room = await db.room.findUnique({
    where: { id },
    include: { createdBy: true },
  });

  if (!room || !room.createdBy) {
    return notFound();
  }

  // Oturum bilgisini alıyoruz
  const session = await getSession();

  // Kullanıcının oda sahibi olup olmadığını kontrol ediyoruz
  const isOwner = session?.user?.email === room.createdBy.email;

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-5 text-2xl mb-10">{room.name}</h1>
      {isOwner ? (
        <StreamerComponent streamKey={room.streamKey} roomId={id}/>  // Eğer kullanıcı oda sahibi ise StreamerComponent'i gösteriyoruz
      ) : (
        <ViewerComponent streamKey={room.streamKey} />  // Değilse ViewerComponent'i gösteriyoruz
      )}
    </div>
  );
}
