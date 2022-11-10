import React, {useState} from "react";
import { send } from 'emailjs-com';
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

const ContactUs = () => {
  const { address, isConnected } = useAccount();
  const [toSend, setToSend] = useState({
    orderId: '',
    descriptionIssue: '',
    address: address
  })

  const handleChange = (e) => {
    setToSend({...toSend, [e.target.name]: e.target.value})
    console.log("target" + ":" + e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (isConnected) {
      send(
        'service_f4hld3q',
        'template_lbtz61v',
        toSend,
        'ozPw1CSjLifykZPig'
      );
      toast.success("Sent your issue! We'll contact you shortly")
    } else {
      toast.error("You are not connected!")
    }
  };
  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="m-auto flex flex-col w-full sm:max-w-[633px]">
        <h1 className="text-[25px] font-semibold mb-10 text-[#30cfd0]">
          Want to talk to Us?
        </h1>
        <form onSubmit={onSubmit}>
        <label
          className="block text-[17px] font-medium mb-4 text-white"
          for="add-title"
        >
          Enter your Order Id here
        </label>
        <div className="relative mb-12">
          <input
              id="add-order-id"
              type="number"
              name="orderId"
              placeholder="Enter Product's Order Id"
              className="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] text-white"
              min={0}
              onChange={handleChange}
          ></input>
        </div>

        <label className="block text-[17px] font-medium mb-4 text-white">
          Description of your Issue
        </label>
        <input
            className="outline-none p-6 w-full rounded-[20px] mb-12 dark:bg-[#363952] text-white"
            placeholder="Enter a Description for your issue"
            data-gramm="false"
            name="descriptionIssue"
            wt-ignore-input="true"
            onChange={handleChange}>
          </input>

        <button className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto">
          Submit
        </button>
        </form>
      </div>
    </main>
  );
};

export default ContactUs;
