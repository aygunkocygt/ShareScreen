"use client";
import { motion } from "framer-motion";
import { calculateDaysAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RoomGridSection = ({ newestGetRooms }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {newestGetRooms.map((room) => (
        <motion.div
          key={room.id}
          style={{ minWidth: 300 }}
          className="mt-10 p-6 shadow-lg rounded-lg bg-gradient-to-r from-[#180e13] to-[#14151c] border border-gray-800 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-white text-xl">{room.name}</h1>
            <span className="text-gray-400 text-xs">
              {calculateDaysAgo(room?.createdAt)}
            </span>
          </div>

          <h4 className="font-semibold text-sm text-gray-300 mb-4">
            {room.description || "No description available"}
          </h4>

          <div className="flex justify-between items-center mt-4">
            <Button onClick={() => {router.push(`/Room/${room.id}`)}} size={"sm"} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300">
              Join Room
            </Button>
            <Button size={"sm"} className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
              Delete Room
            </Button>
           
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RoomGridSection;
