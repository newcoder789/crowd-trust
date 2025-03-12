'use client';
import { client } from "@/app/client";
import { CROWDFUNDING_FACTORY } from "@/app/constants/contracts";
import { CampaignCard } from "@/components/CampaignCard";
import { MyCampaignCard } from "@/components/MyCampaignCard";
import { useMemo, useState } from "react";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { deployPublishedContract } from "thirdweb/deploys";
import { useActiveAccount, useReadContract } from "thirdweb/react"
import axios from "axios";

export default function DashboardPage() {
    const account = useActiveAccount();
    // const fetchFraudScore = async () => {
    //         try {
    //           const response = await fetch(`/api/getCampaigns`);
    //           const data = await response.json();
    //           setFraudScore(data.fraudScore);
    //         } catch (error) {
    //           console.error('Error fetching fraud score:', error);
    //         }
    //       };
    console.log("We found the account", account);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const contract = getContract({
        client: client,
        chain: baseSepolia,
        address: CROWDFUNDING_FACTORY,
    });

    // Get Campaigns
    const { data: myCampaigns, isLoading: isLoadingMyCampaigns, refetch } = useReadContract({
        contract: contract,
        method: "function getUserCampaigns(address _user) view returns (address[])",
        params: [account?.address as string]
    });
    
    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-48 max-h-7xl ">
            <div className="flex flex-row justify-between items-center mb-8">
                <p className="text-4xl font-semibold">Dashboard</p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => setIsModalOpen(true)}
                >Create Campaign</button>
            </div>
            <p className="text-2xl font-semibold mb-4">My Campaigns:</p>
            <div className="grid grid-cols-3 gap-4">
                {!isLoadingMyCampaigns && (
                    myCampaigns && myCampaigns.length > 0 ? (
                        myCampaigns.map((campaign, index) =>{
                            console.log("am i sending campaign correctly " , campaign);
                            return(
                            <MyCampaignCard 
                                key={index}
                                contractAddress={campaign as string}
                            />)
                        })
                    ) : (
                        <p>No campaigns</p>
                    )
                )}
            </div>
            
            {isModalOpen && (
                <CreateCampaignModal
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                />
            )}
        </div>
    )
}

type CreateCampaignModalProps = {
    setIsModalOpen: (value: boolean) => void
    refetch: () => void
}

const CreateCampaignModal = (
    { setIsModalOpen, refetch }: CreateCampaignModalProps
) => {
    const account = useActiveAccount();
    const [isDeployingContract, setIsDeployingContract] = useState<boolean>(false);
    const [campaignName, setCampaignName] = useState<string>("");
    // const [campaignDescription, setCampaignDescription] = useState<string>("");
    const [campaignShortDescription, setCampaignShortDescription] = useState<string>("");
    const [campaignDetailedDescription, setCampaignDetailedDescription] = useState<string>("");
    const [campaignUIImage, setCampaignUIImage] = useState<string>("");
    const [campaignAICheckImage, setCampaignAICheckImage] = useState<string>("");
    const [campaignGoal, setCampaignGoal] = useState<number>(1);
    const [campaignDeadline, setCampaignDeadline] = useState<number>(1);
    // Deploy contract from CrowdfundingFactory
    const handleDeployContract = async () => {
        setIsDeployingContract(true);
        try {
            console.log("Deploying contract...");
            console.log("Deploying with params:", {
                client: client,
                chain: baseSepolia,
                account: account!,
                contractId: "CrowdFunding",
                contractParams: {
                    _name: campaignName,
                    _description: campaignShortDescription,
                    _goal: campaignGoal,
                    _durationInDays: campaignDeadline
                },
                publisher: "0x7dB6DC9205d3bF205B7664Be75aE203af5d2Adc0",
                version: "1.0.0"
            });
            const contractAddress = await deployPublishedContract({
                client: client,
                chain: baseSepolia,
                account: account!,
                contractId: "Campaign",
                contractParams: {
                    _name: campaignName,
                    _image: campaignUIImage,
                    _goal: campaignGoal,
                },
                publisher: "0x7dB6DC9205d3bF205B7664Be75aE203af5d2Adc0",
                version: "1.0.0"
            });
            alert(`Contract deployed successfully! ${contractAddress}`);

            // Store campaign data in MongoDB
            await axios.post("/api/create-campaigns", {
                name: campaignName,
                description: campaignShortDescription,
                detail:campaignDetailedDescription,
                goal: campaignGoal, 
                deadline: campaignDeadline,
                contractAddress:  "dsafasdf asdf sadf sad", //contractAddress
                owner: account?.address,
                uiImage: campaignUIImage,
                aiCheckImage: campaignAICheckImage
            }, {
                headers: {  "Content-Type": "application/json"  }
            });

            refetch(); // Refresh campaigns list
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeployingContract(false);
            setIsModalOpen(false);
            refetch
        }
    };

    const handleCampaignGoal = (value: number) => {
        if (value < 1) {
            setCampaignGoal(1);
        } else {
            setCampaignGoal(value);
        }
    }

    const handleCampaignLengthhange = (value: number) => {
        if (value < 1) {
            setCampaignDeadline(1);
        } else {
            setCampaignDeadline(value);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center backdrop-blur-md">
            <div className="w-1/2 bg-slate-100 p-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Create a Campaign</p>
                    <button
                        className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
                        onClick={() => setIsModalOpen(false)}
                    >Close</button>
                </div>
                <div className="flex flex-col">
                    <label>Campaign Name:</label>
                    <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Campaign Name" className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />
                    <label>Campaign Description:</label>
                    <textarea value={campaignShortDescription} onChange={(e) => setCampaignShortDescription(e.target.value)} placeholder="Campaign Description" className="mb-4 px-4 py-2 bg-slate-300 rounded-md"></textarea>
                    <label>Campaign Details:</label>
                    <textarea value={campaignDetailedDescription} onChange={(e) => setCampaignDetailedDescription(e.target.value)} placeholder="Campaign Description" className="mb-4 px-4 py-2 bg-slate-300 rounded-md"></textarea>
                    <label>Campaign Goal:</label>
                    <input type="number" value={campaignGoal} onChange={(e) => setCampaignGoal(Math.max(1, parseInt(e.target.value)))} className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />
                    <label>UI Image Link:</label>
                    <input type="text" value={campaignUIImage} onChange={(e) => setCampaignUIImage(e.target.value)} placeholder="Paste Image URL" className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />
                    <label>AI Check Image Link:</label>
                    <input type="text" value={campaignAICheckImage} onChange={(e) => setCampaignAICheckImage(e.target.value)} placeholder="Paste AI Check Image URL" className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleDeployContract}>{isDeployingContract ? "Creating Campaign..." : "Create Campaign"}</button>
                </div>
            </div>
        </div>
    )
}