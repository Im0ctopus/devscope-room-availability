'use server'

import { revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'

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

export const handleAddWaitingList = async (room: TRoom) => {
  const session = await getServerSession()
  // Verify if the user is already in the waiting list
  if (room.waiting.some((w) => w.email == session?.user?.email)) {
    return 2
  }

  // Put the user into the waiting list
  const query = `mutation {  
    waiting(email: "${session?.user?.email}", name: "${session?.user?.name}", roomid: ${room.id} ) { 
    id 
    }
    }
  `
  try {
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
  } catch {
    console.log('ERROR adding to the waiting list')
    return 0
  }
}

export const fetchRooms = async () => {
  const query: string =
    '{ rooms{ id, name, organizer, busy, busystart, busyend, waiting {id, name, email, roomid } } }'
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
  return data.data.rooms as TRoom[]
}

export const fetchRoomsApi = async () => {
  const query: string =
    '{ rooms{ id, name, organizer, busy, busystart, busyend, waiting {id, name, email, roomid } } }'
  const res = await fetch(process.env.API_LINK ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: 'no-cache',
  })

  if (!res.ok) throw new Error('Erro a obter a informação da API')

  const data = await res.json()
  return data.data.rooms as TRoom[]
}

export async function cancelRoom(roomid: number) {
  const query = `mutation{cancel(roomid:${roomid}){id}}`
  const res = await fetch(process.env.API_LINK ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: 'no-cache',
  })

  if (!res.ok) throw new Error('Erro a obter a informação da API')
}

export async function removeWaiting(room: TRoom) {
  const session = await getServerSession()
  const wait = room.waiting.filter((w) => w.email == session?.user?.email)
  if (!wait) return 0
  const query = `mutation{remove(waitid:${wait[0].id}){id}}`
  try {
    const res = await fetch(process.env.API_LINK ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      cache: 'no-cache',
    })
    if (!res.ok) {
      console.log('Error Removing')
      return 0
    }
    revalidateTag('rooms')
    return 1
  } catch {
    console.log('ERROR removing to the waiting list')
    return 0
  }
}
