import React from 'react'
import SideBar from '../Sidebar/SideBar'
import NavBar from "../Navbar/NavBar";

const Profile = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main>
        <SideBar />
      </main>
     </>
  )
}

export default Profile