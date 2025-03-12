"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { client } from "@/app/client";
import { baseSepolia } from "thirdweb/chains";
import { getContract, prepareContractCall } from "thirdweb";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { ethers } from "ethers";
import { Proposal } from "@/models/Proposal";

const ProposalPage = () => {
  const router = useRouter();
  const params = useParams();
  const account = useActiveAccount();
  const [_description, setDescription] = useState<string>("");
  const [proofImage, setProofImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [amountUsd, setAmountUsd] = useState<string>(""); // USD input
  const [donationEth, setDonationEth] = useState<string>("0"); // ETH equivalent
  const { mutate: sendTransaction } = useSendTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contract instance
  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: params.id as string,
  });

  // Handle USD to ETH conversion
  const handleUsdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const usdValue = e.target.value;
    setAmountUsd(usdValue);
    if (usdValue) {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await response.json();
        const ethPrice = data.ethereum.usd;
        const ethValue = (parseFloat(usdValue) / ethPrice).toFixed(6);
        setDonationEth(ethValue);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
        const fallbackEth = (parseFloat(usdValue) / 2500).toFixed(6); // Fallback rate ~$2500/ETH
        setDonationEth(fallbackEth);
        toast.error("Using fallback ETH price. Check your connection.");
      }
    } else {
      setDonationEth("0");
    }
  };

  // Handle proposal submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!_description || !proofImage) {
      toast("Please enter a valid proposal description or proof image URL.", {
        description: "Fields Missing",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const campaignId = params.id;
      const proposer = account?.address;
      const _amount = ethers.parseEther(donationEth || "0");
      const _recipient = proposer;

      if (!campaignId || !proposer || !title || !_description || !amountUsd) {
        toast("Event has been created", {
          description: "Fields Missing",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        setIsSubmitting(false);
        return;
      }
      if(!_recipient)
        {toast.error("error finding proposar")
            return <h1> Proposar not found </h1>
        }
      const transaction = prepareContractCall({
        contract,
        method: "function createProposal(string _description, uint256 _amount, address _recipient)",
        params: [_description, _amount, _recipient],
      });

      await sendTransaction(transaction, {
        onSuccess: async (result) => {
          toast.success("Proposal has been created");
          console.log(result);
          setDescription("");
          setProofImage("");
          setTitle("");
          setAmountUsd("");
          setDonationEth("0");
        },
        onError: (err) => {
          console.error("Proposal creation failed:", err);
          toast.error("Proposal Failed");
        },
      });
      const response = await axios.post("/api/proposal", {
        campaignId,
        proposer,
        reason: _description,
        proofImage,
        title,
        amountRequested: amountUsd,
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Proposal submitted to database!");
        router.push(`/campaigns/${params.id}`);
      } else {
        toast.error("Error submitting proposal to database.");
      }

    } catch (error) {
      console.error("Proposal Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 mt-20 z-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Proposal</h2>

        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="e.g., Educational Supplies"
          required
        />

        <label className="block mt-4 mb-2 font-semibold">Description</label>
        <textarea
          value={_description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="e.g., Books and stationery for kids"
          required
        />

        <label className="block mt-4 mb-2 font-semibold">Amount Requested ($)</label>
        <input
          type="number"
          value={amountUsd}
          onChange={handleUsdChange}
          className="w-full p-2 border rounded-md"
          placeholder="e.g., 50"
          min="0"
          required
        />
        <p className="text-xs text-[#7a7d8c] font-['DM Sans']">
          ≈ <strong className="text-[#0f111d]">{donationEth} ETH</strong> (Base Sepolia)
        </p>

        <label className="block mt-4 mb-2 font-semibold">Image URL</label>
        <input
          type="text"
          value={proofImage}
          onChange={(e) => setProofImage(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="e.g., https://example.com/image.jpg"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting || !account?.address}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Proposal"}
        </button>
      </form>

      <Toaster richColors closeButton={true} />
    </div>
  );
};

export default ProposalPage;