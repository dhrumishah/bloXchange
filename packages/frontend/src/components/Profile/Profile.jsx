import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "./../images/game.jpeg";
import { useQuery } from "urql";
import { PROFILE_QUERY } from "../../queries";
import { useEffect } from "react";
import useLightHouse from "../../hooks/useLightHouse";
import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { toast } from "react-toastify";
import { parseError } from "../../utils";
import "./Profile.css";

const Profile = () => {
  const { address } = useParams();
  const { address: myAddress } = useAccount();
  const { data: signer } = useSigner();
  const { decrypt } = useLightHouse(myAddress, signer);
  const navigate = useNavigate();
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    emailAddress: "",
    shippingAddress: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [result] = useQuery({
    query: PROFILE_QUERY,
    variables: {
      address,
    },
    pause: !address,
  });
  const { data, fetching, error } = result;
  const profileURI = data?.profile?.profileURI;

  const decryptProfile = async () => {
    try {
      const profile = await decrypt(profileURI);
      setIsProfileLoaded(true);
      setProfile(profile);
    } catch (e) {
      const errorText = parseError(e, "Error retrieving profile");
      toast.error(
        errorText.indexOf("401") > -1 ? "Unauthorized access" : errorText
      );
    }
  };

  useEffect(() => {
    if (!fetching && profileURI && !isProfileLoaded && myAddress) {
      decryptProfile();
    }
  }, [fetching, myAddress]);

  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="profile_details">
        <div className="profile_image animate__animated animate__backInLeft">
          <img className="profile_img" src={Game} alt="" />
          {!fetching && !profileURI && (
            <div className="text-cente">
              <span className="text-red-900 my-6">
                Profile information not available
              </span>
            </div>
          )}
          {address?.toLowerCase() === myAddress?.toLowerCase() && (
            <button
              type="button"
              onClick={() => navigate("/update-profile")}
              className="w-full ml-auto mr-auto px-12 py-2 my-3 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
            >
              Update Profile
            </button>
          )}
        </div>
        <div className="profile_text animate__animated animate__backInRight">
          <div className="grey-box">
            <h4>Address</h4>
            <h4>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;:&nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;
            </h4>
            <h4>{address}</h4>
          </div>
          <div className="grey-box">
            <h4>Name</h4>
            <h4>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;
            </h4>
            <h4>{profile.fullName}</h4>
          </div>
          <div className="grey-box">
            <h4>Phone Number</h4>
            <h4>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:&nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </h4>
            <h4>{profile.phoneNumber}</h4>
          </div>
          <div className="grey-box">
            <h4>Email Address</h4>
            <h4>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;&nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </h4>
            <h4>{profile.emailAddress}</h4>
          </div>
          <div className="grey-box">
            <h4>Location</h4>
            <h4>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;
            </h4>
            <h4>{profile.shippingAddress}</h4>
          </div>
          <div className="grey-box">
            <h4>Postal Code</h4>
            <h4>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;
            </h4>
            <h4>{profile.postalCode}</h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
