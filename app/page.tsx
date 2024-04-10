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

  return <div></div>
}
export default Page
