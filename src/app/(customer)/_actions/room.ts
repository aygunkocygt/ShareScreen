"use server";

import db from "@/db/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import getSession from '@/hooks/getSession';

const addSchema = z.object({
  name: z.string().min(1, "Room name is required."),
  description: z.string().min(1, "Room description is required."),
  streamKey:z.string().min(1, "streamKey is required."),
});

export async function createRoom(prevState: unknown, formData: FormData) {
  const session = await getSession();
  const userEmail = session?.user?.email

  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;


  let user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user) {
    redirect('/login')
  }
  console.log("user:>>>",user)
  // Create the room and get its ID
  const newRoom = await db.room.create({
    data: {
      userId:user.id,
      name: data.name,
      description: data.description,
      streamKey:data.streamKey
    },
    select: {
      id: true, // Get the ID of the newly created room
    },
  });

  revalidatePath("/");
  
  // Redirect to the new room's page using the room ID
  redirect(`/Room/${newRoom.id}`);
}


export async function deleteRoom(formData: FormData) {
  const session = await getSession();
  const userEmail = session?.user?.email;

  const { roomId } = formData;

  // Find the room and make sure the current user is the owner
  const room = await db.room.findUnique({
    where: { id: roomId },
    select: { userId: true },
  });

  if (!room) {
    return { error: "Room not found." };
  }

  // Check if the logged-in user is the owner of the room
  let user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user || user.id !== room.userId) {
    return { error: "You are not authorized to delete this room." };
  }

  // Delete the room
  await db.room.delete({
    where: { id: roomId },
  });

  revalidatePath("/"); // Revalidate the homepage (or any other path)

  // Redirect to the homepage after deleting the room
  redirect("/");
}