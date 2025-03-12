// "use client";
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
// import { client } from "@/app/client";
// import { baseSepolia } from "thirdweb/chains";
// import { getContract, prepareContractCall } from "thirdweb";
// import { toast, Toaster } from "sonner";
// import { ethers } from "ethers";
// import { motion, AnimatePresence } from "framer-motion";

// // Proposal type based on your contract
// interface Proposal {
//   id: bigint;
//   description: string;
//   amount: bigint;
//   recipient: string;
//   timestamp: bigint;
//   approved: boolean;
//   rejected: boolean;
//   votes: bigint;
// }

// const VotePage = () => {
//   const params = useParams();
//   const account = useActiveAccount();
//   const { mutate: sendTransaction, isPending: isTransactionPending } = useSendTransaction();
//   const [expandedProposal, setExpandedProposal] = useState<number | null>(0); // Track expanded proposal (default to first)
//   const [votingProposalId, setVotingProposalId] = useState<number | null>(null); // Track which proposal is being voted on
//   const [approvingProposalId, setApprovingProposalId] = useState<number | null>(null); // Track which proposal is being approved
//   const [disapprovingProposalId, setDisapprovingProposalId] = useState<number | null>(null); // Track which proposal is being disapproved

//   // Contract instance
//   const contract = getContract({
//     client: client,
//     chain: baseSepolia, 
//     address: params.id as string,
//   });

//   // Fetch proposals
//   const { data: proposals, isPending: proposalPending, refetch: refetchProposals } = useReadContract({
//     contract,
//     method: "function getProposals() view returns ((uint256 id, string description, uint256 amount, address recipient, uint256 timestamp, bool approved, bool rejected, uint256 votes)[])",
//     params: [],
//   });
//   if(proposals)
//   console.log(proposals)
//   // Handle voting
//   const handleVote = async (proposalId: number) => {
//     if (!account?.address) {
//       toast.error("Please connect your wallet");
//       return;
//     }

//     setVotingProposalId(proposalId);
//     const _proposalId = BigInt(proposalId);
//     const transaction = prepareContractCall({
//         contract,
//         method:
//           "function voteOnProposal(uint256 _proposalId)",
//         params: [_proposalId],
//       });

//     sendTransaction(transaction, {
//       onSuccess: async () => {
//         toast.success("Voted successfully!");
//         await refetchProposals(); // Refetch proposals to update vote count
//       },
//       onError: (err) => toast.error("Voting failed: " + err.message),
//     });
//     setVotingProposalId(null);
//   };

//   // Handle approval
//   const handleApprove = async (proposalId: number) => {
//     if (!account?.address) {
//       toast.error("Please connect your wallet");
//       return;
//     }

//     setApprovingProposalId(proposalId);
//     const  _proposalId = BigInt(proposalId);
//     const transaction = prepareContractCall({
//         contract,
//         method:
//           "function approveProposal(uint256 _proposalId)",
//         params: [_proposalId],
//       });
//     sendTransaction(transaction, {
//       onSuccess: async () => {
//         toast.success("Proposal approved successfully!");
//         await refetchProposals(); // Refetch proposals to update status
//       },
//       onError: (err) => toast.error("Approval failed: " + err.message),
//     });
//     setApprovingProposalId(null);
//   };

//   // Handle disapproval
//   const handleDisapprove = async (proposalId: number) => {
//     if (!account?.address) {
//       toast.error("Please connect your wallet");
//       return;
//     }

//     setDisapprovingProposalId(proposalId);

//     const _proposalId = BigInt(proposalId);
//     const transaction = prepareContractCall({
//         contract,
//         method:
//           "function rejectProposal(uint256 _proposalId)",
//         params: [_proposalId],
//       });

//     sendTransaction(transaction, {
//       onSuccess: async () => {
//         toast.success("Proposal disapproved successfully!");
//         await refetchProposals(); // Refetch proposals to update status
//       },
//       onError: (err) => toast.error("Disapproval failed: " + err.message),
//     });
//     setDisapprovingProposalId(null);
//   };

//   // Toggle expanded state
//   const toggleExpand = (index: number) => {
//     setExpandedProposal(expandedProposal === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Vote on Proposals</h1>

//       {proposalPending ? (
//         <p className="text-center">Loading proposals...</p>
//       ) : proposals && proposals.length > 0 ? (
//         <div className="max-w-3xl mx-auto space-y-4">
//           {proposals.map((proposal: Proposal, index: number) => {
//             const isExpanded = expandedProposal === index;
//             const isVoting = votingProposalId === Number(proposal.id);
//             const isApproving = approvingProposalId === Number(proposal.id);
//             const isDisapproving = disapprovingProposalId === Number(proposal.id);
//             return (
//               <motion.div
//                 key={proposal.id.toString()}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//                 layout
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Proposal Bar (always visible) */}
//                 <motion.div
//                   className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 ${
//                     isExpanded ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                   onClick={() => toggleExpand(index)}
//                   layout
//                 >
//                   <div>
//                     <h2 className="text-lg font-semibold">Proposal #{proposal.id.toString()}</h2>
//                     <p className="text-sm text-gray-600">
//                       Amount: {ethers.formatEther(proposal.amount)} ETH
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Votes: {proposal.votes.toString()}
//                     </p>
//                   </div>
//                   <motion.div
//                     animate={{ rotate: isExpanded ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <svg
//                       className="w-5 h-5 text-gray-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </motion.div>
//                 </motion.div>

//                 {/* Expanded Content */}
//                 <AnimatePresence>
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="p-4 border-t"
//                     >
//                       <p><strong>Description:</strong> {proposal.description}</p>
//                       <p><strong>Amount:</strong> {ethers.formatEther(proposal.amount)} ETH (~${(parseFloat(ethers.formatEther(proposal.amount)) * 1807.68).toFixed(2)})</p>
//                       <p><strong>Recipient:</strong> {proposal.recipient}</p>
//                       <p><strong>Votes:</strong> {proposal.votes.toString()}</p>
//                       <p><strong>Status:</strong> {proposal.approved ? "Approved" : proposal.rejected ? "Rejected" : "Pending"}</p>
//                       <p><strong>Created:</strong> {new Date(Number(proposal.timestamp) * 1000).toLocaleString()}</p>

//                       {/* Action Buttons */}
//                       <div className="mt-4 flex space-x-3">
//                         <button
//                           onClick={() => handleVote(Number(proposal.id))}
//                           className={`py-2 px-4 rounded-md text-white transition-colors duration-200 ${
//                             isVoting ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
//                           } disabled:bg-gray-400`}
//                           disabled={proposal.approved || proposal.rejected || !account?.address || isVoting}
//                         >
//                           {isVoting ? "Voting..." : "Vote"}
//                         </button>
//                         <button
//                           onClick={() => handleApprove(Number(proposal.id))}
//                           className={`py-2 px-4 rounded-md text-white transition-colors duration-200 ${
//                             isApproving ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
//                           } disabled:bg-gray-400`}
//                           disabled={proposal.approved || proposal.rejected || !account?.address || isApproving}
//                         >
//                           {isApproving ? "Approving..." : "Approve"}
//                         </button>
//                         <button
//                           onClick={() => handleDisapprove(Number(proposal.id))}
//                           className={`py-2 px-4 rounded-md text-white transition-colors duration-200 ${
//                             isDisapproving ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
//                           } disabled:bg-gray-400`}
//                           disabled={proposal.approved || proposal.rejected || !account?.address || isDisapproving}
//                         >
//                           {isDisapproving ? "Disapproving..." : "Disapprove"}
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center">No proposals found.</p>
//       )}

//       <Toaster richColors closeButton={true} />
//     </div>
//   );
// };

// export default VotePage;

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { client } from "@/app/client";
import { baseSepolia } from "thirdweb/chains";
import { getContract, prepareContractCall } from "thirdweb";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";

// Interfaces for type safety
interface Donor {
  address: string;
  totalDonation: bigint;
  votingPower: number;
  hasVoted: boolean;
}

interface Proposal {
  id: bigint;
  description: string;
  amount: bigint;
  recipient: string;
  timestamp: bigint;
  approved: boolean;
  rejected: boolean;
  votes: bigint;
  title?: string;
  proofImage?: string;
}

const VotePage = () => {
  const params = useParams();
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending: isTransactionPending } = useSendTransaction();
  const [expandedProposal, setExpandedProposal] = useState<number | null>(0); // Track expanded proposal (default to first)
  const [approvingProposalId, setApprovingProposalId] = useState<number | null>(null); // Track which proposal is being approved
  const [disapprovingProposalId, setDisapprovingProposalId] = useState<number | null>(null); // Track which proposal is being disapproved
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [donors, setDonors] = useState<{ [proposalId: number]: Donor[] }>({}); // Donors per proposal
  const [campaignName, setCampaignName] = useState<string>(""); // Campaign name
  const [ethPrice, setEthPrice] = useState<number>(2500); // Fallback price
  const [userVotingPower, setUserVotingPower] = useState<{ [proposalId: number]: number }>({}); // User's voting power per proposal

  // Contract instance
  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: params.id as string,
  });

  // Fetch ETH price for USD conversion
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
        setEthPrice(2500); // Fallback
        toast.error("Failed to fetch ETH price. Using fallback value ($2500).");
      }
    };
    fetchEthPrice();
  }, []);

  // Fetch proposals
  const { data: proposalsData, isPending: proposalPending, refetch: refetchProposals } = useReadContract({
    contract,
    method: "function getProposals() view returns ((uint256 id, string description, uint256 amount, address recipient, uint256 timestamp, bool approved, bool rejected, uint256 votes)[])",
    params: [],
  });

  // Fetch proof image
  const { data: proofImageData, isPending: proofImagePending } = useReadContract({
    contract,
    method: "function image() view returns (string)",
    params: [],
  });

  // Fetch campaign name (assuming a method exists, adjust if different)
  const { data: campaignNameData, isPending: campaignNamePending } = useReadContract({
    contract,
    method: "function campaignName() view returns (string)",
    params: [],
  });

  // Process proposals and fetch metadata
  useEffect(() => {
    if (proposalsData && !proposalPending) {
      const proposalList: Proposal[] = proposalsData.map((prop: any) => ({
        id: prop.id,
        description: prop.description,
        amount: prop.amount,
        recipient: prop.recipient,
        timestamp: prop.timestamp,
        approved: prop.approved,
        rejected: prop.rejected,
        votes: prop.votes,
      }));

      // Fetch metadata for each proposal
      const fetchMetadata = async () => {
        const updatedProposals = await Promise.all(
          proposalList.map(async (prop) => {
            try {
              const response = await axios.get(`/api/proposal/${params.id}/${Number(prop.id)}`);
              return {
                ...prop,
                title: response.data.title || `Proposal #${prop.id}`,
                proofImage: response.data.proofImage,
              };
            } catch (error) {
              console.error(`Error fetching metadata for proposal ${prop.id}:`, error);
              return { ...prop, title: `Proposal #${prop.id}` };
            }
          })
        );
        setProposals(updatedProposals);
      };

      fetchMetadata();
    }
    if (campaignNameData && !campaignNamePending) {
      setCampaignName(campaignNameData);
    }
  }, [proposalsData, proposalPending, campaignNameData, campaignNamePending, params.id]);

  // Fetch voting stats and donors for each proposal
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!proposals.length || !account?.address) return;

      try {
        const response = await axios.get(
          `https://base-sepolia.blockscout.com/api/v2/addresses/${params.id}/transactions`
        );
        const transactions = response.data.items;
        console.log("Fetched transactions:", transactions); // Debug log

        const donorMap: { [proposalId: number]: { [address: string]: Donor } } = {};
        const userPowerMap: { [proposalId: number]: number } = {};

        // Initialize donor map for each proposal
        proposals.forEach((prop) => {
          donorMap[Number(prop.id)] = {};
          userPowerMap[Number(prop.id)] = 0;
        });

        // Process transactions
        transactions.forEach((tx: any) => {
          const fromAddress = tx.from.hash;
          const toAddress = tx.to.hash;
          const value = BigInt(tx.value || "0");

          // Only process transactions sent to this contract
          if (toAddress === params.id) {
            proposals.forEach((prop) => {
              const proposalId = Number(prop.id);
              if (!donorMap[proposalId][fromAddress]) {
                donorMap[proposalId][fromAddress] = {
                  address: fromAddress,
                  totalDonation: BigInt(0),
                  votingPower: 0,
                  hasVoted: false,
                };
              }

              // Handle donations (assuming all ETH sent to contract is a donation)
              donorMap[proposalId][fromAddress].totalDonation += value;
              donorMap[proposalId][fromAddress].votingPower = Number(donorMap[proposalId][fromAddress].totalDonation) / 8_000_000_000_000_000; // 1 vote = 0.008 ETH
              console.log(`Donation for proposal ${proposalId} from ${fromAddress}: ${value} wei, Voting Power: ${donorMap[proposalId][fromAddress].votingPower}`);
            });

            // Handle votes (if voteOnProposal is called)
            if (tx.method === "voteOnProposal" && tx.decoded_input) {
              const proposalIdFromTx = Number(tx.decoded_input.parameters[0].value);
              if (donorMap[proposalIdFromTx] && donorMap[proposalIdFromTx][fromAddress]) {
                donorMap[proposalIdFromTx][fromAddress].hasVoted = true;
                console.log(`Vote recorded for proposal ${proposalIdFromTx} by ${fromAddress}`);
              }
            }
          }
        });

        // Set donors and user voting power
        const updatedDonors: { [proposalId: number]: Donor[] } = {};
        proposals.forEach((prop) => {
          const proposalId = Number(prop.id);
          updatedDonors[proposalId] = Object.values(donorMap[proposalId]).filter(
            (donor) => donor.totalDonation > 0 // Only include donors with actual donations
          );
          if (donorMap[proposalId][account.address]) {
            userPowerMap[proposalId] = donorMap[proposalId][account.address].votingPower;
          }
          console.log(`Donors for proposal ${proposalId}:`, updatedDonors[proposalId]); // Debug log
        });

        setDonors(updatedDonors);
        setUserVotingPower(userPowerMap);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch voting data.");
      }
    };

    fetchTransactions();
  }, [proposals, params.id, account]);

  // Handle approval
  const handleApprove = async (proposalId: number) => {
    if (!account?.address) {
      toast.error("Please connect your wallet.");
      return;
    }

    setApprovingProposalId(proposalId);
    const _proposalId = BigInt(proposalId);

    const transaction = prepareContractCall({
      contract,
      method: "function approveProposal(uint256 _proposalId)",
      params: [_proposalId],
    });

    await sendTransaction(transaction, {
      onSuccess: async () => {
        toast.success("Proposal approved successfully!");
        await refetchProposals(); // Refetch proposals to update status
      },
      onError: (err) => {
        console.error("Approval failed:", err);
        toast.error("Approval failed: " + err.message);
      },
    });

    setApprovingProposalId(null);
  };

  // Handle disapproval
  const handleDisapprove = async (proposalId: number) => {
    if (!account?.address) {
      toast.error("Please connect your wallet.");
      return;
    }

    setDisapprovingProposalId(proposalId);
    const _proposalId = BigInt(proposalId);

    const transaction = prepareContractCall({
      contract,
      method: "function rejectProposal(uint256 _proposalId)",
      params: [_proposalId],
    });

    await sendTransaction(transaction, {
      onSuccess: async () => {
        toast.success("Proposal disapproved successfully!");
        await refetchProposals(); // Refetch proposals to update status
      },
      onError: (err) => {
        console.error("Disapproval failed:", err);
        toast.error("Disapproval failed: " + err.message);
      },
    });

    setDisapprovingProposalId(null);
  };

  // Toggle expanded state
  const toggleExpand = (index: number) => {
    setExpandedProposal(expandedProposal === index ? null : index);
  };

  // Calculate total possible votes and votes done
  const calculateVoteStats = (proposalId: number) => {
    const proposalDonors = donors[proposalId] || [];
    const totalPossibleVotes = proposalDonors.reduce((sum, donor) => sum + donor.votingPower, 0);
    const votesDone = proposalDonors.filter((donor) => donor.hasVoted).reduce((sum, donor) => sum + donor.votingPower, 0);
    return { totalPossibleVotes, votesDone };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Vote on Proposals</h1>

      {proposalPending ? (
        <p className="text-center text-gray-500">Searching For Proposal.</p>
      ) : proposals.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-4">
          {proposals.map((proposal: Proposal, index: number) => {
            const proposalId = Number(proposal.id);
            const isExpanded = expandedProposal === index;
            const isApproving = approvingProposalId === proposalId;
            const isDisapproving = disapprovingProposalId === proposalId;
            const proposalDonors = donors[proposalId] || [];
            const userPower = userVotingPower[proposalId] || 0;
            const { totalPossibleVotes, votesDone } = calculateVoteStats(proposalId);

            return (
              <motion.div
                key={proposal.id.toString()}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                layout
                transition={{ duration: 0.3 }}
              >
                {/* Proposal Bar (always visible) */}
                <motion.div
                  className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 ${
                    isExpanded ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleExpand(index)}
                  layout
                >
                  <div>
                    <h2 className="text-lg font-semibold">{proposal.title}</h2>
                    <p className="text-sm text-gray-600">
                      Amount: {ethers.formatEther(proposal.amount)} ETH (~$
                      {(parseFloat(ethers.formatEther(proposal.amount)) * ethPrice).toFixed(2)})
                    </p>
                    <p className="text-sm text-gray-600">Total Votes: {totalPossibleVotes.toFixed(2)}</p>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border-t"
                    >
                      <div className="space-y-4">
                        {/* Campaign Name */}
                        {campaignName && (
                          <h3 className="text-xl font-semibold text-gray-700">{campaignName}</h3>
                        )}

                        {/* Proposal Details */}
                        <div>
                          <p><strong>Description:</strong> {proposal.description}</p>
                          <p>
                            <strong>Amount:</strong> {ethers.formatEther(proposal.amount)} ETH (~$
                            {(parseFloat(ethers.formatEther(proposal.amount)) * ethPrice).toFixed(2)})
                          </p>
                          <p><strong>Recipient:</strong> {proposal.recipient}</p>
                          <p><strong>Votes:</strong> {totalPossibleVotes.toFixed(2)}</p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {proposal.approved ? "Approved" : proposal.rejected ? "Rejected" : "Pending"}
                          </p>
                          <p><strong>Created:</strong> {new Date(Number(proposal.timestamp) * 1000).toLocaleString()}</p>
                        </div>

                        {/* Proof Image */}
                        {!proofImagePending && proofImageData && (
                          <div className="mt-2">
                            <p><strong>Campaign Image:</strong></p>
                            <img
                              src={proofImageData}
                              alt="Proposal Proof"
                              className="w-full h-auto rounded-md shadow-sm"
                              onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")} // Fallback image
                            />
                          </div>
                        )}

                        {/* Your Voting Power */}
                        <div className="border-t pt-2">
                          <h3 className="text-lg font-semibold">Your Voting Power</h3>
                          <p className="text-gray-700">
                            You have <strong>{userPower.toFixed(2)} votes</strong> based on your donations.
                          </p>
                          {userPower === 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              Donate to this campaign to gain voting power (1 vote = 0.008 ETH).
                            </p>
                          )}
                        </div>

                        {/* Vote Stats */}
                        <div className="border-t pt-2">
                          <h3 className="text-lg font-semibold">Vote Statistics</h3>
                          <p><strong>Total Possible Votes:</strong> {totalPossibleVotes.toFixed(2)}</p>
                          <p><strong>Votes Done:</strong> {votesDone.toFixed(2)}</p>
                          <p><strong>Remaining Votes:</strong> {(totalPossibleVotes - votesDone).toFixed(2)}</p>
                        </div>

                        {/* Donors List */}
                        <div className="border-t pt-2">
                          <h3 className="text-lg font-semibold">Donors</h3>
                          {proposalDonors.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse text-sm">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border p-2 text-left">Address</th>
                                    <th className="border p-2 text-left">Donation (ETH)</th>
                                    <th className="border p-2 text-left">Voting Power</th>
                                    <th className="border p-2 text-left">Has Voted</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {proposalDonors.map((donor) => (
                                    <tr key={donor.address} className="hover:bg-gray-50">
                                      <td className="border p-2">
                                        {donor.address.slice(0, 6)}...{donor.address.slice(-4)}
                                      </td>
                                      <td className="border p-2">{(Number(donor.totalDonation) / 10 ** 18).toFixed(4)} ETH</td>
                                      <td className="border p-2">{donor.votingPower.toFixed(2)} votes</td>
                                      <td className="border p-2">{donor.hasVoted ? "Yes" : "No"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-gray-500">No donors found for this proposal.</p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                          {/* Approve Button */}
                          <button
                            onClick={() => handleApprove(proposalId)}
                            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium text-sm transition-all duration-200 ease-in-out shadow-md ${
                              isApproving
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            } ${isApproving || proposal.approved || proposal.rejected ? "opacity-50" : ""}`}
                            disabled={isApproving || proposal.approved || proposal.rejected}
                          >
                            {isApproving ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-2 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Approving...
                              </span>
                            ) : (
                              "Approve"
                            )}
                          </button>

                          {/* Disapprove Button */}
                          <button
                            onClick={() => handleDisapprove(proposalId)}
                            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium text-sm transition-all duration-200 ease-in-out shadow-md ${
                              isDisapproving
                                ? "bg-red-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            } ${isDisapproving || proposal.approved || proposal.rejected ? "opacity-50" : ""}`}
                            disabled={isDisapproving || proposal.approved || proposal.rejected}
                          >
                            {isDisapproving ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-2 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Disapproving...
                              </span>
                            ) : (
                              "Disapprove"
                            )}
                          </button>
                        </div>
                        {(proposal.approved || proposal.rejected) && (
                          <p className="text-sm text-gray-500 mt-2">Voting is closed for this proposal.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Searching For Proposal.</p>
      )}

      <Toaster richColors closeButton={true} />
    </div>
  );
};

export default VotePage;