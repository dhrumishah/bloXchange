import React from 'react'
import Game from "./../images/game.jpeg"
import "./Profile.css"
import { useAccount } from 'wagmi'

const Profile = () => {
  const { address } = useAccount();
  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="profile_details">
        <div className="profile_image">
          <img className="profile_img" src={Game} alt="" />
        </div>
        <div className="profile_text">
          <div className="grey-box">
            <h4>Address</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <h4>{address}</h4>
          </div>
          <div className="grey-box">
            <h4>Name</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <h4>Aditya</h4>
          </div>
          <div className="grey-box">
            <h4>Phone Number</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <h4>9721472851</h4>
          </div>
          <div className="grey-box">
            <h4>Email Address</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <h4>aditya@gmail.com</h4>
          </div>
          <div className="grey-box">
            <h4>Location</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h4>
            <h4>Pittsburgh</h4>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile