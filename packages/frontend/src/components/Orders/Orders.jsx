import TabsRender from "./Tabs";

const Orders = () => {
  return (
    <main className="mt-[60px] py-12 px-4 relative flex min-h-screen max-w-full overflow-hidden md:ml-[240px] md:px-12 animate__animated animate__flash">
      <div className="dark:bg-[#363952] p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-white font-semibold">Products Order</h2>
            {/* <span className="text-xs">All products item</span> */}
          </div>
          <div className="flex items-center justify-between">
            
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                /> */}
              {/* </svg> */}
              <input
                type="text"
                name=""
                id=""
              placeholder="search..."
              className = "outline-none px-4 py-2 font-medium rounded-[10px] w-full dark:bg-[#242742] text-white"
              />
          </div>
        </div>
        <TabsRender />
      </div>
    </main>
  );
};
export default Orders;
