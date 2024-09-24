import db from "@/db/db";
import getSession from "@/hooks/getSession";  // Oturum bilgisini almak için
import ViewerComponent from "./_components/ViewerComponent";
import StreamerComponent from "./_components/StreamerComponent";
import { notFound } from "next/navigation";

export default async function RoomDetail({ params: { id } }: { params: { id: string } }) {
  // Odayı veritabanından bulma
  const room = await db.room.findUnique({
    where: { id },
    include: { createdBy: true },  // Oda sahibinin bilgilerini de dahil ediyoruz
  });

  if (!room || !room.createdBy) {
    return notFound();
  }

  // Oturum bilgisini alıyoruz
  const session = await getSession();

  // Kullanıcının oda sahibi olup olmadığını kontrol ediyoruz
  const isOwner = session?.user?.email === room.createdBy.email;

  return (
    <div className="flex flex-col justify-center items-center  ">
      <h1 className="mt-5 mb-10">{room.name} Room</h1>
      {isOwner ? (
        <StreamerComponent streamKey={room.streamKey} roomId={id}/>  // Eğer kullanıcı oda sahibi ise StreamerComponent'i gösteriyoruz
      ) : (
        <ViewerComponent streamKey={room.streamKey} />  // Değilse ViewerComponent'i gösteriyoruz
      )}
    </div>
  );
}
