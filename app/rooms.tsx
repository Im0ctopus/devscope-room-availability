'use client'

import Pop from './pop'
import Card from './card'
import { useEffect, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

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

type TStates = 'Busy' | 'Free' | 'All'

const states: TStates[] = ['All', 'Free', 'Busy']

const Rooms = ({ rooms }: { rooms: TRoom[] }) => {
  const [filteredRooms, setFilteredRooms] = useState<TRoom[]>(rooms)
  const [search, setSearch] = useState<string>('')
  const [state, setState] = useState<'Busy' | 'Free' | 'All'>('All')
  const [stateOpen, setStateOpen] = useState<boolean>(false)
  useEffect(() => {
    let temp = rooms.filter((r) =>
      r.Name.toLowerCase().includes(search.toLowerCase())
    )
    if (state == 'Busy') temp = temp.filter((r) => r.Busy)
    else if (state == 'Free') temp = temp.filter((r) => !r.Busy)
    setFilteredRooms(temp)
  }, [search, state])

  useEffect(() => {
    if (stateOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [stateOpen])

  return (
    <>
      <div className="flex w-full justify-start items-center pl-10 gap-4">
        <div className="relative">
          <input
            className="bg-zinc-800 px-2 py-1 rounded-md text-lg font-medium"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Room name"
          />
          {search.length > 0 && (
            <button onClick={() => setSearch('')}>
              <X className="absolute right-2 inset-y-0 my-auto" size={20} />
            </button>
          )}
        </div>
        <div
          onClick={() => setStateOpen(true)}
          className={`cursor-pointer bg-zinc-800 min-w-20 px-2 py-1 rounded-md text-lg font-medium relative ${
            stateOpen && 'outline outline-1'
          }`}
        >
          {state}
          <ChevronDown
            className={`absolute right-2 inset-y-0 my-auto transition-all duration-300 ease-in-out ${
              stateOpen && 'rotate-180'
            }`}
            size={20}
          />
          {stateOpen && (
            <div className="absolute rounded-lg overflow-clip z-30 w-full bg-zinc-800 left-0 top-[110%] border border-zinc-500">
              {states.map((s, i) => (
                <p
                  onClick={(e) => {
                    e.stopPropagation()
                    setState(s)
                    setStateOpen(false)
                  }}
                  className="hover:bg-zinc-700 transition-all px-2 py-1 font-normal text-base"
                >
                  {s}
                </p>
              ))}
            </div>
          )}
        </div>
        {stateOpen && (
          <div
            onClick={() => setStateOpen(false)}
            className="fixed inset-0 z-20"
          ></div>
        )}
      </div>
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRooms.map((room, index) => (
          <Pop key={index} room={room}>
            <Card room={room} />
          </Pop>
        ))}
      </div>
    </>
  )
}
export default Rooms
