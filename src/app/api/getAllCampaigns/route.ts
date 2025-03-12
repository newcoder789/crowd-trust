// create an api for this fucntion seEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         setLoading(true);
//         const contract = getContract({
//           client: client,
//           chain: baseSepolia,
//           address: CROWDFUNDING_FACTORY,
//         });
//         console.log(CROWDFUNDING_FACTORY)
//         console.log("Contract loaded:", contract);
//         const campaigns: any = await readContract({
//           contract,
//           method: "function getAllCampaigns() view returns (address[])",
//         });
//         setCampaigns(campaigns);
//         console.log("Campaigns:", campaigns);
//       } catch (err) {
//         console.error("Error fetching campaigns:", err);
//       }finally {
//         setLoading(false);
//       }
//     };

import { client } from "@/app/client";
import { CROWDFUNDING_FACTORY } from "@/app/constants/contracts";
import { NextRequest, NextResponse } from "next/server";
import { getContract, readContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

    
//     fetchCampaigns();
//   }, []);
//   console.log("Campaigns:", campaigns);

export async function GET(req: NextRequest) {
    
    try {
    const contract = getContract({
        client: client,
        chain: baseSepolia,
        address: CROWDFUNDING_FACTORY,
    });
    console.log(CROWDFUNDING_FACTORY)
    console.log("Contract loaded:", contract);
    const campaigns: any = await readContract({
        contract,
        method: "function getAllCampaigns() view returns (address[])",
    });
    console.log("Campaigns:", campaigns);
    return NextResponse.json({ campaigns: campaigns}, {status: 200}) 
    } catch (err) {
    console.error("Error fetching campaigns:", err);
    return NextResponse.json({error: `Error Fetching all campaigns ${err}`},{status: 500})
    }
    
}