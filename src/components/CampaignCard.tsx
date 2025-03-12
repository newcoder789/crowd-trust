"use client";

import { client } from "@/app/client";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import axios from "axios";
import { getUserEmail } from "thirdweb/wallets/in-app";
import Image from "next/image";
import { toast } from "sonner";

type CampaignAddress = {
  campaignAddress: string;
  initialEmail?: string; // Add prop for server-fetched email
};

export const CampaignCard: React.FC<CampaignAddress> = ({ campaignAddress, initialEmail = "Not connected" }) => {
  const [goalAmountUsd, setGoalAmountUsd] = useState<number>(0);
  const [progressAmountUsd, setProgressAmountUsd] = useState<number>(0);
  const [donationUsdInput, setDonationUsdInput] = useState<string>("");
  const [donationEth, setDonationEth] = useState<string>("0");
  const [donationData, setDonationData] = useState<{ totalDonated: number; donors: any[] } | null>(null);
  const [isFetchingDonationData, setIsFetchingDonationData] = useState(false);
  const [email, setEmail] = useState<string>(initialEmail);

  const { mutate: sendTransaction, isPending: isDonating } = useSendTransaction();

  const contract = useMemo(
    () =>
      getContract({
        client,
        chain: baseSepolia,
        address: campaignAddress,
      }),
    [campaignAddress]
  );

  const { data: campaignName } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: isCompleted } = useReadContract({
    contract,
    method: "function isCompleted() view returns (bool)",
    params: [],
  });

  const { data: goalWei } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: progressWei } = useReadContract({
    contract,
    method: "function getProgress() view returns (uint256)",
    params: [],
  });
  const { data: campaignImage } = useReadContract({
    contract: contract,
    method: "function image() view returns (string)",
    params: [],
  });

  const fetchDonationData = async () => {
    if (!campaignAddress) return;
    setIsFetchingDonationData(true);
    try {
      const response = await axios.get(`/api/getCampaignDonations?address=${campaignAddress}`);
      setDonationData(response.data);
    } catch (error) {
      console.error("Error fetching donation data:", error);
    } finally {
      setIsFetchingDonationData(false);
    }
  };

  useEffect(() => {
    async function fetchCampaignRelatedData() {
      try {
        fetchDonationData();
        const userEmail = await getUserEmail({ client });
        setEmail(userEmail || "No email found");
        console.log(userEmail);
      } catch (error) {
        console.error("Error fetching email:", error);
        setEmail("Error fetching email");
      }
    }

    fetchCampaignRelatedData();
  }, []);

  useEffect(() => {
    if (goalWei) {
      const goalEth = Number(ethers.formatEther(goalWei));
      setGoalAmountUsd(goalEth * 2500);
    }
  }, [goalWei]);

  useEffect(() => {
    if (progressWei && donationData) {
      const totalDonatedUsd = donationData.totalDonated;
      setProgressAmountUsd(totalDonatedUsd);
    }
  }, [progressWei, donationData]);

  const progressPercentage = useMemo(() => {
    if (!goalAmountUsd || !progressAmountUsd) return 0;
    const percentage = (progressAmountUsd / goalAmountUsd) * 100;
    return Math.min(percentage, 100);
  }, [goalAmountUsd, progressAmountUsd]);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usdValue = e.target.value;
    setDonationUsdInput(usdValue);
    const ethValue = usdValue ? (parseFloat(usdValue) / 2500).toFixed(6) : "0";
    setDonationEth(ethValue);
  };

  const handleDonate = async () => {
    if (!donationEth || parseFloat(donationEth) < 0.001) {
      alert("Minimum donation is 0.001 ETH.");
      return;
    }

    const transaction = prepareContractCall({
      contract,
      method: "function donate() payable",
      params: [],
      value: ethers.parseEther(donationEth),
    });
    
    sendTransaction(transaction, {
      onSuccess: async (result) => {
        // alert("Donation Successful!");
        toast.success("Donation Successful!");
        fetchDonationData();
        if (campaignName && email !== "Not connected" && email !== "No email found") {
          const donationDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          console.log("Sending Email");
          const emailResponse = await axios.post('/api/sendingEmail', {
            email,
            username: "Don Sab",
            campaignName,
            campaignAddress,
            transactionHash: result.transactionHash,
            donationAmountUsd: parseFloat(donationUsdInput),
            donationDate,
          });

          if (emailResponse.data.success) {
            console.log("Email sent successfully");
          } else {
            console.error("Failed to send email:", emailResponse.data.message);
          }
        }
      },
      onError: (err) => {
        console.error("Donation failed:", err);
        alert("Donation failed. Check console for details.");
      },
    });
  };

  if (isCompleted) return null;
  console.log(campaignImage);
  return (
    <div className="w-[320px] bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-[200px] group">
        {campaignImage ? (
          <Link href={`/campaign/${campaignAddress}`}>
            <Image
              src={campaignImage || "./3d-word-oops.jpg"}
              width={200}
              height={200}
              priority={false} 
              alt = {campaignName || "Campaign"}
              className = "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              onError={(e) => (e.currentTarget.src = "/3d-word-oops.jpg")}
            />
             {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" /> */}
          </Link> 
        ) : (
          <div className="w-full h-full bg-[#f5f7f6] animate-pulse flex items-center justify-center">
            <span className="text-[#7a7d8c] text-sm font-['DM Sans']">Loading...</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#13acb6] rounded-full p-2 shadow-md">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/campaign/${campaignAddress}`}>
          <h2 className="text-lg font-bold text-[#0f111d] font-['DM Sans'] mb-2 truncate hover:text-[#13acb6] transition-colors duration-200">
            {campaignName || "Unnamed Campaign"}
          </h2>
        </Link>
        <p className="text-sm text-[#7a7d8c] font-['DM Sans'] mb-4 line-clamp-2">
          Support this cause with your donation.
        </p>

        <div className="mb-4">
          <div className="w-full bg-[#e5e7eb] rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#13acb6] to-[#0f8e96] h-2 rounded-full transition-all duration-500 animate-pulse"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#7a7d8c] font-['DM Sans']">
            <span>
              Raised: <strong className="text-[#0f111d]">${progressAmountUsd.toFixed(2)}</strong>
            </span>
            <span>
              Goal: <strong className="text-[#0f111d]">${goalAmountUsd.toFixed(2)}</strong>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={donationUsdInput}
              onChange={handleUsdChange}
              className="w-full pl-7 pr-3 py-2 bg-[#f9fafc] border border-[#e5e7eb] rounded-md text-sm text-[#0f111d] font-['DM Sans'] focus:ring-2 focus:ring-[#13acb6] focus:outline-none"
              placeholder="Enter amount"
            />
          </div>

          <p className="text-xs text-[#7a7d8c] font-['DM Sans']">
            ≈ <strong className="text-[#0f111d]">{donationEth} ETH</strong> (Base Sepolia)
          </p>
          <button
            onClick={handleDonate}
            disabled={isDonating}
            className={`w-full py-2.5 px-4 rounded-full text-white text-sm font-medium font-['DM Sans'] transition-all duration-200 ${
              isDonating
                ? "bg-[#999ba8] cursor-not-allowed"
                : "bg-[#13acb6] hover:bg-[#0f8e96] active:bg-[#0b6f77] shadow-md hover:shadow-lg"
            }`}
          >
            {isDonating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Donating...
              </span>
            ) : (
              "Donate Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};