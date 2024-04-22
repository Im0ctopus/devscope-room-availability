import Pop from './pop'
import Card from './card'
import Rooms from './rooms'

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

    if (!res.ok) throw new Error('Erro a obter a informação da API')

    return await res.json()
  }

  const rooms: TRoom[] = await fetchRooms()

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col gap-0 pt-5">
      <Rooms rooms={rooms} />
    </div>
  )
}
export default Page
