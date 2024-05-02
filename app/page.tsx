import { fetchRooms } from '@/lib/serverFuncs'
import Rooms from './rooms'

const Page = async () => {
  const rooms = await fetchRooms()
  const filteredRooms = rooms.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col gap-0 pt-5">
      <Rooms rooms={filteredRooms} />
    </div>
  )
}
export default Page
