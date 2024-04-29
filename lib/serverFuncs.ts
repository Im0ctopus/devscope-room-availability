'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

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

const email = 'zedatuga123@gmail.com'
const name = 'Leo'
export const handleAddWaitingList = async (room: TRoom) => {
  // Verify if the user is already in the waiting list
  if (room.waiting.some((w) => w.email == email)) {
    return 2
  }

  // Put the user into the waiting list
  const query = `mutation {  
    waiting(email: "${email}", name: "${name}", roomid: ${room.id} ) { 
    id 
    }
    }
  `

  const res = await fetch(process.env.API_LINK ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: 'no-cache',
  })

  if (!res.ok) return 0
  else {
    revalidateTag('rooms')
    return 1
  }
}
