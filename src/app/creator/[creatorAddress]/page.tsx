// "use client"
// import React from "react";
// import CreatorProfile from "@/components/CreatorProfile";
// interface Creator  {
//   profileImage: string;
//   name: string;
//   isVerified: boolean;
//   walletAddress: string;
//   about: string;
//   totalCampaigns: number;
//   totalDonations: number;
//   donations: number;
//   campaigns: number;
// }

// export default function  CreatorPage  () {
//   // Dummy data (replace with API call)
  "use client";
import React from "react";
import CreatorProfile from "@/components/CreatorProfile";
import StatsCard from "@/components/StatsCard";
import DonationGraph from "@/components/DonationGraph";
import SuccessPieChart from "@/components/SuccessPieChart";
const verifiedNGOs = ["0x123...456", "0x789...012"]; // Replace this with actual verified NGO wallet addresses

export default function CreatorPage() {
  
  const creator = {
    name: "John Doe",
    walletAddress: "0x123...456",
    profileImage: "/images/profile.jpg",
    totalCampaigns: 12,
    totalDonations: 5.2,
    isVerified: true, // verifiedNGOs.includes(creatorAddress)

    // Dummy campaign data
    campaigns: [
      { title: "Help for Earthquake Victims", raised: 10.5, status: "Completed" },
      { title: "Education for Underprivileged", raised: 7.2, status: "Ongoing" },
      { title: "Medical Aid for Refugees", raised: 5.8, status: "Completed" },
    ],

    // Dummy donation data
    donations: [
      { campaignTitle: "Cancer Treatment", amount: 2.1, date: "2025-02-20" },
      { campaignTitle: "Flood Relief Fund", amount: 3.3, date: "2025-02-22" },
    ],
    about: "Humanity is the best religion.",
    twitter: ".twitter.com",
    linkedin: ".linkedin.com",
    website: ".website.com",
  };
  const recentDonors = [
    { name: "Alice", amount: "0.5 ETH" },
    { name: "Bob", amount: "1.2 ETH" },
    { name: "Charlie", amount: "0.3 ETH" },
    { name: "David", amount: "0.8 ETH" },
    { name: "Eve", amount: "1.0 ETH" },
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CreatorProfile creator={creator} />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <StatsCard title="Total Campaigns" value={creator.totalCampaigns} />
        <StatsCard title="Total Donations (ETH)" value={creator.totalDonations} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <DonationGraph />
        <SuccessPieChart />
      </div>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
  <h3 className="text-lg font-semibold">Recent Donors</h3>
  <ul>
    {recentDonors.map((donor, index) => (
      <li key={index} className="flex justify-between py-2 border-b">
        <span>{donor.name}</span>
        <span className="text-blue-500">{donor.amount}</span>
      </li>
    ))}
  </ul>
</div>


      
    </div>
  );
}

