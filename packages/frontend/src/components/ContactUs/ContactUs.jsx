import React from "react";

const ContactUs = () => {
  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
      <div className="m-auto flex flex-col w-full sm:max-w-[633px]">
        <h1 className="text-[25px] font-semibold mb-10 text-[#30cfd0]">
          Want to talk to Us?
        </h1>
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
            placeholder="Enter Product's Order Id"
            className="outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#363952] text-white"
          ></input>
        </div>

        <label className="block text-[17px] font-medium mb-4 text-white">
          Description of your Issue
        </label>
        <textarea
          className="outline-none p-6 w-full h-[206px] rounded-[20px] mb-12 dark:bg-[#363952] text-white"
          placeholder="Enter a Description for your issue"
          data-gramm="false"
          wt-ignore-input="true"
        ></textarea>

        <button className="w-full ml-auto mr-auto px-12 py-2 rounded-[10px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[18px] font-semibold hover:opacity-90 disabled:bg-[#595B73] disabled:pointer-events-none sm:min-w-[230px] sm:w-auto">
          Submit
        </button>
      </div>
    </main>
  );
};

export default ContactUs;
