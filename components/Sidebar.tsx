import React from 'react'
import SidebarRow from './SidebarRow'
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  CollectionIcon,
} from '@heroicons/react/outline'

function Sidebar() {
  return (
    <div>
      <img
        className="h-10 w-10"
        src="https://links.papareact.com/drq"
        alt="twiter-logo"
      />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
    </div>
  )
}

export default Sidebar
