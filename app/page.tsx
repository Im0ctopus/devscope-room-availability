import {
  getCurrentAppoitmentStratDate,
  getCurrentAppoitmentEndDate,
  getCurrentOrganizer,
} from '@/utils/utils'
import Pop from './pop'
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

type TAppointments = {
  Subject: string
  Organizer: string
  Start: number
  End: number
  Private: boolean
}

type TRoom = {
  Roomlist: string
  Name: string
  RoomAlias: string
  Email: string
  Appointments: TAppointments[]
  Busy: boolean
}

const Page = async () => {
  const fetchRooms = async () => {
    const res = await fetch(process.env.API_LINK ?? '', {
      headers: {
        'Content-Type': 'application/json',
        Cookie: process.env.COOKIE ?? '',
      },
      next: { revalidate: 60 },
    })

    return await res.json()
  }

  const rooms: TRoom[] = await fetchRooms()

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1280px] mx-auto gap-5">
      {rooms.map((room, index) => (
        <Pop room={room}>
          <div
            key={index}
            className="p-3 cursor-pointer flex flex-col max-w-96 w-full mx-auto gap-6 rounded-lg relative overflow-hidden bg-zinc-800 transition-all min-h-28 hover:shadow-md shadow-sm shadow-black/50 hover:scale-105 hover:z-20"
          >
            <div
              className={`w-full h-2 absolute left-0 top-0 z-10 ${
                room.Busy ? 'bg-red-500' : 'bg-green-500'
              }`}
            ></div>
            <div className="w-full flex justify-between items-center text-xl font-medium gap-5">
              <h3>{room.Name}</h3>
              {room.Busy ? (
                <h3 className="text-red-500">Busy</h3>
              ) : (
                <h3 className="text-green-500">Open</h3>
              )}
            </div>
            {room.Busy && (
              <div className="w-full text-start flex flex-wrap justify-between gap-1 items-center">
                <p className="text-lg font-medium">
                  {getCurrentOrganizer(room)}
                </p>
                <div className="flex gap-1 justify-center items-center">
                  <p>
                    {daysOfWeek[getCurrentAppoitmentStratDate(room).getDay()]}
                  </p>
                  <p>{getCurrentAppoitmentStratDate(room).getDate()},</p>
                  <p>
                    {getCurrentAppoitmentStratDate(room).getHours()}:
                    {(
                      '0' + getCurrentAppoitmentStratDate(room).getMinutes()
                    ).slice(-2)}
                  </p>
                  <p>-</p>
                  <p>
                    {getCurrentAppoitmentEndDate(room).getHours()}:
                    {(
                      '0' + getCurrentAppoitmentEndDate(room).getMinutes()
                    ).slice(-2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Pop>
      ))}
    </div>
  )
}
export default Page
