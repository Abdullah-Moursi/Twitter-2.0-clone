import React from 'react'
import SidebarRow from './SidebarRow'
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://links.papareact.com/drq"
        alt="twiter-logo"
      />

      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? 'Sign Out' : 'Log In'}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />

      {session && (
        <div className="group  relative  top-80	flex max-w-fit items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100">
          <img
            src={session?.user?.image || ''}
            className=" max-w-14 max-h-14 rounded-full object-cover"
          />
          <div className="flex flex-col ">
            <p className="hidden text-base font-bold lg:inline-flex lg:text-xl ">
              {session.user?.name}
            </p>
            <p className=" lg:text-m hidden text-base  text-gray-500 lg:inline-flex">
              @{session?.user?.name?.replace(/\s+/g, '').toLocaleLowerCase()}
            </p>{' '}
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
