// // 'use client';
// // import { client } from "@/app/client";
// // import { TierCard } from "@/components/TierCard";
// // import dbConnect from "@/lib/dbConnect";
// // import { useParams } from "next/navigation";
// // import { useState } from "react";
// // import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
// // import { baseSepolia } from "thirdweb/chains";
// // import { lightTheme, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";




// // export default function CampaignPage() {
// //     const account = useActiveAccount();
// //     const { campaignAddress } = useParams();
// //     const [isEditing, setIsEditing] = useState<boolean>(false);
// //     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// //     const [desc, setDesc] = useState<string>("");

// //     const getDesc = async (): Promise<void> => {
// //         await dbConnect();
// //         // const data = await CampaignModel()
// //     }
// //     const contract = getContract({
// //         client: client,
// //         chain: baseSepolia,
// //         address: campaignAddress as string,
// //     }); 

// //     // Name of the campaign
// //     const { data: name, isLoading: isLoadingName } = useReadContract({
// //         contract: contract,
// //         method: "function name() view returns (string)",
// //         params: [],
// //     });

// //     // Description of the campaign
// //     const { data: description } = useReadContract({ 
// //         contract, 
// //         method: "function description() view returns (string)", 
// //         params: [] 
// //       });

// //     // CampaignModel deadline
// //     const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
// //         contract: contract,
// //         method: "function deadline() view returns (uint256)",
// //         params: [],
// //     });
// //     // Convert deadline to a date
// //     const deadlineDate = new Date(parseInt(deadline?.toString() as string) * 1000);
// //     // Check if deadline has passed
// //     const hasDeadlinePassed = deadlineDate < new Date();

// //     // Goal amount of the campaign
// //     const { data: goal, isLoading: isLoadingGoal } = useReadContract({
// //         contract: contract,
// //         method: "function goal() view returns (uint256)",
// //         params: [],
// //     });
    
// //     // Total funded balance of the campaign
// //     const { data: balance, isLoading: isLoadingBalance } = useReadContract({
// //         contract: contract,
// //         method: "function getContractBalance() view returns (uint256)",
// //         params: [],
// //     });

// //     // Calulate the total funded balance percentage
// //     const totalBalance = balance?.toString();
// //     const totalGoal = goal?.toString();
// //     let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

// //     // If balance is greater than or equal to goal, percentage should be 100
// //     if (balancePercentage >= 100) {
// //         balancePercentage = 100;
// //     }

// //     // Get tiers for the campaign
// //     const { data: tiers, isLoading: isLoadingTiers } = useReadContract({
// //         contract: contract,
// //         method: "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
// //         params: [],
// //     });

// //     // Get owner of the campaign
// //     const { data: owner, isLoading: isLoadingOwner } = useReadContract({
// //         contract: contract,
// //         method: "function owner() view returns (address)",
// //         params: [],
// //     });

// //     // Get status of the campaign
// //     const { data: status } = useReadContract({ 
// //         contract, 
// //         method: "function state() view returns (uint8)", 
// //         params: [] 
// //       });
    
// //     return (
// //         <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
// //             <div className="flex flex-row justify-between items-center">
// //                 {!isLoadingName && (
// //                     <p className="text-4xl font-semibold">{name}</p>
// //                 )}
// //                 {owner === account?.address && (
// //                     <div className="flex flex-row">
// //                         {isEditing && (
// //                             <p className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2">
// //                                 Status:  
// //                                 {status === 0 ? " Active" : 
// //                                 status === 1 ? " Successful" :
// //                                 status === 2 ? " Failed" : "Unknown"}
// //                             </p>
// //                         )}
// //                         <button
// //                             className="px-4 py-2 bg-blue-500 text-white rounded-md"
// //                             onClick={() => setIsEditing(!isEditing)}
// //                         >{isEditing ? "Done" : "Edit"}</button>
// //                     </div>
// //                 )}
// //             </div>
// //             <div className="my-4">
// //                 <p className="text-lg font-semibold">Description:</p>
// //                 <p>{description}</p>
// //             </div>
// //             <div className="mb-4">
// //                 <p className="text-lg font-semibold">Deadline</p>
// //                 {!isLoadingDeadline && (
// //                     <p>{deadlineDate.toDateString()}</p>
// //                 )}
// //             </div>
// //             {!isLoadingBalance && (
// //                 <div className="mb-4">
// //                     <p className="text-lg font-semibold">CampaignModel Goal: ${goal?.toString()}</p>
// //                     <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
// //                         <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{ width: `${balancePercentage?.toString()}%`}}>
// //                             <p className="text-white dark:text-white text-xs p-1">${balance?.toString()}</p>
// //                         </div>
// //                         <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
// //                             {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
// //                         </p>
// //                     </div>
// //                 </div>
                
// //             )}
// //             <div>
// //                 <p className="text-lg font-semibold">Tiers:</p>
// //                 <div className="grid grid-cols-3 gap-4">
// //                     {isLoadingTiers ? (
// //                         <p >Loading...</p>
// //                     ) : (
// //                         tiers && tiers.length > 0 ? (
// //                             tiers.map((tier, index) => (
// //                                 <TierCard
// //                                     key={index}
// //                                     tier={tier}
// //                                     index={index}
// //                                     contract={contract}
// //                                     isEditing={isEditing}
// //                                 />
// //                             ))
// //                         ) : (
// //                             !isEditing && (
// //                                 <p>No tiers available</p>
// //                             )
// //                         )
// //                     )}
// //                     {isEditing && (
// //                         // Add a button card with text centered in the middle
// //                         <button
// //                             className="max-w-sm flex flex-col text-center justify-center items-center font-semibold p-6 bg-blue-500 text-white border border-slate-100 rounded-lg shadow"
// //                             onClick={() => setIsModalOpen(true)}
// //                         >+ Add Tier</button>
// //                     )}
// //                 </div>
// //             </div>
            
// //             {isModalOpen && (
// //                 <CreateCampaignModal
// //                     setIsModalOpen={setIsModalOpen}
// //                     contract={contract}
// //                 />
// //             )}
// //         </div>
// //     );
// // }

// // type CreateTierModalProps = {
// //     setIsModalOpen: (value: boolean) => void
// //     contract: ThirdwebContract
// // }

// // const CreateCampaignModal = (
// //     { setIsModalOpen, contract }: CreateTierModalProps
// // ) => {
// //     const [tierName, setTierName] = useState<string>("");
// //     const [tierAmount, setTierAmount] = useState<bigint>(1n);

// //     return (
// //         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
// //             <div className="w-1/2 bg-slate-100 p-6 rounded-md">
// //                 <div className="flex justify-between items-center mb-4">
// //                     <p className="text-lg font-semibold">Create a Funding Tier</p>
// //                     <button
// //                         className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
// //                         onClick={() => setIsModalOpen(false)}
// //                     >Close</button>
// //                 </div>
// //                 <div className="flex flex-col">
// //                     <label>Tier Name:</label>
// //                     <input 
// //                         type="text" 
// //                         value={tierName}
// //                         onChange={(e) => setTierName(e.target.value)}
// //                         placeholder="Tier Name"
// //                         className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
// //                     />
// //                     <label>Tier Cost:</label>
// //                     <input 
// //                         type="number"
// //                         value={parseInt(tierAmount.toString())}
// //                         onChange={(e) => setTierAmount(BigInt(e.target.value))}
// //                         className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
// //                     />
// //                     <TransactionButton
// //                         transaction={() => prepareContractCall({
// //                             contract: contract,
// //                             method: "function addTier(string _name, uint256 _amount)",
// //                             params: [tierName, tierAmount]
// //                         })}
// //                         onTransactionConfirmed={async () => {
// //                             alert("Tier added successfully!")
// //                             setIsModalOpen(false)
// //                         }}
// //                         onError={(error) => alert(`Error: ${error.message}`)}
// //                         theme={lightTheme()}
// //                     >Add Tier</TransactionButton>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }
'use client';

import { getContract, prepareContractCall } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ethers } from "ethers";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { client } from "@/app/client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SuccessPieChart from "@/components/SuccessPieChart";


const data = [
  { name: "Successful", value: 8 },
  { name: "Failed", value: 4 },
];


interface CampaignData {
  _id: string;
  name: string;
  detail: string;
  owner: string;
  contractAddress: string;
  description: string;
  goal: number;
  uiImage: string;
  fraudNo: number;
  createdAt: string;
}

export default function CampaignDetails() {
  const { id } = useParams() as { id: string };
  const account = useActiveAccount();
  const contract = getContract({ client, chain: baseSepolia, address: id });
  const [ethAmount, setEthAmount] = useState("0");
  const [fraudScore, setFraudScore] = useState(0);
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const isFirstRender = useRef(true);


  const { data: title } = useReadContract({ contract, method: "function name() view returns (string)", params: [] });
  const { data: goalAmount } = useReadContract({ contract, method: "function goal() view returns (uint256)", params: [] });
  const { data: progress } = useReadContract({ contract, method: "function getProgress() view returns (uint256)", params: [] });
  const { data: owner } = useReadContract({ contract, method: "function owner() view returns (address)", params: [] });
  const description = "Donate for the cause.";
  const { data: uiImage, isLoading: isImageLoading } = useReadContract({ contract: contract, method: "function image() view returns (string)", params: [], });
  
  const { mutate: sendTransaction, isPending: isDonating } = useSendTransaction();

  const handleDonate = async () => {
    if (parseFloat(ethAmount) < 0.001) {
      toast.error("Minimum donation is 0.001 ETH.");
      return;
    }
    const transaction = prepareContractCall({ contract, method: "function donate() payable", params: [], value: ethers.parseEther(ethAmount) });
    sendTransaction(transaction, {
      onSuccess: () => toast.success("Donation Successful!"),
      onError: (err) => console.error("Donation failed", err),
    });
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
          <CardTitle className="text-2xl font-bold">{ title? title: "CampaginName" }</CardTitle>
          {owner && owner===account?.address &&(
            <Button
              variant="outline"
              
              > <Link
              href={`/campaign/${id}/proposal`}
              >Create Proposal</Link></Button>
          )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{description || "Support this cause."}</p>
          {uiImage && (
            <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
              <Image src={uiImage} alt="Campaign" width={800} height={400} className="rounded-lg" />
            </motion.div>
          )}
          <Progress value={(Number(progress) / Number(goalAmount)) * 100} className="mb-2" />
          <p>Raised: <strong>{(Number(progress) / 10 ** 10).toFixed(3)}</strong> / Goal: <strong>{goalAmount?.toString() || 0}</strong></p>
          <p className="mt-2">Fraud Risk: <span className={`px-2 py-1 rounded ${fraudScore < 20 ? "bg-green-500" : fraudScore < 50 ? "bg-yellow-500" : "bg-red-500"} text-white`}>{fraudScore}</span></p>
          <Input type="number" value={ethAmount} onChange={(e:any) => setEthAmount(e.target.value)} placeholder="0.1 ETH" className="my-3" />
          <Button onClick={handleDonate} disabled={isDonating || parseFloat(ethAmount) < 0.001} className="w-full bg-blue-600 hover:bg-blue-700">
            {isDonating ? "Donating..." : "Donate"}
          </Button>
        </CardContent>
      </Card>


      <SuccessPieChart
       data = {data}
      />
    </motion.div>
  );
}

// 'use client';

// import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
// import { baseSepolia } from "thirdweb/chains";
// import { lightTheme, TransactionButton, useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ethers } from 'ethers';
// import { Progress } from '@/components/ui/progress';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import Image from 'next/image';
// import axios from "axios";
// import { client } from '@/app/client';
// // Define the CampaignData type for TypeScript
// interface CampaignData {
//   _id: string;
//   name: string;
//   detail: string;
//   owner: string;
//   contractAddress: string;
//   description: string;
//   goal: number;
//   aiCheckImage: string;
//   uiImage: string;
//   fraudReported: boolean;
//   fraudNo: number;
//   createdAt: string;
// }

// export default function CampaignDetails() {
//   const router = useRouter();
//   const account = useActiveAccount();
//   const { id } = useParams() as { id: string };
//   console.log("individual campaign page address", id)
//   const contract = getContract({
//     client: client,
//     chain: baseSepolia,
//     address: id,
//   });

//   const [usdAmount, setUsdAmount] = useState("");
//   const [ethAmount, setEthAmount] = useState("0");
//   const [donationAmount, setDonationAmount] = useState('');
//   const [fraudScore, setFraudScore] = useState(0);
//   const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

//   const ETH_TO_USD_RATE = 3000; // Example rate for ETH to USD conversion
//   const USD_TO_ETH_RATE = 1 / ETH_TO_USD_RATE;


//   const { data: title, isLoading: isLoadingTitle } = useReadContract({
//     contract: contract,
//     method: "function name() view returns (string)",
//     params: [],
//   });


//   const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
//     contract: contract,
//     method: "function deadline() view returns (uint256)",
//     params: [],
//   });
//   const deadlineDate = deadline ? new Date(parseInt(deadline.toString()) * 1000) : new Date();
//   const hasDeadlinePassed = deadlineDate < new Date();

//   const { data: goalAmount, isLoading: isLoadingGoal } = useReadContract({
//     contract: contract,
//     method: "function goal() view returns (uint256)",
//     params: [],
//   });

//   const { data: progress, isLoading: isLoadingProgress } = useReadContract({
  //     contract: contract,
  //     method: "function getProgress() view returns (uint256)",
  //     params: [],
  //   });
  
  //   const description = "Donate for the cause.";
//   const { data: uiImage, isLoading: isImageLoading } = useReadContract({
//     contract: contract,
//     method: "function image() view returns (string)",
//     params: [],
//   });

//   const { data: owner, isLoading: isLoadingOwner } = useReadContract({
//     contract: contract,
//     method: "function owner() view returns (address)",
//     params: [],
//   });

//   const { mutate: sendTransaction, isPending: isDonating } = useSendTransaction();

//   const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const usdValue = e.target.value;
//     setUsdAmount(usdValue);
//     setEthAmount((parseFloat(usdValue) * USD_TO_ETH_RATE).toFixed(6));
//   };

//   const handleDonate = async () => {
//     if (!ethAmount || parseFloat(ethAmount) < 0.001) {
//       toast.error("Minimum donation is 0.001 ETH.");
//       return;
//     }

//     const transaction = prepareContractCall({
//       contract,
//       method: "function donate() payable",
//       params: [],
//       value: ethers.parseEther(ethAmount),
//     });

//     sendTransaction(transaction, {
//       onSuccess: () => toast.success("Donation Successful!"),
//       onError: (err) => console.error("Donation failed", err),
//     });
//   };

//   if (isLoadingTitle || isLoadingDeadline || isLoadingGoal || isLoadingProgress || isImageLoading || isLoadingOwner || !contract) {
//     return <p className="text-center p-6 text-lg font-medium text-gray-500">Loading campaign details...</p>;
//   }

//   let progressPercentage = progress && goalAmount ? (Number(progress) / Number(goalAmount)) * 100 : 0;
//   if (progressPercentage >= 100) progressPercentage = 100;

//   return (
//     <div className="max-w-4xl mx-auto p-4 mt-32">
//       <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
//         {/* Campaign Title */}
//         <h1 className="text-3xl font-bold mb-4 text-gray-800">{campaignData?.name || title}</h1>
        
//         {/* Campaign Description */}
//         <p className="text-gray-700 mb-6">{campaignData?.description || description}</p>
        
//         {/* Owner Section */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-gray-600 mb-1">Owner</p>
//           <p className="text-sm text-gray-800">{owner}</p>
//         </div>
        
//         {/* Progress Section */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-gray-600 mb-2">Progress</p>
//           <Progress value={progressPercentage} className="w-full mb-2" />
//           <p className="text-sm text-gray-800">
//             Raised: <strong>${(progress ? (Number(progress) / 10 ** 10) : 0).toFixed(3)}</strong> / Goal: <strong>${goalAmount?.toString() || 0}</strong>
//           </p>
//         </div>
        
//         {/* Fraud Score Section */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-gray-600 mb-2">Fraud Score</p>
//           <div className="flex items-center gap-2">
//             <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//               fraudScore < 20 ? 'bg-green-500' : 
//               fraudScore < 50 ? 'bg-yellow-500' : 
//               'bg-red-500'
//             } text-white`}>
//               {fraudScore}
//             </span>
//             <span className="text-sm text-gray-800">
//               {fraudScore < 20 ? 'Low Risk' : 
//                fraudScore < 50 ? 'Moderate Risk' : 
//                'High Risk'}
//             </span>
//           </div>
//         </div>
        
//         {/* Campaign Image */}
//         {uiImage && !isImageLoading && (
//           <div className="mb-6">
//             <Image 
//               priority={false} //When true, Next.js will preload the image. 
//               alt="Campaign Image"
//               src={uiImage || "/3d-word-oops.jpg"}
//               width={800}
//               height={400}
//               className="w-full h-auto object-cover rounded-lg"
//             />
//           </div>
//         )}
        
//         {/* Details Section */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-gray-600 mb-2">Details</p>
//           <p className="text-sm text-gray-800">{campaignData?.detail || "No details available."}</p>
//         </div>
        
//         {/* Deadline Section */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-gray-600 mb-2">Deadline</p>
//           <p className="text-sm text-gray-800">{deadlineDate.toDateString()}</p>
//         </div>
        
//         {/* Donation Section */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Donate (ETH)</label>
//           <input
//             type="number"
//             value={ethAmount}
//             onChange={(e) => setEthAmount(e.target.value)}
//             placeholder="0.1"
//             min="0.001"
//             step="0.001"
//             className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-sm text-gray-600 mb-2">
//             Approximately ${(parseFloat(ethAmount || '0') * ETH_TO_USD_RATE).toFixed(2)} USD
//           </p>
//           <Button 
//             onClick={handleDonate} 
//             disabled={isDonating || !ethAmount || parseFloat(ethAmount) < 0.001}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
//           >
//             {isDonating ? "Donating..." : "Donate"}
//           </Button>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="flex flex-col gap-4">
//           <Link href="/">
//             <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-100 transition-colors duration-200">
//               Back to Campaigns
//             </Button>
//           </Link>
//           {owner === account?.address && (
//             <Link href={`/campaigns/${id}/proposal`}>
//               <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
//                 Submit Proposal
//               </Button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }