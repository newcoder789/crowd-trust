'use client';
import { client, wallets } from "@/app/client";
import Link from "next/link";
import { ConnectButton, lightTheme, useActiveAccount, ConnectEmbed } from "thirdweb/react";
import Image from 'next/image';
import thirdwebIcon from "@public/thirdweb.svg";
import { useEffect, useState } from "react";
import { Bell } from 'lucide-react';
import axios from "axios";
import { motion } from "framer-motion";
// import { INotification } from "@/models/Notifications";


const Navbar = () => {
    const account = useActiveAccount();
    // const account = "0x7dB6DC9205d3bF205B7664Be75aE203af5d2Adc0";
    const [open, setOpen] = useState(false);
    const [ checked , setChecked ] = useState(false);
    // const [notifications, setNotifications] = useState<INotification[] >([]);
    const href = `/dashboard/${account}`;
    // set a thing to fetch notifcation after 3 seconds  and console.log it 
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const fetchNotifications = async () => {
    //             console.log("Inside fetch notification")
    //             console.log("account", account);
    //             if (!account) return;
    //             const donorId = "0x7dB6DC9205d3bF205B7664Be75aE203af5d2Adc0";
    //             const res = await axios.get<{ notifications: INotification[] }>("/api/Notifications", {
    //                 params: { donorId }
    //             });
    //             const data: INotification[] = res.data.notifications;
    //             setNotifications(data);
    //             console.log(data);
    //         };
    //         fetchNotifications();
    //     }
    //     , 700000);
    //     return () => clearInterval(interval);
    // }
    // , [])
        


    return (
      <div className=" top-0 left-0 right-0 z-50 fixed ">
      <nav className="w-full h-[61px] bg-[#000003]/50 backdrop-blur-md flex items-center justify-between px-4 md:px-[100px] text-[#e8ebeb]">
          {/* Left Section */}
          <div className="flex items-center gap-6 md:gap-10">
              {/* Logo */}
              <div className="flex items-center gap-2">
                  <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99998 19.7917H11.6666V6.25L16.995 9.10417C17.145 9.18454 17.2728 9.31821 17.3626 9.48857C17.4523 9.65893 17.5001 9.8585 17.5 10.0625V19.7917H19.1666V21.875H0.833313V19.7917H2.49998V5.88542C2.49996 5.68387 2.54671 5.48665 2.63457 5.31766C2.72244 5.14866 2.84763 5.01516 2.99498 4.93333L9.41415 1.36667C9.47765 1.3314 9.5472 1.31655 9.61648 1.32346C9.68575 1.33037 9.75253 1.35883 9.81076 1.40625C9.86898 1.45367 9.91679 1.51853 9.94984 1.59494C9.98289 1.67136 10.0001 1.75689 9.99998 1.84375V19.7917Z" fill="#13ADB7"/>
                  </svg>
                  <span className="text-[#13acb6] text-base font-normal font-['DM Sans']">CroudTrust</span>
              </div>

              {/* Navigation Links */}  
              <div className="hidden md:flex gap-10 text-sm font-medium font-['DM Sans']">
                  <Link href="/" className="hover:text-[#13acb6] transition-colors">Home</Link>
                  <Link href="/campain" className="hover:text-[#13acb6] transition-colors">Charity</Link>
                  <Link href={account?`/dashboard/${account.address}`:"/dashboard/0x7dB6DC9205d3bF205B7664Be75aE203af5d2Adc0"} className="hover:text-[#13acb6] transition-colors">Dashboard</Link>
                  <Link href="#" className="hover:text-[#13acb6] transition-colors">Event</Link>
              </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
              {/* Open Data */}
              <div className="hidden md:flex items-center gap-2">
                  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.45312 16.9688H2.39062C2.17928 16.9688 1.97659 16.8848 1.82715 16.7354C1.67771 16.5859 1.59375 16.3832 1.59375 16.1719V11.3906C1.59375 11.1793 1.67771 10.9766 1.82715 10.8271C1.97659 10.6777 2.17928 10.5938 2.39062 10.5938H3.45312C3.66447 10.5938 3.86716 10.6777 4.0166 10.8271C4.16604 10.9766 4.25 11.1793 4.25 11.3906V16.1719C4.25 16.3832 4.16604 16.5859 4.0166 16.7354C3.86716 16.8848 3.66447 16.9688 3.45312 16.9688Z" fill="#13ADB7"/>
                      <path d="M10.8906 16.9688H9.82812C9.61678 16.9688 9.41409 16.8848 9.26465 16.7354C9.11521 16.5859 9.03125 16.3832 9.03125 16.1719V8.20312C9.03125 7.99178 9.11521 7.78909 9.26465 7.63965C9.41409 7.49021 9.61678 7.40625 9.82812 7.40625H10.8906C11.102 7.40625 11.3047 7.49021 11.4541 7.63965C11.6035 7.78909 11.6875 7.99178 11.6875 8.20312V16.1719C11.6875 16.3832 11.6035 16.5859 11.4541 16.7354C11.3047 16.8848 11.102 16.9688 10.8906 16.9688Z" fill="#13ADB7"/>
                      <path d="M14.6094 16.9688H13.5469C13.3355 16.9688 13.1328 16.8848 12.9834 16.7354C12.834 16.5859 12.75 16.3832 12.75 16.1719V4.48438C12.75 4.27303 12.834 4.07034 12.9834 3.9209C13.1328 3.77146 13.3355 3.6875 13.5469 3.6875H14.6094C14.8207 3.6875 15.0234 3.77146 15.1729 3.9209C15.3223 4.07034 15.4062 4.27303 15.4062 4.48438V16.1719C15.4062 16.3832 15.3223 16.5859 15.1729 16.7354C15.0234 16.8848 14.8207 16.9688 14.6094 16.9688Z" fill="#13ADB7"/>
                      <path d="M7.17188 16.9688H6.10938C5.89803 16.9688 5.69534 16.8848 5.5459 16.7354C5.39646 16.5859 5.3125 16.3832 5.3125 16.1719V1.82812C5.3125 1.61678 5.39646 1.41409 5.5459 1.26465C5.69534 1.11521 5.89803 1.03125 6.10938 1.03125H7.17188C7.38322 1.03125 7.58591 1.11521 7.73535 1.26465C7.88479 1.41409 7.96875 1.61678 7.96875 1.82812V16.1719C7.96875 16.3832 7.88479 16.5859 7.73535 16.7354C7.58591 16.8848 7.38322 16.9688 7.17188 16.9688Z" fill="#13ADB7"/>
                  </svg>
                  <span className="text-[#13acb6] text-sm font-medium font-['DM Sans']">Open Data</span>
              </div>

              {/* Contact Info */}
              <div className="hidden lg:flex items-center gap-2">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.91223 3.45652C1.91223 3.19514 2.01296 2.94448 2.19227 2.75966C2.37157 2.57484 2.61476 2.47101 2.86833 2.47101H4.92681C5.15312 2.47112 5.37206 2.55397 5.54468 2.70483C5.7173 2.85569 5.8324 3.06478 5.86952 3.29489L6.57703 7.66562C6.61084 7.87377 6.57892 8.08762 6.48598 8.27568C6.39303 8.46373 6.24397 8.61607 6.06074 8.71025L4.5807 9.47205C5.11144 10.8278 5.90187 12.0593 6.90476 13.093C7.90765 14.1268 9.10242 14.9415 10.4177 15.4886L11.1577 13.963C11.249 13.7743 11.3967 13.6208 11.5789 13.525C11.7612 13.4292 11.9684 13.3962 12.1702 13.4308L16.4105 14.1601C16.6337 14.1984 16.8366 14.317 16.9829 14.4949C17.1293 14.6729 17.2097 14.8985 17.2098 15.1318V17.2536C17.2098 17.515 17.1091 17.7657 16.9298 17.9505C16.7505 18.1353 16.5073 18.2391 16.2537 18.2391H14.3415C7.47672 18.2391 1.91223 12.5035 1.91223 5.42753V3.45652Z" fill="#E9ECEB"/>
                  </svg>
                  <span className="text-[#e8ebeb] text-sm font-medium font-['DM Sans']">+91 8872347754</span>
              </div>

              {/* Connect Button */}
              <ConnectButton 
                  client={client}
                  wallets={wallets}
                  theme={lightTheme()}
                  detailsButton={{
                      style: {
                          maxHeight: "40px",
                          backgroundColor: "#13ADB7",
                          color: "#ffffff",
                          borderRadius: "8px",
                          padding: "0 16px"
                      }
                  }}
              />
          </div>
      </nav>
  </div>
        );
        };
        
export default Navbar;
        {/* //     <>
      <div className="fixed  bg-[#0f111d] opacity-60  h-1" >
        <nav className="absolute  top-0 w-full h-[91px] bg-[#000003]/50 backdrop-blur-md flex items-center justify-between px-[100px] text-[#e8ebeb]">
          <div className="flex items-center gap-10">
            <div  className="flex items-center gap-2">
              <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99998 19.7917H11.6666V6.25L16.995 9.10417C17.145 9.18454 17.2728 9.31821 17.3626 9.48857C17.4523 9.65893 17.5001 9.8585 17.5 10.0625V19.7917H19.1666V21.875H0.833313V19.7917H2.49998V5.88542C2.49996 5.68387 2.54671 5.48665 2.63457 5.31766C2.72244 5.14866 2.84763 5.01516 2.99498 4.93333L9.41415 1.36667C9.47765 1.3314 9.5472 1.31655 9.61648 1.32346C9.68575 1.33037 9.75253 1.35883 9.81076 1.40625C9.86898 1.45367 9.91679 1.51853 9.94984 1.59494C9.98289 1.67136 10.0001 1.75689 9.99998 1.84375V19.7917Z" fill="#13ADB7"/>
              </svg>
              <span className="text-[#13acb6] text-base font-normal font-['DM Sans']">CroudTrust</span>
            </div>
            <div className="flex gap-10 text-sm font-medium font-['DM Sans']">
              <a href="/">Home</a>
              <a href="/campain">Charity</a>
              <a href="/dashboard/[walletadress]">Dashboard</a>
              <a href="#">Event</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.45312 16.9688H2.39062C2.17928 16.9688 1.97659 16.8848 1.82715 16.7354C1.67771 16.5859 1.59375 16.3832 1.59375 16.1719V11.3906C1.59375 11.1793 1.67771 10.9766 1.82715 10.8271C1.97659 10.6777 2.17928 10.5938 2.39062 10.5938H3.45312C3.66447 10.5938 3.86716 10.6777 4.0166 10.8271C4.16604 10.9766 4.25 11.1793 4.25 11.3906V16.1719C4.25 16.3832 4.16604 16.5859 4.0166 16.7354C3.86716 16.8848 3.66447 16.9688 3.45312 16.9688Z" fill="#13ADB7"/>
                <path d="M10.8906 16.9688H9.82812C9.61678 16.9688 9.41409 16.8848 9.26465 16.7354C9.11521 16.5859 9.03125 16.3832 9.03125 16.1719V8.20312C9.03125 7.99178 9.11521 7.78909 9.26465 7.63965C9.41409 7.49021 9.61678 7.40625 9.82812 7.40625H10.8906C11.102 7.40625 11.3047 7.49021 11.4541 7.63965C11.6035 7.78909 11.6875 7.99178 11.6875 8.20312V16.1719C11.6875 16.3832 11.6035 16.5859 11.4541 16.7354C11.3047 16.8848 11.102 16.9688 10.8906 16.9688Z" fill="#13ADB7"/>
                <path d="M14.6094 16.9688H13.5469C13.3355 16.9688 13.1328 16.8848 12.9834 16.7354C12.834 16.5859 12.75 16.3832 12.75 16.1719V4.48438C12.75 4.27303 12.834 4.07034 12.9834 3.9209C13.1328 3.77146 13.3355 3.6875 13.5469 3.6875H14.6094C14.8207 3.6875 15.0234 3.77146 15.1729 3.9209C15.3223 4.07034 15.4062 4.27303 15.4062 4.48438V16.1719C15.4062 16.3832 15.3223 16.5859 15.1729 16.7354C15.0234 16.8848 14.8207 16.9688 14.6094 16.9688Z" fill="#13ADB7"/>
                <path d="M7.17188 16.9688H6.10938C5.89803 16.9688 5.69534 16.8848 5.5459 16.7354C5.39646 16.5859 5.3125 16.3832 5.3125 16.1719V1.82812C5.3125 1.61678 5.39646 1.41409 5.5459 1.26465C5.69534 1.11521 5.89803 1.03125 6.10938 1.03125H7.17188C7.38322 1.03125 7.58591 1.11521 7.73535 1.26465C7.88479 1.41409 7.96875 1.61678 7.96875 1.82812V16.1719C7.96875 16.3832 7.88479 16.5859 7.73535 16.7354C7.58591 16.8848 7.38322 16.9688 7.17188 16.9688Z" fill="#13ADB7"/>
              </svg>
              <span className="text-[#13acb6] text-sm font-medium font-['DM Sans']">Open Data</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.91223 3.45652C1.91223 3.19514 2.01296 2.94448 2.19227 2.75966C2.37157 2.57484 2.61476 2.47101 2.86833 2.47101H4.92681C5.15312 2.47112 5.37206 2.55397 5.54468 2.70483C5.7173 2.85569 5.8324 3.06478 5.86952 3.29489L6.57703 7.66562C6.61084 7.87377 6.57892 8.08762 6.48598 8.27568C6.39303 8.46373 6.24397 8.61607 6.06074 8.71025L4.5807 9.47205C5.11144 10.8278 5.90187 12.0593 6.90476 13.093C7.90765 14.1268 9.10242 14.9415 10.4177 15.4886L11.1577 13.963C11.249 13.7743 11.3967 13.6208 11.5789 13.525C11.7612 13.4292 11.9684 13.3962 12.1702 13.4308L16.4105 14.1601C16.6337 14.1984 16.8366 14.317 16.9829 14.4949C17.1293 14.6729 17.2097 14.8985 17.2098 15.1318V17.2536C17.2098 17.515 17.1091 17.7657 16.9298 17.9505C16.7505 18.1353 16.5073 18.2391 16.2537 18.2391H14.3415C7.47672 18.2391 1.91223 12.5035 1.91223 5.42753V3.45652Z" fill="#E9ECEB"/>
              </svg>
              <span className="text-[#e8ebeb] text-sm font-medium font-['DM Sans']">+91 8872347754</span>
              <div className="flex items-center gap-2 bg-gray-500">
                <ConnectButton 
                  client={client}
                  theme={lightTheme()}
                  detailsButton={{
                    style: {
                      maxHeight: "50px",
                    }
                  }}
                  />
              </div>
            </div>
          </div>
        </nav>
      </div>
        </>*/} 
    
