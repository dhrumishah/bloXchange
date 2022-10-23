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
              <a className="flex items-center" href="#">
                <div class="flex items-center">
                  <svg
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class=" w-[20px] h-[20px] mr-4"
                  >
                    <g clip-path="url(#marketplace-icon_svg__a)">
                      <path
                        d="M4.973 1.848a1.37 1.37 0 0 1 1.04-.479h11.693a1.369 1.369 0 0 1 1.04.48l3.573 4.167c.318.372.494.846.494 1.336v.35a3.252 3.252 0 0 1-5.82 1.996 3.247 3.247 0 0 1-3.995.925 3.244 3.244 0 0 1-1.138-.925 3.245 3.245 0 0 1-2.568 1.255 3.245 3.245 0 0 1-2.567-1.255A3.252 3.252 0 0 1 .906 7.7v-.349c0-.49.176-.964.495-1.336l3.573-4.169-.001.001ZM7.41 7.701a1.883 1.883 0 1 0 3.765 0 .684.684 0 1 1 1.37 0 1.883 1.883 0 0 0 3.764 0 .684.684 0 1 1 1.37 0 1.883 1.883 0 0 0 3.765 0v-.349a.684.684 0 0 0-.165-.445l-3.573-4.169H6.013L2.44 6.908a.685.685 0 0 0-.164.444v.35a1.883 1.883 0 1 0 3.765 0 .685.685 0 0 1 1.369 0Zm-4.45 3.937a.684.684 0 0 1 .685.684v8.215h16.43v-8.215a.684.684 0 1 1 1.369 0v8.215h.684a.684.684 0 1 1 0 1.37H1.591a.685.685 0 0 1 0-1.37h.685v-8.215a.684.684 0 0 1 .684-.684Zm2.738.684a.685.685 0 0 1 .685.685v4.792h10.953v-4.792a.685.685 0 1 1 1.37 0v4.792a1.37 1.37 0 0 1-1.37 1.37H6.383a1.37 1.37 0 0 1-1.37-1.37v-4.792a.685.685 0 0 1 .685-.685Z"
                        fill="currentColor"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="marketplace-icon_svg__a">
                        <path
                          fill="#fff"
                          transform="translate(.906)"
                          d="M0 0h21.906v21.906H0z"
                        ></path>
                      </clipPath>
                    </defs>
                  </svg>
                  <p>Marketplace</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
