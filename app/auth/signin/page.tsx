import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import LoginButton from './loginButton'

export default async function Login() {
  const session = await getServerSession()
  if (session?.user) return redirect('/')
  return (
    <div className="flex flex-col justify-center items-center gap-2 py-10 mx-auto px-5 w-full">
      <div className="w-full max-w-96 flex justify-start">
        <img className="w-32" src={(process.env.NODE_ENV === 'production' ? process.env.CDN : '') + `/logos/biglogo.png`} alt="Devscope logo" />
      </div>
      <div className="p-5 w-full max-w-96 flex flex-col justify-center items-start bg-zinc-950 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold">Sign In</h1>
        <h2 className="text-sm">Sign in with your Devscope account</h2>
        <div className="w-full flex justify-center items-center mt-10">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}
