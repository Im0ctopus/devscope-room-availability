import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { cancelRoom, fetchRoomsApi } from '@/lib/serverFuncs'
import { revalidateTag } from 'next/cache'

export async function GET(
  request: Request,
  { params }: { params: { roomid: number } }
) {
  const session = await getServerSession()
  if (session?.user) {
    const rooms = await fetchRoomsApi()
    const sortedRooms = rooms.sort((a, b) => a.id - b.id)
    if (sortedRooms[params.roomid - 1].organizer == session.user.name) {
      console.log('Canceling...')
      cancelRoom(params.roomid)
    }
  }
  redirect('/')
}
