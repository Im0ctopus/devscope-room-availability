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
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="p-3 rounded-lg relative overflow-hidden bg-zinc-800 hover:bg-zinc-700 transition-all min-h-32 shadow-lg shadow-black/50 hover:scale-110 hover:z-20"
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
        </div>
      ))}
    </div>
  )
}
export default Page
