'use client'

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

import { useEffect, useState } from 'react'

const Pop = ({
  children,
  room,
}: {
  children: React.ReactNode
  room: TRoom
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShowing, setIsShowing] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true)
      document.body.classList.add('overflow-hidden')
    } else {
      setTimeout(() => {
        setIsShowing(false)
        document.body.classList.remove('overflow-hidden')
      }, 250)
    }
  }, [isOpen])

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      {isShowing && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-black/60 z-40  ${
              isOpen ? 'animate-pop_background' : 'animate-close_pop_background'
            }`}
          ></div>
          <div
            className={`fixed flex flex-col gap-10 inset-0 m-auto p-5 w-fit h-fit bg-zinc-800 z-50 rounded-lg overflow-hidden ${
              isOpen ? 'animate-pop' : 'animate-close_pop'
            }`}
          >
            <div
              className={`w-full h-2 absolute left-0 top-0 z-10 ${
                room.Busy ? 'bg-red-500' : 'bg-green-500'
              }`}
            ></div>
            <div className="">
              <div className="w-full flex justify-between items-center text-2xl font-medium gap-16 md:gap-72">
                <h3>{room.Name}</h3>
                {room.Busy ? (
                  <h3 className="text-red-500">Busy</h3>
                ) : (
                  <h3 className="text-green-500">Open</h3>
                )}
              </div>
            </div>
            {room.Appointments.length > 0 ? (
              <div className="flex flex-col gap-3 justify-center items-start w-full">
                <h1 className="text-2xl text-yellow-400 font-medium">
                  Appointments:
                </h1>
                <div className="flex flex-col justify-center items-start w-full ">
                  {room.Appointments.map((ap, index) => {
                    const startDate = new Date(ap.Start)
                    const endDate = new Date(ap.End)
                    return (
                      <div
                        className={`flex flex-wrap justify-between items-center gap-2 w-full p-2 rounded-lg ${
                          index % 2 == 0 ? 'bg-inherit' : 'bg-zinc-900'
                        }`}
                        key={index}
                      >
                        <p className="text-lg"> - {ap.Organizer}</p>
                        <div className="flex gap-1 justify-center items-center">
                          <p>{daysOfWeek[startDate.getDay()]}</p>
                          <p>{startDate.getDate()},</p>
                          <p>
                            {startDate.getHours()}:
                            {('0' + startDate.getMinutes()).slice(-2)}
                          </p>
                          <p>-</p>
                          <p>
                            {endDate.getHours()}:
                            {('0' + endDate.getMinutes()).slice(-2)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <h1 className="text-xl font-medium">
                This room has no{' '}
                <span className="text-yellow-400">Appointments</span>
              </h1>
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default Pop
