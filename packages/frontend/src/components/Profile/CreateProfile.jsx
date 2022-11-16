import React, { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { parseError } from "../../utils";
import useLightHouse from "../../hooks/useLightHouse";
import useBiconomy from "../../hooks/useBiconomy";

function CreateProfile() {
  const { uploadEncrypted, decrypt } = useLightHouse();
  const { biconomy, marketplace } = useBiconomy();

  const onSubmit = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file");

    // Create a new File object
    const myFile = new File([JSON.stringify(profile)], "profile.json", {
      type: "application/json",
      lastModified: new Date(),
    });

    // Now let's create a DataTransfer to get a FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;
    // Help Safari out
    if (fileInput.webkitEntries.length) {
      fileInput.dataset.file = `${dataTransfer.files[0].name}`;
    }

    fileInput.dispatchEvent(
      new Event("change", {
        bubbles: true,
      })
    );
  };

  const [isLoading, setIsLoading] = useState(false);
  const profileInit = {
    fullName: "",
    emailAddress: "",
    shippingAddress: "",
    postalCode: "",
    phoneNumber: "",
  };
  const [profile, setProfile] = useState(profileInit);
  const { isConnected, address } = useAccount();

  async function UpdateProfile(e) {
    const id = toast.loading("Updating profile...");
    try {
      setIsLoading(true);
      const cid = await uploadEncrypted(e);
      const provider = await biconomy.getEthersProvider();
      const { data } = await marketplace.populateTransaction.setProfileURI(cid);
      let txParams = {
        data: data,
        to: marketplace.address,
        from: address,
        signatureType: "EIP712_SIGN",
      };
      const txHash = await provider.send("eth_sendTransaction", [txParams]);
      await provider.waitForTransaction(txHash);
      setProfile(profileInit);
      toast.update(id, {
        render: "Profile updated sucessfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (e) {
      toast.update(id, {
        render: parseError(e, "Error updating profile!!!"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setIsLoading(false);
  }

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <form
        onSubmit={onSubmit}
        className="m-auto flex flex-col w-full sm:max-w-[633px] animate__animated animate__slideInDown"
      >
        <h1 className="text-[30px] font-semibold mb-10 bg-gradient-to-r text-white text-center from-cyan-900 to-cyan-300">
          Update your profile
        </h1>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="add-full-name"
        >
          What's your full name?
        </label>
        <div className="relative mb-6">
          <input
            id="add-full-name"
            type="text"
            value={profile.fullName}
            onChange={handleChange}
            name="fullName"
            placeholder="Enter your full name"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] text-white"
            required
          ></input>
        </div>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="locations"
        >
          Email Address
        </label>
        <div className="relative z-20">
          <input
            id="locations"
            type="email"
            placeholder="Enter email address"
            value={profile.emailAddress}
            onChange={handleChange}
            name="emailAddress"
            required
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952] text-white"
          ></input>
        </div>
        <label className="block text-[17px] font-medium mb-4 text-white">
          Full Address
        </label>
        <textarea
          className="outline-none p-6 w-full h-[206px] rounded-[20px] mb-6 dark:bg-[#363952] text-white"
          placeholder="Enter full address"
          data-gramm="false"
          wt-ignore-input="true"
          value={profile.shippingAddress}
          onChange={handleChange}
          name="shippingAddress"
          required
        ></textarea>
        <div className="relative mb-6">
          <div className="flex flex-col w-full ">
            <label
              className="block text-[17px] font-medium mb-4 text-white"
              htmlFor="postal-code"
            >
              Postal Code
            </label>
            <input
              id="postal-code"
              value={profile.postalCode}
              name="postalCode"
              onChange={handleChange}
              className="outline-none font-medium px-4 py-2 w-full h-[44px] rounded-[10px] dark:bg-[#363952] text-white"
              type="number"
              placeholder="Enter Postal code"
              required
            ></input>
          </div>
        </div>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          htmlFor="phone-number"
        >
          Phone Number
        </label>
        <div className="relative z-20">
          <input
            id="phone-number"
            type="number"
            value={profile.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            placeholder="Enter phone number"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full mb-4 dark:bg-[#363952] text-white"
            required
          ></input>
        </div>
        <input onChange={UpdateProfile} type="file" id="file" hidden />
        <button
          disabled={!isConnected || isLoading}
          type="submit"
          className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
        >
          {isLoading ? "Updating Profile..." : "Update Profile"}
        </button>
      </form>
    </main>
  );
}

export default CreateProfile;
