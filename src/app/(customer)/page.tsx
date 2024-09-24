import { cache } from "@/lib/cache";
import db from "@/db/db";
import RoomGridSection from "../_components/RoomGridSection";
import EmptyGridSection from "../_components/EmptyGridSection";
import getSession from '@/hooks/getSession';

export default async function HomePage() {
  // Extract user's email from the session object
  const session = await getSession();
  const userEmail = session?.user?.email

  // Fetch rooms filtered by the logged-in user's email
  const getRooms = cache(() => {
    return db.room.findMany({
      where: {
        createdBy: {
          email: userEmail, // Filter rooms by the logged-in user's email
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  }, ["/", "getRooms", userEmail]);

  const newestGetRooms = await getRooms();

  console.log("newestGetRooms:",newestGetRooms)

  return (
    <main className="space-y-12">
      {newestGetRooms.length > 0 ? (
        <RoomGridSection newestGetRooms={newestGetRooms} />
      ) : (
        <EmptyGridSection />
      )}
    </main>
  );
}
