import { Proposal, IProposal } from "@/models/Proposal";
import { Model } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
// import NotificationModel from "@/models/Notifications"; 



export async function POST(req: NextRequest, res:NextResponse) {
    await dbConnect();
    try{
        const { campaignId, proposer, title, reason, proofImage, amountRequested }: IProposal = await req.json();

        // Check if required fields are present
        if (!campaignId || !proposer || !title || !reason || !amountRequested) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const proposal = new (Proposal as Model<IProposal>)({
            campaignId,
            proposer,
            title,
            reason,
            proofImage,
            amountRequested,
            status: "pending",
        });
        await proposal.save();
        // After saving the proposal
        // await NotificationModel.create({
        //     campaignId: campaignId,
        //     donorId: proposer, 
        //     message: `'${title}' New Proposal Available!`,
        //     link: `/campaigns/${campaignId}/proposal/voting`,
        //     isReady: false,
        // });
        
        return NextResponse.json({ message: "Proposal created successfully!"}, { status: 201 });
    } catch (error) {
        console.log("Proposal Creation Error:", error);
        return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 });
    }
}
export async function GET(req: NextRequest, res:NextResponse) {
    await dbConnect();
    try {
      const proposals = await Proposal.find({ });
      return NextResponse.json(proposals);
    } catch (error) {
      return NextResponse.json({ message: "Error fetching proposals", error }, { status: 500 });
    }
  }