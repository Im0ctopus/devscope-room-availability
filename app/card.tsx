const CDN = 'https://cdn.jsdelivr.net/gh/Im0ctopus/cdn-devscope-room@1.12' //Change on client side code change

type TWaiting = {
  id: number
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

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const Card = ({ room }: { room: TRoom }) => {
  const endDate = new Date(room.busyend)
  const startDate = new Date(room.busystart)
  return (
    <div className="p-2 cursor-pointer flex flex-col max-w-96 w-full mx-auto gap-6 rounded-lg relative overflow-hidden bg-zinc-800 transition-all min-h-36 hover:shadow-md shadow-sm shadow-black/50 hover:scale-105 hover:z-20">
      <div
        className={`w-full h-2 absolute left-0 top-0 z-10 ${
          room.busy ? 'bg-red-500' : 'bg-green-500'
        }`}
      ></div>
      <div className="w-full flex justify-between items-center text-xl font-medium gap-5">
        <h3>{room.name}</h3>
        {room.busy ? (
          <h3 className="text-red-500">Busy</h3>
        ) : (
          <h3 className="text-green-500">Open</h3>
        )}
      </div>
      <div className="flex justify-between items-center px-3 w-full">
        <div className="w-20 h-16 overflow-clip flex justify-center items-center rounded-xl relative">
          <img
            className="w-full h-full select-none"
            src={
              (process.env.NODE_ENV === 'production' ? CDN : '') +
              `/imgs/${room.name}.jpg`
            }
            alt={room.name}
          />
        </div>
        {room.busy && (
          <div className="text-start flex flex-col flex-wrap justify-between gap-1 items-end">
            <p className="text-lg font-medium">{room.organizer}</p>
            <div className="flex gap-1 justify-center items-center">
              <p>{daysOfWeek[startDate.getDay()]}</p>
              <p>{startDate.getDate()},</p>
              <p>
                {startDate.getHours()}:
                {('0' + startDate.getMinutes()).slice(-2)}
              </p>
              <p>-</p>
              <p>
                {endDate.getHours()}:{('0' + endDate.getMinutes()).slice(-2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Card
