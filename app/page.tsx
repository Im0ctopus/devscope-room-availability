import Rooms from './rooms'

type TWaiting = {
  name: string
  email: string
  roomid: number
}

type TRoom = {
  id: number
  name: string
  organizer: string
  busy: boolean
  busystart: number
  busyend: number
  waiting: TWaiting[]
}

const query: string =
  '{ rooms{ id, name, organizer, busy, busystart, busyend, waiting { name, email, roomid } } }'

const Page = async () => {
  const fetchRooms = async () => {
    const res = await fetch(process.env.API_LINK ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60, tags: ['rooms'] },
    })

    if (!res.ok) throw new Error('Erro a obter a informação da API')

    const data = await res.json()
    return data.data.rooms
  }

  const rooms: TRoom[] = await fetchRooms()
  const filteredRooms: TRoom[] = rooms.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col gap-0 pt-5">
      <Rooms rooms={filteredRooms} />
    </div>
  )
}
export default Page
