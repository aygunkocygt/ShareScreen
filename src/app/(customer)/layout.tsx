
import Navbar from "../_components/Navbar";
import { getServerSession } from "next-auth";
import authOptions  from "@/pages/api/auth/[...nextauth]";

export default async function CustomerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const session = await getServerSession(authOptions);
    
    return (
    <div className={`antialiased`}>
        <Navbar session={session} />
        {children}
    </div>
    )
  }