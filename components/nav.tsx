import Image from 'next/image'

const Nav = () => {
  return (
    <div className="flex justify-center items-center h-24 bg-black/10 w-full relative">
      <h1 className="text-4xl font-black">Room Availability</h1>
      <Image
        className="absolute inset-y-0 my-auto left-5"
        src="/logo.png"
        width={70}
        height={70}
        alt="Devscope logo"
      />
    </div>
  )
}
export default Nav
