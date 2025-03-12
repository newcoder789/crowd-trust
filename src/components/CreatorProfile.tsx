import React from "react";
import { BadgeCheck, BarChart, PieChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VerifiedBadge from "./VerifiedBadge";


interface Creator {
  profileImage: string;
  name: string;
  isVerified: boolean;
  walletAddress: string;
  totalCampaigns: number;
  totalDonations: number;
  campaigns: { title: string; raised: number; status: string }[];
  donations: { campaignTitle: string; amount: number; date: string }[];
  twitter?: string;
  linkedin?: string;
  website?: string;
}

const CreatorProfile = ({ creator }: { creator: Creator }) => {
  const shareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied! 🚀");
  };
  
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="w-full p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all hover:scale-105 duration-300">
        {/* Top Section - Profile Pic + Name + Verified */}
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <img
            src={creator.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
          />
          
          

          {/* Name & Badge */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {creator.name}{" "}
              {creator.isVerified && <VerifiedBadge/>}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{creator.walletAddress}</p>
          </div>
        </div>
        <button onClick={shareProfile} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Share Profile 🔗
          </button>
        {/* Social Links */}
        <div className="mt-4 flex gap-4 text-blue-500">
          {creator.twitter && <a href={creator.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
          {creator.linkedin && <a href={creator.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {creator.website && <a href={creator.website} target="_blank" rel="noopener noreferrer">Website</a>}
        </div>


        {/* Stats Section */}
        <div className="mt-6 flex justify-between items-center text-center">
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{creator.totalCampaigns}</h3>
            <p className="text-xs text-gray-500">Campaigns Created</p>
          </div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{creator.totalDonations} ETH</h3>
            <p className="text-xs text-gray-500">Total Donations</p>
          </div>
        </div>

        {/* Graphs */}
        <div className="mt-6 flex justify-between">
          <BarChart className="w-16 h-16 text-gray-600 dark:text-gray-300" />
          <PieChart className="w-16 h-16 text-gray-600 dark:text-gray-300" />
        </div>
      </Card>

      {/* Campaigns & Donations Section */}
      <div className="space-y-6">
        {/* Campaigns Table */}
        <Card className="p-4 rounded-2xl shadow-xl bg-white dark:bg-gray-900">
          <h3 className="text-xl font-bold mb-4">📌 Created Campaigns</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount Raised</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creator.campaigns.map((campaign, index) => (
                <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <TableCell>{campaign.title}</TableCell>
                  <TableCell>{campaign.raised} ETH</TableCell>
                  <TableCell className="text-green-500">{campaign.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Donations Table */}
        <Card className="p-4 rounded-2xl shadow-xl bg-white dark:bg-gray-900">
          <h3 className="text-xl font-bold mb-4">💰 Donations Made</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creator.donations.map((donation, index) => (
                <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <TableCell>{donation.campaignTitle}</TableCell>
                  <TableCell>{donation.amount} ETH</TableCell>
                  <TableCell>{donation.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default CreatorProfile;
