import React from "react";
import ReactDOM from "react-dom";
import DropDown from "./DropDown";
import "./marketplace.css";
import Magnify from "./svg/magnifying-glass.svg";
import Game from "./images/game.jpeg";
import Logo from "/src/Logo.svg";

export default function MarketPlace() {
  return (
    <div>
      <main className="mt-[60px] py-12 px-4 relative flex min-h-screen justify-center max-w-full overflow-hidden md:justify-start md:ml-[240px] md:px-12">
        <div className="flex flex-col w-full">
          <div className="flex ml-auto items-center mb-8">
            <img src={Magnify}></img>
            <p className="ml-auto mr-4 text-[18px] text-[#51515F] dark:text-[#C9C9E7] font-medium">
              Category
            </p>
            <div className="relative">
              <button class="outline-none flex items-center hover:opacity-90">
                <p class="text-[#51515F] text-[18px] mr-2 font-semibold dark:text-white">
                  <DropDown />
                </p>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
            <div className=" flex flex-col">
              <a className="flex flex-col" href="#">
                <div className="w-full  mb-6">
                  <img
                    className="w-full object-cover object-center h-[250px] rounded-[20px]"
                    src={Game}
                  ></img>
                </div>
                <div className="flex flex-col px-2 w-full mb-6 text-left">
                  <div className="flex items-center">
                    <p className="flex font-bold text-[21px] mb-2 text-white">
                      Fallout Game
                    </p>
                    <p className="font-medium text-[21px] mb-2 text-white ml-36">
                      $400
                    </p>
                  </div>
                  <p className="font-medium mb-4 truncate text-white">
                    PC Game Fallout 2 BigBox US Edition from 1998 Very Rare!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center shrink-0 mr-4">
                      <img src={Logo} className="w-[16px] h-[16px] mr-2"></img>
                      <p className="text-[14px] font-bold text-[#2D2D2D] dark:text-white">
                        SMAK
                      </p>
                    </div>
                    <svg
                      width="9"
                      height="14"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 ml-auto text-[#747474] mr-1 dark:text-[#C4C6DC]"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.724 1.805a2.427 2.427 0 1 0 0 4.854 2.427 2.427 0 0 0 0-4.854ZM1.487 4.232a3.236 3.236 0 1 1 3.641 3.211v4.475a.404.404 0 0 1-.809 0V7.444A3.236 3.236 0 0 1 1.487 4.23v.001Zm2.017 6.937a.404.404 0 0 1-.332.465c-.576.095-1.036.239-1.34.399a1.067 1.067 0 0 0-.298.214.244.244 0 0 0-.047.073v.002l.002.007a.12.12 0 0 0 .013.027.5.5 0 0 0 .117.12c.134.106.352.22.658.32.608.203 1.472.335 2.447.335.974 0 1.839-.131 2.446-.335.306-.101.524-.214.658-.32a.5.5 0 0 0 .118-.12.122.122 0 0 0 .012-.027l.002-.007v-.003a.244.244 0 0 0-.046-.073 1.066 1.066 0 0 0-.3-.213c-.304-.16-.763-.304-1.339-.4a.405.405 0 1 1 .133-.797c.623.103 1.175.265 1.583.48.373.197.778.521.778 1.006 0 .345-.21.609-.44.79-.235.185-.55.335-.903.452-.71.237-1.666.377-2.702.377-1.037 0-1.992-.14-2.703-.377-.352-.117-.668-.267-.903-.451-.23-.182-.44-.446-.44-.79 0-.485.405-.81.778-1.006.408-.216.96-.378 1.583-.48a.404.404 0 0 1 .465.332Z"
                      ></path>
                    </svg>
                    <p className="font-spartan font-medium text-[12px] text-[#747474] truncate dark:text-[#C4C6DC]">
                      Magdeburg, Deutschland
                    </p>
                  </div>
                  <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-[11px] text-center font-bold hover:opacity-90 text-white cursor-pointer">
                    View Item
                  </span>
                </div>
              </a>
              <div className="flex items-center justify-center w-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
