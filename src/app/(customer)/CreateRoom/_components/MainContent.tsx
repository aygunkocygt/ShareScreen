"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormState,useFormStatus } from 'react-dom'
import { createRoom } from "../../_actions/room";
import { Loader2 } from "lucide-react"


export default function MainContent() {
  const [error,action] = useFormState(createRoom, {})

  return (
    <Card className="w-full max-w-md p-6 bg-gradient-to-r from-[#180e13] to-[#14151c] border border-gray-800">
    <form action={action}>
        <CardHeader>
          <CardTitle>Create a New Room</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Room Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                className={error.name ? "mt-1 block w-full border border-red-600" : "mt-1 block w-full"}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white">
                Room Description
              </label>
              <Input
                type="text"
                id="description"
                name="description"
                className={error.description ? "mt-1 block w-full border border-red-600" : "mt-1 block w-full"}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white">
                Server (OBS)
              </label>
              <Input
                defaultValue={process.env.NEXT_PUBLIC_RTMP_TEXT}
                disabled
                type="text"
                id="Server"
                name="Server"
                className={"mt-1 block w-full"}
              />
            </div>
        
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white">
                Stream Key (OBS)
              </label>
              <Input
                type="text"
                id="streamKey"
                name="streamKey"
                className={error.streamKey ? "mt-1 block w-full border border-red-600" : "mt-1 block w-full"}
              />
            </div>
           
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
        </form>
      </Card>

  );
}


function SubmitButton() {
    const { pending } = useFormStatus()
  
    return (
      <Button type="submit" disabled={pending} className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mb-4">
        {pending ?  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Room"}
      </Button>
    )
  }