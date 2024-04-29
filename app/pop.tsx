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

import { handleAddWaitingList } from '@/lib/serverFuncs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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

  const endDate = new Date(room.busyend)
  const startDate = new Date(room.busystart)

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
            className={`fixed flex flex-col gap-5 inset-0 m-auto p-5 w-fit h-fit bg-zinc-800 z-50 rounded-lg overflow-hidden ${
              isOpen ? 'animate-pop' : 'animate-close_pop'
            }`}
          >
            <div
              className={`w-full h-2 absolute left-0 top-0 z-10 ${
                room.busy ? 'bg-red-500' : 'bg-green-500'
              }`}
            ></div>
            <div className="">
              <div className="w-full flex justify-between items-center text-2xl font-medium gap-16 md:gap-72">
                <h3>{room.name}</h3>
                {room.busy ? (
                  <h3 className="text-red-500">Busy</h3>
                ) : (
                  <h3 className="text-green-500">Open</h3>
                )}
              </div>
            </div>
            {room.busy ? (
              <>
                <div className="flex flex-col justify-center items-start w-full text-lg font-medium gap-2">
                  <p>The room is currently occupied by:</p>
                  <div className="flex w-full justify-between">
                    <p>{room.organizer}</p>
                    <div className="flex gap-1 justify-center items-center ">
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
                </div>
                {room.waiting.length > 0 ? (
                  <div className="flex flex-col gap-3 justify-center items-start w-full">
                    <h1 className="text-2xl text-yellow-400 font-medium">
                      Waiting list:
                    </h1>
                    <div className="flex flex-col justify-center items-start w-full gap-0 rounded-lg overflow-clip">
                      {room.waiting.map((wait, index) => {
                        return (
                          <div
                            className={`flex flex-wrap justify-between items-center gap-2 w-full p-2 ${
                              index % 2 != 0 ? 'bg-zinc-950' : 'bg-zinc-900'
                            }`}
                            key={index}
                          >
                            <div className="flex justify-start items-center gap-3">
                              <p className="text-lg">{index + 1}.</p>
                              <p className="text-lg">{wait.name}</p>
                            </div>
                            <p className="text-lg">{wait.email}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <h1 className="text-xl font-medium w-full text-center">
                    The
                    <span className="text-yellow-400"> waiting list </span>
                    is empty.
                  </h1>
                )}
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={async () => {
                      const res = await handleAddWaitingList(room)
                      if (res == 0) {
                        toast.error(
                          'An error occurred while attempting to add you to the waiting list. Please try again later.'
                        )
                      } else if (res == 1) {
                        toast.success(
                          'You have been added to the waiting list. An email will be sent to you shortly.'
                        )
                      } else if (res == 2) {
                        toast.warning(
                          'You are already on the waiting list for this room.'
                        )
                      }
                    }}
                    className="px-2 py-1 rounded-lg bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 text-lg font-medium"
                  >
                    Join Waiting List
                  </button>
                </div>
              </>
            ) : (
              <h1 className="text-lg font-medium w-full text-center">
                This room is available for reservation.
              </h1>
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default Pop
