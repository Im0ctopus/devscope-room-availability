'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Autenticated = () => {
  const { data: session } = useSession()
  if (session)
    return (
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="flex justify-center items-center gap-3">
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              width={500}
              height={500}
              alt={session?.user?.name + 'proflie picture'}
            />
          )}
          <h1 className="text-lg font-medium">{session?.user?.name}</h1>
        </div>
        <button
          onClick={() => signOut()}
          className="px-2 py-1 bg-zinc-700 rounded-lg"
        >
          Logout
        </button>
      </div>
    )
}
export default Autenticated
