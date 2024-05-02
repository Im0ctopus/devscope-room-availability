'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('azure-ad', { callbackUrl: '/' })}
      className="px-2 py-1 flex justify-center items-center gap-2 text-lg font-medium bg-zinc-700 rounded-lg hover:bg-zinc-800 transition-all duration-300"
    >
      <img
        className="w-7"
        src={
          (process.env.NODE_ENV === 'production' ? process.env.CDN : '') +
          `/logos/Microsoft_logo.svg`
        }
        alt="Microsoft logo"
      />
      Sign in
    </button>
  )
}
