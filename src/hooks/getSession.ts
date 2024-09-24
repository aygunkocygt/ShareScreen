"use server"

import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function getSession(){
    const session = await getServerSession(authOptions);

    return session
}