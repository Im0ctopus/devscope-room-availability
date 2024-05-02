import Autenticated from './autenticated'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center min-h-24 bg-black/10 w-full px-8 py-8 flex-wrap gap-6">
      <div className="flex justify-center items-center">
        <img
          draggable={false}
          className="rounded-md select-none aspect-square w-20"
          src={
            (process.env.NODE_ENV === 'production' ? process.env.CDN : '') +
            '/logos/logo.png'
          }
          alt="Devscope logo"
        />
      </div>
      <Link
        href={'/'}
        draggable={false}
        className="text-4xl font-black text-center"
      >
        Room Availability
      </Link>
      <Autenticated />
    </div>
  )
}
export default Nav
