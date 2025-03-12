"use client";
import { useActiveAccount } from "thirdweb/react";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains";
import { getContract, readContract } from "thirdweb";
import { CampaignCard } from "@/components/CampaignCard";
import { CROWDFUNDING_FACTORY } from "./constants/contracts";
import { useEffect, useState } from "react";
import axios from "axios";  
import SearchPage from "@/components/SearchPage";
import React from "react";
import { getUserEmail } from "thirdweb/wallets/in-app";

export default function Home() {
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState("Fetching...");
  const account = useActiveAccount();

  useEffect(()=>{
    async function fetchEmail() {
          try {
            const userEmail = await getUserEmail({ client });
            setEmail(userEmail || "No email found");
            console.log("Found this is it your mail: ", userEmail)
          } catch (error) {
            console.error("Error fetching email:", error);
            setEmail("Error fetching email");
          }
        }
        fetchEmail();
  }, [])
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const contract = getContract({
          client: client,
          chain: baseSepolia,
          address: CROWDFUNDING_FACTORY,
        });
        console.log(CROWDFUNDING_FACTORY);
        console.log("Contract loaded:", contract);
        const campaigns: any = await readContract({
          contract,
          method: "function getAllCampaigns() view returns (address[])",
        });
        setCampaigns(campaigns);
        console.log("Campaigns:", campaigns);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  console.log("Campaigns:", campaigns);

  return (
    <div className="w-full min-h-screen mx-auto bg-[#eff2f1] flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full relative h-[751px] ">
        <div className="bg-black opacity-10 absolute inset-0 z-10" />
        <img
          className="w-full h-full object-cover absolute inset-0"
          src="https://images.unsplash.com/photo-1516012999909-1dd29c71d3a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Header background of a charitable scene"
        />
        <div className="bg-black opacity-60 absolute inset-0 z-20" />
        {/* Hero Section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center text-white z-30">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold font-['DM Sans'] leading-tight mb-6">
              <span className="text-[#13acb6]">Happiness</span> comes from{" "}
              <span className="text-[#13acb6]">your action</span>.
            </h1>
            <p className="text-base font-normal font-['DM Sans'] mb-8 max-w-md mx-auto">
              Be a part of the breakthrough and make someone’s dream come true.
            </p>
            <div className="flex justify-center gap-4 sm:gap-6">
              <button className="px-6 py-3 bg-[#13acb6] rounded-full text-white text-base font-medium font-['DM Sans'] hover:bg-[#0f8e96] transition">
                Donate Now
              </button>
              <button className="px-6 py-3 border border-white rounded-full text-white text-base font-medium font-['DM Sans'] flex items-center gap-2 hover:bg-white hover:text-[#13acb6] transition">
                <a href="https://youtu.be/-0Y5xlsFehg?si=6KYzLPs4qXUjFX7_" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_413_63)">
                      <path
                        d="M20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM8.4875 6.36625C8.39404 6.29971 8.28408 6.26018 8.16965 6.25198C8.05522 6.24379 7.94074 6.26724 7.83876 6.31978C7.73678 6.37233 7.65122 6.45192 7.59147 6.54986C7.53172 6.64779 7.50007 6.76028 7.5 6.875V13.125C7.50007 13.2397 7.53172 13.3522 7.59147 13.4501C7.65122 13.5481 7.73678 13.6277 7.83876 13.6802C7.94074 13.7328 8.05522 13.7562 8.16965 13.748C8.28408 13.7398 8.39404 13.7003 8.4875 13.6337L12.8625 10.5087C12.9435 10.4509 13.0096 10.3746 13.0551 10.2861C13.1007 10.1976 13.1245 10.0995 13.1245 10C13.1245 9.90047 13.1007 9.80237 13.0551 9.71388C13.0096 9.62539 12.9435 9.54906 12.8625 9.49125L8.4875 6.36625Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_413_63">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Campaigns Section */}
      <section className="w-full mt-12 px-4 sm:px-6 bg-[#f5f7f6] rounded-t-3xl py-12">
        <h2 className="text-center text-3xl font-bold font-['DM Sans'] mb-8 text-[#0f111d]">
          Current <span className="text-[#13acb6]">Campaigns</span>
        </h2>
        <SearchPage />
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {["All", "Disaster", "Children", "Food Crisis", "Health", "Education", "Homeless", "Animal", "Pandemic", "War Crisis"].map(
            (category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-normal font-['DM Sans'] transition ${
                  category === "All"
                    ? "bg-[#13acb6] text-white"
                    : "border border-[#13acb6] bg-white text-[#13acb6] hover:bg-[#13acb6] hover:text-white"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && campaigns ? (
              campaigns.length > 0 ? (
                campaigns.filter((addr) => addr).map((addr) => <CampaignCard key={addr} campaignAddress={addr} initialEmail={email} />)
              ) : (
                <p className="col-span-full text-center text-lg font-semibold text-[#7a7d8c] font-['DM Sans']">
                  No Campaigns Available
                </p>
              )
            ) : (
              <div className="col-span-full text-center">
                <div className="animate-pulse flex justify-center items-center h-32">
                  <span className="text-[#7a7d8c] text-lg font-['DM Sans']">Loading Campaigns...</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center text-[#13acb6] text-base font-medium font-['DM Sans'] mt-8 gap-2">
          <button className="px-2 hover:text-[#0f8e96]">&lt;</button>
          <span>1</span>
          <button className="px-2 bg-[#13acb6] text-white rounded-full">2</button>
          <span>3</span>
          <span>...</span>
          <span>49</span>
          <span>50</span>
          <button className="px-2 hover:text-[#0f8e96]">&gt;</button>
          <span className="flex items-center gap-1 hover:underline">
            See All
            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.3537 4.35355C14.5489 4.15829 14.5489 3.84171 14.3537 3.64645L11.1717 0.464465C10.9764 0.269203 10.6598 0.269203 10.4646 0.464465C10.2693 0.659727 10.2693 0.97631 10.4646 1.17157L13.293 4L10.4646 6.82843C10.2693 7.02369 10.2693 7.34027 10.4646 7.53553C10.6599 7.7308 10.9764 7.7308 11.1717 7.53553L14.3537 4.35355ZM0.000122114 4.5L14.0001 4.5L14.0001 3.5L0.000122027 3.5L0.000122114 4.5Z"
                fill="#13ADB7"
              />
            </svg>
          </span>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="w-full max-w-5xl mt-16 px-4 sm:px-6 py-12">
        <div className="text-[#5b6473] text-sm font-medium font-['DM Sans'] tracking-wide uppercase">Modern Crowdfunding Platform</div>
        <h2 className="mt-2 text-3xl font-bold font-['DM Sans'] leading-tight text-[#0f111d]">
          Distribute aid <span className="text-[#13acb6]">easily</span>, <span className="text-[#13acb6]">quickly</span>, and{" "}
          <span className="text-[#13acb6]">transparently</span>.
        </h2>
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 relative">
            <div className="w-40 h-[500px] bg-[#13acb6] absolute left-0 top-0 rounded-lg" />
            <div className="w-64 h-[450px] bg-[#fcfffe] rounded-lg absolute left-4 top-6 p-6 shadow-md">
              <div className="flex justify-between items-start">
                <h3 className="text-[#0f111d] text-base font-bold font-['DM Sans']">Open Data</h3>
                <div className="space-y-1">
                  <div className="w-2.5 h-0.5 bg-[#13acb6]" />
                  <div className="w-4 h-0.5 bg-[#13acb6]" />
                  <div className="w-1.5 h-0.5 bg-[#13acb6]" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="w-full h-2 bg-[#f1f1f1] rounded-sm" />
                <div className="w-full h-2 bg-[#f1f1f1] rounded-sm" />
                <div className="w-full h-2 bg-[#f1f1f1] rounded-sm" />
              </div>
              <div className="mt-6 text-[#0f111d] text-base font-medium font-['DM Sans']">Donation</div>
              <div className="mt-4 space-y-2">
                <div className="w-24 h-3 bg-[#f9f9f9] rounded" />
                <div className="w-20 h-3 bg-[#f9f9f9] rounded" />
                <div className="w-28 h-3 bg-[#f9f9f9] rounded" />
                <div className="w-16 h-3 bg-[#f9fafc] rounded" />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-[#0abd92] text-base font-normal font-['DM Sans']">+618</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#f76799] rounded-full" />
                  <div className="w-2 h-2 bg-[#2de6a6] rounded-full" />
                  <div className="w-2 h-2 bg-[#6faafa] rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-[#5b6473] text-base font-normal font-['DM Sans'] leading-relaxed">
              CrowdTrust AI is a decentralized crowdfunding platform that leverages blockchain and AI to ensure transparency, security,
              and fraud prevention in fundraising. Built on Ethereum smart contracts, it enables tamper-proof transactions while an
              AI-based fraud detection system identifies and flags suspicious campaigns.
            </p>
            <a href="#" className="mt-4 inline-block text-[#0f111d] text-base font-normal font-['DM Sans'] underline hover:text-[#13acb6]">
              Read More
            </a>
            <hr className="my-6 border-[#e5e7eb]" />
            <h3 className="text-center text-[#0f111d] text-xl font-bold font-['DM Sans']">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-2">
              {[
                "Why did you choose blockchain for crowdfunding?",
                "How does AI help in fraud detection?",
                "How does the decentralized voting system work?",
                "How do you prevent AI from falsely flagging genuine campaigns?",
                "Which blockchain are you using, and why?",
              ].map((question, index) => (
                <div
                  key={index}
                  className="bg-[#f9fafc] rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-[#f0f2f4] transition"
                >
                  <span className="text-[#0f111d] text-sm font-normal font-['DM Sans']">{question}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.99998 7.19995L12 13.2L18 7.19995L20.4 8.39995L12 16.7999L3.59998 8.39995L5.99998 7.19995Z" fill="#0F111D" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Humanitarian Mission Section */}
      <section className="w-full max-w-5xl mt-16 px-4 sm:px-6 py-12">
        <div className="text-[#5b6473] text-sm font-medium font-['DM Sans'] tracking-wide uppercase">Humanitarian Mission</div>
        <h2 className="mt-2 text-3xl font-bold font-['DM Sans'] leading-tight text-[#0f111d]">
          Help the Affected by <span className="text-[#13acb6]">Disasters</span>, <span className="text-[#13acb6]">Shortages</span>,
          and <span className="text-[#13acb6]">Emergency Relief</span>.
        </h2>
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 space-y-6">
            {[
              { stat: "22,690", text: "Donations have been verified and still active." },
              { stat: "6,450", text: "Donations have been distributed to disaster-affected areas." },
              { stat: "10,517", text: "Donations have been distributed to the needy." },
              { stat: "5,058", text: "Donations were distributed to social foundations and orphanages." },
              { stat: "4,803", text: "Donations have been distributed to people in emergency situations." },
              { stat: "1.4 Billion", text: "Total funds raised so far." },
            ].map((item, index) => (
              <div key={index} className="text-base font-['DM Sans'] leading-relaxed">
                <span className="text-[#13acb6] font-bold">{item.stat}</span>{" "}
                <span className="text-[#0f111d] font-normal">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="w-80 h-80 rounded-full border border-[#dae2e3] flex items-center justify-center">
              <img
                className="w-56 h-56 object-cover rounded-full"
                src="https://imgs.search.brave.com/veenvrgDINBsP8ZIW4eUp5FLShwTIJwW7hQqZm171WI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVudWVyZXBvcnQu/Y29tL21lZGlhL2Nh/Y2hlL3Jlc29sdmUv/dmVudWVfcm91bmR1/cF9zaW5nbGVfaW1h/Z2VfZmxleC91cGxv/YWRzLyswUmVndWxh/cl9Sb3VuZHVwL05h/dHVyYWxEaXNhc3Rl/clJlbGllZi9Wb2x1/bnRlZXItUGVkcm9Q/YXJkby5qcGc"
                alt="Humanitarian aid scene"
              />
            </div>
            <div className="absolute top-0 right-0">
              <svg width="300" height="300" viewBox="0 0 406 423" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M227.297 356.902C325.44 356.902 405 277.342 405 179.199C405 81.0566 325.44 1.49634 227.297 1.49634"
                  stroke="#13ADB7"
                  strokeLinejoin="round"
                  strokeDasharray="5 12"
                />
                <path d="M228 1L-1.19209e-07 0.99998" stroke="#13ADB7" strokeDasharray="5 12" />
                <path d="M230 357.473L81.2623 349.53" stroke="#13ADB7" strokeDasharray="5 12" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full max-w-5xl mt-16 px-4 sm:px-6 py-12">
        <div className="text-[#5b6473] text-sm font-medium font-['DM Sans'] tracking-wide uppercase">Our Partners</div>
        <h2 className="mt-2 text-3xl font-bold font-['DM Sans'] leading-tight text-[#0f111d]">
          More than 50 <span className="text-[#13acb6]">Companies</span> and{" "}
          <span className="text-[#13acb6]">Institutions</span> work in this field.
        </h2>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            "https://placehold.co/154x33/partner/logo",
            "https://placehold.co/196x60/partner/logo",
            "https://placehold.co/178x107/partner/logo",
            "https://placehold.co/135x47/partner/logo",
            "https://placehold.co/155x62/partner/logo",
            "https://placehold.co/140x40/partner/logo",
            "https://placehold.co/129x46/partner/logo",
            "https://placehold.co/116x87/partner/logo",
          ].map((src, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(51,68,99,0.06)] p-4 flex items-center justify-center"
            >
              {src ? (
                  <img className="max-h-16 object-contain" src={src} alt={`Partner logo ${index + 1}`} />
                ) : (
                  <p>No Image Available</p>
                )}
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(51,68,99,0.06)] p-4 flex items-center justify-center text-center">
            <span className="text-[#0f111d] text-sm font-medium font-['DM Sans']">and 42 more</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-5xl mt-16 px-4 sm:px-6 py-12 bg-gradient-to-r from-[#13acb6] to-[#7eedf4] rounded-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 text-white">
            <div className="uppercase text-sm font-medium font-['DM Sans']">Call Center</div>
            <div className="mt-2 text-2xl font-medium font-['DM Sans']">+918872347754</div>
            <div className="mt-6 uppercase text-sm font-medium font-['DM Sans']">Email</div>
            <div className="mt-2 text-2xl font-medium font-['DM Sans']">CroudTrust@gmail.com</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black mt-16 text-white py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold font-['DM Sans'] uppercase">About</h4>
              <ul className="mt-4 space-y-3 text-sm font-normal font-['DM Sans']">
                <li className="hover:text-[#13acb6] cursor-pointer">Partners</li>
                <li className="hover:text-[#13acb6] cursor-pointer">How-to</li>
                <li className="hover:text-[#13acb6] cursor-pointer">Helpdesk</li>
                <li className="hover:text-[#13acb6] cursor-pointer">Community</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold font-['DM Sans'] uppercase">Terms & Conditions</h4>
              <ul className="mt-4 space-y-3 text-sm font-normal font-['DM Sans']">
                <li className="hover:text-[#13acb6] cursor-pointer">Report Violations</li>
                <li className="hover:text-[#13acb6] cursor-pointer">Policy</li>
                <li className="hover:text-[#13acb6] cursor-pointer">Disclaimer</li>
                <li className="hover:text-[#13acb6] cursor-pointer">Missionary</li>
              </ul>
            </div>
          </div>
          <div className="text-left md:text-right">
            <h4 className="text-sm font-bold font-['DM Sans'] uppercase">Our Office</h4>
            <p className="mt-4 text-sm font-normal font-['DM Sans'] leading-relaxed max-w-xs">
              SCF 21, 2nd Floor, Main Market, Landran, Mohali, Punjab – 140307, India.
            </p>
            <p className="mt-6 text-sm font-normal font-['DM Sans']">2025 © CroudTrust Digital Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}