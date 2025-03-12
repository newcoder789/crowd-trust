// // import axios from "axios";
// // import mongoose from "mongoose";
// // import UserModel from "@/models/User.Model"; // Ensure the User schema is correctly imported
// // import { NextRequest, NextResponse } from "next/server";
// // import dbConnect from "@/lib/dbConnect";

// // const BLOCKSCOUT_API = "https://base-sepolia.blockscout.com/api";
// // const ETH_TO_USD_API = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

// // // Convert ETH to USD if amount is big
// // async function convertEthToUsd(ethAmount: number) {
// //     try {
// //         const response = await axios.get(ETH_TO_USD_API);
// //         const ethToUsdRate = response.data.ethereum.usd;
// //         return ethAmount * ethToUsdRate;
// //     } catch (error) {
// //         console.error("Failed to fetch ETH to USD conversion rate", error);
// //         return ethAmount * 2000; // Default fallback
// //     }
// // }

// // // Fetch transactions for a user
// // async function fetchDonations(address: string) {
// //     try {
// //         const { data } = await axios.get(`${BLOCKSCOUT_API}/v2/addresses/${address}/transactions`);
// //         const transactions = data.items || [];

// //         let donations = [];

// //         for (const tx of transactions) {
// //             if (tx.value > 0) {
// //                 let ethAmount = tx.value / 1e18; // Convert from Wei to ETH
// //                 let usdAmount = ethAmount > 1 ? await convertEthToUsd(ethAmount) : null;

// //                 donations.push({
// //                     campaign: tx.to,
// //                     amount: ethAmount,
// //                     usdAmount,
// //                     date: new Date(tx.timestamp * 1000),
// //                 });
// //             }
// //         }

// //         return donations;
// //     } catch (error) {
// //         console.error("Error fetching transactions:", error);
// //         return [];
// //     }
// // }
// // // Save user to MongoDB
// // export async function POST(req: NextRequest): Promise<NextResponse>  {
// //     try {
// //         await dbConnect();

// //         const {address}  = await req.json();
// //         let user = await UserModel.findOne({ address });
// //         let newDonations = await fetchDonations(address);
// //         let totalDonated = newDonations.reduce((sum, d) => sum + d.amount, 0);

// //         if (!user) {
// //             user = new UserModel({
// //                 address,
// //                 totalDonated,
// //                 donationHistory: newDonations,
// //             });
// //         } else {
// //             user.totalDonated += totalDonated;
// //             user.donationHistory.push(...newDonations);
// //         }

// //         await user.save();
// //         console.log("User saved:", user);
// //         return NextResponse.json({ message: "User saved successfully", user });
// //     } catch (error) {
// //         console.error("Error saving user:", error);
// //         return NextResponse.json({ message: "Error saving user", error }, { status: 500 });
// //     } finally {
// //         await mongoose.disconnect();
// //     }
// // }

// // // Example call (Replace with actual API request handler)
// // // const testAddress = "0x7dB6DC9205d3bF205B7664Be75aE203af5d2Adc0";
// // // saveUser(testAddress);
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/models/User.model";
// import CampaignModel from "@/models/All.model";

// async function saveDonation(userAddress, campaignId, amount) {
//     try {
//         await dbConnect();

//         // Find or create the user
//         let user = await UserModel.findOne({ address: userAddress });
//         if (!user) {
//             user = new UserModel({ address: userAddress, totalDonated: 0, donationHistory: [] });
//             await user.save();
//         }

//         // Find the campaign
//         let campaign = await CampaignModel.findById(campaignId);
//         if (!campaign) throw new Error("Campaign not found");

//         // Update user donation history
//         user.totalDonated += amount;
//         user.donationHistory.push({
//             campaign: campaign._id,
//             amount,
//             timestamp: new Date()
//         });
//         await user.save();

//         // Update campaign donors list
//         campaign.currentAmount += amount;
//         campaign.donors.push({
//             user: user._id, // Reference to the User model
//             amount,
//             timestamp: new Date()
//         });
//         await campaign.save();

//         console.log("Donation saved successfully");
//         return { user, campaign };
//     } catch (error) {
//         console.error("Error saving donation:", error);
//     }
// }
