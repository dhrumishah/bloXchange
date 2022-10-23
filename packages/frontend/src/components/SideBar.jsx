import React from "react";
import ReactDOM from "react-dom";
import "./sidebar.css";

export default function SideBar() {
  return (
    <div>
      <div className="sidebar--component">
        <div className="sidebar--content">
          <div className="sidebar--col">
            <div className="flex flex-col space-y-5 mb-12">
              <a className="flex items-center hover:opacity-90" href="#">
                <div className="flex items-center">
                  {/* <p className="text-base">Home</p> */}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
